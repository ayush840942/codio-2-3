import React from 'react';
import { motion } from 'framer-motion';
import { Zap, X, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTrialStatus } from '@/hooks/usePremiumGate';
import { useAuth } from '@/context/AuthContext';

const TrialBanner: React.FC = () => {
    const navigate = useNavigate();
    const { isSubscribed, subscriptionTier } = useAuth();
    const { isTrialActive, daysRemaining } = useTrialStatus();

    // Don't show if fully subscribed
    if (isSubscribed && subscriptionTier !== 'trial') return null;
    // Don't show if trial is not active
    if (!isTrialActive) return null;

    const isUrgent = daysRemaining <= 2;

    return (
        <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className={`w-full ${isUrgent ? 'bg-pastel-pink' : 'bg-pastel-yellow'} border-b-2 border-black px-4 py-2 flex items-center justify-between font-draw z-50`}
        >
            <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-black" strokeWidth={3} />
                <span className="text-xs font-black text-black uppercase tracking-tight">
                    {isUrgent
                        ? `⚠️ Trial Ending! ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`
                        : `⚡ Trial: ${daysRemaining} days remaining`}
                </span>
            </div>
            <button
                onClick={() => navigate('/subscription')}
                className="flex items-center gap-1.5 bg-black text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-xl shadow-[2px_2px_0_#555] active:shadow-none transition-all"
            >
                <Crown className="h-3 w-3" />
                Upgrade Now
            </button>
        </motion.div>
    );
};

export default TrialBanner;
