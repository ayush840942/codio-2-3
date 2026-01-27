
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, BookOpen, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';

interface MobileLearningLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onStart: () => void;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MobileLearningLayout: React.FC<MobileLearningLayoutProps> = ({
  children,
  title,
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onStart,
  topic,
  difficulty
}) => {
  const progress = ((currentPage + 1) / totalPages) * 100;
  
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">{title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(difficulty)}`}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1">
                    {topic}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {currentPage + 1} / {totalPages}
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content with Mobile Scroll */}
      <MobileScrollArea className="h-[calc(100vh-200px)]">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </MobileScrollArea>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-4 py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentPage === totalPages - 1 ? (
            <Button
              onClick={onStart}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Play className="h-4 w-4" />
              Start Coding
            </Button>
          ) : (
            <Button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileLearningLayout;
