
import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('onboarding_completed_v2'); // v2 to ensure fresh onboarding experience
    setHasCompletedOnboarding(completed === 'true');
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed_v2', 'true');
    setHasCompletedOnboarding(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboarding_completed_v2');
    setHasCompletedOnboarding(false);
  };

  const hasSeenFirstPuzzle = () => {
    return localStorage.getItem('first_puzzle_seen') === 'true';
  };

  const markFirstPuzzleSeen = () => {
    localStorage.setItem('first_puzzle_seen', 'true');
  };

  return {
    hasCompletedOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding,
    hasSeenFirstPuzzle,
    markFirstPuzzleSeen
  };
};
