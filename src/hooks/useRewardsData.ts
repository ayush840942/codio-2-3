
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRewards } from '@/types/rewards';
import { useRewardsLoader } from '@/hooks/rewards/useRewardsLoader';
import { useDailyClaim } from '@/hooks/rewards/useDailyClaim';

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
    freeHintDays: 0,
    trialStartDate: null as string | null,
    trialDaysRemaining: 0,
    isTrialActive: false,
    totalXpEarned: 0,
    levelsCompleted: 0,
    perfectSolutions: 0,
    hintPointsSpent: 0
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

