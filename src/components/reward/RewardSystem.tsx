
import React from 'react';
import { useRewards } from '@/context/RewardsContext';
import { useRewardSimulation } from '@/hooks/useRewardSimulation';
import RewardSummaryCard from './RewardSummaryCard';
import RewardAnimation from './RewardAnimation';

interface RewardSystemProps {
  onXPGain?: (amount: number) => void;
  onCoinGain?: (amount: number) => void;
  onHintGain?: (amount: number) => void;
  onStreakUpdate?: (streak: number) => void;
  onBadgeEarned?: (badge: string) => void;
}

const RewardSystem: React.FC<RewardSystemProps> = ({
  onXPGain,
  onCoinGain,
  onHintGain,
  onStreakUpdate,
  onBadgeEarned
}) => {
  const { rewards } = useRewards();
  
  const {
    showRewardAnimation,
    rewardType,
    rewardAmount,
    badgeName
  } = useRewardSimulation({
    onXPGain,
    onCoinGain,
    onHintGain,
    onStreakUpdate,
    onBadgeEarned
  });

  return (
    <div className="space-y-4">
      <RewardSummaryCard rewards={rewards} />
      <RewardAnimation
        showRewardAnimation={showRewardAnimation}
        rewardType={rewardType}
        rewardAmount={rewardAmount}
        badgeName={badgeName}
      />
    </div>
  );
};

export default RewardSystem;
