
import React from 'react';
import { motion } from 'framer-motion';
import RewardSystem from '@/components/reward/RewardSystem';

interface PuzzleRewardSectionProps {
  xp: number;
  coins: number;
  streak: number;
  level: number;
  badges: string[];
}

const PuzzleRewardSection: React.FC<PuzzleRewardSectionProps> = ({
  xp,
  coins,
  streak,
  level,
  badges
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <RewardSystem />
    </motion.div>
  );
};

export default PuzzleRewardSection;
