
export interface TopicConfig {
  title: string;
  focus: string;
}

export interface LearningConcept {
  name: string;
  description: string;
  example: string;
  tips: string[];
}

export interface LearningExercise {
  question: string;
  starter?: string;
  solution?: string;
  options?: string[];
  correctAnswer?: string;
  type?: 'multiple-choice' | 'fill-in-the-blank' | 'matching' | 'spot-the-bug' | 'drag-to-order';
  // New fields for advanced exercises
  codeLines?: string[];
  buggyLineIndex?: number;
  explanation?: string;
}

export interface LearningPage {
  title: string;
  content: string;
  theory?: string;
  concepts: LearningConcept[];
  visualExample: string;
  practiceHint: string;
  type?: 'concept' | 'example' | 'practice' | 'theory' | 'interactive';
  interactionType?: 'multiple-choice' | 'fill-in-the-blank' | 'matching' | 'code-walkthrough' | 'spot-the-bug' | 'drag-to-order';
  codeExample?: string;
  keyPoints?: string[];
  exercise?: LearningExercise;
  isDetailedConcepts?: boolean;
}

export interface LevelLearningContent {
  title: string;
  topic: string;
  icon: any;
  introduction: string;
  theory?: string;
  pages: LearningPage[];
  summary: string;
  objectives: string[];
  learningObjectives?: string[];
}
