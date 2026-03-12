import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Trophy,
    Medal,
    Crown,
    Star,
    Flame,
    TrendingUp,
    Users
} from 'lucide-react';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import MobileHeader from '@/components/MobileHeader';
import ComicMascot from '@/components/ui/ComicMascot';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { useAuth } from '@/context/AuthContext';
import { useStreak } from '@/context/StreakContext';

// Mock leaderboard data (in production, this would come from backend)
const MOCK_LEADERBOARD = [
    { id: '1', name: 'CodeMaster', xp: 15420, streak: 45, avatar: '🦊', bg: 'bg-pastel-yellow' },
    { id: '2', name: 'DevNinja', xp: 12350, streak: 32, avatar: '🐱', bg: 'bg-pastel-mint' },
    { id: '3', name: 'ByteWizard', xp: 11200, streak: 28, avatar: '🦁', bg: 'bg-pastel-pink' },
    { id: '4', name: 'PixelPro', xp: 9800, streak: 21, avatar: '🐼', bg: 'bg-pastel-blue' },
    { id: '5', name: 'LogicLord', xp: 8500, streak: 19, avatar: '🐨', bg: 'bg-pastel-lavender' },
    { id: '6', name: 'SyntaxStar', xp: 7200, streak: 15, avatar: '🐸', bg: 'bg-pastel-cyan' },
    { id: '7', name: 'AlgoAce', xp: 6100, streak: 12, avatar: '🦋', bg: 'bg-pastel-mint' },
    { id: '8', name: 'BugHunter', xp: 5400, streak: 10, avatar: '🐙', bg: 'bg-pastel-pink' },
    { id: '9', name: 'CodeCraft', xp: 4800, streak: 8, avatar: '🦄', bg: 'bg-pastel-yellow' },
    { id: '10', name: 'TechTitan', xp: 4200, streak: 7, avatar: '🐺', bg: 'bg-pastel-blue' },
];

const Leaderboard: React.FC = () => {
    const navigate = useNavigate();
    const { gameState } = useGame();
    const { rewards } = useRewards();
    const { profile } = useAuth();
    const { currentStreak } = useStreak();
    const [activeTab, setActiveTab] = useState<'weekly' | 'allTime'>('weekly');

    // Calculate user's rank
    const userXP = rewards?.xp || 0;
    const userRank = MOCK_LEADERBOARD.filter(u => u.xp > userXP).length + 1;

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-8 h-8 text-black fill-pastel-yellow" strokeWidth={2.5} />;
            case 2: return <Medal className="w-7 h-7 text-black fill-white" strokeWidth={2.5} />;
            case 3: return <Medal className="w-7 h-7 text-black fill-pastel-pink" strokeWidth={2.5} />;
            default: return <span className="text-xl font-black text-black/30">{rank}</span>;
        }
    };

    const getRankBg = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-pastel-yellow border-black shadow-comic rotate-1';
            case 2: return 'bg-white border-black shadow-comic -rotate-1';
            case 3: return 'bg-pastel-pink/30 border-black shadow-comic rotate-1';
            default: return 'bg-white border-black/10 shadow-sm';
        }
    };

    return (
        <div className="min-h-[100dvh] bg-pastel-yellow/20 pb-32 font-draw overflow-x-hidden">
            <div className="px-6 space-y-8 max-w-md mx-auto" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
                {/* Unified Mobile Header */}
                <MobileHeader
                    title="Hall of Fame"
                    subtitle="The ultimate coders"
                    showBack
                    rightElement={
                        <div className="w-10 h-10 bg-pastel-yellow border-2 border-black rounded-xl flex items-center justify-center shadow-comic-sm rotate-3">
                            <Trophy className="w-6 h-6 text-black" strokeWidth={2.5} />
                        </div>
                    }
                />

                {/* Tab Navigation */}
                <div className="flex gap-4 p-1.5 bg-black/5 rounded-2xl border-2 border-black/10">
                    <button
                        onClick={() => setActiveTab('weekly')}
                        className={`flex-1 h-12 rounded-xl font-black uppercase tracking-tight transition-all ${activeTab === 'weekly'
                            ? 'bg-black text-white shadow-comic-sm'
                            : 'text-black/40 hover:text-black'
                            }`}
                    >
                        WEEKLY
                    </button>
                    <button
                        onClick={() => setActiveTab('allTime')}
                        className={`flex-1 h-12 rounded-xl font-black uppercase tracking-tight transition-all ${activeTab === 'allTime'
                            ? 'bg-black text-white shadow-comic-sm'
                            : 'text-black/40 hover:text-black'
                            }`}
                    >
                        ALL TIME
                    </button>
                </div>

                {/* Top 3 Podium - Comic Style */}
                <div className="flex items-end justify-center gap-4 h-64 px-2">
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ y: 50, opacity: 0, rotate: -10 }}
                        animate={{ y: 0, opacity: 1, rotate: -5 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="flex-1 flex flex-col items-center"
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl border-3 border-black flex items-center justify-center text-3xl mb-3 shadow-comic-sm rotate-[5deg]">
                            {MOCK_LEADERBOARD[1].avatar}
                        </div>
                        <div className="bg-white w-full h-32 rounded-t-[2rem] flex flex-col items-center justify-center border-3 border-black border-b-0 shadow-comic relative pt-4">
                            <Medal className="w-8 h-8 text-black mb-1" strokeWidth={2.5} />
                            <span className="text-lg font-black text-black uppercase">2nd</span>
                            <p className="text-[10px] font-black opacity-40 uppercase truncate px-2">{MOCK_LEADERBOARD[1].name}</p>
                        </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1.1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="flex-1 flex flex-col items-center z-10"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-pastel-yellow rounded-full blur-xl opacity-50"
                            />
                            <div className="w-20 h-20 bg-pastel-yellow rounded-2xl border-3 border-black flex items-center justify-center text-4xl mb-3 shadow-comic relative z-10 rotate-3">
                                {MOCK_LEADERBOARD[0].avatar}
                                <Crown className="absolute -top-6 -right-4 w-10 h-10 text-black fill-pastel-yellow rotate-12" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="bg-pastel-yellow w-full h-44 rounded-t-[2rem] flex flex-col items-center justify-center border-3 border-black border-b-0 shadow-comic-lg relative pt-4">
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24">
                                <ComicMascot pose="winner" size="lg" />
                            </div>
                            <span className="text-3xl font-black text-black pt-4">#1</span>
                            <span className="text-sm font-black text-black/60 uppercase">GOAT</span>
                            <p className="text-xs font-black text-black uppercase mt-2 px-2 truncate w-full text-center">{MOCK_LEADERBOARD[0].name}</p>
                        </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ y: 50, opacity: 0, rotate: 10 }}
                        animate={{ y: 0, opacity: 1, rotate: 5 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="flex-1 flex flex-col items-center"
                    >
                        <div className="w-16 h-16 bg-pastel-pink rounded-2xl border-3 border-black flex items-center justify-center text-3xl mb-3 shadow-comic-sm rotate-[-5deg]">
                            {MOCK_LEADERBOARD[2].avatar}
                        </div>
                        <div className="bg-pastel-pink/40 w-full h-24 rounded-t-[2rem] flex flex-col items-center justify-center border-3 border-black border-b-0 shadow-comic relative pt-4">
                            <Medal className="w-7 h-7 text-black fill-pastel-pink mb-1" strokeWidth={2.5} />
                            <span className="text-md font-black text-black uppercase">3rd</span>
                            <p className="text-[10px] font-black opacity-40 uppercase truncate px-2">{MOCK_LEADERBOARD[2].name}</p>
                        </div>
                    </motion.div>
                </div>

                {/* User's Rank Sticker */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <DrawnCard className="bg-black p-5 relative overflow-visible border-3 border-black rotate-[-1deg] shadow-comic-lg">
                        <div className="absolute -top-4 -left-4 bg-pastel-blue border-3 border-black p-2 rounded-xl rotate-[-12deg] shadow-comic-sm font-black text-xs">
                            YOU
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-2xl border-3 border-black flex items-center justify-center text-3xl shadow-comic-sm rotate-3 overflow-hidden relative">
                                    <div className="absolute inset-0">
                                        <ComicMascot pose="happy" size="sm" />
                                    </div>
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="You" className="w-full h-full object-cover opacity-50" />
                                    ) : null}
                                </div>
                                <div className="text-white">
                                    <p className="text-[10px] font-black text-pastel-blue uppercase tracking-widest italic">Current Rank</p>
                                    <p className="text-4xl font-black tracking-tighter">#{userRank}</p>
                                </div>
                            </div>
                            <div className="text-right space-y-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-yellow border-2 border-black rounded-lg rotate-2 shadow-comic-sm">
                                    <Star className="w-4 h-4 text-black fill-black" strokeWidth={2} />
                                    <span className="font-black text-black text-sm">{userXP} XP</span>
                                </div>
                                <div className="flex items-center gap-1 justify-end">
                                    <Flame className="w-4 h-4 text-pastel-pink fill-pastel-pink" />
                                    <span className="font-black text-white/60 text-xs italic">{currentStreak} DAY STREAK</span>
                                </div>
                            </div>
                        </div>
                    </DrawnCard>
                </motion.div>

                {/* Full Leaderboard List */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-2xl font-black text-black uppercase tracking-tighter px-2">TOP CODERS</h2>
                    <div className="space-y-4">
                        {MOCK_LEADERBOARD.map((user, index) => (
                            <motion.div
                                key={user.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                            >
                                <DrawnCard className={`p-0 overflow-hidden ${getRankBg(index + 1)}`}>
                                    <div className="flex items-center gap-4 p-4">
                                        <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                            {getRankIcon(index + 1)}
                                        </div>
                                        <div className={`w-14 h-14 ${user.bg} rounded-2xl border-2 border-black flex items-center justify-center text-3xl shadow-comic-sm rotate-[${index % 2 === 0 ? '3deg' : '-3deg'}] shrink-0`}>
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-lg font-black text-black truncate uppercase tracking-tight leading-none">{user.name}</p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <Flame className="w-3.5 h-3.5 text-pastel-pink fill-pastel-pink" strokeWidth={2} />
                                                <span className="text-[10px] font-black text-black/40 uppercase italic">{user.streak} DAY STREAK</span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xl font-black text-black tracking-tighter">{user.xp.toLocaleString()}</p>
                                            <p className="text-[9px] font-black text-black/30 uppercase tracking-widest leading-none">TOTAL XP</p>
                                        </div>
                                    </div>
                                </DrawnCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
