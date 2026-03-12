export interface PracticeChallenge {
  id: string;
  language: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starterCode: string;
  expectedOutput?: string;
  hint?: string;
  solution?: string;
}

export const practiceChallenges: PracticeChallenge[] = [
  // JavaScript Challenges
  {
    id: 'js-1',
    language: 'JavaScript',
    title: 'Sum Two Numbers',
    description: 'Write a function that takes two numbers and returns their sum. Call it with 5 and 3.',
    difficulty: 'easy',
    starterCode: '// Create a function called add that takes two parameters\n// Call the function with 5 and 3, and log the result\n\nfunction add(a, b) {\n  // Your code here\n}\n\nconsole.log(add(5, 3));',
    expectedOutput: '8',
    hint: 'Use the + operator to add the two parameters together and return the result.',
    solution: 'function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(5, 3));'
  },
  {
    id: 'js-2',
    language: 'JavaScript',
    title: 'Reverse a String',
    description: 'Write a function that reverses a string. Test it with "hello".',
    difficulty: 'medium',
    starterCode: '// Create a function called reverseString\n// It should take a string and return it reversed\n\nfunction reverseString(str) {\n  // Your code here\n}\n\nconsole.log(reverseString("hello"));',
    expectedOutput: 'olleh',
    hint: 'You can use split(), reverse(), and join() methods together.',
    solution: 'function reverseString(str) {\n  return str.split("").reverse().join("");\n}\n\nconsole.log(reverseString("hello"));'
  },
  {
    id: 'js-3',
    language: 'JavaScript',
    title: 'FizzBuzz',
    description: 'Print numbers 1-15. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", both print "FizzBuzz".',
    difficulty: 'hard',
    starterCode: '// Implement FizzBuzz from 1 to 15\n// Log each result\n\nfor (let i = 1; i <= 15; i++) {\n  // Your code here\n}',
    hint: 'Use modulo operator (%) to check divisibility. Check for both 3 AND 5 first!',
    solution: 'for (let i = 1; i <= 15; i++) {\n  if (i % 15 === 0) console.log("FizzBuzz");\n  else if (i % 3 === 0) console.log("Fizz");\n  else if (i % 5 === 0) console.log("Buzz");\n  else console.log(i);\n}'
  },
  {
    id: 'js-4',
    language: 'JavaScript',
    title: 'Find Maximum',
    description: 'Write a function to find the maximum value in an array [4, 2, 9, 7, 5].',
    difficulty: 'medium',
    starterCode: '// Create a function called findMax\n// It should find the largest number in an array\n\nfunction findMax(arr) {\n  // Your code here\n}\n\nconst numbers = [4, 2, 9, 7, 5];\nconsole.log(findMax(numbers));',
    expectedOutput: '9',
    hint: 'You can use Math.max() with the spread operator, or loop through the array.',
    solution: 'function findMax(arr) {\n  return Math.max(...arr);\n}\n\nconst numbers = [4, 2, 9, 7, 5];\nconsole.log(findMax(numbers));'
  },
  {
    id: 'js-5',
    language: 'JavaScript',
    title: 'Count Vowels',
    description: 'Write a function that counts the vowels in a string. Test with "javascript".',
    difficulty: 'medium',
    starterCode: '// Create a function called countVowels\n// Count a, e, i, o, u in the string\n\nfunction countVowels(str) {\n  // Your code here\n}\n\nconsole.log(countVowels("javascript"));',
    expectedOutput: '3',
    hint: 'Use a regex or loop through each character and check if it\'s a vowel.',
    solution: 'function countVowels(str) {\n  const vowels = "aeiouAEIOU";\n  let count = 0;\n  for (let char of str) {\n    if (vowels.includes(char)) count++;\n  }\n  return count;\n}\n\nconsole.log(countVowels("javascript"));'
  },

  // Python Challenges
  {
    id: 'py-1',
    language: 'Python',
    title: 'Hello World',
    description: 'Print "Hello, World!" to the console.',
    difficulty: 'easy',
    starterCode: '# Print Hello, World!\n\n# Your code here',
    expectedOutput: 'Hello, World!',
    hint: 'Use the print() function with the string inside.',
    solution: 'print("Hello, World!")'
  },
  {
    id: 'py-2',
    language: 'Python',
    title: 'Calculate Factorial',
    description: 'Write a function to calculate the factorial of 5.',
    difficulty: 'medium',
    starterCode: '# Create a function called factorial\n# Calculate 5! (5 factorial)\n\ndef factorial(n):\n    # Your code here\n    pass\n\nprint(factorial(5))',
    expectedOutput: '120',
    hint: 'Use a loop or recursion. 5! = 5 × 4 × 3 × 2 × 1',
    solution: 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))'
  },
  {
    id: 'py-3',
    language: 'Python',
    title: 'List Comprehension',
    description: 'Create a list of squares from 1 to 5 using list comprehension.',
    difficulty: 'medium',
    starterCode: '# Create a list of squares [1, 4, 9, 16, 25]\n# Use list comprehension\n\nsquares = # Your code here\n\nprint(squares)',
    expectedOutput: '[1, 4, 9, 16, 25]',
    hint: 'Use [expression for item in range()] syntax.',
    solution: 'squares = [x**2 for x in range(1, 6)]\n\nprint(squares)'
  },

  // TypeScript Challenges
  {
    id: 'ts-1',
    language: 'TypeScript',
    title: 'Typed Function',
    description: 'Create a typed function that adds two numbers and returns the result.',
    difficulty: 'easy',
    starterCode: '// Create a function with proper TypeScript types\n// It should take two numbers and return their sum\n\nfunction add(a: number, b: number): number {\n  // Your code here\n}\n\nconsole.log(add(10, 20));',
    expectedOutput: '30',
    hint: 'Simply return the sum of a and b.',
    solution: 'function add(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(add(10, 20));'
  },
  {
    id: 'ts-2',
    language: 'TypeScript',
    title: 'Interface Usage',
    description: 'Create a User interface and use it to type an object.',
    difficulty: 'medium',
    starterCode: '// Define a User interface with name (string) and age (number)\n// Create a user object and log the name\n\ninterface User {\n  // Your code here\n}\n\nconst user: User = {\n  name: "Alice",\n  age: 25\n};\n\nconsole.log(user.name);',
    expectedOutput: 'Alice',
    hint: 'Define the interface properties with their types using property: type syntax.',
    solution: 'interface User {\n  name: string;\n  age: number;\n}\n\nconst user: User = {\n  name: "Alice",\n  age: 25\n};\n\nconsole.log(user.name);'
  },

  // React Challenges
  {
    id: 'react-1',
    language: 'React',
    title: 'Functional Component',
    description: 'Create a simple functional component that displays a greeting.',
    difficulty: 'easy',
    starterCode: '// Create a Greeting component\n// It should display "Hello, React!"\n\nfunction Greeting() {\n  return (\n    // Your JSX here\n  );\n}\n\n// Render: <Greeting />',
    hint: 'Return JSX with an h1 or p tag containing the greeting.',
    solution: 'function Greeting() {\n  return (\n    <h1>Hello, React!</h1>\n  );\n}'
  },
  {
    id: 'react-2',
    language: 'React',
    title: 'Props Usage',
    description: 'Create a component that accepts a name prop and displays it.',
    difficulty: 'medium',
    starterCode: '// Create a Welcome component that accepts a name prop\n// Display "Welcome, {name}!"\n\nfunction Welcome({ name }) {\n  return (\n    // Your JSX here\n  );\n}\n\n// Usage: <Welcome name="John" />',
    hint: 'Use curly braces {} to embed the name prop in your JSX.',
    solution: 'function Welcome({ name }) {\n  return (\n    <h1>Welcome, {name}!</h1>\n  );\n}'
  },

  // HTML Challenges
  {
    id: 'html-1',
    language: 'HTML',
    title: 'Basic Structure',
    description: 'Create a basic HTML page with a heading and paragraph.',
    difficulty: 'easy',
    starterCode: '<!-- Create a basic HTML structure -->\n<!-- Add an h1 with "My Website" and a paragraph -->\n\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <!-- Your code here -->\n</body>\n</html>',
    hint: 'Use <h1> for heading and <p> for paragraph tags.',
    solution: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>My Website</h1>\n  <p>Welcome to my website!</p>\n</body>\n</html>'
  },
  {
    id: 'html-2',
    language: 'HTML',
    title: 'Create a List',
    description: 'Create an unordered list with 3 items.',
    difficulty: 'easy',
    starterCode: '<!-- Create an unordered list with:\n  - Apple\n  - Banana\n  - Orange -->\n\n<!-- Your code here -->',
    hint: 'Use <ul> for the list and <li> for each item.',
    solution: '<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Orange</li>\n</ul>'
  },

  // CSS Challenges
  {
    id: 'css-1',
    language: 'CSS',
    title: 'Center an Element',
    description: 'Write CSS to center an element using flexbox.',
    difficulty: 'medium',
    starterCode: '/* Center content using flexbox */\n\n.container {\n  display: flex;\n  /* Add centering properties */\n}',
    hint: 'Use justify-content and align-items with center value.',
    solution: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}'
  },
  {
    id: 'css-2',
    language: 'CSS',
    title: 'Responsive Design',
    description: 'Create a media query that changes background color on mobile.',
    difficulty: 'medium',
    starterCode: '/* Default styles */\nbody {\n  background-color: white;\n}\n\n/* Add a media query for screens under 768px */\n/* Change background to lightblue */\n\n/* Your code here */',
    hint: 'Use @media (max-width: 768px) { } to target mobile devices.',
    solution: '@media (max-width: 768px) {\n  body {\n    background-color: lightblue;\n  }\n}'
  },

  // NEW: Kotlin Challenges
  {
    id: 'kotlin-1',
    language: 'Kotlin',
    title: 'Kotlin Hello',
    description: 'Print "Hello, Kotlin!" using the main function.',
    difficulty: 'easy',
    starterCode: 'fun main() {\n    // Your code here\n}',
    expectedOutput: 'Hello, Kotlin!',
    hint: 'Use the println() function.',
    solution: 'fun main() {\n    println("Hello, Kotlin!")\n}'
  },
  {
    id: 'kotlin-2',
    language: 'Kotlin',
    title: 'Variables',
    description: 'Declare a constant named "name" with value "Codio" and print it.',
    difficulty: 'easy',
    starterCode: 'fun main() {\n    // Declare name here\n    println(name)\n}',
    expectedOutput: 'Codio',
    hint: 'Use "val" for constants in Kotlin.',
    solution: 'fun main() {\n    val name = "Codio"\n    println(name)\n}'
  },

  // NEW: Swift Challenges
  {
    id: 'swift-1',
    language: 'Swift',
    title: 'Swift Greet',
    description: 'Print "Hello, Swift!" to the console.',
    difficulty: 'easy',
    starterCode: '// Your Swift code here',
    expectedOutput: 'Hello, Swift!',
    hint: 'Use the print() function. No main function needed in top-level Swift.',
    solution: 'print("Hello, Swift!")'
  },
  {
    id: 'swift-2',
    language: 'Swift',
    title: 'Swift Arrays',
    description: 'Create an array of numbers [1, 2, 3] and print its count.',
    difficulty: 'medium',
    starterCode: 'let numbers = // Your code here\nprint(numbers.count)',
    expectedOutput: '3',
    hint: 'Declare an array using brackets: [1, 2, 3]',
    solution: 'let numbers = [1, 2, 3]\nprint(numbers.count)'
  },

  // NEW: Flutter/Dart Challenges
  {
    id: 'flutter-1',
    language: 'Flutter',
    title: 'Dart Main',
    description: 'Print "Hello from Flutter!" in the main function.',
    difficulty: 'easy',
    starterCode: 'void main() {\n  // Your code here\n}',
    expectedOutput: 'Hello from Flutter!',
    hint: 'Use the print() function inside main().',
    solution: 'void main() {\n  print("Hello from Flutter!");\n}'
  },
  {
    id: 'flutter-2',
    language: 'Flutter',
    title: 'Class Basics',
    description: 'Create a simple Dart class named "Robot" and instantiate it.',
    difficulty: 'medium',
    starterCode: 'class Robot {\n  // Your code here\n}\n\nvoid main() {\n  var r = Robot();\n  print("Robot created");\n}',
    expectedOutput: 'Robot created',
    hint: 'Define a class using the "class" keyword.',
    solution: 'class Robot {}\n\nvoid main() {\n  var r = Robot();\n  print("Robot created");\n}'
  }
];

export const getChallengesByLanguage = (language: string): PracticeChallenge[] => {
  return practiceChallenges.filter(c => c.language === language);
};

export const getChallengesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): PracticeChallenge[] => {
  return practiceChallenges.filter(c => c.difficulty === difficulty);
};
