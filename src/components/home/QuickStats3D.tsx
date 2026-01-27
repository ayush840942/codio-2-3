import React from 'react';
import { motion } from 'framer-motion';
import { Star, Target, Flame, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickStats3DProps {
  hintPoints: number;
  completedLevels: number;
  streak: number;
  xp: number;
}

const QuickStats3D: React.FC<QuickStats3DProps> = ({
  hintPoints,
  completedLevels,
  streak,
  xp
}) => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Star,
      value: hintPoints,
      label: 'Hints',
      gradient: 'from-amber-400 to-orange-500',
      bgGlow: 'bg-amber-400/20',
      onClick: () => navigate('/hints'),
    },
    {
      icon: Target,
      value: completedLevels,
      label: 'Levels',
      gradient: 'from-emerald-400 to-green-600',
      bgGlow: 'bg-emerald-400/20',
      onClick: () => navigate('/levels'),
    },
    {
      icon: Flame,
      value: streak,
      label: 'Streak',
      gradient: 'from-orange-400 to-red-500',
      bgGlow: 'bg-orange-400/20',
      onClick: undefined,
    },
    {
      icon: Zap,
      value: xp,
      label: 'XP',
      gradient: 'from-purple-400 to-primary',
      bgGlow: 'bg-purple-400/20',
      onClick: () => navigate('/profile'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 gap-3"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={stat.onClick}
          className={`relative cursor-pointer ${stat.onClick ? '' : 'cursor-default'}`}
          style={{ perspective: '500px' }}
        >
          {/* 3D Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className={`absolute inset-0 ${stat.bgGlow} rounded-2xl blur-lg transform translate-y-2`} />
            
            {/* Card body */}
            <div className="relative bg-card rounded-2xl p-3 shadow-lg border border-border/50 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-secondary/30" />
              
              {/* Icon container */}
              <motion.div
                className={`relative w-10 h-10 mx-auto mb-2 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}
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
                <stat.icon className="h-5 w-5 text-white" />
              </motion.div>
              
              {/* Value */}
              <div className="relative text-center">
                <motion.div
                  className="text-lg font-bold text-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickStats3D;
