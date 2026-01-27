
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Coins, Zap, Gift, Crown, Target } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  reward: {
    xp?: number;
    coins?: number;
    hints?: number;
    badge?: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface MilestoneModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
}

const MilestoneModal: React.FC<MilestoneModalProps> = ({ milestone, isOpen, onClose }) => {
  const [showRewards, setShowRewards] = useState(false);
  const { playSuccess, playLevelComplete } = useSoundEffects();

  useEffect(() => {
    if (isOpen && milestone) {
      playLevelComplete();
      const timer = setTimeout(() => setShowRewards(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, milestone, playLevelComplete]);

  if (!milestone) return null;

  const IconComponent = milestone.icon;
  
  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-yellow-600'
  };

  const rarityBorders = {
    common: 'border-gray-300',
    rare: 'border-blue-300',
    epic: 'border-purple-300',
    legendary: 'border-yellow-300'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 border-2 border-purple-200/50 p-0 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              initial={{
                opacity: 0,
                x: Math.random() * 400,
                y: Math.random() * 600,
                scale: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                y: -100,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
            />
          ))}
        </div>

        <div className="relative p-8 text-center">
          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`relative w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${rarityColors[milestone.rarity]} rounded-full flex items-center justify-center shadow-2xl ${rarityBorders[milestone.rarity]} border-4`}
          >
            <IconComponent className="w-12 h-12 text-white" />
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${rarityColors[milestone.rarity]} rounded-full blur-xl opacity-50 animate-pulse`} />
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Badge className={`mb-3 ${rarityColors[milestone.rarity]} border-0 text-white`}>
              {milestone.rarity.toUpperCase()}
            </Badge>
            <h2 className="text-2xl font-bold text-puzzle-gray mb-2">
              {milestone.title}
            </h2>
            <p className="text-puzzle-gray/70 mb-6">
              {milestone.description}
            </p>
          </motion.div>

          {/* Rewards */}
          <AnimatePresence>
            {showRewards && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-puzzle-gray">Rewards Earned:</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {milestone.reward.xp && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full"
                    >
                      <Zap className="w-4 h-4" />
                      +{milestone.reward.xp} XP
                    </motion.div>
                  )}
                  
                  {milestone.reward.coins && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full"
                    >
                      <Coins className="w-4 h-4" />
                      +{milestone.reward.coins} Coins
                    </motion.div>
                  )}
                  
                  {milestone.reward.hints && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-2 rounded-full"
                    >
                      <Gift className="w-4 h-4" />
                      +{milestone.reward.hints} Hints
                    </motion.div>
                  )}
                  
                  {milestone.reward.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full"
                    >
                      <Crown className="w-4 h-4" />
                      {milestone.reward.badge}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-puzzle-purple to-puzzle-blue text-white px-8 py-3 rounded-xl font-semibold"
            >
              Continue Coding!
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneModal;
