
import React from 'react';
import { Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyHintProgressProps {
  daysCompleted: number;
  freeHintDays: number;
  progressPercentage: number;
}

const DailyHintProgress: React.FC<DailyHintProgressProps> = ({
  daysCompleted,
  freeHintDays,
  progressPercentage
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">Day {daysCompleted}</div>
            <div className="text-sm text-slate-500">of 20 completed</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
          <Target className="h-4 w-4 text-emerald-600" />
          <span className="font-bold text-emerald-700 text-sm">{freeHintDays} days left</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 h-full rounded-full shadow-inner"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <div className="absolute -top-2 left-0 w-full flex justify-between">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className={`w-6 h-6 rounded-full border-4 shadow-sm ${
                i * 25 <= progressPercentage 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 border-white' 
                  : 'bg-white border-slate-300'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyHintProgress;
