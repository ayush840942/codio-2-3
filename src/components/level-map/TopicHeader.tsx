
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  BookOpen, 
  Layers, 
  Lightbulb,
  Palette,
  Smartphone,
  Database,
  Shield,
  Zap,
  Brain,
  Globe,
  TestTube,
  Settings,
  Cpu,
  BarChart3,
  Blocks,
  Gamepad2,
  GraduationCap
} from 'lucide-react';

interface TopicHeaderProps {
  topic: string;
  completedInTopic: number;
  totalInTopic: number;
  topicProgress: number;
  topicIndex: number;
}

const getTopicIcon = (topic: string) => {
  switch (topic) {
    case 'HTML':
      return <Code className="h-5 w-5 text-orange-500" />;
    case 'CSS':
      return <Layers className="h-5 w-5 text-blue-500" />;
    case 'JavaScript':
      return <Code className="h-5 w-5 text-yellow-500" />;
    case 'React':
      return <Code className="h-5 w-5 text-cyan-500" />;
    case 'OOP':
      return <BookOpen className="h-5 w-5 text-purple-500" />;
    case 'Database':
      return <Layers className="h-5 w-5 text-green-500" />;
    case 'Advanced':
      return <Code className="h-5 w-5 text-red-500" />;
    default:
      return <Code className="h-5 w-5 text-gray-500" />;
  }
};

const getTopicColor = (topic: string) => {
  switch (topic) {
    case 'HTML':
      return 'from-orange-400 to-orange-600';
    case 'CSS':
      return 'from-blue-400 to-blue-600';
    case 'JavaScript':
      return 'from-yellow-400 to-yellow-600';
    case 'React':
      return 'from-cyan-400 to-cyan-600';
    case 'OOP':
      return 'from-purple-400 to-purple-600';
    case 'Database':
      return 'from-green-400 to-green-600';
    case 'Advanced':
      return 'from-red-400 to-red-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

const getTopicDescription = (topic: string) => {
  switch (topic) {
    case 'HTML':
      return "Master the foundation of web development. Arrange HTML elements to create well-structured web pages.";
    case 'CSS':
      return "Style and design beautiful web interfaces. Arrange CSS properties to create stunning visual layouts.";
    case 'JavaScript':
      return "Add interactivity and logic to your websites. Arrange code blocks to create dynamic functionality.";
    case 'React':
      return "Build modern web applications with React. Arrange components and hooks for powerful user interfaces.";
    case 'OOP':
      return "Learn Object-Oriented Programming principles. Arrange classes and methods to solve complex problems.";
    case 'Database':
      return "Manage and query data effectively. Arrange SQL statements to interact with databases.";
    case 'Advanced':
      return "Take on advanced programming challenges. Arrange complex algorithms and advanced patterns.";
    default:
      return "Arrange code blocks to solve programming challenges.";
  }
};

const TopicHeader: React.FC<TopicHeaderProps> = ({
  topic,
  completedInTopic,
  totalInTopic,
  topicProgress,
  topicIndex
}) => {
  return (
    <div className="mb-6">
      <div className={`bg-gradient-to-r ${getTopicColor(topic)} text-white p-6 rounded-2xl shadow-lg`}>
        <div className="flex items-center gap-4 mb-4">
          {getTopicIcon(topic)}
          <div className="flex-1">
            <h3 className="text-xl font-bold">{topic}</h3>
            <p className="text-white/90 text-sm">
              {completedInTopic}/{totalInTopic} levels completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{Math.round(topicProgress)}%</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${topicProgress}%` }}
              transition={{ delay: topicIndex * 0.15 + 0.3, duration: 1 }}
            />
          </div>
        </div>

        <p className="text-white/90 text-sm leading-relaxed">
          {getTopicDescription(topic)}
        </p>
      </div>
    </div>
  );
};

export default TopicHeader;
