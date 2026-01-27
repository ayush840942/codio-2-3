
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Code, Target, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { LearningPage } from '@/data/learning/types';
import InteractiveCodeExample from './InteractiveCodeExample';

interface LearningPageContentProps {
  page: LearningPage;
}

const LearningPageContent: React.FC<LearningPageContentProps> = ({ page }) => {
  const getPageIcon = (type?: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'example':
        return <Code className="w-5 h-5 text-green-600" />;
      case 'practice':
        return <Target className="w-5 h-5 text-purple-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getPageColor = (type?: string) => {
    switch (type) {
      case 'concept':
        return 'bg-blue-100 text-blue-700';
      case 'example':
        return 'bg-green-100 text-green-700';
      case 'practice':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getPageIcon(page.type)}
          <h2 className="text-2xl font-bold text-gray-800">{page.title}</h2>
        </div>
        {page.type && (
          <Badge className={getPageColor(page.type)}>
            {page.type.charAt(0).toUpperCase() + page.type.slice(1)}
          </Badge>
        )}
      </div>

      {/* Page Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {page.content}
        </div>
      </div>

      {/* Interactive Code Example */}
      {page.codeExample && (
        <Card className="bg-gray-50 border-2 border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              Interactive Example
            </h3>
            <InteractiveCodeExample
              code={page.codeExample}
              title="Code Example"
              expectedOutput="Click 'Run Code' to see the output"
            />
          </CardContent>
        </Card>
      )}

      {/* Key Points */}
      {page.keyPoints && page.keyPoints.length > 0 && (
        <Card className="bg-blue-50 border-2 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <Lightbulb className="w-5 h-5" />
              Key Points
            </h3>
            <ul className="space-y-2">
              {page.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Practice Exercise */}
      {page.exercise && (
        <Card className="bg-purple-50 border-2 border-purple-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-800">
              <Target className="w-5 h-5" />
              Practice Exercise
            </h3>
            <div className="space-y-4">
              <p className="text-purple-700">{page.exercise.question}</p>
              {page.exercise.starter && (
                <InteractiveCodeExample
                  code={page.exercise.starter}
                  title="Practice Code"
                  expectedOutput="Complete the exercise and run to see results"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default LearningPageContent;
