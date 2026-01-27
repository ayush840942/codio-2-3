
import React from 'react';
import { useGame } from '@/context/GameContext';

type ProgressBarProps = {
  showXp?: boolean;
  className?: string;
};

const ProgressBar = ({ showXp = true, className = '' }: ProgressBarProps) => {
  const { gameState } = useGame();
  
  // Calculate completion percentage
  const totalLevels = gameState.levels.length;
  const completedLevels = gameState.levels.filter(level => level.isCompleted).length;
  const progressPercentage = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-puzzle-gray">
          Progress: {completedLevels}/{totalLevels} levels
        </span>
        {showXp && (
          <span className="text-sm font-medium text-puzzle-purple">
            {gameState.xp} XP
          </span>
        )}
      </div>
      <div className="w-full h-3 bg-puzzle-purple/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-puzzle-purple to-puzzle-blue rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
