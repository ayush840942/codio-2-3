
import React from 'react';
import { useGame } from '@/context/GameContext';

const LevelMapStats = () => {
  const { gameState } = useGame();
  
  // Calculate total and remaining levels
  const totalLevels = gameState.levels.length;
  const completedLevels = gameState.levels.filter(level => level.isCompleted).length;
  const remainingLevels = totalLevels - completedLevels;

  return (
    <div className="flex-1">
      <div className="stats grid grid-cols-3 gap-2 text-center">
        <div className="stat bg-white/50 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Levels</div>
          <div className="text-lg font-bold text-puzzle-purple">{totalLevels}</div>
        </div>
        <div className="stat bg-white/50 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Completed</div>
          <div className="text-lg font-bold text-puzzle-green">{completedLevels}</div>
        </div>
        <div className="stat bg-white/50 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Remaining</div>
          <div className="text-lg font-bold text-puzzle-orange">{remainingLevels}</div>
        </div>
      </div>
    </div>
  );
};

export default LevelMapStats;
