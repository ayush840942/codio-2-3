import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStreak } from '@/context/StreakContext';
import { cn } from '@/lib/utils';

interface StreakDisplayProps {
    className?: string;
    showLabel?: boolean;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
    className,
    showLabel = true
}) => {
    const { currentStreak } = useStreak();

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <motion.div
                animate={{
                    scale: currentStreak > 0 ? [1, 1.1, 1] : 1,
                }}
                transition={{
                    duration: 0.5,
                    repeat: currentStreak >= 7 ? Infinity : 0,
                    repeatDelay: 2,
                }}
                className="relative"
            >
                <Flame
                    className={cn(
                        "w-6 h-6 transition-colors",
                        currentStreak >= 7 ? "text-orange-500 fill-orange-500" :
                            currentStreak >= 3 ? "text-orange-400 fill-orange-400" :
                                currentStreak > 0 ? "text-orange-300 fill-orange-300" :
                                    "text-slate-300"
                    )}
                />
                {currentStreak >= 7 && (
                    <motion.div
                        className="absolute -inset-1 bg-orange-400/20 rounded-full blur-sm"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    />
                )}
            </motion.div>

            <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900">{currentStreak}</span>
                {showLabel && (
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-none">
                        Day Streak
                    </span>
                )}
            </div>
        </div>
    );
};
