
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';
import PuzzleErrorState from '@/components/puzzle/PuzzleErrorState';
import PuzzleValidation from '@/components/puzzle/PuzzleValidation';
import PuzzleRedirect from '@/components/puzzle/PuzzleRedirect';
import PuzzleLayout from '@/components/puzzle/PuzzleLayout';
import MimoStyleLearning from '@/components/puzzle/MimoStyleLearning';
import { usePuzzle } from '@/hooks/usePuzzle';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { SignInRequired } from '@/components/auth/SignInRequired';
import PremiumUpgradeSplash from '@/components/premium/PremiumUpgradeSplash';
import { motion, AnimatePresence } from 'framer-motion';
import { getLevelConfig } from '@/utils/levelManifest';

const Puzzle = () => {
  const params = useParams();
  const isMobile = useIsMobile();
  const [showLearning, setShowLearning] = useState(true);
  const [showUpgradeSplash, setShowUpgradeSplash] = useState(false);

  // Extract and validate the ID parameter
  const rawId = params.id || params.levelId || params.level;
  console.log('Puzzle component - All URL params:', params);
  console.log('Puzzle component - Raw ID value:', rawId);

  // Validate the ID
  const isValidRawId = rawId && rawId !== 'undefined' && rawId !== 'null' && String(rawId).trim() !== '';
  const idString = isValidRawId ? String(rawId).trim() : '1';
  const levelId = parseInt(idString, 10);
  const isValidLevelId = !isNaN(levelId) && levelId >= 1 && levelId <= 280;

  console.log('Parsed level ID:', levelId);
  console.log('Is valid level ID:', isValidLevelId);

  const { canAccessLevel } = useSubscriptionFeatures();

  // Call the puzzle hook with validated ID - MUST be top-level
  const {
    currentLevel,
    currentPuzzle,
    availableBlocks,
    placedBlocks,
    feedback,
    showHint,
    showSolution,
    attempts,
    consoleOutput,
    showCelebration,
    codeOutput,
    codeError,
    handleBlockDataClick,
    handleRemoveBlock,
    handleVerifySolution,
    handleShowSolution,
    resetPuzzle,
    setShowHint,
    runCode
  } = usePuzzle(isValidLevelId ? idString : '1');

  useEffect(() => {
    // When the level changes, show learning content first
    setShowLearning(true);
    setShowUpgradeSplash(false);
  }, [idString]);

  // Check if user has access to this level
  if (!isValidLevelId || !canAccessLevel(levelId)) {
    return <SignInRequired feature={`Level ${levelId}`} isUpgrade={true} />;
  }


  const handleStartPuzzle = () => {
    setShowLearning(false);
  };

  // If no currentLevel but we have puzzle data, create a fallback level
  const { topic: levelTopic, difficulty: levelDifficulty } = getLevelConfig(levelId);
  const displayLevel = currentLevel || {
    id: levelId,
    title: `Level ${levelId}`,
    description: `Coding Challenge Level ${levelId}`,
    topic: levelTopic,
    difficulty: levelDifficulty,
    puzzleType: 'drag-drop' as const,
    xpReward: 50 + (levelId * 5),
    isCompleted: false,
    isUnlocked: true
  };

  // helper functions replaced by manifest
  const { topic, difficulty } = getLevelConfig(levelId);

  return (
    <div className={`${isMobile ? 'android-fullscreen keyboard-adjust overflow-x-hidden' : 'android-fullscreen keyboard-adjust'} w-full max-w-full`}>
      <PremiumUpgradeSplash
        isOpen={showUpgradeSplash}
        onClose={() => setShowUpgradeSplash(false)}
        onUpgrade={() => setShowUpgradeSplash(false)}
      />

      <AnimatePresence mode="wait">
        {showLearning ? (
          <motion.div
            key="learning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <MimoStyleLearning
              levelId={levelId}
              onStartPuzzle={handleStartPuzzle}
            />
          </motion.div>
        ) : (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <PuzzleValidation
              rawId={rawId}
              levelId={levelId}
              isValidRawId={isValidRawId}
              isValidLevelId={isValidLevelId}
              idString={idString}
            >
              <PuzzleRedirect
                isValidLevelId={isValidLevelId}
                levelId={levelId}
                showCelebration={showCelebration}
                currentLevel={currentLevel}
                onLevel10Complete={() => setShowUpgradeSplash(true)}
              />

              {!currentPuzzle ? (
                <PuzzleErrorState title="Loading Puzzle..." message={`Loading puzzle data for level ${levelId}. Please wait...`} />
              ) : (
                <div className={`touch-manipulation mobile-scroll android-scroll overflow-x-hidden w-full max-w-full ${isMobile ? 'px-0' : ''}`}>
                  <PuzzleLayout
                    displayLevel={displayLevel}
                    currentPuzzle={currentPuzzle}
                    levelId={levelId}
                    availableBlocks={availableBlocks}
                    placedBlocks={placedBlocks}
                    feedback={feedback}
                    showHint={showHint}
                    showSolution={showSolution}
                    attempts={attempts}
                    consoleOutput={consoleOutput}
                    showCelebration={showCelebration}
                    codeOutput={codeOutput}
                    codeError={codeError}
                    handleBlockDataClick={handleBlockDataClick}
                    handleRemoveBlock={handleRemoveBlock}
                    handleVerifySolution={handleVerifySolution}
                    handleShowSolution={handleShowSolution}
                    resetPuzzle={resetPuzzle}
                    setShowHint={setShowHint}
                    runCode={runCode}
                  />
                </div>
              )}
            </PuzzleValidation>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Puzzle;
