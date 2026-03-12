import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Crown, Star, CheckCircle2 } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';

const AchievementsCard = () => {
  const { gameState } = useGame();

  const completedLevels = gameState.levels.filter(level => level.isCompleted).length;

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first level",
      icon: Target,
      achieved: completedLevels >= 1,
      progress: Math.min(completedLevels, 1),
      target: 1,
      color: "bg-cc-green",
    },
    {
      id: 2,
      title: "Getting Started",
      description: "Complete 5 levels",
      icon: Zap,
      achieved: completedLevels >= 5,
      progress: Math.min(completedLevels, 5),
      target: 5,
      color: "bg-cc-blue",
    },
    {
      id: 3,
      title: "On Fire",
      description: "Complete 10 levels",
      icon: Trophy,
      achieved: completedLevels >= 10,
      progress: Math.min(completedLevels, 10),
      target: 10,
      color: "bg-cc-yellow",
    },
    {
      id: 4,
      title: "Master Coder",
      description: "Complete 25 levels",
      icon: Crown,
      achieved: completedLevels >= 25,
      progress: Math.min(completedLevels, 25),
      target: 25,
      color: "bg-cc-pink",
    }
  ];

  return (
    <DrawnCard className="bg-white p-6 sm:p-8 font-draw">
      <div className="flex items-center gap-4 mb-8">
        <motion.div
          className="w-14 h-14 bg-cc-yellow border-3 border-black rounded-2xl flex items-center justify-center shadow-comic-sm"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Trophy className="h-8 w-8 text-black" strokeWidth={3} />
        </motion.div>
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic leading-none">Achievements</h2>
          <p className="text-sm font-bold text-black/40 uppercase tracking-widest">Your Coding Legacy</p>
        </div>
      </div>

      <div className="grid gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative flex items-center justify-between p-4 rounded-2xl border-3 border-black transform transition-all active:animate-squishy ${achievement.achieved ? achievement.color : 'bg-black/5 opacity-60 grayscale shadow-none border-dashed'
              } shadow-comic-sm hover:shadow-comic hover:-translate-y-1`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center bg-white shadow-comic-sm`}>
                <achievement.icon className="h-6 w-6 text-black" strokeWidth={3} />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-black text-black uppercase tracking-tight leading-none mb-1">
                  {achievement.title}
                </h4>
                <p className="text-[10px] font-bold text-black/50 uppercase tracking-tighter leading-none">
                  {achievement.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-xs font-black text-black uppercase tracking-tight">
                {achievement.progress}/{achievement.target}
              </div>
              {achievement.achieved && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-black rounded-full p-0.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-cc-green" strokeWidth={4} />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mascot Insight */}
      <div className="mt-8 pt-8 border-t-3 border-black border-dashed flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl border-3 border-black flex-shrink-0 bg-cc-blue shadow-comic-sm overflow-hidden flex items-center justify-center">
          <ComicMascot pose="study" size="sm" className="scale-125" />
        </div>
        <div className="bg-white border-2 border-black p-3 rounded-2xl shadow-comic-sm relative">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-black rotate-45" />
          <p className="text-xs font-bold text-black italic">
            "Keep coding! Every level brings you closer to being a Master!"
          </p>
        </div>
      </div>
    </DrawnCard>
  );
};

export default AchievementsCard;
