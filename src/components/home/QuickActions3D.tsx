import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Lightbulb,
  GraduationCap,
  Rocket
} from 'lucide-react';

const QuickActions3D = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: BookOpen,
      title: 'Learn',
      subtitle: 'Study concepts',
      gradient: 'from-blue-500 to-indigo-600',
      path: '/levels',
    },
    {
      icon: Code2,
      title: 'Practice',
      subtitle: 'Write code',
      gradient: 'from-emerald-500 to-teal-600',
      path: '/mastery',
    },
    {
      icon: Trophy,
      title: 'Mastery',
      subtitle: 'Get certified',
      gradient: 'from-amber-500 to-orange-600',
      path: '/mastery',
    },
    {
      icon: Rocket,
      title: 'Build',
      subtitle: 'Create apps',
      gradient: 'from-pink-500 to-rose-600',
      path: '/build',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.h3 
        className="text-lg font-bold text-foreground px-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Quick Actions
      </motion.h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(action.path)}
            className="cursor-pointer"
            style={{ perspective: '500px' }}
          >
            <div className="relative group">
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
              
              {/* Card */}
              <div className="relative bg-card rounded-2xl p-4 shadow-lg border border-border/50 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary/20" />
                
                {/* Icon */}
                <motion.div
                  className={`relative w-12 h-12 mb-3 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                  whileHover={{
                    rotateY: 180,
                    transition: { duration: 0.6 },
                  }}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </motion.div>
                
                {/* Text */}
                <div className="relative">
                  <h4 className="font-bold text-foreground">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                </div>
                
                {/* Decorative corner */}
                <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-full opacity-10`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions3D;
