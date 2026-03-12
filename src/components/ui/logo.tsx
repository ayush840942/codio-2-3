
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  showText = true
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  return (
    <div className={cn('flex items-center justify-center gap-3 font-draw', className)}>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Comic Shadow Bubble */}
        <div className={cn(
          'absolute translate-x-1 translate-y-1 bg-black rounded-xl',
          sizeClasses[size]
        )} />

        {/* Main Logo Container */}
        <div className={cn(
          'relative rounded-xl flex items-center justify-center bg-cc-yellow border-3 border-black overflow-hidden',
          sizeClasses[size]
        )}>
          {/* Cloud-style SVG Mascot Head */}
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            {/* Cloud shape */}
            <path
              d="M25 40 A15 15 0 0 1 40 25 A20 20 0 0 1 70 30 A15 15 0 0 1 85 45 A20 20 0 0 1 65 75 A15 15 0 0 1 35 75 A20 20 0 0 1 25 40 Z"
              fill="white"
              stroke="black"
              strokeWidth="6"
            />
            {/* Eyes */}
            <circle cx="42" cy="45" r="5" fill="black" />
            <circle cx="68" cy="45" r="5" fill="black" />
            {/* Smile */}
            <path d="M48 58 Q55 65 62 58" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
            {/* Crown */}
            <path d="M35 25 L30 10 L42 20 L55 5 L68 20 L80 10 L75 25 Z" fill="#FACC15" stroke="black" strokeWidth="3" />
          </svg>
        </div>
      </motion.div>

      {showText && (
        <div className="flex flex-col select-none">
          <span className={cn(
            'font-black text-black leading-none uppercase tracking-tighter drop-shadow-[2px_2px_0_rgba(255,255,255,1)]',
            textSizeClasses[size]
          )}>
            CODIO
          </span>
          {size !== 'sm' && (
            <div className="bg-black text-white px-2 py-0.5 mt-0.5 rounded-md text-[8px] font-black uppercase tracking-[0.2em] transform rotate-[-1deg] w-fit">
              DEV MODE
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
