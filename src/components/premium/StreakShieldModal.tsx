import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Shield, X, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StreakShieldModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStreak: number;
}

const StreakShieldModal: React.FC<StreakShieldModalProps> = ({
    isOpen,
    onClose,
    currentStreak,
}) => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                        onClick={e => e.stopPropagation()}
                        className="w-full max-w-sm bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0_#000] overflow-hidden font-draw"
                    >
                        {/* Header */}
                        <div className="bg-pastel-pink border-b-4 border-black p-6 relative text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-9 h-9 bg-white border-2 border-black rounded-full flex items-center justify-center"
                            >
                                <X className="h-4 w-4 text-black" strokeWidth={3} />
                            </button>
                            <div className="text-6xl mb-2">😱</div>
                            <h2 className="text-2xl font-black text-black uppercase">Don't Lose Your Streak!</h2>
                            <div className="flex items-center justify-center gap-2 mt-3">
                                <Flame className="h-8 w-8 text-orange-500" strokeWidth={2.5} />
                                <span className="text-5xl font-black text-black">{currentStreak}</span>
                                <Flame className="h-8 w-8 text-orange-500" strokeWidth={2.5} />
                            </div>
                            <p className="text-sm font-bold text-black/60 mt-2">
                                You have built a <strong>{currentStreak}-day streak</strong>. That's amazing!<br />
                                Free users can't use Streak Shield — don't risk losing it.
                            </p>
                        </div>

                        {/* Shield feature */}
                        <div className="p-5">
                            <div className="flex items-center gap-3 p-4 bg-pastel-mint border-2 border-black rounded-2xl mb-4">
                                <Shield className="h-10 w-10 text-black shrink-0" strokeWidth={2.5} />
                                <div>
                                    <p className="text-sm font-black text-black uppercase">Streak Shield</p>
                                    <p className="text-xs font-bold text-black/60 leading-tight">
                                        Miss a day? No problem. Shield automatically protects your streak once per week — included in every paid plan.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                {[
                                    'Streak Shield (1× weekly protection)',
                                    'Unlimited Hearts — Never Blocked',
                                    'All 200 Levels Unlocked',
                                    'Unlimited AI Hints',
                                ].map((perk, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm font-black text-black/80">
                                        <span className="text-pastel-mint font-black">✓</span>
                                        <span className="uppercase text-xs">{perk}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => { navigate('/subscription'); onClose(); }}
                                className="w-full h-14 bg-black text-white font-black text-base uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0_#444] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <Crown className="h-5 w-5" />
                                Protect My Streak — $19/mo
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full mt-2 text-xs font-bold text-black/40 uppercase py-2"
                            >
                                Risk it — Continue Free
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StreakShieldModal;
