
-- Create user_referrals table to track referral codes and stats
CREATE TABLE user_referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code text UNIQUE NOT NULL,
  total_referrals integer DEFAULT 0,
  completed_referrals integer DEFAULT 0,
  total_xp_earned integer DEFAULT 0,
  total_coins_earned integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create referrals table to track individual referral relationships
CREATE TABLE referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  bonus_xp integer DEFAULT 100,
  bonus_coins integer DEFAULT 50,
  rewards_claimed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  
  -- Ensure a user can only be referred once
  UNIQUE(referred_user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_user_referrals_user_id ON user_referrals(user_id);
CREATE INDEX idx_user_referrals_code ON user_referrals(referral_code);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_user_id);
CREATE INDEX idx_referrals_referred ON referrals(referred_user_id);
CREATE INDEX idx_referrals_status ON referrals(status);

-- Enable RLS (Row Level Security)
ALTER TABLE user_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_referrals
CREATE POLICY "Users can view their own referral data" ON user_referrals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own referral data" ON user_referrals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own referral data" ON user_referrals
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for referrals
CREATE POLICY "Users can view referrals they're involved in" ON referrals
  FOR SELECT USING (auth.uid() = referrer_user_id OR auth.uid() = referred_user_id);

CREATE POLICY "Users can insert referrals" ON referrals
  FOR INSERT WITH CHECK (auth.uid() = referred_user_id);

CREATE POLICY "Users can update referrals they're involved in" ON referrals
  FOR UPDATE USING (auth.uid() = referrer_user_id OR auth.uid() = referred_user_id);

-- Function to update referral stats
CREATE OR REPLACE FUNCTION update_referral_stats()
RETURNS trigger AS $$
BEGIN
  -- Update total_referrals count
  UPDATE user_referrals 
  SET total_referrals = (
    SELECT COUNT(*) 
    FROM referrals 
    WHERE referrer_user_id = NEW.referrer_user_id
  )
  WHERE user_id = NEW.referrer_user_id;

  -- Update completed_referrals count if status changed to completed
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE user_referrals 
    SET completed_referrals = (
      SELECT COUNT(*) 
      FROM referrals 
      WHERE referrer_user_id = NEW.referrer_user_id AND status = 'completed'
    )
    WHERE user_id = NEW.referrer_user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update referral stats
CREATE TRIGGER update_referral_stats_trigger
  AFTER INSERT OR UPDATE ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_stats();

-- Function to handle new user signup with referral
CREATE OR REPLACE FUNCTION handle_referral_signup()
RETURNS trigger AS $$
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
      FROM user_referrals 
      WHERE referral_code = referral_code_param;
      
      IF referrer_id IS NOT NULL AND referrer_id != NEW.id THEN
        -- Create referral record
        INSERT INTO referrals (
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
$$ LANGUAGE plpgsql;

-- Create trigger for new user signups
CREATE TRIGGER handle_referral_signup_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_referral_signup();
