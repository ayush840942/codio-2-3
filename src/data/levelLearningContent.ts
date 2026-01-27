
import { LevelLearningContent } from '@/data/learning/types';
import { generateLevelLearningContent } from '@/data/learning/levelLearningContentGenerator';
import { createBeginnerLearningContent } from '@/data/learning/beginnerLearningPath';

// Generate learning content for all levels
export const levelLearningContent: Record<string, LevelLearningContent> = {};

// Generate content for levels 1-200
for (let i = 1; i <= 200; i++) {
  // Use detailed beginner content for levels 1-50
  if (i <= 50) {
    levelLearningContent[i.toString()] = createBeginnerLearningContent(i);
  } else {
    // Use generated content for advanced levels
    levelLearningContent[i.toString()] = generateLevelLearningContent(i);
  }
}

// Default fallback content
levelLearningContent.default = {
  title: "Programming Fundamentals",
  topic: "Programming Fundamentals",
  icon: () => null,
  introduction: "Learn the basics of programming with hands-on practice.",
  pages: [
    {
      title: "Getting Started",
      content: "Welcome to your programming journey! Let's start with the basics.",
      concepts: [
        {
          name: "console.log()",
          description: "Display messages in the console",
          example: 'console.log("Hello World");',
          tips: ["Always end statements with semicolon", "Use quotes for text"]
        }
      ],
      visualExample: 'console.log("Hello World");\n// Output: Hello World',
      practiceHint: "Try displaying your own message!"
    }
  ],
  summary: "You've learned the foundation of programming!",
  objectives: ["Understand basic programming concepts", "Write your first code"],
  learningObjectives: ["Successfully run your first program"]
};

console.log(`Generated detailed beginner-friendly learning content for all 200 levels with enhanced beginner path for levels 1-50`);
