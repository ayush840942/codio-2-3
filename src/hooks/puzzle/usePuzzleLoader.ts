
import { useEffect } from 'react';
import { getPuzzleData } from '@/utils/puzzleUtils';
import { toast } from 'sonner';
import { PuzzleBlockData } from '@/components/PuzzleBlock';

interface PuzzleStateSetters {
  setCurrentPuzzle: (puzzle: any) => void;
  setAvailableBlocks: (blocks: PuzzleBlockData[]) => void;
  setPlacedBlocks: (blocks: PuzzleBlockData[]) => void;
  setFeedback: (feedback: 'correct' | 'incorrect' | null) => void;
  setShowSolution: (show: boolean) => void;
  setShowHint: (show: boolean) => void;
  setAttempts: (attempts: number) => void;
  setShowCelebration: (show: boolean) => void;
  setCodeOutput: (output: string | null) => void;
  setConsoleOutput: (output: string) => void;
  setCodeError?: (err: string | null) => void;
}

export const usePuzzleLoader = (levelIdNum: number, setters: PuzzleStateSetters) => {
  const {
    setCurrentPuzzle,
    setAvailableBlocks,
    setPlacedBlocks,
    setFeedback,
    setShowSolution,
    setShowHint,
    setAttempts,
    setShowCelebration,
    setCodeOutput,
    setConsoleOutput,
    setCodeError,
  } = setters;

  useEffect(() => {
    try {
      console.log(`Loading puzzle data for level ${levelIdNum}`);

      const puzzle = getPuzzleData(levelIdNum);

      if (!puzzle) {
        console.error(`No puzzle data found for level ${levelIdNum}`);
        setCurrentPuzzle(null);
        setAvailableBlocks([]);
        toast.error(`No puzzle found for level ${levelIdNum}`);
        return;
      }

      console.log(`Puzzle loaded for level ${levelIdNum}:`, puzzle);
      setCurrentPuzzle(puzzle);

      const blocks = puzzle.blocks || [];
      const formattedBlocks: PuzzleBlockData[] = blocks.map((block: any, index: number) => ({
        id: block.id || `block-${index}`,
        content: block.content || block.text || block,
        type: block.type || 'code',
        isCorrect: block.isCorrect !== undefined ? block.isCorrect : true,
        isPlaced: false
      }));

      if (formattedBlocks.length > 0) {
        // Shuffle blocks for better UX
        const shuffledBlocks = [...formattedBlocks].sort(() => Math.random() - 0.5);
        setAvailableBlocks(shuffledBlocks);
        console.log(`Loaded ${shuffledBlocks.length} blocks for level ${levelIdNum}`);
      } else {
        console.warn('No puzzle blocks found for level:', levelIdNum);
        // Create a fallback block
        const fallbackBlocks: PuzzleBlockData[] = [{
          id: `fallback-${levelIdNum}`,
          content: `// Level ${levelIdNum} code block`,
          type: 'code',
          isCorrect: true,
          isPlaced: false
        }];
        setAvailableBlocks(fallbackBlocks);
      }

      // Reset all state
      setPlacedBlocks([]);
      setFeedback(null);
      setShowSolution(false);
      setShowHint(false);
      setAttempts(0);
      setShowCelebration(false);
      setCodeOutput(null);
      setConsoleOutput("");
      setCodeError?.(null); // Clear AI fixer error when navigating to a new level

    } catch (error) {
      console.error('Error loading puzzle data:', error);
      toast.error(`Failed to load puzzle for level ${levelIdNum}`);

      // Set fallback state
      setCurrentPuzzle({
        id: levelIdNum,
        title: `Level ${levelIdNum}`,
        description: `Puzzle for level ${levelIdNum}`,
        expectedOutput: "Hello World",
        hints: ["Try to arrange the code blocks correctly."],
        blocks: []
      });
      setAvailableBlocks([]);
    }
  }, [
    levelIdNum,
    setCurrentPuzzle,
    setAvailableBlocks,
    setPlacedBlocks,
    setFeedback,
    setShowSolution,
    setShowHint,
    setAttempts,
    setShowCelebration,
    setCodeOutput,
    setConsoleOutput
  ]);
};
