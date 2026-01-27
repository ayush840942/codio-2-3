
import { PuzzleLevel } from '@/types/game';

export const databaseLevels: PuzzleLevel[] = [
  {
    id: 42,
    title: "SQL Query Master",
    description: "Write complex SQL queries to extract meaningful data insights",
    difficulty: "medium",
    topic: "Database",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 45,
    attempts: 0
  },
  {
    id: 43,
    title: "Database Relationship Architect",
    description: "Design and implement complex database relationships and joins",
    difficulty: "hard",
    topic: "Database",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "drag-drop",
    xpReward: 55,
    attempts: 0
  },
  {
    id: 44,
    title: "NoSQL Database Expert",
    description: "Master document-based databases and advanced NoSQL operations",
    difficulty: "hard",
    topic: "Database",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 60,
    attempts: 0
  }
];
