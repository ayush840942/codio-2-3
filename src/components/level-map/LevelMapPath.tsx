
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PuzzleLevel, useGame } from '@/context/GameContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import ProgressIndicator from './ProgressIndicator';
import InstructionsCard from './InstructionsCard';
import TopicSection from './TopicSection';

interface LevelMapPathProps {
  levels: PuzzleLevel[];
}

const LevelMapPath = ({ levels }: LevelMapPathProps) => {
  const navigate = useNavigate();
  const { canAccessLevel } = useGame();
  const { playButtonPress, playPageTransition } = useSoundEffects();
  
  // Sort levels by ID to ensure proper progression order (1-200)
  const sortedLevels = [...levels].sort((a, b) => a.id - b.id);
  
  // Group levels by topic in the correct learning order
  const topicOrder = [
    'Basic Programming', 
    'HTML', 
    'CSS', 
    'JavaScript', 
    'React', 
    'OOP', 
    'Database', 
    'Databases',
    'Advanced'
  ];
  
  const groupedLevels = topicOrder.reduce((acc, topic) => {
    const topicLevels = sortedLevels.filter(level => 
      level.topic === topic || 
      (topic === 'Basic Programming' && level.topic === 'Programming')
    );
    if (topicLevels.length > 0) {
      acc[topic] = topicLevels.sort((a, b) => a.id - b.id);
    }
    return acc;
  }, {} as Record<string, PuzzleLevel[]>);

  // Add any remaining topics not in the order
  sortedLevels.forEach(level => {
    if (!topicOrder.includes(level.topic) && level.topic !== 'Programming') {
      if (!groupedLevels[level.topic]) {
        groupedLevels[level.topic] = [];
      }
      if (!groupedLevels[level.topic].find(l => l.id === level.id)) {
        groupedLevels[level.topic].push(level);
      }
    }
  });

  const handlePlayLevel = (levelId: number) => {
    playButtonPress();
    setTimeout(() => {
      playPageTransition();
      navigate(`/puzzle/${levelId}`);
    }, 100);
  };

  const totalCompleted = sortedLevels.filter(l => l.isCompleted).length;
  const totalLevels = Math.min(sortedLevels.length, 200); // Cap at 200 levels
  const overallProgress = totalLevels > 0 ? (totalCompleted / totalLevels) * 100 : 0;

  console.log('LevelMapPath - Total levels:', totalLevels);
  console.log('LevelMapPath - Grouped levels:', Object.keys(groupedLevels));
  console.log('LevelMapPath - First few levels:', sortedLevels.slice(0, 10).map(l => ({ id: l.id, title: l.title })));

  return (
    <div className="relative pb-safe-area-inset-bottom">
      <ProgressIndicator
        totalCompleted={totalCompleted}
        totalLevels={totalLevels}
        overallProgress={overallProgress}
      />

      <InstructionsCard />

      {/* Topic Sections */}
      <div className="space-y-8 px-4">
        {Object.entries(groupedLevels).map(([topic, topicLevels], topicIndex) => (
          <TopicSection
            key={topic}
            topic={topic}
            topicLevels={topicLevels}
            sortedLevels={sortedLevels}
            canAccessLevel={canAccessLevel}
            handlePlayLevel={handlePlayLevel}
            topicIndex={topicIndex}
            isLastTopic={topicIndex === Object.entries(groupedLevels).length - 1}
          />
        ))}
      </div>

      {/* Completion celebration for all 200 levels */}
      {totalCompleted === 200 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
            <p className="text-white/90">You've completed all 200 levels! You're now a coding master!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LevelMapPath;
