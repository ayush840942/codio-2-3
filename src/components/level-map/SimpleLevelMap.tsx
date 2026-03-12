import React from 'react';
import { motion } from 'framer-motion';
import { PuzzleLevel } from '@/context/GameContext';
import SimpleLevelCard from './SimpleLevelCard';
import { Trophy, BookOpen, Star } from 'lucide-react';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';
import MobileHeader from '@/components/MobileHeader';
import { StreakDisplay } from '../streak/StreakDisplay';
import { HeartsDisplay } from '../hearts/HeartsDisplay';

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
    const info: Record<string, { bg: string; variant: any; emoji: string }> = {
      'HTML': { bg: 'bg-cc-pink', variant: 'cc-pink', emoji: '🌐' },
      'CSS': { bg: 'bg-cc-blue', variant: 'cc-blue', emoji: '🎨' },
      'JavaScript': { bg: 'bg-cc-yellow', variant: 'cc-yellow', emoji: '⚡' },
      'Python': { bg: 'bg-cc-green', variant: 'cc-green', emoji: '🐍' },
      'React': { bg: 'bg-cc-blue', variant: 'cc-blue', emoji: '⚛️' },
      'Database': { bg: 'bg-cc-purple', variant: 'white', emoji: '🗄️' },
    };
    return info[topic] || { bg: 'bg-cc-blue', variant: 'cc-blue', emoji: '📚' };
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-32 relative font-draw">
      {/* Unified Mobile Header */}
      <MobileHeader
        title="The Path"
        subtitle={`${completedCount} / ${totalCount} MASTERED`}
        rightElement={
          <div className="flex items-center gap-2">
            <StreakDisplay showLabel={false} />
            <HeartsDisplay showTimer={false} />
          </div>
        }
      />

      <div style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
        <div className="max-w-2xl mx-auto px-4 mb-4">
          <div className="h-4 bg-gray-100 border-3 border-black rounded-full overflow-hidden relative shadow-comic-sm">
            <div
              className="h-full bg-cc-green"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        {/* Topics List */}
        <div className="space-y-12">
          {orderedTopics.map((topic, topicIndex) => {
            const topicLevels = groupedLevels[topic];
            const topicCompleted = topicLevels.filter(l => l.isCompleted).length;
            const topicTotal = topicLevels.length;
            const isTopicComplete = topicCompleted === topicTotal && topicTotal > 0;
            const info = getTopicInfo(topic);

            return (
              <div
                key={topic}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 ml-2">
                  <div className="w-14 h-14 border-3 border-black rounded-2xl bg-white flex items-center justify-center text-3xl shadow-comic-sm -rotate-3">
                    {info.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-black uppercase tracking-tight">{topic}</h2>
                    {isTopicComplete && (
                      <span className="inline-block text-[10px] bg-white px-2 py-0.5 border-2 border-black rounded-full font-black uppercase tracking-widest mt-1">MASTERED</span>
                    )}
                  </div>
                </div>

                <DrawnCard variant={info.variant} className="border-4 relative rounded-none p-10 min-h-[300px] flex items-center justify-center overflow-visible">
                  {/* Background Decoration */}
                  <div className="absolute right-4 bottom-4 opacity-5 rotate-12 pointer-events-none">
                    <Trophy className="w-32 h-32 text-black" />
                  </div>

                  <div className="relative z-10 w-full max-w-md mx-auto">
                    <div className="flex flex-col gap-10">
                      {/* Group levels into chunks of 5 for a 3-2 staggered pattern */}
                      {Array.from({ length: Math.ceil(topicLevels.length / 5) }).map((_, groupIndex) => {
                        const chunk = topicLevels.slice(groupIndex * 5, groupIndex * 5 + 5);
                        return (
                          <div key={groupIndex} className="flex flex-col gap-10">
                            {/* Row of 3 */}
                            <div className="flex justify-center gap-4 sm:gap-8">
                              {chunk.slice(0, 3).map((level, i) => {
                                const isFirstLevel = level.id === 1;
                                const previousLevel = sortedLevels.find(l => l.id === level.id - 1);
                                const isUnlocked = isFirstLevel || (previousLevel && previousLevel.isCompleted);
                                return (
                                  <SimpleLevelCard
                                    key={level.id}
                                    level={level}
                                    isUnlocked={isUnlocked && canAccessLevel(level.id)}
                                    canAccess={canAccessLevel(level.id)}
                                    onPlay={onPlayLevel}
                                    index={groupIndex * 5 + i}
                                  />
                                );
                              })}
                            </div>
                            {/* Row of 2 */}
                            {chunk.length > 3 && (
                              <div className="flex justify-center gap-10 sm:gap-16">
                                {chunk.slice(3, 5).map((level, i) => {
                                  const isFirstLevel = level.id === 1;
                                  const previousLevel = sortedLevels.find(l => l.id === level.id - 1);
                                  const isUnlocked = isFirstLevel || (previousLevel && previousLevel.isCompleted);
                                  return (
                                    <SimpleLevelCard
                                      key={level.id}
                                      level={level}
                                      isUnlocked={isUnlocked && canAccessLevel(level.id)}
                                      canAccess={canAccessLevel(level.id)}
                                      onPlay={onPlayLevel}
                                      index={groupIndex * 5 + 3 + i}
                                    />
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </DrawnCard>
              </div>
            );
          })}
        </div>

        {completedCount === totalCount && totalCount > 0 && (
          <div className="mt-12 text-center">
            <DrawnCard className="bg-pastel-yellow p-10 border-4 border-black shadow-comic">
              <h3 className="text-4xl font-black mb-4 text-black uppercase">WORLD MASTER!</h3>
              <p className="text-xl font-bold opacity-70 text-slate-800 italic">You've conquered all {totalCount} coding challenges!</p>
            </DrawnCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleLevelMap;