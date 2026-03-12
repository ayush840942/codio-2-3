-- 1. CLEANUP: Drop existing triggers and functions to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. SCHEMA STABILIZATION: Ensure all tables have required columns
DO $$ 
BEGIN
    -- Profiles table enhancements
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

-- Drop strict unique constraints that cause Google Auth collisions
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_username_key;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_name_key;

-- Create partial unique indices that ignore NULLs
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_unique ON public.profiles (username) WHERE username IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_user_name_unique ON public.profiles (user_name) WHERE user_name IS NOT NULL;

-- 3. ROBUST TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  counter INTEGER := 0;
BEGIN
  -- Generate a base username from email or name
  base_username := LOWER(COALESCE(
    NEW.raw_user_meta_data->>'username', 
    NEW.raw_user_meta_data->>'name',
    SPLIT_PART(NEW.email, '@', 1)
  ));
  
  -- Remove special characters for safety
  base_username := REGEXP_REPLACE(base_username, '[^a-z0-9]', '', 'g');
  final_username := base_username;

  -- 4. COLLISION RESOLUTION: Handle duplicate usernames (max 5 retries)
  LOOP
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) OR counter >= 5;
    counter := counter + 1;
    final_username := base_username || counter || (floor(random() * 90) + 10)::text;
  END LOOP;

  -- 5. ATOMIC RECORD CREATION
  -- Profile
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
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
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
  
  -- Rewards (ensure it exists)
  INSERT INTO public.user_rewards (user_id, hint_points, login_streak)
  VALUES (NEW.id, 50, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Progress (Level 1)
  INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
  VALUES (NEW.id, 1, false, 0)
  ON CONFLICT (user_id, level_id) DO NOTHING;

  -- Levels (Level 1 unlocked)
  INSERT INTO public.user_levels (user_id, level_id, is_completed, is_unlocked, attempts)
  VALUES (NEW.id, 1, false, true, 0)
  ON CONFLICT (user_id, level_id) DO NOTHING;

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  -- CRITICAL ERROR HANDLING: 
  -- Never block authentication if profile creation fails.
  -- Instead, log the warning and let the user log in. 
  -- The AuthContext will handle missing profiles by retrying or showing a guest state.
  RAISE WARNING 'handle_new_user trigger FAILED for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- 6. REBUILD TRIGGER
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. RE-GRANT PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
