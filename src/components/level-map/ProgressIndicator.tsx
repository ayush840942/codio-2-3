
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface ProgressIndicatorProps {
  totalCompleted: number;
  totalLevels: number;
  overallProgress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  totalCompleted,
  totalLevels,
  overallProgress
}) => {
  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-puzzle-purple/20 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-5 w-5 text-puzzle-yellow" />
          <span className="text-sm font-medium text-puzzle-gray">Learning Progress</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-puzzle-purple">{totalCompleted}/{totalLevels}</div>
          <div className="text-xs text-puzzle-gray/70">{Math.round(overallProgress)}% Complete</div>
        </div>
      </div>
      <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-puzzle-purple via-puzzle-blue to-puzzle-green rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
