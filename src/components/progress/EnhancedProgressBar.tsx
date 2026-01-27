
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Target, Award } from 'lucide-react';

interface ProgressSegment {
  id: string;
  label: string;
  progress: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface EnhancedProgressBarProps {
  title: string;
  overallProgress: number;
  segments: ProgressSegment[];
  showMilestones?: boolean;
  className?: string;
}

const EnhancedProgressBar: React.FC<EnhancedProgressBarProps> = ({
  title,
  overallProgress,
  segments,
  showMilestones = true,
  className = ""
}) => {
  const milestones = [25, 50, 75, 100];

  return (
    <Card className={`p-6 bg-gradient-to-br from-white to-purple-50/30 border-2 border-purple-100 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-puzzle-gray">{title}</h3>
          <Badge className="bg-puzzle-purple text-white">
            {Math.round(overallProgress)}%
          </Badge>
        </div>

        {/* Main Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}% Complete</span>
          </div>
          
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-puzzle-blue via-puzzle-purple to-puzzle-pink rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Milestone markers */}
            {showMilestones && milestones.map((milestone) => (
              <div
                key={milestone}
                className="absolute top-0 h-full w-0.5 bg-white/50"
                style={{ left: `${milestone}%` }}
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border-2 border-purple-300 rounded-full shadow-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Segment Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-puzzle-gray flex items-center gap-2">
            <Target className="w-4 h-4" />
            Breakdown
          </h4>
          
          <div className="grid gap-3">
            {segments.map((segment) => {
              const IconComponent = segment.icon;
              return (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-8 h-8 rounded-lg ${segment.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{segment.label}</span>
                      <span className="text-gray-500">{Math.round(segment.progress)}%</span>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${segment.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${segment.progress}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Achievement Preview */}
        {overallProgress >= 75 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-600" />
              <div>
                <h5 className="font-semibold text-yellow-800">Almost There!</h5>
                <p className="text-sm text-yellow-700">
                  You're close to earning a mastery badge!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default EnhancedProgressBar;
