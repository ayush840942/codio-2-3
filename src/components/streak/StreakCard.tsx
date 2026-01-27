import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Calendar, Star, TrendingUp } from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';

const StreakCard = () => {
  const { rewards } = useRewards();

  const streakMilestones = [7, 14, 30, 60, 100];
  const nextMilestone = streakMilestones.find(milestone => milestone > rewards.loginStreak);

  return (
    <motion.div
      className="relative"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-3xl blur-xl transform translate-y-2 scale-95" />
      
      <Card className="relative w-full bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 border-orange-200/50 rounded-3xl overflow-hidden shadow-lg">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-400/10 rounded-full blur-2xl" />
        
        <CardContent className="relative p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Flame className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-orange-800">Learning Streak</h3>
                <p className="text-sm text-orange-600/80">Keep the fire burning!</p>
              </div>
            </div>
            <motion.div 
              className="text-3xl font-bold text-orange-600"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {rewards.loginStreak}
              <span className="text-lg ml-1">🔥</span>
            </motion.div>
          </div>

          {/* Progress to next milestone */}
          {nextMilestone && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-orange-700 mb-2">
                <span className="font-medium">Next: {nextMilestone} days</span>
                <span className="font-bold">{rewards.loginStreak}/{nextMilestone}</span>
              </div>
              <div className="w-full bg-orange-200/60 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-orange-400 via-amber-500 to-red-400 h-3 rounded-full relative"
                  style={{ width: `${(rewards.loginStreak / nextMilestone) * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(rewards.loginStreak / nextMilestone) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 text-center border border-orange-100"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="h-5 w-5 text-orange-500 mx-auto mb-1" />
              <div className="text-xs text-orange-600 font-medium">Days Active</div>
              <div className="text-lg font-bold text-orange-800">{rewards.loginStreak}</div>
            </motion.div>
            <motion.div 
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 text-center border border-orange-100"
              whileHover={{ scale: 1.02 }}
            >
              <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <div className="text-xs text-orange-600 font-medium">Bonus XP</div>
              <div className="text-lg font-bold text-orange-800">+{Math.min(rewards.loginStreak * 2, 50)}</div>
            </motion.div>
          </div>

          {/* Motivational message */}
          <motion.div 
            className="text-center text-sm text-orange-700 mt-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {rewards.loginStreak === 0 && "Start your learning journey today! 🚀"}
            {rewards.loginStreak > 0 && rewards.loginStreak < 7 && "Keep it up! You're building a great habit! 💪"}
            {rewards.loginStreak >= 7 && rewards.loginStreak < 30 && "Amazing streak! You're on fire! 🔥"}
            {rewards.loginStreak >= 30 && "Incredible dedication! You're a coding master! 🏆"}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StreakCard;
