
export interface LanguageMastery {
  language: string;
  totalLevels: number;
  completedLevels: number;
  masteryPercent: number;
  isMastered: boolean;
  testPassed: boolean;
  testScore?: number;
  testAttempts: number;
  unlockedAt?: string;
  masteredAt?: string;
  icon: string;
  color: string;
  description: string;
}

export interface MasteryTest {
  id: string;
  language: string;
  title: string;
  description: string;
  totalQuestions: number;
  passingScore: number; // Percentage required to pass
  timeLimit: number; // In minutes
  questions: TestQuestion[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'code-output' | 'fill-blank' | 'debug' | 'order' | 'code-write';
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  hint?: string;
  // For code-write type questions
  starterCode?: string;
  expectedOutput?: string;
  testCases?: { input: string; output: string }[];
}

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  language: string;
  score: number;
  totalPoints: number;
  passed: boolean;
  answers: Record<string, string | string[]>;
  startedAt: string;
  completedAt: string;
  timeSpent: number; // In seconds
}

export interface TestResult {
  passed: boolean;
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  improvements: string[];
  certificate?: {
    language: string;
    level: string;
    issuedAt: string;
  };
}

export const LANGUAGE_CONFIG: Record<string, { icon: string; color: string; description: string }> = {
  'HTML': {
    icon: '🌐',
    color: 'from-orange-500 to-red-500',
    description: 'Structure and markup for web pages'
  },
  'CSS': {
    icon: '🎨',
    color: 'from-blue-500 to-purple-500',
    description: 'Styling and visual design for websites'
  },
  'JavaScript': {
    icon: '⚡',
    color: 'from-yellow-400 to-orange-500',
    description: 'Dynamic programming for web applications'
  },
  'Python': {
    icon: '🐍',
    color: 'from-blue-400 to-green-500',
    description: 'Versatile language for AI, data science, and more'
  },
  'TypeScript': {
    icon: '📘',
    color: 'from-blue-600 to-blue-400',
    description: 'Type-safe JavaScript for large applications'
  },
  'C++': {
    icon: '⚙️',
    color: 'from-blue-700 to-indigo-600',
    description: 'High-performance systems programming'
  },
  'C#': {
    icon: '💜',
    color: 'from-purple-600 to-violet-500',
    description: 'Microsoft ecosystem and game development'
  },
  'Dart': {
    icon: '🎯',
    color: 'from-cyan-500 to-blue-500',
    description: 'Flutter mobile and web development'
  },
  'Go': {
    icon: '🚀',
    color: 'from-cyan-400 to-teal-500',
    description: 'Efficient cloud and backend services'
  },
  'Kotlin': {
    icon: '🔷',
    color: 'from-purple-500 to-pink-500',
    description: 'Modern Android development'
  },
  'Swift': {
    icon: '🍎',
    color: 'from-orange-500 to-pink-500',
    description: 'iOS and macOS app development'
  },
  'React': {
    icon: '⚛️',
    color: 'from-cyan-400 to-blue-400',
    description: 'Component-based UI development'
  }
};
