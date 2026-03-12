
import React, { useState, useEffect } from 'react';
import { Gift, Clock, Star, Crown, Sparkles } from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';

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
      const success = await claimDailyReward();
      if (success) {
        toast.success("HURRAY! 🎉", {
          description: "Mascot found 5 hint points for you!"
        });
      }
    } catch (error) {
      toast.error("Oops! Try again later.");
    }
  };

  const canClaim = canClaimDaily() && rewards.freeHintDays > 0;

  return (
    <DrawnCard className="bg-white p-6 sm:p-8 overflow-hidden relative font-draw">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cc-yellow/20 rounded-full -mr-16 -mt-16" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
        {/* Gift Icon Section */}
        <div className="relative">
          <div className={`w-32 h-32 rounded-3xl border-4 border-black bg-cc-yellow flex items-center justify-center shadow-comic-sm ${!canClaim ? 'grayscale opacity-50' : ''}`}>
            <Gift className="w-16 h-16 text-black" strokeWidth={2.5} />
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border-2 border-white shadow-comic-sm whitespace-nowrap">
            {canClaim ? "GIFT FOR YOU!" : "RESTING..."}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 text-center sm:text-left space-y-4">
          <div>
            <h3 className="text-3xl font-black text-black uppercase tracking-tight italic flex items-center justify-center sm:justify-start gap-2">
              DAILY GIFTS <Gift className="w-6 h-6" />
            </h3>
            <p className="text-lg font-bold text-black/60 leading-tight">
              {canClaim
                ? "You've unlocked a daily surprise!"
                : "Check back soon for more goodies."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <div className="bg-cc-yellow border-3 border-black px-4 py-1 rounded-xl shadow-comic-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-black fill-black" />
              <span className="font-black text-sm uppercase tracking-tighter">
                {rewards.hintPoints} HINTS
              </span>
            </div>

            <AnimatePresence>
              {timeRemaining && !canClaim && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cc-blue border-3 border-black px-4 py-1 rounded-xl shadow-comic-sm flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-black" />
                  <span className="font-black text-sm tracking-tighter uppercase whitespace-nowrap">{timeRemaining}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DrawnButton
            onClick={handleClaimReward}
            disabled={!canClaim}
            variant={canClaim ? 'accent' : 'outlined'}
            className={`w-full h-16 text-2xl transition-all ${!canClaim ? 'bg-black/5 opacity-50 shadow-none hover:shadow-none' : 'bg-cc-green shadow-comic'}`}
          >
            {canClaim ? "GRAB 5 HINTS!" : "CLAIMED"}
          </DrawnButton>
        </div>
      </div>
    </DrawnCard>
  );
};

export default DailyRewardModalSection;
