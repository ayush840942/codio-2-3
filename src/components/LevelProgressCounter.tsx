
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LevelProgressCounterProps {
  variant?: 'small' | 'large';
  className?: string;
}

const LevelProgressCounter: React.FC<LevelProgressCounterProps> = ({ 
  variant = 'small',
  className = '' 
}) => {
  const { gameState } = useGame();
  
  const totalLevels = gameState.levels.length;
  const completedLevels = gameState.levels.filter(level => level.isCompleted).length;
  const completionPercentage = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;

  if (variant === 'large') {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-puzzle-purple" />
            <span className="font-medium">Level Progress</span>
          </div>
          <span className="text-puzzle-purple font-bold">{completedLevels}/{totalLevels}</span>
        </div>
        <Progress value={completionPercentage} className="h-2.5" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Trophy className="h-4 w-4 text-puzzle-purple" />
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-0.5">
          <span>Level Progress</span>
          <span className="font-medium">{completedLevels}/{totalLevels}</span>
        </div>
        <Progress value={completionPercentage} className="h-1.5" />
      </div>
    </div>
  );
};

export default LevelProgressCounter;
