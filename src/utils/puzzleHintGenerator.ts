
export interface PuzzleHint {
  hint: string;
  solution: string;
}

export const generatePuzzleHints = (puzzle: any): PuzzleHint => {
  if (!puzzle) {
    return {
      hint: "Try to understand what this puzzle is asking you to do. Look at the available blocks and think about how they might fit together.",
      solution: "// No solution available for this puzzle"
    };
  }

  // Generate hints based on puzzle type and content
  const puzzleType = puzzle.type || 'unknown';
  const description = puzzle.description || '';
  const availableBlocks = puzzle.availableBlocks || [];
  const solutionBlocks = puzzle.solutionBlocks || [];

  let hint = "";
  let solution = "";

  // Generate contextual hints based on puzzle content
  if (puzzleType.includes('html') || description.toLowerCase().includes('html')) {
    hint = "Think about HTML structure. Start with opening tags, add content, then close tags. Look for elements like <h1>, <p>, or <div>.";
  } else if (puzzleType.includes('css') || description.toLowerCase().includes('css')) {
    hint = "CSS is about styling. Look for selectors, properties, and values. Remember the syntax: selector { property: value; }";
  } else if (puzzleType.includes('javascript') || description.toLowerCase().includes('javascript')) {
    hint = "JavaScript is about logic and behavior. Look for variables, functions, loops, or conditions. Check the syntax for semicolons and brackets.";
  } else if (puzzleType.includes('react') || description.toLowerCase().includes('react')) {
    hint = "React components need JSX syntax. Look for function components, return statements, and proper JSX elements with closing tags.";
  } else {
    // Generic hint based on available blocks
    if (availableBlocks.length > 0) {
      const blockTypes = availableBlocks.map((block: any) => block.type || block.category).filter(Boolean);
      const uniqueTypes = [...new Set(blockTypes)];
      hint = `You have ${availableBlocks.length} blocks to work with. Focus on ${uniqueTypes.join(', ')} elements. Try arranging them in logical order.`;
    } else {
      hint = "Read the puzzle description carefully. Think about what output is expected and work backwards from there.";
    }
  }

  // Generate solution from solution blocks or provide guidance
  if (solutionBlocks.length > 0) {
    solution = solutionBlocks.map((block: any) => block.content || block.text || block.code).join('\n');
  } else if (availableBlocks.length > 0) {
    // Provide a sample solution structure
    solution = `// Sample solution structure:\n${availableBlocks.map((block: any, index: number) => 
      `// Step ${index + 1}: Use "${block.content || block.text || 'this block'}"`
    ).join('\n')}`;
  } else {
    solution = "// Complete solution would be provided here based on the puzzle requirements";
  }

  return { hint, solution };
};

export const getDifficultyBasedHint = (difficulty: 'easy' | 'medium' | 'hard', attempts: number): string => {
  const baseHints = {
    easy: [
      "Take your time and read the instructions carefully.",
      "Look at the available blocks - they contain everything you need.",
      "Try dragging blocks to the solution area in logical order."
    ],
    medium: [
      "Think about the relationship between different code blocks.",
      "Consider the syntax and structure required for this type of code.",
      "Some blocks might need to be nested inside others."
    ],
    hard: [
      "Break down the problem into smaller steps.",
      "Consider advanced concepts like scope, closure, or component lifecycle.",
      "Think about edge cases and error handling."
    ]
  };

  const hints = baseHints[difficulty];
  const hintIndex = Math.min(attempts - 1, hints.length - 1);
  return hints[Math.max(0, hintIndex)];
};
