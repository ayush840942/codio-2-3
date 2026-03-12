
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Play, Star, Trophy, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { gameState } = useGame();
  const { rewards } = useRewards();
  const { playButtonPress } = useSoundEffects();

  const handleStartLearning = () => {
    playButtonPress();
    navigate('/levels');
  };

  const handleContinueLevel = () => {
    playButtonPress();
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
    <DrawnCard className="bg-white p-6 sm:p-8 relative overflow-hidden font-draw">
      <div className="absolute top-0 right-0 w-48 h-48 bg-cc-blue/10 rounded-full blur-3xl -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Stats Row */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-[2.5rem] font-black text-black leading-none tracking-tighter italic uppercase">
                YO, {profile?.username ? profile.username : 'CODER'}!
              </h1>
            </div>
            <p className="text-xl font-bold text-black/50 uppercase tracking-widest leading-none">
              Ready to hack some puzzles?
            </p>
          </div>

          {/* New Stats Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="bg-cc-yellow border-3 border-black px-4 py-2 rounded-xl shadow-comic-sm flex items-center gap-2">
              <Trophy className="w-5 h-5 text-black" strokeWidth={3} />
              <span className="font-black text-lg">{rewards?.xp || 0} XP</span>
            </div>
            <div className="bg-cc-green border-3 border-black px-4 py-2 rounded-xl shadow-comic-sm flex items-center gap-2">
              <Star className="w-5 h-5 text-black" strokeWidth={3} />
              <span className="font-black text-lg">{completedLevels} LVLS</span>
            </div>
            <div className="bg-cc-pink border-3 border-black px-4 py-2 rounded-xl shadow-comic-sm flex items-center gap-2">
              <Zap className="w-5 h-5 text-black" strokeWidth={3} />
              <span className="font-black text-lg">{rewards?.streak || 0} DAY</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-black/40 uppercase tracking-wider">
              <span>Overall Quest Progress</span>
              <span className="bg-black text-white px-2 py-0.5 rounded-lg">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full h-6 bg-black rounded-xl p-1 shadow-comic-sm overflow-hidden border-2 border-black">
              <motion.div
                className="h-full bg-cc-blue rounded-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-2">
            {nextLevel ? (
              <DrawnButton
                onClick={handleContinueLevel}
                variant="cc-green"
                className="w-full md:w-auto h-16 px-10 text-2xl shadow-comic"
              >
                <Play className="h-6 w-6 mr-3 fill-black" strokeWidth={4} />
                CONTINUE LEVEL {nextLevel.id}
              </DrawnButton>
            ) : (
              <DrawnButton
                onClick={handleStartLearning}
                variant="cc-blue"
                className="w-full md:w-auto h-16 px-10 text-2xl shadow-comic"
              >
                <Star className="h-6 w-6 mr-3 fill-black" strokeWidth={4} />
                EXPLORE LEVELS
              </DrawnButton>
            )}
          </div>
        </div>
      </div>
    </DrawnCard>
  );
};

export default HomeHeader;
