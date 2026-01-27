
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target, Zap, BookOpen, ArrowLeft } from 'lucide-react';
import { useLanguageMastery } from '@/hooks/useLanguageMastery';
import { getTestForLanguage } from '@/data/masteryTests';
import LanguageMasteryCard from './LanguageMasteryCard';
import MasteryTestModal from './MasteryTestModal';
import CertificateModal from './CertificateModal';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TestResult } from '@/types/mastery';

interface MasteryDashboardProps {
  onBack?: () => void;
}

const MasteryDashboard: React.FC<MasteryDashboardProps> = ({ onBack }) => {
  const { 
    languageMasteries, 
    overallStats, 
    saveTestResult,
    isLoading,
    testResults
  } = useLanguageMastery();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleStartTest = (language: string) => {
    setSelectedLanguage(language);
    setShowTest(true);
  };

  const handleViewCertificate = (language: string) => {
    setSelectedLanguage(language);
    setShowCertificate(true);
  };

  const handleTestComplete = async (result: TestResult) => {
    if (selectedLanguage) {
      await saveTestResult(selectedLanguage, result.passed, result.percentage);
    }
  };

  const selectedTest = selectedLanguage ? getTestForLanguage(selectedLanguage) : null;
  const selectedTestResult = selectedLanguage ? testResults[selectedLanguage] : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Language Mastery
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete all levels and pass the test to earn certifications
            </p>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-foreground">
              {overallStats.completedLevels}
            </div>
            <div className="text-xs text-muted-foreground">Levels Done</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-foreground">
              {overallStats.masteredLanguages}
            </div>
            <div className="text-xs text-muted-foreground">Mastered</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-primary">
              {overallStats.certifiedLanguages}
            </div>
            <div className="text-xs text-muted-foreground">Certified</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-foreground">
              {overallStats.overallProgress}%
            </div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
        </div>
      </motion.div>

      {/* Progress overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Overall Mastery</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {overallStats.certifiedLanguages}/{overallStats.totalLanguages} languages certified
          </span>
        </div>
        <Progress 
          value={(overallStats.certifiedLanguages / overallStats.totalLanguages) * 100} 
          className="h-3" 
        />
      </motion.div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="font-medium text-amber-700 dark:text-amber-300">Learn</span>
          </div>
          <p className="text-xs text-amber-600/80 dark:text-amber-300/80">
            Complete all levels in a language to unlock its mastery test
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary/10 border border-primary/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">Certify</span>
          </div>
          <p className="text-xs text-primary/80">
            Pass the test with 70% or higher to earn your certificate
          </p>
        </motion.div>
      </div>

      {/* Language cards */}
      <div className="space-y-4">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          Programming Languages
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {languageMasteries.map((mastery, index) => (
            <LanguageMasteryCard
              key={mastery.language}
              mastery={mastery}
              onStartTest={handleStartTest}
              onViewCertificate={handleViewCertificate}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Test Modal */}
      {selectedTest && (
        <MasteryTestModal
          isOpen={showTest}
          onClose={() => {
            setShowTest(false);
            setSelectedLanguage(null);
          }}
          test={selectedTest}
          onComplete={handleTestComplete}
        />
      )}

      {/* Certificate Modal */}
      {selectedLanguage && (
        <CertificateModal
          isOpen={showCertificate}
          onClose={() => {
            setShowCertificate(false);
            setSelectedLanguage(null);
          }}
          language={selectedLanguage}
          score={selectedTestResult?.score}
          completedAt={selectedTestResult?.completedAt}
        />
      )}
    </div>
  );
};

export default MasteryDashboard;
