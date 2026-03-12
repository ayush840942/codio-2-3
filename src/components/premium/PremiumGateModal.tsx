import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X, Zap, Check, Star, Shield, Sparkles, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    lockedFeature?: string;
    lockedLevel?: number;
    trigger?: 'level' | 'hints' | 'feature' | 'streak';
}

const PremiumGateModal: React.FC<PremiumGateModalProps> = ({
    isOpen,
    onClose,
    lockedFeature,
    lockedLevel,
    trigger = 'level',
}) => {
    const navigate = useNavigate();

    const configs = {
        level: {
            emoji: '🔒',
            headline: `Level ${lockedLevel ?? '?'} is Premium`,
            subtext: `You've reached the free limit! Unlock all 200 levels and never stop learning.`,
            highlight: 'bg-pastel-lavender',
            perks: ['All 200 Levels Unlocked', 'Unlimited AI Hints', 'No Ads — Ever', 'Streak Shield Protection'],
        },
        hints: {
            emoji: '🤖',
            headline: "AI Hints Used Up!",
            subtext: `You've used all 3 free AI hints for today. Go Pro for unlimited hints — never get stuck.`,
            highlight: 'bg-pastel-mint',
            perks: ['Unlimited AI Hints Daily', 'All 200 Levels', 'Streak Shield', 'Ad-Free Experience'],
        },
        feature: {
            emoji: '✨',
            headline: `${lockedFeature ?? 'Feature'} is Premium`,
            subtext: `This feature is available to Pro and Elite subscribers. Unlock everything today.`,
            highlight: 'bg-pastel-blue',
            perks: ['Playground & Code Builder', 'Memos & Notes', 'Code Battles', 'Real-time Leaderboard'],
        },
        streak: {
            emoji: '🔥',
            headline: "Protect Your Streak!",
            subtext: `Don't let your hard work disappear. Streak Shield is included with every paid plan.`,
            highlight: 'bg-pastel-pink',
            perks: ['Streak Shield (Never Lose Progress)', 'Unlimited Hearts', 'All Levels', 'Priority Support'],
        },
    };

    const config = configs[trigger];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                        onClick={e => e.stopPropagation()}
                        className="w-full max-w-sm bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_#000] overflow-hidden font-draw"
                    >
                        {/* Coloured header */}
                        <div className={`${config.highlight} border-b-4 border-black p-6 relative`}>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-9 h-9 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_#000] active:shadow-none active:translate-y-0.5"
                            >
                                <X className="h-4 w-4 text-black" strokeWidth={3} />
                            </button>
                            <div className="text-5xl mb-3">{config.emoji}</div>
                            <h2 className="text-2xl font-black text-black leading-tight uppercase">{config.headline}</h2>
                            <p className="text-sm font-bold text-black/70 mt-1">{config.subtext}</p>
                        </div>

                        {/* Perks */}
                        <div className="p-5 space-y-2.5">
                            {config.perks.map((perk, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-pastel-mint border-2 border-black rounded-lg flex items-center justify-center shrink-0">
                                        <Check className="h-3.5 w-3.5 text-black" strokeWidth={4} />
                                    </div>
                                    <span className="text-sm font-black text-black uppercase tracking-tight">{perk}</span>
                                </div>
                            ))}

                            {/* Price anchor */}
                            <div className="mt-4 p-3 bg-pastel-yellow border-2 border-black rounded-2xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black text-black/50 uppercase">Pro Monthly</p>
                                    <p className="text-xl font-black text-black">$19<span className="text-sm font-bold text-black/50">/mo</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-black/50 uppercase">Elite Yearly</p>
                                    <p className="text-sm font-black text-black">$149 <span className="line-through text-black/40 text-xs">$228</span></p>
                                    <p className="text-xs font-black text-green-700">SAVE 35%</p>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="px-5 pb-6 space-y-3">
                            {/* Primary: free trial */}
                            <button
                                onClick={() => { navigate('/subscription'); onClose(); }}
                                className="w-full h-14 bg-black text-white font-black text-lg uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0_#555] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <Sparkles className="h-5 w-5" />
                                Start 7-Day Free Trial
                            </button>
                            {/* Secondary */}
                            <button
                                onClick={() => { navigate('/subscription'); onClose(); }}
                                className="w-full h-11 bg-white text-black font-black text-sm uppercase rounded-2xl border-2 border-black active:bg-gray-50 transition-colors"
                            >
                                See All Plans →
                            </button>
                            <p className="text-center text-[10px] text-black/40 font-bold uppercase tracking-widest">No credit card required for trial</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PremiumGateModal;
