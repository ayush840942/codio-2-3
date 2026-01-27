
import { PuzzleLevel } from '@/types/game';

export const securityLevels: PuzzleLevel[] = [
  {
    id: 86,
    title: "Input Validation",
    description: "Validating user input securely",
    difficulty: "medium",
    topic: "Security",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "fill-blank",
    xpReward: 45,
    attempts: 0
  },
  {
    id: 87,
    title: "SQL Injection Prevention",
    description: "Protecting against SQL injection attacks",
    difficulty: "hard",
    topic: "Security",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "debug",
    xpReward: 60,
    attempts: 0
  },
  {
    id: 88,
    title: "XSS Protection",
    description: "Preventing Cross-Site Scripting attacks",
    difficulty: "hard",
    topic: "Security",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "drag-drop",
    xpReward: 65,
    attempts: 0
  },
  {
    id: 89,
    title: "Encryption Basics",
    description: "Understanding data encryption",
    difficulty: "hard",
    topic: "Security",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "fill-blank",
    xpReward: 70,
    attempts: 0
  },
  {
    id: 90,
    title: "OAuth & JWT",
    description: "Modern authentication protocols",
    difficulty: "hard",
    topic: "Security",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 75,
    attempts: 0
  }
];
