import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap, Crown, Star, CheckCircle2 } from 'lucide-react';
import { useGame } from '@/context/GameContext';

const AchievementsCard = () => {
  const { gameState } = useGame();
  
  const totalLevels = gameState.levels.length;
  const completedLevels = gameState.levels.filter(level => level.isCompleted).length;
  
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first level",
      icon: Target,
      achieved: completedLevels >= 1,
      progress: Math.min(completedLevels, 1),
      target: 1,
      gradient: "from-green-400 to-emerald-600",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      title: "Getting Started",
      description: "Complete 5 levels",
      icon: Zap,
      achieved: completedLevels >= 5,
      progress: Math.min(completedLevels, 5),
      target: 5,
      gradient: "from-blue-400 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "On Fire",
      description: "Complete 10 levels",
      icon: Trophy,
      achieved: completedLevels >= 10,
      progress: Math.min(completedLevels, 10),
      target: 10,
      gradient: "from-orange-400 to-amber-600",
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      title: "Master Coder",
      description: "Complete 25 levels",
      icon: Crown,
      achieved: completedLevels >= 25,
      progress: Math.min(completedLevels, 25),
      target: 25,
      gradient: "from-purple-400 to-pink-600",
      bgColor: "bg-purple-50",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="relative"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-3xl blur-xl transform translate-y-2 scale-95" />
      
      <Card className="relative rounded-3xl shadow-lg border-border/50 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl" />
        
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold">Achievements</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={achievement.id} 
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 4 }}
                className={`relative flex items-center justify-between p-3 rounded-2xl transition-all ${
                  achievement.achieved 
                    ? `${achievement.bgColor} border border-transparent` 
                    : 'bg-secondary/30 border border-border/30'
                }`}
              >
                {/* Progress bar background */}
                <div 
                  className={`absolute inset-0 rounded-2xl overflow-hidden ${
                    achievement.achieved ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${achievement.gradient} opacity-10`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                
                <div className="relative flex items-center gap-3">
                  <motion.div
                    className={`w-10 h-10 bg-gradient-to-br ${achievement.gradient} rounded-xl flex items-center justify-center shadow-md ${
                      !achievement.achieved && 'opacity-50 grayscale'
                    }`}
                    animate={achievement.achieved ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <achievement.icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <h4 className={`font-semibold text-sm ${
                      achievement.achieved ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
                
                <div className="relative flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    achievement.achieved ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {achievement.progress}/{achievement.target}
                  </span>
                  {achievement.achieved && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AchievementsCard;
