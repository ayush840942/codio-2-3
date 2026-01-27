
import React from 'react';

interface LearningProgressIndicatorProps {
  currentPage: number;
  totalPages: number;
  showSummary: boolean;
}

const LearningProgressIndicator: React.FC<LearningProgressIndicatorProps> = ({
  currentPage,
  totalPages,
  showSummary
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalPages + 1 }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index < currentPage || (showSummary && index === totalPages)
              ? 'w-8 bg-green-500'
              : index === currentPage && !showSummary
              ? 'w-8 bg-blue-500'
              : showSummary && index === totalPages
              ? 'w-8 bg-green-500'
              : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default LearningProgressIndicator;
