import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDailyGoals } from '@/context/DailyGoalsContext';
import { CheckCircle, Circle, Zap, Heart, Clock, Target, Sparkles, Flame } from 'lucide-react';

export const DailyGoalsWidget: React.FC = () => {
    const { goals, claimGoalReward } = useDailyGoals();

    const getGoalIcon = (goalId: string) => {
        switch (goalId) {
            case 'complete_levels': return Target;
            case 'earn_xp': return Zap;
            case 'practice_time': return Clock;
            case 'help_others': return Sparkles;
            case 'streak_save': return Flame;
            default: return Target;
        }
    };

    const getGoalColor = (goalId: string) => {
        switch (goalId) {
            case 'complete_levels': return 'bg-pastel-pink';
            case 'earn_xp': return 'bg-pastel-yellow';
            case 'practice_time': return 'bg-pastel-teal';
            case 'help_others': return 'bg-blue-100';
            case 'streak_save': return 'bg-orange-100';
            default: return 'bg-pastel-lavender';
        }
    };

    const handleClaim = (goalId: string) => {
        const reward = claimGoalReward(goalId);
        if (reward) {
            // XP/Hearts handled by context toasts/logic
        }
    };

    const completedCount = goals.filter(g => g.completed).length;

    return (
        <Card className="border-study bg-white rounded-[2rem] shadow-studypal overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black text-slate-900">Daily Goals</h3>
                    <div className="flex items-center gap-1.5 bg-pastel-teal px-3 py-1.5 rounded-full border-study">
                        <CheckCircle className="w-4 h-4 text-slate-800" />
                        <span className="font-black text-slate-900 text-sm">{completedCount}/{goals.length}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {goals.map((goal) => {
                        const Icon = getGoalIcon(goal.id);
                        const progress = Math.min((goal.current / goal.target) * 100, 100);

                        return (
                            <motion.div
                                key={goal.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4"
                            >
                                <div className={`w-12 h-12 ${getGoalColor(goal.id)} rounded-xl flex items-center justify-center border-study shrink-0`}>
                                    <Icon className="w-6 h-6 text-slate-800" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <p className="font-bold text-slate-900 text-sm truncate">{goal.title}</p>
                                        <div className="flex items-center gap-1">
                                            {goal.reward.type === 'xp' ? (
                                                <Zap className="w-3 h-3 text-slate-600" />
                                            ) : (
                                                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                                            )}
                                            <span className="text-xs font-bold text-slate-600">+{goal.reward.amount}</span>
                                        </div>
                                    </div>

                                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                            className={`absolute inset-y-0 left-0 rounded-full ${goal.completed ? 'bg-green-500' : 'bg-slate-900'
                                                }`}
                                        />
                                    </div>

                                    <p className="text-[10px] font-bold text-slate-500 mt-1">
                                        {goal.current}/{goal.target} {goal.id === 'practice_time' ? 'mins' : ''}
                                    </p>
                                </div>

                                <div className="shrink-0">
                                    {goal.completed ? (
                                        <Button
                                            size="sm"
                                            className="h-8 px-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs"
                                            onClick={() => handleClaim(goal.id)}
                                        >
                                            CLAIM
                                        </Button>
                                    ) : (
                                        <Circle className="w-6 h-6 text-slate-300" />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
