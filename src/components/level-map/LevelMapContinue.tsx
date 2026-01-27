import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useRewards } from '@/context/RewardsContext';

interface LevelMapContinueProps {
  levelId: number;
  lastPlayed: string | null;
  starsEarned: number;
}

const LevelMapContinue: React.FC<LevelMapContinueProps> = ({ levelId, lastPlayed, starsEarned }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { checkTrialStatus } = useRewards();
  
  const handleContinue = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!checkTrialStatus()) {
      navigate('/subscription');
      return;
    }
    
    navigate(`/puzzle/${levelId}`);
  };

  return (
    <Button 
      onClick={handleContinue}
      className="w-full h-16 bg-gradient-to-r from-puzzle-blue to-puzzle-purple text-white hover:from-puzzle-purple hover:to-puzzle-pink font-semibold shadow-lg transform transition-all hover:scale-105 active:scale-95 touch-manipulation"
    >
      <Play className="h-5 w-5 mr-2" />
      Continue Level {levelId}
      <div className="ml-auto flex items-center gap-2">
        {lastPlayed && (
          <div className="flex items-center text-xs opacity-70">
            <Clock className="h-3 w-3 mr-1" />
            {lastPlayed}
          </div>
        )}
        {starsEarned > 0 && (
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500 stroke-none" />
            {starsEarned}
          </div>
        )}
      </div>
    </Button>
  );
};

export default LevelMapContinue;
