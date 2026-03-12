
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
            title: "Spot the Bug!",
            content: "One of these lines has a tiny mistake. Can you find it?",
            type: 'interactive',
            interactionType: 'spot-the-bug',
            exercise: {
              question: "Find the syntax error in the code below:",
              codeLines: [
                'console.log("Hello");',
                'console.log("Starting level 3)',
                'console.log("Everything looks good!");'
              ],
              buggyLineIndex: 1,
              explanation: "You missed the closing quote after 'level 3'! Every string needs quotes at both ends.",
              type: 'spot-the-bug'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "Look closely at the quotes \" \" around the text!"
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
            title: "Fix the Order!",
            content: "The computer needs instructions in a specific order. Can you fix this variable setup?",
            type: 'interactive',
            interactionType: 'drag-to-order',
            exercise: {
              question: "Rearrange the lines to correctly create a variable and then print it:",
              codeLines: [
                'let score = 100;',
                'console.log("Your score is:");',
                'console.log(score);'
              ],
              explanation: "First we define the 'score' box, then we print the label, and finally we print the value inside the box!",
              type: 'drag-to-order'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "Variables must be created (let) before they can be used!"
          },
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
            title: "Quick Quiz!",
            content: "How do we tell the computer to only do something IF a condition is true?",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "Which keyword do we use for making decisions?",
              options: ["check", "if", "when"],
              correctAnswer: "if",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "It's a very short 2-letter word!"
          },
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

    // Level 16-20: Repeating Actions
    if (levelId >= 16 && levelId <= 20) {
      const loopLevel = levelId - 15;
      return {
        title: `Level ${levelId}: ${loopLevel === 1 ? 'Intro to Loops' : 'Mastering Loops'}`,
        topic: currentTopic.topic,
        icon: Zap,
        introduction: "Computers never get tired! Loops let you repeat the same action thousands of times with just a few lines of code.",
        pages: [
          {
            title: "Quick Check!",
            content: "What do we use to repeat code multiple times?",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "Which keyword is commonly used for repeating actions?",
              options: ["repeat", "for", "again"],
              correctAnswer: "for",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "It's a 3-letter word that starts with 'f'!"
          },
          {
            title: "The For Loop",
            content: "A 'for' loop tells the computer exactly how many times to repeat something. It's like saying 'For each number from 1 to 5, clap your hands!'",
            concepts: [
              {
                name: "Loop Basics",
                description: "Loops repeat a block of code until a condition is met.",
                example: 'for (let i = 0; i < 3; i++) {\n  console.log("Hello!");\n}',
                tips: ["i is the counter variable", "i < 3 tells it when to stop", "i++ adds 1 each time"]
              }
            ],
            visualExample: 'for (let i = 0; i < 3; i++) {\n  console.log("Repeat!");\n}\n// Output:\n// Repeat!\n// Repeat!\n// Repeat!',
            practiceHint: "Think of loops as an automated way to do repetitive tasks."
          }
        ],
        summary: "Amazing! You've learned about loops. Now you can make your programs perform repetitive tasks with ease!",
        objectives: ["Understand for loops", "Repeat actions automatically"],
        learningObjectives: ["Explain how a loop works", "Write a basic loop"]
      };
    }

    // Level 21-25: Text Manipulation
    if (levelId >= 21 && levelId <= 25) {
      return {
        title: `Level ${levelId}: String Magic`,
        topic: currentTopic.topic,
        icon: Star,
        introduction: "Strings are how we work with text. Let's learn to join them together and create dynamic messages!",
        pages: [
          {
            title: "Quick Check!",
            content: "How do we join two pieces of text together?",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "Which symbol do we use to 'add' two strings together?",
              options: ["&", "+", "->"],
              correctAnswer: "+",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "It's the same symbol we use for adding numbers!"
          },
          {
            title: "Joining Strings",
            content: "Joining strings is called 'concatenation'. It allows you to build sentences from variables and fixed text.",
            concepts: [
              {
                name: "Concatenation",
                description: "Using the + operator to join strings.",
                example: 'let greeting = "Hi " + name;',
                tips: ["Don't forget to include spaces", "You can join many strings at once"]
              }
            ],
            visualExample: 'let user = "Dev";\nconsole.log("Hello, " + user + "!");\n// Output: Hello, Dev!',
            practiceHint: "Always check your spaces when joining text!"
          }
        ],
        summary: "Great job! You can now manipulate text and build dynamic messages in your programs.",
        objectives: ["Understand strings", "Use string concatenation"],
        learningObjectives: ["Create and use string variables", "Join strings with +"]
      };
    }

    // Level 26-30: Math Operations
    if (levelId >= 26 && levelId <= 30) {
      return {
        title: `Level ${levelId}: Number Crunching`,
        topic: currentTopic.topic,
        icon: Target,
        introduction: "Computers are basically super-fast calculators. Let's learn how to do math with code!",
        pages: [
          {
            title: "Quick Check!",
            content: "What is the result of 5 + 5 in code?",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "If we run console.log(5 + 5), what will we see?",
              options: ["55", "10", "5 + 5"],
              correctAnswer: "10",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "Code calculates the result before showing it!"
          }
        ],
        summary: "You're a math whiz! You've learned how to perform calculations and store results in your programs.",
        objectives: ["Use math operators", "Perform calculations"],
        learningObjectives: ["Understand +, -, *, /", "Calculate results in variables"]
      };
    }

    // Level 31-35: Functions
    if (levelId >= 31 && levelId <= 35) {
      return {
        title: `Level ${levelId}: Introduction to Functions`,
        topic: currentTopic.topic,
        icon: Zap,
        introduction: "Functions are like recipes. You define them once and can 'cook' (run) them whenever you need!",
        pages: [
          {
            title: "Quick Quiz!",
            content: "What do we use to group code into a reusable block?",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "Which keyword starts a function definition?",
              options: ["recipe", "def", "function"],
              correctAnswer: "function",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "It's a longer word that starts with 'f'!"
          },
          {
            title: "The Function Recipe",
            content: "A function has a name and a body of code. When you call its name, the code inside runs.",
            concepts: [
              {
                name: "Function Structure",
                description: "Defining a function with the function keyword.",
                example: 'function sayHi() {\n  console.log("Hi!");\n}',
                tips: ["Use parentheses () after the name", "The code goes inside curly braces {}"]
              }
            ],
            visualExample: 'function greet() {\n  console.log("Hello!");\n}\ngreet(); // This runs the code!',
            practiceHint: "Remember to call the function after defining it!"
          }
        ],
        summary: "Incredible! You've learned functions - the most powerful way to organize and reuse your code.",
        objectives: ["Understand functions", "Define and call functions"],
        learningObjectives: ["Explain why functions are useful", "Write a simple function"]
      };
    }

    // Level 36-40: Lists and Arrays
    if (levelId >= 36 && levelId <= 40) {
      return {
        title: `Level ${levelId}: Storing Lists`,
        topic: currentTopic.topic,
        icon: Star,
        introduction: "Sometimes one variable isn't enough. Arrays let you store a whole list of items in one place!",
        pages: [
          {
            title: "Quick Check!",
            content: "How do we store a list of names like ['Alex', 'Sam', 'Jo']?",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "What are these list containers called?",
              options: ["groups", "arrays", "stacks"],
              correctAnswer: "arrays",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "Think of an 'array' of choices!"
          }
        ],
        summary: "Great! You can now manage lists of data efficiently using arrays.",
        objectives: ["Understand arrays", "Store multiple values"],
        learningObjectives: ["Create an array", "Access items in a list"]
      };
    }

    // Level 41-45: User Input
    if (levelId >= 41 && levelId <= 45) {
      return {
        title: `Level ${levelId}: Interactive Apps`,
        topic: currentTopic.topic,
        icon: Lightbulb,
        introduction: "Now for the fun part - getting information back from your users!",
        pages: [
          {
            title: "Quick Quiz!",
            content: "To make an app interactive, we need to get ____ from the user.",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "What is information provided by the user called?",
              options: ["output", "input", "data"],
              correctAnswer: "input",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "You give something 'in' to the program."
          }
        ],
        summary: "You're building real apps now! You've learned how to make your programs interact with users.",
        objectives: ["Understand user input", "Enable interaction"],
        learningObjectives: ["Explain input vs output", "Design interactive flows"]
      };
    }

    // Level 46-50: HTML Basics
    if (levelId >= 46 && levelId <= 50) {
      return {
        title: `Level ${levelId}: Building Webpages`,
        topic: currentTopic.topic,
        icon: Code,
        introduction: "Let's learn HTML - the language that defines every website you've ever visited!",
        pages: [
          {
            title: "Quick Check!",
            content: "Which tag do we use for the main heading of a page?",
            type: 'interactive',
            interactionType: 'multiple-choice',
            exercise: {
              question: "What is the standard tag for a primary heading?",
              options: ["<h1>", "<head>", "<text>"],
              correctAnswer: "<h1>",
              type: 'multiple-choice'
            },
            concepts: [],
            visualExample: "",
            practiceHint: "It stands for 'Heading 1'."
          }
        ],
        summary: "You're a web developer! You've started your journey into building the modern web.",
        objectives: ["Understand HTML tags", "Structure content"],
        learningObjectives: ["Use basic HTML tags", "Explain what HTML does"]
      };
    }

    // Default content for other levels
  };

  return getDetailedContent();
};
