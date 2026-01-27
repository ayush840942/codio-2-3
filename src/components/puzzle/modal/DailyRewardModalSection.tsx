
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Clock, Star, Crown } from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const DailyRewardModalSection = () => {
  const { canClaimDaily, claimDailyReward, rewards } = useRewards();
  const [timeRemaining, setTimeRemaining] = useState('');

  const getTimeUntilNextClaim = () => {
    if (!rewards.lastClaimDate || canClaimDaily) return '';
    
    const lastClaim = new Date(rewards.lastClaimDate + 'T00:00:00');
    const nextClaim = new Date(lastClaim.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    
    if (now >= nextClaim) return '';
    
    const diff = nextClaim.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeUntilNextClaim());
    }, 1000);

    return () => clearInterval(timer);
  }, [rewards.lastClaimDate, canClaimDaily]);

  const handleClaimReward = async () => {
    try {
      console.log('Claiming daily reward from modal...');
      const success = await claimDailyReward();
      console.log('Modal claim result:', success);
      
      if (success) {
        toast.success("Daily reward claimed! 🎉", {
          description: "You received 5 hint points!"
        });
      } else {
        if (rewards.freeHintDays <= 0) {
          toast.error("Free hint period ended", {
            description: "Your 20-day free hint period has ended"
          });
        } else {
          toast.error("Already claimed today!", {
            description: "Come back tomorrow for your next reward"
          });
        }
      }
    } catch (error) {
      console.error('Error claiming daily reward in modal:', error);
      toast.error("Failed to claim daily reward", {
        description: "Please try again later"
      });
    }
  };

  const canClaim = canClaimDaily && rewards.freeHintDays > 0;

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Elegant background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-white/60 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-2">
                Daily Rewards
                <div className="px-2 py-1 bg-slate-100 rounded-lg">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Premium</span>
                </div>
              </h3>
              <p className="text-slate-600 mb-3 font-medium">
                Claim 5 hint points daily and build your learning streak
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                  <span className="font-bold text-slate-700 text-sm flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500" />
                    {rewards.hintPoints} hints
                  </span>
                </div>
                {rewards.freeHintDays > 0 && (
                  <div className="px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                    <span className="font-bold text-slate-700 text-sm">
                      {rewards.freeHintDays} days left
                    </span>
                  </div>
                )}
                {timeRemaining && !canClaim && (
                  <div className="px-3 py-1 bg-orange-100 rounded-full border border-orange-200">
                    <span className="font-bold text-orange-700 text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeRemaining}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Button
              onClick={handleClaimReward} 
              disabled={!canClaim}
              size="lg"
              className={`
                h-14 px-6 rounded-2xl font-bold transition-all duration-300 border-0 shadow-lg
                ${canClaim 
                  ? "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white hover:shadow-xl" 
                  : "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  canClaim ? 'bg-white/20' : 'bg-slate-300'
                }`}>
                  <Gift className="h-3 w-3" />
                </div>
                <span>
                  {canClaim 
                    ? "Claim 5 Hints" 
                    : rewards.freeHintDays <= 0 
                      ? "Period Complete"
                      : "Claimed Today"
                  }
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyRewardModalSection;
