
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, Crown } from 'lucide-react';

interface DailyHintCompletionProps {
  freeHintDays: number;
  daysCompleted: number;
}

const DailyHintCompletion: React.FC<DailyHintCompletionProps> = ({
  freeHintDays,
  daysCompleted
}) => {
  return (
    <AnimatePresence>
      {freeHintDays <= 0 && daysCompleted >= 30 && (
        <motion.div
          className="mt-6 p-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl border-2 border-amber-200 shadow-xl"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center">
            <motion.div
              className="relative w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Trophy className="h-12 w-12 text-white" />
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              🎉 Challenge Mastered!
            </motion.h3>

            <motion.p
              className="text-lg text-amber-700 mb-6 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Amazing! You've completed the 30-day hint challenge with dedication.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl border border-amber-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Crown className="h-5 w-5 text-amber-600" />
              <span className="font-bold text-amber-700">Master Achievement Unlocked</span>
              <Sparkles className="h-5 w-5 text-amber-600" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DailyHintCompletion;
