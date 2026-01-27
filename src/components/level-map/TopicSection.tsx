
import React from 'react';
import { motion } from 'framer-motion';
import TopicHeader from './TopicHeader';
import LevelGrid from './LevelGrid';
import { PuzzleLevel } from '@/context/GameContext';

interface TopicSectionProps {
  topic: string;
  topicLevels: PuzzleLevel[];
  sortedLevels: PuzzleLevel[];
  canAccessLevel: (levelId: number) => boolean;
  handlePlayLevel: (levelId: number) => void;
  topicIndex: number;
  isLastTopic: boolean;
}

const TopicSection: React.FC<TopicSectionProps> = ({
  topic,
  topicLevels,
  sortedLevels,
  canAccessLevel,
  handlePlayLevel,
  topicIndex,
  isLastTopic
}) => {
  const completedInTopic = topicLevels.filter(l => l.isCompleted).length;
  const topicProgress = topicLevels.length > 0 ? (completedInTopic / topicLevels.length) * 100 : 0;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: topicIndex * 0.15, duration: 0.5 }}
    >
      <TopicHeader
        topic={topic}
        completedInTopic={completedInTopic}
        totalInTopic={topicLevels.length}
        topicProgress={topicProgress}
        topicIndex={topicIndex}
      />

      <LevelGrid
        topicLevels={topicLevels}
        sortedLevels={sortedLevels}
        canAccessLevel={canAccessLevel}
        handlePlayLevel={handlePlayLevel}
        topicIndex={topicIndex}
      />

      {/* Topic completion celebration */}
      {completedInTopic === topicLevels.length && topicLevels.length > 0 && (
        <motion.div
          className="text-center py-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{topic} Mastered!</span>
          </div>
        </motion.div>
      )}

      {/* Topic separator */}
      {!isLastTopic && (
        <div className="py-8 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-puzzle-purple/40 to-transparent" />
            <div className="w-2 h-2 bg-puzzle-purple/40 rounded-full animate-pulse" />
            <div className="w-12 h-px bg-gradient-to-r from-puzzle-purple/40 via-transparent to-transparent" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TopicSection;
