-- Fix infinite recursion in user_roles RLS policies

-- First, drop all existing policies on user_roles to start fresh
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admin full access to user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "admin_manage_roles" ON public.user_roles;
DROP POLICY IF EXISTS "users_view_own_roles" ON public.user_roles;

-- Create simple, non-recursive policies for user_roles
-- Users can read their own roles (simple uid check, no recursion)
CREATE POLICY "user_roles_select_own" ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- For inserts/updates/deletes, we use the has_role function which is SECURITY DEFINER
-- This avoids recursion because SECURITY DEFINER bypasses RLS
CREATE POLICY "user_roles_admin_all" ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix user_rewards table policies
DROP POLICY IF EXISTS "Users can view own rewards" ON public.user_rewards;
DROP POLICY IF EXISTS "Users can update own rewards" ON public.user_rewards;
DROP POLICY IF EXISTS "Users can insert own rewards" ON public.user_rewards;

CREATE POLICY "user_rewards_select" ON public.user_rewards
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "user_rewards_insert" ON public.user_rewards
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_rewards_update" ON public.user_rewards
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Fix user_levels table policies
DROP POLICY IF EXISTS "Users can view own levels" ON public.user_levels;
DROP POLICY IF EXISTS "Users can manage own levels" ON public.user_levels;

CREATE POLICY "user_levels_select" ON public.user_levels
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "user_levels_insert" ON public.user_levels
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_levels_update" ON public.user_levels
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Fix user_progress table policies
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can manage own progress" ON public.user_progress;

CREATE POLICY "user_progress_select" ON public.user_progress
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "user_progress_insert" ON public.user_progress
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_progress_update" ON public.user_progress
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Fix profiles table policies
DROP POLICY IF EXISTS "Profiles are viewable by owner" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;

CREATE POLICY "profiles_select" ON public.profiles
FOR SELECT TO authenticated
USING (id = auth.uid());

CREATE POLICY "profiles_insert" ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update" ON public.profiles
FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());