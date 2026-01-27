
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Clock, Star, Crown } from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const DailyRewardSection = () => {
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
      console.log('Attempting to claim daily reward...');
      const success = await claimDailyReward();
      console.log('Claim result:', success);
      
      if (success) {
        toast.success("🎉 Daily reward claimed!", {
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
      console.error('Error claiming daily reward:', error);
      toast.error("Failed to claim daily reward", {
        description: "Please try again later"
      });
    }
  };

  const canClaim = canClaimDaily && rewards.freeHintDays > 0;

  return (
    <motion.div 
      className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-white/60 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Crown className="h-8 w-8 text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-2xl text-slate-800">Daily Rewards</h3>
                <div className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-200">
                  <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Premium</span>
                </div>
              </div>
              <p className="text-slate-600 mb-4 font-medium leading-relaxed">
                Claim your daily hints and maintain your learning streak for consistent progress.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    {rewards.hintPoints} hints
                  </span>
                </div>
                {rewards.freeHintDays > 0 && (
                  <div className="px-4 py-2 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
                    <span className="font-bold text-violet-700 text-sm">
                      {rewards.freeHintDays} days remaining
                    </span>
                  </div>
                )}
                {timeRemaining && !canClaim && (
                  <div className="px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                    <span className="font-bold text-orange-700 text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4" />
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
                h-16 px-8 rounded-3xl font-bold text-lg transition-all duration-300 border-0 shadow-lg
                ${canClaim
                  ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ${
                  canClaim ? 'bg-white/20' : 'bg-slate-300'
                }`}>
                  <Gift className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div>{canClaim ? "Claim 5 Hints" : 
                    rewards.freeHintDays <= 0 ? "Period Complete" : "Claimed Today"}</div>
                  {canClaim && (
                    <div className="text-xs opacity-90">Daily reward</div>
                  )}
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyRewardSection;
