
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { levelLearningContent } from '@/data/levelLearningContent';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileLearningLayout from './learning/MobileLearningLayout';
import LearningPageContent from './learning/LearningPageContent';
import DetailedLearningConcepts from './learning/DetailedLearningConcepts';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Star, Trophy } from 'lucide-react';
import { LearningPage } from '@/data/learning/types';
import { getLevelConfig } from '@/utils/levelManifest';

interface MimoStyleLearningProps {
  levelId: number;
  onStartPuzzle: () => void;
}

interface EnhancedLearningPage extends LearningPage {
  isDetailedConcepts?: boolean;
}

const MimoStyleLearning: React.FC<MimoStyleLearningProps> = ({ levelId, onStartPuzzle }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [interactionCompleted, setInteractionCompleted] = useState(false);
  const isMobile = useIsMobile();

  const learningContent = levelLearningContent[levelId.toString()] || levelLearningContent.default;

  const enhancedPages: EnhancedLearningPage[] = [
    {
      title: "Learning Overview",
      content: `Welcome to Level ${levelId}! \n\nIn this level, you'll learn about ${learningContent.topic}. This is an essential skill that will help you become a better programmer.`,
      concepts: learningContent.pages[0]?.concepts || [],
      visualExample: `Level ${levelId} focuses on ${learningContent.topic} fundamentals`,
      practiceHint: "Take your time to understand each concept before moving forward",
      type: 'concept' as const
    },
    {
      title: "Detailed Concepts",
      content: "Let's dive deep into the concepts you'll be working with in this level.",
      concepts: [],
      visualExample: "",
      practiceHint: "",
      type: 'concept' as const,
      isDetailedConcepts: true
    },
    ...learningContent.pages,
    {
      title: "Ready to Practice?",
      content: learningContent.summary,
      concepts: [],
      visualExample: "You're now ready to put your knowledge to the test!",
      practiceHint: "Remember what you've learned and apply it step by step",
      type: 'practice' as const
    }
  ];

  const totalPages = enhancedPages.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Reset interaction state on page change
  useEffect(() => {
    setInteractionCompleted(false);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleInteractionComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setInteractionCompleted(true);
    }
  };

  const { topic, difficulty } = getLevelConfig(levelId);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-pastel-cyan flex items-center justify-center p-6 font-draw relative overflow-hidden">
        <DrawnCard className="bg-white p-10 text-center animate-bounce-soft relative z-10">
          <h2 className="text-2xl font-black text-black">GETTING READY...</h2>
          <p className="font-bold opacity-60">Level {levelId} is coming up!</p>
        </DrawnCard>
      </div>
    );
  }

  const currentPageData = enhancedPages[currentPage];

  return (
    <MobileLearningLayout
      title={learningContent.title}
      currentPage={currentPage}
      totalPages={totalPages}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onStart={onStartPuzzle}
      topic={topic}
      difficulty={difficulty}
      isNextDisabled={!!currentPageData?.interactionType && !interactionCompleted}
    >
      <div className="space-y-6 font-draw relative">
        {/* Peeking Mascots */}

        <div className="relative z-10">
          {currentPageData?.isDetailedConcepts ? (
            <DetailedLearningConcepts
              levelId={levelId}
              topic={topic}
              difficulty={difficulty}
            />
          ) : (
            <LearningPageContent
              page={currentPageData}
              onInteractionComplete={handleInteractionComplete}
            />
          )}

          {/* Progress Bubbles */}
          <div className="flex flex-col items-center gap-4 pt-2">

            <div className="flex justify-center space-x-3">
              {enhancedPages.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{ scale: index === currentPage ? 1.5 : 1 }}
                  className={`w-3 h-3 border-2 border-black rounded-full transition-colors ${index === currentPage ? 'bg-pastel-yellow' : 'bg-white'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Playful Stats Card */}
          <DrawnCard className="bg-pastel-lavender">
            <div className="grid grid-cols-3 gap-2 text-center text-black">
              <div className="space-y-1">
                <Target className="h-6 w-6 mx-auto" strokeWidth={3} />
                <p className="text-xs font-black uppercase">Level</p>
                <p className="text-xl font-black">{levelId}</p>
              </div>
              <div className="space-y-1">
                <Star className="h-6 w-6 mx-auto" strokeWidth={3} />
                <p className="text-xs font-black uppercase">Reward</p>
                <p className="text-xl font-black">{50 + (levelId * 5)}</p>
              </div>
              <div className="space-y-1">
                <Trophy className="h-6 w-6 mx-auto" strokeWidth={3} />
                <p className="text-xs font-black uppercase">Skill</p>
                <Badge className="bg-white border-2 border-black text-black font-bold text-[10px] px-1 h-5">
                  {topic}
                </Badge>
              </div>
            </div>
          </DrawnCard>
        </div>
      </div>
    </MobileLearningLayout>
  );
};

export default MimoStyleLearning;
