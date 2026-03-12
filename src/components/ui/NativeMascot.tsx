import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type NativeMascotPose = 'welcome' | 'study' | 'winner' | 'thinking' | 'cool' | 'coding';

interface NativeMascotProps {
    pose?: NativeMascotPose;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    animated?: boolean;
    onClick?: () => void;
}

const NativeMascot: React.FC<NativeMascotProps> = ({
    pose = 'welcome',
    size = 'md',
    className,
    animated = true,
    onClick
}) => {
    const sizeClasses = {
        sm: 'w-24 h-24',
        md: 'w-32 h-32',
        lg: 'w-48 h-48',
        xl: 'w-64 h-64'
    };

    // Colors
    const colors = {
        primary: '#FCD34D', // cc-yellow
        secondary: '#000000', // black
        highlight: '#FFFFFF', // white
        tummy: '#FEF3C7', // lighter yellow
        accent: '#F472B6', // pink cheeks
    };

    // Animation Variants
    const bodyVariants = {
        welcome: { rotate: [0, 2, -2, 0], y: [0, -5, 0] },
        study: { rotate: 5, y: 5 },
        winner: { y: [0, -10, 0], scale: [1, 1.1, 1] },
        thinking: { rotate: -5, x: [0, 2, 0] },
        cool: { rotate: 0, scale: 1 },
        coding: { y: [0, 2, 0] }
    };

    const armLeftVariants = {
        welcome: { rotate: [0, 20, 0, 20, 0], originX: 0.9, originY: 0.1 },
        winner: { rotate: -140, originX: 0.9, originY: 0.1 },
        thinking: { rotate: -40, originX: 0.9, originY: 0.1 },
        coding: { rotate: [10, 20, 10], transition: { duration: 0.2, repeat: Infinity } }
    };

    const armRightVariants = {
        welcome: { rotate: 20 },
        winner: { rotate: 140, originX: 0.1, originY: 0.1 },
        thinking: { rotate: 40, originX: 0.1, originY: 0.1 }, // Scratching head
        coding: { rotate: [-10, -20, -10], transition: { duration: 0.2, repeat: Infinity } }
    };

    const eyesVariants = {
        thinking: { x: [0, 3, 0], y: -2 },
        cool: { scaleY: 1 }, // Sunglasses mode handled by render
        normal: { scaleY: [1, 0.1, 1], transition: { delay: 2, duration: 0.2, repeat: Infinity, repeatDelay: 3 } }
    };

    return (
        <motion.svg
            viewBox="0 0 200 200"
            className={cn("drop-shadow-xl", sizeClasses[size], className)}
            onClick={onClick}
            initial="initial"
            animate={animated ? pose : "initial"}
            variants={bodyVariants}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
            {/* --- Body --- */}
            <motion.rect
                x="60" y="80" width="80" height="90" rx="20"
                fill={colors.primary} stroke={colors.secondary} strokeWidth="4"
            />
            {/* Tummy */}
            <rect x="75" y="100" width="50" height="50" rx="15" fill={colors.tummy} />

            {/* --- Legs --- */}
            <path d="M70 170 L70 190" stroke={colors.secondary} strokeWidth="4" strokeLinecap="round" />
            <path d="M130 170 L130 190" stroke={colors.secondary} strokeWidth="4" strokeLinecap="round" />

            {/* --- Arms --- */}
            <motion.g variants={armLeftVariants} transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}>
                <path d="M60 100 Q 40 120 30 110" stroke={colors.secondary} strokeWidth="6" strokeLinecap="round" fill="none" />
                <circle cx="30" cy="110" r="8" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
            </motion.g>

            <motion.g variants={armRightVariants} transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}>
                <path d="M140 100 Q 160 120 170 110" stroke={colors.secondary} strokeWidth="6" strokeLinecap="round" fill="none" />
                <circle cx="170" cy="110" r="8" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
            </motion.g>


            {/* --- Head --- */}
            <motion.g
                animate={pose === 'thinking' ? { rotate: -5 } : { rotate: 0 }}
            >
                {/* Ears */}
                <path d="M60 60 L50 40 L70 50 Z" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
                <path d="M140 60 L150 40 L130 50 Z" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />

                {/* Face Shape */}
                <rect x="50" y="30" width="100" height="70" rx="25" fill={colors.primary} stroke={colors.secondary} strokeWidth="4" />

                {/* Screen/Face Plate */}
                <rect x="65" y="45" width="70" height="40" rx="10" fill={colors.tummy} />

                {/* Eyes */}
                {pose === 'cool' ? (
                    // Sunglasses
                    <g>
                        <path d="M65 55 L95 55 L95 70 Q 80 80 65 70 Z" fill="black" />
                        <path d="M105 55 L135 55 L135 70 Q 120 80 105 70 Z" fill="black" />
                        <line x1="95" y1="58" x2="105" y2="58" stroke="black" strokeWidth="2" />
                    </g>
                ) : (
                    <motion.g variants={eyesVariants} animate={pose === 'thinking' ? 'thinking' : 'normal'}>
                        <circle cx="80" cy="60" r="6" fill={colors.secondary} />
                        <circle cx="120" cy="60" r="6" fill={colors.secondary} />
                        {/* Shine */}
                        <circle cx="82" cy="58" r="2" fill="white" />
                        <circle cx="122" cy="58" r="2" fill="white" />
                    </motion.g>
                )}

                {/* Mouth */}
                {pose === 'welcome' || pose === 'winner' ? (
                    <path d="M90 75 Q 100 80 110 75" stroke={colors.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
                ) : pose === 'thinking' ? (
                    <line x1="90" y1="75" x2="110" y2="75" stroke={colors.secondary} strokeWidth="3" strokeLinecap="round" />
                ) : (
                    <circle cx="100" cy="75" r="3" fill={colors.secondary} />
                )}

                {/* Cheeks */}
                <circle cx="65" cy="70" r="4" fill={colors.accent} opacity="0.6" />
                <circle cx="135" cy="70" r="4" fill={colors.accent} opacity="0.6" />

                {/* Antenna */}
                <line x1="100" y1="30" x2="100" y2="15" stroke={colors.secondary} strokeWidth="3" />
                <circle cx="100" cy="12" r="6" fill={colors.accent} stroke={colors.secondary} strokeWidth="3">
                    {animated && (
                        <animate attributeName="fill" values="#F472B6;#FCD34D;#F472B6" dur="2s" repeatCount="indefinite" />
                    )}
                </circle>

            </motion.g>

            {/* --- Props --- */}
            {pose === 'winner' && (
                <motion.g
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                    style={{ originX: "170px", originY: "110px" }}
                >
                    <path d="M165 90 L175 90 L170 80 Z" fill="#FCD34D" stroke="black" strokeWidth="2" />
                    <circle cx="170" cy="110" r="15" fill="#FCD34D" stroke="black" strokeWidth="2" />
                    <text x="163" y="115" fontSize="12" fontWeight="bold">1</text>
                </motion.g>
            )}

            {pose === 'study' && (
                <motion.rect x="120" y="120" width="40" height="30" rx="2" fill="white" stroke="black" strokeWidth="2" />
            )}

        </motion.svg>
    );
};

export default NativeMascot;
