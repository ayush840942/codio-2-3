
-- First, add the missing column to the existing puzzle_levels table
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS coins_reward INTEGER DEFAULT 5;

-- Update existing records to have default coins_reward
UPDATE public.puzzle_levels SET coins_reward = 5 WHERE coins_reward IS NULL;

-- Create or update user_progress table to track level completion
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level_id INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  attempts INTEGER NOT NULL DEFAULT 0,
  completion_date TIMESTAMP WITH TIME ZONE,
  score INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  solution JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, level_id)
);

-- Add missing columns to puzzle_levels if they don't exist
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS expected_output TEXT;
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS available_blocks JSONB;
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS solution_blocks JSONB;
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS hints JSONB;
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS theory TEXT;
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS learning_objectives JSONB;
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS concepts JSONB;
ALTER TABLE public.puzzle_levels ADD COLUMN IF NOT EXISTS practice_hints JSONB;

-- Insert/Update the first 10 levels with proper data
INSERT INTO public.puzzle_levels (id, title, description, topic, difficulty, puzzle_type, xp_reward, coins_reward, expected_output, available_blocks, solution_blocks, hints, theory, learning_objectives, concepts, practice_hints) VALUES
(1, 'Hello World', 'Create your first program that displays Hello World', 'Basic Programming', 'easy', 'drag-drop', 10, 5, 'Hello World', '["console.log(", "\"Hello World\"", ");"]', '["console.log(", "\"Hello World\"", ");"]', '["Start with console.log to display text"]', 'Learn the basics of programming output', '["Programming fundamentals", "Console output"]', '["Output", "Text display"]', '["Use console.log() to print text", "Remember to use quotes for text"]'),
(2, 'Variables', 'Learn to create and use variables', 'Basic Programming', 'easy', 'drag-drop', 10, 5, 'My name is John', '["let name = ", "\"John\"", ";", "console.log(", "\"My name is \"", "+ name", ");"]', '["let name = ", "\"John\"", ";", "console.log(", "\"My name is \"", "+ name", ");"]', '["Variables store data that can be used later"]', 'Understanding variables and data storage', '["Variables", "Data types", "String concatenation"]', '["Variables", "Assignment"]', '["Use let to create variables", "Combine text with + operator"]'),
(3, 'Numbers', 'Work with numbers and basic math', 'Basic Programming', 'easy', 'drag-drop', 10, 5, '15', '["let a = ", "10", ";", "let b = ", "5", ";", "console.log(", "a + b", ");"]', '["let a = ", "10", ";", "let b = ", "5", ";", "console.log(", "a + b", ");"]', '["Numbers don''t need quotes", "Use + for addition"]', 'Learn numeric operations and arithmetic', '["Numbers", "Arithmetic", "Mathematical operations"]', '["Math", "Addition"]', '["Numbers don''t need quotes", "Use basic math operators"]'),
(4, 'Conditions', 'Learn if statements and decision making', 'Basic Programming', 'easy', 'drag-drop', 15, 8, 'You are an adult', '["let age = ", "20", ";", "if (", "age >= 18", ") {", "console.log(", "\"You are an adult\"", ");", "}"]', '["let age = ", "20", ";", "if (", "age >= 18", ") {", "console.log(", "\"You are an adult\"", ");", "}"]', '["if statements make decisions", "Use >= for greater than or equal"]', 'Understanding conditional logic and decision making', '["Conditions", "If statements", "Comparison operators"]', '["Decision making", "Logic"]', '["if statements control program flow", "Use comparison operators"]'),
(5, 'Loops', 'Repeat actions with loops', 'Basic Programming', 'medium', 'drag-drop', 15, 8, '1\n2\n3\n4\n5', '["for (", "let i = 1", "; ", "i <= 5", "; ", "i++", ") {", "console.log(", "i", ");", "}"]', '["for (", "let i = 1", "; ", "i <= 5", "; ", "i++", ") {", "console.log(", "i", ");", "}"]', '["for loops repeat code", "i++ increases i by 1"]', 'Master repetition and iteration in programming', '["Loops", "For loops", "Iteration", "Increment"]', '["Repetition", "Counting"]', '["for loops have three parts", "i++ is shorthand for i = i + 1"]')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  topic = EXCLUDED.topic,
  difficulty = EXCLUDED.difficulty,
  xp_reward = EXCLUDED.xp_reward,
  coins_reward = EXCLUDED.coins_reward,
  expected_output = EXCLUDED.expected_output,
  available_blocks = EXCLUDED.available_blocks,
  solution_blocks = EXCLUDED.solution_blocks,
  hints = EXCLUDED.hints,
  theory = EXCLUDED.theory,
  learning_objectives = EXCLUDED.learning_objectives,
  concepts = EXCLUDED.concepts,
  practice_hints = EXCLUDED.practice_hints,
  updated_at = now();

-- Enable RLS on tables
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.puzzle_levels ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Anyone can view puzzle levels" ON public.puzzle_levels;

-- Create RLS policies for user_progress
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for puzzle_levels (public read access)
CREATE POLICY "Anyone can view puzzle levels" ON public.puzzle_levels
  FOR SELECT USING (true);

-- Create function to update user progress
CREATE OR REPLACE FUNCTION public.update_user_progress(
  p_level_id INTEGER,
  p_completed BOOLEAN DEFAULT true,
  p_score INTEGER DEFAULT 0,
  p_time_spent INTEGER DEFAULT 0,
  p_solution JSONB DEFAULT NULL
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_progress (user_id, level_id, completed, score, time_spent, solution, completion_date, attempts)
  VALUES (auth.uid(), p_level_id, p_completed, p_score, p_time_spent, p_solution, 
          CASE WHEN p_completed THEN now() ELSE NULL END, 1)
  ON CONFLICT (user_id, level_id) 
  DO UPDATE SET
    completed = EXCLUDED.completed,
    score = GREATEST(user_progress.score, EXCLUDED.score),
    time_spent = user_progress.time_spent + EXCLUDED.time_spent,
    solution = EXCLUDED.solution,
    completion_date = CASE WHEN EXCLUDED.completed AND NOT user_progress.completed 
                      THEN now() ELSE user_progress.completion_date END,
    attempts = user_progress.attempts + 1,
    updated_at = now();
END;
$$;

-- Create function to get user progress summary
CREATE OR REPLACE FUNCTION public.get_user_progress_summary()
RETURNS TABLE (
  total_levels INTEGER,
  completed_levels INTEGER,
  total_xp INTEGER,
  current_streak INTEGER,
  last_completion TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    200 as total_levels,
    COALESCE((SELECT COUNT(*) FROM user_progress WHERE user_id = auth.uid() AND completed = true), 0)::INTEGER as completed_levels,
    COALESCE((SELECT SUM(pl.xp_reward) 
             FROM user_progress up 
             JOIN puzzle_levels pl ON up.level_id = pl.id 
             WHERE up.user_id = auth.uid() AND up.completed = true), 0)::INTEGER as total_xp,
    0 as current_streak,
    (SELECT MAX(completion_date) FROM user_progress WHERE user_id = auth.uid() AND completed = true) as last_completion;
END;
$$;
