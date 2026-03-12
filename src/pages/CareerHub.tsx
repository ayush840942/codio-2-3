import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase,
    Star,
    ChevronRight,
    Building2,
    Globe,
    CheckCircle2,
    Lock,
    ArrowRight,
    MapPin,
    Trophy,
    Sparkles,
    Search,
    ArrowLeft
} from 'lucide-react';
import MobileHeaderComp from '@/components/MobileHeader';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { portfolioProjects } from '@/data/portfolioProjects';
import { interviewQuestions } from '@/data/interviewQuestions';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import PremiumGateModal from '@/components/premium/PremiumGateModal';
import { haptics } from '@/utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';

const CareerHub = () => {
    const navigate = useNavigate();
    const { hasFeature, subscriptionTier } = useSubscriptionFeatures();
    const [activeTab, setActiveTab] = useState<'projects' | 'interviews'>('projects');
    const [showPremiumGate, setShowPremiumGate] = useState(false);
    const isElite = subscriptionTier === 'elite' || subscriptionTier === 'premium-yearly' || subscriptionTier === 'trial';

    const handleTabChange = (tab: 'projects' | 'interviews') => {
        haptics.impact(ImpactStyle.Light);
        setActiveTab(tab);
    };

    const handleProtectedAction = (path: string, feature: string) => {
        haptics.impact(ImpactStyle.Medium);
        if (!hasFeature(feature)) {
            setShowPremiumGate(true);
            return;
        }
        navigate(path);
    };

    return (
        <div className="min-h-[100dvh] bg-pastel-yellow/5 font-draw pb-32 overflow-x-hidden">
            <PremiumGateModal isOpen={showPremiumGate} onClose={() => setShowPremiumGate(false)} trigger="feature" />

            {/* Unified Mobile Header */}
            <MobileHeaderComp
                title="Career Hub"
                subtitle="Get Job Ready with AI"
                showBack
                rightElement={
                    isElite && (
                        <div className="px-3 py-1 bg-pastel-mint border-2 border-black rounded-full flex items-center gap-1.5 shadow-comic-sm">
                            <Star className="w-3 h-3 fill-black" strokeWidth={3} />
                            <span className="text-[8px] font-black uppercase">Elite Status</span>
                        </div>
                    )
                }
            />

            <div className="p-6 max-w-lg mx-auto space-y-8" style={{ paddingTop: 'calc(var(--safe-area-top) + 4.5rem)' }}>
                {/* Tabs moved to sub-header or sticky in content */}
                <div className="sticky top-[calc(var(--safe-area-top)+4rem)] z-40 bg-white/80 backdrop-blur-md pt-2 pb-4">
                    <div className="flex p-1.5 bg-black rounded-2xl gap-2 shadow-comic-sm">
                        <button
                            onClick={() => handleTabChange('projects')}
                            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${activeTab === 'projects' ? 'bg-cc-yellow text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            Verified Projects
                        </button>
                        <button
                            onClick={() => handleTabChange('interviews')}
                            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${activeTab === 'interviews' ? 'bg-cc-blue text-white' : 'text-white/40 hover:text-white'}`}
                        >
                            Interview Prep
                        </button>
                    </div>
                </div>
                {activeTab === 'projects' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                        {/* Summary Card */}
                        <DrawnCard className="bg-cc-green p-6 shadow-comic-lg border-4 relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-black uppercase leading-tight text-white mb-2">Build Your<br />Public Portfolio</h2>
                                <p className="text-white/80 text-xs font-bold leading-relaxed mb-6">
                                    Build real-world apps, get them <span className="text-cc-yellow">AI Verified</span>, and share your live profile with recruiters.
                                </p>
                                <DrawnButton
                                    className="bg-cc-yellow h-12 px-6 shadow-comic flex items-center gap-2"
                                    onClick={() => navigate('/public-profile-preview')}
                                >
                                    <Globe className="w-4 h-4" /> VIEW PUBLIC PROFILE
                                </DrawnButton>
                            </div>
                            <Trophy className="absolute -bottom-4 -right-4 w-32 h-32 text-cc-yellow/20 -rotate-12" />
                        </DrawnCard>

                        <div className="space-y-4">
                            <h3 className="text-lg font-black uppercase tracking-tight italic flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-cc-yellow fill-cc-yellow shadow-comic-sm" />
                                Available Projects
                            </h3>
                            {portfolioProjects.slice(0, 4).map((p, idx) => (
                                <DrawnCard
                                    key={p.id}
                                    onClick={() => handleProtectedAction(`/project/${p.id}`, 'portfolio')}
                                    className="p-4 bg-white border-3 shadow-comic hover:scale-[1.01] transition-transform cursor-pointer group"
                                >
                                    <div className="flex gap-4">
                                        <div className="text-3xl">{p.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-black text-sm uppercase">{p.title}</h4>
                                                {p.isPremium && <Lock className="w-3 h-3 text-black/20" />}
                                            </div>
                                            <p className="text-[10px] font-bold text-black/50 mt-1">{p.description}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-black/5 rounded-md border border-black/10">
                                                    {p.difficulty}
                                                </span>
                                                <div className="flex items-center gap-1 text-cc-green">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">AI REVIEWS ACTIVE</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </DrawnCard>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                        {/* Interview Header */}
                        <DrawnCard className="bg-cc-blue p-6 shadow-comic-lg border-4 relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-black uppercase leading-tight text-white mb-2">Ace Your<br />Next Interview</h2>
                                <p className="text-white/80 text-xs font-bold leading-relaxed mb-6">
                                    Practice coding patterns used by top tech companies. Elite members get <span className="text-cc-yellow underline decoration-wavy">Unlimited Solutions</span>.
                                </p>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1.5 bg-white/20 rounded-lg border border-white/30 text-[9px] font-black text-white uppercase italic">Google</div>
                                    <div className="px-3 py-1.5 bg-white/20 rounded-lg border border-white/30 text-[9px] font-black text-white uppercase italic">Meta</div>
                                    <div className="px-3 py-1.5 bg-white/20 rounded-lg border border-white/30 text-[9px] font-black text-white uppercase italic">Amazon</div>
                                </div>
                            </div>
                            <Building2 className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
                        </DrawnCard>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-2 bg-black/5 p-4 rounded-2xl border-2 border-black/10 border-dashed">
                                <Search className="w-5 h-5 text-black/30" />
                                <input
                                    type="text"
                                    placeholder="SEARCH COMPANIES OR TOPICS..."
                                    className="flex-1 bg-transparent border-none focus:outline-none text-[10px] font-black placeholder:text-black/20"
                                />
                            </div>

                            {interviewQuestions.map((q, idx) => (
                                <DrawnCard
                                    key={q.id}
                                    onClick={() => handleProtectedAction(`/puzzle/${q.id}`, 'mastery')}
                                    className="p-4 bg-white border-3 shadow-comic hover:scale-[1.01] transition-transform cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-black text-sm uppercase">{q.title}</h4>
                                                {q.isPremium && <Lock className="w-3 h-3 text-cc-yellow" />}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {q.companies.map(c => (
                                                    <span key={c} className="text-[8px] font-black uppercase text-cc-blue bg-cc-blue/5 px-2 py-0.5 rounded border border-cc-blue/10">
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-3 mt-3">
                                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border border-black/10 ${q.difficulty === 'easy' ? 'bg-cc-green/10 text-cc-green' :
                                                    q.difficulty === 'medium' ? 'bg-cc-yellow/10 text-cc-yellow' :
                                                        'bg-cc-pink/10 text-cc-pink'
                                                    }`}>
                                                    {q.difficulty}
                                                </span>
                                                <span className="text-[8px] font-black uppercase text-black/40">{q.category}</span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center group-hover:bg-cc-blue group-hover:text-white transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </DrawnCard>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CareerHub;
