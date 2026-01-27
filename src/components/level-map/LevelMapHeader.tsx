
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Settings, 
  User,
  Crown,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';

interface LevelMapHeaderProps {
  level: number;
  xp: number;
  coins: number;
  levelsCompleted: number;
  totalLevels: number;
}

const LevelMapHeader: React.FC<LevelMapHeaderProps> = ({ level, xp, coins, levelsCompleted, totalLevels }) => {
  const { rewards } = useRewards();

  const calculateLevelProgress = () => {
    const currentLevel = Math.floor(rewards.xp / 100) + 1;
    const xpInCurrentLevel = rewards.xp % 100;
    return xpInCurrentLevel / 100;
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-md border-2 border-puzzle-purple/20 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-puzzle-gray">
              Level {level}
            </h2>
            <p className="text-sm sm:text-base text-puzzle-gray/70">
              {levelsCompleted} / {totalLevels} Levels Completed
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center text-puzzle-yellow text-sm sm:text-base font-medium">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              {rewards.xp} XP
            </div>
            <div className="flex items-center text-puzzle-green text-sm sm:text-base font-medium">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              {rewards.coins} Coins
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm sm:text-base text-puzzle-gray/80 mb-1">
            <span>Current Level Progress</span>
            <span>Level {Math.floor(rewards.xp / 100) + 1}</span>
          </div>
          <Progress value={calculateLevelProgress() * 100} className="h-2 rounded-full bg-puzzle-purple/10" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 bg-puzzle-blue/5 p-3 rounded-lg">
            <TrendingUp className="h-5 w-5 text-puzzle-blue" />
            <div>
              <div className="font-medium text-sm sm:text-base text-puzzle-gray">Streak</div>
              <div className="text-sm sm:text-base text-puzzle-blue font-semibold">{rewards.streak} days</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-puzzle-teal/5 p-3 rounded-lg">
            <Lightbulb className="h-5 w-5 text-puzzle-teal" />
            <div>
              <div className="font-medium text-sm sm:text-base text-puzzle-gray">Hints</div>
              <div className="text-sm sm:text-base text-puzzle-teal font-semibold">{rewards.hintPoints} points</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelMapHeader;
