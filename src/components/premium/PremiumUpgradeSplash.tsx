import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Check, Sparkles, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PremiumUpgradeSplashProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const PremiumUpgradeSplash: React.FC<PremiumUpgradeSplashProps> = ({ isOpen, onClose, onUpgrade }) => {
    const navigate = useNavigate();

    const benefits = [
        { title: 'Unlimited Levels', desc: 'Access all 200+ coding challenges', icon: Sparkles },
        { title: 'No Advertisements', desc: 'Zero interruptions while learning', icon: X },
        { title: 'Priority Support', desc: 'Direct help from our expert team', icon: Crown },
        { title: 'Exclusive Content', desc: 'Access to Pro-only modules and projects', icon: Check },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header with Background Pattern */}
                        <div className="bg-gradient-to-br from-primary via-purple-600 to-indigo-700 p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h100v100H0z" fill="url(#pattern)" />
                                    <defs>
                                        <pattern id="pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1" fill="#fff" />
                                        </pattern>
                                    </defs>
                                </svg>
                            </div>

                            <motion.div
                                initial={{ rotate: -15, scale: 0.8 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: 'spring', damping: 10 }}
                                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mx-auto mb-4 flex items-center justify-center border border-white/30"
                            >
                                <Crown className="w-10 h-10 text-white" />
                            </motion.div>

                            <h2 className="text-2xl font-black text-white mb-2">Level 10 Complete!</h2>
                            <p className="text-white/80 font-medium">You've mastered the basics, now unlock the full power of CodeZen.</p>
                        </div>

                        {/* Benefits List */}
                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 w-6 h-6 rounded-full bg-lavender-100 flex items-center justify-center flex-shrink-0">
                                            <benefit.icon className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm leading-tight">{benefit.title}</h4>
                                            <p className="text-slate-500 text-xs">{benefit.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-2">
                                <Button
                                    onClick={() => {
                                        onUpgrade();
                                        navigate('/subscription');
                                    }}
                                    className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:bg-slate-800 group"
                                >
                                    <Sparkles className="w-5 h-5 mr-2 text-yellow-400 group-hover:animate-pulse" />
                                    Upgrade to Premium
                                    <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                </Button>

                                <button
                                    onClick={onClose}
                                    className="w-full py-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
                                >
                                    Not now, I'll explore more
                                </button>
                            </div>
                        </div>

                        {/* Bottom Accent */}
                        <div className="h-2 w-full bg-gradient-to-r from-primary to-purple-600" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PremiumUpgradeSplash;
