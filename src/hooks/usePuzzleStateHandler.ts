
import { useState, useCallback } from 'react';
import { PuzzleBlockData } from '@/components/PuzzleBlock';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export const usePuzzleStateHandler = () => {
  const { playBlockPlace, playBlockRemove } = useSoundEffects();
  const [availableBlocks, setAvailableBlocks] = useState<PuzzleBlockData[]>([]);
  const [placedBlocks, setPlacedBlocks] = useState<PuzzleBlockData[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string>("");

  const handleBlockClick = useCallback((blockId: string) => {
    try {
      const block = availableBlocks.find(b => b.id === blockId);
      if (!block) {
        console.error(`Block with id ${blockId} not found`);
        return;
      }

      if (block.isPlaced) {
        playBlockRemove();
        setPlacedBlocks(prev => prev.filter(b => b.id !== blockId));
        setAvailableBlocks(prev => prev.map(b =>
          b.id === blockId ? { ...b, isPlaced: false } : b
        ));
      } else {
        playBlockPlace();
        setPlacedBlocks(prev => [...prev, { ...block, isPlaced: true }]);
        setAvailableBlocks(prev => prev.map(b =>
          b.id === blockId ? { ...b, isPlaced: true } : b
        ));
      }

      setFeedback(null);
      setCodeOutput(null);
    } catch (error) {
      console.error('Error handling block click:', error);
    }
  }, [availableBlocks, playBlockPlace, playBlockRemove]);

  const handleBlockDataClick = useCallback((block: PuzzleBlockData) => {
    if (!block || !block.id) {
      console.error('Invalid block data:', block);
      return;
    }
    handleBlockClick(block.id);
  }, [handleBlockClick]);

  const handleRemoveBlock = useCallback((index: number) => {
    try {
      if (index < 0 || index >= placedBlocks.length) {
        console.error(`Invalid block index: ${index}`);
        return;
      }

      const blockToRemove = placedBlocks[index];
      if (blockToRemove) {
        playBlockRemove();
        setPlacedBlocks(prev => prev.filter((_, i) => i !== index));
        setAvailableBlocks(prev => prev.map(block =>
          block.id === blockToRemove.id ? { ...block, isPlaced: false } : block
        ));

        setFeedback(null);
        setCodeOutput(null);
      }
    } catch (error) {
      console.error('Error removing block:', error);
    }
  }, [placedBlocks, playBlockRemove]);

  const resetPuzzleState = useCallback((resetBlocks: PuzzleBlockData[]) => {
    try {
      setPlacedBlocks([]);
      setAvailableBlocks(resetBlocks || []);
      setFeedback(null);
      setCodeOutput(null);
      setConsoleOutput("");
    } catch (error) {
      console.error('Error resetting puzzle state:', error);
    }
  }, []);

  return {
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
  };
};
