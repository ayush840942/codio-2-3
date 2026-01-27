
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Lock, Play, Award, Star } from 'lucide-react';
import { LanguageMastery } from '@/types/mastery';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LanguageMasteryCardProps {
  mastery: LanguageMastery;
  onStartTest: (language: string) => void;
  onViewCertificate: (language: string) => void;
  index: number;
}

const LanguageMasteryCard: React.FC<LanguageMasteryCardProps> = ({
  mastery,
  onStartTest,
  onViewCertificate,
  index
}) => {
  const {
    language,
    totalLevels,
    completedLevels,
    masteryPercent,
    isMastered,
    testPassed,
    testScore,
    testAttempts,
    icon,
    color,
    description
  } = mastery;

  const isTestAvailable = isMastered && !testPassed;
  const showCertificate = testPassed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 transition-all duration-300",
        "bg-card border border-border hover:border-primary/30",
        testPassed && "ring-2 ring-primary/20"
      )}
    >
      {/* Background gradient for mastered languages */}
      {testPassed && (
        <div className={cn(
          "absolute inset-0 opacity-10 bg-gradient-to-br",
          color
        )} />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
              "bg-gradient-to-br",
              color
            )}>
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-foreground flex items-center gap-2">
                {language}
                {testPassed && (
                  <Award className="w-4 h-4 text-primary" />
                )}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {description}
              </p>
            </div>
          </div>

          {/* Status badge */}
          {testPassed ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
              <CheckCircle className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">Certified</span>
            </div>
          ) : isMastered ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 rounded-full">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span className="text-xs font-medium text-amber-500">Ready</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
              <Lock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Learning</span>
            </div>
          )}
        </div>

        {/* Progress section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {completedLevels}/{totalLevels} levels
            </span>
          </div>
          <Progress value={masteryPercent} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{masteryPercent}% complete</span>
            {testPassed && testScore && (
              <div className="flex items-center gap-1 text-primary">
                <Star className="w-3 h-3 fill-current" />
                <span>Test Score: {testScore}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {showCertificate ? (
            <Button
              onClick={() => onViewCertificate(language)}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80"
              size="sm"
            >
              <Award className="w-4 h-4 mr-2" />
              View Certificate
            </Button>
          ) : isTestAvailable ? (
            <Button
              onClick={() => onStartTest(language)}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
              size="sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Take Mastery Test
              {testAttempts > 0 && (
                <span className="ml-1 text-xs opacity-80">
                  (Attempt {testAttempts + 1})
                </span>
              )}
            </Button>
          ) : (
            <Button
              disabled
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Lock className="w-4 h-4 mr-2" />
              Complete all levels first
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageMasteryCard;
