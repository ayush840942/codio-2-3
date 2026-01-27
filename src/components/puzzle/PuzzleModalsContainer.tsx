
import React from 'react';
import TheoryModal from './TheoryModal';
import LevelCompleteModal from '@/components/code-result/LevelCompleteModal';
import CelebrationSplash from './CelebrationSplash';

interface PuzzleModalsContainerProps {
  showTheoryModal: boolean;
  onCloseTheoryModal: () => void;
  showLevelCompleteModal: boolean;
  onCloseLevelCompleteModal: () => void;
  showCelebrationSplash: boolean;
  onCloseCelebrationSplash: () => void;
  levelId: number;
  xpReward: number;
  puzzleData: any;
}

const PuzzleModalsContainer: React.FC<PuzzleModalsContainerProps> = ({
  showTheoryModal,
  onCloseTheoryModal,
  showLevelCompleteModal,
  onCloseLevelCompleteModal,
  showCelebrationSplash,
  onCloseCelebrationSplash,
  levelId,
  xpReward,
  puzzleData
}) => {
  // Create a level object from the puzzle data for TheoryModal
  const level = {
    id: levelId,
    title: puzzleData?.title || `Level ${levelId}`,
    description: puzzleData?.description || `Complete Level ${levelId} challenges`,
    topic: puzzleData?.topic || 'Programming',
    difficulty: puzzleData?.difficulty || 'easy' as const,
    puzzleType: puzzleData?.puzzleType || 'drag-drop' as const,
    xpReward: xpReward,
    isCompleted: false,
    isUnlocked: true,
    attempts: 0,
    theory: puzzleData?.theory,
    learningObjectives: puzzleData?.learningObjectives,
    concepts: puzzleData?.concepts,
    practiceHints: puzzleData?.practiceHints
  };

  return (
    <>
      {showTheoryModal && (
        <TheoryModal 
          isOpen={showTheoryModal}
          onClose={onCloseTheoryModal}
          level={level}
          onStartPuzzle={onCloseTheoryModal}
        />
      )}
      
      {showLevelCompleteModal && (
        <LevelCompleteModal 
          show={showLevelCompleteModal}
          xpReward={xpReward}
        />
      )}
      
      <CelebrationSplash
        show={showCelebrationSplash}
        levelId={levelId}
        xpReward={xpReward}
        onComplete={onCloseCelebrationSplash}
      />
    </>
  );
};

export default PuzzleModalsContainer;
