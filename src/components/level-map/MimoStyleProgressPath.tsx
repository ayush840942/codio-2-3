
import React from 'react';
import { motion } from 'framer-motion';
import { PuzzleLevel } from '@/context/GameContext';
import MimoStyleLevelCard from './MimoStyleLevelCard';
import { Trophy, Target, Zap, BookOpen } from 'lucide-react';

interface MimoStyleProgressPathProps {
  levels: PuzzleLevel[];
  canAccessLevel: (levelId: number) => boolean;
  onPlayLevel: (levelId: number) => void;
}

const MimoStyleProgressPath: React.FC<MimoStyleProgressPathProps> = ({
  levels,
  canAccessLevel,
  onPlayLevel
}) => {
  const sortedLevels = [...levels].sort((a, b) => a.id - b.id);
  const completedCount = sortedLevels.filter(l => l.isCompleted).length;
  const totalCount = sortedLevels.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Group levels by topic for better organization
  const groupedLevels = sortedLevels.reduce((acc, level) => {
    const topic = level.topic || 'General';
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(level);
    return acc;
  }, {} as Record<string, PuzzleLevel[]>);

  const topicOrder = ['Basic Programming', 'HTML', 'CSS', 'JavaScript', 'React', 'OOP', 'Database', 'Advanced'];
  const orderedTopics = topicOrder.filter(topic => groupedLevels[topic]);
  
  // Add any remaining topics not in the predefined order
  Object.keys(groupedLevels).forEach(topic => {
    if (!topicOrder.includes(topic)) {
      orderedTopics.push(topic);
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-6">
      {/* Game-style Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
        
        <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-4 right-4">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg text-center">
            🎮 Your Coding Adventure
          </h1>
          <p className="text-xl text-white/90 mb-6 text-center font-medium">
            Level up your coding skills with Codio!
          </p>
          
          {/* Game-style Progress Bar */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border-4 border-white/50 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center animate-bounce">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black text-gray-800">Level Progress</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-3xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{progressPercent}%</span>
                <span className="text-xs text-gray-500 font-semibold">COMPLETE</span>
              </div>
            </div>
            <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300 shadow-inner mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-white drop-shadow-lg">
                  {completedCount}/{totalCount} LEVELS
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <p className="text-gray-700 text-sm font-semibold">
                {totalCount - completedCount} levels to unlock!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Topics and Levels */}
      <div className="space-y-12">
        {orderedTopics.map((topic, topicIndex) => {
          const topicLevels = groupedLevels[topic];
          const topicCompleted = topicLevels.filter(l => l.isCompleted).length;
          const topicTotal = topicLevels.length;
          const topicProgress = topicTotal > 0 ? Math.round((topicCompleted / topicTotal) * 100) : 0;

          return (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: topicIndex * 0.1, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Game-style Topic Header */}
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-1 shadow-xl">
                <div className="bg-white rounded-[22px] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BookOpen className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
                          {topic}
                          <Target className="w-6 h-6 text-purple-500" />
                        </h2>
                        <p className="text-gray-600 font-semibold text-sm">{topicCompleted}/{topicTotal} Levels Beaten!</p>
                      </div>
                    </div>
                    <div className="text-right bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-2 rounded-xl">
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{topicProgress}%</div>
                    </div>
                  </div>
                  
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${topicProgress}%` }}
                      transition={{ duration: 1, delay: topicIndex * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Level Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicLevels.map((level, levelIndex) => {
                  const isFirstLevel = level.id === 1;
                  const previousLevel = sortedLevels.find(l => l.id === level.id - 1);
                  const isUnlocked = isFirstLevel || (previousLevel && previousLevel.isCompleted);
                  const canAccess = canAccessLevel(level.id);

                  return (
                    <MimoStyleLevelCard
                      key={level.id}
                      level={level}
                      isUnlocked={isUnlocked && canAccess}
                      canAccess={canAccess}
                      onPlay={onPlayLevel}
                      index={levelIndex}
                    />
                  );
                })}
              </div>

              {/* Topic Completion Celebration */}
              {topicCompleted === topicTotal && topicTotal > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                    <Trophy className="w-6 h-6" />
                    <div>
                      <div className="font-bold text-lg">🎉 {topic} Mastered!</div>
                      <div className="text-green-100 text-sm">You've completed all lessons in this topic</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Final Completion Celebration */}
      {completedCount === totalCount && totalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-12"
        >
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold mb-3">Congratulations!</h3>
            <p className="text-white/90 text-lg">You've mastered all coding lessons! You're now ready to build amazing applications!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MimoStyleProgressPath;
