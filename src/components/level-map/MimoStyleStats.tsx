
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Calendar } from 'lucide-react';
import { useGame } from '@/context/GameContext';

const MimoStyleStats: React.FC = () => {
  const { gameState } = useGame();
  
  const totalLevels = gameState.levels.length;
  const completedLevels = gameState.levels.filter(l => l.isCompleted).length;
  const totalXP = gameState.levels
    .filter(l => l.isCompleted)
    .reduce((sum, l) => sum + (l.xpReward || 0), 0);
  
  const progressPercentage = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;

  const stats = [
    {
      icon: Trophy,
      label: 'Total XP',
      value: totalXP.toLocaleString(),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Target,
      label: 'Progress',
      value: `${Math.round(progressPercentage)}%`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Zap,
      label: 'Completed',
      value: `${completedLevels}/${totalLevels}`,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Calendar,
      label: 'Streak',
      value: '3 days',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bgColor} rounded-2xl p-4 text-center`}
        >
          <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MimoStyleStats;
