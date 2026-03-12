import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Award,
    Trophy,
    BookOpen,
    Target,
    Code2,
    ChevronRight,
    Sparkles,
    Zap,
    Star,
    Flame,
    GraduationCap,
    Play,
    SquareCode,
    Notebook,
    Lock,
    Crown,
    Check,
    Shield
} from 'lucide-react';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import MasteryDashboard from '@/components/mastery/MasteryDashboard';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { Badge } from '@/components/ui/badge';
import CodePracticeEnvironment from '@/components/practice/CodePracticeEnvironment';
import { getChallengesByLanguage, PracticeChallenge } from '@/data/practiceChallenges';
import TopicCertificate from '@/components/mastery/TopicCertificate';
import PremiumGateModal from '@/components/premium/PremiumGateModal';
import { usePremiumGate } from '@/hooks/usePremiumGate';
import MobileHeader from '@/components/MobileHeader';

const Mastery = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { checkFeatureAccess, isSubscribed } = usePremiumGate();
    const [showGate, setShowGate] = useState(false);
    const [gateFeature, setGateFeature] = useState<'feature' | 'level'>('feature');
    const [gateFeatureName, setGateFeatureName] = useState('');

    const requirePremium = (feature: string) => {
        const gate = checkFeatureAccess(feature);
        if (!gate.allowed) {
            setGateFeatureName(feature);
            setGateFeature('feature');
            setShowGate(true);
            return false;
        }
        return true;
    };

    // Free users get HTML + JS mastery, everything else is premium-locked
    const FREE_LANGUAGES = ['HTML', 'CSS', 'JavaScript'];
    const isLangFree = (langName: string) => isSubscribed || FREE_LANGUAGES.includes(langName);

    const [activeTab, setActiveTab] = useState<'tests' | 'practice'>('tests');
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedChallenge, setSelectedChallenge] = useState<PracticeChallenge | null>(null);
    const [showCertificateFor, setShowCertificateFor] = useState<string | null>(null);
    const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
        const saved = localStorage.getItem('codio_completed_challenges');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('codio_completed_challenges', JSON.stringify(completedChallenges));
    }, [completedChallenges]);

    const languages = [
        { name: 'HTML', emoji: '🌐', color: 'bg-pastel-yellow', path: 'web' },
        { name: 'CSS', emoji: '🎨', color: 'bg-pastel-pink', path: 'web' },
        { name: 'JavaScript', emoji: '⚡', color: 'bg-pastel-blue', path: 'web' },
        { name: 'React', emoji: '⚛️', color: 'bg-pastel-lavender', path: 'web' },
        { name: 'Python', emoji: '🐍', color: 'bg-pastel-mint', path: 'backend' },
        { name: 'Go', emoji: '🐹', color: 'bg-pastel-cyan', path: 'backend' },
        { name: 'Node.js', emoji: '🟢', color: 'bg-pastel-lavender', path: 'backend' },
        { name: 'Swift', emoji: '🍎', color: 'bg-pastel-yellow', path: 'mobile' },
        { name: 'Kotlin', emoji: '💜', color: 'bg-pastel-lavender', path: 'mobile' },
        { name: 'Flutter', emoji: '🦋', color: 'bg-pastel-cyan', path: 'mobile' },
    ];

    const preferredPath = localStorage.getItem('codio_preferred_path') || 'web';
    const { gameState } = useGame();

    const calculateProgress = (langName: string) => {
        const langLevels = gameState.levels.filter(l => l.topic === langName);
        if (langLevels.length === 0) return 0;
        const completed = langLevels.filter(l => l.isCompleted).length;
        return Math.round((completed / langLevels.length) * 100);
    };

    const filteredLanguages = languages
        .filter(lang => lang.path === preferredPath)
        .map(lang => ({ ...lang, progress: calculateProgress(lang.name) }));

    const otherLanguages = languages
        .filter(lang => lang.path !== preferredPath)
        .map(lang => ({ ...lang, progress: calculateProgress(lang.name) }));

    if (!user) {
        return (
            <div className="min-h-[100dvh] bg-pastel-yellow/20 flex items-center justify-center px-6 pb-32 font-draw">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                >
                    <DrawnCard className="w-full max-w-sm bg-white p-8 text-center shadow-comic-lg">
                        <div className="w-24 h-24 bg-pastel-blue border-3 border-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-comic rotate-3">
                            <GraduationCap className="w-12 h-12 text-black" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-3xl font-black mb-2 text-black tracking-tighter uppercase">Mastery Awaits</h2>
                        <p className="text-black/40 font-bold mb-8 italic text-sm">Sign in to unlock your full coding potential!</p>
                        <DrawnButton onClick={() => navigate('/auth')} className="w-full h-14 text-xl bg-pastel-yellow shadow-comic">
                            <Sparkles className="w-6 h-6 mr-2" />
                            LET'S GO!
                        </DrawnButton>
                    </DrawnCard>
                </motion.div>
            </div>
        );
    }

    const handleBackFromChallenge = () => {
        if (selectedChallenge) {
            setSelectedChallenge(null);
        } else if (selectedLanguage) {
            setSelectedLanguage(null);
        } else {
            navigate(-1);
        }
    };

    const handleChallengeComplete = () => {
        if (!selectedChallenge || !selectedLanguage) return;

        if (!completedChallenges.includes(selectedChallenge.id)) {
            setCompletedChallenges(prev => [...prev, selectedChallenge.id]);
        }

        const challenges = getChallengesByLanguage(selectedLanguage);
        const currentIndex = challenges.findIndex(c => c.id === selectedChallenge.id);

        if (currentIndex !== -1 && currentIndex < challenges.length - 1) {
            setTimeout(() => {
                setSelectedChallenge(challenges[currentIndex + 1]);
                toast.info(`Next Up: ${challenges[currentIndex + 1].title}`, {
                    description: "Don't stop now!"
                });
            }, 1500);
        } else {
            setTimeout(() => {
                toast.success("Skill Mastered!", {
                    description: `You've conquered ${selectedLanguage}!`
                });
                setSelectedChallenge(null);
            }, 1500);
        }
    };

    if (selectedChallenge) {
        return (
            <div className="min-h-[100dvh] bg-pastel-yellow/20 pb-32 font-draw">
                <MobileHeader
                    title={selectedChallenge.title}
                    subtitle={`${selectedLanguage} • ${selectedChallenge.difficulty}`}
                    showBack
                    onBack={handleBackFromChallenge}
                />

                <div className="px-6 py-8 max-w-2xl mx-auto" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
                    <CodePracticeEnvironment
                        key={selectedChallenge.id}
                        language={selectedLanguage || 'JavaScript'}
                        challenge={{
                            title: selectedChallenge.title,
                            description: selectedChallenge.description,
                            starterCode: selectedChallenge.starterCode,
                            expectedOutput: selectedChallenge.expectedOutput,
                            hint: selectedChallenge.hint,
                        }}
                        onComplete={handleChallengeComplete}
                    />
                </div>
            </div>
        );
    }

    if (selectedLanguage) {
        const challenges = getChallengesByLanguage(selectedLanguage);
        const langInfo = languages.find(l => l.name === selectedLanguage);

        return (
            <div className="min-h-[100dvh] bg-pastel-yellow/20 pb-32 font-draw overflow-x-hidden">
                <MobileHeader
                    title={selectedLanguage}
                    subtitle={`${challenges.length} Missions`}
                    showBack
                    onBack={handleBackFromChallenge}
                    rightElement={
                        <div className={`w-10 h-10 ${langInfo?.color || 'bg-pastel-blue'} border-2 border-black rounded-xl flex items-center justify-center shadow-comic-sm`}>
                            <span className="text-xl">{langInfo?.emoji}</span>
                        </div>
                    }
                />

                <div className="px-6 py-12 max-w-2xl mx-auto relative" style={{ paddingTop: 'calc(var(--safe-area-top) + 5rem)' }}>
                    {/* Path Line - Dotted Hand Drawn Style */}
                    <div className="absolute left-[3.2rem] top-12 bottom-0 w-1 bg-black/10 border-l-2 border-dashed border-black/20" />

                    <div className="space-y-12 relative">
                        {challenges.map((challenge, index) => {
                            const isFirst = index === 0;
                            const isPrevCompleted = index > 0 && completedChallenges.includes(challenges[index - 1].id);
                            const isUnlocked = isFirst || isPrevCompleted;
                            const isCompleted = completedChallenges.includes(challenge.id);

                            return (
                                <motion.div
                                    key={challenge.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-6"
                                >
                                    <div
                                        className={`w-14 h-14 rounded-full border-3 shrink-0 flex items-center justify-center cursor-pointer transition-all z-10 shadow-comic-sm ${isUnlocked
                                            ? isCompleted
                                                ? `bg-pastel-mint border-black rotate-12 scale-110`
                                                : `bg-white border-black scale-110`
                                            : 'bg-black/5 border-black/10 grayscale opacity-50'
                                            }`}
                                        onClick={() => isUnlocked && setSelectedChallenge(challenge)}
                                    >
                                        {isCompleted ? (
                                            <Trophy className="w-7 h-7 text-black" strokeWidth={2.5} />
                                        ) : (
                                            <Code2 className={`w-7 h-7 ${isUnlocked ? 'text-black' : 'text-black/30'}`} strokeWidth={2.5} />
                                        )}
                                    </div>

                                    <DrawnCard
                                        className={`flex-1 p-0 overflow-hidden ${isUnlocked ? 'bg-white' : 'bg-black/5 border-black/10 opacity-60'} shadow-comic-sm`}
                                        style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})` }}
                                        onClick={() => isUnlocked && setSelectedChallenge(challenge)}
                                    >
                                        <div className="p-4 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-black text-lg text-black uppercase tracking-tight">{challenge.title}</h3>
                                                <p className="text-[10px] font-black text-black/40 uppercase italic tracking-widest">{challenge.difficulty} Practice</p>
                                            </div>
                                            {isUnlocked && !isCompleted && (
                                                <DrawnButton className="bg-pastel-yellow text-xs px-4 h-9 shadow-comic-sm">GO!</DrawnButton>
                                            )}
                                            {isCompleted && (
                                                <div className="px-3 py-1 bg-pastel-mint border-2 border-black rounded-lg text-[10px] font-black uppercase shadow-comic-sm">DONE</div>
                                            )}
                                        </div>
                                    </DrawnCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-pastel-yellow/20 pb-32 font-draw overflow-x-hidden">
            <MobileHeader
                title="Mastery Road"
                subtitle="Choose your destiny"
                showBack
                rightElement={
                    <div className="w-10 h-10 bg-pastel-yellow border-2 border-black rounded-xl flex items-center justify-center shadow-comic-sm rotate-3">
                        <Award className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </div>
                }
            />

            <div className="px-6 pb-6 max-w-2xl mx-auto space-y-8" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
                {/* Visual content from before */}
                <div className="grid grid-cols-2 gap-4">
                    {/* LABS — Pro/Elite only */}
                    <div className="relative">
                        <DrawnCard
                            className="p-1 cursor-pointer bg-white group shadow-comic rotate-[-2deg]"
                            onClick={() => {
                                if (!requirePremium('playground')) return;
                                navigate('/playground');
                            }}
                        >
                            <div className="p-5 bg-black text-white rounded-[1.2rem] h-full flex flex-col justify-between border-2 border-white/10">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform rotate-3">
                                    <SquareCode className="w-7 h-7 text-pastel-yellow" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg leading-tight uppercase tracking-tight">LABS</h4>
                                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest italic leading-none">Live Coding</p>
                                </div>
                            </div>
                        </DrawnCard>
                        {!isSubscribed && (
                            <div className="absolute top-2 right-2 z-10 bg-pastel-pink border-2 border-black rounded-lg px-2 py-0.5 flex items-center gap-1 shadow-comic-sm">
                                <Lock className="h-3 w-3 text-black" strokeWidth={3} />
                                <span className="text-[8px] font-black uppercase">PRO</span>
                            </div>
                        )}
                    </div>

                    {/* MEMOS — Elite only */}
                    <div className="relative">
                        <DrawnCard
                            className="p-1 cursor-pointer bg-white group shadow-comic rotate-[2deg]"
                            onClick={() => {
                                if (!requirePremium('memos')) return;
                                navigate('/memo');
                            }}
                        >
                            <div className="p-5 bg-white text-black rounded-[1.2rem] h-full flex flex-col justify-between border-2 border-black/5">
                                <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform -rotate-3">
                                    <Notebook className="w-7 h-7 text-black" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg leading-tight uppercase tracking-tight">MEMOS</h4>
                                    <p className="text-[8px] font-black text-black/40 uppercase tracking-widest italic leading-none">Quick Notes</p>
                                </div>
                            </div>
                        </DrawnCard>
                        {!isSubscribed && (
                            <div className="absolute top-2 right-2 z-10 bg-pastel-yellow border-2 border-black rounded-lg px-2 py-0.5 flex items-center gap-1 shadow-comic-sm">
                                <Lock className="h-3 w-3 text-black" strokeWidth={3} />
                                <span className="text-[8px] font-black uppercase">ELITE</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hero Card - Current Focus */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <DrawnCard className="p-0 bg-black border-4 border-black relative overflow-visible shadow-comic-lg rotate-1">
                        <div className="absolute -top-4 -left-4 bg-pastel-pink border-3 border-black px-4 py-1.5 rounded-full rotate-[-12deg] z-20 font-black text-xs shadow-comic-sm">
                            RECOMMENDED!
                        </div>

                        <div className="p-8 relative z-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-pastel-yellow border-3 border-black rounded-3xl flex items-center justify-center mb-6 shadow-comic rotate-6 relative">
                                <span className="text-4xl font-black text-black">JS</span>
                            </div>

                            <h2 className="text-4xl font-black text-white leading-none mb-3 tracking-tighter uppercase">
                                JS MASTERY
                            </h2>
                            <p className="text-pastel-blue font-black uppercase text-[10px] tracking-widest italic mb-8">
                                The most popular certification
                            </p>

                            <DrawnButton
                                className="w-full h-16 text-2xl bg-pastel-yellow shadow-comic-sm hover:translate-y-0 active:translate-y-1"
                                onClick={() => setSelectedLanguage('JavaScript')}
                            >
                                START MISSION
                            </DrawnButton>
                        </div>
                    </DrawnCard>
                </motion.div>

                {/* Vertical Language List */}
                <div className="space-y-6 pt-4">
                    <h3 className="font-black text-black text-2xl uppercase tracking-tighter px-2">YOUR {preferredPath} PATH</h3>

                    <div className="space-y-4">
                        {filteredLanguages.map((lang, index) => {
                            const isPremiumLang = !isLangFree(lang.name);
                            return (
                                <div
                                    key={lang.name}
                                >
                                    <DrawnCard
                                        className={`group cursor-pointer bg-white shadow-comic-sm p-4 hover:shadow-comic active:scale-[0.98] transition-all relative overflow-hidden ${isPremiumLang ? 'opacity-80' : ''}`}
                                        style={{ transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})` }}
                                        onClick={() => {
                                            if (isPremiumLang) {
                                                setGateFeatureName(lang.name);
                                                setGateFeature('feature');
                                                setShowGate(true);
                                                return;
                                            }
                                            setSelectedLanguage(lang.name);
                                        }}
                                    >
                                        {isPremiumLang && (
                                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-end pr-4">
                                                <div className="flex items-center gap-1.5 bg-black text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-xl">
                                                    <Lock className="h-3 w-3" strokeWidth={3} />
                                                    PREMIUM ONLY
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-5">
                                            <div
                                                className={`w-16 h-16 ${lang.color} border-3 border-black rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform shadow-comic-sm`}
                                                style={{ transform: `rotate(${index % 2 === 0 ? '-3deg' : '3deg'})` }}
                                            >
                                                {lang.emoji}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xl font-black text-black tracking-tight uppercase leading-none mb-2">{lang.name}</h4>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-4 flex-1 bg-black/5 border-2 border-black rounded-lg overflow-hidden p-0.5">
                                                        <div
                                                            className={`h-full bg-pastel-mint border-r-2 border-black rounded-[4px] shadow-inner transition-all duration-1000`}
                                                            style={{ width: `${lang.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-black italic">{lang.progress}%</span>
                                                </div>
                                            </div>

                                            {lang.progress === 100 && !isPremiumLang && (
                                                <DrawnButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowCertificateFor(lang.name);
                                                    }}
                                                    className="bg-cc-yellow text-[10px] px-3 h-8 shadow-comic-sm shrink-0 border-2"
                                                >
                                                    <Sparkles className="w-3 h-3 mr-1" /> CERT
                                                </DrawnButton>
                                            )}

                                            <div className="w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center group-hover:bg-pastel-yellow transition-colors shadow-comic-sm">
                                                {isPremiumLang ? <Lock className="w-5 h-5 text-black" strokeWidth={2.5} /> : <ChevronRight className="w-6 h-6 text-black" strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </DrawnCard>
                                </div>
                            )
                        })}
                    </div>

                    {/* Premium Showcase Banner — shown only for free users */}
                    {!isSubscribed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6"
                        >
                            <DrawnCard className="bg-black text-white p-6 shadow-[8px_8px_0_#333] border-4 border-black rounded-3xl relative overflow-hidden">
                                <div className="absolute -right-8 -top-8 w-40 h-40 bg-pastel-yellow/10 rounded-full blur-2xl" />
                                <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-pastel-mint/10 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-pastel-yellow border-2 border-white/20 rounded-2xl flex items-center justify-center rotate-6">
                                            <Crown className="h-6 w-6 text-black" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white/50 uppercase tracking-widest">You're on free</p>
                                            <h3 className="text-xl font-black text-white uppercase leading-tight">Unlock Everything</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-5">
                                        {[
                                            { icon: '🌐', label: 'All 10 Languages' },
                                            { icon: '⚡', label: 'Unlimited AI Hints' },
                                            { icon: '🏆', label: '200+ Levels' },
                                            { icon: '🎓', label: 'Skill Certificates' },
                                            { icon: '🔥', label: 'Streak Shield' },
                                            { icon: '🧪', label: 'Live Code Labs' },
                                        ].map((f, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="text-sm">{f.icon}</span>
                                                <span className="text-[10px] font-black text-white/70 uppercase">{f.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-2xl mb-4">
                                        <div>
                                            <p className="text-[9px] font-black text-white/40 uppercase">Pro Monthly</p>
                                            <p className="text-2xl font-black text-white">$19<span className="text-sm text-white/50">/mo</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-white/40 uppercase">Elite Yearly</p>
                                            <p className="text-lg font-black text-pastel-yellow">$149 <span className="line-through text-white/30 text-sm">$228</span></p>
                                            <p className="text-[9px] font-black text-green-400">SAVE 35%</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/subscription')}
                                        className="w-full h-12 bg-pastel-yellow text-black font-black text-sm uppercase rounded-2xl border-2 border-white/20 shadow-[3px_3px_0_rgba(255,255,255,0.2)] active:shadow-none transition-all flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        Start 7-Day Free Trial — $0
                                    </button>
                                    <p className="text-center mt-2 text-[9px] text-white/30 font-bold uppercase">No card needed • Cancel anytime</p>
                                </div>
                            </DrawnCard>
                        </motion.div>
                    )}

                    <h3 className="font-black text-black/20 text-2xl uppercase tracking-tighter px-2 mt-12 mb-4">OTHER QUESTS</h3>
                    <div className="grid grid-cols-2 gap-4 pb-12">
                        {otherLanguages.map((lang, idx) => (
                            <div key={lang.name} className="relative">
                                <DrawnCard
                                    onClick={() => {
                                        if (!isSubscribed) {
                                            setGateFeatureName(lang.name);
                                            setGateFeature('feature');
                                            setShowGate(true);
                                            return;
                                        }
                                        setSelectedLanguage(lang.name);
                                    }}
                                    className="p-3 bg-white cursor-pointer hover:shadow-comic-sm active:scale-95 transition-all text-center"
                                    style={{ transform: `rotate(${idx % 2 === 0 ? '-2deg' : '2deg'})` }}
                                >
                                    <div className={`w-12 h-12 ${lang.color} border-2 border-black rounded-xl flex items-center justify-center text-2xl mx-auto mb-2`}>
                                        {lang.emoji}
                                    </div>
                                    <span className="font-black text-xs uppercase tracking-tight text-black">{lang.name}</span>
                                </DrawnCard>
                                {!isSubscribed && (
                                    <div className="absolute top-1 right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center border border-white/20">
                                        <Lock className="h-3 w-3 text-white" strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showCertificateFor && (
                    <TopicCertificate
                        userName={(user as any).user_metadata?.full_name || user.email?.split('@')[0] || "Codio Student"}
                        topic={showCertificateFor}
                        date={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        onClose={() => setShowCertificateFor(null)}
                    />
                )}
            </AnimatePresence>

            <PremiumGateModal
                isOpen={showGate}
                onClose={() => setShowGate(false)}
                lockedFeature={gateFeatureName}
                trigger={gateFeature}
            />
        </div>
    );
};

export default Mastery;