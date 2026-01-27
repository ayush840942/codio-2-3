
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpectedOutputAreaProps {
  expectedOutput: string;
  currentOutput?: string;
  isCorrect?: boolean;
  showComparison?: boolean;
  levelId?: number;
  puzzleType?: string;
}

const ExpectedOutputArea: React.FC<ExpectedOutputAreaProps> = ({
  expectedOutput,
  currentOutput,
  isCorrect,
  showComparison,
  levelId,
  puzzleType
}) => {
  const getQuestionForLevel = (level: number) => {
    // Programming Fundamentals (1-6)
    if (level <= 6) {
      const fundamentalsQuestions = [
        "Create your first program that displays 'Hello World' to the console",
        "Declare a variable and display its value using console.log",
        "Work with text strings and combine them using the + operator",
        "Perform mathematical calculations using arithmetic operators",
        "Make decisions with if statements to check conditions",
        "Use loops to repeat actions and display numbers 1 to 3"
      ];
      return fundamentalsQuestions[level - 1] || fundamentalsQuestions[0];
    }
    
    // HTML (7-11)
    if (level <= 11) {
      const htmlQuestions = [
        "Create a basic HTML document structure with DOCTYPE, html, head, and body tags",
        "Create different heading levels using h1, h2, and h3 tags",
        "Create paragraph elements using p tags",
        "Create hyperlinks using anchor tags with href attributes",
        "Create an unordered list with three items using ul and li tags"
      ];
      return htmlQuestions[level - 7] || htmlQuestions[0];
    }
    
    // CSS (12-16)
    if (level <= 16) {
      const cssQuestions = [
        "Apply color styles to elements using color and background-color properties",
        "Change text size using font-size and font-weight properties",
        "Add outer spacing around elements using margin properties",
        "Add inner spacing to elements using padding properties",
        "Set background colors and images using background properties"
      ];
      return cssQuestions[level - 12] || cssQuestions[0];
    }
    
    // JavaScript (17-21)
    if (level <= 21) {
      const jsQuestions = [
        "Create and call a JavaScript function that displays a message",
        "Work with arrays - create an array and access elements by index",
        "Create and use objects with properties and access them with dot notation",
        "Use loops to iterate through arrays and display each element",
        "Use if-else statements to check conditions and make decisions"
      ];
      return jsQuestions[level - 17] || jsQuestions[0];
    }
    
    // React (22-26)
    if (level <= 26) {
      const reactQuestions = [
        "Create a basic React functional component that returns JSX",
        "Use props in React components to pass data between components",
        "Use the useState hook to manage state in React components",
        "Handle events in React components with event handlers",
        "Render lists in React using the map function"
      ];
      return reactQuestions[level - 22] || reactQuestions[0];
    }
    
    // Advanced levels (27+)
    if (level <= 41) {
      return `Build an advanced programming solution for Level ${level}. Focus on implementing the core functionality step by step.`;
    }
    
    if (level <= 44) {
      return `Design a database query solution. What SQL statements or database operations will retrieve the correct data?`;
    }
    
    if (level <= 57) {
      return `Implement a data structure solution. What data structures and algorithms will solve this problem efficiently?`;
    }
    
    if (level <= 62) {
      return `Solve this algorithmic challenge. What algorithm or approach will work best for this problem?`;
    }
    
    if (level <= 67) {
      return `Build a web development solution. What web technologies and techniques will create the desired functionality?`;
    }
    
    if (level <= 71) {
      return `Implement testing for your code. What testing approach will verify that your solution works correctly?`;
    }
    
    if (level <= 76) {
      return `Use a framework to build this solution. What framework features will help you implement this efficiently?`;
    }
    
    if (level <= 81) {
      return `Create a mobile development solution. What mobile-specific features will enhance the user experience?`;
    }
    
    if (level <= 86) {
      return `Implement DevOps practices. What deployment and automation strategies will make this solution production-ready?`;
    }
    
    if (level <= 91) {
      return `Apply security best practices. What security measures will protect this solution from vulnerabilities?`;
    }
    
    if (level <= 96) {
      return `Optimize for performance. What performance improvements will make this solution faster and more efficient?`;
    }
    
    if (level <= 101) {
      return `Implement AI/ML functionality. What machine learning or AI techniques will solve this problem?`;
    }
    
    return `Master this advanced programming challenge. What expert-level techniques will you use to solve this complex problem?`;
  };

  const question = getQuestionForLevel(levelId || 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-blue-800 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Challenge Question
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <p className="text-blue-800 font-medium leading-relaxed">
              {question}
            </p>
          </div>

          {showComparison && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Expected Result:</h4>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {expectedOutput}
                </pre>
              </div>

              {currentOutput && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <h4 className="font-semibold text-gray-800">Your Output:</h4>
                    <Badge 
                      className={`${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {isCorrect ? 'Correct!' : 'Try Again'}
                    </Badge>
                  </div>
                  <div className={`rounded-lg p-3 border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                      {currentOutput}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpectedOutputArea;
