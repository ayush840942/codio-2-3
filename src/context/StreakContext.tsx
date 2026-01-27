import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface StreakContextType {
    currentStreak: number;
    longestStreak: number;
    lastLoginDate: string | null;
    checkAndUpdateStreak: () => void;
    getStreakBonus: () => number;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);

    // Load streak data from localStorage
    useEffect(() => {
        const loadStreak = () => {
            try {
                const stored = localStorage.getItem('codio_streak');
                if (stored) {
                    const data = JSON.parse(stored);
                    setCurrentStreak(data.currentStreak || 0);
                    setLongestStreak(data.longestStreak || 0);
                    setLastLoginDate(data.lastLoginDate || null);
                }
            } catch (error) {
                console.error('Failed to load streak:', error);
            }
        };
        loadStreak();
    }, []);

    // Save streak data to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('codio_streak', JSON.stringify({
                currentStreak,
                longestStreak,
                lastLoginDate,
            }));
        } catch (error) {
            console.error('Failed to save streak:', error);
        }
    }, [currentStreak, longestStreak, lastLoginDate]);

    const checkAndUpdateStreak = useCallback(() => {
        const today = new Date().toDateString();

        if (lastLoginDate === today) {
            // Already logged in today
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastLoginDate === yesterdayStr) {
            // Consecutive day - increment streak
            const newStreak = currentStreak + 1;
            setCurrentStreak(newStreak);
            setLongestStreak(Math.max(longestStreak, newStreak));
        } else if (lastLoginDate === null) {
            // First login
            setCurrentStreak(1);
            setLongestStreak(1);
        } else {
            // Streak broken - reset to 1
            setCurrentStreak(1);
        }

        setLastLoginDate(today);
    }, [currentStreak, lastLoginDate, longestStreak]);

    const getStreakBonus = useCallback(() => {
        // Award bonus XP for streak milestones
        if (currentStreak >= 30) return 100;
        if (currentStreak >= 14) return 50;
        if (currentStreak >= 7) return 25;
        if (currentStreak >= 3) return 10;
        return 0;
    }, [currentStreak]);

    // Check streak on mount
    useEffect(() => {
        checkAndUpdateStreak();
    }, []);

    return (
        <StreakContext.Provider
            value={{
                currentStreak,
                longestStreak,
                lastLoginDate,
                checkAndUpdateStreak,
                getStreakBonus,
            }}
        >
            {children}
        </StreakContext.Provider>
    );
};

export const useStreak = () => {
    const context = useContext(StreakContext);
    if (!context) {
        throw new Error('useStreak must be used within StreakProvider');
    }
    return context;
};
