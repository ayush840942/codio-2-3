
import React from 'react';
import {
  Trophy,
  Star,
  Zap,
  TrendingUp,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';
import { motion } from 'framer-motion';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';
import { useNavigate } from 'react-router-dom';

interface LevelMapHeaderProps {
  level: number;
  xp: number;
  coins: number;
  levelsCompleted: number;
  totalLevels: number;
}

const LevelMapHeader: React.FC<LevelMapHeaderProps> = ({ level, levelsCompleted, totalLevels }) => {
  const { rewards } = useRewards();
  const navigate = useNavigate();

  const calculateLevelProgress = () => {
    const xpInCurrentLevel = rewards.xp % 100;
    return xpInCurrentLevel / 100;
  };

  return (
    <DrawnCard className="bg-white p-5 sm:p-6 font-draw overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-cc-green/10 rounded-full blur-3xl -ml-16 -mt-16" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <ComicMascot
            pose="welcome"
            size="sm"
            className="bg-cc-blue rounded-2xl border-4 border-black shadow-comic-sm"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic leading-none mb-1">
              Level {level}
            </h2>
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest leading-none">
              {levelsCompleted} / {totalLevels} COMPLETED
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="bg-cc-yellow border-3 border-black px-4 py-2 rounded-xl shadow-comic-sm flex items-center gap-2">
            <Star className="h-5 w-5 text-black fill-black" />
            <span className="font-black text-lg">{rewards.xp} XP</span>
          </div>
          <div className="bg-cc-green border-3 border-black px-4 py-2 rounded-xl shadow-comic-sm flex items-center gap-2">
            <Zap className="h-5 w-5 text-black" />
            <span className="font-black text-lg">{rewards.coins}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-black text-black/40 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>LEVEL {Math.floor(rewards.xp / 100) + 1} MASTERY</span>
          </div>
          <span>{Math.round(calculateLevelProgress() * 100)}%</span>
        </div>
        <div className="w-full h-6 bg-black rounded-xl p-1 shadow-comic-sm overflow-hidden border-2 border-black">
          <motion.div
            className="h-full bg-cc-yellow rounded-lg"
            initial={{ width: 0 }}
            animate={{ width: `${calculateLevelProgress() * 100}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-3 bg-cc-blue/30 border-2 border-black p-3 rounded-2xl shadow-comic-sm">
          <TrendingUp className="h-6 w-6 text-black" strokeWidth={3} />
          <div>
            <div className="font-black text-[10px] text-black/40 uppercase tracking-tighter leading-none">Streak</div>
            <div className="text-lg font-black text-black leading-none">{rewards.streak} DAYS</div>
          </div>
        </div>
        <div
          onClick={() => navigate('/hints')}
          className="flex items-center gap-3 bg-cc-pink/30 border-2 border-black p-3 rounded-2xl shadow-comic-sm cursor-pointer active:scale-95 transition-transform"
        >
          <Lightbulb className="h-6 w-6 text-black" strokeWidth={3} />
          <div>
            <div className="font-black text-[10px] text-black/40 uppercase tracking-tighter leading-none">Hints</div>
            <div className="text-lg font-black text-black leading-none">{rewards.hintPoints}</div>
          </div>
        </div>
      </div>
    </DrawnCard>
  );
};

export default LevelMapHeader;
