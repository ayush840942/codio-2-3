
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, Star, Trophy, Clock, Target } from 'lucide-react';
import { PuzzleLevel } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MimoStyleLevelCardProps {
  level: PuzzleLevel;
  isUnlocked: boolean;
  canAccess: boolean;
  onPlay: (levelId: number) => void;
  index: number;
}

const MimoStyleLevelCard: React.FC<MimoStyleLevelCardProps> = ({
  level,
  isUnlocked,
  canAccess,
  onPlay,
  index
}) => {
  const handleClick = () => {
    if (canAccess && isUnlocked) {
      onPlay(level.id);
    }
  };

  const getStatusIcon = () => {
    if (level.isCompleted) {
      return <CheckCircle className="w-8 h-8 text-green-500" />;
    }
    if (!canAccess || !isUnlocked) {
      return <Lock className="w-8 h-8 text-gray-400" />;
    }
    return <Play className="w-8 h-8 text-blue-500" />;
  };

  const getCardStyle = () => {
    if (level.isCompleted) {
      return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-green-100";
    }
    if (!canAccess || !isUnlocked) {
      return "bg-gray-50 border-gray-200";
    }
    return "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-blue-100";
  };

  const getDifficultyColor = () => {
    switch (level.difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`relative rounded-3xl border-2 ${getCardStyle()} p-6 cursor-pointer transition-all duration-300 ${(!canAccess || !isUnlocked) ? 'opacity-60' : 'hover:scale-[1.02] hover:shadow-xl'
        }`}
      onClick={handleClick}
    >
      {/* Level Badge */}
      <div className="absolute -top-3 -left-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${level.isCompleted
            ? 'bg-gradient-to-br from-green-500 to-green-600'
            : canAccess && isUnlocked
              ? 'bg-gradient-to-br from-blue-500 to-blue-600'
              : 'bg-gray-400'
          }`}>
          {level.id}
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-xs px-2 py-1 ${getDifficultyColor()}`}>
                {level.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-1">
                {level.topic}
              </Badge>
            </div>
            {/* Title (hide if it's just "Level X" to avoid duplication with badge) */}
            {!(new RegExp(`^level\\s*${level.id}$`, 'i').test((level.title || '').trim())) && (
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {level.id === 1 && level.isCompleted ? "Intro to Code (Completed)" : level.title}
              </h3>
            )}
            <p className="text-sm text-gray-600 leading-relaxed">
              {level.description}
            </p>
          </div>
          <div className="ml-4">
            {getStatusIcon()}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600">{level.xpReward} XP</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-purple-600">5-10 min</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${level.isCompleted ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Action button */}
        <Button
          className={`w-full h-12 text-base font-semibold rounded-2xl transition-all duration-200 ${level.isCompleted
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg'
              : canAccess && isUnlocked
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          disabled={!canAccess || !isUnlocked}
        >
          {level.isCompleted ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Review Lesson
            </div>
          ) : !canAccess || !isUnlocked ? (
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Locked
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Lesson
            </div>
          )}
        </Button>
      </div>

      {/* Completion checkmark overlay */}
      {level.isCompleted && (
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MimoStyleLevelCard;
