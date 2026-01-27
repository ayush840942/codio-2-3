import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useHearts } from '@/context/HeartsContext';
import { cn } from '@/lib/utils';

interface HeartsDisplayProps {
    className?: string;
    showTimer?: boolean;
}

export const HeartsDisplay: React.FC<HeartsDisplayProps> = ({
    className,
    showTimer = true
}) => {
    const { hearts, maxHearts, timeUntilNextHeart } = useHearts();

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex items-center gap-1">
                {Array.from({ length: maxHearts }).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Heart
                            className={cn(
                                "w-5 h-5 transition-all",
                                index < hearts
                                    ? "fill-red-500 text-red-500"
                                    : "fill-slate-200 text-slate-300"
                            )}
                        />
                    </motion.div>
                ))}
            </div>

            {showTimer && hearts < maxHearts && timeUntilNextHeart > 0 && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold text-slate-600"
                >
                    {formatTime(timeUntilNextHeart)}
                </motion.span>
            )}
        </div>
    );
};
