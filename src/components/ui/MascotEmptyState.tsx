import React from 'react';
import { motion } from 'framer-motion';
import { DrawnCard } from './HandDrawnComponents';
import { Sparkles } from 'lucide-react';
import ComicMascot from './ComicMascot';

interface MascotEmptyStateProps {
    title: string;
    description: string;
    action?: React.ReactNode;
}

export const MascotEmptyState: React.FC<MascotEmptyStateProps> = ({
    title,
    description,
    action
}) => {
    return (
        <DrawnCard className="bg-white p-8 text-center flex flex-col items-center justify-center min-h-[300px] border-4 border-black shadow-comic font-draw">
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative mb-6"
            >
                <div className="absolute inset-0 bg-cc-blue/20 blur-2xl rounded-full" />
                <ComicMascot
                    pose="thinking"
                    size="md"
                    className="w-32 h-32 rounded-[2rem] border-4 border-black bg-white shadow-comic-sm opacity-80 grayscale"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                >
                    <Sparkles className="w-8 h-8 text-cc-yellow fill-cc-yellow" />
                </motion.div>
            </motion.div>

            <h3 className="text-2xl font-black text-black uppercase tracking-tight italic mb-2">
                {title}
            </h3>
            <p className="text-lg font-bold text-black/50 mb-6 max-w-xs leading-tight">
                {description}
            </p>

            {action && (
                <div className="relative z-10">
                    {action}
                </div>
            )}
        </DrawnCard>
    );
};
