
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useRewards } from '@/context/RewardsContext';
import { PuzzleBlockData } from '@/components/PuzzleBlock';

interface SolutionState {
  currentPuzzle: any;
  availableBlocks: PuzzleBlockData[];
}

interface SolutionSetters {
  setShowSolution: (show: boolean) => void;
  setAvailableBlocks: (blocks: PuzzleBlockData[]) => void;
  setPlacedBlocks: (blocks: PuzzleBlockData[]) => void;
  setFeedback: (feedback: 'correct' | 'incorrect' | null) => void;
  resetPuzzleState: (blocks: PuzzleBlockData[]) => void;
  setShowCelebration: (show: boolean) => void;
  setAttempts: (attempts: number) => void;
}

export const usePuzzleSolution = (
  solutionState: SolutionState,
  solutionSetters: SolutionSetters
) => {
  const handleShowSolution = useCallback(() => {
    try {
      toast.info('Solution revealed! Use this to learn and try again.');
      if (solutionState.currentPuzzle?.solutionBlocks && solutionState.currentPuzzle.solutionBlocks.length > 0) {
        solutionSetters.setShowSolution(true);
        solutionSetters.setPlacedBlocks(solutionState.currentPuzzle.solutionBlocks);
      } else if (solutionState.currentPuzzle?.blocks && solutionState.currentPuzzle.blocks.length > 0) {
        // Fallback: use the puzzle's defined blocks as the correct solution order
        solutionSetters.setShowSolution(true);
        solutionSetters.setPlacedBlocks(solutionState.currentPuzzle.blocks);
      } else {
        // Fallback: show available blocks as solution if no solution blocks defined
        solutionSetters.setShowSolution(true);
        console.warn('No solution blocks defined for puzzle, showing available blocks as fallback');
      }
    } catch (error) {
      console.error('Error showing solution:', error);
      toast.error('Failed to show solution. Please try again.');
    }
  }, [solutionState.currentPuzzle, solutionSetters]);

  const resetPuzzle = useCallback(() => {
    try {
      solutionSetters.setFeedback(null);
      solutionSetters.setAttempts(0);
      solutionSetters.setShowCelebration(false);
      solutionSetters.setShowSolution(false);
      solutionSetters.setPlacedBlocks([]);
      
      const resetBlocks = solutionState.currentPuzzle?.availableBlocks || solutionState.availableBlocks;
      if (resetBlocks && resetBlocks.length > 0) {
        solutionSetters.setAvailableBlocks(resetBlocks.map((block: any) => ({
          ...block,
          isPlaced: false
        })));
      }
      
      toast.info('Puzzle reset. Try again!');
    } catch (error) {
      console.error('Error resetting puzzle:', error);
      toast.error('Failed to reset puzzle. Please refresh the page.');
    }
  }, [solutionState, solutionSetters]);

  return { handleShowSolution, resetPuzzle };
};
