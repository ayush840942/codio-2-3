-- Drop the problematic RLS policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow users to view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow users to read own role" ON public.user_roles;

-- Create simple, non-recursive policies
CREATE POLICY "Users can view own role"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Allow insert for authenticated users"
ON public.user_roles FOR INSERT
WITH CHECK (auth.uid() = user_id);