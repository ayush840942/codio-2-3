import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type CodioPose = 'welcome' | 'thinking' | 'study' | 'winner' | 'happy' | 'cool' | 'coding' | 'svg';

import SvgMascot from './SvgMascot';

interface CodioMascotProps {
    pose?: 'welcome' | 'thinking' | 'study' | 'cool' | 'winner' | 'svg';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    onClick?: () => void;
    animated?: boolean;
}

const CodioMascot: React.FC<CodioMascotProps> = ({
    pose = 'svg',
    size = 'md',
    className,
    onClick,
    animated = true
}) => {
    if (pose === 'svg') {
        return <SvgMascot size={size} className={className} animated={animated} onClick={onClick} />;
    }

    const sizeClasses = {
        sm: 'w-20 h-20',
        md: 'w-28 h-28',
        lg: 'w-40 h-40',
        xl: 'w-56 h-56'
    };

    // Map poses to local processed masterpieces
    const poseAssets: Record<string, string> = {
        welcome: '/mascot/welcome.png',
        thinking: '/mascot/thinking.png',
        study: '/mascot/study.png',
        coding: '/mascot/study.png',
        winner: '/mascot/winner.png',
        happy: '/mascot/winner.png',
        cool: '/mascot/cool.png',
    };

    const currentAsset = poseAssets[pose] || poseAssets.welcome;

    return (
        <motion.div
            className={cn("relative z-10 select-none flex items-center justify-center cursor-pointer", sizeClasses[size], className)}
            animate={animated ? {
                y: [0, -8, 0],
                rotate: pose === 'thinking' ? [0, 1, -1, 0] : [0, 0.5, -0.5, 0]
            } : {}}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={pose}
                    src={currentAsset}
                    alt={`Codio ${pose}`}
                    className="w-full h-full object-contain filter drop-shadow-sticker"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                />
            </AnimatePresence>

            {/* Subtle Reflection Overlay to make it feel more "Integrated" */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent rounded-full opacity-30" />
        </motion.div>
    );
};

export default CodioMascot;
