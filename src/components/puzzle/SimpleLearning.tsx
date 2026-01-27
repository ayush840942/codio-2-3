
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, BookOpen, Target, Lightbulb, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { levelLearningContent } from '@/data/levelLearningContent';

interface SimpleLearningProps {
  levelId: number;
  onStartPuzzle: () => void;
}

const SimpleLearning: React.FC<SimpleLearningProps> = ({ levelId, onStartPuzzle }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const learningContent = levelLearningContent[levelId.toString()] || levelLearningContent.default;
  const pages = learningContent.pages || [];
  const totalPages = pages.length + 1; // +1 for summary page

  const getTopicFromLevel = (level: number): string => {
    if (level <= 10) return 'HTML';
    if (level <= 20) return 'CSS';
    if (level <= 40) return 'JavaScript';
    if (level <= 60) return 'React';
    if (level <= 75) return 'OOP';
    if (level <= 90) return 'Database';
    return 'Advanced';
  };

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

  const isLastPage = currentPage === totalPages - 1;
  const progressPercent = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground">Level {levelId}</h1>
                <p className="text-xs text-muted-foreground">{getTopicFromLevel(levelId)}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {currentPage + 1}/{totalPages}
            </Badge>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {isLastPage ? (
              // Summary Page
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Ready to Practice!</h2>
                  <p className="text-muted-foreground">{learningContent.summary}</p>
                </div>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <p className="text-sm text-foreground">
                        Apply what you've learned by solving the puzzle!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Learning Pages
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground">
                    {pages[currentPage]?.title || learningContent.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {pages[currentPage]?.content || "Learn the fundamentals of programming."}
                  </p>
                </div>

                {/* Concepts */}
                {pages[currentPage]?.concepts && pages[currentPage].concepts.length > 0 && (
                  <Card className="border-border">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-medium text-foreground flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        Key Concepts
                      </h3>
                      <ul className="space-y-2">
                        {pages[currentPage].concepts.map((concept, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-medium text-primary">{i + 1}</span>
                            </span>
                            <span>{typeof concept === 'string' ? concept : concept.name}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Visual Example */}
                {pages[currentPage]?.visualExample && (
                  <Card className="border-border bg-muted/30">
                    <CardContent className="p-4">
                      <pre className="text-sm font-mono text-foreground overflow-x-auto">
                        {pages[currentPage].visualExample}
                      </pre>
                    </CardContent>
                  </Card>
                )}

                {/* Practice Hint */}
                {pages[currentPage]?.practiceHint && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">{pages[currentPage].practiceHint}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="flex-1 h-12 rounded-xl"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          {isLastPage ? (
            <Button
              onClick={onStartPuzzle}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Coding
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleLearning;
