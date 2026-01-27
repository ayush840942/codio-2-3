
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2 } from 'lucide-react';

interface AppLoadingScreenProps {
  message?: string;
}

const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({
  message = "Loading Codio..."
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="relative mb-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-30 scale-110"></div>
          <div className="relative w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-primary/20 overflow-hidden">
            <img
              src="/logo-robot.jpg"
              alt="Codio Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
          <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
        </motion.h2>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-secondary rounded-full h-2 mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        {/* Brand */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Codio
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppLoadingScreen;
