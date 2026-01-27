
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame,
  Star,
  Lightbulb,
  Zap,
  Trophy
} from 'lucide-react';

interface RewardAnimationProps {
  showRewardAnimation: boolean;
  rewardType: 'xp' | 'coin' | 'hint' | 'streak' | 'badge' | null;
  rewardAmount: number;
  badgeName: string;
}

const RewardAnimation: React.FC<RewardAnimationProps> = ({
  showRewardAnimation,
  rewardType,
  rewardAmount,
  badgeName
}) => {
  const getRewardIcon = (type: 'xp' | 'coin' | 'hint' | 'streak' | 'badge') => {
    switch (type) {
      case 'xp':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'coin':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'hint':
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      case 'streak':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'badge':
        return <Trophy className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {showRewardAnimation && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 z-50 border border-green-200/50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full p-3 bg-green-100">
              {getRewardIcon(rewardType!)}
            </div>
            {rewardType === 'badge' ? (
              <>
                <h3 className="text-2xl font-bold text-green-800">New Badge Earned!</h3>
                <p className="text-gray-700">Congratulations! You've earned the <span className="font-semibold">{badgeName}</span> badge!</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-green-800">Reward Gained!</h3>
                <p className="text-gray-700">You've gained <span className="font-semibold">{rewardAmount} {rewardType}</span>!</p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardAnimation;
