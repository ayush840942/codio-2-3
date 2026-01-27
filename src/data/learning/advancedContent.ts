
import { Rocket } from 'lucide-react';
import { LevelLearningContent } from './types';

export const advancedLearningContent: Record<string, LevelLearningContent> = {
  // Advanced Topics (Levels 91-200)
  '91': {
    topic: 'Advanced',
    title: 'Advanced Programming: Algorithms and Data Structures',
    icon: Rocket,
    introduction: "Advanced programming concepts help you write efficient, scalable code. Learn algorithms and data structures that power modern applications.",
    objectives: [
      'Understand algorithm complexity',
      'Learn common data structures',
      'Master problem-solving techniques',
      'Optimize code performance'
    ],
    pages: [
      {
        title: 'Algorithm Fundamentals',
        content: 'Algorithms are step-by-step procedures for solving problems. Understanding their efficiency is crucial for building scalable applications.',
        concepts: [
          { 
            name: 'Big O Notation', 
            description: 'Measure algorithm efficiency and scalability',
            example: 'O(1) constant time, O(n) linear time, O(n²) quadratic time',
            tips: ['Focus on worst-case scenarios', 'Consider how performance scales with input size']
          },
          { 
            name: 'Algorithm Design', 
            description: 'Systematic approach to solving computational problems',
            example: 'Divide and conquer, greedy algorithms, dynamic programming',
            tips: ['Break problems into smaller parts', 'Consider multiple approaches']
          }
        ],
        visualExample: 'Think of algorithms like recipes - some are faster to execute, some use fewer ingredients (memory).',
        practiceHint: 'Start by analyzing simple algorithms to understand their efficiency!'
      },
      {
        title: 'Data Structures',
        content: 'Data structures organize data in memory for efficient access and modification. Choose the right structure for your specific needs.',
        concepts: [
          { 
            name: 'Arrays and Lists', 
            description: 'Sequential collections of elements',
            example: 'Arrays for fixed size, dynamic arrays for flexible size',
            tips: ['Fast access by index', 'Consider insertion/deletion costs']
          },
          { 
            name: 'Hash Tables', 
            description: 'Key-value pairs for fast lookups',
            example: 'JavaScript objects, Python dictionaries',
            tips: ['O(1) average lookup time', 'Great for caching and indexing']
          }
        ],
        visualExample: 'Data structures are like different storage systems - arrays like numbered shelves, hash tables like labeled drawers.',
        practiceHint: 'Consider what operations you need most: searching, inserting, or deleting!'
      },
      {
        title: 'Problem-Solving Strategies',
        content: 'Advanced problem-solving requires systematic approaches and pattern recognition to tackle complex challenges efficiently.',
        concepts: [
          { 
            name: 'Divide and Conquer', 
            description: 'Break problems into smaller, manageable subproblems',
            example: 'Merge sort, binary search, quicksort',
            tips: ['Solve subproblems independently', 'Combine solutions efficiently']
          },
          { 
            name: 'Dynamic Programming', 
            description: 'Solve complex problems by breaking them down and storing solutions',
            example: 'Fibonacci sequence, shortest path problems',
            tips: ['Identify overlapping subproblems', 'Store and reuse solutions']
          }
        ],
        visualExample: 'Problem-solving strategies are like different tools in a toolbox - choose the right one for each job.',
        practiceHint: 'Practice recognizing which strategy fits different types of problems!'
      },
      {
        title: 'Performance Optimization',
        content: 'Writing efficient code requires understanding bottlenecks and applying optimization techniques strategically.',
        concepts: [
          { 
            name: 'Code Profiling', 
            description: 'Identify performance bottlenecks in your code',
            example: 'Measure execution time, memory usage, function calls',
            tips: ['Measure before optimizing', 'Focus on the biggest bottlenecks first']
          },
          { 
            name: 'Optimization Techniques', 
            description: 'Methods to improve code performance',
            example: 'Caching, lazy loading, algorithm improvements',
            tips: ['Balance readability and performance', 'Premature optimization is the root of all evil']
          }
        ],
        visualExample: 'Your task: Analyze and optimize an algorithm for better performance.',
        practiceHint: 'Start by understanding what makes code slow, then apply targeted optimizations!'
      }
    ],
    summary: 'Advanced programming concepts enable you to build efficient, scalable applications. Master algorithms and data structures for professional development!',
  }
};
