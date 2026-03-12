
-- 1. DROP ALL DUPLICATE TRIGGERS TO START FRESH
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS handle_referral_signup_trigger ON auth.users;

-- 2. CREATE A ROBUST CONSOLIDATED FUNCTION
CREATE OR REPLACE FUNCTION public.handle_new_user_consolidated()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  base_display_name TEXT;
  final_display_name TEXT;
  counter INTEGER := 0;
  referral_code_param TEXT;
  referrer_id UUID;
BEGIN
  -- A. PREPARE USERNAME (LOWERCASE, NO SPECIAL CHARS)
  base_username := LOWER(COALESCE(
    NEW.raw_user_meta_data->>'username', 
    NEW.raw_user_meta_data->>'name',
    SPLIT_PART(NEW.email, '@', 1)
  ));
  base_username := REGEXP_REPLACE(base_username, '[^a-z0-9]', '', 'g');
  IF base_username = '' THEN base_username := 'user'; END IF;
  final_username := base_username;

  -- B. PREPARE DISPLAY NAME
  base_display_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'name',
    final_username
  );
  final_display_name := base_display_name;

  -- C. COLLISION RESOLUTION: Handle duplicate usernames
  LOOP
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) OR counter >= 10;
    counter := counter + 1;
    final_username := base_username || counter || (floor(random() * 90) + 10)::text;
  END LOOP;

  -- D. ATOMIC PROFILE CREATION
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
    final_display_name,
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
  
  -- E. ESSENTIAL RECORDS
  INSERT INTO public.user_rewards (user_id, hint_points, login_streak)
  VALUES (NEW.id, 50, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
  VALUES (NEW.id, 1, false, 0)
  ON CONFLICT (user_id, level_id) DO NOTHING;

  INSERT INTO public.user_levels (user_id, level_id, is_completed, is_unlocked, attempts)
  VALUES (NEW.id, 1, false, true, 0)
  ON CONFLICT (user_id, level_id) DO NOTHING;

  -- F. REFERRAL LOGIC (CONSOLIDATED)
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

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  -- NEVER BLOCK AUTHENTICATION
  RAISE WARNING 'handle_new_user_consolidated trigger FAILED for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- 3. RE-CREATE THE TRIGGER
CREATE TRIGGER on_auth_user_created_consolidated
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_consolidated();

-- 4. ENSURE PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_rewards TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_levels TO authenticated;
