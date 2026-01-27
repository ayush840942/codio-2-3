import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useRewards } from '@/context/RewardsContext';

const StreakProgressSection = () => {
  const { rewards } = useRewards();
  const progress = rewards.loginStreak <= 7 ? (rewards.loginStreak / 7) * 100 : 100;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-orange-100/50 shadow-sm">
      <h3 className="font-bold text-lg text-orange-500">Login Streak Bonus</h3>
      <p className="text-sm text-puzzle-gray">
        Keep logging in daily to increase your streak and earn bonus rewards!
      </p>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-puzzle-gray mb-1">
          <span>Streak Progress</span>
          <span>{rewards.loginStreak} / 7 Days</span>
        </div>
        <Progress value={progress} className="h-2 rounded-full bg-orange-200" />
      </div>
    </div>
  );
};

export default StreakProgressSection;
