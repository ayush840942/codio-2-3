import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import MobilePuzzleInterface from './MobilePuzzleInterface';
import AvailableBlocksArea from './AvailableBlocksArea';
import PuzzleSolutionArea from './PuzzleSolutionArea';
import ExpectedOutputArea from './ExpectedOutputArea';
import PuzzleRewardSection from './PuzzleRewardSection';
import SecureHintSystem from './SecureHintSystem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, RotateCcw, Lightbulb, BookOpen, Target } from 'lucide-react';
import { PuzzleBlockData } from '@/components/PuzzleBlock';

interface PuzzleMainContentProps {
  displayLevel: any;
  currentPuzzle: any;
  levelId: number;
  availableBlocks: PuzzleBlockData[];
  placedBlocks: PuzzleBlockData[];
  feedback: 'correct' | 'incorrect' | null;
  showHint: boolean;
  showSolution: boolean;
  attempts: number;
  codeOutput: string | null;
  timeSpent: number;
  handleBlockDataClick: (block: PuzzleBlockData) => void;
  handleRemoveBlock: (index: number) => void;
  handleVerifySolution: () => void;
  handleShowSolution: () => void;
  resetPuzzle: () => void;
  setShowHint: (show: boolean) => void;
  runCode: () => void;
  onHintUsed?: (hint: any) => void;
}

const PuzzleMainContent: React.FC<PuzzleMainContentProps> = ({
  displayLevel,
  currentPuzzle,
  levelId,
  availableBlocks,
  placedBlocks,
  feedback,
  showHint,
  showSolution,
  attempts,
  codeOutput,
  timeSpent,
  handleBlockDataClick,
  handleRemoveBlock,
  handleVerifySolution,
  handleShowSolution,
  resetPuzzle,
  setShowHint,
  runCode,
  onHintUsed
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const isCorrect = feedback === 'correct';
  const hasOutput = codeOutput !== null;

  const handleNavigateHome = () => {
    navigate('/levels');
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  // Use mobile interface for better app-like experience
  if (isMobile) {
    return (
      <MobilePuzzleInterface
        displayLevel={displayLevel}
        currentPuzzle={currentPuzzle}
        levelId={levelId}
        availableBlocks={availableBlocks}
        placedBlocks={placedBlocks}
        feedback={feedback}
        showHint={showHint}
        showSolution={showSolution}
        attempts={attempts}
        codeOutput={codeOutput}
        timeSpent={timeSpent}
        handleBlockDataClick={handleBlockDataClick}
        handleRemoveBlock={handleRemoveBlock}
        handleVerifySolution={handleVerifySolution}
        handleShowSolution={handleShowSolution}
        resetPuzzle={resetPuzzle}
        setShowHint={setShowHint}
        runCode={runCode}
        onHintUsed={onHintUsed || (() => {})}
        onNavigateHome={handleNavigateHome}
        onNavigateBack={handleNavigateBack}
      />
    );
  }

  return (
    <div className={`space-y-${isMobile ? '4' : '6'} overflow-x-hidden`}>
      {/* Enhanced Puzzle Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 shadow-lg">
          <CardHeader className={isMobile ? 'pb-2 p-3' : 'pb-4'}>
            <div className="flex items-center justify-between">
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-purple-800 flex items-center gap-2`}>
                <BookOpen className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-purple-600`} />
                Coding Challenge
              </CardTitle>
              <div className="flex gap-1">
                <Badge variant="outline" className={`bg-purple-100 text-purple-700 ${isMobile ? 'text-xs px-1 py-0.5' : ''}`}>
                  Level {levelId}
                </Badge>
                <Badge variant="secondary" className={`bg-blue-100 text-blue-700 ${isMobile ? 'text-xs px-1 py-0.5 max-w-[60px] truncate' : ''}`}>
                  {displayLevel?.topic || currentPuzzle?.topic || "Programming"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className={isMobile ? 'p-3 pt-0' : ''}>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Target className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-purple-600 mt-1 flex-shrink-0`} />
                <div>
                  <h3 className={`font-semibold text-purple-800 ${isMobile ? 'text-sm mb-1' : 'mb-2'}`}>Your Mission:</h3>
                  <p className={`text-purple-700 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
                    {currentPuzzle?.description || "Arrange the code blocks below to produce the expected output"}
                  </p>
                </div>
              </div>
              
              {/* Mobile-optimized Quick Stats */}
              <div className={`flex items-center ${isMobile ? 'gap-2 text-xs flex-wrap' : 'gap-4 text-sm'} text-purple-600 bg-purple-100 p-3 rounded-lg`}>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Attempts:</span>
                  <span className="bg-purple-200 px-2 py-1 rounded">{attempts}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Blocks:</span>
                  <span className="bg-purple-200 px-2 py-1 rounded">{availableBlocks.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Status:</span>
                  <Badge className={`${isCorrect ? 'bg-green-600' : 'bg-orange-500'} ${isMobile ? 'text-xs' : ''}`}>
                    {isCorrect ? 'Complete' : 'In Progress'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mobile-optimized Main Puzzle Interface */}
      <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-6'}`}>
        {/* Left Column - Code Blocks */}
        <div className={`space-y-${isMobile ? '4' : '6'}`}>
          {/* Available Blocks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AvailableBlocksArea
              availableBlocks={availableBlocks}
              onBlockClick={handleBlockDataClick}
            />
          </motion.div>

          {/* Solution Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PuzzleSolutionArea
              placedBlocks={placedBlocks}
              onRemoveBlock={handleRemoveBlock}
              feedback={feedback}
              showHint={showHint}
              showSolution={showSolution}
              hint={currentPuzzle?.hint || "Try to think about the logical order of operations"}
              onReset={resetPuzzle}
              onToggleHint={() => setShowHint(!showHint)}
              onVerifySolution={handleVerifySolution}
              onShowSolution={handleShowSolution}
              onRunCode={runCode}
              xpReward={displayLevel?.xpReward || 50}
              topic={displayLevel?.topic || currentPuzzle?.topic || "Programming"}
              attempts={attempts}
              codeOutput={codeOutput}
              difficulty={displayLevel?.difficulty || 'easy'}
              currentPuzzle={currentPuzzle}
            />
          </motion.div>

          {/* Mobile-optimized Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'}`}
          >
            <Button
              onClick={runCode}
              disabled={placedBlocks.length === 0}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium ${isMobile ? 'h-12 text-sm' : ''}`}
            >
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
            
            <Button
              onClick={handleVerifySolution}
              disabled={placedBlocks.length === 0}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium ${isMobile ? 'h-12 text-sm' : ''}`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Check Solution
            </Button>
            
            {!isMobile && (
              <>
                <Button
                  onClick={resetPuzzle}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                
                <Button
                  onClick={() => setShowHint(true)}
                  variant="outline"
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Get Hint
                </Button>
              </>
            )}
            
            {isMobile && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={resetPuzzle}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 h-12 text-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                
                <Button
                  onClick={() => setShowHint(true)}
                  variant="outline"
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-12 text-sm"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Hint
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Output and Results */}
        <div className={`space-y-${isMobile ? '4' : '6'}`}>
          {/* Enhanced Expected Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ExpectedOutputArea
              expectedOutput={currentPuzzle?.expectedOutput || "No expected output defined"}
              currentOutput={codeOutput || undefined}
              isCorrect={isCorrect}
              showComparison={hasOutput}
            />
          </motion.div>

          {/* Reward Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PuzzleRewardSection
              xp={displayLevel?.xpReward || 50}
              coins={25}
              streak={1}
              level={levelId}
              badges={[]}
            />
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default PuzzleMainContent;
