
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getLocalHint } from '@/data/puzzleHintsData';

interface PuzzleHint {
  id: string;
  level_id: number;
  hint_type: 'encouragement' | 'direction' | 'specific' | 'solution';
  content: string;
  cost: number;
  order_index: number;
}

export const usePuzzleHints = (levelId: number) => {
  const [hints, setHints] = useState<PuzzleHint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHints = async () => {
      if (!levelId) return;

      // Load local hints first for offline/fast UI
      const localHints: PuzzleHint[] = [
        { id: `local-${levelId}-e`, level_id: levelId, hint_type: 'encouragement', content: getLocalHint(levelId, 'encouragement') || "Keep going! You're making progress.", cost: 0, order_index: 0 },
        { id: `local-${levelId}-d`, level_id: levelId, hint_type: 'direction', content: getLocalHint(levelId, 'direction') || "Try checking your syntax.", cost: 5, order_index: 1 },
        { id: `local-${levelId}-s`, level_id: levelId, hint_type: 'specific', content: getLocalHint(levelId, 'specific') || "Look closely at the requirement.", cost: 10, order_index: 2 },
        { id: `local-${levelId}-sol`, level_id: levelId, hint_type: 'solution', content: getLocalHint(levelId, 'solution') || "Check the solution documentation.", cost: 20, order_index: 3 },
      ];

      setHints(localHints);
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('puzzle_hints')
          .select('*')
          .eq('level_id', levelId)
          .order('order_index', { ascending: true });

        if (error) {
          console.error('Error fetching puzzle hints (using local fallback):', error);
          return;
        }

        if (data && data.length > 0) {
          // Type assertion to ensure hint_type matches our expected values
          const typedHints = data.map(hint => ({
            ...hint,
            hint_type: hint.hint_type as 'encouragement' | 'direction' | 'specific' | 'solution'
          }));
          setHints(typedHints);
        }
      } catch (error) {
        console.error('Error in fetchHints (using local fallback):', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHints();
  }, [levelId]);

  const getHintByType = (type: PuzzleHint['hint_type']) => {
    return hints.find(hint => hint.hint_type === type);
  };

  const getAvailableHints = (attempts: number) => {
    const availableHints: PuzzleHint[] = [];

    // Always show encouragement hint
    const encouragementHint = getHintByType('encouragement');
    if (encouragementHint) availableHints.push(encouragementHint);

    // Show direction hint after 2 attempts
    if (attempts >= 2) {
      const directionHint = getHintByType('direction');
      if (directionHint) availableHints.push(directionHint);
    }

    // Show specific hint after 4 attempts
    if (attempts >= 4) {
      const specificHint = getHintByType('specific');
      if (specificHint) availableHints.push(specificHint);
    }

    // Show solution hint after 6 attempts
    if (attempts >= 6) {
      const solutionHint = getHintByType('solution');
      if (solutionHint) availableHints.push(solutionHint);
    }

    return availableHints;
  };

  return {
    hints,
    loading,
    getHintByType,
    getAvailableHints
  };
};
