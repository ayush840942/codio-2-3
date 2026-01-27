
import React from 'react';
import { Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyHintHeaderProps {
  hintPoints: number;
  freeHintDays: number;
}

const DailyHintHeader: React.FC<DailyHintHeaderProps> = ({ hintPoints, freeHintDays }) => {
  return (
    <div className="text-center mb-6">
      <motion.div 
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Daily Hints
          </h2>
          <p className="text-slate-500 font-medium text-sm">{freeHintDays} days remaining</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200 shadow-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-violet-400 to-purple-400 rounded-xl flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="text-left">
          <div className="text-2xl font-bold text-slate-800">{hintPoints}</div>
          <div className="text-sm text-slate-600 font-medium">hints available</div>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyHintHeader;
