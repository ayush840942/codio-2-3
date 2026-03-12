
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, BookOpen } from 'lucide-react';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import { Badge } from '@/components/ui/badge';
import MobileHeader from '@/components/MobileHeader';
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
  isNextDisabled?: boolean;
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
  difficulty,
  isNextDisabled = false
}) => {
  const progress = ((currentPage + 1) / totalPages) * 100;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-pastel-mint border-black';
      case 'medium': return 'bg-pastel-yellow border-black';
      case 'hard': return 'bg-pastel-pink border-black';
      default: return 'bg-white border-black';
    }
  };

  return (
    <div className="min-h-[100dvh] bg-transparent font-draw">
      {/* Unified Mobile Header */}
      <MobileHeader
        title={title}
        showBack
        rightElement={
          <div className="text-xl font-black text-black">
            {currentPage + 1} / {totalPages}
          </div>
        }
      />

      <div className="p-4" style={{ paddingTop: 'calc(var(--safe-area-top) + 4.5rem)' }}>
        <div className="h-4 bg-white border-3 border-black rounded-full overflow-hidden shadow-comic-sm">
          <motion.div
            className="h-full bg-pastel-blue border-r-3 border-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Content with Mobile Scroll */}
      <MobileScrollArea className="h-[calc(100vh-220px)]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </MobileScrollArea>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-20">
        <DrawnCard className="py-4 px-4 bg-white/80 backdrop-blur-md">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <DrawnButton
              variant="outlined"
              onClick={onPrevious}
              disabled={currentPage === 0}
              className="flex-1 h-14 text-lg bg-white disabled:opacity-30"
            >
              <ArrowLeft className="h-6 w-6 mr-2" />
              Back
            </DrawnButton>

            {currentPage === totalPages - 1 ? (
              <DrawnButton
                onClick={onStart}
                className="flex-[1.5] h-14 text-xl bg-pastel-yellow"
              >
                <Play className="h-6 w-6 mr-2 fill-black" />
                START
              </DrawnButton>
            ) : (
              <DrawnButton
                onClick={onNext}
                disabled={isNextDisabled}
                className={`flex-1 h-14 text-lg bg-pastel-blue transition-all ${isNextDisabled ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-blue-300'}`}
              >
                Next
                <ArrowRight className={`h-6 w-6 ml-2 ${isNextDisabled ? 'opacity-30' : ''}`} />
              </DrawnButton>
            )}
          </div>
        </DrawnCard>
      </div>
    </div>
  );
};

export default MobileLearningLayout;
