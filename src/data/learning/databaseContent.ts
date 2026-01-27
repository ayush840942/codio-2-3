
import { Database } from 'lucide-react';
import { LevelLearningContent } from './types';

export const databaseLearningContent: Record<string, LevelLearningContent> = {
  // Database Fundamentals (Levels 76-90)
  '76': {
    topic: 'Database',
    title: 'Database Fundamentals: Storing and Retrieving Data',
    icon: Database,
    introduction: "Databases are essential for storing and managing data in applications. Learn how to structure data and write basic SQL queries.",
    objectives: [
      'Understand database concepts',
      'Learn about tables and relationships',
      'Write basic SQL queries',
      'Practice data manipulation'
    ],
    pages: [
      {
        title: 'What are Databases?',
        content: 'Databases are organized collections of data that can be easily accessed, managed, and updated. They are essential for most applications.',
        concepts: [
          { 
            name: 'Data Organization', 
            description: 'Databases organize data in tables with rows and columns',
            example: 'Users table with columns: id, name, email, age',
            tips: ['Tables are like spreadsheets', 'Each row is a record, each column is a field']
          },
          { 
            name: 'Database Management Systems', 
            description: 'Software that manages databases (MySQL, PostgreSQL, etc.)',
            example: 'DBMS handles storage, retrieval, security, backup',
            tips: ['Different systems for different needs', 'SQL is the common language']
          }
        ],
        visualExample: 'Think of a database as a digital filing cabinet with organized folders and labeled files.',
        practiceHint: 'Start by thinking about what data your application needs to store!'
      },
      {
        title: 'Tables and Relationships',
        content: 'Database tables store related data, and relationships connect tables together to avoid data duplication.',
        concepts: [
          { 
            name: 'Database Tables', 
            description: 'Structured collections of related data',
            example: 'Users table, Posts table, Categories table',
            tips: ['Each table should have a clear purpose', 'Use descriptive table names']
          },
          { 
            name: 'Primary Keys', 
            description: 'Unique identifiers for each row in a table',
            example: 'user_id in Users table, post_id in Posts table',
            tips: ['Usually auto-incrementing numbers', 'Must be unique for each row']
          }
        ],
        visualExample: 'Tables are like different sections of a library, each organizing specific types of information.',
        practiceHint: 'Think about how your data naturally groups together!'
      },
      {
        title: 'SQL Basics',
        content: 'SQL (Structured Query Language) is used to communicate with databases. Learn the fundamental commands for data operations.',
        concepts: [
          { 
            name: 'SELECT Queries', 
            description: 'Retrieve data from database tables',
            example: 'SELECT name, email FROM users WHERE age > 18;',
            tips: ['Specify columns you want', 'Use WHERE to filter results']
          },
          { 
            name: 'INSERT Statements', 
            description: 'Add new data to tables',
            example: 'INSERT INTO users (name, email) VALUES ("John", "john@email.com");',
            tips: ['Specify table and columns', 'Provide values in correct order']
          }
        ],
        visualExample: 'SQL commands are like asking specific questions to your data: "Show me all users from California".',
        practiceHint: 'Start with simple SELECT queries to explore your data!'
      },
      {
        title: 'Working with Data',
        content: 'Now you\'re ready to work with databases! Remember: structure your data logically and use SQL to interact with it.',
        concepts: [
          { 
            name: 'Data Types', 
            description: 'Different types of data that can be stored',
            example: 'TEXT for names, INTEGER for ages, DATE for birthdays',
            tips: ['Choose appropriate types for your data', 'Consider data size and format']
          },
          { 
            name: 'Best Practices', 
            description: 'Guidelines for effective database design',
            example: 'Use clear naming, avoid data duplication, plan relationships',
            tips: ['Design before implementing', 'Think about how data connects']
          }
        ],
        visualExample: 'Your task: Design a simple database table and write a query to retrieve data.',
        practiceHint: 'Start with a simple table structure and basic SELECT queries!'
      }
    ],
    summary: 'Databases are the backbone of data-driven applications. Master tables, relationships, and SQL for effective data management!',
  }
};
