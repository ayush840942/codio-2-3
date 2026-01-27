
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, Target, Lightbulb, Star, CheckCircle, Clock, Trophy } from 'lucide-react';

interface DetailedLearningConceptsProps {
  levelId: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const DetailedLearningConcepts: React.FC<DetailedLearningConceptsProps> = ({
  levelId,
  topic,
  difficulty
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getTopicDetails = (level: number, topicName: string) => {
    if (level <= 10) {
      return {
        chapter: 'HTML Fundamentals',
        concepts: [
          { name: 'Document Structure', description: 'Learn the basic HTML document structure with DOCTYPE, html, head, and body tags' },
          { name: 'Text Elements', description: 'Master headings (h1-h6), paragraphs, and text formatting' },
          { name: 'Links and Navigation', description: 'Create hyperlinks and understand URL structures' },
          { name: 'Images and Media', description: 'Embed images, videos, and other media content' },
          { name: 'Lists and Tables', description: 'Structure data using ordered/unordered lists and tables' }
        ],
        objectives: [
          'Understand HTML document structure',
          'Create semantic HTML elements',
          'Build accessible web content',
          'Implement proper tag nesting'
        ],
        blocks: ['Document tags', 'Content elements', 'Semantic markup', 'Attributes'],
        practiceHints: [
          'Always close your HTML tags',
          'Use semantic elements for better accessibility',
          'Validate your HTML structure',
          'Keep your code properly indented'
        ]
      };
    } else if (level <= 20) {
      return {
        chapter: 'CSS Styling',
        concepts: [
          { name: 'Selectors', description: 'Learn element, class, ID, and attribute selectors' },
          { name: 'Box Model', description: 'Understand margin, padding, border, and content areas' },
          { name: 'Flexbox', description: 'Create flexible layouts with flexbox properties' },
          { name: 'Grid', description: 'Build complex layouts using CSS Grid' },
          { name: 'Responsive Design', description: 'Make websites work on all device sizes' }
        ],
        objectives: [
          'Master CSS selectors and specificity',
          'Understand the box model',
          'Create responsive layouts',
          'Apply modern CSS techniques'
        ],
        blocks: ['Selectors', 'Properties', 'Values', 'Media queries'],
        practiceHints: [
          'Use specific selectors for better control',
          'Understand CSS specificity rules',
          'Practice responsive design principles',
          'Test on different screen sizes'
        ]
      };
    } else if (level <= 40) {
      return {
        chapter: 'JavaScript Fundamentals',
        concepts: [
          { name: 'Variables and Data Types', description: 'Learn about let, const, var, and different data types' },
          { name: 'Functions', description: 'Create reusable code blocks with functions' },
          { name: 'Control Flow', description: 'Use if/else, loops, and switch statements' },
          { name: 'DOM Manipulation', description: 'Interact with HTML elements using JavaScript' },
          { name: 'Events', description: 'Handle user interactions and browser events' }
        ],
        objectives: [
          'Understand JavaScript syntax',
          'Write functions and control structures',
          'Manipulate the DOM',
          'Handle user events'
        ],
        blocks: ['Variables', 'Functions', 'Conditionals', 'Loops', 'Events'],
        practiceHints: [
          'Use descriptive variable names',
          'Keep functions small and focused',
          'Handle errors gracefully',
          'Practice debugging techniques'
        ]
      };
    } else if (level <= 60) {
      return {
        chapter: 'React Development',
        concepts: [
          { name: 'Components', description: 'Build reusable UI components' },
          { name: 'Props', description: 'Pass data between components' },
          { name: 'State Management', description: 'Manage component state with hooks' },
          { name: 'Event Handling', description: 'Handle user interactions in React' },
          { name: 'Lifecycle', description: 'Understand component lifecycle and effects' }
        ],
        objectives: [
          'Create functional React components',
          'Use props and state effectively',
          'Handle events in React',
          'Understand React hooks'
        ],
        blocks: ['JSX', 'Components', 'Props', 'State', 'Hooks'],
        practiceHints: [
          'Keep components small and focused',
          'Use proper naming conventions',
          'Handle state updates correctly',
          'Practice component composition'
        ]
      };
    } else if (level <= 75) {
      return {
        chapter: 'Object-Oriented Programming',
        concepts: [
          { name: 'Classes', description: 'Create blueprints for objects' },
          { name: 'Inheritance', description: 'Extend classes and reuse code' },
          { name: 'Encapsulation', description: 'Hide internal implementation details' },
          { name: 'Polymorphism', description: 'Use objects of different types uniformly' },
          { name: 'Abstraction', description: 'Focus on essential features' }
        ],
        objectives: [
          'Understand OOP principles',
          'Create and use classes',
          'Implement inheritance',
          'Apply encapsulation and abstraction'
        ],
        blocks: ['Classes', 'Methods', 'Properties', 'Inheritance'],
        practiceHints: [
          'Design classes with single responsibility',
          'Use inheritance wisely',
          'Encapsulate data properly',
          'Think in terms of objects'
        ]
      };
    } else if (level <= 90) {
      return {
        chapter: 'Database Management',
        concepts: [
          { name: 'SQL Queries', description: 'Write SELECT, INSERT, UPDATE, DELETE statements' },
          { name: 'Joins', description: 'Combine data from multiple tables' },
          { name: 'Indexing', description: 'Optimize database performance' },
          { name: 'Transactions', description: 'Ensure data integrity' },
          { name: 'NoSQL', description: 'Work with document-based databases' }
        ],
        objectives: [
          'Write efficient SQL queries',
          'Design database schemas',
          'Understand database relationships',
          'Optimize query performance'
        ],
        blocks: ['SELECT', 'JOIN', 'WHERE', 'ORDER BY', 'GROUP BY'],
        practiceHints: [
          'Always use proper indexing',
          'Understand query execution plans',
          'Practice with real datasets',
          'Learn about database normalization'
        ]
      };
    } else {
      return {
        chapter: 'Advanced Programming',
        concepts: [
          { name: 'Algorithms', description: 'Implement efficient problem-solving strategies' },
          { name: 'Data Structures', description: 'Use appropriate data structures for different scenarios' },
          { name: 'Design Patterns', description: 'Apply common programming patterns' },
          { name: 'Performance', description: 'Optimize code for speed and memory' },
          { name: 'Architecture', description: 'Design scalable software systems' }
        ],
        objectives: [
          'Implement efficient algorithms',
          'Choose appropriate data structures',
          'Apply design patterns',
          'Optimize performance'
        ],
        blocks: ['Algorithms', 'Data structures', 'Patterns', 'Optimization'],
        practiceHints: [
          'Analyze time and space complexity',
          'Choose the right data structure',
          'Practice algorithmic thinking',
          'Consider scalability from the start'
        ]
      };
    }
  };

  const topicDetails = getTopicDetails(levelId, topic);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-800">Learning Path</h2>
        </div>
        <p className="text-blue-600">Level {levelId} • {topicDetails.chapter}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {topic}
          </Badge>
        </div>
      </motion.div>

      {/* Detailed Content */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="concepts">Concepts</TabsTrigger>
              <TabsTrigger value="objectives">Objectives</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Chapter Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{topicDetails.chapter}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Level {levelId} focuses on {topic.toLowerCase()} fundamentals
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-green-600" />
                      Code Blocks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {topicDetails.blocks.map((block, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                          {block}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="concepts" className="space-y-4 mt-6">
              <ScrollArea className="h-96">
                <div className="space-y-4 pr-4">
                  {topicDetails.concepts.map((concept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            {concept.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{concept.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="objectives" className="space-y-4 mt-6">
              <div className="space-y-3">
                {topicDetails.objectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-green-800 font-medium">{objective}</span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4 mt-6">
              <div className="space-y-3">
                {topicDetails.practiceHints.map((hint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <Star className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <span className="text-yellow-800">{hint}</span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedLearningConcepts;
