import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Globe, 
  Database, 
  Smartphone,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  topics: string[];
  estimatedHours: number;
}

const learningPaths: LearningPath[] = [
  {
    id: 'web-basics',
    title: 'Web Basics',
    description: 'HTML, CSS & JavaScript fundamentals',
    icon: Globe,
    gradient: 'from-blue-500 to-indigo-600',
    topics: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 20
  },
  {
    id: 'react-mastery',
    title: 'React Mastery',
    description: 'Modern React & component architecture',
    icon: Code,
    gradient: 'from-cyan-500 to-teal-600',
    topics: ['React', 'JavaScript'],
    estimatedHours: 25
  },
  {
    id: 'full-stack',
    title: 'Full Stack',
    description: 'Frontend & backend development',
    icon: Database,
    gradient: 'from-emerald-500 to-green-600',
    topics: ['React', 'Database', 'Backend'],
    estimatedHours: 40
  },
  {
    id: 'mobile',
    title: 'Mobile Dev',
    description: 'Build mobile applications',
    icon: Smartphone,
    gradient: 'from-purple-500 to-pink-600',
    topics: ['Mobile Development', 'React'],
    estimatedHours: 30
  }
];

const LearningPathCard = () => {
  const { gameState } = useGame();
  const navigate = useNavigate();

  const getPathProgress = (topics: string[]) => {
    const relevantLevels = gameState.levels.filter(level => 
      topics.some(topic => level.topic.includes(topic))
    );
    const completedCount = relevantLevels.filter(level => level.isCompleted).length;
    const totalCount = relevantLevels.length;
    
    return {
      completed: completedCount,
      total: totalCount,
      percentage: totalCount > 0 ? (completedCount / totalCount) * 100 : 0
    };
  };

  const handleStartPath = () => {
    navigate('/levels');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-3xl blur-xl transform translate-y-2 scale-95" />
      
      <Card className="relative rounded-3xl shadow-lg border-border/50 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl" />
        
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold">Learning Paths</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {learningPaths.map((path, index) => {
              const progress = getPathProgress(path.topics);
              const isCompleted = progress.percentage === 100;
              
              return (
                <motion.div 
                  key={path.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartPath}
                  className="relative p-4 bg-secondary/30 hover:bg-secondary/50 rounded-2xl cursor-pointer transition-colors border border-border/30"
                  style={{ perspective: '500px' }}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${path.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: index * 2,
                        ease: "linear",
                      }}
                    >
                      <path.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground truncate">{path.title}</h3>
                        {isCompleted && (
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{path.description}</p>
                      
                      {/* Progress bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${path.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {Math.round(progress.percentage)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                  
                  {/* Topics */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {path.topics.slice(0, 3).map((topic) => (
                      <Badge 
                        key={topic} 
                        variant="secondary" 
                        className="text-xs bg-background/50 rounded-lg"
                      >
                        {topic}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs rounded-lg">
                      ~{path.estimatedHours}h
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LearningPathCard;
