
-- Add an 'avatar_url' column to the 'profiles' table to store user profile image links.
-- This command is safe to re-run; it will only add the column if it doesn't already exist.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create a new storage bucket named 'avatars' for storing profile photos.
-- This bucket is set to 'public' to allow easy access to the images.
-- This command is also safe to re-run.
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- To ensure the script can be re-run without errors, we'll drop existing policies before creating new ones.
DROP POLICY IF EXISTS "Public read access for avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;

-- Create a policy to allow anyone to view images in the 'avatars' bucket.
CREATE POLICY "Public read access for avatars"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );

-- Create a policy that allows any logged-in user to upload an image to the 'avatars' bucket.
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'avatars' );

-- Create a policy that allows users to update their own profile picture.
CREATE POLICY "Users can update their own avatars"
ON storage.objects FOR UPDATE
USING ( auth.uid() = owner )
WITH CHECK ( bucket_id = 'avatars' );

-- Create a policy that allows users to delete their own profile picture.
CREATE POLICY "Users can delete their own avatars"
ON storage.objects FOR DELETE
USING ( auth.uid() = owner );
