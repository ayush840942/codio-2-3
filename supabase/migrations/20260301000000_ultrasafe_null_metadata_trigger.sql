-- ==============================================================================
-- V31 ULTIMATE DEFENSIVE AUTH TRIGGER
-- ==============================================================================
-- This fixes the 500 "Database error granting user" when metadata is completely absent.
-- Supabase GoTrue chokes when triggers have unhandled null JSON cases.

-- 1. DROP THE OLD TRIGGER
DROP TRIGGER IF EXISTS aa_codio_on_auth_user_created ON auth.users CASCADE;
DROP FUNCTION IF EXISTS public.codio_handle_new_user() CASCADE;

-- 2. CREATE A TRULY BULLETPROOF ISOLATED FUNCTION
CREATE OR REPLACE FUNCTION public.codio_handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    clean_username text;
    clean_full_name text;
    clean_avatar text;
    meta jsonb;
BEGIN
    -- VERY DEFENSIVE: Extract metadata safely, ensuring it is at least an empty JSON object
    meta := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);

    -- VERY DEFENSIVE: Extract properties safely
    -- The ->> operator returns null if the key doesn't exist, which is safe.
    clean_full_name := COALESCE(meta->>'full_name', meta->>'name', 'New User');
    clean_avatar := meta->>'avatar_url';

    -- Build the fallback username securely
    clean_username := LOWER(COALESCE(
        meta->>'username',
        SPLIT_PART(COALESCE(NEW.email, 'user'), '@', 1),
        'user_' || SUBSTR(NEW.id::text, 1, 8)
    ));

    -- We remove the giant TRY/CATCH over the entire block.
    -- Supabase GoTrue throws "Database error granting user" if a transaction 
    -- gets aborted, even if we try to swallow the exception, because the 
    -- underlying connection context marks the transaction as aborted.
    -- Instead, we ensure the SQL is strictly valid.

    -- Insert into profiles
    INSERT INTO public.profiles (
        id, 
        user_id, 
        full_name, 
        avatar_url, 
        username, 
        plan, 
        updated_at
    )
    VALUES (
        NEW.id, 
        NEW.id,
        clean_full_name,
        clean_avatar,
        clean_username,
        'free', 
        now()
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = now();
        
    -- Insert initial rewards
    INSERT INTO public.user_rewards (user_id, hint_points, login_streak)
    VALUES (NEW.id, 50, 0)
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Insert initial level progress
    INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
    VALUES (NEW.id, 1, false, 0)
    ON CONFLICT (user_id, level_id) DO NOTHING;

    RETURN NEW;
END;
$$;

-- 3. EXPLICIT GRANTS FOR GOTRUE
GRANT EXECUTE ON FUNCTION public.codio_handle_new_user() TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.codio_handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.codio_handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.codio_handle_new_user() TO anon;

-- 4. ATTACH THE NEW TRIGGER
CREATE TRIGGER aa_codio_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.codio_handle_new_user();

-- 5. GRANTS
GRANT ALL ON public.profiles TO supabase_auth_admin;
GRANT ALL ON public.user_rewards TO supabase_auth_admin;
GRANT ALL ON public.user_progress TO supabase_auth_admin;
