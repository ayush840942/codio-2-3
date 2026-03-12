
-- 1. Ensure profiles table has all modern columns
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='full_name') THEN
        ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='user_id') THEN
        ALTER TABLE public.profiles ADD COLUMN user_id UUID REFERENCES auth.users(id);
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
END $$;

-- 2. Handle unique constraints safely to avoid Google Auth conflicts
-- Many users might have the same email prefix across different domains/providers
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_username_key;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_name_key;

-- Create partial unique indices that ignore NULLs
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_unique ON public.profiles (username) WHERE username IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_user_name_unique ON public.profiles (user_name) WHERE user_name IS NOT NULL;

-- 3. Robust handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    user_id, 
    full_name, 
    avatar_url, 
    user_name,
    username,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'user_name', SPLIT_PART(NEW.email, '@', 1)),
    LOWER(COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1))),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    user_id = EXCLUDED.id,
    updated_at = now();
  
  -- Also ensure user_rewards exists for the new user
  INSERT INTO public.user_rewards (user_id, hint_points, login_streak)
  VALUES (NEW.id, 50, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Also ensure user_progress exists
  INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
  VALUES (NEW.id, 1, false, 0)
  ON CONFLICT (user_id, level_id) DO NOTHING;

  -- Also ensure user_levels exists (if it has is_unlocked)
  INSERT INTO public.user_levels (user_id, level_id, is_completed, is_unlocked, attempts)
  VALUES (NEW.id, 1, false, true, 0)
  ON CONFLICT (user_id, level_id) DO NOTHING;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Prevent trigger failure from blocking Auth, but log the error
  RAISE WARNING 'Error in handle_new_user trigger for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- 4. Grant appropriate permissions (Standard Supabase setup)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres;

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;

-- 5. Finalize trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
