
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { levelLearningContent } from '@/data/levelLearningContent';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileLearningLayout from './learning/MobileLearningLayout';
import LearningPageContent from './learning/LearningPageContent';
import DetailedLearningConcepts from './learning/DetailedLearningConcepts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Star, Trophy } from 'lucide-react';
import { LearningPage } from '@/data/learning/types';

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
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const learningContent = levelLearningContent[levelId.toString()] || levelLearningContent.default;
  
  // Create enhanced pages with detailed concepts
  const enhancedPages: EnhancedLearningPage[] = [
    // Overview page
    {
      title: "Learning Overview",
      content: `Welcome to Level ${levelId}! \n\nIn this level, you'll learn about ${learningContent.topic}. This is an essential skill that will help you become a better programmer.`,
      concepts: learningContent.pages[0]?.concepts || [],
      visualExample: `Level ${levelId} focuses on ${learningContent.topic} fundamentals`,
      practiceHint: "Take your time to understand each concept before moving forward",
      type: 'concept' as const
    },
    // Detailed concepts page
    {
      title: "Detailed Concepts",
      content: "Let's dive deep into the concepts you'll be working with in this level.",
      concepts: [],
      visualExample: "",
      practiceHint: "",
      type: 'concept' as const,
      isDetailedConcepts: true
    },
    // Regular learning pages
    ...learningContent.pages,
    // Summary page
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

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getDifficultyFromLevel = (level: number): 'easy' | 'medium' | 'hard' => {
    if (level <= 50) return 'easy';
    if (level <= 120) return 'medium';
    return 'hard';
  };

  const getTopicFromLevel = (level: number): string => {
    if (level <= 10) return 'HTML';
    if (level <= 20) return 'CSS';
    if (level <= 40) return 'JavaScript';
    if (level <= 50) return 'Python';
    if (level <= 60) return 'TypeScript';
    if (level <= 70) return 'C++';
    if (level <= 80) return 'C#';
    if (level <= 90) return 'Dart';
    if (level <= 100) return 'Go';
    if (level <= 110) return 'Kotlin';
    if (level <= 120) return 'Swift';
    if (level <= 140) return 'React';
    if (level <= 155) return 'OOP';
    if (level <= 170) return 'Database';
    return 'Advanced';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-blue-800 mb-2">Loading Learning Content...</h2>
          <p className="text-blue-600">Preparing Level {levelId}</p>
        </motion.div>
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
      topic={getTopicFromLevel(levelId)}
      difficulty={getDifficultyFromLevel(levelId)}
    >
      <div className="space-y-6">
        {currentPageData?.isDetailedConcepts ? (
          <DetailedLearningConcepts
            levelId={levelId}
            topic={getTopicFromLevel(levelId)}
            difficulty={getDifficultyFromLevel(levelId)}
          />
        ) : (
          <LearningPageContent page={currentPageData} />
        )}

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 pt-4">
          {enhancedPages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Level Stats */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <Target className="h-5 w-5 text-purple-600 mx-auto" />
                <p className="text-sm font-medium text-purple-800">Level</p>
                <p className="text-lg font-bold text-purple-900">{levelId}</p>
              </div>
              <div className="space-y-1">
                <Star className="h-5 w-5 text-yellow-600 mx-auto" />
                <p className="text-sm font-medium text-yellow-800">XP Reward</p>
                <p className="text-lg font-bold text-yellow-900">{50 + (levelId * 5)}</p>
              </div>
              <div className="space-y-1">
                <Trophy className="h-5 w-5 text-green-600 mx-auto" />
                <p className="text-sm font-medium text-green-800">Topic</p>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  {getTopicFromLevel(levelId)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLearningLayout>
  );
};

export default MimoStyleLearning;
