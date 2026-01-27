import React from 'react';
import { motion } from 'framer-motion';
import { PuzzleLevel } from '@/context/GameContext';
import SimpleLevelCard from './SimpleLevelCard';
import { Trophy, Zap, BookOpen, Star, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SimpleLevelMapProps {
  levels: PuzzleLevel[];
  canAccessLevel: (levelId: number) => boolean;
  onPlayLevel: (levelId: number) => void;
}

const SimpleLevelMap: React.FC<SimpleLevelMapProps> = ({
  levels,
  canAccessLevel,
  onPlayLevel
}) => {
  const sortedLevels = [...levels].sort((a, b) => a.id - b.id);
  const completedCount = sortedLevels.filter(l => l.isCompleted).length;
  const totalCount = sortedLevels.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const groupedLevels = sortedLevels.reduce((acc, level) => {
    const topic = level.topic || 'General';
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(level);
    return acc;
  }, {} as Record<string, PuzzleLevel[]>);

  const topicOrder = ['Basic Programming', 'HTML', 'CSS', 'JavaScript', 'Python', 'TypeScript', 'C++', 'C#', 'Dart', 'Go', 'Kotlin', 'Swift', 'React', 'OOP', 'Database', 'Data Structures', 'Algorithms', 'Web Development', 'Testing', 'Frameworks', 'Mobile', 'DevOps', 'Security', 'Performance', 'AI/ML', 'Advanced'];
  const orderedTopics = topicOrder.filter(topic => groupedLevels[topic]);
  Object.keys(groupedLevels).forEach(topic => {
    if (!topicOrder.includes(topic)) orderedTopics.push(topic);
  });

  const getTopicInfo = (topic: string) => {
    const info: Record<string, { bg: string; emoji: string }> = {
      'HTML': { bg: 'bg-pastel-pink', emoji: '🌐' },
      'CSS': { bg: 'bg-pastel-blue', emoji: '🎨' },
      'JavaScript': { bg: 'bg-pastel-yellow', emoji: '⚡' },
      'Python': { bg: 'bg-pastel-mint', emoji: '🐍' },
      'React': { bg: 'bg-pastel-blue', emoji: '⚛️' },
      'Database': { bg: 'bg-pastel-lavender', emoji: '🗄️' },
    };
    return info[topic] || { bg: 'bg-pastel-blue', emoji: '📚' };
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-8 relative">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="sticky top-0 z-10 -mx-4 px-4 py-4 mb-6">
        <Card className="bg-card border border-border rounded-3xl shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pastel-blue border border-border rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Learn to Code</h1>
                  <p className="text-sm text-muted-foreground">{completedCount}/{totalCount} levels</p>
                </div>
              </div>
              <motion.span className="text-2xl font-bold text-foreground" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                {progressPercent}%
              </motion.span>
            </div>
            <div className="h-3 bg-secondary border border-border rounded-full overflow-hidden">
              <motion.div className="h-full bg-pastel-mint rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Topics */}
      <div className="space-y-6">
        {orderedTopics.map((topic, topicIndex) => {
          const topicLevels = groupedLevels[topic];
          const topicCompleted = topicLevels.filter(l => l.isCompleted).length;
          const topicTotal = topicLevels.length;
          const isTopicComplete = topicCompleted === topicTotal && topicTotal > 0;
          const info = getTopicInfo(topic);

          return (
            <motion.div key={topic} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: topicIndex * 0.05 }} className="space-y-3">
              <Card className={`${info.bg} border border-border rounded-2xl shadow-sm`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center text-xl">
                      {info.emoji}
                    </div>
                    <div>
                      <h2 className="font-bold text-foreground">{topic}</h2>
                      <p className="text-xs text-foreground/70">{topicCompleted}/{topicTotal} completed</p>
                    </div>
                  </div>
                  {isTopicComplete && (
                    <div className="flex items-center gap-1 bg-card border border-border px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-foreground" />
                      <span className="text-xs font-medium text-foreground">Done</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-2 pl-2">
                {topicLevels.map((level, levelIndex) => {
                  const isFirstLevel = level.id === 1;
                  const previousLevel = sortedLevels.find(l => l.id === level.id - 1);
                  const isUnlocked = isFirstLevel || (previousLevel && previousLevel.isCompleted);
                  return (
                    <SimpleLevelCard key={level.id} level={level} isUnlocked={isUnlocked && canAccessLevel(level.id)} canAccess={canAccessLevel(level.id)} onPlay={onPlayLevel} index={levelIndex} />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {completedCount === totalCount && totalCount > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
          <Card className="bg-pastel-yellow border border-border rounded-3xl shadow-md">
            <CardContent className="p-8 text-center">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <Trophy className="w-16 h-16 text-foreground mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2">🎉 Congratulations! 🎉</h3>
              <p className="text-foreground/70">You've mastered all {totalCount} levels!</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SimpleLevelMap;