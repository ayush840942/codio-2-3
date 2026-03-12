import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ChevronRight, Building2, Clock, Zap, Check } from 'lucide-react';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import { InterviewQuestion } from '@/data/interviewQuestions';
import { usePremiumGate } from '@/hooks/usePremiumGate';

interface InterviewPrepCardProps {
    question: InterviewQuestion;
    index: number;
    onSelect: (q: InterviewQuestion) => void;
    isSolved: boolean;
}

const difficultyConfig = {
    easy: { label: 'Easy', classes: 'bg-pastel-mint text-black border-black' },
    medium: { label: 'Medium', classes: 'bg-pastel-yellow text-black border-black' },
    hard: { label: 'Hard', classes: 'bg-pastel-pink text-black border-black' },
};

const categoryEmoji: Record<string, string> = {
    Arrays: '🗂️', Strings: '📝', Trees: '🌳',
    'Dynamic Programming': '⚡', 'System Design': '🏗️', Sorting: '📊',
};

const InterviewPrepCard: React.FC<InterviewPrepCardProps> = ({ question, index, onSelect, isSolved }) => {
    const { isSubscribed } = usePremiumGate();
    const isLocked = question.isPremium && !isSubscribed;
    const dc = difficultyConfig[question.difficulty];

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <DrawnCard
                className={`p-4 cursor-pointer transition-all hover:shadow-comic active:scale-[0.98] relative overflow-hidden ${isLocked ? 'opacity-70' : 'bg-white'}`}
                onClick={() => onSelect(question)}
            >
                {/* Solved indicator */}
                {isSolved && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-pastel-mint border-2 border-black rounded-xl flex items-center justify-center">
                        <Check className="h-4 w-4 text-black" strokeWidth={3} />
                    </div>
                )}

                {/* Lock overlay */}
                {isLocked && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-end pr-4">
                        <div className="flex items-center gap-1.5 bg-black text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-xl">
                            <Lock className="h-3 w-3" strokeWidth={3} />
                            PREMIUM
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-4">
                    {/* Category icon */}
                    <div className="w-12 h-12 bg-black/5 border-2 border-black rounded-2xl flex items-center justify-center text-2xl shrink-0">
                        {categoryEmoji[question.category] || '💡'}
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h4 className="text-base font-black text-black uppercase leading-tight">{question.title}</h4>
                            <span className={`shrink-0 text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border-2 ${dc.classes}`}>
                                {dc.label}
                            </span>
                        </div>

                        <p className="text-[10px] font-bold text-black/50 leading-tight mb-2 line-clamp-2">{question.description}</p>

                        {/* Meta row */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[9px] font-black text-black/40 uppercase flex items-center gap-1">
                                <Zap className="h-3 w-3" />{question.category}
                            </span>
                            <span className="text-[9px] font-black text-black/40 uppercase flex items-center gap-1">
                                <Clock className="h-3 w-3" />{question.timeComplexity}
                            </span>
                            {question.companies.slice(0, 2).map(c => (
                                <span key={c} className="text-[9px] font-black text-black/40 uppercase bg-black/5 px-1.5 py-0.5 rounded-lg flex items-center gap-1">
                                    <Building2 className="h-2.5 w-2.5" />{c}
                                </span>
                            ))}
                        </div>
                    </div>

                    <ChevronRight className="h-5 w-5 text-black/30 shrink-0 self-center" strokeWidth={2.5} />
                </div>
            </DrawnCard>
        </motion.div>
    );
};

export default InterviewPrepCard;
