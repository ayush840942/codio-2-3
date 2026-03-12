import React from 'react';
import { cn } from '@/lib/utils';
import CodioMascot from './CodioMascot';
import { motion } from 'framer-motion';

interface ComicMascotProps {
    pose: any;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    animated?: boolean;
    onClick?: () => void;
}

const ComicMascot: React.FC<ComicMascotProps> = ({
    pose,
    size = 'md',
    className,
    animated = true,
    onClick
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
            className={cn("cursor-pointer", className)}
        >
            <CodioMascot
                pose={pose}
                size={size}
                animated={animated}
                onClick={onClick}
            />
        </motion.div>
    );
};

export default ComicMascot;
