
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen } from 'lucide-react';
import { PuzzleLevel } from '@/context/GameContext';
import MobileLevelCard from './MobileLevelCard';

interface MobileTopicSectionProps {
  topic: string;
  topicLevels: PuzzleLevel[];
  sortedLevels: PuzzleLevel[];
  canAccessLevel: (levelId: number) => boolean;
  handlePlayLevel: (levelId: number) => void;
  topicIndex: number;
}

const MobileTopicSection: React.FC<MobileTopicSectionProps> = ({
  topic,
  topicLevels,
  sortedLevels,
  canAccessLevel,
  handlePlayLevel,
  topicIndex
}) => {
  const completedInTopic = topicLevels.filter(l => l.isCompleted).length;
  const topicProgress = topicLevels.length > 0 ? (completedInTopic / topicLevels.length) * 100 : 0;

  const getTopicIcon = () => {
    switch (topic) {
      case 'HTML': return '🌐';
      case 'CSS': return '🎨';
      case 'JavaScript': return '⚡';
      case 'React': return '⚛️';
      case 'OOP': return '🔧';
      case 'Database': return '🗄️';
      case 'Advanced': return '🚀';
      default: return '📚';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: topicIndex * 0.1, duration: 0.4 }}
      className="space-y-4"
    >
      {/* Topic Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">{getTopicIcon()}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{topic}</h2>
              <p className="text-sm text-gray-600">{completedInTopic}/{topicLevels.length} completed</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{Math.round(topicProgress)}%</div>
            <ChevronRight className="w-5 h-5 text-gray-400 mx-auto" />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${topicProgress}%` }}
            transition={{ duration: 0.8, delay: topicIndex * 0.1 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-2 gap-3">
        {topicLevels.map((level, levelIndex) => {
          const isFirstLevel = level.id === 1;
          const previousLevel = sortedLevels.find(l => l.id === level.id - 1);
          const isUnlocked = isFirstLevel || (previousLevel && previousLevel.isCompleted);
          const canAccess = canAccessLevel(level.id);

          return (
            <MobileLevelCard
              key={level.id}
              level={level}
              isUnlocked={isUnlocked && canAccess}
              canAccess={canAccess}
              onPlay={handlePlayLevel}
              index={levelIndex}
            />
          );
        })}
      </div>

      {/* Topic completion celebration */}
      {completedInTopic === topicLevels.length && topicLevels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-center"
        >
          <div className="text-white">
            <div className="text-2xl mb-2">🎉</div>
            <h3 className="font-bold text-lg mb-1">{topic} Mastered!</h3>
            <p className="text-green-100 text-sm">You've completed all lessons in this topic</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MobileTopicSection;
