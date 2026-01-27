
import React from 'react';
import { Check, Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyHintGridProps {
  daysCompleted: number;
  freeHintDays: number;
}

const DailyHintGrid: React.FC<DailyHintGridProps> = ({ daysCompleted, freeHintDays }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-amber-500" />
        Progress Timeline
      </h3>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
        {days.map((day) => {
          const isCompleted = day <= daysCompleted;
          const isCurrent = day === daysCompleted + 1;

          return (
            <motion.div
              key={day}
              className={`
                relative aspect-square rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm
                ${isCompleted
                  ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg'
                  : isCurrent
                    ? 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 border-2 border-amber-300 shadow-md'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: day * 0.02, duration: 0.3 }}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : day > daysCompleted + 1 ? (
                <Lock className="h-3 w-3" />
              ) : (
                day
              )}

              {isCurrent && (
                <motion.div
                  className="absolute -inset-1 rounded-2xl border-2 border-amber-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyHintGrid;
