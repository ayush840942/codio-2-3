
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserRewards } from '@/types/rewards';
import { calculateTrialStatus } from '@/utils/trialUtils';

export const useRewardsActions = (
  rewards: UserRewards,
  setRewards: React.Dispatch<React.SetStateAction<UserRewards>>,
  updateRewardsInDB: (updates: any) => Promise<boolean>
) => {
  const { user } = useAuth();

  const addXP = async (amount: number) => {
    setRewards(prev => {
      const newXP = prev.xp + amount;
      const newTotalXP = prev.totalXpEarned + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      const oldLevel = Math.floor(prev.xp / 100) + 1;

      if (newLevel > oldLevel) {
        toast.success(`🎉 Level Up! You're now level ${newLevel}!`);
      }

      const updates = { xp: newXP, totalXpEarned: newTotalXP };
      updateRewardsInDB(updates);

      return { ...prev, xp: newXP, totalXpEarned: newTotalXP };
    });
  };

  const addCoins = async (amount: number) => {
    setRewards(prev => {
      const newCoins = prev.coins + amount;
      updateRewardsInDB({ coins: newCoins });
      return { ...prev, coins: newCoins };
    });
  };

  const addHints = async (amount: number) => {
    if (!user) return;

    try {
      const newHints = (rewards.hintPoints || 0) + amount;

      // Update local state immediately (optimistic)
      setRewards(prev => ({ ...prev, hintPoints: newHints }));

      // Update database and local storage in background
      await updateRewardsInDB({
        hint_points: newHints,
        updated_at: new Date().toISOString()
      });

      toast.success(`🎁 Added ${amount} hints! Total: ${newHints}`);

    } catch (error) {
      console.error('Error in addHints:', error);
      toast.error('Failed to add hints');
    }
  };

  const useHint = async (): Promise<boolean> => {
    if (!user || (rewards.hintPoints || 0) < 5) {
      return false;
    }

    try {
      const newHints = (rewards.hintPoints || 0) - 5;
      const newSpent = (rewards.hintPointsSpent || 0) + 1;

      // Update local state immediately (optimistic)
      setRewards(prev => ({ ...prev, hintPoints: newHints, hintPointsSpent: newSpent }));

      // Update database and local storage in background
      await updateRewardsInDB({
        hint_points: newHints,
        hint_points_spent: newSpent,
        updated_at: new Date().toISOString()
      });

      return true;

    } catch (error) {
      console.error('Error in useHint:', error);
      return false;
    }
  };

  const useHints = async (amount: number): Promise<boolean> => {
    if (!user || (rewards.hintPoints || 0) < amount) {
      return false;
    }

    try {
      const newHints = (rewards.hintPoints || 0) - amount;
      const newSpent = (rewards.hintPointsSpent || 0) + amount;

      // Update local state immediately (optimistic)
      setRewards(prev => ({ ...prev, hintPoints: newHints, hintPointsSpent: newSpent }));

      // Update database and local storage in background
      await updateRewardsInDB({
        hint_points: newHints,
        hint_points_spent: newSpent,
        updated_at: new Date().toISOString()
      });

      return true;

    } catch (error) {
      console.error('Error in useHints:', error);
      return false;
    }
  };

  const updateStreak = async () => {
    const today = new Date().toISOString().split('T')[0];
    const lastClaim = rewards.lastClaimDate;

    if (lastClaim !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const newStreak = lastClaim === yesterdayStr ? rewards.streak + 1 : 1;

      setRewards(prev => ({
        ...prev,
        streak: newStreak,
        loginStreak: newStreak,
        dailyStreak: newStreak,
        lastClaimDate: today
      }));
      await updateRewardsInDB({ login_streak: newStreak, last_claim_date: today });
    }
  };

  const addBadge = async (badge: string) => {
    setRewards(prev => {
      if (!prev.badges.includes(badge)) {
        const newBadges = [...prev.badges, badge];
        toast.success(`🏆 Badge Earned: ${badge}!`);
        return { ...prev, badges: newBadges };
      }
      return prev;
    });
  };

  const checkTrialStatus = async (): Promise<void> => {
    if (!user) return;

    // Update trial status in real-time
    const trialStatus = calculateTrialStatus(rewards.trialStartDate, user.created_at || new Date().toISOString());

    if (trialStatus.trialDaysRemaining !== rewards.trialDaysRemaining) {
      setRewards(prev => ({
        ...prev,
        ...trialStatus
      }));
    }
  };

  return {
    addXP,
    addCoins,
    addHints,
    useHint,
    useHints,
    updateStreak,
    addBadge,
    checkTrialStatus
  };
};

