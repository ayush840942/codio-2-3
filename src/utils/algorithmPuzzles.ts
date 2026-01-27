
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const SORTING_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'function bubbleSort(arr) {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  for (let i = 0; i < arr.length; i++) {', type: 'control' as const, isPlaced: false },
    { id: 'block3', content: '    for (let j = 0; j < arr.length - i - 1; j++) {', type: 'control' as const, isPlaced: false },
    { id: 'block4', content: '      if (arr[j] > arr[j + 1]) {', type: 'control' as const, isPlaced: false },
    { id: 'block5', content: '        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '      }', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '    }', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '  return arr', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: 'const numbers = [5, 3, 8, 4, 2]', type: 'variable' as const, isPlaced: false },
    { id: 'block12', content: 'console.log(bubbleSort(numbers))', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12'],
  hint: "Implement the bubble sort algorithm by swapping adjacent elements",
  description: "Learn about sorting algorithms: Bubble Sort",
  expectedOutput: `[2, 3, 4, 5, 8]`
};

export const SEARCH_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'function binarySearch(arr, target) {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  let left = 0', type: 'variable' as const, isPlaced: false },
    { id: 'block3', content: '  let right = arr.length - 1', type: 'variable' as const, isPlaced: false },
    { id: 'block4', content: '  while (left <= right) {', type: 'control' as const, isPlaced: false },
    { id: 'block5', content: '    const mid = Math.floor((left + right) / 2)', type: 'variable' as const, isPlaced: false },
    { id: 'block6', content: '    if (arr[mid] === target) {', type: 'control' as const, isPlaced: false },
    { id: 'block7', content: '      return mid', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '    } else if (arr[mid] < target) {', type: 'control' as const, isPlaced: false },
    { id: 'block9', content: '      left = mid + 1', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '    } else {', type: 'control' as const, isPlaced: false },
    { id: 'block11', content: '      right = mid - 1', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '    }', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block14', content: '  return -1', type: 'code' as const, isPlaced: false },
    { id: 'block15', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block16', content: 'const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', type: 'variable' as const, isPlaced: false },
    { id: 'block17', content: 'console.log(binarySearch(sortedArray, 7))', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15', 'block16', 'block17'],
  hint: "Implement binary search by dividing the search interval in half each time",
  description: "Learn about search algorithms: Binary Search",
  expectedOutput: `6`
};

export const BIG_O_PUZZLE = {
  blocks: [
    { id: 'block1', content: '// O(1) - Constant Time', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: 'function getFirst(arr) {', type: 'function' as const, isPlaced: false },
    { id: 'block3', content: '  return arr[0]', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '// O(n) - Linear Time', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: 'function findElement(arr, target) {', type: 'function' as const, isPlaced: false },
    { id: 'block7', content: '  for (let i = 0; i < arr.length; i++) {', type: 'control' as const, isPlaced: false },
    { id: 'block8', content: '    if (arr[i] === target) return i', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '  return -1', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: 'console.log(getFirst([1, 2, 3, 4, 5]))', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: 'console.log(findElement([1, 2, 3, 4, 5], 3))', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13'],
  hint: "Understand the time complexity of different operations",
  description: "Learn about Big O Notation for algorithm efficiency",
  expectedOutput: `1\n2`
};

export const GRAPH_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const graph = {', type: 'variable' as const, isPlaced: false },
    { id: 'block2', content: '  A: ["B", "C"],', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  B: ["A", "D", "E"],', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  C: ["A", "F"],', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  D: ["B"],', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '  E: ["B", "F"],', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '  F: ["C", "E"]', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: 'function dfs(graph, start) {', type: 'function' as const, isPlaced: false },
    { id: 'block10', content: '  const visited = new Set()', type: 'variable' as const, isPlaced: false },
    { id: 'block11', content: '  function explore(node) {', type: 'function' as const, isPlaced: false },
    { id: 'block12', content: '    visited.add(node)', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: '    console.log(node)', type: 'code' as const, isPlaced: false },
    { id: 'block14', content: '    for (const neighbor of graph[node]) {', type: 'control' as const, isPlaced: false },
    { id: 'block15', content: '      if (!visited.has(neighbor)) {', type: 'control' as const, isPlaced: false },
    { id: 'block16', content: '        explore(neighbor)', type: 'code' as const, isPlaced: false },
    { id: 'block17', content: '      }', type: 'code' as const, isPlaced: false },
    { id: 'block18', content: '    }', type: 'code' as const, isPlaced: false },
    { id: 'block19', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block20', content: '  explore(start)', type: 'code' as const, isPlaced: false },
    { id: 'block21', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block22', content: 'dfs(graph, "A")', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15', 'block16', 'block17', 'block18', 'block19', 'block20', 'block21', 'block22'],
  hint: "Implement depth-first search traversal on a graph",
  description: "Learn about graph theory and traversal algorithms",
  expectedOutput: `A\nB\nD\nE\nF\nC`
};

export const DYNAMIC_PROGRAMMING_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'function fibonacci(n, memo = {}) {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  if (n in memo) return memo[n]', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  if (n <= 1) return n', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  return memo[n]', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: 'console.log(fibonacci(10))', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
  hint: "Use memoization to optimize recursive solutions",
  description: "Learn about dynamic programming with the Fibonacci sequence",
  expectedOutput: `55`
};
