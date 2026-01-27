
-- Add username field to profiles table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'username') THEN
        ALTER TABLE profiles ADD COLUMN username TEXT UNIQUE;
    END IF;
END $$;

-- Create puzzle_hints table to store context-aware hints for each puzzle level
CREATE TABLE IF NOT EXISTS public.puzzle_hints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level_id INTEGER NOT NULL,
  hint_type TEXT NOT NULL CHECK (hint_type IN ('encouragement', 'direction', 'specific', 'solution')),
  content TEXT NOT NULL,
  cost INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on puzzle_hints table
ALTER TABLE public.puzzle_hints ENABLE ROW LEVEL SECURITY;

-- Create policy for puzzle_hints - anyone can read hints
CREATE POLICY "Anyone can view puzzle hints" 
  ON public.puzzle_hints 
  FOR SELECT 
  USING (true);

-- Insert sample hints for different levels
INSERT INTO public.puzzle_hints (level_id, hint_type, content, cost, order_index) VALUES
(1, 'encouragement', 'Great start! HTML is the foundation of web development. Take your time to understand each element.', 0, 1),
(1, 'direction', 'Focus on the basic HTML structure. You need opening and closing tags that match.', 2, 2),
(1, 'specific', 'Look at the expected output. Notice how each HTML element has a specific purpose and structure.', 3, 3),
(1, 'solution', 'The solution involves creating proper HTML elements with correct opening and closing tags in the right order.', 5, 4),

(2, 'encouragement', 'HTML elements are like building blocks. Each one serves a specific purpose!', 0, 1),
(2, 'direction', 'Think about semantic HTML. What type of content are you trying to display?', 2, 2),
(2, 'specific', 'Check the element names carefully. Make sure your tags match the expected structure.', 3, 3),
(2, 'solution', 'Use the appropriate HTML elements for the content type and ensure proper nesting.', 5, 4),

(3, 'encouragement', 'CSS styling brings your HTML to life. Every property has a purpose!', 0, 1),
(3, 'direction', 'Focus on the CSS properties that affect layout and appearance. Order matters in CSS.', 2, 2),
(3, 'specific', 'Look at the expected visual result. What CSS properties would create that appearance?', 3, 3),
(3, 'solution', 'Apply the correct CSS properties with proper values to achieve the desired styling.', 5, 4);

-- Add more sample hints for levels 4-10
INSERT INTO public.puzzle_hints (level_id, hint_type, content, cost, order_index) VALUES
(4, 'encouragement', 'CSS selectors are powerful tools for targeting specific elements!', 0, 1),
(4, 'direction', 'Think about which elements you want to style and how to target them effectively.', 2, 2),
(4, 'specific', 'Consider the specificity of your selectors and how they cascade.', 3, 3),
(4, 'solution', 'Use the appropriate CSS selectors to target the elements and apply the required styles.', 5, 4),

(5, 'encouragement', 'JavaScript adds interactivity to your web pages. Every function has a purpose!', 0, 1),
(5, 'direction', 'Focus on the JavaScript syntax and how functions work together.', 2, 2),
(5, 'specific', 'Check your variable names and function calls. JavaScript is case-sensitive.', 3, 3),
(5, 'solution', 'Implement the JavaScript logic using proper syntax and function calls.', 5, 4);

-- Update subscription plans in the existing table structure
-- First, let's ensure we have a plans table for the new subscription structure
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('month', 'year')),
  features JSONB NOT NULL,
  popular BOOLEAN DEFAULT false,
  stripe_price_id TEXT,
  razorpay_plan_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on subscription plans
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- Create policy for subscription plans - anyone can read plans
CREATE POLICY "Anyone can view subscription plans" 
  ON public.subscription_plans 
  FOR SELECT 
  USING (true);

-- Insert updated subscription plans with new features
INSERT INTO public.subscription_plans (id, name, description, price, period, features, popular, razorpay_plan_id) VALUES
('free', 'Free Plan', 'Perfect for getting started with coding', 0, 'month', 
 '[
   {"name": "Access to first 20 levels", "included": true},
   {"name": "Basic HTML & CSS lessons", "included": true},
   {"name": "Community support", "included": true},
   {"name": "Basic progress tracking", "included": true},
   {"name": "Limited hints (50 per week)", "included": true},
   {"name": "Advanced lessons", "included": false},
   {"name": "Unlimited hints", "included": false},
   {"name": "Priority support", "included": false}
 ]'::jsonb, false, null),

('premium-monthly', 'Premium Monthly', 'Unlock your full coding potential with monthly billing', 499, 'month',
 '[
   {"name": "Access to all 200+ levels", "included": true},
   {"name": "Complete HTML, CSS, JavaScript course", "included": true},
   {"name": "React & Advanced frameworks", "included": true},
   {"name": "Unlimited context-aware hints", "included": true},
   {"name": "Interactive coding playground", "included": true},
   {"name": "Personal progress analytics", "included": true},
   {"name": "Priority email support", "included": true},
   {"name": "Downloadable certificates", "included": true},
   {"name": "Ad-free experience", "included": true},
   {"name": "Code review by experts", "included": true}
 ]'::jsonb, false, 'plan_premium_monthly'),

('premium-yearly', 'Premium Yearly', 'Best value! Get all premium features with yearly billing and save 40%', 3599, 'year',
 '[
   {"name": "Everything in Monthly plan", "included": true},
   {"name": "Save 40% with yearly billing", "included": true},
   {"name": "Exclusive advanced projects", "included": true},
   {"name": "1-on-1 mentor sessions (2/month)", "included": true},
   {"name": "Early access to new features", "included": true},
   {"name": "Custom learning path creation", "included": true},
   {"name": "Industry certification prep", "included": true},
   {"name": "Advanced debugging tools", "included": true},
   {"name": "Priority feature requests", "included": true},
   {"name": "LinkedIn skill verification", "included": true}
 ]'::jsonb, true, 'plan_premium_yearly');

-- Update existing plans on conflict
INSERT INTO public.subscription_plans (id, name, description, price, period, features, popular, razorpay_plan_id) VALUES
('pro-monthly', 'Pro Monthly', 'For serious developers who want advanced features', 799, 'month',
 '[
   {"name": "Everything in Premium", "included": true},
   {"name": "Advanced algorithm challenges", "included": true},
   {"name": "System design courses", "included": true},
   {"name": "Interview preparation kit", "included": true},
   {"name": "Code performance optimization", "included": true},
   {"name": "Team collaboration features", "included": true},
   {"name": "API integration projects", "included": true},
   {"name": "Database design courses", "included": true},
   {"name": "Unlimited mentor sessions", "included": true},
   {"name": "Custom portfolio builder", "included": true}
 ]'::jsonb, false, 'plan_pro_monthly')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  popular = EXCLUDED.popular,
  updated_at = now();
