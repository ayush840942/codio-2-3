
import { Zap } from 'lucide-react';
import { LevelLearningContent } from './types';

export const javascriptLearningContent: Record<string, LevelLearningContent> = {
  '5': {
    topic: 'JavaScript',
    title: 'JavaScript Basics: Adding Interactivity',
    icon: Zap,
    introduction: "JavaScript brings web pages to life with interactivity, dynamic content, and user engagement. It's the programming language of the web.",
    objectives: [
      'Understand what JavaScript does',
      'Learn basic syntax and variables',
      'Master functions and events',
      'Create interactive web elements'
    ],
    pages: [
      {
        title: 'What is JavaScript?',
        content: 'JavaScript is a programming language that adds behavior and interactivity to web pages. While HTML provides structure and CSS provides style, JavaScript provides functionality.',
        concepts: [
          { 
            name: 'Programming Language', 
            description: 'JavaScript is a full programming language with logic and computation',
            example: 'Variables, functions, loops, conditions',
            tips: ['More complex than HTML/CSS', 'Enables dynamic behavior']
          },
          { 
            name: 'Client-Side Scripting', 
            description: 'JavaScript runs in the user\'s browser',
            example: 'Form validation, animations, user interactions',
            tips: ['Executes on user\'s device', 'Responds to user actions immediately']
          }
        ],
        visualExample: 'Think of JavaScript as the brain that makes web pages think and respond.',
        practiceHint: 'JavaScript makes static web pages come alive with interactivity!'
      },
      {
        title: 'Variables and Data Types',
        content: 'Variables store data that your JavaScript programs can use and manipulate. Understanding data types is fundamental to programming.',
        concepts: [
          { 
            name: 'Variables', 
            description: 'Containers that store data values',
            example: 'let name = "John"; let age = 25;',
            tips: ['Use let for changeable values', 'Use const for fixed values']
          },
          { 
            name: 'Data Types', 
            description: 'Different kinds of data JavaScript can work with',
            example: 'Strings ("text"), Numbers (42), Booleans (true/false)',
            tips: ['Strings need quotes', 'Numbers don\'t need quotes', 'Booleans are true or false']
          }
        ],
        visualExample: 'Variables are like labeled boxes that store different types of information.',
        practiceHint: 'Choose descriptive variable names that explain what they store!'
      },
      {
        title: 'Functions and Events',
        content: 'Functions are reusable blocks of code that perform specific tasks. Events allow JavaScript to respond to user interactions.',
        concepts: [
          { 
            name: 'Functions', 
            description: 'Reusable blocks of code that perform tasks',
            example: 'function greet() { alert("Hello!"); }',
            tips: ['Define once, use many times', 'Can accept parameters', 'Can return values']
          },
          { 
            name: 'Events', 
            description: 'Actions that happen in the browser that JavaScript can respond to',
            example: 'click, mouseover, keypress, submit',
            tips: ['Connect functions to events', 'Make pages interactive', 'Respond to user actions']
          }
        ],
        visualExample: 'Functions are like recipes - instructions that can be followed whenever needed.',
        practiceHint: 'Think of events as triggers that make your functions run!'
      },
      {
        title: 'Ready to Code!',
        content: 'You\'re ready to write JavaScript! Start with simple interactions and build up to more complex functionality.',
        concepts: [
          { 
            name: 'DOM Manipulation', 
            description: 'Changing HTML elements with JavaScript',
            example: 'document.getElementById("myId").innerHTML = "New text";',
            tips: ['Select elements first', 'Then modify their properties', 'Changes happen instantly']
          },
          { 
            name: 'Debugging Tips', 
            description: 'Finding and fixing problems in your code',
            example: 'Use console.log() to see what\'s happening',
            tips: ['Check browser console for errors', 'Test small pieces at a time', 'Use console.log() liberally']
          }
        ],
        visualExample: 'Your task: Write JavaScript to make a button change text when clicked.',
        practiceHint: 'Start simple - get one thing working before adding complexity!'
      }
    ],
    summary: 'JavaScript adds interactivity and dynamic behavior to web pages. Master variables, functions, and events to create engaging user experiences!',
  }
};
