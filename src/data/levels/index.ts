
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

// Combine all levels and export them in logical 9-tier progression
const allLevels = [
  // 1. Fundamentals (Absolute Basics)
  ...basicLevels,        // Basic Programming Fundamentals
  ...htmlLevels,         // HTML Basics
  ...cssLevels,          // CSS Styling

  // 2. Core Logic (The "Thinker" Tools)
  ...javascriptLevels,   // JS Fundamentals
  ...pythonLevels,       // Python Basics

  // 3. Modern Stack (Industry Standards)
  ...typescriptLevels,   // TypeScript Logic
  ...reactLevels,        // Modern UI Components

  // 4. Programming Paradigms & Languages (Specialization)
  ...cppLevels,          // Low-level C++
  ...csharpLevels,       // C# & .NET Concepts
  ...dartLevels,         // Dart & Flutter Logic
  ...goLevels,           // Go Backends
  ...kotlinLevels,       // Kotlin Android
  ...swiftLevels,        // Swift iOS

  // 5. Data & Logic (Computer Science Core)
  ...dataStructuresLevels, // Stacks, Queues, etc.
  ...algorithmsLevels,   // Sorting, Searching
  ...databaseLevels,     // SQL & NoSQL Basics

  // 6. Applied Engineering (Real World Apps)
  ...backendLevels,      // APIs & Node.js
  ...webDevelopmentLevels, // Advanced Web
  ...mobileLevels,       // Native Mobile Concepts
  ...testingLevels,      // Unit & Integration Testing

  // 7. Systems & Architecture (The "Senior" Path)
  ...frameworkLevels,    // Angular, Vue, etc.
  ...advancedLevels,     // Complex Logic Concepts
  ...performanceLevels,  // Optimization

  // 8. Future Tech & Security (The Specialized Path)
  ...devOpsLevels,       // CI/CD & Deploy
  ...securityLevels,     // Hashing, Auth, etc.
  ...aiMLLevels,         // Neural Nets & ML Basics

  // 9. Mastery (The Final Boss)
  ...masteryLevels       // Expert Challenges
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
