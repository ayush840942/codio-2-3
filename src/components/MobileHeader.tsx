import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Sparkles, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRewards } from '@/context/RewardsContext';

interface MobileHeaderProps {
    title?: string;
    subtitle?: string;
    showBack?: boolean;
    showLogo?: boolean;
    showProfile?: boolean;
    showStats?: boolean;
    rightElement?: React.ReactNode;
    onBack?: () => void;
    className?: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
    title,
    subtitle,
    showBack = false,
    showLogo = false,
    showProfile = false,
    showStats = false,
    rightElement,
    onBack,
    className
}) => {
    const navigate = useNavigate();
    const { profile } = useAuth();
    const { rewards } = useRewards();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 pb-3 bg-white border-b-2 border-black/10 transition-all",
                className
            )}
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            style={{
                paddingTop: 'var(--safe-area-top)',
                height: 'calc(var(--safe-area-top) + 3.5rem)'
            }}
        >
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={handleBack}
                        className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-comic-sm active:translate-y-0.5 active:shadow-none transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" strokeWidth={3} />
                    </button>
                )}

                {showLogo && <Logo size="sm" showText={false} />}

                {showProfile && (
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-black/40 tracking-wider leading-none mb-0.5 italic">
                            {subtitle || "Leveling Up"}
                        </span>
                        <span className="text-sm font-black text-black leading-none uppercase truncate max-w-[120px]">
                            {profile?.username || "CHAMPION"}
                        </span>
                    </div>
                )}

                {title && !showProfile && (
                    <div className="flex flex-col">
                        {subtitle && (
                            <span className="text-[9px] uppercase font-black text-black/40 tracking-wider leading-none mb-0.5 italic">
                                {subtitle}
                            </span>
                        )}
                        <h1 className="text-lg font-black text-black leading-none uppercase tracking-tight">
                            {title}
                        </h1>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                {showStats && (
                    <>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-pastel-mint border-2 border-black rounded-lg shadow-comic-sm rotate-1">
                            <Flame className="w-3.5 h-3.5 text-black fill-black" strokeWidth={3} />
                            <span className="text-xs font-black text-black">{rewards.loginStreak || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cc-pink border-2 border-black rounded-lg shadow-comic-sm -rotate-1">
                            <Sparkles className="w-3.5 h-3.5 text-black fill-black" strokeWidth={3} />
                            <span className="text-xs font-black text-black">{rewards?.xp || 0}</span>
                        </div>
                    </>
                )}
                {rightElement}
            </div>
        </motion.header>
    );
};

export default MobileHeader;
