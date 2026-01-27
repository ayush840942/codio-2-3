
import { Atom } from 'lucide-react';
import { LevelLearningContent } from './types';

export const reactLearningContent: Record<string, LevelLearningContent> = {
  // React Basics (Levels 21-30)
  '21': {
    topic: 'React',
    title: 'React Fundamentals: Components and JSX',
    icon: Atom,
    introduction: "React is a powerful JavaScript library for building user interfaces. Learn how to create reusable components and write JSX.",
    objectives: [
      'Understand React components',
      'Learn JSX syntax',
      'Create your first React component',
      'Understand component props'
    ],
    pages: [
      {
        title: 'What is React?',
        content: 'React is a JavaScript library for building user interfaces, especially web applications. It allows you to create reusable UI components.',
        concepts: [
          { 
            name: 'Component-Based', 
            description: 'React apps are built using reusable components',
            example: 'function Button() { return <button>Click me</button>; }',
            tips: ['Components are like building blocks', 'Each component has its own logic and styling']
          },
          { 
            name: 'Virtual DOM', 
            description: 'React uses a virtual representation of the DOM for efficiency',
            example: 'React updates only what changed, not the entire page',
            tips: ['Makes apps faster', 'Handles complex updates automatically']
          }
        ],
        visualExample: 'Think of React components like LEGO blocks - you build complex UIs from simple, reusable pieces.',
        practiceHint: 'Start with simple components and gradually build more complex ones!'
      },
      {
        title: 'JSX - JavaScript XML',
        content: 'JSX is a syntax extension for JavaScript that looks like HTML but is actually JavaScript. It makes writing React components intuitive.',
        concepts: [
          { 
            name: 'JSX Syntax', 
            description: 'Write HTML-like code inside JavaScript',
            example: 'const element = <h1>Hello, World!</h1>;',
            tips: ['JSX gets compiled to JavaScript', 'Use camelCase for attributes']
          },
          { 
            name: 'Embedding JavaScript', 
            description: 'Use curly braces to embed JavaScript expressions',
            example: 'const name = "John"; <h1>Hello, {name}!</h1>',
            tips: ['Use {} for dynamic content', 'Can include variables, functions, expressions']
          }
        ],
        visualExample: 'JSX bridges the gap between HTML markup and JavaScript logic.',
        practiceHint: 'Remember: JSX looks like HTML but follows JavaScript rules!'
      },
      {
        title: 'React Components',
        content: 'Components are the heart of React. They are reusable pieces of UI that can accept inputs (props) and return JSX.',
        concepts: [
          { 
            name: 'Function Components', 
            description: 'Simple functions that return JSX',
            example: 'function Welcome() { return <h1>Welcome!</h1>; }',
            tips: ['Easiest way to define components', 'Just JavaScript functions']
          },
          { 
            name: 'Props', 
            description: 'Inputs passed to components to customize them',
            example: 'function Welcome(props) { return <h1>Hello, {props.name}!</h1>; }',
            tips: ['Props are read-only', 'Make components reusable']
          }
        ],
        visualExample: 'Components are like functions - they take inputs (props) and return outputs (JSX).',
        practiceHint: 'Think of props as arguments you pass to customize your components!'
      },
      {
        title: 'Building Your First Component',
        content: 'Now you\'re ready to create React components! Remember: components are reusable, accept props, and return JSX.',
        concepts: [
          { 
            name: 'Component Best Practices', 
            description: 'Write clean, reusable React components',
            example: 'Use descriptive names, keep components small, use props effectively',
            tips: ['Start component names with capital letters', 'Keep components focused on one thing']
          },
          { 
            name: 'Common Patterns', 
            description: 'Typical React component structures',
            example: 'Functional components with props, conditional rendering',
            tips: ['Use modern functional components', 'Leverage React hooks for state']
          }
        ],
        visualExample: 'Your task: Create a React component that displays a personalized greeting.',
        practiceHint: 'Start simple - create a component that uses props to display dynamic content!'
      }
    ],
    summary: 'React components and JSX are the foundation of modern web applications. Master them to build powerful, interactive UIs!',
  }
};
