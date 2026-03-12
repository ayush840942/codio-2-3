
import { useState, useEffect } from 'react';
import { useRewards } from '@/context/RewardsContext';
import { useAuth } from '@/context/AuthContext';
import { generatePuzzleHints, getDifficultyBasedHint } from '@/utils/puzzleHintGenerator';
import { sanitizeCodeBlock } from '@/utils/inputValidation';
import { toast } from 'sonner';

export interface UnifiedHint {
  id: string;
  type: 'hint' | 'solution';
  content: string;
  cost: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const useUnifiedHints = (levelId: number, difficulty: 'easy' | 'medium' | 'hard', currentPuzzle?: any, attempts: number = 0) => {
  const { user, isSubscribed, subscriptionTier } = useAuth();
  const { rewards, useHints } = useRewards();
  const [purchasedHints, setPurchasedHints] = useState<Set<string>>(new Set());

  // Load purchased hints from localStorage on mount
  useEffect(() => {
    if (user?.id) {
      const storageKey = `purchased_hints_${user.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setPurchasedHints(new Set(parsed));
          }
        } catch (e) {
          console.error('Error parsing purchased hints:', e);
        }
      }
    }
  }, [user?.id]);

  // Save purchased hints to localStorage whenever they change
  useEffect(() => {
    if (user?.id && purchasedHints.size > 0) {
      const storageKey = `purchased_hints_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(Array.from(purchasedHints)));
    }
  }, [purchasedHints, user?.id]);

  const getHintCost = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Hints now cost 5 hint points
    return 5;
  };

  const getSolutionCost = (difficulty: 'easy' | 'medium' | 'hard') => {
    return difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 12;
  };

  const generateUnifiedHints = (): UnifiedHint[] => {
    const hints: UnifiedHint[] = [];

    try {
      // Generate puzzle-specific hints
      const puzzleHints = generatePuzzleHints(currentPuzzle);

      // Enhanced hint content based on level and puzzle
      let hintContent = puzzleHints.hint;
      let solutionContent = puzzleHints.solution;

      // Add level-specific context
      if (currentPuzzle) {
        const topic = currentPuzzle.topic || 'Programming';
        const description = currentPuzzle.description || '';

        if (topic.toLowerCase().includes('html')) {
          hintContent = `HTML Structure Hint: ${hintContent}\n\nRemember: HTML elements need opening and closing tags. Think about the structure: <tag>content</tag>`;
        } else if (topic.toLowerCase().includes('css')) {
          hintContent = `CSS Styling Hint: ${hintContent}\n\nRemember: CSS syntax is selector { property: value; }. Pay attention to selectors and property names.`;
        } else if (topic.toLowerCase().includes('javascript')) {
          hintContent = `JavaScript Logic Hint: ${hintContent}\n\nRemember: JavaScript is case-sensitive. Check your syntax, semicolons, and variable names.`;
        } else if (topic.toLowerCase().includes('react')) {
          hintContent = `React Component Hint: ${hintContent}\n\nRemember: React components return JSX. Make sure your JSX is properly structured.`;
        }

        // Add attempts-based additional hints
        if (attempts > 2) {
          hintContent += `\n\nYou've tried ${attempts} times. Take a step back and read the problem description again.`;
        }

        if (attempts > 4) {
          hintContent += `\n\nStill stuck? Try arranging the blocks in the exact order shown in the description.`;
        }
      }

      // Create the hint object
      hints.push({
        id: `hint-${levelId}`,
        type: 'hint',
        content: sanitizeCodeBlock(hintContent),
        cost: getHintCost(difficulty),
        difficulty
      });

      // Enhanced solution content
      if (currentPuzzle && currentPuzzle.blocks) {
        const solutionBlocks = currentPuzzle.blocks.map((block: any) => block.content).join('\n');
        solutionContent = `Complete Solution for Level ${levelId}:\n\n${solutionBlocks}\n\nExpected Output: ${currentPuzzle.expectedOutput || 'Check the description'}`;
      }

      hints.push({
        id: `solution-${levelId}`,
        type: 'solution',
        content: sanitizeCodeBlock(solutionContent),
        cost: getSolutionCost(difficulty),
        difficulty
      });

      return hints;
    } catch (error) {
      console.error('Error generating hints:', error);

      // Fallback hints if generation fails
      return [
        {
          id: `hint-${levelId}`,
          type: 'hint',
          content: getDifficultyBasedHint(difficulty, attempts),
          cost: getHintCost(difficulty),
          difficulty
        },
        {
          id: `solution-${levelId}`,
          type: 'solution',
          content: "Solution not available for this level. Try working through the puzzle step by step.",
          cost: getSolutionCost(difficulty),
          difficulty
        }
      ];
    }
  };

  const hints = generateUnifiedHints();

  const isPremium = isSubscribed || subscriptionTier === 'trial' || subscriptionTier === 'pro' || subscriptionTier === 'elite' || subscriptionTier === 'premium-monthly' || subscriptionTier === 'premium-yearly';

  const canAffordHint = (hint: UnifiedHint): boolean => {
    if (isPremium) return true;
    return (rewards.hintPoints || 0) >= hint.cost;
  };

  const purchaseHint = async (hint: UnifiedHint): Promise<boolean> => {
    if (purchasedHints.has(hint.id)) {
      return true; // Already purchased
    }

    if (!canAffordHint(hint)) {
      toast.error('Not enough points! Grab more in the Shop 💎');
      return false;
    }

    try {
      // useHints handles the logic of deduction (skips if premium)
      const success = await useHints(hint.cost);
      if (success) {
        setPurchasedHints(prev => new Set([...prev, hint.id]));
        return true;
      }
    } catch (error) {
      console.error('Error purchasing hint:', error);
    }

    return false;
  };

  const isHintPurchased = (hint: UnifiedHint): boolean => {
    return purchasedHints.has(hint.id);
  };

  const getHintById = (id: string): UnifiedHint | undefined => {
    return hints.find(hint => hint.id === id);
  };

  const getHintByType = (type: 'hint' | 'solution'): UnifiedHint | undefined => {
    return hints.find(hint => hint.type === type);
  };

  return {
    hints,
    canAffordHint,
    purchaseHint,
    isHintPurchased,
    getHintById,
    getHintByType,
    hintPoints: rewards.hintPoints
  };
};
