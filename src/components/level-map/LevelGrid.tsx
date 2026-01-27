import React from 'react';
import { motion } from 'framer-motion';
import LevelCard from '@/components/LevelCard';
import { PuzzleLevel } from '@/context/GameContext';
interface LevelGridProps {
  topicLevels: PuzzleLevel[];
  sortedLevels: PuzzleLevel[];
  canAccessLevel: (levelId: number) => boolean;
  handlePlayLevel: (levelId: number) => void;
  topicIndex: number;
}
const LevelGrid: React.FC<LevelGridProps> = ({
  topicLevels,
  sortedLevels,
  canAccessLevel,
  handlePlayLevel,
  topicIndex
}) => {
  console.log('LevelGrid - Topic levels:', topicLevels.map(l => ({
    id: l.id,
    title: l.title
  })));
  return <div className="space-y-3 mb-6">
      {topicLevels.map((level, levelIndex) => {
      // Check if level should be unlocked based on sequence
      const isFirstLevel = level.id === 1;
      const previousLevel = sortedLevels.find(l => l.id === level.id - 1);
      const isUnlocked = isFirstLevel || previousLevel && previousLevel.isCompleted;
      const canAccess = canAccessLevel(level.id);
      const delay = topicIndex * 0.1 + levelIndex * 0.05;

      // Show lock status for debugging
      console.log(`Level ${level.id} - Previous completed: ${previousLevel?.isCompleted}, isUnlocked: ${isUnlocked}, canAccess: ${canAccess}`);
      return <motion.div key={level.id} className="relative" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay,
        duration: 0.3,
        ease: "easeOut"
      }}>
            <div className={`bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 ${!isUnlocked || !canAccess ? 'opacity-60' : ''}`}>
              <LevelCard level={{
            ...level,
            isUnlocked: isUnlocked && canAccess
          }} isUnlocked={isUnlocked && canAccess} canAccess={canAccess} onPlay={handlePlayLevel} />
            </div>

            {/* Sequential progression indicator */}
            {levelIndex < topicLevels.length - 1 && <div className="flex justify-center my-2">
                <div className={`w-0.5 h-3 rounded-full ${level.isCompleted ? 'bg-gradient-to-b from-green-400 to-green-600' : isUnlocked ? 'bg-gradient-to-b from-blue-400 to-blue-600' : 'bg-gradient-to-b from-gray-300 to-gray-400'}`} />
              </div>}

            {/* Lock indicator for locked levels */}
            {!isUnlocked || !canAccess}

            {/* Completion indicator */}
            {level.isCompleted && <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>}
          </motion.div>;
    })}
    </div>;
};
export default LevelGrid;