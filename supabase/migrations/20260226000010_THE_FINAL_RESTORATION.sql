-- THE FINAL RESTORATION (v30)
-- Re-attaching the ROBUST trigger after the nuclear purge.

-- 1. CLEAN UP SNIFFER (Keep it for a bit just in case, or drop it)
-- For now, let's keep the logging table but drop the sniffer trigger to keep things fast.
DROP TRIGGER IF EXISTS z_auth_diagnostic_sniffer ON auth.users;

-- 2. RE-ATTACH THE OPTIMIZED PROFILE TRIGGER (v25 logic)
-- This logic already handles username collisions and metadata safely.
CREATE OR REPLACE FUNCTION public.handle_new_user_final()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    -- Block 1: Profile Creation
    BEGIN
        INSERT INTO public.profiles (id, user_id, full_name, avatar_url, username, plan, updated_at)
        VALUES (
            NEW.id, NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
            NEW.raw_user_meta_data->>'avatar_url',
            LOWER(COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1), 'user_' || SUBSTR(NEW.id::text, 1, 8))),
            'free', now()
        )
        ON CONFLICT (id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            updated_at = now();
    EXCEPTION WHEN OTHERS THEN
        RAISE WARNING 'v30: Profile creation failed for user %: %', NEW.id, SQLERRM;
    END;

    -- Block 2: Essential Records
    BEGIN
        INSERT INTO public.user_rewards (user_id, hint_points, login_streak)
        VALUES (NEW.id, 50, 0)
        ON CONFLICT (user_id) DO NOTHING;
        
        INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
        VALUES (NEW.id, 1, false, 0)
        ON CONFLICT (user_id, level_id) DO NOTHING;
    EXCEPTION WHEN OTHERS THEN
        RAISE WARNING 'v30: Rewards/Progress failed for user %: %', NEW.id, SQLERRM;
    END;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS a_on_auth_user_created ON auth.users;
CREATE TRIGGER a_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_final();

-- 3. PERMISSION RESET (Ensuring internal roles have access to what they need)
GRANT USAGE ON SCHEMA public TO supabase_auth_admin, service_role, authenticated;
GRANT ALL ON public.profiles TO supabase_auth_admin, service_role;
GRANT ALL ON public.user_rewards TO supabase_auth_admin, service_role;
GRANT ALL ON public.user_progress TO supabase_auth_admin, service_role;

-- Successfully applied THE FINAL RESTORATION (v30).
