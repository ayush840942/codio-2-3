-- ==============================================================================
-- NUCLEAR OPTION: DROP ALL TRIGGERS
-- ==============================================================================
-- Run this in your Supabase SQL Editor to completely remove the trigger.
-- If signups work AFTER running this, we know 100% the trigger is the problem.
-- If signups STILL FAIL, the issue is not the trigger, but something deeper in GoTrue.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS handle_referral_signup_trigger ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_consolidated ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_manual ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v13 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v14 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v17 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v19 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v20 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created_v22 ON auth.users CASCADE;
DROP TRIGGER IF EXISTS z_final_on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS z_auth_diagnostic_sniffer ON auth.users CASCADE;
DROP TRIGGER IF EXISTS a_on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS aa_codio_on_auth_user_created ON auth.users CASCADE;

DROP FUNCTION IF EXISTS public.codio_handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
