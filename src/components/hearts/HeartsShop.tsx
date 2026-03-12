import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useHearts } from '@/context/HeartsContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { HEARTS_CONFIG } from '@/data/heartsData';

interface HeartsShopProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HeartsShop: React.FC<HeartsShopProps> = ({ isOpen, onClose }) => {
    const { hearts, maxHearts, purchaseHeart, timeUntilNextHeart } = useHearts();
    const { gameState, updateXP } = useGame();
    const { rewards } = useRewards();
    const [purchasing, setPurchasing] = useState(false);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const handlePurchase = async () => {
        setPurchasing(true);

        const result = purchaseHeart(rewards?.xp || 0);

        if (result.success) {
            updateXP(result.newXP);
            // Close after short delay to show success
            setTimeout(() => {
                onClose();
                setPurchasing(false);
            }, 500);
        } else {
            setPurchasing(false);
        }
    };

    const canAfford = (rewards?.xp || 0) >= HEARTS_CONFIG.XP_COST_PER_HEART;
    const isFull = hearts >= maxHearts;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm"
                    >
                        <Card className="border-study bg-white rounded-[2.5rem] shadow-studypal overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-black text-slate-900">Get Hearts</h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={onClose}
                                        className="rounded-full w-10 h-10"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Hearts Status */}
                                <div className="flex justify-center gap-2 mb-6">
                                    {Array.from({ length: maxHearts }).map((_, index) => (
                                        <Heart
                                            key={index}
                                            className={`w-12 h-12 ${index < hearts
                                                ? 'fill-red-500 text-red-500'
                                                : 'fill-slate-200 text-slate-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Refill Timer */}
                                {hearts < maxHearts && timeUntilNextHeart > 0 && (
                                    <div className="bg-pastel-blue p-4 rounded-[1.5rem] border-study mb-6 text-center">
                                        <p className="text-sm font-bold text-slate-700 mb-1">Next heart in</p>
                                        <p className="text-2xl font-black text-slate-900">{formatTime(timeUntilNextHeart)}</p>
                                    </div>
                                )}

                                {/* Purchase Option */}
                                <div className="space-y-4">
                                    <Card className={`border-study rounded-[2rem] ${isFull ? 'opacity-50' : ''}`}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center border-study">
                                                        <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900">1 Heart</p>
                                                        <p className="text-xs font-bold text-slate-600">Instant refill</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-pastel-yellow px-3 py-2 rounded-full border-study">
                                                    <Zap className="w-4 h-4 text-slate-800" />
                                                    <span className="font-black text-slate-900">{HEARTS_CONFIG.XP_COST_PER_HEART}</span>
                                                </div>
                                            </div>

                                            <Button
                                                onClick={handlePurchase}
                                                disabled={!canAfford || isFull || purchasing}
                                                className="w-full h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800 font-black border-study shadow-sm disabled:opacity-50"
                                            >
                                                {purchasing ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : isFull ? (
                                                    'Hearts Full'
                                                ) : !canAfford ? (
                                                    'Not Enough XP'
                                                ) : (
                                                    'Purchase'
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* XP Balance */}
                                    <div className="flex items-center justify-between px-4">
                                        <span className="text-sm font-bold text-slate-600">Your XP</span>
                                        <div className="flex items-center gap-1.5">
                                            <Zap className="w-4 h-4 text-slate-800" />
                                            <span className="font-black text-slate-900">{rewards?.xp || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
