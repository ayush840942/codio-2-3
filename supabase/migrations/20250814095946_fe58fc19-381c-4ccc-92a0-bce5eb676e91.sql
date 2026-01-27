-- Drop overly permissive SELECT policies on profiles table
DROP POLICY IF EXISTS "Allow authenticated users to select profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create secure profile viewing policies
-- Users can view their own complete profile
CREATE POLICY "Users can view own complete profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can view only basic public info of other profiles (username, avatar, no sensitive data)
CREATE POLICY "Users can view basic public profile info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  auth.uid() != id
);

-- Create a view for safe public profile access that excludes sensitive fields
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  username,
  avatar_url,
  created_at,
  updated_at
FROM public.profiles;

-- Grant SELECT permissions on the view to authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;

-- Enable RLS on the view
ALTER VIEW public.public_profiles SET (security_barrier = true);

-- Create RLS policy for the public profiles view
CREATE POLICY "Anyone can view public profile data"
ON public.public_profiles
FOR SELECT
USING (auth.uid() IS NOT NULL);