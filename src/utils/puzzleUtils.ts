
import { generateLevelPuzzle } from './levelPuzzleGenerator';

export const getPuzzleData = (levelId: number) => {
  try {
    console.log(`Generating puzzle data for level ${levelId}`);

    if (levelId < 1 || levelId > 200) {
      console.warn(`Invalid level ID: ${levelId}. Must be between 1 and 200.`);
      return null;
    }

    const puzzle = generateLevelPuzzle(levelId);
    console.log(`Generated puzzle for level ${levelId}:`, puzzle);

    return {
      id: levelId,
      title: puzzle.title,
      description: puzzle.description,
      expectedOutput: puzzle.expectedOutput,
      hints: puzzle.hints,
      blocks: puzzle.blocks,
      topic: puzzle.topic,
      difficulty: levelId <= 50 ? 'easy' : levelId <= 100 ? 'medium' : 'hard',
      solution: puzzle.blocks.map(block => block.content).join('\n')
    };
  } catch (error) {
    console.error(`Error generating puzzle for level ${levelId}:`, error);
    return null;
  }
};

// Legacy function for backwards compatibility
export const getCodingPuzzle = (id: number) => {
  return getPuzzleData(id);
};
