
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, BookOpen, Trophy, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { LevelLearningContent } from '@/data/learning/types';

interface LearningSummaryPageProps {
  content: LevelLearningContent;
  onStartPuzzle: () => void;
}

const LearningSummaryPage: React.FC<LearningSummaryPageProps> = ({ 
  content, 
  onStartPuzzle 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Completion Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Learning Complete!
        </h2>
        <p className="text-gray-600">
          You've successfully completed the learning material for {content.title}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Topic Covered</h3>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              {content.topic}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-2 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Pages Completed</h3>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {content.pages.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Objectives */}
      {(content.learningObjectives || content.objectives) && (
        <Card className="bg-purple-50 border-2 border-purple-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-800">
              <Target className="w-5 h-5" />
              Learning Objectives Achieved
            </h3>
            <div className="space-y-3">
              {(content.learningObjectives || content.objectives).map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-700">{objective}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Ready for the Challenge?
          </h3>
          <p className="text-gray-600 mb-6">
            Now that you've learned the concepts, it's time to put your knowledge to the test!
          </p>
          <Button
            onClick={onStartPuzzle}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-lg font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Puzzle Challenge
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LearningSummaryPage;
