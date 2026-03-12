
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Play, Puzzle, Heart, Star } from 'lucide-react';
import CodioMascot from '@/components/ui/CodioMascot';

interface AppLoadingScreenProps {
  message?: string;
}

const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({
  message = "READY TO CODE?"
}) => {
  const decorations = [
    { Icon: Code2, x: '-32%', y: '-28%', size: 32, rotate: -15, delay: 0 },
    { Icon: Play, x: '25%', y: '-22%', size: 28, rotate: 15, delay: 0.2 },
    { Icon: Puzzle, x: '35%', y: '8%', size: 30, rotate: 10, delay: 0.4 },
    { Icon: Heart, x: '-30%', y: '16%', size: 24, rotate: -10, delay: 0.6 },
    { Icon: Star, x: '-20%', y: '-35%', size: 26, rotate: 5, delay: 0.8 },
    { Icon: Sparkles, x: '25%', y: '28%', size: 28, rotate: 20, delay: 0.5 },
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#AEE4F8] via-[#E2EAFB] to-[#F9D3E0] flex flex-col items-center justify-center overflow-hidden font-draw relative">
      {/* Background soft glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-white opacity-20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-20 flex flex-col items-center w-full max-w-md px-6">
        {/* Mascot Centerpiece */}
        <motion.div
          initial={{ scale: 0, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay: 0.2
          }}
          className="relative mb-12"
        >
          {/* Main Mascot - Cloud Character */}
          <div className="relative z-10">
            <CodioMascot pose="welcome" size="xl" className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]" />
          </div>

          {/* Decorative scatter icons around mascot */}
          {decorations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.4,
                scale: 1,
                x: item.x,
                y: item.y,
                rotate: item.rotate
              }}
              transition={{ delay: 0.8 + item.delay, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ padding: '80px' }}
            >
              <item.Icon
                size={item.size}
                className="text-white fill-white/20"
                strokeWidth={2.5}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Branding */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[5rem] sm:text-[6.5rem] font-black text-[#42326D] tracking-tighter flex justify-center leading-none"
            style={{ textShadow: '4px 4px 0px rgba(255,255,255,0.8)' }}
          >
            {"Codio".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
            className="text-2xl font-black text-[#42326D]/60 tracking-wider uppercase italic"
          >
            The Ultimate Coding Adventure
          </motion.p>
        </div>

        {/* Minimal Progress Bouncing Dots */}
        <div className="mt-8 flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className="w-2.5 h-2.5 bg-[#42326D]/30 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Decorative side symbols in background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-between px-10">
        <Star size={150} className="rotate-12" />
        <Puzzle size={150} className="-rotate-12" />
      </div>
    </div>
  );
};

export default AppLoadingScreen;
