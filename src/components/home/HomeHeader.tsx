
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Play, Star, Trophy, Zap, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { gameState } = useGame();
  const { rewards } = useRewards();
  const { playButtonPress } = useSoundEffects();

  const handleStartLearning = () => {
    playButtonPress();
    navigate('/levels');
  };

  const handleContinueLevel = () => {
    playButtonPress();
    // Find the first incomplete level
    const nextLevel = gameState.levels.find(level => !level.isCompleted && level.isUnlocked);
    if (nextLevel) {
      navigate(`/puzzle/${nextLevel.id}`);
    } else {
      navigate('/levels');
    }
  };

  const completedLevels = gameState.levels.filter(level => level.isCompleted).length;
  const progressPercentage = (completedLevels / gameState.levels.length) * 100;
  const nextLevel = gameState.levels.find(level => !level.isCompleted && level.isUnlocked);

  return (
    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">
          {profile?.username ? `Welcome back, ${profile.username}!` : 'Welcome to Codio'}
        </h1>
        <p className="text-purple-100">
          Continue your coding journey
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="text-center">
          <div className="text-xl font-bold">{gameState.xp}</div>
          <div className="text-xs text-purple-200">XP</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{completedLevels}</div>
          <div className="text-xs text-purple-200">Levels</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{rewards?.streak || 0}</div>
          <div className="text-xs text-purple-200">Streak</div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Progress</span>
          <span className="text-sm">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        {nextLevel ? (
          <Button
            onClick={handleContinueLevel}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl"
          >
            <Play className="h-4 w-4 mr-2" />
            Continue Level {nextLevel.id}
          </Button>
        ) : (
          <Button
            onClick={handleStartLearning}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl"
          >
            <Star className="h-4 w-4 mr-2" />
            Explore Levels
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default HomeHeader;
