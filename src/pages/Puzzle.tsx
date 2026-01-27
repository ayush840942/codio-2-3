
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';
import PuzzleErrorState from '@/components/puzzle/PuzzleErrorState';
import PuzzleValidation from '@/components/puzzle/PuzzleValidation';
import PuzzleRedirect from '@/components/puzzle/PuzzleRedirect';
import PuzzleLayout from '@/components/puzzle/PuzzleLayout';
import MimoStyleLearning from '@/components/puzzle/MimoStyleLearning';
import LoadingPage from '@/pages/LoadingPage';
import { usePuzzle } from '@/hooks/usePuzzle';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { SignInRequired } from '@/components/auth/SignInRequired';
import PremiumUpgradeSplash from '@/components/premium/PremiumUpgradeSplash';

const Puzzle = () => {
  const params = useParams();
  const isMobile = useIsMobile();
  const [showLearning, setShowLearning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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

  // Check if user has access to this level
  if (!canAccessLevel(levelId)) {
    return <SignInRequired feature={`Level ${levelId}`} isUpgrade={true} />;
  }

  // Call the puzzle hook with validated ID
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
    handleBlockDataClick,
    handleRemoveBlock,
    handleVerifySolution,
    handleShowSolution,
    resetPuzzle,
    setShowHint,
    runCode
  } = usePuzzle(idString);

  useEffect(() => {
    // When the level changes, show learning content first
    setShowLearning(true);
    setShowUpgradeSplash(false);

    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [idString]);

  const handleStartPuzzle = () => {
    setShowLearning(false);
  };

  // If no currentLevel but we have puzzle data, create a fallback level
  const displayLevel = currentLevel || {
    id: levelId,
    title: `Level ${levelId}`,
    description: `Coding Challenge Level ${levelId}`,
    topic: getTopicFromLevel(levelId),
    difficulty: getDifficultyFromLevel(levelId),
    puzzleType: 'drag-drop' as const,
    xpReward: 50 + (levelId * 5),
    isCompleted: false,
    isUnlocked: true
  };

  // Helper functions for topic and difficulty
  function getTopicFromLevel(level: number): string {
    if (level <= 10) return 'HTML';
    if (level <= 20) return 'CSS';
    if (level <= 40) return 'JavaScript';
    if (level <= 50) return 'Python';
    if (level <= 60) return 'TypeScript';
    if (level <= 70) return 'C++';
    if (level <= 80) return 'C#';
    if (level <= 90) return 'Dart';
    if (level <= 100) return 'Go';
    if (level <= 110) return 'Kotlin';
    if (level <= 120) return 'Swift';
    if (level <= 140) return 'React';
    if (level <= 155) return 'OOP';
    if (level <= 170) return 'Database';
    return 'Advanced';
  }

  function getDifficultyFromLevel(level: number): 'easy' | 'medium' | 'hard' {
    if (level <= 50) return 'easy';
    if (level <= 120) return 'medium';
    return 'hard';
  }

  // Show loading screen first
  if (isLoading) {
    return <LoadingPage message={`Loading Level ${levelId}...`} />;
  }

  // Show learning content before puzzle
  if (showLearning) {
    return (
      <div className={`${isMobile ? 'android-fullscreen keyboard-adjust overflow-x-hidden' : 'android-fullscreen keyboard-adjust'} w-full max-w-full`}>
        <MimoStyleLearning
          levelId={levelId}
          onStartPuzzle={handleStartPuzzle}
        />
      </div>
    );
  }

  return (
    <div className={`${isMobile ? 'android-fullscreen keyboard-adjust overflow-x-hidden' : 'android-fullscreen keyboard-adjust'} w-full max-w-full`}>
      <PremiumUpgradeSplash
        isOpen={showUpgradeSplash}
        onClose={() => setShowUpgradeSplash(false)}
        onUpgrade={() => setShowUpgradeSplash(false)}
      />

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
    </div>
  );
};

export default Puzzle;
