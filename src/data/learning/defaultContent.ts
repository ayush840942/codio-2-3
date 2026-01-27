
import { LearningConcept, LearningPage, LevelLearningContent } from './types';
import { Code } from 'lucide-react';

export const defaultConcepts: LearningConcept[] = [
  {
    name: "Variables",
    description: "Learn how to store and use data in your programs",
    example: "let message = 'Hello World';",
    tips: [
      "Use descriptive names for variables",
      "Choose the right data type for your needs"
    ]
  },
  {
    name: "Functions",
    description: "Reusable blocks of code that perform specific tasks",
    example: "function greet(name) { return 'Hello ' + name; }",
    tips: [
      "Keep functions focused on one task",
      "Use clear, descriptive function names"
    ]
  }
];

export const defaultPages: LearningPage[] = [
  {
    title: "Introduction",
    content: "Welcome to this coding concept! In this lesson, you'll learn fundamental programming principles.",
    concepts: [
      {
        name: "Basic Syntax",
        description: "Understanding the structure and rules of code",
        example: "console.log('Hello, World!');",
        tips: [
          "Pay attention to semicolons and brackets",
          "Indentation makes code more readable"
        ]
      },
      {
        name: "Problem Solving",
        description: "Breaking down complex problems into smaller steps",
        example: "// Step 1: Understand the problem\n// Step 2: Plan your approach\n// Step 3: Write the code",
        tips: [
          "Start with simple cases",
          "Test your code frequently"
        ]
      }
    ],
    visualExample: "Think of programming like writing a recipe - you need clear, step-by-step instructions.",
    practiceHint: "Try modifying the examples to see how they work!"
  },
  {
    title: "Core Concepts",
    content: "Let's dive deeper into the fundamental concepts you'll need to master.",
    concepts: [
      {
        name: "Data Types",
        description: "Different kinds of data you can work with",
        example: "let number = 42;\nlet text = 'Hello';\nlet isTrue = true;",
        tips: [
          "Numbers are for calculations",
          "Strings are for text",
          "Booleans are true or false"
        ]
      },
      {
        name: "Control Flow",
        description: "Making decisions and repeating actions in code",
        example: "if (age >= 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}",
        tips: [
          "Use if statements for decisions",
          "Loops help repeat actions",
          "Conditions should be clear and simple"
        ]
      }
    ],
    visualExample: "Code flows like a river - it can split, loop, and merge based on conditions.",
    practiceHint: "Practice with different conditions and see how the flow changes."
  }
];

export const defaultLearningContent: LevelLearningContent = {
  title: "Programming Fundamentals",
  topic: "General",
  icon: Code,
  introduction: "Programming is like learning a new language - it takes practice and patience, but opens up amazing possibilities!",
  theory: "Programming involves writing instructions that computers can understand and execute. Every program is built from basic building blocks like variables, functions, and control structures.",
  pages: defaultPages,
  summary: "You've learned the essential building blocks of programming! These concepts form the foundation for all coding adventures ahead.",
  objectives: [
    "Understand basic programming syntax",
    "Learn about different data types",
    "Practice with variables and functions",
    "Apply problem-solving skills to coding challenges"
  ]
};
