
-- Fix critical database security issues

-- 1. Add RLS policies for payment_orders table
CREATE POLICY "Users can view their own payment orders" ON payment_orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_purchases up 
      WHERE up.order_id = payment_orders.order_id 
      AND up.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM user_subscriptions us 
      WHERE us.order_id = payment_orders.order_id 
      AND us.user_id = auth.uid()
    )
  );

CREATE POLICY "Edge functions can manage payment orders" ON payment_orders
  FOR ALL USING (true);

-- 2. Add RLS policies for songs table  
CREATE POLICY "Anyone can view songs" ON songs
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can modify songs" ON songs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can update songs" ON songs
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can delete songs" ON songs
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- 3. Fix database functions with proper security settings
CREATE OR REPLACE FUNCTION public.update_referral_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
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
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_referral_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  referral_code_param text;
BEGIN
  -- Check if referral code was provided in metadata
  referral_code_param := NEW.raw_user_meta_data->>'referral_code';
  
  IF referral_code_param IS NOT NULL THEN
    -- Find the referrer
    DECLARE
      referrer_id uuid;
    BEGIN
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
    END;
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (id, user_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  
  -- Create initial rewards for new user
  INSERT INTO public.user_rewards (user_id, hint_points, login_streak)
  VALUES (NEW.id, 50, 0);
  
  -- Create initial progress for level 1
  INSERT INTO public.user_progress (user_id, level_id, completed, attempts)
  VALUES (NEW.id, 1, false, 0);
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_progress(
  p_level_id integer, 
  p_completed boolean DEFAULT true, 
  p_score integer DEFAULT 0, 
  p_time_spent integer DEFAULT 0, 
  p_solution jsonb DEFAULT NULL::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.user_progress (user_id, level_id, completed, score, time_spent, solution, completion_date, attempts)
  VALUES (auth.uid(), p_level_id, p_completed, p_score, p_time_spent, p_solution, 
          CASE WHEN p_completed THEN now() ELSE NULL END, 1)
  ON CONFLICT (user_id, level_id) 
  DO UPDATE SET
    completed = EXCLUDED.completed,
    score = GREATEST(public.user_progress.score, EXCLUDED.score),
    time_spent = public.user_progress.time_spent + EXCLUDED.time_spent,
    solution = EXCLUDED.solution,
    completion_date = CASE WHEN EXCLUDED.completed AND NOT public.user_progress.completed 
                      THEN now() ELSE public.user_progress.completion_date END,
    attempts = public.user_progress.attempts + 1,
    updated_at = now();
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_progress_summary()
RETURNS TABLE(
  total_levels integer, 
  completed_levels integer, 
  total_xp integer, 
  current_streak integer, 
  last_completion timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    200 as total_levels,
    COALESCE((SELECT COUNT(*) FROM public.user_progress WHERE user_id = auth.uid() AND completed = true), 0)::INTEGER as completed_levels,
    COALESCE((SELECT SUM(pl.xp_reward) 
             FROM public.user_progress up 
             JOIN public.puzzle_levels pl ON up.level_id = pl.id 
             WHERE up.user_id = auth.uid() AND up.completed = true), 0)::INTEGER as total_xp,
    0 as current_streak,
    (SELECT MAX(completion_date) FROM public.user_progress WHERE user_id = auth.uid() AND completed = true) as last_completion;
END;
$function$;

-- 4. Add validation triggers for critical data
CREATE OR REPLACE FUNCTION validate_payment_amount()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate payment amount is positive and within reasonable limits
  IF NEW.amount <= 0 THEN
    RAISE EXCEPTION 'Payment amount must be positive';
  END IF;
  
  IF NEW.amount > 1000000 THEN -- Max 10,000 INR in paise
    RAISE EXCEPTION 'Payment amount exceeds maximum limit';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_payment_amount_trigger
  BEFORE INSERT OR UPDATE ON user_purchases
  FOR EACH ROW EXECUTE FUNCTION validate_payment_amount();

CREATE TRIGGER validate_subscription_amount_trigger
  BEFORE INSERT OR UPDATE ON user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION validate_payment_amount();

-- 5. Add security for hint purchases
CREATE OR REPLACE FUNCTION validate_hint_purchase()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate hint amount is within reasonable limits
  IF NEW.hint_amount IS NOT NULL AND NEW.hint_amount <= 0 THEN
    RAISE EXCEPTION 'Hint amount must be positive';
  END IF;
  
  IF NEW.hint_amount IS NOT NULL AND NEW.hint_amount > 1000 THEN
    RAISE EXCEPTION 'Hint amount exceeds maximum limit';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_hint_purchase_trigger
  BEFORE INSERT OR UPDATE ON user_purchases
  FOR EACH ROW EXECUTE FUNCTION validate_hint_purchase();
