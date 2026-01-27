
// This file exports all level categories
import { PuzzleLevel } from '@/context/GameContext';
import { basicLevels } from './basicLevels';
import { htmlLevels } from './htmlLevels';
import { cssLevels } from './cssLevels';
import { javascriptLevels } from './javascriptLevels';
import { reactLevels } from './reactLevels';
import { databaseLevels } from './databaseLevels';
import { dataStructuresLevels } from './dataStructuresLevels';
import { algorithmsLevels } from './algorithmsLevels';
import { backendLevels } from './backendLevels';
import { webDevelopmentLevels } from './webDevelopmentLevels';
import { testingLevels } from './testingLevels';
import { frameworkLevels } from './frameworkLevels';
import { mobileLevels } from './mobileLevels';
import { devOpsLevels } from './devOpsLevels';
import { securityLevels } from './securityLevels';
import { performanceLevels } from './performanceLevels';
import { aiMLLevels } from './aiMLLevels';
import { masteryLevels } from './masteryLevels';
import { advancedLevels } from './advancedLevels';
// New language levels
import { cppLevels } from './cppLevels';
import { csharpLevels } from './csharpLevels';
import { dartLevels } from './dartLevels';
import { pythonLevels } from './pythonLevels';
import { typescriptLevels } from './typescriptLevels';
import { goLevels } from './goLevels';
import { kotlinLevels } from './kotlinLevels';
import { swiftLevels } from './swiftLevels';

// Combine all levels and export them in progressive order (1-280)
const allLevels = [
  ...basicLevels,        // 1-6: Programming Fundamentals
  ...htmlLevels,         // 7-11: HTML Basics
  ...cssLevels,          // 12-16: CSS Styling
  ...javascriptLevels,   // 17-21: JavaScript Fundamentals
  ...reactLevels,        // 22-26: React Basics
  ...pythonLevels,       // 27-36: Python Programming
  ...typescriptLevels,   // 37-46: TypeScript
  ...cppLevels,          // 47-56: C++ Programming
  ...csharpLevels,       // 57-66: C# Programming
  ...dartLevels,         // 67-76: Dart & Flutter
  ...goLevels,           // 77-86: Go Programming
  ...kotlinLevels,       // 87-96: Kotlin Programming
  ...swiftLevels,        // 97-106: Swift Programming
  ...advancedLevels,     // 107-121: Advanced Concepts
  ...databaseLevels,     // 122-124: Database Fundamentals
  ...dataStructuresLevels, // 125-137: Data Structures
  ...algorithmsLevels,   // 138-142: Algorithms
  ...webDevelopmentLevels, // 143-147: Web Development
  ...testingLevels,      // 148-151: Testing
  ...frameworkLevels,    // 152-156: Other Frameworks
  ...mobileLevels,       // 157-161: Mobile Development
  ...devOpsLevels,       // 162-166: DevOps & Infrastructure
  ...securityLevels,     // 167-171: Security
  ...performanceLevels,  // 172-176: Performance Optimization
  ...aiMLLevels,         // 177-181: AI/ML
  ...masteryLevels,      // 182-280: Master Level Challenges
  ...backendLevels       // Remaining backend concepts
];

// Create proper sequential levels from 1 to 280
export const initialLevels: PuzzleLevel[] = allLevels
  .map((level, index) => ({
    ...level,
    id: index + 1, // Ensure sequential IDs
    isUnlocked: index === 0, // Only first level unlocked initially
    isCompleted: false,
    topic: level.topic || 'Programming' // Ensure all levels have a topic
  }))
  .slice(0, 280); // Ensure we have all levels

console.log('Total levels loaded:', initialLevels.length);
console.log('Language topics:', [...new Set(initialLevels.map(l => l.topic))]);
