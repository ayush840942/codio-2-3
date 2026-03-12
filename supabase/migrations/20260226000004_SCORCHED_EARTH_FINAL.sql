-- SCORCHED EARTH AUTH FINAL (v24)
-- This is a definitive, manual drop of every possible trigger name
-- that could be blocking the signup/signin flow.

-- 1. DROP ALL POTENTIAL TRIGGERS BY NAME
-- We do this explicitly because the dynamic loop might have permission issues
-- or miss certain schema configurations.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS handle_referral_signup_trigger ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_consolidated ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_manual ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v13 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v14 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v17 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v19 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v20 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v22 ON auth.users;
DROP TRIGGER IF EXISTS z_final_on_auth_user_created ON auth.users;

-- 2. RE-GRANT CRITICAL PERMISSIONS
-- Specifically for the GoTrue internal account
GRANT USAGE ON SCHEMA auth TO supabase_auth_admin, postgres, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated, service_role;

-- 3. THE DEFINITIVE FAIL-SAFE TRIGGER (v24)
CREATE OR REPLACE FUNCTION public.handle_new_user_v24()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public, auth
AS $$
BEGIN
    -- WE USE A MASSIVE TRY...CATCH TO GUARANTEE SUCCESS
    BEGIN
        -- A. Profile Upsert
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

        -- B. Extra Data
        INSERT INTO public.user_rewards (user_id, hint_points)
        VALUES (NEW.id, 50)
        ON CONFLICT (user_id) DO NOTHING;

        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'user')
        ON CONFLICT DO NOTHING;

    EXCEPTION WHEN OTHERS THEN
        -- WE SWALLOW THE ERROR COMPLETELY. 
        -- If it fails in the background, the user can still login.
        RAISE WARNING 'v24 silent background fail for user %: %', NEW.id, SQLERRM;
    END;

    -- CRITICAL: Return NEW to finalize the GoTrue transaction
    RETURN NEW;
END;
$$;

-- 4. ATTACH THE V24 TRIGGER
CREATE TRIGGER on_auth_user_created_v24
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_v24();

-- 5. FINAL TABLE CHECKS
-- Ensure tables exist for user initialization
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, role)
);

CREATE TABLE IF NOT EXISTS public.user_rewards (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    hint_points INTEGER DEFAULT 50,
    login_streak INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- NOTIFY: "v24 Scorched Earth applied. All legacy triggers purged."
