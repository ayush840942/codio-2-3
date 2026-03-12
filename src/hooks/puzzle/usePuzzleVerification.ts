
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import { useHearts } from '@/context/HeartsContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useInterstitialAd } from '@/hooks/useInterstitialAd';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { executeCode, validateBlockArrangement } from '@/utils/codeExecutor';
import { toast } from 'sonner';
import { PuzzleBlockData } from '@/components/PuzzleBlock';

interface PuzzleVerificationState {
  currentPuzzle: any;
  placedBlocks: PuzzleBlockData[];
  levelIdNum: number;
}

interface PuzzleVerificationSetters {
  setCodeOutput: (output: string | null) => void;
  setConsoleOutput: (output: string) => void;
  setFeedback: (feedback: 'correct' | 'incorrect' | null) => void;
  setShowCelebration: (show: boolean) => void;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
  setCodeError?: (err: string | null) => void;
}

export const usePuzzleVerification = (
  state: PuzzleVerificationState,
  setters: PuzzleVerificationSetters
) => {
  const { gameState, completeLevel } = useGame();
  const { hearts, canPlay, loseHeart } = useHearts();
  const { canAccessLevel, getMaxLevels } = useSubscriptionFeatures();
  const navigate = useNavigate();
  const { playSuccess, playError, playRunCode, playLevelComplete } = useSoundEffects();
  const { showInterstitial } = useInterstitialAd();

  const { currentPuzzle, placedBlocks, levelIdNum } = state;
  const { setCodeOutput, setConsoleOutput, setFeedback, setShowCelebration, setAttempts, setCodeError } = setters;

  const currentLevel = gameState.levels.find(level => level.id === levelIdNum);

  const runCode = useCallback(async () => {
    try {
      if (!currentPuzzle) {
        playError();
        toast.error("No puzzle loaded!");
        return;
      }
      if (!placedBlocks || placedBlocks.length === 0) {
        playError();
        toast.error("Please arrange some code blocks first!");
        return;
      }

      playRunCode();

      // Validate block arrangement first
      const expectedBlocks = currentPuzzle.blocks || [];
      const validation = validateBlockArrangement(placedBlocks, expectedBlocks);

      if (!validation.isValid) {
        playError();
        toast.error(validation.message);
        setFeedback('incorrect');
        return;
      }

      const { output, isCorrect, error } = await executeCode(placedBlocks, currentPuzzle.expectedOutput);
      const outputString = String(output || "No output produced");

      setCodeOutput(outputString);
      setConsoleOutput(outputString);

      if (isCorrect) {
        playSuccess();
        toast.success("🎉 Perfect! Your code produces the correct output!");
        setFeedback('correct');
        setCodeError?.(null);
      } else {
        playError();
        const errorMessage = error || `Your output "${outputString}" doesn't match the expected output`;
        toast.error(errorMessage);
        setFeedback('incorrect');
        setCodeError?.(errorMessage);
      }
    } catch (error) {
      console.error('Error running code:', error);
      playError();
      toast.error("Error executing code. Please check your solution.");
      setCodeOutput("Error executing code");
      setConsoleOutput("Error executing code");
      setFeedback('incorrect');
    }
  }, [currentPuzzle, placedBlocks, playError, playRunCode, playSuccess, setCodeOutput, setConsoleOutput, setFeedback]);

  const handleVerifySolution = useCallback(async () => {
    try {
      // Check if player has hearts
      if (!canPlay) {
        playError();
        toast.error("❤️ No hearts left! Wait for refill or purchase more with XP.");
        return;
      }

      if (!currentPuzzle || !currentLevel) {
        playError();
        toast.error("No puzzle loaded!");
        return;
      }
      if (!placedBlocks || placedBlocks.length === 0) {
        playError();
        toast.error("Please arrange some code blocks first!");
        return;
      }

      setAttempts(prev => prev + 1);

      // First validate block arrangement
      const expectedBlocks = currentPuzzle.blocks || [];
      const validation = validateBlockArrangement(placedBlocks, expectedBlocks);

      if (!validation.isValid) {
        playError();
        toast.error(`Block arrangement error: ${validation.message}`);
        setFeedback('incorrect');
        // Lose a heart on incorrect attempt
        loseHeart();
        toast.error(`❤️ Lost 1 heart! ${hearts - 1} remaining.`);
        return;
      }

      // Then execute and check output
      const { output, isCorrect, error } = await executeCode(placedBlocks, currentPuzzle.expectedOutput);
      const outputString = String(output || "No output produced");

      setCodeOutput(outputString);
      setConsoleOutput(outputString);

      if (isCorrect) {
        // Defer audio to prevent main-thread locking during context update
        setTimeout(() => {
          playLevelComplete();
        }, 300);

        setFeedback('correct');
        // We no longer setShowCelebration(true) or navigate here
        // The UI will handle showing the output and a "Claim Reward" button

        // Complete the level in state, but don't move away yet
        completeLevel(levelIdNum, 0);
        toast.success(`🎉 Code verified! Well done!`);
        setCodeError?.(null);
      } else {
        setTimeout(() => playError(), 150);
        setFeedback('incorrect');
        const errorMessage = error || "Incorrect solution. Check the order of your blocks and try again!";
        toast.error(errorMessage);
        setCodeError?.(errorMessage);
        // Lose a heart on incorrect attempt
        loseHeart();
        const remainingHearts = hearts - 1;
        if (remainingHearts > 0) {
          toast.error(`❤️ Lost 1 heart! ${remainingHearts} remaining.`);
        } else {
          toast.error("❤️ No hearts left! Wait for refill or purchase more.");
        }
      }
    } catch (error) {
      console.error('Error verifying solution:', error);
      playError();
      setFeedback('incorrect');
      toast.error("Error verifying solution. Please try again.");
      setAttempts(prev => prev + 1);
    }
  }, [
    currentPuzzle,
    currentLevel,
    placedBlocks,
    completeLevel,
    levelIdNum,
    navigate,
    showInterstitial,
    playLevelComplete,
    playError,
    setFeedback,
    setCodeOutput,
    setConsoleOutput,
    canAccessLevel,
    getMaxLevels,
    setAttempts,
    setShowCelebration,
    canPlay,
    hearts,
    loseHeart
  ]);

  return { runCode, handleVerifySolution };
};
