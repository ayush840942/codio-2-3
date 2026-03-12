import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS, Achievement } from '@/data/achievements';
import { useGame } from './GameContext';
import { useRewards } from './RewardsContext';
import { useStreak } from './StreakContext';
import { toast } from 'sonner';

interface AchievementsContextType {
    unlockedAchievements: string[];
    checkAchievements: () => void;
    getAchievementProgress: (achievementId: string) => number;
    isAchievementUnlocked: (achievementId: string) => boolean;
    getUnlockedCount: () => number;
    getTotalCount: () => number;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const { gameState } = useGame();
    const { rewards } = useRewards();
    const { currentStreak, longestStreak } = useStreak();

    // Load unlocked achievements from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('codio_achievements');
            if (stored) {
                setUnlockedAchievements(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load achievements:', error);
        }
    }, []);

    // Save unlocked achievements to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('codio_achievements', JSON.stringify(unlockedAchievements));
        } catch (error) {
            console.error('Failed to save achievements:', error);
        }
    }, [unlockedAchievements]);

    const getProgress = useCallback((achievement: Achievement): number => {
        switch (achievement.category) {
            case 'streak':
                return Math.max(currentStreak, longestStreak);
            case 'levels':
                return gameState.levels.filter(l => l.isCompleted).length;
            case 'xp':
                return rewards?.xp || 0;
            default:
                return 0;
        }
    }, [currentStreak, longestStreak, gameState.levels, rewards?.xp]);

    const checkAchievements = useCallback(() => {
        const newUnlocked: string[] = [];

        ACHIEVEMENTS.forEach(achievement => {
            if (!unlockedAchievements.includes(achievement.id)) {
                const progress = getProgress(achievement);
                if (progress >= achievement.requirement) {
                    newUnlocked.push(achievement.id);
                    toast.success(`🏆 Achievement Unlocked: ${achievement.title}!`);
                }
            }
        });

        if (newUnlocked.length > 0) {
            setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
        }
    }, [unlockedAchievements, getProgress]);

    // Check achievements on relevant state changes
    useEffect(() => {
        checkAchievements();
    }, [rewards?.xp, currentStreak, gameState.levels]);

    const getAchievementProgress = useCallback((achievementId: string): number => {
        const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
        if (!achievement) return 0;
        return Math.min((getProgress(achievement) / achievement.requirement) * 100, 100);
    }, [getProgress]);

    const isAchievementUnlocked = useCallback((achievementId: string): boolean => {
        return unlockedAchievements.includes(achievementId);
    }, [unlockedAchievements]);

    const getUnlockedCount = useCallback(() => unlockedAchievements.length, [unlockedAchievements]);
    const getTotalCount = useCallback(() => ACHIEVEMENTS.length, []);

    return (
        <AchievementsContext.Provider
            value={{
                unlockedAchievements,
                checkAchievements,
                getAchievementProgress,
                isAchievementUnlocked,
                getUnlockedCount,
                getTotalCount,
            }}
        >
            {children}
        </AchievementsContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementsContext);
    if (!context) {
        throw new Error('useAchievements must be used within AchievementsProvider');
    }
    return context;
};
