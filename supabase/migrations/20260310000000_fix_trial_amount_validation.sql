-- Update validate_payment_amount to allow 0 for trials
CREATE OR REPLACE FUNCTION validate_payment_amount()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate payment amount is positive for non-trial plans
  -- For trials, allow 0
  IF NEW.plan_id = 'trial' THEN
    IF NEW.amount != 0 THEN
      RAISE EXCEPTION 'Trial amount must be 0';
    END IF;
  ELSE
    IF NEW.amount <= 0 THEN
      RAISE EXCEPTION 'Payment amount must be positive';
    END IF;
  END IF;
  
  IF NEW.amount > 1000000 THEN -- Max 10,000 INR in paise
    RAISE EXCEPTION 'Payment amount exceeds maximum limit';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
