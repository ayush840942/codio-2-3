
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, Check, Star } from 'lucide-react';
import { PuzzleLevel } from '@/context/GameContext';
import { cn } from '@/lib/utils';
import { soundEffects } from '@/utils/soundEffects';

interface SimpleLevelCardProps {
    level: PuzzleLevel;
    isUnlocked: boolean;
    canAccess: boolean;
    onPlay: (levelId: number) => void;
    index: number;
}

const SimpleLevelCard: React.FC<SimpleLevelCardProps> = ({
    level,
    isUnlocked,
    canAccess,
    onPlay,
    index
}) => {
    const isCompleted = level.isCompleted;
    const isLocked = !canAccess || !isUnlocked;

    const handlePress = () => {
        if (!isLocked) {
            soundEffects.buttonPress();
            onPlay(level.id);
        }
    };

    return (
        <div
            onClick={handlePress}
            className={cn(
                "relative w-20 h-20 flex flex-col items-center justify-center rounded-full border-3 border-black shadow-comic-sm transition-all cursor-pointer mb-2 active:scale-95",
                isCompleted ? "bg-cc-green" : isLocked ? "bg-gray-100 border-gray-400" : "bg-white",
                !isLocked && "active:translate-y-1"
            )}
        >
            {/* Status Icon or Level Number */}
            <div className="flex flex-col items-center z-10">
                {isCompleted ? (
                    <Check className="w-12 h-12 text-black" strokeWidth={5} />
                ) : isLocked ? (
                    <Lock className="w-8 h-8 text-gray-400" strokeWidth={3} />
                ) : (
                    <span className="text-3xl font-black text-black leading-none">{level.id}</span>
                )}
            </div>

            {/* Level Star Badge - Circular Top Right */}
            <div className={cn(
                "absolute -top-1 -right-1 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-comic-sm z-20",
                isCompleted ? "bg-cc-pink" : isLocked ? "bg-gray-200" : "bg-cc-pink"
            )}>
                <Star className={cn("w-4 h-4", isCompleted ? "fill-black text-black" : "text-black/40 fill-transparent")} strokeWidth={3} />
            </div>

        </div>
    );
};

export default SimpleLevelCard;
