import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, Star, Sparkles } from 'lucide-react';
import { PuzzleLevel } from '@/context/GameContext';
import { cn } from '@/lib/utils';
import { soundEffects } from '@/utils/soundEffects';

interface EpicLevelNodeProps {
    level: PuzzleLevel;
    isUnlocked: boolean;
    canAccess: boolean;
    onPlay: (levelId: number) => void;
    position: { x: number; y: number };
    index: number;
}

const EpicLevelNode: React.FC<EpicLevelNodeProps> = ({
    level,
    isUnlocked,
    canAccess,
    onPlay,
    position,
    index
}) => {
    const isCompleted = level.isCompleted;
    const isLocked = !canAccess || !isUnlocked;
    const isActive = isUnlocked && !isCompleted;

    const handlePress = () => {
        if (!isLocked) {
            soundEffects.buttonPress();
            onPlay(level.id);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={!isLocked ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            transition={{ delay: index * 0.02, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute"
            style={{
                left: `${position.x}%`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10
            }}
            onClick={handlePress}
        >
            <div className="relative">
                {/* Active Level Pulsing Ring */}
                {isActive && (
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-[-12px] rounded-full border-4 border-cc-yellow"
                    />
                )}

                <div
                    className={cn(
                        "relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-black shadow-comic-sm transition-all cursor-pointer",
                        isCompleted ? "bg-cc-green" : isLocked ? "bg-gray-100 border-gray-400" : "bg-cc-yellow",
                        isActive && "shadow-comic-lg"
                    )}
                >
                    {isCompleted ? (
                        <Check className="w-10 h-10 text-black" strokeWidth={5} />
                    ) : isLocked ? (
                        <Lock className="w-8 h-8 text-gray-400" strokeWidth={3} />
                    ) : (
                        <span className="text-3xl font-black text-black">{level.id}</span>
                    )}

                    {/* Topic Badge (Floating above) */}
                    {isActive && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-comic-sm">
                            {level.topic}
                        </div>
                    )}
                </div>

                {/* Stars Badge */}
                <div className={cn(
                    "absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-comic-sm z-20",
                    isCompleted ? "bg-cc-pink" : "bg-white"
                )}>
                    <Star className={cn("w-4 h-4", isCompleted ? "fill-black text-black" : "text-black/20")} strokeWidth={3} />
                </div>

                {isActive && (
                    <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-6 h-6 text-cc-yellow animate-pulse" />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default EpicLevelNode;
