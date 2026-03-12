import React from 'react';
import { motion } from 'framer-motion';
import { useRewards } from '@/context/RewardsContext';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';
import { Trophy, Shield, Zap, TrendingUp, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLeagues } from '@/hooks/useLeagues';
import { Skeleton } from '@/components/ui/skeleton';
import MobileHeader from '@/components/MobileHeader';

const Leagues = () => {
    const { rewards } = useRewards();
    const { leaderboard, loading } = useLeagues();
    const currentLeague = rewards.league || 'Bronze';
    const weeklyXp = rewards.weeklyXp || 0;

    const leagueConfig: Record<string, { color: string, nextXp: number, icon: any, desc: string }> = {
        'Bronze': { color: 'bg-orange-400', nextXp: 500, icon: Trophy, desc: 'Starting your journey!' },
        'Silver': { color: 'bg-slate-300', nextXp: 1500, icon: Shield, desc: 'Gaining momentum!' },
        'Gold': { color: 'bg-yellow-400', nextXp: 3000, icon: Trophy, desc: 'Pure dedication!' },
        'Platinum': { color: 'bg-cyan-300', nextXp: 6000, icon: Shield, desc: 'Coding master!' },
        'Diamond': { color: 'bg-indigo-400', nextXp: 10000, icon: Trophy, desc: 'The absolute elite!' }
    };

    const config = leagueConfig[currentLeague] || leagueConfig['Bronze'];
    const progress = Math.min(100, (weeklyXp / config.nextXp) * 100);

    return (
        <div className="min-h-[100dvh] bg-transparent pb-10 space-y-6" style={{ paddingTop: 'calc(var(--safe-area-top) + 4rem)' }}>
            {/* Unified Mobile Header */}
            <MobileHeader
                title="Leagues"
                showBack
                showStats
            />
            {/* Header / Current League */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <DrawnCard className={`${config.color} border-black relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <config.icon size={120} />
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10 py-6">
                        <div className="w-24 h-24 bg-white border-4 border-black rounded-3xl flex items-center justify-center mb-4 rotate-3 shadow-comic-sm">
                            <config.icon className="w-12 h-12 text-black" />
                        </div>
                        <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-1">
                            {currentLeague} LEAGUE
                        </h1>
                        <p className="text-black/70 font-bold italic mb-4">{config.desc}</p>

                        <div className="w-full max-w-xs px-6">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-xs font-black uppercase text-black/50">Next League: {weeklyXp} / {config.nextXp} XP</span>
                                <span className="text-xs font-black text-black">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-4 bg-black/10 border-2 border-black rounded-lg" />
                        </div>
                    </div>
                </DrawnCard>
            </motion.div>

            {/* Mascot Tip */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 px-2"
            >
                <div className="shrink-0">
                    <ComicMascot pose="welcome" size="md" />
                </div>
                <DrawnCard className="bg-white border-2 border-black flex-1 p-3 py-2 relative">
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white border-l-2 border-t-2 border-black rotate-[-45deg] -translate-y-1/2" />
                    <p className="text-sm font-bold text-black italic">
                        "Stay in the top 3 this week to get promoted to the next league!"
                    </p>
                </DrawnCard>
            </motion.div>

            {/* Leaderboard */}
            <DrawnCard className="bg-white border-black p-0 overflow-hidden shadow-comic-lg">
                <div className="bg-black text-white px-6 py-3 flex justify-between items-center">
                    <h3 className="text-xl font-black tracking-widest flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" /> LEADERBOARD
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase opacity-70">
                        <Zap className="w-3 h-3 text-cc-yellow" /> Live Updates
                    </div>
                </div>

                <div className="divide-y-2 divide-black/5 min-h-[400px]">
                    {loading ? (
                        Array(5).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center gap-4 px-6 py-4">
                                <Skeleton className="w-8 h-8 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                                <Skeleton className="h-8 w-12" />
                            </div>
                        ))
                    ) : leaderboard.length > 0 ? (
                        leaderboard.map((player, index) => (
                            <motion.div
                                key={player.id}
                                layout
                                className={`flex items-center gap-4 px-6 py-4 ${player.isCurrentUser ? 'bg-cc-yellow/20' : ''}`}
                                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                            >
                                <div className={`w-8 h-8 flex items-center justify-center font-black rounded-lg border-2 border-black
                                    ${index === 0 ? 'bg-cc-yellow' : index === 1 ? 'bg-slate-200' : index === 2 ? 'bg-orange-300' : 'bg-white'}
                                `}>
                                    {index + 1}
                                </div>

                                <div className="flex-1 flex items-center gap-3">
                                    {player.avatar_url ? (
                                        <img src={player.avatar_url} alt="" className="w-10 h-10 rounded-full border-2 border-black bg-white" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full border-2 border-black bg-pastel-blue flex items-center justify-center font-black text-xs">
                                            {player.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-black text-black text-lg leading-none">{player.username}</div>
                                        {player.isCurrentUser && (
                                            <div className="text-[10px] font-bold text-cc-yellow uppercase bg-black px-1.5 py-0.5 inline-block rounded-sm mt-1">
                                                YOU ARE HERE
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-xl font-black text-black leading-none">{player.weekly_xp}</div>
                                    <div className="text-[10px] font-black uppercase text-black/40">WEEKLY XP</div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                            <Trophy className="w-12 h-12 text-black/10 mb-2" />
                            <p className="font-bold text-black/40 italic">No competitors in your league yet.<br />Be the first to score XP!</p>
                        </div>
                    )}
                </div>

                <div className="bg-black/5 p-4 text-center">
                    <DrawnButton variant="outlined" className="w-full bg-white text-xs font-black py-2">
                        SEE GLOBAL RANKINGS
                    </DrawnButton>
                </div>
            </DrawnCard>

            {/* Rules / Info */}
            <DrawnCard className="bg-pastel-pink/10 border-black/20 border-dashed border-2 py-4 px-6 text-center">
                <h4 className="text-sm font-black uppercase flex items-center justify-center gap-1 mb-2">
                    <Info className="w-3 h-3" /> How Leagues Work
                </h4>
                <p className="text-xs font-bold text-black/60 leading-relaxed">
                    Leagues reset every Sunday at Midnight. The top players in each group move up to the next tier, while the bottom few may be demoted. Keep up your daily streak to stay competitive!
                </p>
            </DrawnCard>
        </div>
    );
};

export default Leagues;
