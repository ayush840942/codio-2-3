-- Fix the unique constraint on user_name to allow nulls and handle duplicates better
-- First, drop the existing constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_name_key;

-- Add a partial unique index that only applies to non-null usernames
CREATE UNIQUE INDEX IF NOT EXISTS profiles_user_name_unique_idx 
ON public.profiles (user_name) 
WHERE user_name IS NOT NULL;

-- Update handle_new_user function to not set username by default (let user set it later)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, full_name, avatar_url, user_name)
  VALUES (
    NEW.id,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    NULL  -- Don't set username by default to avoid conflicts
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = now();
  RETURN NEW;
END;
$$;