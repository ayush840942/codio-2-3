
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRewards } from '@/types/rewards';
import { useRewardsLoader } from '@/hooks/rewards/useRewardsLoader';
import { useDailyClaim } from '@/hooks/rewards/useDailyClaim';
import { supabase } from '@/integrations/supabase/client';
import { toDatabaseId } from '@/utils/idMapping';
import { calculateTrialStatus } from '@/utils/trialUtils';

export const useRewardsData = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<UserRewards>({
    xp: 0,
    coins: 0,
    streak: 0,
    loginStreak: 0,
    dailyStreak: 0,
    badges: [] as string[],
    hintPoints: 0,
    lastClaimDate: null as string | null,
    freeHintDays: 30, // Default to 30 days for new users
    trialStartDate: null as string | null,
    trialDaysRemaining: 0,
    isTrialActive: false,
    totalXpEarned: 0,
    levelsCompleted: 0,
    perfectSolutions: 0,
    hintPointsSpent: 0,
    weeklyXp: 0,
    league: 'Bronze'
  });

  const { loading, setLoading, updateRewardsInDB, loadRewards } = useRewardsLoader();
  const { canClaimDaily, claimDailyReward } = useDailyClaim(rewards, setRewards, updateRewardsInDB);
  // Load rewards from database
  useEffect(() => {
    if (user) {
      loadRewards(setRewards);
    } else {
      setLoading(false);
    }
  }, [user, loadRewards, setLoading]);

  // Real-time Rewards Subscription
  useEffect(() => {
    if (!user) return;

    const dbId = toDatabaseId(user.id);
    console.log('Setting up real-time rewards listener for:', dbId);

    const rewardsSubscription = supabase
      .channel(`rewards_realtime_${dbId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_rewards',
          filter: `user_id=eq.${dbId}`
        },
        (payload: any) => {
          console.log('Real-time rewards update received:', payload);
          if (payload.new) {
            const data = payload.new;
            const trialStatus = calculateTrialStatus(data.trial_start_date || new Date().toISOString(), user.createdAt);

            setRewards({
              xp: data.xp || 0,
              coins: data.coins || 0,
              streak: data.streak || 0,
              loginStreak: data.login_streak || 0,
              dailyStreak: data.daily_streak || 0,
              badges: data.badges || [],
              hintPoints: data.hint_points || 0,
              lastClaimDate: data.last_claim_date || null,
              freeHintDays: data.free_hint_days || 0,
              totalXpEarned: data.total_xp_earned || 0,
              levelsCompleted: data.levels_completed || 0,
              perfectSolutions: data.perfect_solutions || 0,
              hintPointsSpent: data.hint_points_spent || 0,
              trialStartDate: data.trial_start_date || null,
              isTrialActive: data.is_trial_active || false,
              weeklyXp: data.weekly_xp || 0,
              league: data.league || 'Bronze',
              ...trialStatus
            });

            // Sync with local storage
            const storageKey = `codio_rewards_${user.id}`;
            localStorage.setItem(storageKey, JSON.stringify(data));
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up rewards listener');
      supabase.removeChannel(rewardsSubscription);
    };
  }, [user?.id]);

  return {
    rewards,
    setRewards,
    loading,
    updateRewardsInDB,
    canClaimDaily,
    claimDailyReward,
    refreshRewards: () => loadRewards(setRewards)
  };
};

