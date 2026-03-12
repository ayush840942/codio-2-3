
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { PuzzleLevel } from '@/context/GameContext';
import {
  Lock,
  CheckCircle2,
  Play,
  Star,
  Trophy,
  Code,
  Palette,
  Smartphone,
  Database,
  Shield,
  Zap,
  Brain,
  Globe,
  TestTube,
  Layers,
  Settings,
  Cpu,
  BarChart3,
  Blocks,
  Gamepad2,
  GraduationCap
} from 'lucide-react';

interface LevelCardProps {
  level: PuzzleLevel;
  isUnlocked: boolean;
  canAccess: boolean;
  onPlay: (levelId: number) => void;
}

const topicIcons = {
  'Programming Basics': Code,
  'HTML': Globe,
  'CSS': Palette,
  'JavaScript': Code,
  'React': Layers,
  'Databases': Database,
  'Data Structures': Blocks,
  'Algorithms': Brain,
  'Backend': Settings,
  'Web Development': Globe,
  'Testing': TestTube,
  'Frameworks': Layers,
  'Mobile Development': Smartphone,
  'DevOps': Settings,
  'Security': Shield,
  'Performance': Zap,
  'AI/ML': Brain,
  'Advanced JavaScript': Code,
  'System Design': Cpu,
  'Advanced React': Layers,
  'Cloud Computing': Database,
  'Data Science': BarChart3,
  'Blockchain': Blocks,
  'Game Development': Gamepad2,
  'Computer Science': Cpu,
  'Software Engineering': Settings,
  'Master Level': GraduationCap
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200'
};

const LevelCard: React.FC<LevelCardProps> = ({ level, isUnlocked, canAccess, onPlay }) => {
  const navigate = useNavigate();
  const { playCardFlip, playButtonPress, playError } = useSoundEffects();

  const TopicIcon = topicIcons[level.topic as keyof typeof topicIcons] || Code;

  const handleCardClick = () => {
    playCardFlip();

    if (!canAccess) {
      playError();
      return;
    }

    if (level.isCompleted || isUnlocked) {
      setTimeout(() => {
        playButtonPress();
        onPlay(level.id);
      }, 100);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playButtonPress();

    if (!canAccess) {
      playError();
      return;
    }

    onPlay(level.id);
  };

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-95 cursor-pointer touch-manipulation ${!canAccess
          ? 'opacity-60 grayscale'
          : level.isCompleted
            ? 'border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50'
            : isUnlocked
              ? 'border-2 border-puzzle-blue/30 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-puzzle-blue/50'
              : 'border-gray-200 bg-gray-50'
        }`}
      onClick={handleCardClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-puzzle-blue via-transparent to-puzzle-purple"></div>
      </div>

      {/* Status Indicator */}
      <div className="absolute top-3 right-3 z-10">
        {level.isCompleted ? (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
        ) : !canAccess ? (
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="h-4 w-4 text-white" />
          </div>
        ) : isUnlocked ? (
          <div className="w-8 h-8 bg-puzzle-blue rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Star className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <CardContent className="p-4 sm:p-6 relative z-10">
        {/* Level Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md ${level.isCompleted
                ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                : isUnlocked && canAccess
                  ? 'bg-gradient-to-br from-puzzle-blue to-puzzle-purple'
                  : 'bg-gray-300'
              }`}>
              <TopicIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-puzzle-gray/70 mb-1">
                Level {level.id}
              </div>
              <h3 className="font-bold text-sm sm:text-lg text-puzzle-gray leading-tight">
                {level.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-puzzle-gray/80 mb-4 leading-relaxed line-clamp-2">
          {level.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className={`text-xs border ${difficultyColors[level.difficulty]} font-medium`}
          >
            {level.difficulty.charAt(0).toUpperCase() + level.difficulty.slice(1)}
          </Badge>

          <Badge variant="outline" className="text-xs border border-puzzle-purple/30 text-puzzle-purple bg-puzzle-purple/5 font-medium">
            {level.topic}
          </Badge>
        </div>

        {/* XP Reward */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-puzzle-orange" />
            <span className="text-sm font-bold text-puzzle-orange">
              {level.xpReward} XP
            </span>
          </div>

          <div className="text-xs text-puzzle-gray/60 font-medium">
            {level.puzzleType?.replace('-', ' ')?.toUpperCase() || 'PUZZLE'}
          </div>
        </div>

        {/* Action Button */}
        <Button
          size="sm"
          onClick={handlePlayClick}
          disabled={!canAccess}
          className={`w-full h-10 sm:h-12 font-semibold text-sm sm:text-base transition-all touch-manipulation active:scale-95 ${level.isCompleted
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
              : isUnlocked && canAccess
                ? 'bg-gradient-to-r from-puzzle-blue to-puzzle-purple hover:from-puzzle-purple hover:to-puzzle-pink text-white shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          <Play className="h-4 w-4 mr-2" />
          {level.isCompleted ? 'Replay' : !canAccess ? 'Locked' : 'Start Level'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LevelCard;
