import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Check, Star } from 'lucide-react';
import { PuzzleLevel } from '@/context/GameContext';

interface SimpleLevelCardProps {
  level: PuzzleLevel;
  isUnlocked: boolean;
  canAccess: boolean;
  onPlay: (levelId: number) => void;
  index: number;
}

const SimpleLevelCard: React.FC<SimpleLevelCardProps> = ({
  level,
  isUnlocked,
  canAccess,
  onPlay,
  index
}) => {
  const isCompleted = level.isCompleted;

  // A level is playable if it's unlocked by previous progress, 
  // even if it's restricted by subscription (we want the user to click and see the upgrade prompt)
  const isPlayable = isUnlocked;

  const handleClick = () => {
    if (isPlayable) {
      onPlay(level.id);
    }
  };

  const isCurrent = isPlayable && canAccess && !isCompleted;
  const isPremiumLocked = isUnlocked && !canAccess;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, type: "spring", stiffness: 300 }}
      whileHover={isPlayable ? { scale: 1.1, y: -3 } : {}}
      whileTap={isPlayable ? { scale: 0.95 } : {}}
      onClick={handleClick}
      disabled={!isPlayable}
      className="relative"
    >
      {/* Pulse for current level */}
      {isCurrent && (
        <motion.div
          className="absolute inset-0 bg-pastel-yellow border border-border rounded-2xl"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Main button */}
      <div
        className={`
          relative w-14 h-14 rounded-2xl flex items-center justify-center
          font-bold text-lg transition-all duration-200 border border-border shadow-sm
          ${isCompleted
            ? 'bg-pastel-mint text-foreground'
            : isCurrent
              ? 'bg-pastel-yellow text-foreground'
              : isPremiumLocked
                ? 'bg-indigo-100 text-indigo-600 border-indigo-200'
                : isPlayable
                  ? 'bg-pastel-blue text-foreground'
                  : 'bg-secondary text-muted-foreground'
          }
        `}
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: index * 0.02 }}
          >
            <Check className="w-6 h-6" strokeWidth={3} />
          </motion.div>
        ) : isPremiumLocked ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: index * 0.02 }}
            className="flex flex-col items-center gap-0.5"
          >
            <Play className="w-4 h-4 fill-indigo-600" />
            <span className="text-[10px] leading-none font-black">PREM</span>
          </motion.div>
        ) : isPlayable ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: index * 0.02 }}
          >
            {level.id}
          </motion.span>
        ) : (
          <Lock className="w-5 h-5 opacity-50" />
        )}
      </div>

      {/* Star badge */}
      {(isCurrent || isCompleted) && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-pink border border-border rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: index * 0.02 + 0.1 }}
        >
          <Star className="w-3 h-3 text-foreground fill-foreground" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default SimpleLevelCard;