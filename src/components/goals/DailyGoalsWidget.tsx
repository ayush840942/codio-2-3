import React from 'react';
import { motion } from 'framer-motion';
import { useDailyGoals } from '@/context/DailyGoalsContext';
import { CheckCircle, Circle, Zap, Heart, Clock, Target, Sparkles, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DrawnButton } from '@/components/ui/HandDrawnComponents';

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

    const handleClaim = async (goalId: string) => {
        await claimGoalReward(goalId);
        // XP/Hearts handled by context toasts/logic
    };

    const completedCount = goals.filter(g => g.completed).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-black/40 italic uppercase tracking-widest">Progress</span>
                    <div className="h-0.5 flex-1 bg-black/10 min-w-[40px]" />
                </div>
                <div className="flex items-center gap-2 bg-cc-green border-2 border-black px-3 py-1 rounded-full shadow-comic-sm rotate-1">
                    <CheckCircle className="w-4 h-4 text-black" strokeWidth={3} />
                    <span className="font-black text-black text-xs uppercase">{completedCount}/{goals.length} DONE</span>
                </div>
            </div>

            <div className="space-y-5">
                {goals.map((goal) => {
                    const Icon = getGoalIcon(goal.id);
                    const progress = Math.min((goal.current / goal.target) * 100, 100);
                    const colorMap: Record<string, string> = {
                        'bg-pastel-pink': 'bg-cc-pink',
                        'bg-pastel-yellow': 'bg-cc-yellow',
                        'bg-pastel-teal': 'bg-cc-green',
                        'bg-blue-100': 'bg-cc-blue',
                        'bg-orange-100': 'bg-cc-blue',
                        'bg-pastel-lavender': 'bg-cc-purple'
                    };
                    const comicBg = colorMap[getGoalColor(goal.id)] || 'bg-cc-blue';

                    return (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl border-2 border-black/5"
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center border-3 border-black shrink-0 shadow-comic-sm rotate-[-2deg]",
                                comicBg
                            )}>
                                <Icon className="w-7 h-7 text-black" strokeWidth={3} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-black text-black text-base uppercase tracking-tight leading-tight">{goal.title}</p>
                                    <div className="flex items-center gap-1.5 bg-black/5 px-2 py-0.5 rounded-lg border-2 border-black/5">
                                        {goal.reward.type === 'xp' ? (
                                            <Zap className="w-3 h-3 text-black fill-black" strokeWidth={3} />
                                        ) : (
                                            <Heart className="w-3 h-3 text-cc-pink fill-cc-pink" strokeWidth={3} />
                                        )}
                                        <span className="text-xs font-black text-black">+{goal.reward.amount}</span>
                                    </div>
                                </div>

                                <div className="relative h-4 bg-black/10 border-2 border-black rounded-lg overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className={cn(
                                            "absolute inset-y-0 left-0 border-r-2 border-black",
                                            goal.completed ? 'bg-cc-green' : 'bg-black'
                                        )}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10px] font-black text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)] uppercase tracking-widest">
                                            {goal.current} / {goal.target} {goal.id === 'practice_time' ? 'MINS' : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 min-w-[80px] flex justify-end">
                                {goal.completed && !goal.claimed ? (
                                    <DrawnButton
                                        onClick={() => handleClaim(goal.id)}
                                        className="h-10 px-4 text-xs bg-cc-green py-0 shadow-comic-sm active:translate-y-0.5 rounded-xl border-2"
                                    >
                                        CLAIM
                                    </DrawnButton>
                                ) : goal.claimed ? (
                                    <div className="text-xs font-black text-cc-green flex items-center gap-1 uppercase italic tracking-widest">
                                        <CheckCircle className="w-3 h-3" strokeWidth={4} /> Claimed
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full border-3 border-black/10 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-black/10 rounded-full" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
