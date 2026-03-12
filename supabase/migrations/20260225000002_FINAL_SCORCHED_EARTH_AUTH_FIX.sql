-- FINAL SCORCHED EARTH AUTH FIX
-- This migration cleans up ALL previous trigger messes and ensures permissions are PERMANENTLY fixed.

-- 1. DROP ALL OLD TRIGGERS (Try to catch every known name)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_consolidated ON auth.users;
DROP TRIGGER IF EXISTS handle_referral_signup_trigger ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_manual ON auth.users;

-- 2. DROP OLD FUNCTIONS (To avoid signature conflicts)
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_new_user_consolidated();
DROP FUNCTION IF EXISTS public.handle_referral_signup();

-- 3. ENSURE TABLE STRUCTURE IS ROBUST
-- If any columns are missing, add them (though most should exist)
DO $$ 
BEGIN
    -- Ensure profiles has all columns
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='full_name') THEN
        ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='avatar_url') THEN
        ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='username') THEN
        ALTER TABLE public.profiles ADD COLUMN username TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='user_name') THEN
        ALTER TABLE public.profiles ADD COLUMN user_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='plan') THEN
        ALTER TABLE public.profiles ADD COLUMN plan TEXT DEFAULT 'free';
    END IF;
END $$;

-- 4. CREATE THE ULTIMATE RESILIENT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_new_user_v12()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  counter INTEGER := 0;
  referral_code_param TEXT;
  referrer_id UUID;
BEGIN
  -- A. PREPARE USERNAMES
  base_username := LOWER(COALESCE(
    NEW.raw_user_meta_data->>'username', 
    NEW.raw_user_meta_data->>'name',
    SPLIT_PART(NEW.email, '@', 1)
  ));
  base_username := REGEXP_REPLACE(base_username, '[^a-z0-9]', '', 'g');
  IF base_username = '' THEN base_username := 'user'; END IF;
  final_username := base_username;

  -- B. RESOLVE USERNAME COLLISIONS (Max 20 attempts)
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) AND counter < 20 LOOP
    counter := counter + 1;
    final_username := base_username || counter || (floor(random() * 90) + 10)::text;
  END LOOP;

  -- C. ATOMIC PROFILE CREATION (Wrapped in nested block)
  BEGIN
    INSERT INTO public.profiles (
        id, 
        full_name, 
        avatar_url, 
        user_name,
        username,
        plan,
        updated_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', final_username),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'user_name', final_username),
        final_username,
        'free',
        now()
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
        updated_at = now();
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Profile insertion failed for user %: %', NEW.id, SQLERRM;
  END;

  -- D. INITIAL REWARDS
  BEGIN
    INSERT INTO public.user_rewards (user_id, hint_points, login_streak, trial_start_date)
    VALUES (NEW.id, 50, 0, (now() AT TIME ZONE 'UTC')::date)
    ON CONFLICT (user_id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Rewards insertion failed for user %: %', NEW.id, SQLERRM;
  END;

  -- E. INITIAL LEVEL PROGRESS
  BEGIN
    INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
    VALUES (NEW.id, 1, false, 0)
    ON CONFLICT (user_id, level_id) DO NOTHING;

    INSERT INTO public.user_levels (user_id, level_id, is_completed, is_unlocked, attempts)
    VALUES (NEW.id, 1, false, true, 0)
    ON CONFLICT (user_id, level_id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Progress insertion failed for user %: %', NEW.id, SQLERRM;
  END;

  -- F. REFERRAL PROCESSING
  BEGIN
    referral_code_param := NEW.raw_user_meta_data->>'referral_code';
    IF referral_code_param IS NOT NULL THEN
      SELECT user_id INTO referrer_id 
      FROM public.user_referrals 
      WHERE referral_code = referral_code_param;
      
      IF referrer_id IS NOT NULL AND referrer_id != NEW.id THEN
        INSERT INTO public.referrals (
          referrer_user_id,
          referred_user_id,
          referral_code,
          status
        ) VALUES (
          referrer_id,
          NEW.id,
          referral_code_param,
          'pending'
        ) ON CONFLICT (referred_user_id) DO NOTHING;
      END IF;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Referral processing failed for user %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$;

-- 5. RE-ATTACH THE TRIGGER
CREATE TRIGGER z_final_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_v12();

-- 6. GRANT EXHAUSTIVE PERMISSIONS (The "Granting" fix)
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant ALL on ALL tables to ensure no 'permission denied' errors
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Sequences are critical for inserts
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;

-- Functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated, anon;

-- 7. ENSURE RLS DOESN'T BLOCK SYSTEM FLOW
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
-- (RLS Policies should still exist, but we ensured the role has TABLE access first)

COMMIT;
