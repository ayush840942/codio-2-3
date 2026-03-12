
import { PuzzleLevel } from '@/types/game';

export const basicLevels: PuzzleLevel[] = [
  {
    id: 1,
    title: "What is Programming?",
    description: "Learn the fundamentals of programming and how computers follow instructions",
    difficulty: "easy",
    topic: "Basic Programming",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'code-completion',
    xpReward: 10,
    attempts: 0,
    theory: `Programming is the art of giving instructions to a computer. Just like following a recipe to bake a cake, computers need step-by-step instructions to perform tasks.

Think of programming like writing a very detailed manual:
• Each instruction must be clear and precise
• Instructions are followed in order
• Computers do exactly what you tell them - no more, no less

Programming languages are special languages that humans use to communicate with computers. Popular languages include JavaScript, Python, Java, and many others.

Every app on your phone, every website you visit, and every computer program you use was created through programming!`,
    learningObjectives: [
      "Understand what programming is and why it's important",
      "Learn how computers execute instructions",
      "Recognize that programming is about problem-solving",
      "Get excited about the possibilities of coding"
    ],
    concepts: [
      "Instructions and algorithms",
      "Programming languages",
      "Computer logic",
      "Problem-solving approach"
    ],
    practiceHints: [
      "Think of programming like giving directions to someone who follows them exactly",
      "Start with simple, everyday examples of step-by-step processes",
      "Remember: computers are very literal - they do exactly what you tell them"
    ]
  },
  {
    id: 2,
    title: "Your First Program",
    description: "Write your very first line of code and see it in action",
    difficulty: "easy",
    topic: "Basic Programming",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'code-completion',
    xpReward: 15,
    attempts: 0,
    theory: `Every programmer's journey begins with their first program. Traditionally, this is a program that displays "Hello, World!" on the screen.

Why "Hello, World!"?
• It's simple and easy to understand
• It proves your programming environment is working
• It's a tradition that connects you to millions of other programmers
• It gives you immediate feedback and success

Writing your first program involves:
1. Understanding the syntax (grammar rules) of the programming language
2. Using a command or function to display text
3. Running the program to see the result

This simple program teaches you the basic structure of code and gives you confidence to tackle more complex challenges.`,
    learningObjectives: [
      "Write and run your first program",
      "Understand basic programming syntax",
      "Learn how to display output",
      "Experience the satisfaction of working code"
    ],
    concepts: [
      "Hello World tradition",
      "Programming syntax",
      "Output display",
      "Running programs"
    ],
    practiceHints: [
      "Pay attention to exact spelling and punctuation",
      "Don't worry if it seems simple - every expert started here",
      "Celebrate this milestone - you're now a programmer!"
    ]
  },
  {
    id: 3,
    title: "Understanding Variables",
    description: "Learn how to store and use information in your programs",
    difficulty: "easy",
    topic: "Basic Programming",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'code-completion',
    xpReward: 15,
    attempts: 0,
    theory: `Variables are like labeled boxes where you can store information that your program needs to remember and use.

Think of variables like:
• A box with a label (the variable name)
• Inside the box is a value (number, text, etc.)
• You can look at what's in the box anytime
• You can change what's in the box
• You can use what's in the box for calculations or decisions

Types of information you can store:
• Numbers: age, score, price
• Text: names, messages, addresses  
• True/False values: isLoggedIn, hasPermission

Variables make programs flexible - instead of hardcoding values, you can store them in variables and change them as needed.`,
    learningObjectives: [
      "Understand what variables are and why they're useful",
      "Learn how to create and name variables",
      "Practice storing different types of information",
      "Use variables in simple operations"
    ],
    concepts: [
      "Variable declaration",
      "Data storage",
      "Variable naming",
      "Data types basics"
    ],
    practiceHints: [
      "Choose descriptive names for your variables (age instead of a)",
      "Think of variables as containers with labels",
      "Variables let you reuse and modify values easily"
    ]
  },
  {
    id: 4,
    title: "Working with Numbers",
    description: "Explore how to perform calculations and work with numeric data",
    difficulty: "easy",
    topic: "Basic Programming",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'code-completion',
    xpReward: 15,
    attempts: 0,
    theory: `Computers excel at working with numbers and performing calculations. Programming lets you harness this power for solving real-world problems.

Basic math operations in programming:
• Addition (+): 5 + 3 = 8
• Subtraction (-): 10 - 4 = 6  
• Multiplication (*): 6 * 7 = 42
• Division (/): 15 / 3 = 5

You can use variables in calculations:
• Store numbers in variables
• Perform operations with those variables
• Store results in new variables
• Build complex calculations step by step

Real-world applications:
• Calculating prices and taxes
• Converting units (feet to meters)
• Computing averages and statistics
• Processing financial data`,
    learningObjectives: [
      "Perform basic mathematical operations",
      "Use variables in calculations",
      "Understand operator precedence",
      "Apply math to solve simple problems"
    ],
    concepts: [
      "Arithmetic operators",
      "Mathematical expressions",
      "Order of operations",
      "Numeric calculations"
    ],
    practiceHints: [
      "Remember order of operations: multiplication/division before addition/subtraction",
      "Use parentheses to control calculation order",
      "Test your calculations with simple examples first"
    ]
  },
  {
    id: 5,
    title: "Making Decisions",
    description: "Learn how programs can make choices using conditional logic",
    difficulty: "easy",
    topic: "Basic Programming",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'code-completion',
    xpReward: 20,
    attempts: 0,
    theory: `One of the most powerful features of programming is the ability to make decisions. Programs can examine conditions and choose different actions based on those conditions.

Conditional logic works like everyday decisions:
• "If it's raining, take an umbrella"
• "If the score is above 90, display 'Excellent'"
• "If the user is logged in, show the dashboard"

Basic conditional structure:
• IF a condition is true, do something
• ELSE (optionally), do something different
• You can chain multiple conditions together

Conditions often involve comparisons:
• Equal to (==): age == 18
• Greater than (>): score > 90
• Less than (<): temperature < 32
• Not equal to (!=): status != "error"

This allows programs to be intelligent and responsive to different situations.`,
    learningObjectives: [
      "Understand conditional logic and decision-making",
      "Learn if/else statement structure",
      "Practice writing comparison conditions",
      "Apply conditionals to real scenarios"
    ],
    concepts: [
      "Conditional statements",
      "Boolean logic",
      "Comparison operators",
      "Program flow control"
    ],
    practiceHints: [
      "Think through the logic before writing code",
      "Test both true and false conditions",
      "Use clear, readable condition expressions"
    ]
  }
];
