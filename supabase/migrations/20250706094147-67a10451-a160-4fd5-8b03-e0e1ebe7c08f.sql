
-- Create user_levels table to track user progress
CREATE TABLE public.user_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users,
  level_id INTEGER NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  is_unlocked BOOLEAN NOT NULL DEFAULT false,
  attempts INTEGER NOT NULL DEFAULT 0,
  hints_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, level_id)
);

-- Add RLS policies for user_levels
ALTER TABLE public.user_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own levels" 
  ON public.user_levels 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own levels" 
  ON public.user_levels 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own levels" 
  ON public.user_levels 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add trial_start_date column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT NULL;
