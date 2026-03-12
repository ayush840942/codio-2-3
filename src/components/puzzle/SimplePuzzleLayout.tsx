
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Clock, Lightbulb, RotateCcw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';
import PuzzleBlock, { PuzzleBlockData } from '@/components/PuzzleBlock';
import { useIsMobile } from '@/hooks/use-mobile';

interface SimplePuzzleLayoutProps {
  displayLevel: any;
  currentPuzzle: any;
  levelId: number;
  availableBlocks: PuzzleBlockData[];
  placedBlocks: PuzzleBlockData[];
  feedback: 'correct' | 'incorrect' | null;
  showHint: boolean;
  attempts: number;
  codeOutput: string | null;
  handleBlockDataClick: (block: PuzzleBlockData) => void;
  handleRemoveBlock: (index: number) => void;
  handleVerifySolution: () => void;
  resetPuzzle: () => void;
  setShowHint: (show: boolean) => void;
  runCode: () => void;
}

const SimplePuzzleLayout: React.FC<SimplePuzzleLayoutProps> = ({
  displayLevel,
  currentPuzzle,
  levelId,
  availableBlocks,
  placedBlocks,
  feedback,
  showHint,
  attempts,
  codeOutput,
  handleBlockDataClick,
  handleRemoveBlock,
  handleVerifySolution,
  resetPuzzle,
  setShowHint,
  runCode,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Simple Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/levels')}
              className="w-9 h-9 rounded-xl"
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center">
            <span className="font-semibold text-foreground">Level {levelId}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeSpent)}</span>
          </div>
        </div>
      </div>

      <MobileScrollArea className="h-[calc(100vh-60px)]">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Level Info */}
          <div className="text-center space-y-2">
            <h1 className="text-xl font-bold text-foreground">
              {displayLevel?.title || currentPuzzle?.title || "Coding Challenge"}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {displayLevel?.topic || "Programming"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {displayLevel?.difficulty || "easy"}
              </Badge>
            </div>
          </div>

          {/* Instructions */}
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentPuzzle?.description || displayLevel?.description || "Arrange the code blocks in the correct order to solve the puzzle."}
              </p>
            </CardContent>
          </Card>

          {/* Drop Zone - Your Solution */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Your Solution</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetPuzzle}
                className="text-muted-foreground h-8"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
            
            <Card className={`min-h-32 border-2 border-dashed transition-colors ${
              feedback === 'correct' ? 'border-green-400 bg-green-50' :
              feedback === 'incorrect' ? 'border-red-400 bg-red-50' :
              'border-border bg-muted/30'
            }`}>
              <CardContent className="p-3">
                {placedBlocks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Tap blocks below to add them here
                  </p>
                ) : (
                  <div className="space-y-2">
                    {placedBlocks.map((block, index) => (
                      <motion.div
                        key={`placed-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => handleRemoveBlock(index)}
                        className="cursor-pointer"
                      >
                        <PuzzleBlock block={block} isInSolution />
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Available Blocks */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Available Blocks</h3>
            <Card className="border-border">
              <CardContent className="p-3">
                {availableBlocks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    All blocks placed!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {availableBlocks.map((block, index) => (
                      <motion.div
                        key={`available-${index}`}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleBlockDataClick(block)}
                        className="cursor-pointer"
                      >
                        <PuzzleBlock block={block} onClick={() => handleBlockDataClick(block)} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Output Preview */}
          {codeOutput && (
            <Card className="border-border bg-muted/50">
              <CardContent className="p-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Output:</p>
                <pre className="text-sm text-foreground font-mono bg-background p-2 rounded-lg overflow-x-auto">
                  {codeOutput}
                </pre>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
              className="flex-1 h-11 rounded-xl"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Hint
            </Button>
            <Button
              onClick={handleVerifySolution}
              disabled={placedBlocks.length === 0}
              className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary-hover"
            >
              <Play className="w-4 h-4 mr-2" />
              Check
            </Button>
          </div>

          {/* Feedback */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl text-center ${
                feedback === 'correct' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <p className="font-medium">
                {feedback === 'correct' ? '🎉 Correct!' : '❌ Try again!'}
              </p>
            </motion.div>
          )}

          {/* Hint Display */}
          {showHint && currentPuzzle?.hints && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-amber-50 border border-amber-200"
            >
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  {Array.isArray(currentPuzzle.hints) 
                    ? currentPuzzle.hints[0] 
                    : currentPuzzle.hints}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </MobileScrollArea>
    </div>
  );
};

export default SimplePuzzleLayout;
