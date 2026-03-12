
import { useAuth } from '@/context/AuthContext';
import { UserRewards } from '@/types/rewards';

export const useDailyClaim = (
  rewards: UserRewards,
  setRewards: React.Dispatch<React.SetStateAction<UserRewards>>,
  updateRewardsInDB: (updates: any) => Promise<boolean>
) => {
  const { user } = useAuth();

  const canClaimDaily = (): boolean => {
    console.log('Checking if can claim daily:', {
      freeHintDays: rewards.freeHintDays,
      lastClaimDate: rewards.lastClaimDate
    });

    if (rewards.freeHintDays <= 0) {
      console.log('No free hint days remaining');
      return false;
    }

    const today = new Date().toISOString().split('T')[0];
    const lastClaim = rewards.lastClaimDate;

    if (!lastClaim) {
      console.log('No previous claim, can claim');
      return true;
    }

    // Check if it's a new day
    const canClaim = lastClaim !== today;

    console.log('Can claim check:', { today, lastClaim, canClaim });
    return canClaim;
  };

  const claimDailyReward = async (): Promise<boolean> => {
    console.log('=== Starting claimDailyReward ===');
    console.log('Current rewards state:', rewards);

    const canClaim = canClaimDaily();
    console.log('Can claim daily?', canClaim);

    if (!canClaim || !user) {
      console.log('Cannot claim - conditions not met');
      return false;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const newHints = rewards.hintPoints + 15; // Give 15 points (3 hints) instead of 5
      const newStreak = rewards.loginStreak + 1;
      const newFreeHintDays = Math.max(0, rewards.freeHintDays - 1);

      console.log('Claiming daily reward with values:', {
        newHints,
        newStreak,
        newFreeHintDays,
        today
      });

      // Update database and localStorage
      updateRewardsInDB({
        hint_points: newHints,
        last_claim_date: today,
        login_streak: newStreak
      }).then(success => {
        if (!success) {
          console.warn('⚠️ Daily claim failed to sync to database, using local backup');
        } else {
          console.log('✅ Daily claim synced to database');
        }
      });

      // Update local state immediately (optimistic)
      setRewards(prev => {
        const newState = {
          ...prev,
          hintPoints: newHints,
          lastClaimDate: today,
          loginStreak: newStreak,
          streak: newStreak,
          dailyStreak: newStreak,
          freeHintDays: newFreeHintDays
        };
        console.log('Updated local rewards state:', newState);
        return newState;
      });

      console.log('=== Daily reward claimed successfully ===');
      return true;

    } catch (error) {
      console.error('Error in claimDailyReward:', error);
      return false;
    }
  };

  return {
    canClaimDaily: canClaimDaily(),
    claimDailyReward
  };
};

