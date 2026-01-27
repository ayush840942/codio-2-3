import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import Logo from '@/components/ui/logo';

interface GameLoadingScreenProps {
  message?: string;
}

const GameLoadingScreen: React.FC<GameLoadingScreenProps> = ({
  message = "Codio"
}) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-lavender-100 via-white to-lavender-200 flex items-center justify-center z-50 overflow-hidden">
      {/* Subtle animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* Logo with 3D effect */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <Logo size="xl" showText={false} className="justify-center" />
        </motion.div>

        {/* App Name */}
        <motion.h1
          className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2 font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          CodeZen
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-muted-foreground text-base mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Learn to Code, Simply
        </motion.p>

        {/* Minimal loading bar */}
        <motion.div
          className="w-48 h-1.5 bg-muted rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GameLoadingScreen;
