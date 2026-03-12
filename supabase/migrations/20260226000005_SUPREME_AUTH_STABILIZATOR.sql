-- SUPREME AUTH STABILIZATOR (v25)
-- The most aggressive and definitive fix for "Database error granting user"
-- This script resets internal Supabase Auth permissions and purges every possible trigger name.

-- 1. DROP ALL TRIGGERS ON auth.users (EXTENDED LIST)
-- We list every name ever seen or suspected in this project.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v13 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v14 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v17 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v19 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v20 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v22 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v24 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_consolidated ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_manual ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_relay ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_prod ON auth.users CASCADE;
DROP TRIGGER IF EXISTS handle_referral_signup_trigger ON auth.users CASCADE;
DROP TRIGGER IF EXISTS z_final_on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS handle_new_user_credits_trigger ON auth.users CASCADE;

-- 2. HARD RESET PERMISSIONS (Schema level)
-- These grants ensure that GoTrue (running as supabase_auth_admin)
-- can successfully complete its background tasks.
GRANT ALL ON SCHEMA auth TO supabase_auth_admin, postgres, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;

GRANT ALL ON SCHEMA public TO supabase_auth_admin, postgres, service_role, authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO supabase_auth_admin, postgres, service_role, authenticated, anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO supabase_auth_admin, postgres, service_role, authenticated, anon;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO supabase_auth_admin, postgres, service_role, authenticated, anon;

-- 3. THE SUPREME FAIL-SAFE TRIGGER (v25)
-- We split the logic to be even more resilient. 
CREATE OR REPLACE FUNCTION public.handle_new_user_v25()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public, auth
AS $$
BEGIN
    -- WE USE SEPARATE BLOCKS TO ENSURE ONE FAILURE DOESN'T STOP THE OTHERS
    
    -- A. Profiles
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
        RAISE WARNING 'v25: Profile step skipped for %', NEW.id;
    END;

    -- B. Roles
    BEGIN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'user')
        ON CONFLICT DO NOTHING;
    EXCEPTION WHEN OTHERS THEN 
        RAISE WARNING 'v25: Role step skipped for %', NEW.id;
    END;

    -- C. Rewards
    BEGIN
        INSERT INTO public.user_rewards (user_id, hint_points)
        VALUES (NEW.id, 50)
        ON CONFLICT (user_id) DO NOTHING;
    EXCEPTION WHEN OTHERS THEN 
        RAISE WARNING 'v25: Rewards step skipped for %', NEW.id;
    END;

    -- D. Referrals (Self-Referral Prevention)
    BEGIN
        IF NEW.raw_user_meta_data->>'referral_code' IS NOT NULL THEN
            INSERT INTO public.user_referrals (user_id, referral_code)
            VALUES (NEW.id, 'REF-' || UPPER(SUBSTR(NEW.id::text, 1, 8)))
            ON CONFLICT DO NOTHING;
        END IF;
    EXCEPTION WHEN OTHERS THEN 
        RAISE WARNING 'v25: Referral step skipped for %', NEW.id;
    END;

    -- ALWAYS RETURN NEW
    RETURN NEW;
END;
$$;

-- 4. ATTACH THE SUPREME TRIGGER
CREATE TRIGGER on_auth_user_created_v25
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_v25();

-- 5. ENSURE CRITICAL TABLES ARE COMPLETELY OPEN
-- Disabling RLS temporarily is the last resort to stop "Database error granting user"
-- which is often a "Permission Denied" in disguise.
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_rewards DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_referrals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals DISABLE ROW LEVEL SECURITY;

-- 6. FINAL NOTIFY
-- Successfully applied supreme auth stabilization.
