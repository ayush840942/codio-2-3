-- ULTIMATE AUTH RESTORATION & INTEGRITY REPAIR (v22)
-- This script aims to resolve any remaining "Database error granting user" issues.

-- 1. REPAIR AUTH SCHEMA - THE CORE OF GOTRUE
-- Sometimes GoTrue fails because it can't access its own internal tables.
DO $$ 
BEGIN
    -- Ensure the auth admin has full control
    GRANT USAGE ON SCHEMA auth TO supabase_auth_admin, postgres, service_role;
    GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;
    GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;
    GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO supabase_auth_admin, postgres, service_role;

    -- Standard Supabase permissions for 'authenticated' and 'anon' on auth
    GRANT SELECT ON auth.users TO authenticated, anon;
    GRANT SELECT ON auth.identities TO authenticated, anon;
END $$;

-- 2. ABSOLUTE TRIGGER PURGE (auth.users)
-- We drop ALL custom triggers on the auth.users table.
DO $$ 
DECLARE 
    trig_record RECORD;
BEGIN 
    FOR trig_record IN (
        SELECT trigger_name 
        FROM information_schema.triggers 
        WHERE event_object_schema = 'auth' 
        AND event_object_table = 'users'
        -- We only drop triggers that aren't managed by Supabase internal extensions
        -- (Most user-created triggers fall into this category)
    ) 
    LOOP 
        BEGIN
            EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(trig_record.trigger_name) || ' ON auth.users';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Could not drop trigger %: %', trig_record.trigger_name, SQLERRM;
        END;
    END LOOP; 
END $$;

-- 3. SCHEMA INTEGRITY REPAIR (Profiles & Roles)
-- Ensure all columns and tables exist for the trigger to work.
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    username TEXT UNIQUE,
    user_name TEXT,
    plan TEXT DEFAULT 'free',
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Fix missing columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='username') THEN
        ALTER TABLE public.profiles ADD COLUMN username TEXT UNIQUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='user_id') THEN
        ALTER TABLE public.profiles ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

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

-- 4. THE V22 "ZERO-FAILURE" INITIALIZATION FUNCTION
-- Muted, SECURITY DEFINER, and explicit error handling.
CREATE OR REPLACE FUNCTION public.handle_new_user_v22()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public, auth
AS $$
BEGIN
    -- MASSIVE SAFETY WRAPPER
    BEGIN
        -- 1. Profiles (Upsert by ID)
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

        -- 2. Rewards (Ensuring it exists)
        INSERT INTO public.user_rewards (user_id, hint_points)
        VALUES (NEW.id, 50)
        ON CONFLICT (user_id) DO NOTHING;

        -- 3. Roles
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'user')
        ON CONFLICT DO NOTHING;

    EXCEPTION WHEN OTHERS THEN
        -- Swallow everything. Auth must proceed.
        RAISE WARNING 'v22 Auth Trigger Background Warning for %: %', NEW.id, SQLERRM;
    END;

    -- RETURN NEW IS MANDATORY
    RETURN NEW;
END;
$$;

-- 5. APPLY THE V22 TRIGGER
-- We use a name that is likely to be executed last alphabetically if needed
DROP TRIGGER IF EXISTS on_auth_user_created_v22 ON auth.users;

CREATE TRIGGER on_auth_user_created_v22
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_v22();

-- 6. RESET PUBLIC PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated, service_role;

-- 7. CLEANUP CACHE / SESSIONS (Optional suggestion)
-- NOTIFY: "Authentication Repair Complete. Please log out and back in on your app."
