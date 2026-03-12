import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';

interface GameLoadingScreenProps {
  message?: string;
}

const GameLoadingScreen: React.FC<GameLoadingScreenProps> = ({
  message = "Initializing Puzzle..."
}) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-pastel-blue flex flex-col items-center justify-center z-50 overflow-hidden font-draw">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 text-center px-8 flex flex-col items-center">
        {/* Mascot Container */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-12"
        >
          <div className="absolute -inset-4 bg-cc-yellow blur-2xl opacity-30 rounded-full animate-pulse" />

          <DrawnCard className="w-40 h-40 rounded-[2.5rem] bg-white p-0 overflow-hidden flex items-center justify-center relative border-3 border-black">
            <ComicMascot pose="study" size="lg" />
          </DrawnCard>

          {/* Floating Sparkles */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4"
          >
            <Sparkles className="w-12 h-12 text-cc-pink fill-cc-pink" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Loading Card */}
        <DrawnCard className="bg-white min-w-[280px] shadow-comic transform rotate-1">
          <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-2 italic">
            {message}
          </h2>

          <div className="space-y-4">
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest">
              Sharpening the logic...
            </p>

            {/* Comic Progress Bar */}
            <div className="w-full h-6 bg-black rounded-xl p-1 shadow-comic-sm overflow-hidden border-2 border-black">
              <motion.div
                className="h-full bg-cc-green rounded-lg"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </DrawnCard>

        {/* Brand Link */}
        <motion.div
          className="mt-12 flex items-center gap-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Logo size="sm" />
        </motion.div>
      </div>
    </div>
  );
};

export default GameLoadingScreen;
