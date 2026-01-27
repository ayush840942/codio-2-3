import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles, Code2, Trophy, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingSlide {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
}

const SLIDES: OnboardingSlide[] = [
    {
        id: 1,
        icon: <div className="relative">
            <Code2 className="w-20 h-20 text-slate-800" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-slate-400 rounded-full"
            />
        </div>,
        title: "Craft Your Future",
        description: "The world is built on code. We help you learn to write it, one puzzle at a time.",
        bgColor: "bg-[#E0F2FE]", // Sky blue
    },
    {
        id: 2,
        icon: <div className="relative">
            <Zap className="w-20 h-20 text-slate-800" />
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full"
            />
        </div>,
        title: "Master Your Craft",
        description: "Real skills take time. Track your growth, build streaks, and conquer levels.",
        bgColor: "bg-[#FEF9C3]", // Yellow
    },
    {
        id: 3,
        icon: <div className="relative">
            <Trophy className="w-20 h-20 text-slate-800" />
            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 text-2xl"
            >
                ⭐
            </motion.div>
        </div>,
        title: "Join the Elite",
        description: "Climb the global ranks. Show the world what you're capable of.",
        bgColor: "bg-[#FCE7F3]", // Pink
    },
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
        navigate('/auth');
    };

    const goToLearn = () => {
        if (selectedInterest) {
            localStorage.setItem('codio_preferred_path', selectedInterest);
        }
        localStorage.setItem('codio_onboarding_complete', 'true');
        localStorage.setItem('codio_guest_mode', 'true');
        navigate('/');
    };

    const slide = SLIDES[currentSlide];

    const INTERESTS = [
        { id: 'web', title: 'Web Development', desc: 'HTML, CSS, JS, React', icon: '🌐', color: 'bg-blue-100' },
        { id: 'mobile', title: 'Mobile Apps', desc: 'Swift, Kotlin, Flutter', icon: '📱', color: 'bg-purple-100' },
        { id: 'backend', title: 'Backend Systems', desc: 'Python, Node, Go', icon: '⚙️', color: 'bg-green-100' },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col overflow-hidden">
            {/* Background cinematic gradient */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-background to-background -z-10" />

            {/* Top Bar */}
            <div className="flex justify-between items-center p-6">
                <div className="font-black text-2xl tracking-tighter">CODIO</div>
                <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-slate-500 font-bold hover:bg-slate-100 rounded-full"
                >
                    Skip
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
                <AnimatePresence mode="wait">
                    {!showInterests ? (
                        <motion.div
                            key={`slide-${slide.id}`}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center text-center w-full max-w-sm"
                        >
                            <motion.div
                                initial={{ rotate: -10, scale: 0.8 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                                className={`w-48 h-48 ${slide.bgColor} rounded-[3rem] shadow-2xl flex items-center justify-center mb-12 relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                                <div className="relative z-10">{slide.icon}</div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight"
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-slate-500 font-semibold leading-relaxed"
                            >
                                {slide.description}
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="interests"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-center w-full max-w-sm"
                        >
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Your Path</h2>
                            <p className="text-slate-500 font-bold mb-8">What would you like to build?</p>

                            <div className="w-full space-y-4">
                                {INTERESTS.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedInterest(item.id)}
                                        className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${selectedInterest === item.id
                                            ? 'border-slate-900 bg-slate-900 text-white shadow-xl'
                                            : 'border-slate-100 bg-white hover:border-slate-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-2xl ${selectedInterest === item.id ? 'bg-white/20' : item.color
                                                }`}>
                                                {item.icon}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="font-black text-lg">{item.title}</div>
                                                <div className={`text-sm font-bold ${selectedInterest === item.id ? 'text-white/70' : 'text-slate-400'
                                                    }`}>
                                                    {item.desc}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 space-y-6">
                {!showInterests && (
                    <div className="flex justify-center gap-2 mb-4">
                        {SLIDES.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                <div className="flex gap-4">
                    {(currentSlide > 0 || showInterests) && (
                        <Button
                            onClick={handlePrev}
                            variant="outline"
                            className="h-16 px-8 rounded-3xl border-2 border-slate-100 font-black hover:bg-slate-50"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    )}

                    {showInterests ? (
                        <Button
                            disabled={!selectedInterest}
                            onClick={completeOnboarding}
                            className="flex-1 h-16 rounded-3xl bg-slate-900 text-white font-black text-xl shadow-2xl hover:bg-slate-800 disabled:opacity-50 transition-all"
                        >
                            Get Started
                            <Sparkles className="w-6 h-6 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            className="flex-1 h-16 rounded-3xl bg-slate-900 text-white font-black text-xl shadow-2xl hover:bg-slate-800 transition-all"
                        >
                            Next
                            <ChevronRight className="w-6 h-6 ml-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
