import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles, Code2, Trophy, Zap, Star } from 'lucide-react';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import Logo from '@/components/ui/logo';
import ComicMascot from '@/components/ui/ComicMascot';
import { cn } from '@/lib/utils';

interface OnboardingSlide {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
    accentColor: string;
}

const SLIDES: OnboardingSlide[] = [
    {
        id: 1,
        icon: <div className="relative">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border-4 border-dashed border-black/20 rounded-full"
            />
            <div className="relative w-48 h-48 flex items-center justify-center">
                <ComicMascot pose="welcome" size="lg" />
            </div>
        </div>,
        title: "Craft Your Future",
        description: "The world is built on code. We help you learn to write it, one puzzle at a time.",
        bgColor: "bg-cc-blue",
        accentColor: "bg-cc-pink"
    },
    {
        id: 2,
        icon: <div className="relative">
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-4 bg-cc-yellow/30 blur-2xl rounded-full"
            />
            <div className="relative w-48 h-48 flex items-center justify-center">
                <ComicMascot pose="study" size="lg" />
            </div>
        </div>,
        title: "Master Your Craft",
        description: "Real skills take time. Track your growth, build streaks, and conquer levels.",
        bgColor: "bg-cc-yellow",
        accentColor: "bg-cc-green"
    },
    {
        id: 3,
        icon: <div className="relative">
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-cc-pink/20 rounded-full blur-xl"
            />
            <div className="relative w-48 h-48 flex items-center justify-center">
                <ComicMascot pose="winner" size="lg" />
            </div>
        </div>,
        title: "Earn Success",
        description: "Every lesson learned is a win. Earn rewards, unlock badges, and rule the map!",
        bgColor: "bg-cc-pink",
        accentColor: "bg-cc-blue"
    },
    {
        id: 4,
        icon: <div className="relative">
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-cc-green/20 rounded-full blur-xl"
            />
            <div className="relative w-32 h-32 flex items-center justify-center bg-cc-green border-4 border-black rounded-3xl shadow-comic -rotate-3">
                <Sparkles className="w-16 h-16 text-black" strokeWidth={2.5} />
            </div>
        </div>,
        title: "Total Coding Power",
        description: "The most fun way to learn coding. Unlock your potential today!",
        bgColor: "bg-cc-green",
        accentColor: "bg-cc-yellow"
    }
];

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showInterests, setShowInterests] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

    const handleNext = () => {
        if (currentSlide < SLIDES.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            setShowInterests(true);
        }
    };

    const handlePrev = () => {
        if (showInterests) {
            setShowInterests(false);
        } else if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleSkip = () => {
        completeOnboarding();
    };

    const completeOnboarding = () => {
        if (selectedInterest) {
            localStorage.setItem('codio_preferred_path', selectedInterest);
        }
        localStorage.setItem('codio_onboarding_complete', 'true');

        const hasSession = !!localStorage.getItem('supabase.auth.token') ||
            localStorage.getItem('codio_guest_mode') === 'true';

        if (hasSession) {
            navigate('/');
        } else {
            navigate('/auth');
        }
    };

    const slide = SLIDES[currentSlide];

    const INTERESTS = [
        { id: 'web', title: 'Web Development', desc: 'HTML, CSS, JS, React', icon: '🌐', color: 'bg-cc-blue' },
        { id: 'mobile', title: 'Mobile Apps', desc: 'Swift, Kotlin, Flutter', icon: '📱', color: 'bg-cc-pink' },
        { id: 'backend', title: 'Backend Systems', desc: 'Python, Node, Go', icon: '⚙️', color: 'bg-cc-green' },
    ];

    return (
        <div className={cn("min-h-[100dvh] transition-colors duration-500 flex flex-col overflow-hidden font-draw relative", !showInterests ? slide.bgColor : "bg-white")}>
            {/* Immersive Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Immersive Top Elements - Absolute positioned to float over backgrounds */}
            <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-[max(1rem,env(safe-area-inset-top))] flex justify-between items-center bg-gradient-to-b from-black/5 to-transparent pb-8">
                <Logo size="sm" />
                <button
                    onClick={handleSkip}
                    className="text-black font-black uppercase text-xs tracking-widest bg-cc-yellow border-3 border-black px-4 py-2 rounded-xl shadow-comic-sm active:translate-y-0.5 transition-all hover:bg-cc-yellow/80 hover:scale-105"
                >
                    Skip
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pt-[calc(max(1rem,env(safe-area-inset-top))+4rem)] pb-8 relative z-10 overflow-hidden">
                <AnimatePresence mode="wait">
                    {!showInterests ? (
                        <motion.div
                            key={`slide-${slide.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="w-full max-w-sm flex flex-col items-center"
                        >
                            <div className="mb-8 relative">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {slide.icon}
                                </motion.div>
                            </div>

                            <DrawnCard className={cn("p-6 md:p-8 flex flex-col items-center text-center w-full", slide.accentColor)}>
                                <h1 className="text-3xl md:text-4xl font-black text-black mb-3 uppercase tracking-tighter leading-none italic">
                                    {slide.title}
                                </h1>

                                <p className="text-base md:text-lg text-black/70 font-bold leading-tight">
                                    {slide.description}
                                </p>
                            </DrawnCard>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="interests"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="w-full max-w-md"
                        >
                            <DrawnCard className="p-6 md:p-8 bg-white border-4">
                                <h2 className="text-3xl md:text-4xl font-black text-black mb-2 uppercase tracking-tight italic text-center">Your Path</h2>
                                <p className="text-black/60 font-bold mb-6 text-center uppercase tracking-widest text-[10px] md:text-xs">What's your coding superpower?</p>

                                <div className="space-y-3">
                                    {INTERESTS.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedInterest(item.id)}
                                            className={cn(
                                                "p-4 md:p-5 rounded-2xl md:rounded-3xl border-3 cursor-pointer transition-all shadow-comic-sm active:translate-y-1 active:shadow-none",
                                                selectedInterest === item.id
                                                    ? 'bg-black text-white border-black ring-4 ring-black/10'
                                                    : cn('bg-white text-black border-black', item.color)
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="text-2xl md:text-3xl filter drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="font-black text-lg md:text-xl uppercase tracking-tight leading-none">{item.title}</div>
                                                    <div className={cn("text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-1",
                                                        selectedInterest === item.id ? 'text-white/50' : 'text-black/40'
                                                    )}>
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </DrawnCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Immersive Footer - Floating over content */}
            <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 relative z-10 w-full max-w-lg mx-auto space-y-4">
                {!showInterests && (
                    <div className="flex justify-center gap-3">
                        {SLIDES.map((_, index) => (
                            <motion.div
                                key={index}
                                className={cn(
                                    "h-3 rounded-full border-2 border-black bg-white transition-all",
                                    index === currentSlide ? 'w-8 bg-cc-yellow shadow-comic-sm' : 'w-3'
                                )}
                                animate={index === currentSlide ? { scale: [1, 1.2, 1] } : {}}
                            />
                        ))}
                    </div>
                )}

                <div className="flex gap-4">
                    {(currentSlide > 0 || showInterests) && (
                        <DrawnButton
                            variant="outlined"
                            onClick={handlePrev}
                            className="h-14 w-14 px-0 bg-white border-3"
                        >
                            <ChevronLeft className="w-6 h-6" strokeWidth={4} />
                        </DrawnButton>
                    )}

                    <DrawnButton
                        onClick={showInterests ? completeOnboarding : handleNext}
                        disabled={showInterests && !selectedInterest}
                        variant="accent"
                        className={cn(
                            "flex-1 h-14 md:h-16 text-xl md:text-2xl bg-cc-green shadow-comic border-3",
                            showInterests && !selectedInterest && "opacity-50 grayscale"
                        )}
                    >
                        {showInterests ? (
                            <span className="flex items-center gap-2">BEGIN! <Sparkles className="w-6 h-6 md:w-8 md:h-8" /></span>
                        ) : (
                            <span className="flex items-center gap-2">NEXT <ChevronRight className="w-6 h-6 md:w-8 md:h-8" /></span>
                        )}
                    </DrawnButton>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
