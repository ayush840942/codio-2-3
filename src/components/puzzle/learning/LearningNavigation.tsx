
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play, BookOpen } from 'lucide-react';

interface LearningNavigationProps {
  currentPage: number;
  showSummary: boolean;
  isLastPage: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const LearningNavigation: React.FC<LearningNavigationProps> = ({
  currentPage,
  showSummary,
  isLastPage,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200 safe-area-bottom">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentPage === 0 && !showSummary}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 mobile-button android-button android-button-primary ${
          currentPage === 0 && !showSummary
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-50 hover:scale-105 active:scale-95 android-haptic touch-manipulation'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>

      {/* Progress Indicator with Android optimizations */}
      <div className="flex items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500">
            {showSummary ? 'Summary Review' : 'Learning Path'}
          </span>
        </div>
        
        {!showSummary && (
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 android-haptic ${
                  i <= currentPage ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {!showSummary ? (
        <Button
          onClick={onNext}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center gap-2 mobile-button android-button android-button-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 android-haptic touch-manipulation"
        >
          {isLastPage ? (
            <>
              Complete Lesson
              <Play className="w-4 h-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      ) : (
        <div className="w-full sm:w-auto flex items-center justify-center">
          <span className="text-sm text-green-600 font-medium bg-green-50 px-4 py-2 rounded-full android-card">
            ✨ Lesson completed!
          </span>
        </div>
      )}
    </div>
  );
};

export default LearningNavigation;
