import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Clock, RotateCcw, Lightbulb, Play, CheckCircle2, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';
import PuzzleBlock, { PuzzleBlockData } from '@/components/PuzzleBlock';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';
import { HeartsDisplay } from '@/components/hearts/HeartsDisplay';
import { StreakDisplay } from '@/components/streak/StreakDisplay';
import { HeartsShop } from '@/components/hearts/HeartsShop';
import Logo from '@/components/ui/logo';

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
}

const PuzzleLayout: React.FC<PuzzleLayoutProps> = ({
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
}) => {
  const navigate = useNavigate();
  const { rewards, useHint } = useRewards();
  const [showHeartsShop, setShowHeartsShop] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const handleHintClick = async () => {
    if (showHint) {
      setShowHint(false);
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

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

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
    <div className="min-h-screen bg-background relative">
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {['{ }', '< />', '[ ]'].map((code, i) => (
          <motion.div
            key={i}
            className="absolute text-foreground/5 text-3xl font-mono font-bold"
            style={{ top: `${20 + i * 30}%`, left: i % 2 === 0 ? '5%' : '85%' }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
          >
            {code}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="sticky top-0 z-10 px-4 py-3"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Card className="bg-card border border-border rounded-3xl shadow-md">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/levels')}
                    className="w-10 h-10 rounded-xl bg-pastel-blue border border-border"
                  >
                    <Home className="h-4 w-4 text-foreground" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-xl bg-pastel-mint border border-border"
                  >
                    <ArrowLeft className="h-4 w-4 text-foreground" />
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center gap-2">
                <StreakDisplay showLabel={false} />
                <div onClick={() => setShowHeartsShop(true)} className="cursor-pointer">
                  <HeartsDisplay showTimer={false} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hearts Shop Modal */}
        <HeartsShop
          isOpen={showHeartsShop}
          onClose={() => setShowHeartsShop(false)}
        />
      </motion.div>

      <MobileScrollArea className="h-[calc(100vh-80px)]">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Level Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`${diffInfo.bg} border border-border rounded-3xl shadow-md`}>
              <CardContent className="p-5 text-center">
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {diffInfo.emoji}
                </motion.div>
                <h1 className="text-xl font-bold text-foreground mb-2">
                  {displayLevel?.title || currentPuzzle?.title || "Coding Challenge"}
                </h1>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Badge className="bg-card border border-border text-foreground">
                    {displayLevel?.topic || "Programming"}
                  </Badge>
                  <Badge className="bg-card border border-border text-foreground capitalize">
                    {displayLevel?.difficulty || "easy"}
                  </Badge>
                  <Badge className="bg-card border border-border text-foreground">
                    +{displayLevel?.xpReward || 10} XP ⭐
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card border border-border rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  {currentPuzzle?.description || "Arrange the code blocks in the correct order."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Solution Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span className="text-lg">📋</span>
                Your Solution
              </h3>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetPuzzle}
                  className="h-8 text-xs text-muted-foreground rounded-lg bg-pastel-pink border border-border"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </Button>
              </motion.div>
            </div>

            <Card className={`min-h-28 border-2 border-dashed transition-all duration-300 rounded-2xl ${feedback === 'correct' ? 'border-foreground bg-pastel-mint' :
              feedback === 'incorrect' ? 'border-foreground bg-pastel-pink' :
                'border-border bg-card'
              }`}>
              <CardContent className="p-3">
                {placedBlocks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    👆 Tap blocks below to build your solution
                  </p>
                ) : (
                  <div className="space-y-2">
                    {placedBlocks.map((block, index) => (
                      <motion.div
                        key={`placed-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={() => handleRemoveBlock(index)}
                        className="cursor-pointer group"
                      >
                        <div className="relative">
                          <PuzzleBlock block={block} isInSolution />
                          <motion.div
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-pastel-pink border border-border p-1 rounded-full"
                            whileHover={{ scale: 1.2 }}
                          >
                            <X className="w-3 h-3 text-foreground" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Available Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="text-lg">🧩</span>
              Available Blocks
            </h3>
            <Card className="border border-border rounded-2xl bg-pastel-blue shadow-sm">
              <CardContent className="p-3">
                {availableBlocks.length === 0 ? (
                  <div className="text-center py-4">
                    <CheckCircle2 className="w-8 h-8 text-foreground mx-auto mb-2" />
                    <p className="text-sm text-foreground">All blocks placed ✓</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {availableBlocks.map((block, index) => (
                      <motion.div
                        key={`available-${index}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleBlockDataClick(block)}
                        className="cursor-pointer"
                      >
                        <PuzzleBlock block={block} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Output */}
          {codeOutput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-foreground border border-border rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-card mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-pastel-mint rounded-full animate-pulse" />
                    Output
                  </p>
                  <pre className="text-sm font-mono text-pastel-mint overflow-x-auto">
                    {codeOutput}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            className="flex gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={handleHintClick}
                className="w-full h-12 rounded-full bg-pastel-yellow border border-border text-foreground font-bold study-btn"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Hint ({rewards?.hintPoints || 0}) 💡
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleVerifySolution}
                disabled={placedBlocks.length === 0}
                className="w-full h-12 rounded-full bg-pastel-mint border border-border text-foreground font-bold study-btn"
              >
                <Play className="w-4 h-4 mr-2 fill-foreground" />
                Check ✓
              </Button>
            </motion.div>
          </motion.div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback === 'incorrect' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="bg-pastel-pink border border-border rounded-2xl">
                  <CardContent className="p-4 text-center flex items-center justify-center gap-2">
                    <span className="text-xl">🤔</span>
                    <span className="font-medium text-foreground">Not quite right. Check the order!</span>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint */}
          <AnimatePresence>
            {showHint && currentPuzzle?.hints && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="bg-pastel-yellow border border-border rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">💡</span>
                      </div>
                      <p className="text-sm text-foreground">
                        {Array.isArray(currentPuzzle.hints) ? currentPuzzle.hints[0] : currentPuzzle.hints}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Modal */}
          <AnimatePresence>
            {feedback === 'correct' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <Card className="w-full max-w-sm rounded-3xl shadow-2xl border border-border bg-pastel-mint overflow-hidden">
                    <CardContent className="p-8 text-center space-y-5">
                      {/* Animated icon */}
                      <motion.div
                        className="w-20 h-20 mx-auto bg-card border border-border rounded-3xl flex items-center justify-center"
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-4xl">🎉</span>
                      </motion.div>

                      <div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="text-2xl font-bold text-foreground mb-2">Level Complete!</h3>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center justify-center gap-2 text-foreground"
                        >
                          <Star className="w-5 h-5 fill-foreground" />
                          <span className="font-bold">+{displayLevel?.xpReward || 10} XP</span>
                        </motion.div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => navigate('/levels')}
                            variant="outline"
                            className="w-full h-12 rounded-full bg-card border border-border text-foreground font-bold study-btn"
                          >
                            Back
                          </Button>
                        </motion.div>
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => navigate(`/puzzle/${levelId + 1}`)}
                            className="w-full h-12 rounded-full bg-pastel-yellow border border-border text-foreground font-bold study-btn"
                          >
                            Next Level →
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom padding for mobile nav */}
          <div className="h-24" />
        </div>
      </MobileScrollArea>
    </div>
  );
};

export default PuzzleLayout;