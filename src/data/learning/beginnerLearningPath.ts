
import { LevelLearningContent } from './types';
import { Code, BookOpen, Zap, Target, Star, Lightbulb } from 'lucide-react';

export const createBeginnerLearningContent = (levelId: number): LevelLearningContent => {
  const beginnerTopics = [
    // Levels 1-10: Absolute Basics
    { range: [1, 5], topic: "First Steps in Programming", focus: "Getting comfortable with code" },
    { range: [6, 10], topic: "Variables and Data", focus: "Storing and using information" },
    
    // Levels 11-20: Building Blocks
    { range: [11, 15], topic: "Making Decisions", focus: "If statements and conditions" },
    { range: [16, 20], topic: "Repeating Actions", focus: "Loops and repetition" },
    
    // Levels 21-30: Working with Text and Numbers
    { range: [21, 25], topic: "Text Manipulation", focus: "Working with strings" },
    { range: [26, 30], topic: "Math Operations", focus: "Numbers and calculations" },
    
    // Levels 31-40: Organizing Code
    { range: [31, 35], topic: "Functions Basics", focus: "Creating reusable code" },
    { range: [36, 40], topic: "Lists and Arrays", focus: "Storing multiple items" },
    
    // Levels 41-50: Interactive Programming
    { range: [41, 45], topic: "User Input", focus: "Getting information from users" },
    { range: [46, 50], topic: "Basic Web Elements", focus: "HTML fundamentals" }
  ];

  const currentTopic = beginnerTopics.find(t => 
    levelId >= t.range[0] && levelId <= t.range[1]
  ) || beginnerTopics[0];

  const getDetailedContent = (): LevelLearningContent => {
    // Level 1-5: First Steps
    if (levelId >= 1 && levelId <= 5) {
      return {
        title: `Level ${levelId}: Your First ${levelId === 1 ? 'Program' : 'Steps'}`,
        topic: currentTopic.topic,
        icon: BookOpen,
        introduction: levelId === 1 
          ? "Welcome to programming! Let's write your very first line of code and see what happens."
          : `Great job reaching level ${levelId}! Let's build on what you've learned and explore more programming basics.`,
        pages: [
          {
            title: "What is Programming?",
            content: levelId === 1 
              ? "Programming is like giving instructions to a computer. Just like you might tell a friend how to make a sandwich, you tell the computer what to do step by step.\n\nDon't worry if this feels new - everyone starts here! We'll go slowly and explain everything." 
              : "You're getting the hang of programming! Remember, each line of code is an instruction for the computer to follow.",
            concepts: [
              {
                name: levelId === 1 ? "console.log()" : "Text Output",
                description: levelId === 1 
                  ? "This command displays messages on the screen. Think of it as the computer's way of talking to you!"
                  : "We use console.log() to show text and results. It's like the computer showing you its work.",
                example: levelId === 1 ? 'console.log("Hello, World!");' : `console.log("Level ${levelId} complete!");`,
                tips: levelId === 1 
                  ? ["Always use quotes around text", "End each line with a semicolon ;", "Copy the example exactly to start"]
                  : ["You can display numbers without quotes", "Text needs quotes, numbers don't", "Try changing the message!"]
              }
            ],
            visualExample: levelId === 1 
              ? 'console.log("Hello, World!");\n// This will show: Hello, World!'
              : `console.log("Welcome to level ${levelId}!");\n// Output: Welcome to level ${levelId}!`,
            practiceHint: levelId === 1 
              ? "Try typing the example exactly as shown. Don't worry about understanding everything yet!"
              : "Try displaying your own message. What would you like to say?"
          },
          {
            title: levelId === 1 ? "Understanding the Screen" : "Reading Code",
            content: levelId === 1 
              ? "When you run your code, you'll see the result appear below. This is called 'output' - it's what your program produces.\n\nThe black area where text appears is called the 'console'. Think of it as your program's notepad where it writes down results."
              : "Let's learn to read code like a story. Each line happens one after another, from top to bottom.\n\nWhen you see console.log(), think 'show this message'. The computer reads your code and follows your instructions exactly.",
            concepts: [
              {
                name: levelId === 1 ? "Output" : "Code Flow",
                description: levelId === 1 
                  ? "The text that appears when your program runs. It's how you see what your code is doing."
                  : "Code runs from top to bottom, one line at a time. Like reading a book!",
                example: levelId === 1 
                  ? 'console.log("This appears first");\nconsole.log("This appears second");'
                  : `console.log("Step 1");\nconsole.log("Step 2");\nconsole.log("Step 3");`,
                tips: levelId === 1 
                  ? ["The output appears in order", "Each console.log creates a new line", "Watch how the text appears"]
                  : ["First line runs first", "Second line runs second", "Order matters in programming"]
              }
            ],
            visualExample: levelId === 1 
              ? 'console.log("First line");\nconsole.log("Second line");\n// Output:\n// First line\n// Second line'
              : `console.log("Starting...");\nconsole.log("Working...");\nconsole.log("Done!");\n// Shows each message in order`,
            practiceHint: levelId === 1 
              ? "Try adding a second console.log() line. What happens?"
              : "Create a sequence of messages that tell a short story!"
          }
        ],
        summary: levelId === 1 
          ? "🎉 Congratulations! You just wrote your first program! You learned how to use console.log() to display messages. This is the foundation of all programming - giving clear instructions to the computer."
          : `Excellent work on level ${levelId}! You're building confidence with console.log() and understanding how code flows from top to bottom. You're becoming a programmer!`,
        objectives: levelId === 1 
          ? ["Write your first line of code", "Understand what console.log() does", "See how programs produce output", "Feel comfortable with the basics"]
          : [`Master console.log() with confidence`, "Understand code flows top to bottom", "Create multiple output lines", "Build programming intuition"],
        learningObjectives: levelId === 1 
          ? ["Successfully run your first program", "Understand the relationship between code and output"]
          : ["Confidently use console.log()", "Predict what code will output before running it"]
      };
    }

    // Level 6-10: Variables and Data
    if (levelId >= 6 && levelId <= 10) {
      const variableLevel = levelId - 5;
      return {
        title: `Level ${levelId}: ${variableLevel === 1 ? 'Meet Variables' : 'Working with Variables'}`,
        topic: currentTopic.topic,
        icon: Code,
        introduction: variableLevel === 1 
          ? "Now we'll learn about variables - they're like labeled boxes where you can store information and use it later!"
          : `Let's explore more ways to use variables. You're doing great at level ${levelId}!`,
        pages: [
          {
            title: variableLevel === 1 ? "What are Variables?" : "Variable Practice",
            content: variableLevel === 1 
              ? "A variable is like a box with a label on it. You can put something inside (like a number or text), and then use that box later by calling its name.\n\nFor example, if you have a box labeled 'age' and put the number 25 inside, you can use 'age' anywhere in your code and it means 25."
              : "Variables make your code flexible and reusable. Instead of typing the same value over and over, you store it once and use it everywhere!",
            concepts: [
              {
                name: variableLevel === 1 ? "Creating Variables" : "Using Variables",
                description: variableLevel === 1 
                  ? "Use 'let' to create a variable, give it a name, and assign it a value with ="
                  : "Once you create a variable, you can use its name anywhere you'd use the actual value",
                example: variableLevel === 1 
                  ? 'let name = "Alex";\nconsole.log(name);'
                  : `let score = ${levelId * 10};\nconsole.log("Your score is: " + score);`,
                tips: variableLevel === 1 
                  ? ["Choose clear, descriptive names", "Use let to create new variables", "The = sign assigns values"]
                  : ["Variables can be used multiple times", "You can combine variables with text", "Variable names can't have spaces"]
              }
            ],
            visualExample: variableLevel === 1 
              ? 'let greeting = "Hello!";\nconsole.log(greeting);\n// Output: Hello!'
              : `let playerName = "Hero";\nlet level = ${levelId};\nconsole.log(playerName + " reached level " + level);`,
            practiceHint: variableLevel === 1 
              ? "Try creating a variable with your own name and displaying it!"
              : "Create variables for different pieces of information and combine them!"
          }
        ],
        summary: `Great job on level ${levelId}! You're mastering variables - one of the most important concepts in programming. Variables let you store and reuse information, making your code more powerful and flexible.`,
        objectives: [
          variableLevel === 1 ? "Understand what variables are" : "Use variables confidently",
          variableLevel === 1 ? "Create your first variable" : "Combine variables with text",
          "See how variables make code flexible",
          "Practice with meaningful variable names"
        ],
        learningObjectives: [
          "Successfully create and use variables",
          "Understand the relationship between variable names and values"
        ]
      };
    }

    // Level 11-15: Making Decisions
    if (levelId >= 11 && levelId <= 15) {
      const decisionLevel = levelId - 10;
      return {
        title: `Level ${levelId}: ${decisionLevel === 1 ? 'Your First Decision' : 'Smart Decisions'}`,
        topic: currentTopic.topic,
        icon: Target,
        introduction: decisionLevel === 1 
          ? "Time to make your programs smart! We'll learn how to make decisions with 'if' statements - like teaching your code to think!"
          : `Let's make even smarter decisions at level ${levelId}! Your programming skills are really growing.`,
        pages: [
          {
            title: decisionLevel === 1 ? "If Statements" : "Advanced Decisions",
            content: decisionLevel === 1 
              ? "An 'if' statement is like asking a question: 'If something is true, then do this.' It's how we make our programs respond to different situations.\n\nThink of it like a traffic light: IF the light is green, THEN you go. IF it's red, THEN you stop."
              : "You can make complex decisions by combining conditions and handling multiple scenarios. This makes your programs really intelligent!",
            concepts: [
              {
                name: decisionLevel === 1 ? "Basic If Statements" : "Complex Conditions",
                description: decisionLevel === 1 
                  ? "Use 'if' to check a condition. If it's true, the code inside runs. If it's false, it's skipped."
                  : "You can check multiple conditions and handle different cases with else if and else.",
                example: decisionLevel === 1 
                  ? `let age = ${15 + levelId};\nif (age >= 18) {\n  console.log("You can vote!");\n}`
                  : `let score = ${levelId * 20};\nif (score >= 90) {\n  console.log("Excellent!");\n} else if (score >= 70) {\n  console.log("Good job!");\n} else {\n  console.log("Keep practicing!");\n}`,
                tips: decisionLevel === 1 
                  ? ["Use curly braces { } around the code to run", "The condition goes in parentheses ( )", ">= means 'greater than or equal to'"]
                  : ["else if lets you check more conditions", "else catches everything else", "You can have many else if statements"]
              }
            ],
            visualExample: decisionLevel === 1 
              ? `let weather = "sunny";\nif (weather === "sunny") {\n  console.log("Perfect day for a picnic!");\n}\n// Output: Perfect day for a picnic!`
              : `let level = ${levelId};\nif (level <= 5) {\n  console.log("Beginner");\n} else if (level <= 15) {\n  console.log("Learning fast!");\n} else {\n  console.log("Advanced!");\n}`,
            practiceHint: decisionLevel === 1 
              ? "Try changing the age value and see how the output changes!"
              : "Create a program that gives different messages based on different conditions!"
          }
        ],
        summary: `Fantastic work on level ${levelId}! You're learning to make your programs intelligent with conditional logic. If statements are like giving your code a brain - now it can make decisions!`,
        objectives: [
          decisionLevel === 1 ? "Understand how if statements work" : "Master complex conditions",
          decisionLevel === 1 ? "Write your first conditional code" : "Use else if and else effectively",
          "Make programs respond to different inputs",
          "Think logically about program flow"
        ],
        learningObjectives: [
          "Successfully implement conditional logic",
          "Understand how programs can make decisions"
        ]
      };
    }

    // Default content for other levels
    return {
      title: `Level ${levelId}: Programming Fundamentals`,
      topic: currentTopic?.topic || "Programming Basics",
      icon: Lightbulb,
      introduction: `Welcome to level ${levelId}! Let's continue building your programming skills with hands-on practice.`,
      pages: [
        {
          title: "Core Concepts",
          content: `At this level, we're focusing on ${currentTopic?.focus || 'essential programming concepts'}. Each challenge builds on what you've learned before.`,
          concepts: [
            {
              name: "Programming Logic",
              description: "Understanding how to break down problems into step-by-step solutions",
              example: `// Level ${levelId} example\nconsole.log("Working on level ${levelId}!");`,
              tips: ["Practice regularly", "Build on previous knowledge", "Don't be afraid to experiment"]
            }
          ],
          visualExample: `// This is level ${levelId}\nconsole.log("Great progress!");`,
          practiceHint: "Apply what you've learned in creative ways!"
        }
      ],
      summary: `Excellent work completing level ${levelId}! You're building strong programming fundamentals.`,
      objectives: [
        "Master core programming concepts",
        "Apply knowledge practically",
        "Build problem-solving skills"
      ],
      learningObjectives: [
        "Successfully complete programming challenges",
        "Demonstrate understanding of key concepts"
      ]
    };
  };

  return getDetailedContent();
};
