
import React from 'react';
import { useHintPurchase } from '@/hooks/useHintPurchase';
import GameStyleHintStore from './hint-store/GameStyleHintStore';
import DailyRewardSection from './hint-store/DailyRewardSection';
import DailyHintTracker from './puzzle/DailyHintTracker';
import { useRewards } from '@/context/RewardsContext';

interface HintStoreProps {
  onHintsPurchased?: (amount: number) => void;
}

const HintStore: React.FC<HintStoreProps> = ({ onHintsPurchased }) => {
  const { purchaseHints, loading } = useHintPurchase({ onSuccess: onHintsPurchased });
  const { rewards } = useRewards();

  return (
    <div className="space-y-6">
      {/* Daily Hint Tracker */}
      <div className="mb-6">
        <DailyHintTracker />
      </div>
      
      {/* Daily Reward Section */}
      <DailyRewardSection />
      
      {/* Game Style Hint Store */}
      <GameStyleHintStore 
        loading={loading} 
        onPurchase={purchaseHints}
        currentHints={rewards.hintPoints}
      />
    </div>
  );
};

export default HintStore;
