
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import { BookOpen, Code, Target, Lightbulb, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { LearningPage } from '@/data/learning/types';
import InteractiveCodeExample from './InteractiveCodeExample';
import InteractiveLearningSlide from './InteractiveLearningSlide';

interface LearningPageContentProps {
  page: LearningPage;
  onInteractionComplete?: (isCorrect: boolean) => void;
}

const LearningPageContent: React.FC<LearningPageContentProps> = ({ page, onInteractionComplete }) => {
  const getPageIcon = (type?: string) => {
    const props = { className: "w-8 h-8 text-black", strokeWidth: 3 };
    switch (type) {
      case 'concept': return <BookOpen {...props} />;
      case 'example': return <Code {...props} />;
      case 'practice': return <Target {...props} />;
      case 'interactive': return <Zap className="w-8 h-8 text-black" strokeWidth={3} />;
      default: return <Lightbulb {...props} />;
    }
  };

  const getPageColor = (type?: string) => {
    switch (type) {
      case 'concept': return 'bg-pastel-blue';
      case 'example': return 'bg-pastel-mint';
      case 'practice': return 'bg-pastel-lavender';
      case 'interactive': return 'bg-pastel-yellow';
      default: return 'bg-pastel-yellow';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 font-draw"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className={`p-3 border-3 border-black rounded-2xl shadow-comic-sm ${getPageColor(page.type)}`}>
            {getPageIcon(page.type)}
          </div>
          <h2 className="text-3xl font-black text-black leading-tight">{page.title}</h2>
        </div>
      </div>

      {/* Interactive Learning Slide */}
      {page.type === 'interactive' && (
        <InteractiveLearningSlide
          page={page}
          onComplete={(correct) => onInteractionComplete?.(correct)}
        />
      )}

      {/* Page Content */}
      <DrawnCard className="bg-white/80 p-6">
        <div className="text-xl font-bold text-slate-800 leading-relaxed whitespace-pre-wrap">
          {page.content}
        </div>
      </DrawnCard>

      {/* Interactive Code Example */}
      {page.codeExample && (
        <DrawnCard className="bg-slate-900 border-black p-6">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-white">
            <Code className="w-6 h-6 text-pastel-blue" strokeWidth={3} />
            LIVE EXAMPLE
          </h3>
          <div className="rounded-xl overflow-hidden border-2 border-slate-700">
            <InteractiveCodeExample
              code={page.codeExample}
              title="Code Snippet"
              expectedOutput="Check the output below!"
            />
          </div>
        </DrawnCard>
      )}

      {/* Key Points */}
      {page.keyPoints && page.keyPoints.length > 0 && (
        <DrawnCard className="bg-pastel-yellow p-6">
          <h3 className="text-2xl font-black mb-4 flex items-center gap-2 text-black">
            <Lightbulb className="w-7 h-7" strokeWidth={3} />
            KEY TIPS
          </h3>
          <ul className="space-y-3">
            {page.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-3 h-3 bg-black rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-lg font-bold text-black/80 leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </DrawnCard>
      )}

      {/* Visual Example */}
      {page.visualExample && (
        <DrawnCard className="bg-cc-blue p-6 border-dashed">
          <h3 className="text-xl font-black mb-3 flex items-center gap-2 text-black">
            <Star className="w-6 h-6 fill-cc-yellow" strokeWidth={3} />
            VISUAL MISSION
          </h3>
          <p className="text-lg font-bold text-black/70 italic">
            {page.visualExample}
          </p>
        </DrawnCard>
      )}

      {/* Practice Hint */}
      {page.practiceHint && (
        <DrawnCard className="bg-cc-green p-6 border-dashed">
          <h3 className="text-xl font-black mb-3 flex items-center gap-2 text-black">
            <Zap className="w-6 h-6 fill-cc-yellow" strokeWidth={3} />
            PRO TIP
          </h3>
          <p className="text-lg font-bold text-black/70 italic">
            "{page.practiceHint}"
          </p>
        </DrawnCard>
      )}

      {/* Practice Exercise */}
      {page.exercise && (
        <DrawnCard className="bg-pastel-lavender p-6">
          <h3 className="text-2xl font-black mb-4 flex items-center gap-2 text-black">
            <Target className="w-7 h-7" strokeWidth={3} />
            YOUR TURN
          </h3>
          <div className="space-y-4">
            <p className="text-xl font-bold text-black/80">{page.exercise.question}</p>
            {page.exercise.starter && (
              <div className="rounded-xl overflow-hidden border-2 border-black/20">
                <InteractiveCodeExample
                  code={page.exercise.starter}
                  title="Try it out"
                  expectedOutput="Run the code to verify!"
                />
              </div>
            )}
          </div>
        </DrawnCard>
      )}
    </motion.div>
  );
};

export default LearningPageContent;
