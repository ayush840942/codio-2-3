
export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy': return 'text-green-600 bg-green-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'hard': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getHintCost = (difficulty: 'easy' | 'medium' | 'hard') => {
  return difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 8;
};

export const getSolutionCost = (difficulty: 'easy' | 'medium' | 'hard') => {
  return difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
};
