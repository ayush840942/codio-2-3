
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock } from 'lucide-react';

interface LearningHeaderProps {
  levelId: string | number;
  content: {
    icon: React.ComponentType<any>;
    topic: string;
    title: string;
    introduction: string;
  };
  currentPage: number;
  totalPages: number;
  showSummary: boolean;
}

const LearningHeader: React.FC<LearningHeaderProps> = ({
  levelId,
  content,
  currentPage,
  totalPages,
  showSummary
}) => {
  // Calculate estimated reading time (assuming 200 words per minute)
  const estimatedTime = Math.max(2, Math.ceil((totalPages * 150) / 200));

  return (
    <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
      {/* Top Row with Level and Topic */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-3 py-1">
            Level {levelId}
          </Badge>
          <div className="h-4 w-px bg-white/30"></div>
          <div className="flex items-center gap-2">
            <content.icon className="w-5 h-5" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-3 py-1">
              {content.topic}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <Clock className="w-4 h-4" />
          <span>{estimatedTime} min read</span>
        </div>
      </div>
      
      {/* Main Title */}
      <CardTitle className="text-2xl font-bold mb-3 leading-tight">
        {content.title}
      </CardTitle>
      
      {/* Introduction */}
      <p className="text-white/90 text-base leading-relaxed mb-4">
        {content.introduction}
      </p>
      
      {/* Enhanced Progress Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80">Learning Progress</span>
          </div>
          <span className="text-sm text-white/90 font-medium">
            {showSummary ? 'Review Complete' : `${currentPage + 1}/${totalPages} pages`}
          </span>
        </div>
        
        {/* Visual Progress Bar */}
        <div className="relative">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-300 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: showSummary 
                  ? '100%' 
                  : `${((currentPage + 1) / (totalPages + 1)) * 100}%` 
              }}
            />
          </div>
          
          {/* Page Indicators */}
          <div className="flex justify-between mt-2">
            {Array.from({ length: totalPages + 1 }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < currentPage || (showSummary && index === totalPages)
                    ? 'bg-green-400 scale-125' 
                    : index === currentPage && !showSummary
                    ? 'bg-white scale-110' 
                    : showSummary && index === totalPages
                    ? 'bg-green-400 scale-125'
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Status Message */}
        <div className="text-center">
          <span className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full">
            {showSummary 
              ? '🎯 Ready for the challenge!' 
              : currentPage === 0 
              ? '🚀 Let\'s start learning!' 
              : currentPage === totalPages - 1
              ? '🏁 Almost there!'
              : '📚 Learning in progress...'
            }
          </span>
        </div>
      </div>
    </CardHeader>
  );
};

export default LearningHeader;
