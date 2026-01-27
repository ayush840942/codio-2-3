
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Star, Trophy, Play, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import LevelHintSystem from './LevelHintSystem';

interface MobileLevelCardProps {
  level: {
    id: number;
    title: string;
    description: string;
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    xpReward: number;
    isCompleted: boolean;
    isUnlocked: boolean;
    attempts?: number;
  };
  isUnlocked: boolean;
  canAccess: boolean;
  onPlay: (levelId: number) => void;
  index: number;
}

const MobileLevelCard: React.FC<MobileLevelCardProps> = ({
  level,
  isUnlocked,
  canAccess,
  onPlay,
  index
}) => {
  const navigate = useNavigate();
  const [showHints, setShowHints] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTopicColor = (topic: string) => {
    switch (topic.toLowerCase()) {
      case 'html': return 'bg-orange-500';
      case 'css': return 'bg-blue-500';
      case 'javascript': return 'bg-yellow-500';
      case 'react': return 'bg-cyan-500';
      case 'oop': return 'bg-purple-500';
      case 'database': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleLevelClick = () => {
    if (canAccess && isUnlocked) {
      onPlay(level.id);
    }
  };

  const handleHintToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHints(!showHints);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <Card
        className={`
          relative overflow-hidden transition-all duration-300 hover:shadow-lg
          ${canAccess && isUnlocked ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-60'}
          ${level.isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-white'}
          ${!canAccess || !isUnlocked ? 'bg-gray-50' : ''}
        `}
        onClick={handleLevelClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getTopicColor(level.topic)}`}>
                {level.id}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                  {level.id === 1 && level.isCompleted ? "Intro to Code (Completed)" : level.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {level.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {level.isCompleted ? (
                <Trophy className="w-5 h-5 text-yellow-500" />
              ) : !canAccess || !isUnlocked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : (
                <Play className="w-5 h-5 text-blue-500" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`text-xs text-white ${getDifficultyColor(level.difficulty)}`}
              >
                {level.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {level.topic}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>{level.xpReward} XP</span>
            </div>
          </div>

          {level.attempts && level.attempts > 0 && (
            <div className="text-xs text-gray-500 mb-2">
              Attempts: {level.attempts}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleLevelClick}
              disabled={!canAccess || !isUnlocked}
              className="flex-1 h-8 text-xs"
            >
              {level.isCompleted ? 'Replay' : 'Start'}
            </Button>

            {canAccess && isUnlocked && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleHintToggle}
                className="h-8 px-2 text-xs"
              >
                <Lightbulb className="w-3 h-3" />
              </Button>
            )}
          </div>

          {showHints && canAccess && isUnlocked && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <LevelHintSystem
                levelId={level.id}
                topic={level.topic}
                difficulty={level.difficulty}
                onHintUsed={() => setShowHints(false)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MobileLevelCard;
