import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useGame } from './GameContext';
import { useRewards } from './RewardsContext';
import { useHearts } from './HeartsContext';
import { toast } from 'sonner';

export type DailyGoal = {
    id: string;
    title: string;
    target: number;
    current: number;
    completed: boolean;
    claimed: boolean;
    reward: {
        type: 'xp' | 'hearts';
        amount: number;
    };
};

const POOL_GOALS: Omit<DailyGoal, 'current' | 'completed' | 'claimed'>[] = [
    { id: 'earn_xp', title: 'Earn 50 XP', target: 50, reward: { type: 'xp', amount: 20 } },
    { id: 'complete_levels', title: 'Complete 3 Levels', target: 3, reward: { type: 'xp', amount: 30 } },
    { id: 'practice_time', title: 'Practice for 10 mins', target: 10, reward: { type: 'xp', amount: 15 } },
    { id: 'use_hint', title: 'Use a Hint', target: 1, reward: { type: 'xp', amount: 10 } },
    { id: 'maintain_streak', title: 'Keep the Streak', target: 1, reward: { type: 'hearts', amount: 1 } },
    { id: 'achieve_mastery', title: 'Perfect Score', target: 1, reward: { type: 'xp', amount: 25 } },
];

type DailyGoalsContextType = {
    goals: DailyGoal[];
    claimGoalReward: (goalId: string) => void;
    updateGoalProgress: (goalId: string, increment: number) => void;
};

const DailyGoalsContext = createContext<DailyGoalsContextType | undefined>(undefined);

export const DailyGoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { gameState } = useGame();
    const rewardsContext = useRewards();
    const heartsContext = useHearts();

    const [goals, setGoals] = useState<DailyGoal[]>(() => {
        const saved = localStorage.getItem('daily_goals');
        const lastReset = localStorage.getItem('last_goals_reset');
        const today = new Date().toDateString();

        if (saved && lastReset === today) {
            return JSON.parse(saved);
        }

        // Default goals for a new day
        localStorage.setItem('last_goals_reset', today);
        return POOL_GOALS.slice(0, 3).map(g => ({ ...g, current: 0, completed: false, claimed: false }));
    });

    useEffect(() => {
        localStorage.setItem('daily_goals', JSON.stringify(goals));
    }, [goals]);

    const updateGoalProgress = useCallback((goalId: string, increment: number) => {
        setGoals(prev => {
            const newGoals = prev.map(goal => {
                if (goal.id === goalId && !goal.completed) {
                    const newCurrent = goal.current + increment;
                    const isNowCompleted = newCurrent >= goal.target;
                    if (isNowCompleted && !goal.completed) {
                        toast.success(`Goal Achieved: ${goal.title}!`);
                    }
                    return { ...goal, current: newCurrent, completed: isNowCompleted };
                }
                return goal;
            });
            return newGoals;
        });
    }, []);

    const { rewards } = useRewards();
    const lastXPRef = React.useRef(rewards.xp);

    // Track XP gains in real-time
    useEffect(() => {
        if (rewards.xp > lastXPRef.current) {
            const gain = rewards.xp - lastXPRef.current;
            // Only update if it's not a logic error
            if (gain > 0 && gain < 1000) {
                updateGoalProgress('earn_xp', gain);
            }
            lastXPRef.current = rewards.xp;
        } else if (rewards.xp < lastXPRef.current) {
            lastXPRef.current = rewards.xp;
        }
    }, [rewards.xp, updateGoalProgress]);

    // Track level completions in real-time
    useEffect(() => {
        const completedCount = gameState.levels.filter(l => l.isCompleted).length;
        const lastCompletedCountString = localStorage.getItem('last_completed_count');
        const lastCompletedCount = lastCompletedCountString ? JSON.parse(lastCompletedCountString) : completedCount;

        if (completedCount > lastCompletedCount) {
            updateGoalProgress('complete_levels', completedCount - lastCompletedCount);
        }
        localStorage.setItem('last_completed_count', JSON.stringify(completedCount));
    }, [gameState.levels, updateGoalProgress]);

    // Practice time tracking
    useEffect(() => {
        const interval = setInterval(() => {
            // Check if user is on a puzzle page
            if (window.location.pathname.includes('/puzzle/')) {
                updateGoalProgress('practice_time', 1); // Increment by 1 minute (simulated by faster update for testing or just 1/60th)
                // For better accuracy, we should track seconds and convert, but for now 1 unit = 1 progress
            }
        }, 60000); // Every minute
        return () => clearInterval(interval);
    }, [updateGoalProgress]);

    const [isClaiming, setIsClaiming] = useState(false);

    const claimGoalReward = useCallback(async (goalId: string) => {
        if (isClaiming) return;

        const goal = goals.find(g => g.id === goalId);
        if (!goal || !goal.completed || goal.claimed) {
            console.warn('⚠️ Cannot claim goal reward:', { id: goalId, goal });
            return;
        }

        setIsClaiming(true);
        try {
            console.log(`🎁 Starting to claim reward for: ${goal.title} (+${goal.reward.amount} ${goal.reward.type})`);

            // 1. Mark as claimed LOCALLY first for immediate feedback
            const updatedGoals = goals.map(g => g.id === goalId ? { ...g, claimed: true } : g);
            setGoals(updatedGoals);
            localStorage.setItem('daily_goals', JSON.stringify(updatedGoals));

            // 2. Grant the reward (Optimistic, don't fail if offline/guest)
            if (goal.reward.type === 'xp') {
                await rewardsContext.addXP(goal.reward.amount);
            } else if (goal.reward.type === 'hearts') {
                await heartsContext.addHearts(goal.reward.amount);
            }

            console.log('✅ Reward successfully claimed locally');
            toast.success(`🎉 +${goal.reward.amount} ${goal.reward.type.toUpperCase()}!`);

            // 3. Immediate Rotation Logic (Infinite Missions)
            setGoals(prev => {
                const currentIds = prev.map(g => g.id);
                // Filter out the goal we just claimed and any already in the list
                const availablePool = POOL_GOALS.filter(pg => pg.id !== goalId && !currentIds.includes(pg.id));

                let nextGoal;
                if (availablePool.length > 0) {
                    // Pick a random available goal
                    nextGoal = availablePool[Math.floor(Math.random() * availablePool.length)];
                } else {
                    // Fallback if all are somehow used (just pick any other goal to keep infinite loop going)
                    nextGoal = POOL_GOALS.find(pg => pg.id !== goalId) || POOL_GOALS[0];
                }

                // Replace the claimed goal with the new goal immediately
                const rotatedGoals = prev.map(g =>
                    g.id === goalId ? { ...nextGoal, current: 0, completed: false, claimed: false } : g
                );

                localStorage.setItem('daily_goals', JSON.stringify(rotatedGoals));
                return rotatedGoals;
            });

        } catch (error) {
            console.error('❌ Error claiming goal reward:', error);
            toast.error('Failed to claim reward. Please try again.');
            // Revert claimed state
            const revertedGoals = goals.map(g => g.id === goalId ? { ...g, claimed: false } : g);
            setGoals(revertedGoals);
            localStorage.setItem('daily_goals', JSON.stringify(revertedGoals));
        } finally {
            setIsClaiming(false);
        }
    }, [goals, rewardsContext, heartsContext, isClaiming]);

    return (
        <DailyGoalsContext.Provider value={{ goals, claimGoalReward, updateGoalProgress }}>
            {children}
        </DailyGoalsContext.Provider>
    );
};

export const useDailyGoals = () => {
    const context = useContext(DailyGoalsContext);
    if (!context) throw new Error('useDailyGoals must be used within a DailyGoalsProvider');
    return context;
};
