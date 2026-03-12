
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
    if (level <= 6) {
      return {
        chapter: 'Programming Fundamentals',
        concepts: [
          { name: 'console.log()', description: 'Display messages and data in the console' },
          { name: 'Variables', description: 'Store and reuse information in your programs' },
          { name: 'Data Types', description: 'Work with numbers, strings, and booleans' },
          { name: 'Basic Logic', description: 'Understand how computers follow instructions' }
        ],
        objectives: [
          'Understand code execution flow',
          'Master text output with console.log',
          'Assign and use basic variables',
          'Learn basic mathematical operations'
        ],
        blocks: ['console.log', 'let', 'const', 'operators'],
        practiceHints: [
          'Programming is step-by-step logic',
          'Pay attention to quotes and semicolons',
          'Think like a computer for a moment',
          'Experiment with different output messages'
        ]
      };
    } else if (level <= 11) {
      return {
        chapter: 'HTML Fundamentals',
        concepts: [
          { name: 'Document Structure', description: 'Learn the basic HTML document structure with tags' },
          { name: 'Text Elements', description: 'Master headings (h1-h6), paragraphs, and lists' },
          { name: 'Links & Navigation', description: 'Connect webpages together with hyperlinks' },
          { name: 'Semantic Markup', description: 'Use tags that describe the content meaning' }
        ],
        objectives: [
          'Build a basic webpage structure',
          'Create readable text content',
          'Implement site navigation',
          'Understand tag nesting rules'
        ],
        blocks: ['<html>', '<body>', '<h1>', '<a>', '<p>'],
        practiceHints: [
          'HTML is the skeleton of the web',
          'Always close your tags properly',
          'Nesting is like layers of an onion',
          'Use the right tag for the job'
        ]
      };
    } else if (level <= 16) {
      return {
        chapter: 'CSS Styling',
        concepts: [
          { name: 'Selecters & Properties', description: 'Target elements and change their appearance' },
          { name: 'Box Model', description: 'Manage margins, borders, padding, and content' },
          { name: 'Colors & Backgrounds', description: 'Apply vibrant colors and visual styles' },
          { name: 'Layout Basics', description: 'Position elements on the screen effectively' }
        ],
        objectives: [
          'Style HTML with colors and fonts',
          'Control spacing between elements',
          'Understand how CSS styles cascade',
          'Design visually appealing layouts'
        ],
        blocks: ['color', 'font-size', 'margin', 'padding'],
        practiceHints: [
          'CSS is the skin of your webpage',
          'Think of the Box Model for every element',
          'Use specific selectors to avoid "leaking" styles',
          'Colors should be harmonious and readable'
        ]
      };
    } else if (level <= 21) {
      return {
        chapter: 'JavaScript Core',
        concepts: [
          { name: 'Functions', description: 'Create reusable blocks of logic' },
          { name: 'Arrays & Lists', description: 'Store collections of data efficiently' },
          { name: 'Control Flow', description: 'Make decisions with if/else and loops' },
          { name: 'Logic Operators', description: 'Combine conditions for complex behavior' }
        ],
        objectives: [
          'Write clean, reusable functions',
          'Process lists of information',
          'Implement conditional branches',
          'Master program flow control'
        ],
        blocks: ['function', 'if', 'else', 'for', 'arrays'],
        practiceHints: [
          'JavaScript brings webpages to life',
          'Keep your functions small and focused',
          'Don\'t repeat yourself (DRY principle)',
          'Console log is your best friend for debugging'
        ]
      };
    } else if (level <= 26) {
      return {
        chapter: 'React Development',
        concepts: [
          { name: 'Components', description: 'Build reusable UI building blocks' },
          { name: 'Props & Data', description: 'Pass information down the component tree' },
          { name: 'State (useState)', description: 'Handle dynamic data and user input' },
          { name: 'Effects (useEffect)', description: 'Synchronize your app with external systems' }
        ],
        objectives: [
          'Create functional React components',
          'Manage local component state',
          'Pass data via props effectively',
          'Handle component side effects'
        ],
        blocks: ['useState', 'useEffect', 'props', 'JSX'],
        practiceHints: [
          'React is all about component thinking',
          'Keep your state flat and minimal',
          'Props flow down, events bubble up',
          'State updates should be immutable'
        ]
      };
    } else if (level <= 36) {
      return {
        chapter: 'Python Programming',
        concepts: [
          { name: 'Python Syntax', description: 'Learn the clean, readable way to write code' },
          { name: 'List Comprehension', description: 'Create lists in a concise, powerful way' },
          { name: 'Dicitonaries', description: 'Store data in key-value pairs (fast lookups)' },
          { name: 'Indentation Rules', description: 'Understand how whitespace defines code blocks' }
        ],
        objectives: [
          'Write idiomatic Python code',
          'Process data collections efficiently',
          'Master Python dictionary operations',
          'Understand core Pythonic principles'
        ],
        blocks: ['def', 'if', 'in', 'list', 'dict'],
        practiceHints: [
          'Python is like writing executable English',
          'Whitespace matters - keep your indents clean',
          'Use dictionaries for high-speed data access',
          'Readability is a core Python feature'
        ]
      };
    } else if (level <= 75) {
      return {
        chapter: 'Advanced Logic & OOP',
        concepts: [
          { name: 'Classes', description: 'Blueprints for creating objects' },
          { name: 'Inheritance', description: 'Reuse logic across similar objects' },
          { name: 'Encapsulation', description: 'Protect data from unauthorized access' },
          { name: 'Polymorphism', description: 'One interface, multiple implementations' }
        ],
        objectives: [
          'Think in terms of Objects',
          'Design scalable system architectures',
          'Master code reuse via inheritance',
          'Apply solid OOP principles'
        ],
        blocks: ['class', 'constructor', 'extends', 'super'],
        practiceHints: [
          'OOP helps manage complexity in large apps',
          'Composition is often better than inheritance',
          'Keep classes focused on one responsibility',
          'Interfaces define what an object can do'
        ]
      };
    } else if (level <= 90) {
      return {
        chapter: 'Data & Databases',
        concepts: [
          { name: 'SQL Queries', description: 'Talk to databases with structured queries' },
          { name: 'Data Relationships', description: 'Connect different tables together' },
          { name: 'Indexing', description: 'Make your database searches lightning fast' },
          { name: 'NoSQL Basics', description: 'Explore flexible, document-based storage' }
        ],
        objectives: [
          'Write efficient SELECT and JOIN queries',
          'Design clean database schemas',
          'Optimize query performance',
          'Ensure data integrity and scaling'
        ],
        blocks: ['SELECT', 'FROM', 'WHERE', 'JOIN'],
        practiceHints: [
          'Data is the heart of every application',
          'Always index your frequently searched columns',
          'Normalize your data to avoid redundancy',
          'Think about how data flows from DB to UI'
        ]
      };
    } else {
      return {
        chapter: 'Fullstack Mastery',
        concepts: [
          { name: 'System Design', description: 'Architect large, scalable applications' },
          { name: 'Performance', description: 'Optimize for speed and efficiency' },
          { name: 'Security', description: 'Protect user data and app integrity' },
          { name: 'Cloud & DevOps', description: 'Deploy and manage apps in the cloud' }
        ],
        objectives: [
          'Master high-level system architecture',
          'Implement advanced security patterns',
          'Optimize end-to-end performance',
          'Handle large-scale data processing'
        ],
        blocks: ['Architecture', 'Scaling', 'Auth', 'API'],
        practiceHints: [
          'A master developer sees the whole picture',
          'Security is never an afterthought',
          'Measure performance before optimizing',
          'Keep learning - technology never stops'
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
