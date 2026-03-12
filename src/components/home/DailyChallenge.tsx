import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Calendar, Share2, ChevronRight, Trophy, Lock, Zap, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTodaysDailyChallenge, DailyPuzzle } from '@/data/dailyChallenges';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import { usePremiumGate } from '@/hooks/usePremiumGate';

const DailyChallengeWidget: React.FC = () => {
    const navigate = useNavigate();
    const { isSubscribed } = usePremiumGate();
    const [challenge] = useState<DailyPuzzle>(getTodaysDailyChallenge);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        const solved = localStorage.getItem(`codio_daily_solved_${challenge.id}`);
        setIsSolved(!!solved);
    }, [challenge.id]);

    const difficultyColors: Record<string, string> = {
        easy: 'bg-pastel-mint text-black',
        medium: 'bg-pastel-yellow text-black',
        hard: 'bg-pastel-pink text-black',
    };

    const handleShare = () => {
        const text = `🔥 I ${isSolved ? 'solved' : "tried"} today's @CodioApp Daily: "${challenge.title}"! Can you beat it? 💻`;
        if (navigator.share) {
            navigator.share({ title: 'Codio Daily', text, url: 'https://codio.app/daily' });
        } else {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full"
        >
            <DrawnCard
                className="bg-black text-white p-0 overflow-hidden border-4 border-black shadow-[6px_6px_0_#222] relative cursor-pointer"
                onClick={() => navigate('/daily')}
            >
                {/* Animated gradient strip */}
                <div className="h-1.5 bg-gradient-to-r from-pastel-yellow via-pastel-pink to-pastel-mint animate-pulse" />

                <div className="p-5">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-pastel-yellow border-2 border-white/20 rounded-xl flex items-center justify-center rotate-3">
                                <Flame className="h-5 w-5 text-black" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">Today's Challenge</p>
                                <p className="text-sm font-black text-white uppercase leading-tight">Codio Daily</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isSolved && (
                                <div className="flex items-center gap-1 bg-pastel-mint/20 border border-pastel-mint/40 px-2 py-1 rounded-lg">
                                    <Check className="h-3 w-3 text-pastel-mint" strokeWidth={3} />
                                    <span className="text-[9px] font-black text-pastel-mint uppercase">Solved!</span>
                                </div>
                            )}
                            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg border ${challenge.difficulty === 'easy' ? 'bg-pastel-mint/20 text-pastel-mint border-pastel-mint/30' :
                                    challenge.difficulty === 'medium' ? 'bg-pastel-yellow/20 text-pastel-yellow border-pastel-yellow/30' :
                                        'bg-pastel-pink/20 text-pastel-pink border-pastel-pink/30'
                                }`}>
                                {challenge.difficulty}
                            </span>
                        </div>
                    </div>

                    {/* Challenge info */}
                    <h3 className="text-xl font-black text-white uppercase leading-tight mb-1">{challenge.title}</h3>
                    <p className="text-xs font-bold text-white/50 mb-4 leading-relaxed">{challenge.description}</p>

                    {/* Code preview */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4 font-mono">
                        <pre className="text-xs text-pastel-mint leading-tight overflow-hidden" style={{ maxHeight: '60px' }}>
                            {challenge.starterCode.split('\n').slice(0, 3).join('\n')}
                        </pre>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {challenge.concept}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={e => { e.stopPropagation(); handleShare(); }}
                                className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <Share2 className="h-4 w-4 text-white/60" />
                            </button>
                            <div className="flex items-center gap-1 bg-pastel-yellow text-black text-[10px] font-black px-3 py-1.5 rounded-xl">
                                {isSolved ? 'Review' : 'Solve Now'}
                                <ChevronRight className="h-3.5 w-3.5 ml-0.5" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </DrawnCard>
        </motion.div>
    );
};

export default DailyChallengeWidget;
