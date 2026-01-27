
import React, { createContext, useContext } from 'react';
import { RewardsContextType } from '@/types/rewards';
import { useRewardsData } from '@/hooks/useRewardsData';
import { useRewardsActions } from '@/hooks/useRewardsActions';

export const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    rewards,
    setRewards,
    loading,
    updateRewardsInDB,
    canClaimDaily,
    claimDailyReward,
    refreshRewards
  } = useRewardsData();

  const {
    addXP,
    addCoins,
    addHints,
    useHint,
    useHints,
    updateStreak,
    addBadge,
    checkTrialStatus
  } = useRewardsActions(rewards, setRewards, updateRewardsInDB);

  const getTrialDaysRemaining = async (): Promise<number> => {
    return rewards.trialDaysRemaining;
  };

  return (
    <RewardsContext.Provider value={{
      rewards,
      setRewards,
      addXP,
      addCoins,
      addHints,
      useHint,
      useHints,
      updateStreak,
      addBadge,
      claimDailyReward,
      canClaimDaily: () => canClaimDaily,
      loading,
      checkTrialStatus,
      getTrialDaysRemaining,
      refreshRewards
    }}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};
