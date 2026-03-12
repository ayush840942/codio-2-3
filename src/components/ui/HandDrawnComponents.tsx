import React from 'react';
import { cn } from '@/lib/utils';
import { soundEffects } from '@/utils/soundEffects';

interface DrawnButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'outlined' | 'cc-blue' | 'cc-pink' | 'cc-green' | 'ghost';
    isPill?: boolean;
}

export const DrawnButton: React.FC<DrawnButtonProps> = ({
    children,
    className,
    variant = 'primary',
    isPill = false,
    onClick,
    ...props
}) => {
    const handlePress = (e: React.MouseEvent<HTMLButtonElement>) => {
        soundEffects.buttonPress();
        if (onClick) onClick(e);
    };

    const variants = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-pastel-yellow text-slate-900',
        outlined: 'bg-white text-slate-900 border-3 border-black',
        'cc-blue': 'bg-cc-blue text-black',
        'cc-pink': 'bg-cc-pink text-black',
        'cc-green': 'bg-cc-green text-black',
        ghost: 'bg-transparent text-black border-transparent shadow-none hover:bg-black/5',
    };

    return (
        <button
            className={cn(
                "px-6 py-3 font-draw text-xl font-black transition-all active:translate-y-1 flex items-center justify-center text-center",
                "border-3 border-black shadow-comic-sm hover:shadow-comic hover:-translate-y-0.5 active:shadow-none uppercase tracking-tighter",
                "active:animate-squishy leading-none",
                isPill ? "rounded-full" : "rounded-2xl",
                variants[variant],
                className
            )}
            onClick={handlePress}
            {...props}
        >
            {children}
        </button>
    );
};

interface DrawnCardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
    rank?: string | number;
    badgeColor?: string;
    variant?: 'white' | 'cc-blue' | 'cc-pink' | 'cc-green' | 'cc-yellow';
}

export const DrawnCard: React.FC<DrawnCardProps> = ({
    children,
    className,
    header,
    rank,
    badgeColor = 'bg-cc-pink',
    variant = 'white',
    ...props
}) => {
    const variants = {
        white: 'bg-white',
        'cc-blue': 'bg-cc-blue',
        'cc-pink': 'bg-cc-pink',
        'cc-green': 'bg-cc-green',
        'cc-yellow': 'bg-cc-yellow',
    };

    return (
        <div
            className={cn(
                "relative border-3 border-black/80 shadow-comic-lg p-6 overflow-hidden",
                variants[variant],
                className
            )}
            {...props}
        >
            {/* Background Doodle Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />

            {rank !== undefined && (
                <div className={cn(
                    "absolute -top-4 -left-4 w-10 h-10 rounded-full border-3 border-black flex items-center justify-center font-black text-xl shadow-comic-sm z-20",
                    badgeColor
                )}>
                    {rank}
                </div>
            )}
            {header && (
                <div className="mb-4 pb-2 border-b-3 border-black relative z-10 text-center">
                    {header}
                </div>
            )}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

interface DrawnInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const DrawnInput: React.FC<DrawnInputProps> = ({
    className,
    ...props
}) => {
    return (
        <input
            className={cn(
                "w-full px-4 py-3 rounded-xl border-3 border-black bg-white font-draw text-lg font-bold",
                "focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-slate-400 shadow-inner",
                className
            )}
            {...props}
        />
    );
};
