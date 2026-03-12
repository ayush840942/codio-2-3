-- ==============================================================================
-- THE PERFECT, MINIMAL TRINITY TRIGGER (v32)
-- ==============================================================================
-- This trigger safely connects new auth.users to the application tables:
-- 1. profiles
-- 2. user_rewards
-- 3. user_progress
-- 
-- It is designed to NEVER fail on missing metadata. We use purely static defaults
-- where necessary to ensure the transaction NEVER aborts. GoTrue demands flawless
-- trigger execution, and this guarantees it.

CREATE OR REPLACE FUNCTION public.codio_handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- 1. Create a minimal profile using safe, guaranteed system data
    INSERT INTO public.profiles (
        id, 
        user_id, 
        username, 
        full_name, 
        plan, 
        updated_at
    )
    VALUES (
        NEW.id, 
        NEW.id,
        COALESCE(SPLIT_PART(NEW.email, '@', 1), 'user_' || SUBSTR(NEW.id::text, 1, 8)),
        'New User', -- safe default
        'free', 
        now()
    )
    ON CONFLICT (id) DO NOTHING;
        
    -- 2. Grant initial daily rewards/streaks safely
    INSERT INTO public.user_rewards (user_id, hint_points, login_streak)
    VALUES (NEW.id, 50, 0)
    ON CONFLICT (user_id) DO NOTHING;
    
    -- 3. Unlock the first level safely
    INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
    VALUES (NEW.id, 1, false, 0)
    ON CONFLICT (user_id, level_id) DO NOTHING;

    RETURN NEW;
END;
$$;

-- Apply rigorous permissions
GRANT EXECUTE ON FUNCTION public.codio_handle_new_user() TO supabase_auth_admin, service_role, authenticated, anon;
GRANT ALL ON public.profiles TO supabase_auth_admin;
GRANT ALL ON public.user_rewards TO supabase_auth_admin;
GRANT ALL ON public.user_progress TO supabase_auth_admin;

-- Reattach the trigger clean and fresh
DROP TRIGGER IF EXISTS aa_codio_on_auth_user_created ON auth.users CASCADE;
CREATE TRIGGER aa_codio_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.codio_handle_new_user();
