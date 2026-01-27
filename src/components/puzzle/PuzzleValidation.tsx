
import React from 'react';
import PuzzleErrorState from './PuzzleErrorState';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';

interface PuzzleValidationProps {
  rawId: string | undefined;
  levelId: number;
  isValidRawId: boolean;
  isValidLevelId: boolean;
  idString: string;
  children: React.ReactNode;
}

const PuzzleValidation: React.FC<PuzzleValidationProps> = ({
  rawId,
  levelId,
  isValidRawId,
  isValidLevelId,
  idString,
  children
}) => {
  const navigate = useNavigate();
  const { canAccessLevel, gameState, isTrialUser, trialDaysRemaining } = useGame();

  // Handle validation and error states
  if (!isValidRawId) {
    console.error('Invalid level ID:', rawId);
    return <PuzzleErrorState title="Invalid Level" message="Level ID is missing or invalid. Please select a valid level." />;
  }

  if (!isValidLevelId) {
    console.error('Invalid level ID number:', levelId, 'from string:', idString);
    return <PuzzleErrorState title="Invalid Level" message={`Level ID must be a valid number between 1 and 200. You provided: ${idString}`} />;
  }

  // Check if user has access to this level
  if (!canAccessLevel(levelId)) {
    const hasSubscription = gameState.subscription.active;
    
    // Handle subscription-specific access
    if (!hasSubscription) {
      // Trial user trying to access beyond level 100
      if (isTrialUser && levelId > 100) {
        return (
          <PuzzleErrorState 
            title="Trial Limit Reached" 
            message={`Free trial users can access up to level 100. You have ${trialDaysRemaining} days remaining in your trial.`}
            buttonText="Upgrade to Premium"
            buttonAction={() => navigate('/subscription')}
          />
        );
      }
      
      // Trial expired - need subscription for any access
      if (!isTrialUser) {
        return (
          <PuzzleErrorState 
            title="Trial Expired" 
            message="Your 7-day free trial has expired. Upgrade to premium to continue accessing all levels!"
            buttonText="Get Premium Access"
            buttonAction={() => navigate('/subscription')}
          />
        );
      }
    }
    
    return <PuzzleErrorState title="Level Locked" message="Complete previous levels to unlock this one." />;
  }

  return <>{children}</>;
};

export default PuzzleValidation;
