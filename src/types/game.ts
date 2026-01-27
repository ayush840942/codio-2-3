
export interface PuzzleLevel {
  id: number;
  title: string;
  description: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  puzzleType: 'drag-drop' | 'multiple-choice' | 'code-completion' | 'fill-blank' | 'debug' | 'reorder';
  xpReward: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  attempts?: number;
  theory?: string;
  learningObjectives?: string[];
  concepts?: string[];
  practiceHints?: string[];
}
