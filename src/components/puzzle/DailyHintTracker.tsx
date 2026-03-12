
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRewards } from '@/context/RewardsContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import DailyHintHeader from './daily-hint-tracker/DailyHintHeader';
import DailyHintProgress from './daily-hint-tracker/DailyHintProgress';
import DailyHintGrid from './daily-hint-tracker/DailyHintGrid';
import DailyHintActions from './daily-hint-tracker/DailyHintActions';
import DailyHintCompletion from './daily-hint-tracker/DailyHintCompletion';

const DailyHintTracker: React.FC = () => {
  const {
    rewards,
    canClaimDaily,
    claimDailyReward
  } = useRewards();
  const [timeRemaining, setTimeRemaining] = useState('');

  // Calculate time remaining for next claim
  const getTimeUntilNextClaim = () => {
    if (!rewards.lastClaimDate || canClaimDaily()) return '';
    const lastClaim = new Date(rewards.lastClaimDate + 'T00:00:00');
    const nextClaim = new Date(lastClaim.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    if (now >= nextClaim) return '';
    const diff = nextClaim.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(diff % (1000 * 60) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeUntilNextClaim());
    }, 1000);
    return () => clearInterval(timer);
  }, [rewards.lastClaimDate, canClaimDaily]);

  const daysCompleted = Math.max(0, 30 - rewards.freeHintDays);
  const progressPercentage = daysCompleted / 30 * 100;

  const handleClaim = async () => {
    try {
      console.log('Claiming daily reward from tracker...');
      const success = await claimDailyReward();
      console.log('Claim result:', success);

      if (success) {
        toast.success("🎉 Daily reward claimed!", {
          description: "You received 5 hint points!"
        });
      } else {
        if (rewards.freeHintDays <= 0) {
          toast.error("Free hint period ended", {
            description: "Your 30-day free hint period has ended"
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

  const canClaim = canClaimDaily() && rewards.freeHintDays > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/95 border-2 border-violet-100 shadow-2xl overflow-hidden rounded-3xl">
        <CardContent className="p-0">
          <DailyHintHeader
            freeHintDays={rewards.freeHintDays}
            hintPoints={rewards.hintPoints}
          />

          <div className="p-8 space-y-8">
            <DailyHintProgress
              daysCompleted={daysCompleted}
              progressPercentage={progressPercentage}
              freeHintDays={rewards.freeHintDays}
            />

            <DailyHintGrid
              daysCompleted={daysCompleted}
              freeHintDays={rewards.freeHintDays}
            />

            {rewards.freeHintDays > 0 ? (
              <DailyHintActions
                canClaim={canClaim}
                freeHintDays={rewards.freeHintDays}
                timeRemaining={timeRemaining}
                canClaimDaily={canClaimDaily()}
                onClaim={handleClaim}
              />
            ) : (
              <DailyHintCompletion
                freeHintDays={rewards.freeHintDays}
                daysCompleted={daysCompleted}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailyHintTracker;
