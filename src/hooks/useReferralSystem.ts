
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRewards } from '@/context/RewardsContext';
import { supabase } from '@/integrations/supabase/client';
import { ReferralStats } from '@/types/referral';
import { toast } from 'sonner';
import { toDatabaseId } from '@/utils/idMapping';

export const useReferralSystem = () => {
  const { user } = useAuth();
  const { addXP, addCoins, addHints } = useRewards();
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate deterministic referral code (stable per account)
  const generateReferralCode = (userId: string): string => {
    // Create a hash-based deterministic code that's always the same for the same user
    const cleaned = userId.replace(/-/g, '').toLowerCase();

    // Use a simple hash function to create consistent codes
    let hash = 0;
    for (let i = 0; i < cleaned.length; i++) {
      const char = cleaned.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert to positive number and create 6-digit code
    const positiveHash = Math.abs(hash);
    const codeNumber = positiveHash % 1000000; // 6 digits max
    const paddedCode = codeNumber.toString().padStart(6, '0');

    return `CZ${paddedCode}`;
  };

  // Initialize user's referral code
  const initializeReferralCode = async (): Promise<string | null> => {
    if (!user) return null;

    try {
      console.log('Initializing referral code for user:', user.id);

      // Check if user already has a referral code
      const dbUserId = toDatabaseId(user.id);
      const { data: existingCode, error: checkError } = await supabase
        .from('user_referrals')
        .select('referral_code')
        .eq('user_id', dbUserId)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing referral code:', checkError);
        // Don't throw error, continue to create new code
      }

      if (existingCode?.referral_code) {
        console.log('Found existing referral code:', existingCode.referral_code);
        return existingCode.referral_code;
      }

      // Create new referral code
      const newCode = generateReferralCode(user.id);
      console.log('Creating new referral code:', newCode);

      const { data, error: insertError } = await supabase
        .from('user_referrals')
        .insert({
          user_id: dbUserId,
          referral_code: newCode,
          total_referrals: 0,
          completed_referrals: 0,
          total_xp_earned: 0,
          total_coins_earned: 0
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating referral code:', insertError);
        // If it's a duplicate key error, try to fetch existing code
        if (insertError.code === '23505') {
          const { data: retryData } = await supabase
            .from('user_referrals')
            .select('referral_code')
            .eq('user_id', dbUserId)
            .single();
          return retryData?.referral_code || null;
        }
        throw insertError;
      }

      console.log('Successfully created referral code:', newCode);
      return newCode;
    } catch (err) {
      console.error('Error initializing referral code:', err);
      return null;
    }
  };

  // Load referral stats
  const loadReferralStats = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Loading referral stats for user:', user.id);

      // First ensure referral code exists (fallback to deterministic code if DB fails)
      let referralCode = await initializeReferralCode();
      if (!referralCode) {
        // Fallback: generate stable, deterministic code without failing the UI
        referralCode = generateReferralCode(user.id);
        console.warn('Using fallback deterministic referral code:', referralCode);
      }

      // Get user referral data with retry logic
      const dbUserId = toDatabaseId(user.id);
      let userReferrals = null;
      let attempts = 0;

      while (!userReferrals && attempts < 3) {
        const { data, error: userError } = await supabase
          .from('user_referrals')
          .select('*')
          .eq('user_id', dbUserId)
          .maybeSingle();

        if (userError) {
          console.error(`Error loading user referrals (attempt ${attempts + 1}):`, userError);
          attempts++;
          if (attempts < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
        } else {
          userReferrals = data;
          break;
        }
      }

      if (!userReferrals) {
        // Create default referral stats if none found
        userReferrals = {
          referral_code: referralCode,
          total_referrals: 0,
          completed_referrals: 0,
          total_xp_earned: 0,
          total_coins_earned: 0
        };
      }

      // Get referral records
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_user_id', dbUserId);

      if (referralsError) {
        console.error('Error loading referrals:', referralsError);
        // Continue with empty referrals instead of failing
      }

      const completedCount = referrals?.filter((r: any) => r.status === 'completed').length || 0;
      const pendingCount = referrals?.filter((r: any) => r.status === 'pending').length || 0;

      const stats: ReferralStats = {
        totalReferrals: referrals?.length || 0,
        completedReferrals: completedCount,
        pendingReferrals: pendingCount,
        totalRewardsEarned: {
          xp: userReferrals.total_xp_earned || 0,
          coins: userReferrals.total_coins_earned || 0
        },
        referralCode: userReferrals.referral_code
      };

      console.log('Successfully loaded referral stats:', stats);
      setReferralStats(stats);

    } catch (err) {
      console.error('Error loading referral stats:', err);
      setError('Failed to load referral stats');

      // Set default stats to prevent app crash
      setReferralStats({
        totalReferrals: 0,
        completedReferrals: 0,
        pendingReferrals: 0,
        totalRewardsEarned: { xp: 0, coins: 0 },
        referralCode: ''
      });
    } finally {
      setLoading(false);
    }
  };

  // Use referral code
  const useReferralCode = async (code: string): Promise<boolean> => {
    if (!user) {
      setError('Must be logged in to use referral code');
      return false;
    }

    try {
      setError(null);
      console.log('Using referral code:', code);

      const cleanCode = code.trim().toUpperCase();

      // Find the referrer by code
      const { data: referrer, error: referrerError } = await supabase
        .from('user_referrals')
        .select('user_id')
        .eq('referral_code', cleanCode)
        .maybeSingle();

      if (referrerError) {
        console.error('Error finding referrer:', referrerError);
        setError('Error validating referral code');
        return false;
      }

      if (!referrer) {
        setError('Invalid referral code');
        return false;
      }

      if (referrer.user_id === user.id) {
        setError('Cannot use your own referral code');
        return false;
      }

      // Check if user already used a referral code
      const dbUserId = toDatabaseId(user.id);
      const { data: existingReferral, error: existingError } = await supabase
        .from('referrals')
        .select('id')
        .eq('referred_user_id', dbUserId)
        .maybeSingle();

      if (existingError && existingError.code !== 'PGRST116') {
        console.error('Error checking existing referral:', existingError);
        setError('Error validating referral status');
        return false;
      }

      if (existingReferral) {
        setError('You have already used a referral code');
        return false;
      }

      // Create referral record
      const { error: insertError } = await supabase
        .from('referrals')
        .insert({
          referrer_user_id: referrer.user_id,
          referred_user_id: dbUserId,
          referral_code: cleanCode,
          status: 'pending',
          bonus_xp: 100,
          bonus_coins: 50
        });

      if (insertError) {
        console.error('Error creating referral record:', insertError);
        setError('Failed to apply referral code');
        return false;
      }

      // Give immediate reward to new user (50 XP, 25 coins, 10 hints)
      await addXP(50);
      await addCoins(25);
      await addHints(10);

      toast.success('🎉 Referral code applied!', {
        description: 'You received 50 XP, 25 coins, and 10 hints!'
      });

      return true;
    } catch (err) {
      console.error('Error using referral code:', err);
      setError('Failed to use referral code');
      return false;
    }
  };

  // Complete referral (when referred user completes first 3 levels)
  const completeReferral = async (referredUserId: string) => {
    try {
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referred_user_id', toDatabaseId(referredUserId))
        .eq('status', 'pending')
        .maybeSingle();

      if (referralError) {
        console.error('Error finding referral:', referralError);
        return;
      }

      if (referral) {
        // Update referral status
        const { error: updateError } = await supabase
          .from('referrals')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString()
          })
          .eq('id', referral.id);

        if (updateError) {
          console.error('Error updating referral status:', updateError);
          return;
        }

        // Update referrer stats
        const { data: referrerData, error: referrerError } = await supabase
          .from('user_referrals')
          .select('*')
          .eq('user_id', toDatabaseId(referral.referrer_user_id))
          .maybeSingle();

        if (referrerError) {
          console.error('Error loading referrer data:', referrerError);
          return;
        }

        if (referrerData) {
          const { error: statsError } = await supabase
            .from('user_referrals')
            .update({
              completed_referrals: (referrerData.completed_referrals || 0) + 1,
              total_xp_earned: (referrerData.total_xp_earned || 0) + referral.bonus_xp,
              total_coins_earned: (referrerData.total_coins_earned || 0) + referral.bonus_coins
            })
            .eq('user_id', toDatabaseId(referral.referrer_user_id));

          if (statsError) {
            console.error('Error updating referrer stats:', statsError);
          }

          console.log('Referral completed for referrer:', referral.referrer_user_id);
        }
      }
    } catch (err) {
      console.error('Error completing referral:', err);
    }
  };

  // Check for referral code from app launch
  const checkAppLaunchReferral = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const referralFromUrl = urlParams.get('referral') || urlParams.get('ref');
      const referralFromStorage = localStorage.getItem('pending_referral_code');

      const referralCode = referralFromUrl || referralFromStorage;

      if (referralCode && user) {
        console.log('Found referral code on app launch:', referralCode);

        const success = await useReferralCode(referralCode);

        if (success) {
          localStorage.removeItem('pending_referral_code');
          if (referralFromUrl) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('referral');
            newUrl.searchParams.delete('ref');
            window.history.replaceState({}, '', newUrl.toString());
          }
        }
      }
    } catch (err) {
      console.error('Error checking app launch referral:', err);
    }
  };

  // Store referral code for later use
  const storeReferralForLater = (code: string) => {
    localStorage.setItem('pending_referral_code', code.trim().toUpperCase());
  };

  useEffect(() => {
    if (user) {
      loadReferralStats();
      checkAppLaunchReferral();
    } else {
      setLoading(false);
    }
  }, [user]);

  return {
    referralStats,
    loading,
    error,
    applyReferralCode: useReferralCode,
    completeReferral,
    storeReferralForLater,
    refreshStats: loadReferralStats
  };
};
