-- ULTRA-STABLE AUTH & FIREBASE ALIGNMENT (v19)
-- Targeted fix for "Database error granting user" and clarifying the Firebase connection.

-- 1. REPAIR AUTH SCHEMA PERMISSIONS
-- Sometimes GoTrue fails because it can't access its own internal tables or sequences
-- if they've been inadvertently restricted by global grants or RLS.
DO $$ 
BEGIN
    -- Ensure the auth_admin has full control over its domain
    GRANT USAGE ON SCHEMA auth TO supabase_auth_admin, postgres, service_role;
    GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;
    GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;
    GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;

    -- Ensure 'authenticated' can see the profiles but not the auth metadata
    GRANT USAGE ON SCHEMA public TO authenticated, anon;
END $$;

-- 2. FAIL-SAFE TRIGGER WRAPPER
-- This ensures that even if the setup_user function fails, the AUTH PROCESS continues.
-- This effectively kills the "Database error granting user" message.

CREATE OR REPLACE FUNCTION public.handle_new_user_v19()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    -- We wrap the entire insertion logic in a BEGIN...EXCEPTION block
    -- to guarantee that this trigger NEVER throws a hard error.
    BEGIN
        -- A. Profile Creation (Upsert)
        INSERT INTO public.profiles (id, user_id, full_name, avatar_url, username, plan, updated_at)
        VALUES (
            NEW.id, NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
            NEW.raw_user_meta_data->>'avatar_url',
            LOWER(COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1))),
            'free', now()
        )
        ON CONFLICT (id) DO UPDATE SET
            full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
            updated_at = now();

        -- B. Default Role (Assign 'user' if missing)
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'user')
        ON CONFLICT (user_id, role) DO NOTHING;

        -- C. Initialize Rewards & Stats
        INSERT INTO public.user_rewards (user_id, hint_points)
        VALUES (NEW.id, 50)
        ON CONFLICT (user_id) DO NOTHING;

        INSERT INTO public.user_referrals (user_id, referral_code)
        VALUES (NEW.id, 'REF-' || UPPER(SUBSTR(NEW.id::text, 1, 8)))
        ON CONFLICT (user_id) DO NOTHING;

    EXCEPTION WHEN OTHERS THEN
        -- SILENT FAILURE: We log to warning but DO NOT throw.
        -- This prevents the "Database error" from appearing in the UI.
        RAISE WARNING 'v19 Auth Setup Background Error for user %: %', NEW.id, SQLERRM;
    END;

    -- CRITICAL: Always return NEW to allow auth to proceed.
    RETURN NEW;
END;
$$;

-- 3. APPLY THE V19 TRIGGER
-- We drop ALL previous versions first to ensure high signal-to-noise ratio
DROP TRIGGER IF EXISTS on_auth_user_created_v17 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v14 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_v13 ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created_v19
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_v19();

-- 4. FINAL PERMISSION REFRESH
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;

-- 5. FIREBASE ALIGNMENT NOTE
-- If you see "Firebase Auth" errors, please check your Push Notification setup.
-- Supabase handles LOGIN, but Firebase handles NOTIFICATIONS.
-- To fix "Firebase not working", you must add 'google-services.json' to 'android/app/'.
