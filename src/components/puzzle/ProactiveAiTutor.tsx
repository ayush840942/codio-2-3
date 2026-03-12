import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComicMascot from '@/components/ui/ComicMascot';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { Lightbulb, X } from 'lucide-react';

interface ProactiveAiTutorProps {
    attempts: number;
    feedback: 'correct' | 'incorrect' | null;
    puzzle: any;
    onShowHint: () => void;
    showHint: boolean;
}

const ProactiveAiTutor: React.FC<ProactiveAiTutorProps> = ({
    attempts,
    feedback,
    puzzle,
    onShowHint,
    showHint
}) => {
    // Only show if user has struggled (2+ attempts and currently failing)
    const shouldShow = attempts >= 2 && feedback === 'incorrect' && !showHint;

    const getContextualHint = () => {
        if (!puzzle) return "Let's think step by step!";

        // Simple contextual logic based on topics if we had more metadata
        // For now, use the primary hint from the puzzle
        return puzzle.hints?.[0] || puzzle.hint || "Keep trying! Coding is all about patterns.";
    };

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.8 }}
                    className="fixed bottom-32 right-4 z-50 flex flex-col items-end pointer-events-none"
                    style={{ maxWidth: '280px' }}
                >
                    {/* Speech Bubble */}
                    <div className="pointer-events-auto">
                        <DrawnCard className="bg-cc-yellow border-3 border-black p-4 mb-4 relative shadow-comic-lg">
                            {/* Speech bubble tail */}
                            <div className="absolute -bottom-3 right-8 w-6 h-6 bg-cc-yellow border-r-3 border-b-3 border-black rotate-45" />

                            <div className="relative">
                                <h4 className="text-sm font-black uppercase mb-1 flex items-center gap-1">
                                    <Lightbulb className="w-4 h-4" /> Codio's Tip:
                                </h4>
                                <p className="text-sm font-bold text-black/80 leading-snug italic">
                                    "{getContextualHint()}"
                                </p>

                                <DrawnButton
                                    onClick={onShowHint}
                                    className="mt-3 w-full py-1 text-xs bg-white border-2 border-black"
                                >
                                    TELL ME MORE!
                                </DrawnButton>
                            </div>
                        </DrawnCard>
                    </div>

                    {/* Mascot */}
                    <div className="pointer-events-auto flex items-center gap-2">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ComicMascot pose="thinking" size="lg" className="drop-shadow-sticker" />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProactiveAiTutor;
