import React from 'react';
import { motion } from 'framer-motion';
import { Play, Code2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Hero3DCardProps {
  username?: string;
  nextLevelId?: number;
  onContinue: () => void;
  completedLevels: number;
  totalLevels: number;
}

const Hero3DCard: React.FC<Hero3DCardProps> = ({
  username,
  nextLevelId,
  onContinue,
  completedLevels,
  totalLevels
}) => {
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl transform translate-y-4 scale-95" />
      
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-primary via-purple-600 to-purple-700 rounded-3xl p-6 overflow-hidden shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-24 h-24 bg-pink-400/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, 10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Code brackets animation */}
          <motion.div
            className="absolute top-6 right-8 text-white/20 text-4xl font-mono"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {'</>'}
          </motion.div>
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 18}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Greeting */}
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl"
            >
              👋
            </motion.div>
            <span className="text-white/80 text-sm font-medium">Welcome back!</span>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-1">
            {username || 'Coder'}
          </h1>
          <p className="text-white/70 text-sm mb-6">
            Ready to level up your coding skills?
          </p>
          
          {/* Progress Ring */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="6"
                  fill="none"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="white"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - progressPercentage / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-white font-semibold">
                {completedLevels} / {totalLevels}
              </div>
              <div className="text-white/60 text-sm">Levels completed</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onContinue}
              className="w-full h-14 bg-white text-primary hover:bg-white/95 font-bold text-base rounded-2xl shadow-lg shadow-black/20"
            >
              <motion.div
                className="mr-2"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Play className="h-5 w-5 fill-primary" />
              </motion.div>
              {nextLevelId ? `Continue Level ${nextLevelId}` : 'Explore Levels'}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero3DCard;
