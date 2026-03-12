-- Database Migration: Fix All Permissions
-- Created: 2026-02-25
-- Description: Grant missing table-level permissions to the 'authenticated' role for all user-specific tables.
-- This resolves "permission denied" errors that occur despite RLS being enabled.

-- 1. Ensure schema usage is granted
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Grant Table-Level Permissions to 'authenticated' role
-- This allows the Supabase client to actually run the queries that RLS then filters.

-- Profile and User Data
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_rewards TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_levels TO authenticated;

-- Referrals System
GRANT SELECT, INSERT, UPDATE ON public.user_referrals TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.referrals TO authenticated;

-- Push Notifications
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_tokens TO authenticated;
GRANT SELECT ON public.notification_logs TO authenticated;

-- Sequence access (Crucial for SERIAL/BIGSERIAL columns)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 3. Consistency check for Sequence ownership and grants
DO $$ 
BEGIN
    -- Ensure service_role has full access for edge functions
    GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
    GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
    GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;
END $$;

-- 4. Final verification of RLS on critical tables
ALTER TABLE public.user_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- 5. Ensure "has_role" function doesn't block if missing or misconfigured 
-- (Adding a safe placeholder if it doesn't exist to prevent trigger failures)
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, role text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = $1 AND role = $2
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, text) TO authenticated, anon;

-- 6. Fix Referral System Functions (Missing SECURITY DEFINER could cause "permission denied" during auth)
CREATE OR REPLACE FUNCTION public.handle_referral_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referral_code_param text;
  referrer_id uuid;
BEGIN
  -- Check if referral code was provided in metadata
  referral_code_param := NEW.raw_user_meta_data->>'referral_code';
  
  IF referral_code_param IS NOT NULL THEN
    -- Find the referrer
    SELECT user_id INTO referrer_id 
    FROM public.user_referrals 
    WHERE referral_code = referral_code_param;
    
    IF referrer_id IS NOT NULL AND referrer_id != NEW.id THEN
      -- Create referral record
      INSERT INTO public.referrals (
        referrer_user_id,
        referred_user_id,
        referral_code,
        status
      ) VALUES (
        referrer_id,
        NEW.id,
        referral_code_param,
        'pending'
      );
    END IF;
  END IF;
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block authentication
  RAISE WARNING 'handle_referral_signup trigger FAILED for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_referral_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update total_referrals count
  UPDATE public.user_referrals 
  SET total_referrals = (
    SELECT COUNT(*) 
    FROM public.referrals 
    WHERE referrer_user_id = NEW.referrer_user_id
  )
  WHERE user_id = NEW.referrer_user_id;

  -- Update completed_referrals count if status changed to completed
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE public.user_referrals 
    SET completed_referrals = (
      SELECT COUNT(*) 
      FROM public.referrals 
      WHERE referrer_user_id = NEW.referrer_user_id AND status = 'completed'
    )
    WHERE user_id = NEW.referrer_user_id;
  END IF;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'update_referral_stats trigger FAILED: %', SQLERRM;
  RETURN NEW;
END;
$$;
