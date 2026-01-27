
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import { PuzzleLevel } from '@/context/GameContext';

interface PuzzleRedirectProps {
  isValidLevelId: boolean;
  levelId: number;
  showCelebration: boolean;
  currentLevel: PuzzleLevel | undefined;
  onLevel10Complete?: () => void;
}

const PuzzleRedirect: React.FC<PuzzleRedirectProps> = ({
  isValidLevelId,
  levelId,
  showCelebration,
  currentLevel,
  onLevel10Complete
}) => {
  const navigate = useNavigate();
  const { canAccessLevel, gameState } = useGame();
  const isSubscribed = gameState.subscription.active;

  // Enhanced auto-redirect to next level after completion
  useEffect(() => {
    if (isValidLevelId && showCelebration && currentLevel?.isCompleted) {
      console.log(`Level ${levelId} completed, setting up auto-redirect...`);

      // Special check for Level 10 completion for free users
      if (levelId === 10 && !isSubscribed && onLevel10Complete) {
        console.log('Level 10 completed by free user, triggering upgrade splash');
        const timer = setTimeout(() => {
          onLevel10Complete();
        }, 2000); // Trigger slightly before the usual redirect
        return () => clearTimeout(timer);
      }

      const timer = setTimeout(() => {
        const nextLevelId = levelId + 1;
        console.log(`Checking next level ${nextLevelId}`);

        if (nextLevelId <= 200) {
          // Always navigate to the next level
          // The Level/Puzzle component itself will handle the access check and show the upgrade prompt
          console.log(`Auto-redirecting to next level ${nextLevelId}`);
          navigate(`/puzzle/${nextLevelId}`, { replace: true });
        } else {
          console.log('All levels completed, redirecting to level map');
          navigate('/levels', { replace: true });
        }
      }, 3500); // 3.5 second delay to enjoy the celebration

      return () => clearTimeout(timer);
    }
  }, [isValidLevelId, levelId, canAccessLevel, isSubscribed, navigate, showCelebration, currentLevel?.isCompleted, onLevel10Complete]);

  return null; // This component only handles side effects
};

export default PuzzleRedirect;
