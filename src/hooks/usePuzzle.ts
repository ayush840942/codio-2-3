
import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { usePuzzleStateHandler } from '@/hooks/usePuzzleStateHandler';
import { usePuzzleLoader } from './puzzle/usePuzzleLoader';
import { usePuzzleVerification } from './puzzle/usePuzzleVerification';
import { usePuzzleSolution } from './puzzle/usePuzzleSolution';

export const usePuzzle = (levelId: string) => {
  const { gameState } = useGame();
  
  const [currentPuzzle, setCurrentPuzzle] = useState<any>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const {
    availableBlocks,
    setAvailableBlocks,
    placedBlocks,
    setPlacedBlocks,
    feedback,
    setFeedback,
    codeOutput,
    setCodeOutput,
    consoleOutput,
    setConsoleOutput,
    handleBlockClick,
    handleBlockDataClick,
    handleRemoveBlock,
    resetPuzzleState,
  } = usePuzzleStateHandler();

  const levelIdNum = Number(levelId);
  const currentLevel = gameState.levels.find(level => level.id === levelIdNum);

  usePuzzleLoader(levelIdNum, {
    setCurrentPuzzle, setAvailableBlocks, setPlacedBlocks, setFeedback, 
    setShowSolution, setShowHint, setAttempts, setShowCelebration, 
    setCodeOutput, setConsoleOutput
  });

  const verificationState = { currentPuzzle, placedBlocks, levelIdNum };
  const verificationSetters = { setCodeOutput, setConsoleOutput, setFeedback, setShowCelebration, setAttempts };
  const { runCode, handleVerifySolution } = usePuzzleVerification(verificationState, verificationSetters);
  
  const solutionState = { currentPuzzle, availableBlocks };
  const solutionSetters = { 
    setShowSolution, setAvailableBlocks, setPlacedBlocks, setFeedback, 
    resetPuzzleState, setShowCelebration, setAttempts 
  };
  const { handleShowSolution, resetPuzzle } = usePuzzleSolution(solutionState, solutionSetters);

  return {
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
    handleBlockClick,
    handleBlockDataClick,
    handleRemoveBlock,
    handleVerifySolution,
    handleShowSolution,
    resetPuzzle,
    setShowHint,
    runCode,
  };
};
