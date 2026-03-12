
import { PuzzleBlockData } from '@/components/PuzzleBlock';
import { getLevelConfig } from './levelManifest';

export interface LevelPuzzle {
  id: number;
  title: string;
  description: string;
  expectedOutput: string;
  hints: string[];
  blocks: PuzzleBlockData[];
  topic: string;
}

const generatePuzzleContent = (levelId: number): LevelPuzzle => {
  const { topic } = getLevelConfig(levelId);

  // HTML (1-10)
  if (levelId <= 10) {
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
    const htmlIndex = (levelId - 1) % htmlPuzzles.length;
    return { id: levelId, topic, ...htmlPuzzles[htmlIndex] };
  }

  // CSS (11-20)
  if (levelId <= 20) {
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
    const cssIndex = (levelId - 11) % cssPuzzles.length;
    return { id: levelId, topic, ...cssPuzzles[cssIndex] };
  }

  // JavaScript (21-40)
  if (levelId <= 40) {
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
          { id: `${levelId}-4`, content: 'greet();', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "JavaScript Arrays",
        description: "Work with arrays",
        expectedOutput: "apple\nbanana",
        hints: ["Access elements by index"],
        blocks: [
          { id: `${levelId}-1`, content: 'let fruits = ["apple", "banana"];', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'console.log(fruits[0]);', type: 'function' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-3`, content: 'console.log(fruits[1]);', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      }
    ];
    const jsIndex = (levelId - 21) % jsPuzzles.length;
    return { id: levelId, topic, ...jsPuzzles[jsIndex] };
  }

  // Python (41-60)
  if (levelId <= 60) {
    const pythonPuzzles = [
      {
        title: "Python Print",
        description: "Say hello with Python",
        expectedOutput: "Hello Python",
        hints: ["Use print() function"],
        blocks: [
          { id: `${levelId}-1`, content: 'print("Hello Python")', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      },
      {
        title: "Python Variables",
        description: "Create a Python variable",
        expectedOutput: "100",
        hints: ["Assign a value and print it"],
        blocks: [
          { id: `${levelId}-1`, content: 'score = 100', type: 'variable' as const, isCorrect: true, isPlaced: false },
          { id: `${levelId}-2`, content: 'print(score)', type: 'function' as const, isCorrect: true, isPlaced: false }
        ]
      }
    ];
    const pythonIndex = (levelId - 41) % pythonPuzzles.length;
    return { id: levelId, topic, ...pythonPuzzles[pythonIndex] };
  }

  // Fallback for higher levels
  return generateStructuredPuzzle(levelId, topic);
};

// For other levels (61-280), generate structured content
const generateStructuredPuzzle = (levelId: number, topic: string): LevelPuzzle => {
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

  const conceptIndex = (levelId - 61) % concepts.length;
  const concept = concepts[conceptIndex];
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

export const generateLevelPuzzle = (levelId: number): LevelPuzzle => {
  return generatePuzzleContent(levelId);
};
