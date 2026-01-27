
import { PuzzleBlockData } from '@/components/PuzzleBlock';

// Arrays Puzzle
export const ARRAYS_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const numbers = [1, 2, 3, 4]', type: 'variable' as const, isPlaced: false },
    { id: 'block2', content: 'const doubled = numbers.map(n => n * 2)', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: 'const sum = numbers.reduce((a, b) => a + b, 0)', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: 'console.log("Doubled:", doubled)', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: 'console.log("Sum:", sum)', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5'],
  hint: "Use array methods map() and reduce()",
  description: "Learn about array manipulation in JavaScript",
  expectedOutput: `Doubled: [2, 4, 6, 8]\nSum: 10`
};

// Objects Puzzle
export const OBJECT_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const person = {', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  name: "John",', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  age: 30', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: 'console.log(person.name)', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: 'person.job = "Developer"', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: 'console.log(person)', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
  hint: "Create an object, access its properties, and add new properties",
  description: "Learn about JavaScript objects and property manipulation",
  expectedOutput: `John\n{ name: 'John', age: 30, job: 'Developer' }`
};

// Async/Await Puzzle
export const ASYNC_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'async function fetchData() {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  return "Data loaded"', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: 'async function displayData() {', type: 'function' as const, isPlaced: false },
    { id: 'block5', content: '  const data = await fetchData()', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '  console.log(data)', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: 'displayData()', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8'],
  hint: "Use async/await to handle asynchronous operations",
  description: "Learn about JavaScript's async/await for handling promises",
  expectedOutput: `Data loaded`
};

// Error Handling Puzzle
export const ERROR_HANDLING_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'function divide(a, b) {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  if (b === 0) {', type: 'control' as const, isPlaced: false },
    { id: 'block3', content: '    throw new Error("Cannot divide by zero")', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  return a / b', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: 'try {', type: 'control' as const, isPlaced: false },
    { id: 'block8', content: '  console.log(divide(10, 2))', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '  console.log(divide(10, 0))', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '} catch (error) {', type: 'control' as const, isPlaced: false },
    { id: 'block11', content: '  console.log(error.message)', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '}', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12'],
  hint: "Use try/catch blocks to handle potential errors",
  description: "Learn about error handling in JavaScript using try/catch",
  expectedOutput: `5\nCannot divide by zero`
};

// Functional Programming Puzzle
export const FUNCTIONAL_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const numbers = [1, 2, 3, 4, 5]', type: 'variable' as const, isPlaced: false },
    { id: 'block2', content: 'const isEven = num => num % 2 === 0', type: 'function' as const, isPlaced: false },
    { id: 'block3', content: 'const square = num => num * num', type: 'function' as const, isPlaced: false },
    { id: 'block4', content: 'const evenNumbers = numbers.filter(isEven)', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: 'const squaredEven = evenNumbers.map(square)', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: 'console.log(squaredEven)', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6'],
  hint: "Use functional programming concepts: filter() and map()",
  description: "Learn about functional programming with higher-order functions",
  expectedOutput: `[4, 16]`
};
