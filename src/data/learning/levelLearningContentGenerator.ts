
import { LevelLearningContent, LearningPage, LearningConcept } from './types';
import { generateLevelPuzzle } from '@/utils/levelPuzzleGenerator';
import { FileText, Palette, Zap, Layers, Cpu, Database, Rocket, Code, Terminal, Lightbulb } from 'lucide-react';

const getTopicIcon = (topic: string) => {
  if (topic.includes('HTML')) return FileText;
  if (topic.includes('CSS')) return Palette;
  if (topic.includes('JavaScript')) return Zap;
  if (topic.includes('React')) return Layers;
  if (topic.includes('OOP') || topic.includes('Algorithm')) return Cpu;
  if (topic.includes('Database')) return Database;
  if (topic.includes('Programming Fundamentals')) return Code;
  return Rocket;
};

const generateDetailedLearningContent = (levelId: number): LevelLearningContent => {
  const puzzle = generateLevelPuzzle(levelId);
  const topic = puzzle.topic;
  const icon = getTopicIcon(topic);

  // Programming Fundamentals (1-6) - Detailed content based on actual puzzle blocks
  if (levelId <= 6) {
    const fundamentalsContent = {
      1: {
        title: "Hello World - Your First Program",
        introduction: "Welcome to programming! Learn to display messages with console.log() - the foundation of all coding.",
        pages: [
          {
            title: "Understanding console.log()",
            content: "The console.log() function is your first programming tool. It tells the computer to display text on the screen - just like saying 'Hello' to the world!",
            theory: "Every program needs a way to communicate. console.log() is JavaScript's way of printing messages. It's like having a conversation with your computer.",
            concepts: [
              {
                name: "console.log() Function",
                description: "A built-in JavaScript function that displays messages in the console",
                example: puzzle.blocks[0]?.content || 'console.log("Hello World");',
                tips: [
                  "Always put text inside quotes (\" or ')",
                  "End statements with a semicolon (;)",
                  "The text inside quotes is called a 'string'",
                  "console.log() can display numbers, text, and more"
                ]
              },
              {
                name: "Expected Output",
                description: "What your code should produce when run",
                example: `Your code will output: ${puzzle.expectedOutput}`,
                tips: [
                  "The output appears in the console",
                  "It should match exactly what's expected",
                  "Pay attention to spelling and spacing"
                ]
              }
            ],
            visualExample: `${puzzle.blocks[0]?.content || 'console.log("Hello World");'}\n// Output: ${puzzle.expectedOutput}`,
            practiceHint: puzzle.hint
          },
          {
            title: "Why This Matters",
            content: "Every programmer starts here! This simple command is the building block for creating apps, games, and websites. You're taking your first step into the world of coding.",
            concepts: [
              {
                name: "Programming Basics",
                description: "Understanding how computers follow instructions",
                example: "console.log() → Computer displays text → You see the result",
                tips: [
                  "Programs are step-by-step instructions",
                  "Computers follow instructions exactly",
                  "One small change can affect the whole program"
                ]
              }
            ],
            visualExample: `Try this puzzle block:\n${puzzle.blocks[0]?.content || 'console.log("Hello World");'}\n\nExpected result: ${puzzle.expectedOutput}`,
            practiceHint: "Drag the code block to the solution area and see the magic happen!"
          }
        ],
        summary: `Congratulations! You've learned console.log() - the most important function in programming. You can now make computers display messages!`,
        objectives: [
          "Use console.log() to display text",
          "Understand how programs communicate with users",
          "Write your first working program",
          `Produce the output: "${puzzle.expectedOutput}"`
        ]
      },
      2: {
        title: "Variables - Storing Information",
        introduction: "Learn to store and reuse information using variables - your program's memory system.",
        pages: [
          {
            title: "What are Variables?",
            content: "Variables are like labeled containers that store information. Once you put data in a variable, you can use it over and over again in your program.",
            theory: "Variables are fundamental to programming. They let you store values (numbers, text, etc.) and give them meaningful names, making your code organized and reusable.",
            concepts: [
              {
                name: "Creating Variables",
                description: "Using 'let' to create a container for data",
                example: puzzle.blocks[0]?.content || 'let number = 42;',
                tips: [
                  "Use 'let' to create a new variable",
                  "Choose descriptive names (like 'age', 'name', 'score')",
                  "Variable names can't have spaces",
                  "Use camelCase for multi-word names (firstName, lastName)"
                ]
              },
              {
                name: "Using Variables",
                description: "How to access and display stored values",
                example: puzzle.blocks[1]?.content || 'console.log(number);',
                tips: [
                  "Use the variable name to access its value",
                  "No quotes needed when using variables",
                  "Variables can be changed after creation"
                ]
              }
            ],
            visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Output: ${puzzle.expectedOutput}`,
            practiceHint: puzzle.hint
          },
          {
            title: "Why Variables Matter",
            content: "Variables make your programs flexible and powerful. Instead of writing the same value repeatedly, you store it once and reuse it everywhere. This makes code easier to update and maintain.",
            concepts: [
              {
                name: "Variable Benefits",
                description: "Why variables are essential in programming",
                example: `// Instead of: console.log(42); console.log(42);\n// Use: let number = 42; console.log(number); console.log(number);`,
                tips: [
                  "Reduces code repetition",
                  "Makes updates easier",
                  "Improves code readability",
                  "Essential for complex programs"
                ]
              }
            ],
            visualExample: `Practice with these blocks:\n${puzzle.blocks.map((block, i) => `${i + 1}. ${block.content}`).join('\n')}\n\nExpected output: ${puzzle.expectedOutput}`,
            practiceHint: "Arrange the blocks in the correct order to store and display the number!"
          }
        ],
        summary: `Excellent! You've mastered variables - the foundation of data storage in programming. You can now store and reuse information efficiently!`,
        objectives: [
          "Create variables using 'let'",
          "Store numbers in variables",
          "Display variable values with console.log()",
          `Produce the output: "${puzzle.expectedOutput}"`
        ]
      },
      3: {
        title: "String Operations - Working with Text",
        introduction: "Master text manipulation by combining strings to create dynamic, personalized messages.",
        pages: [
          {
            title: "Understanding Strings",
            content: "Strings are sequences of characters (letters, numbers, symbols) enclosed in quotes. They're perfect for storing names, messages, and any text data.",
            theory: "String concatenation (joining strings together) is fundamental for creating dynamic content. The + operator combines strings to form new text.",
            concepts: [
              {
                name: "String Variables",
                description: "Storing text data in variables",
                example: puzzle.blocks[0]?.content || 'let greeting = "Hello, ";',
                tips: [
                  "Always enclose text in quotes",
                  "Can use single (') or double (\") quotes",
                  "Include spaces where needed",
                  "Empty strings are valid: \"\""
                ]
              },
              {
                name: "String Concatenation",
                description: "Combining multiple strings using the + operator",
                example: puzzle.blocks[2]?.content || 'console.log(greeting + name);',
                tips: [
                  "Use + to join strings",
                  "Can combine variables and text",
                  "Order matters in concatenation",
                  "Don't forget spaces between words"
                ]
              }
            ],
            visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Output: ${puzzle.expectedOutput}`,
            practiceHint: puzzle.hint
          }
        ],
        summary: `Great work! You can now manipulate text and create dynamic messages by combining strings!`,
        objectives: [
          "Create string variables",
          "Combine strings using concatenation",
          "Build personalized messages",
          `Produce the output: "${puzzle.expectedOutput}"`
        ]
      },
      4: {
        title: "Mathematical Operations",
        introduction: "Learn to perform calculations and work with numbers using arithmetic operators.",
        pages: [
          {
            title: "Basic Arithmetic",
            content: "Computers excel at mathematical calculations. JavaScript provides arithmetic operators (+, -, *, /) to perform math operations just like a calculator.",
            theory: "Arithmetic operators allow programs to perform calculations, process data, and solve mathematical problems. Results can be stored in variables for later use.",
            concepts: [
              {
                name: "Arithmetic Operations",
                description: "Mathematical calculations using operators",
                example: puzzle.blocks[0]?.content || 'let result = 10 + 5;',
                tips: [
                  "+ for addition",
                  "- for subtraction", 
                  "* for multiplication",
                  "/ for division",
                  "Follow standard math order of operations"
                ]
              },
              {
                name: "Storing Results",
                description: "Saving calculation results in variables",
                example: puzzle.blocks[1]?.content || 'console.log(result);',
                tips: [
                  "Store results for reuse",
                  "Variable names should describe the data",
                  "Can perform multiple operations",
                  "Results can be used in other calculations"
                ]
              }
            ],
            visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Output: ${puzzle.expectedOutput}`,
            practiceHint: puzzle.hint
          }
        ],
        summary: `Excellent! You can now perform mathematical calculations and store results for use in your programs!`,
        objectives: [
          "Use arithmetic operators",
          "Perform basic calculations",
          "Store calculation results",
          `Produce the output: "${puzzle.expectedOutput}"`
        ]
      },
      5: {
        title: "Conditional Logic - Making Decisions",
        introduction: "Make your programs intelligent by adding decision-making capabilities with if statements.",
        pages: [
          {
            title: "If Statements",
            content: "Programs can make decisions based on conditions. If statements execute code only when certain conditions are true, making your programs smart and responsive.",
            theory: "Conditional logic is what makes programs intelligent. By checking conditions and responding accordingly, programs can handle different situations automatically.",
            concepts: [
              {
                name: "Condition Checking",
                description: "Testing whether something is true or false",
                example: puzzle.blocks[1]?.content || 'if (score > 80) {',
                tips: [
                  "Conditions go inside parentheses ()",
                  "Use comparison operators: >, <, >=, <=, ==",
                  "Conditions evaluate to true or false",
                  "Code runs only if condition is true"
                ]
              },
              {
                name: "Conditional Execution",
                description: "Running code only when conditions are met",
                example: puzzle.blocks[2]?.content || '  console.log("Success!");',
                tips: [
                  "Code inside {} runs when condition is true",
                  "Indent code inside blocks for readability",
                  "Always close with }",
                  "Can have multiple statements inside"
                ]
              }
            ],
            visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Output: ${puzzle.expectedOutput}`,
            practiceHint: puzzle.hint
          }
        ],
        summary: `Fantastic! Your programs can now make intelligent decisions based on different conditions!`,
        objectives: [
          "Write if statements",
          "Use comparison operators",
          "Create decision-making logic",
          `Produce the output: "${puzzle.expectedOutput}"`
        ]
      },
      6: {
        title: "Loops - Repeating Actions",
        introduction: "Learn to repeat code efficiently using for loops instead of writing the same code multiple times.",
        pages: [
          {
            title: "For Loops",
            content: "Loops are powerful tools that repeat code blocks multiple times. Instead of writing the same code over and over, you can use a loop to do it automatically.",
            theory: "Loops are fundamental programming constructs that eliminate code repetition. They're essential for processing lists, counting, and performing repetitive tasks efficiently.",
            concepts: [
              {
                name: "Loop Structure",
                description: "The three parts of a for loop",
                example: puzzle.blocks[0]?.content || 'for (let i = 1; i <= 3; i++) {',
                tips: [
                  "Initialize: let i = 1 (starting point)",
                  "Condition: i <= 3 (when to stop)",
                  "Update: i++ (change after each loop)",
                  "Code inside {} runs each time"
                ]
              },
              {
                name: "Loop Execution",
                description: "How loops repeat code automatically",
                example: puzzle.blocks[1]?.content || '  console.log(i);',
                tips: [
                  "Code runs once for each iteration",
                  "Variable 'i' changes each time",
                  "Loop stops when condition becomes false",
                  "Great for counting and repetitive tasks"
                ]
              }
            ],
            visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Output: ${puzzle.expectedOutput}`,
            practiceHint: puzzle.hint
          }
        ],
        summary: `Outstanding! You can now use loops to repeat actions efficiently and avoid writing repetitive code!`,
        objectives: [
          "Write for loops",
          "Control loop iterations",
          "Use loops for repetitive tasks",
          `Produce the output: "${puzzle.expectedOutput}"`
        ]
      }
    };

    const levelKey = levelId as keyof typeof fundamentalsContent;
    return {
      title: fundamentalsContent[levelKey].title,
      topic,
      icon,
      introduction: fundamentalsContent[levelKey].introduction,
      pages: fundamentalsContent[levelKey].pages,
      summary: fundamentalsContent[levelKey].summary,
      objectives: fundamentalsContent[levelKey].objectives
    };
  }

  // HTML Levels (7-11) - Based on actual puzzle blocks
  if (levelId >= 7 && levelId <= 11) {
    const htmlTopics = {
      7: {
        title: "HTML Document Structure",
        content: "Learn the skeleton of every webpage with proper HTML document structure.",
        concepts: "HTML tags, document hierarchy, head and body sections"
      },
      8: {
        title: "HTML Headings",
        content: "Create titles and organize content with different heading levels (h1-h6).",
        concepts: "heading hierarchy, content organization, page structure"
      },
      9: {
        title: "HTML Paragraphs",
        content: "Add readable text content to your webpages using paragraph elements.",
        concepts: "text content, paragraph formatting, readable content"
      },
      10: {
        title: "HTML Links",
        content: "Connect webpages together with hyperlinks and navigation.",
        concepts: "hyperlinks, navigation, href attributes, clickable elements"
      },
      11: {
        title: "HTML Lists",
        content: "Organize information with bulleted and numbered lists.",
        concepts: "unordered lists, list items, content organization"
      }
    };

    const topicInfo = htmlTopics[levelId as keyof typeof htmlTopics];
    
    return {
      title: topicInfo.title,
      topic,
      icon,
      introduction: `Master HTML fundamentals: ${topicInfo.content}`,
      pages: [
        {
          title: `Understanding ${topicInfo.title}`,
          content: topicInfo.content,
          theory: `HTML (HyperText Markup Language) uses tags to structure web content. This lesson focuses on ${topicInfo.concepts}.`,
          concepts: puzzle.blocks.map((block, index) => ({
            name: `HTML Concept ${index + 1}`,
            description: `Learn how to use: ${block.content}`,
            example: block.content,
            tips: [
              "HTML tags are enclosed in < >",
              "Most tags have opening and closing versions",
              "Proper nesting is important",
              "Indentation improves readability"
            ]
          })),
          visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Expected Output: ${puzzle.expectedOutput}`,
          practiceHint: puzzle.hint
        },
        {
          title: "Practice Application",
          content: `Now apply your ${topicInfo.title} knowledge to create the expected HTML output.`,
          concepts: [
            {
              name: "Target Output",
              description: "Your HTML code should produce this exact structure",
              example: puzzle.expectedOutput,
              tips: [
                "Arrange blocks in correct order",
                "Check for proper tag structure",
                "Ensure all tags are properly closed",
                "Match the expected output exactly"
              ]
            }
          ],
          visualExample: `Expected HTML Output:\n${puzzle.expectedOutput}`,
          practiceHint: "Drag the HTML blocks into the correct order to build the structure!"
        }
      ],
      summary: `Great! You've learned ${topicInfo.title} and can now create structured HTML content.`,
      objectives: [
        `Master ${topicInfo.title}`,
        "Understand HTML tag structure",
        "Create valid HTML markup",
        `Produce the output: "${puzzle.expectedOutput}"`
      ]
    };
  }

  // CSS Levels (12-16) - Based on actual puzzle blocks
  if (levelId >= 12 && levelId <= 16) {
    const cssTopics = {
      12: {
        title: "CSS Colors",
        content: "Style your webpage elements with colors using CSS properties.",
        concepts: "color property, text styling, visual presentation"
      },
      13: {
        title: "CSS Font Sizing",
        content: "Control text size and readability with font-size properties.",
        concepts: "font-size, typography, text scaling, pixel units"
      },
      14: {
        title: "CSS Margins",
        content: "Add outer spacing around elements using margin properties.",
        concepts: "margin property, element spacing, layout control"
      },
      15: {
        title: "CSS Padding",
        content: "Create inner spacing within elements using padding properties.",
        concepts: "padding property, inner spacing, element content area"
      },
      16: {
        title: "CSS Backgrounds",
        content: "Style element backgrounds with colors and visual effects.",
        concepts: "background-color, visual styling, element appearance"
      }
    };

    const topicInfo = cssTopics[levelId as keyof typeof cssTopics];
    
    return {
      title: topicInfo.title,
      topic,
      icon,
      introduction: `Learn CSS styling: ${topicInfo.content}`,
      pages: [
        {
          title: `Mastering ${topicInfo.title}`,
          content: topicInfo.content,
          theory: `CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. This lesson covers ${topicInfo.concepts}.`,
          concepts: puzzle.blocks.map((block, index) => ({
            name: `CSS Property ${index + 1}`,
            description: `Understanding: ${block.content}`,
            example: block.content,
            tips: [
              "CSS properties end with semicolons",
              "Property names and values are separated by colons",
              "Consistent formatting improves readability",
              "Values can be colors, sizes, or keywords"
            ]
          })),
          visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Expected Output: ${puzzle.expectedOutput}`,
          practiceHint: puzzle.hint
        }
      ],
      summary: `Excellent! You've learned ${topicInfo.title} and can now style web elements with CSS.`,
      objectives: [
        `Master ${topicInfo.title}`,
        "Apply CSS properties correctly",
        "Understand CSS syntax",
        `Produce the output: "${puzzle.expectedOutput}"`
      ]
    };
  }

  // JavaScript Levels (17-21) - Based on actual puzzle blocks
  if (levelId >= 17 && levelId <= 21) {
    const jsTopics = {
      17: {
        title: "JavaScript Functions",
        content: "Create reusable code blocks with functions - the building blocks of larger programs.",
        concepts: "function declaration, function calls, code organization"
      },
      18: {
        title: "JavaScript Arrays",
        content: "Store and access multiple values using arrays - JavaScript's list structure.",
        concepts: "array creation, element access, index-based retrieval"
      },
      19: {
        title: "JavaScript Objects",
        content: "Group related data together using objects - JavaScript's data containers.",
        concepts: "object properties, dot notation, data organization"
      },
      20: {
        title: "JavaScript Array Loops",
        content: "Process array elements efficiently using for loops and iteration.",
        concepts: "array iteration, for loops, element processing"
      },
      21: {
        title: "JavaScript Conditionals",
        content: "Make complex decisions using if-else statements and logical conditions.",
        concepts: "if-else statements, conditional logic, decision trees"
      }
    };

    const topicInfo = jsTopics[levelId as keyof typeof jsTopics];
    
    return {
      title: topicInfo.title,
      topic,
      icon,
      introduction: `Advanced JavaScript: ${topicInfo.content}`,
      pages: [
        {
          title: `Understanding ${topicInfo.title}`,
          content: topicInfo.content,
          theory: `JavaScript enables interactive and dynamic web experiences. This lesson focuses on ${topicInfo.concepts}.`,
          concepts: puzzle.blocks.map((block, index) => ({
            name: `JavaScript Concept ${index + 1}`,
            description: `Code block: ${block.content}`,
            example: block.content,
            tips: [
              "JavaScript is case-sensitive",
              "Proper syntax is crucial",
              "Indentation improves code readability",
              "Test your code step by step"
            ]
          })),
          visualExample: `${puzzle.blocks.map(block => block.content).join('\n')}\n// Expected Output: ${puzzle.expectedOutput}`,
          practiceHint: puzzle.hint
        }
      ],
      summary: `Fantastic! You've mastered ${topicInfo.title} and can now write more complex JavaScript programs.`,
      objectives: [
        `Master ${topicInfo.title}`,
        "Write functional JavaScript code",
        "Understand advanced programming concepts",
        `Produce the output: "${puzzle.expectedOutput}"`
      ]
    };
  }

  // Advanced Levels (22-200) - Dynamic content based on puzzle
  return {
    title: puzzle.title,
    topic,
    icon,
    introduction: `Master ${topic} through hands-on practice. This level focuses on practical application of ${topic} concepts.`,
    pages: [
      {
        title: `${topic} Fundamentals`,
        content: puzzle.description,
        theory: `${topic} is essential for modern software development. This lesson provides practical experience with real-world applications.`,
        concepts: puzzle.blocks.map((block, index) => ({
          name: `${topic} Block ${index + 1}`,
          description: `Code implementation: ${block.content}`,
          example: block.content,
          tips: [
            "Follow the logical code sequence",
            "Pay attention to syntax details",
            "Understanding leads to mastery",
            "Practice makes perfect"
          ]
        })),
        visualExample: `Code blocks to arrange:\n${puzzle.blocks.map((block, i) => `${i + 1}. ${block.content}`).join('\n')}\n\nExpected Output: ${puzzle.expectedOutput}`,
        practiceHint: puzzle.hint
      },
      {
        title: "Practical Challenge",
        content: `Apply your ${topic} knowledge to solve this coding challenge. Arrange the blocks correctly to produce the expected output.`,
        concepts: [
          {
            name: "Challenge Goal", 
            description: "Your completed code should produce the exact expected output",
            example: `Target: ${puzzle.expectedOutput}`,
            tips: [
              "Drag blocks to the solution area",
              "Order matters for correct execution",
              "Check your output against the expected result",
              "Use hints if you need guidance"
            ]
          }
        ],
        visualExample: `Complete this challenge:\n\nAvailable blocks:\n${puzzle.blocks.map((block, i) => `• ${block.content}`).join('\n')}\n\nExpected result: ${puzzle.expectedOutput}`,
        practiceHint: "Arrange the blocks in the correct logical order to achieve the target output!"
      }
    ],
    summary: `Congratulations! You've successfully completed ${topic} Level ${levelId}. You can now apply these concepts in real programming scenarios.`,
    objectives: [
      `Master ${topic} concepts`,
      "Apply programming logic effectively",
      "Understand code structure and flow",
      `Successfully produce: "${puzzle.expectedOutput}"`
    ]
  };
};

export const generateLevelLearningContent = generateDetailedLearningContent;
