
import { Box } from 'lucide-react';
import { LevelLearningContent } from './types';

export const oopLearningContent: Record<string, LevelLearningContent> = {
  // OOP Fundamentals (Levels 61-75)
  '61': {
    topic: 'OOP',
    title: 'Object-Oriented Programming: Classes and Objects',
    icon: Box,
    introduction: "Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects and classes, making code more modular and reusable.",
    objectives: [
      'Understand OOP concepts',
      'Learn about classes and objects',
      'Master constructors and methods',
      'Practice encapsulation principles'
    ],
    pages: [
      {
        title: 'What is Object-Oriented Programming?',
        content: 'OOP is a programming paradigm that uses objects to represent real-world entities. It helps organize complex code into manageable, reusable pieces.',
        concepts: [
          { 
            name: 'Objects', 
            description: 'Instances of classes that contain data and methods',
            example: 'A car object with properties (color, speed) and methods (start, stop)',
            tips: ['Objects represent real-world things', 'Combine data and behavior']
          },
          { 
            name: 'Classes', 
            description: 'Blueprints or templates for creating objects',
            example: 'Car class defines what all car objects will have',
            tips: ['Classes are like cookie cutters', 'Objects are the actual cookies']
          }
        ],
        visualExample: 'Think of classes as blueprints and objects as the actual buildings constructed from those blueprints.',
        practiceHint: 'Start by identifying real-world objects and their properties!'
      },
      {
        title: 'Classes and Constructors',
        content: 'Classes define the structure and behavior of objects. Constructors are special methods that initialize new objects.',
        concepts: [
          { 
            name: 'Class Definition', 
            description: 'How to define a class with properties and methods',
            example: 'class Car { constructor(color) { this.color = color; } }',
            tips: ['Use class keyword', 'Define properties in constructor']
          },
          { 
            name: 'Constructor Method', 
            description: 'Special method that runs when creating new objects',
            example: 'constructor(name, age) { this.name = name; this.age = age; }',
            tips: ['Initializes object properties', 'Runs automatically when object is created']
          }
        ],
        visualExample: 'Constructors are like assembly instructions - they set up each new object with its initial values.',
        practiceHint: 'Think about what information each object needs when it\'s created!'
      },
      {
        title: 'Methods and Encapsulation',
        content: 'Methods are functions that belong to a class. Encapsulation means keeping related data and methods together.',
        concepts: [
          { 
            name: 'Instance Methods', 
            description: 'Functions that operate on object data',
            example: 'drive() { this.speed += 10; }',
            tips: ['Use this keyword to access object properties', 'Methods can modify object state']
          },
          { 
            name: 'Encapsulation', 
            description: 'Bundling data and methods that work together',
            example: 'Car class contains speed property and drive() method',
            tips: ['Keep related things together', 'Hide internal implementation details']
          }
        ],
        visualExample: 'Encapsulation is like a car - you use the steering wheel and pedals without knowing how the engine works.',
        practiceHint: 'Group related properties and methods in the same class!'
      },
      {
        title: 'Creating and Using Objects',
        content: 'Now you\'re ready to create classes and instantiate objects! Remember: classes are blueprints, objects are instances.',
        concepts: [
          { 
            name: 'Object Instantiation', 
            description: 'Creating new objects from a class',
            example: 'const myCar = new Car("red");',
            tips: ['Use new keyword', 'Pass arguments to constructor']
          },
          { 
            name: 'Accessing Properties and Methods', 
            description: 'How to use object properties and call methods',
            example: 'myCar.color; myCar.drive();',
            tips: ['Use dot notation', 'Properties store data, methods perform actions']
          }
        ],
        visualExample: 'Your task: Create a class and instantiate objects from it.',
        practiceHint: 'Start with a simple class that has a few properties and one method!'
      }
    ],
    summary: 'OOP helps organize complex code into manageable, reusable classes and objects. Master these concepts for better code structure!',
  }
};
