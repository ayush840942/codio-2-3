
import React, { useState } from 'react';
import { levelLearningContent } from '@/data/levelLearningContent';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';
import LearningHeader from './learning/LearningHeader';
import LearningPageContent from './learning/LearningPageContent';
import LearningSummaryPage from './learning/LearningSummaryPage';
import LearningNavigation from './learning/LearningNavigation';

interface LearningMaterialProps {
  levelId: string | number;
  onStartPuzzle: () => void;
}

const LearningMaterial: React.FC<LearningMaterialProps> = ({ levelId, onStartPuzzle }) => {
  const content = levelLearningContent[String(levelId)] || levelLearningContent['default'];
  const { playButtonPress } = useSoundEffects();
  const [currentPage, setCurrentPage] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const totalPages = content.pages.length;
  const isLastPage = currentPage === totalPages - 1;

  const handleNext = () => {
    playButtonPress();
    if (isLastPage) {
      setShowSummary(true);
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    playButtonPress();
    if (showSummary) {
      setShowSummary(false);
    } else {
      setCurrentPage(prev => Math.max(0, prev - 1));
    }
  };

  const handleStartPuzzle = () => {
    playButtonPress();
    onStartPuzzle();
  };

  const pageVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm h-full">
            <LearningHeader
              levelId={levelId}
              content={content}
              currentPage={currentPage}
              totalPages={totalPages}
              showSummary={showSummary}
            />

            <CardContent className="p-3 sm:p-6">
              <MobileScrollArea className="min-h-[60vh] sm:min-h-[50vh]">
                <AnimatePresence mode="wait">
                  {!showSummary ? (
                    <motion.div
                      key={currentPage}
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <LearningPageContent
                        page={content.pages[currentPage]}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="summary"
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <LearningSummaryPage
                        content={content}
                        onStartPuzzle={handleStartPuzzle}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </MobileScrollArea>

              <LearningNavigation
                currentPage={currentPage}
                showSummary={showSummary}
                isLastPage={isLastPage}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningMaterial;
