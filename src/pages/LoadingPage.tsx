import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Logo from '@/components/ui/logo';
interface LoadingPageProps {
  message?: string;
}
const LoadingPage: React.FC<LoadingPageProps> = ({
  message = "Loading your coding adventure..."
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo with pulse animation */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Logo size="xl" />
        </motion.div>

        {/* Loading message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-slate-600 text-center"
        >
          {message}
        </motion.p>

        {/* Loading spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-purple-500 rounded-full"
              />
            ))}
          </div>
          <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
        </motion.div>
      </motion.div>
    </div>
  );
};
export default LoadingPage;