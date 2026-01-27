import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Home, Clock, Target, Star, Play, CheckCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { PuzzleBlockData } from '@/components/PuzzleBlock';
import AvailableBlocksArea from './AvailableBlocksArea';
import PuzzleDropZone from './PuzzleDropZone';
import ExpectedOutputArea from './ExpectedOutputArea';
import SecureHintSystem from './SecureHintSystem';
import { useUnifiedHints } from '@/hooks/useUnifiedHints';
import { toast } from 'sonner';
interface MobilePuzzleInterfaceProps {
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
  onHintUsed: (hint: any) => void;
  onNavigateHome: () => void;
  onNavigateBack: () => void;
}
const MobilePuzzleInterface: React.FC<MobilePuzzleInterfaceProps> = ({
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
  onHintUsed,
  onNavigateHome,
  onNavigateBack
}) => {
  const isMobile = useIsMobile();

  const {
    purchaseHint,
    isHintPurchased,
    getHintByType,
    canAffordHint
  } = useUnifiedHints(levelId, displayLevel?.difficulty || 'easy', currentPuzzle, attempts);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col overflow-hidden">
    {/* Mobile Header */}


    {/* Main Content */}
    <MobileScrollArea className="flex-1 h-full">
      <div className="p-3 space-y-4">
        {/* Level Info Card */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }}>
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-purple-800 flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                {displayLevel?.title || "Coding Challenge"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-purple-700 text-sm leading-relaxed">
                {currentPuzzle?.description || "Arrange the code blocks to solve the challenge"}
              </p>

              <div className="flex items-center gap-2 text-xs flex-wrap">
                <Badge variant="outline" className="bg-purple-100 text-purple-700">
                  {displayLevel?.topic || "Programming"}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                  {attempts} attempts
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  {displayLevel?.difficulty || "easy"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Blocks */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
          <AvailableBlocksArea availableBlocks={availableBlocks} onBlockClick={handleBlockDataClick} />
        </motion.div>

        {/* Solution Workshop */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
          <PuzzleDropZone placedBlocks={placedBlocks} onRemoveBlock={handleRemoveBlock} codeOutput={codeOutput} feedback={feedback} />
        </motion.div>

        {/* Expected Output */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }}>
          <ExpectedOutputArea expectedOutput={currentPuzzle?.expectedOutput || "Complete the challenge"} currentOutput={codeOutput || undefined} isCorrect={feedback === 'correct'} showComparison={codeOutput !== null} levelId={levelId} puzzleType={displayLevel?.topic} />
        </motion.div>

        {/* Secure Hint System (Mobile) */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.45
        }}>
          <SecureHintSystem showHint={showHint} showSolution={showSolution} hint={currentPuzzle?.hint || "Try to think about the logical order of operations"} onToggleHint={() => setShowHint(!showHint)} onShowSolution={handleShowSolution} levelDifficulty={displayLevel?.difficulty || 'easy'} currentPuzzle={currentPuzzle} attempts={attempts} />
        </motion.div>
      </div>
    </MobileScrollArea>

    {/* Bottom Action Bar */}
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-purple-200 p-3">
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Button onClick={runCode} disabled={placedBlocks.length === 0} className="bg-blue-600 hover:bg-blue-700 text-white h-12 text-sm font-medium">
          <Play className="w-4 h-4 mr-2" />
          Run Code
        </Button>

        <Button onClick={handleVerifySolution} disabled={placedBlocks.length === 0} className="bg-green-600 hover:bg-green-700 text-white h-12 text-sm font-medium">
          <CheckCircle className="w-4 h-4 mr-2" />
          Check
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={resetPuzzle} variant="outline" className="border-gray-300 hover:bg-gray-50 h-10 text-sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        <Button
          onClick={async () => {
            const basicHint = getHintByType('hint');
            if (basicHint && !isHintPurchased(basicHint)) {
              if (canAffordHint(basicHint)) {
                const success = await purchaseHint(basicHint);
                if (success) {
                  setShowHint(true);
                  toast.success('Hint unlocked!');
                }
              } else {
                // Fallback to just showing the card which will show "Need more hints"
                setShowHint(true);
              }
            } else {
              setShowHint(!showHint);
            }
          }}
          variant="outline"
          className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-10 text-sm"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Hint
        </Button>
      </div>
    </motion.div>
  </div>;
};
export default MobilePuzzleInterface;