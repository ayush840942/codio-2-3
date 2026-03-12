import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, RotateCcw, Lightbulb, Play, Star, X } from 'lucide-react';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import { Badge } from '@/components/ui/badge';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';
import PuzzleBlock, { PuzzleBlockData } from '@/components/PuzzleBlock';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';
import { HeartsDisplay } from '@/components/hearts/HeartsDisplay';
import { StreakDisplay } from '@/components/streak/StreakDisplay';
import { HeartsShop } from '@/components/hearts/HeartsShop';
import LevelCompleteModal from '@/components/code-result/LevelCompleteModal';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import ProactiveAiTutor from './ProactiveAiTutor';
import MobileHeader from '@/components/MobileHeader';
import InlineAiFixer from '@/components/ai/InlineAiFixer';

interface PuzzleLayoutProps {
  displayLevel: any;
  currentPuzzle: any;
  levelId: number;
  availableBlocks: PuzzleBlockData[];
  placedBlocks: PuzzleBlockData[];
  feedback: 'correct' | 'incorrect' | null;
  showHint: boolean;
  showSolution: boolean;
  attempts: number;
  consoleOutput: string;
  showCelebration: boolean;
  codeOutput: string | null;
  handleBlockDataClick: (block: PuzzleBlockData) => void;
  handleRemoveBlock: (index: number) => void;
  handleVerifySolution: () => void;
  handleShowSolution: () => void;
  resetPuzzle: () => void;
  setShowHint: (show: boolean) => void;
  runCode: () => void;
  codeError?: string | null;
}

const PuzzleLayout: React.FC<PuzzleLayoutProps> = ({
  displayLevel,
  currentPuzzle,
  levelId,
  availableBlocks,
  placedBlocks,
  feedback,
  showHint,
  codeOutput,
  showCelebration,
  handleBlockDataClick,
  handleRemoveBlock,
  handleVerifySolution,
  resetPuzzle,
  setShowHint,
  attempts,
  codeError,
}) => {
  const navigate = useNavigate();
  const { rewards, useHint } = useRewards();
  const { canAccessLevel, getMaxLevels } = useSubscriptionFeatures();
  const [showHeartsShop, setShowHeartsShop] = useState(false);
  const [isLevelCompleteModalOpen, setIsLevelCompleteModalOpen] = useState(false);

  useEffect(() => {
    if (showCelebration) {
      setIsLevelCompleteModalOpen(true);
    }
  }, [showCelebration]);

  const handleNextLevel = () => {
    const nextLevelId = levelId + 1;
    const maxLevels = getMaxLevels();

    if (nextLevelId <= maxLevels && nextLevelId <= 280) {
      if (canAccessLevel(nextLevelId)) {
        navigate(`/puzzle/${nextLevelId}`, { replace: true });
      } else {
        navigate('/subscription', { replace: true });
      }
    } else {
      navigate('/levels', { replace: true });
    }
    setIsLevelCompleteModalOpen(false);
  };

  const handleHintClick = async () => {
    if (showHint) {
      setShowHint(false);
      return;
    }

    // Check if we already have a hint from the puzzle data
    const hasHint = currentPuzzle?.hints?.length > 0 || currentPuzzle?.hint;

    if (!hasHint) {
      toast.error('No hints available for this level yet!');
      return;
    }

    if (rewards.hintPoints < 5) {
      toast.error('You need at least 5 hint points!');
      return;
    }

    const success = await useHint();
    if (success) {
      setShowHint(true);
      toast.success('Hint unlocked! (-5 points)');
    } else {
      toast.error('Failed to use hint point. Please try again.');
    }
  };

  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return { bg: 'bg-pastel-mint', emoji: '🌱' };
      case 'medium': return { bg: 'bg-pastel-yellow', emoji: '⚡' };
      case 'hard': return { bg: 'bg-pastel-pink', emoji: '🔥' };
      default: return { bg: 'bg-pastel-blue', emoji: '📝' };
    }
  };

  const diffInfo = getDifficultyInfo(displayLevel?.difficulty);

  return (
    <div className="min-h-[100dvh] bg-transparent relative font-draw">
      {/* Unified Mobile Header */}
      <MobileHeader
        title={displayLevel?.title || currentPuzzle?.title || "Goal"}
        showBack
        rightElement={
          <div className="flex items-center gap-2">
            <StreakDisplay showLabel={false} />
            <div onClick={() => setShowHeartsShop(true)} className="cursor-pointer">
              <HeartsDisplay showTimer={false} />
            </div>
          </div>
        }
      />

      <HeartsShop
        isOpen={showHeartsShop}
        onClose={() => setShowHeartsShop(false)}
      />

      <MobileScrollArea className="h-screen w-full" style={{ paddingTop: 'calc(var(--safe-area-top) + 3.5rem)' }}>
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-6 pb-20">
          {/* Level Header Container */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <DrawnCard className={diffInfo.bg}>
              <div className="flex flex-col items-center text-center">
                <motion.div className="text-5xl mb-3" animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}>
                  {diffInfo.emoji}
                </motion.div>
                <h1 className="text-3xl font-black mb-2 text-black leading-none">
                  {displayLevel?.title || currentPuzzle?.title || "Goal"}
                </h1>
                <div className="flex gap-2">
                  <Badge className="bg-white border-2 border-black text-black font-bold">{displayLevel?.topic}</Badge>
                  <Badge className="bg-pastel-yellow border-2 border-black text-black font-bold">+{displayLevel?.xpReward} XP</Badge>
                </div>
              </div>
            </DrawnCard>
          </motion.div>

          {/* Instructions */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <DrawnCard className="bg-white py-4 px-6 relative">
              <div className="absolute -top-3 -left-2 bg-black text-white px-3 py-1 text-xs font-bold rounded-lg rotate-[-4deg]">MISSION</div>
              <p className="text-xl font-bold text-black leading-tight">
                {currentPuzzle?.description || "Build the code correctly!"}
              </p>
            </DrawnCard>
          </motion.div>

          {/* Hint Card */}
          <AnimatePresence>
            {showHint && (currentPuzzle?.hint || (currentPuzzle?.hints && currentPuzzle.hints.length > 0)) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="relative z-20"
              >
                <DrawnCard className="bg-pastel-yellow py-4 px-6 relative border-dashed">
                  <div className="absolute -top-3 -right-2 bg-black text-white px-3 py-1 text-xs font-bold rounded-lg rotate-[4deg] flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" /> HINT
                  </div>
                  <p className="text-lg font-bold text-black leading-tight italic">
                    "{currentPuzzle.hints?.[0] || currentPuzzle.hint}"
                  </p>
                </DrawnCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Workspace Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">📋</span> Solution
              </h3>
              <DrawnButton variant="accent" onClick={resetPuzzle} className="h-10 px-4 text-sm bg-pastel-pink">
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </DrawnButton>
            </div>

            <div className={`min-h-[150px] rounded-3xl border-3 border-dashed transition-all p-4 ${feedback === 'correct' ? 'border-black bg-pastel-mint shadow-inner' :
              feedback === 'incorrect' ? 'border-black bg-pastel-pink shadow-inner' :
                'border-black/20 bg-black/5 shadow-inner'
              }`}>
              {placedBlocks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-10 opacity-30">
                  <p className="text-lg font-bold">DROP BLOCKS HERE</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {placedBlocks.map((block, index) => (
                    <motion.div key={`placed-${index}`} initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={() => handleRemoveBlock(index)} className="cursor-pointer">
                      <PuzzleBlock block={block} isInSolution />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Inventory Area */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <span className="text-2xl">⚡</span> Inventory
            </h3>
            <DrawnCard className="bg-white/50 backdrop-blur-sm border-dashed border-black/30">
              <div className="flex flex-wrap gap-2">
                {availableBlocks.map((block, index) => (
                  <motion.div key={`inv-${index}`} whileTap={{ scale: 0.9 }} onClick={() => handleBlockDataClick(block)} className="cursor-pointer">
                    <PuzzleBlock block={block} />
                  </motion.div>
                ))}
              </div>
            </DrawnCard>
          </div>

          {/* Actions Bottom Bar */}
          <div className="flex gap-4 pt-4">
            {feedback === 'correct' ? (
              <DrawnButton
                onClick={() => setIsLevelCompleteModalOpen(true)}
                className="flex-1 h-16 text-xl bg-cc-yellow animate-pulse"
              >
                <div className="flex items-center justify-center gap-2">
                  CLAIM REWARDS <Star className="w-6 h-6 fill-black" />
                </div>
              </DrawnButton>
            ) : (
              <>
                <DrawnButton variant="accent" onClick={handleHintClick} className="flex-1 h-16 text-xl bg-pastel-yellow">
                  <Lightbulb className="w-6 h-6 mr-2" /> Hint ({rewards?.hintPoints || 0})
                </DrawnButton>
                <DrawnButton onClick={handleVerifySolution} disabled={placedBlocks.length === 0} className="flex-1 h-16 text-xl bg-pastel-mint">
                  <Play className="w-6 h-6 mr-2" /> Check
                </DrawnButton>
              </>
            )}
          </div>

          {/* New Code Output Display */}
          <AnimatePresence>
            {codeOutput !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6"
              >
                <div className="px-2 mb-2">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-2xl">💻</span> Output
                  </h3>
                </div>
                <DrawnCard className="bg-slate-900 border-3 border-black p-4 font-mono text-green-400">
                  <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-[10px] text-white/40 uppercase ml-2 tracking-widest">Execution Terminal</span>
                  </div>
                  <pre className="whitespace-pre-wrap break-all text-lg leading-tight">
                    {`> Running code...\n${codeOutput}`}
                  </pre>
                </DrawnCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Pair Programmer — Inline Error Fixer */}
          <AnimatePresence>
            {feedback === 'incorrect' && !!codeError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-2"
              >
                <InlineAiFixer
                  error={codeError}
                  currentCode={placedBlocks.map(b => b.content).join('\n')}
                  isVisible={feedback === 'incorrect' && !!codeError}
                  onApplyFix={(fixedCode) => {
                    // Flash a toast — applying AI fix resets and re-runs
                    const newBlocks = placedBlocks.map((b, i) => ({
                      ...b,
                      content: fixedCode.split('\n')[i] ?? b.content
                    }));
                    resetPuzzle();
                  }}
                  onClose={() => { }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MobileScrollArea>

      {/* Overlays */}
      <LevelCompleteModal
        show={isLevelCompleteModalOpen}
        xpReward={displayLevel?.xpReward || 50}
        onNextLevel={handleNextLevel}
      />

      <AnimatePresence>
        {feedback === 'incorrect' && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-10 left-6 right-6 z-50">
            <div className="bg-pastel-pink border-4 border-black p-6 rounded-3xl shadow-comic flex items-center gap-4">
              <div className="text-4xl rotate-12">🤔</div>
              <div>
                <h4 className="text-2xl font-black">OH OH!</h4>
                <p className="text-lg font-bold">Something is out of order. Try again!</p>
              </div>
              <DrawnButton variant="outlined" onClick={() => resetPuzzle()} className="ml-auto bg-white p-2">
                <RotateCcw />
              </DrawnButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProactiveAiTutor
        attempts={attempts}
        feedback={feedback}
        puzzle={currentPuzzle}
        showHint={showHint}
        onShowHint={handleHintClick}
      />
    </div>
  );
};

export default PuzzleLayout;