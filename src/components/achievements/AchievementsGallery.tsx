import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAchievements } from '@/context/AchievementsContext';
import { ACHIEVEMENTS } from '@/data/achievements';
import { Lock, Check, ChevronRight, Trophy, Flame, Target, Zap, Star } from 'lucide-react';

interface AchievementsGalleryProps {
    compact?: boolean;
}

export const AchievementsGallery: React.FC<AchievementsGalleryProps> = ({ compact = false }) => {
    const { isAchievementUnlocked, getAchievementProgress, getUnlockedCount, getTotalCount } = useAchievements();
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'streak' | 'levels' | 'xp' | 'special'>('all');

    const categories = [
        { id: 'all', label: 'All', icon: Trophy },
        { id: 'streak', label: 'Streaks', icon: Flame },
        { id: 'levels', label: 'Levels', icon: Target },
        { id: 'xp', label: 'XP', icon: Zap },
        { id: 'special', label: 'Special', icon: Star },
    ] as const;

    const filteredAchievements = selectedCategory === 'all'
        ? ACHIEVEMENTS
        : ACHIEVEMENTS.filter(a => a.category === selectedCategory);

    if (compact) {
        // Show only first 4 unlocked achievements
        const unlockedAchievements = ACHIEVEMENTS.filter(a => isAchievementUnlocked(a.id)).slice(0, 4);

        return (
            <div className="flex items-center gap-2">
                {unlockedAchievements.map(achievement => (
                    <motion.div
                        key={achievement.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-10 h-10 bg-pastel-yellow rounded-xl border-study flex items-center justify-center text-xl"
                    >
                        {achievement.icon}
                    </motion.div>
                ))}
                {unlockedAchievements.length === 0 && (
                    <span className="text-sm text-slate-500 font-bold">No achievements yet</span>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900">Achievements</h3>
                <div className="flex items-center gap-1.5 bg-pastel-yellow px-3 py-1.5 rounded-full border-study">
                    <Trophy className="w-4 h-4 text-slate-800" />
                    <span className="font-black text-slate-900 text-sm">{getUnlockedCount()}/{getTotalCount()}</span>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {categories.map(cat => (
                    <Button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`shrink-0 h-10 px-4 rounded-full font-bold border-study ${selectedCategory === cat.id
                                ? 'bg-slate-900 text-white'
                                : 'bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        <cat.icon className="w-4 h-4 mr-1.5" />
                        {cat.label}
                    </Button>
                ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                    {filteredAchievements.map((achievement, index) => {
                        const isUnlocked = isAchievementUnlocked(achievement.id);
                        const progress = getAchievementProgress(achievement.id);

                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className={`border-study rounded-[1.5rem] overflow-hidden ${isUnlocked ? 'bg-pastel-yellow' : 'bg-white'
                                    }`}>
                                    <CardContent className="p-4 text-center">
                                        <div className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl ${isUnlocked ? 'bg-white border-study' : 'bg-slate-100'
                                            }`}>
                                            {isUnlocked ? achievement.icon : <Lock className="w-6 h-6 text-slate-400" />}
                                        </div>
                                        <p className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {achievement.title}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-500 mb-2">
                                            {achievement.description}
                                        </p>

                                        {!isUnlocked && (
                                            <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    className="absolute inset-y-0 left-0 bg-slate-900 rounded-full"
                                                />
                                            </div>
                                        )}

                                        {isUnlocked && (
                                            <div className="flex items-center justify-center gap-1">
                                                <Check className="w-4 h-4 text-green-600" />
                                                <span className="text-xs font-bold text-green-600">Unlocked</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};
