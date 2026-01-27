
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export interface LevelPuzzle {
  id: number;
  title: string;
  description: string;
  expectedOutput: string;
  hints: string[];
  blocks: PuzzleBlockData[];
  topic: string;
}

const getTopicForLevel = (levelId: number): string => {
  if (levelId <= 6) return 'Programming Fundamentals';
  if (levelId <= 11) return 'HTML';
  if (levelId <= 16) return 'CSS';
  if (levelId <= 21) return 'JavaScript';
  if (levelId <= 26) return 'React';
  if (levelId <= 41) return 'Advanced Programming';
  if (levelId <= 44) return 'Database';
  if (levelId <= 57) return 'Data Structures';
  if (levelId <= 62) return 'Algorithms';
  if (levelId <= 67) return 'Web Development';
  if (levelId <= 71) return 'Testing';
  if (levelId <= 76) return 'Frameworks';
  if (levelId <= 81) return 'Mobile Development';
  if (levelId <= 86) return 'DevOps';
  if (levelId <= 91) return 'Security';
  if (levelId <= 96) return 'Performance';
  if (levelId <= 101) return 'AI/ML';
  return 'Mastery';
};

const generatePuzzleContent = (levelId: number): LevelPuzzle => {
  const topic = getTopicForLevel(levelId);

  // Programming Fundamentals (1-6)
  if (levelId <= 6) {
    const fundamentalsPuzzles = [
      {
        title: "Hello World",
        description: "Create your first program that displays 'Hello World'",
        expectedOutput: "Hello World",
        hints: ["Use console.log() to print text to the console"],
        blocks: [
          { id: `${levelId}-1`, content: 'console.log("Hello World");', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "Variables and Numbers",
        description: "Create a variable and display its value",
        expectedOutput: "42",
        hints: ["Declare a variable with let and log it"],
        blocks: [
          { id: `${levelId}-1`, content: 'let number = 42;', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'console.log(number);', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "String Operations",
        description: "Work with text strings",
        expectedOutput: "Hello, World!",
        hints: ["Combine strings using the + operator"],
        blocks: [
          { id: `${levelId}-1`, content: 'let greeting = "Hello, ";', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'let name = "World!";', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: 'console.log(greeting + name);', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "Basic Math",
        description: "Perform mathematical calculations",
        expectedOutput: "15",
        hints: ["Use arithmetic operators like +, -, *, /"],
        blocks: [
          { id: `${levelId}-1`, content: 'let result = 10 + 5;', type: 'operator' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'console.log(result);', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "Conditional Logic",
        description: "Make decisions with if statements",
        expectedOutput: "Pass",
        hints: ["Use if statements to check conditions"],
        blocks: [
          { id: `${levelId}-1`, content: 'let score = 85;', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'if (score >= 80) {', type: 'control' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  console.log("Pass");', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '}', type: 'control' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "Simple Loop",
        description: "Repeat actions with loops",
        expectedOutput: "1\n2\n3",
        hints: ["Use a for loop to repeat code"],
        blocks: [
          { id: `${levelId}-1`, content: 'for (let i = 1; i <= 3; i++) {', type: 'control' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  console.log(i);', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '}', type: 'control' as const, isCorrect: true, isPlaced: false }
        ]
      }
    ];
    return { id: levelId, topic, ...fundamentalsPuzzles[levelId - 1] };
  }

  // HTML (7-11)
  if (levelId <= 11) {
    const htmlIndex = levelId - 7;
    const htmlPuzzles = [
      {
        title: "Basic HTML Document",
        description: "Create a basic HTML document structure",
        expectedOutput: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>",
        hints: ["HTML documents need DOCTYPE, html, head, and body tags"],
        blocks: [
          { id: `${levelId}-1`, content: '<!DOCTYPE html>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '<html>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '<head>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '  <title>My Page</title>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-5`, content: '</head>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-6`, content: '<body>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-7`, content: '  <h1>Welcome</h1>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-8`, content: '</body>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-9`, content: '</html>', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "HTML Headings",
        description: "Create different heading levels",
        expectedOutput: "<h1>Main Title</h1>\n<h2>Subtitle</h2>\n<h3>Section</h3>",
        hints: ["Use h1, h2, h3 tags for different heading levels"],
        blocks: [
          { id: `${levelId}-1`, content: '<h1>Main Title</h1>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '<h2>Subtitle</h2>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '<h3>Section</h3>', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "HTML Paragraphs",
        description: "Create paragraph elements",
        expectedOutput: "<p>This is the first paragraph.</p>\n<p>This is the second paragraph.</p>",
        hints: ["Use p tags to create paragraphs"],
        blocks: [
          { id: `${levelId}-1`, content: '<p>This is the first paragraph.</p>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '<p>This is the second paragraph.</p>', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "HTML Links",
        description: "Create hyperlinks",
        expectedOutput: '<a href="https://example.com">Visit Example</a>\n<a href="https://google.com">Visit Google</a>',
        hints: ["Use a tags with href attributes for links"],
        blocks: [
          { id: `${levelId}-1`, content: '<a href="https://example.com">Visit Example</a>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '<a href="https://google.com">Visit Google</a>', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "HTML Lists",
        description: "Create unordered lists",
        expectedOutput: "<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Orange</li>\n</ul>",
        hints: ["Use ul and li tags for lists"],
        blocks: [
          { id: `${levelId}-1`, content: '<ul>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  <li>Apple</li>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  <li>Banana</li>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '  <li>Orange</li>', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-5`, content: '</ul>', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      }
    ];
    return { id: levelId, topic, ...htmlPuzzles[htmlIndex] };
  }

  // CSS (12-16)
  if (levelId <= 16) {
    const cssIndex = levelId - 12;
    const cssPuzzles = [
      {
        title: "CSS Color Styling",
        description: "Apply color styles to elements",
        expectedOutput: "body {\n  color: blue;\n  background-color: lightgray;\n}",
        hints: ["Use color and background-color properties"],
        blocks: [
          { id: `${levelId}-1`, content: 'body {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  color: blue;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  background-color: lightgray;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '}', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "CSS Font Size",
        description: "Change text size with CSS",
        expectedOutput: "h1 {\n  font-size: 32px;\n  font-weight: bold;\n}",
        hints: ["Use font-size and font-weight properties"],
        blocks: [
          { id: `${levelId}-1`, content: 'h1 {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  font-size: 32px;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  font-weight: bold;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '}', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "CSS Margins",
        description: "Add spacing around elements",
        expectedOutput: ".container {\n  margin: 20px;\n  margin-top: 10px;\n}",
        hints: ["Use margin properties for outer spacing"],
        blocks: [
          { id: `${levelId}-1`, content: '.container {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  margin: 20px;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  margin-top: 10px;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '}', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "CSS Padding",
        description: "Add inner spacing to elements",
        expectedOutput: ".box {\n  padding: 15px;\n  padding-left: 25px;\n}",
        hints: ["Use padding properties for inner spacing"],
        blocks: [
          { id: `${levelId}-1`, content: '.box {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  padding: 15px;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  padding-left: 25px;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '}', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "CSS Background",
        description: "Set background colors and images",
        expectedOutput: ".header {\n  background-color: lightblue;\n  background-image: url('bg.jpg');\n}",
        hints: ["Use background properties"],
        blocks: [
          { id: `${levelId}-1`, content: '.header {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  background-color: lightblue;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: "  background-image: url('bg.jpg');", type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '}', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      }
    ];
    return { id: levelId, topic, ...cssPuzzles[cssIndex] };
  }

  // JavaScript (17-21)
  if (levelId <= 21) {
    const jsIndex = levelId - 17;
    const jsPuzzles = [
      {
        title: "JavaScript Functions",
        description: "Create and call a function",
        expectedOutput: "Hello from function!\nFunction called successfully",
        hints: ["Define a function and call it"],
        blocks: [
          { id: `${levelId}-1`, content: 'function greet() {', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  console.log("Hello from function!");', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '}', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: 'greet();', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-5`, content: 'console.log("Function called successfully");', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "JavaScript Arrays",
        description: "Work with arrays",
        expectedOutput: "apple\n3\nbanana",
        hints: ["Create an array and access elements by index"],
        blocks: [
          { id: `${levelId}-1`, content: 'let fruits = ["apple", "banana", "orange"];', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'console.log(fruits[0]);', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: 'console.log(fruits.length);', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: 'console.log(fruits[1]);', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "JavaScript Objects",
        description: "Create and use objects",
        expectedOutput: "John\n25\nDeveloper",
        hints: ["Create an object with properties"],
        blocks: [
          { id: `${levelId}-1`, content: 'let person = { name: "John", age: 25, job: "Developer" };', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'console.log(person.name);', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: 'console.log(person.age);', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: 'console.log(person.job);', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "JavaScript Loops",
        description: "Iterate through arrays",
        expectedOutput: "0: apple\n1: banana\n2: orange",
        hints: ["Use a for loop to iterate through array elements"],
        blocks: [
          { id: `${levelId}-1`, content: 'let fruits = ["apple", "banana", "orange"];', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'for (let i = 0; i < fruits.length; i++) {', type: 'control' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  console.log(i + ": " + fruits[i]);', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '}', type: 'control' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "JavaScript Conditions",
        description: "Use if-else statements",
        expectedOutput: "Adult\nCan vote",
        hints: ["Use if-else to check age conditions"],
        blocks: [
          { id: `${levelId}-1`, content: 'let age = 20;', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'if (age >= 18) {', type: 'control' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '  console.log("Adult");', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: '  console.log("Can vote");', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-5`, content: '} else {', type: 'control' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-6`, content: '  console.log("Minor");', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-7`, content: '}', type: 'control' as const, isCorrect: true, isPlaced: false }
        ]
      }
    ];
    return { id: levelId, topic, ...jsPuzzles[jsIndex] };
  }

  // React (22-26)
  if (levelId <= 26) {
    const reactIndex = levelId - 22;
    const reactPuzzles = [
      {
        title: "React Component",
        description: "Create a basic React component",
        expectedOutput: "function App() {\n  return <h1>Hello React!</h1>;\n}",
        hints: ["Define a React functional component"],
        blocks: [
          { id: `${levelId}-1`, content: 'function App() {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  return <h1>Hello React!</h1>;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '}', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "React Props",
        description: "Use props in React components",
        expectedOutput: "function Welcome(props) {\n  return <h1>Hello {props.name}!</h1>;\n}",
        hints: ["Pass data through props"],
        blocks: [
          { id: `${levelId}-1`, content: 'function Welcome(props) {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: '  return <h1>Hello {props.name}!</h1>;', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '}', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "React State",
        description: "Use state in React components",
        expectedOutput: "const [count, setCount] = useState(0);\nreturn <button onClick={() => setCount(count + 1)}>Count: {count}</button>;",
        hints: ["Use useState hook for state management"],
        blocks: [
          { id: `${levelId}-1`, content: 'const [count, setCount] = useState(0);', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "React Events",
        description: "Handle events in React",
        expectedOutput: "const handleClick = () => {\n  alert('Button clicked!');\n};\nreturn <button onClick={handleClick}>Click me</button>;",
        hints: ["Create event handlers"],
        blocks: [
          { id: `${levelId}-1`, content: 'const handleClick = () => {', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: "  alert('Button clicked!');", type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: '};', type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-4`, content: 'return <button onClick={handleClick}>Click me</button>;', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "React Lists",
        description: "Render lists in React",
        expectedOutput: "const items = ['apple', 'banana', 'orange'];\nreturn <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;",
        hints: ["Use map to render arrays"],
        blocks: [
          { id: `${levelId}-1`, content: "const items = ['apple', 'banana', 'orange'];", type: 'code' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'return <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;', type: 'code' as const, isCorrect: true, isPlaced: false }
        ]
      }
    ];
    return { id: levelId, topic, ...reactPuzzles[reactIndex] };
  }

  // Advanced Programming (27-41)
  if (levelId <= 41) {
    const advancedOutputs = [
      "API Response: {\"data\": \"success\"}",
      "Database connected successfully",
      "Git commit: Initial commit",
      "Tests passed: 5/5",
      "Deployed to production",
      "Error handling: Try-catch implemented",
      "Authentication: JWT token generated",
      "Async operation completed",
      "Module imported successfully",
      "Class instantiated: new User()",
      "Promise resolved: Data fetched",
      "Callback executed successfully",
      "Event listener added",
      "Local storage updated",
      "CORS enabled for API"
    ];

    const selectedOutput = advancedOutputs[levelId - 27];
    return {
      id: levelId,
      title: `${topic} Challenge ${levelId}`,
      description: `Master ${topic} concepts in this level`,
      expectedOutput: selectedOutput,
      hints: [`Use console.log() to output the expected result for ${topic}`],
      blocks: [
        {
          id: `${levelId}-1`,
          content: `console.log("${selectedOutput}");`,
          type: 'function' as const,
          isCorrect: true,
          isPlaced: false
        }
      ],
      topic
    };
  }

  // For other levels (42-200), generate structured content
  const generateStructuredPuzzle = (levelId: number, topic: string) => {
    const concepts = [
      "Initialize system",
      "Process data",
      "Execute logic",
      "Return result",
      "Handle errors",
      "Optimize performance",
      "Test functionality",
      "Deploy solution",
      "Monitor system",
      "Update configuration"
    ];

    const conceptIndex = (levelId - 42) % concepts.length;
    const concept = concepts[conceptIndex];
    const baseNumber = Math.floor((levelId - 42) / 10) + 1;

    const expectedOutput = `${topic}: ${concept} - Level ${levelId} completed`;

    return {
      id: levelId,
      title: `${topic} Level ${levelId}`,
      description: `Learn ${concept} in ${topic}`,
      expectedOutput,
      hints: [`Implement ${concept} for ${topic}`],
      blocks: [
        {
          id: `${levelId}-1`,
          content: `console.log("${expectedOutput}");`,
          type: 'function' as const,
          isCorrect: true,
          isPlaced: false
        }
      ],
      topic
    };
  };

  return generateStructuredPuzzle(levelId, topic);
};

export const generateLevelPuzzle = (levelId: number): LevelPuzzle => {
  return generatePuzzleContent(levelId);
};
