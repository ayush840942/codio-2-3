import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useGame } from './GameContext';
import { useRewards } from './RewardsContext';
import { toast } from 'sonner';

interface DailyGoal {
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    reward: { type: 'xp' | 'hearts'; amount: number };
    completed: boolean;
}

interface DailyGoalsContextType {
    goals: DailyGoal[];
    updateGoalProgress: (goalId: string, progress: number) => void;
    claimGoalReward: (goalId: string) => { type: 'xp' | 'hearts'; amount: number } | null;
    resetDailyGoals: () => void;
}

const DailyGoalsContext = createContext<DailyGoalsContextType | undefined>(undefined);

const POOL_GOALS: DailyGoal[] = [
    {
        id: 'complete_levels',
        title: 'Complete 3 Levels',
        description: 'Finish 3 coding challenges',
        target: 3,
        current: 0,
        reward: { type: 'xp', amount: 50 },
        completed: false,
    },
    {
        id: 'earn_xp',
        title: 'Earn 50 XP',
        description: 'Gain experience points',
        target: 50,
        current: 0,
        reward: { type: 'hearts', amount: 1 },
        completed: false,
    },
    {
        id: 'practice_time',
        title: 'Practice 15 Minutes',
        description: 'Spend time coding',
        target: 15,
        current: 0,
        reward: { type: 'xp', amount: 30 },
        completed: false,
    },
    {
        id: 'help_others',
        title: 'Ask 2 Questions',
        description: 'Engage with Codio Assistant',
        target: 2,
        current: 0,
        reward: { type: 'xp', amount: 20 },
        completed: false,
    },
    {
        id: 'streak_save',
        title: 'Practice 2 Days',
        description: 'Keep your streak alive',
        target: 2,
        current: 0,
        reward: { type: 'xp', amount: 100 },
        completed: false,
    },
];

const DEFAULT_GOALS = POOL_GOALS.slice(0, 3);

export const DailyGoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [goals, setGoals] = useState<DailyGoal[]>(DEFAULT_GOALS);
    const [lastResetDate, setLastResetDate] = useState<string | null>(null);

    // Get contexts for tracking
    const gameContext = useGame();
    const rewardsContext = useRewards();

    // Load goals from localStorage
    useEffect(() => {
        const loadGoals = () => {
            try {
                const stored = localStorage.getItem('codio_daily_goals');
                if (stored) {
                    const data = JSON.parse(stored);
                    setGoals(data.goals || DEFAULT_GOALS);
                    setLastResetDate(data.lastResetDate || null);
                }
            } catch (error) {
                console.error('Failed to load daily goals:', error);
            }
        };
        loadGoals();
    }, []);

    // Save goals to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('codio_daily_goals', JSON.stringify({
                goals,
                lastResetDate,
            }));
        } catch (error) {
            console.error('Failed to save daily goals:', error);
        }
    }, [goals, lastResetDate]);

    // Check if goals need to be reset (new day)
    useEffect(() => {
        const checkReset = () => {
            const today = new Date().toDateString();
            if (lastResetDate !== today) {
                console.log('New day detected, resetting daily goals');
                resetDailyGoals();
                setLastResetDate(today);
            }
        };

        checkReset();
        // Check every minute for day change
        const interval = setInterval(checkReset, 60000);
        return () => clearInterval(interval);
    }, [lastResetDate]);

    // Track level completions & XP & streak in a unified real-time reaction
    useEffect(() => {
        if (!gameContext?.gameState) return;

        const { levels, xp } = gameContext.gameState;
        const today = new Date().toDateString();

        // 1. Update level completion goal
        const completedLevels = levels.filter(l => l.isCompleted).length;
        const dailyLevelsKey = `daily_goals_levels_start_${today}`;
        let levelsStart = parseInt(localStorage.getItem(dailyLevelsKey) || '-1');

        if (levelsStart === -1) {
            levelsStart = completedLevels;
            localStorage.setItem(dailyLevelsKey, levelsStart.toString());
        }

        const levelsToday = Math.max(0, completedLevels - levelsStart);

        // 2. Update XP goal
        const dailyXPKey = `daily_goals_xp_start_${today}`;
        let xpStart = parseInt(localStorage.getItem(dailyXPKey) || '-1');

        if (xpStart === -1) {
            xpStart = xp;
            localStorage.setItem(dailyXPKey, xpStart.toString());
        }

        const xpToday = Math.max(0, xp - xpStart);

        // 3. Update goals state
        setGoals(prev => {
            const updated = prev.map(goal => {
                let newCurrent = goal.current;

                if (goal.id === 'complete_levels') {
                    newCurrent = Math.min(levelsToday, goal.target);
                } else if (goal.id === 'earn_xp') {
                    newCurrent = Math.min(xpToday, goal.target);
                } else if (goal.id === 'practice_time') {
                    // Logic for practice time: if they just completed a level or earned XP today, 
                    // we count it as active practice for now as a proxy if real timer isn't active
                    if (levelsToday > 0 || xpToday > 0) {
                        newCurrent = Math.min(goal.current + 5, goal.target); // Increment by 5 mins per action as simplified proxy
                    }
                }

                const wasCompleted = goal.completed;
                const completed = newCurrent >= goal.target;

                if (!wasCompleted && completed) {
                    toast.success(`🎉 Daily Goal Complete!`, {
                        description: `${goal.title} - XP reward added!`
                    });
                    // In a real app, you'd add the actual reward here to the game state
                }

                return { ...goal, current: newCurrent, completed };
            });

            // Only update state if values actually changed to avoid infinite loops
            const changed = JSON.stringify(prev) !== JSON.stringify(updated);
            return changed ? updated : prev;
        });

    }, [gameContext?.gameState?.levels, gameContext?.gameState?.xp, rewardsContext?.rewards?.streak]);

    const updateGoalProgress = useCallback((goalId: string, progress: number) => {
        setGoals(prev => prev.map(goal => {
            if (goal.id === goalId) {
                const newCurrent = Math.min(goal.current + progress, goal.target);
                const wasCompleted = goal.completed;
                const completed = newCurrent >= goal.target;

                // Show toast when goal is newly completed
                if (!wasCompleted && completed) {
                    toast.success(`🎉 Daily Goal Complete!`, {
                        description: `${goal.title} - Claim your reward!`
                    });
                }

                return { ...goal, current: newCurrent, completed };
            }
            return goal;
        }));
    }, []);

    const claimGoalReward = useCallback((goalId: string) => {
        const goal = goals.find(g => g.id === goalId);
        if (!goal || !goal.completed) return null;

        // Reward logic (could be more complex)
        const reward = goal.reward;

        // Rotate Goal: Find a goal from pool that isn't currently active
        const activeIds = goals.map(g => g.id);
        const nextGoal = POOL_GOALS.find(p => !activeIds.includes(p.id));

        if (nextGoal) {
            setGoals(prev => prev.map(g => g.id === goalId ? { ...nextGoal } : g));
            toast.success(`Goal Rotated!`, {
                description: `New goal: ${nextGoal.title}`
            });
        } else {
            // If no more goals in pool, just reset this one but harder? 
            // For now just reset it to not show as "completed" indefinitely
            setGoals(prev => prev.map(g => g.id === goalId ? { ...g, current: 0, completed: false } : g));
        }

        return reward;
    }, [goals]);

    const resetDailyGoals = useCallback(() => {
        setGoals(DEFAULT_GOALS.map(goal => ({ ...goal, current: 0, completed: false })));
        // Reset daily tracking
        const today = new Date().toDateString();
        localStorage.removeItem(`daily_goals_xp_${today}`);
        const completedLevels = gameContext?.gameState?.levels?.filter(l => l.isCompleted).length || 0;
        localStorage.setItem('daily_goals_last_levels', completedLevels.toString());
    }, [gameContext?.gameState?.levels]);

    return (
        <DailyGoalsContext.Provider
            value={{
                goals,
                updateGoalProgress,
                claimGoalReward,
                resetDailyGoals,
            }}
        >
            {children}
        </DailyGoalsContext.Provider>
    );
};

export const useDailyGoals = () => {
    const context = useContext(DailyGoalsContext);
    if (!context) {
        throw new Error('useDailyGoals must be used within DailyGoalsProvider');
    }
    return context;
};
