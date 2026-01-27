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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import { useStreak } from '@/context/StreakContext';

// Mock leaderboard data (in production, this would come from backend)
const MOCK_LEADERBOARD = [
    { id: '1', name: 'CodeMaster', xp: 15420, streak: 45, avatar: '🦊' },
    { id: '2', name: 'DevNinja', xp: 12350, streak: 32, avatar: '🐱' },
    { id: '3', name: 'ByteWizard', xp: 11200, streak: 28, avatar: '🦁' },
    { id: '4', name: 'PixelPro', xp: 9800, streak: 21, avatar: '🐼' },
    { id: '5', name: 'LogicLord', xp: 8500, streak: 19, avatar: '🐨' },
    { id: '6', name: 'SyntaxStar', xp: 7200, streak: 15, avatar: '🐸' },
    { id: '7', name: 'AlgoAce', xp: 6100, streak: 12, avatar: '🦋' },
    { id: '8', name: 'BugHunter', xp: 5400, streak: 10, avatar: '🐙' },
    { id: '9', name: 'CodeCraft', xp: 4800, streak: 8, avatar: '🦄' },
    { id: '10', name: 'TechTitan', xp: 4200, streak: 7, avatar: '🐺' },
];

const Leaderboard: React.FC = () => {
    const navigate = useNavigate();
    const { gameState } = useGame();
    const { profile } = useAuth();
    const { currentStreak } = useStreak();
    const [activeTab, setActiveTab] = useState<'weekly' | 'allTime'>('weekly');

    // Calculate user's rank
    const userXP = gameState.xp || 0;
    const userRank = MOCK_LEADERBOARD.filter(u => u.xp > userXP).length + 1;

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
            case 2: return <Medal className="w-6 h-6 text-slate-400" />;
            case 3: return <Medal className="w-6 h-6 text-amber-600" />;
            default: return <span className="text-lg font-black text-slate-600">{rank}</span>;
        }
    };

    const getRankBg = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300';
            case 2: return 'bg-gradient-to-r from-slate-100 to-slate-200 border-slate-300';
            case 3: return 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300';
            default: return 'bg-white';
        }
    };

    return (
        <div className="min-h-screen bg-background pb-28">
            <div className="px-6 py-6 space-y-6 max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="ghost"
                        size="icon"
                        className="w-12 h-12 rounded-full bg-white border-study shadow-sm"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Leaderboard</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compete & Climb</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-3">
                    <Button
                        onClick={() => setActiveTab('weekly')}
                        className={`flex-1 h-12 rounded-full font-bold border-study ${activeTab === 'weekly'
                                ? 'bg-slate-900 text-white shadow-studypal'
                                : 'bg-white text-slate-900 hover:bg-slate-50'
                            }`}
                    >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        This Week
                    </Button>
                    <Button
                        onClick={() => setActiveTab('allTime')}
                        className={`flex-1 h-12 rounded-full font-bold border-study ${activeTab === 'allTime'
                                ? 'bg-slate-900 text-white shadow-studypal'
                                : 'bg-white text-slate-900 hover:bg-slate-50'
                            }`}
                    >
                        <Trophy className="w-4 h-4 mr-2" />
                        All Time
                    </Button>
                </div>

                {/* User's Rank Card */}
                <Card className="border-study bg-pastel-blue rounded-[2rem] shadow-studypal overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-[1.5rem] border-study flex items-center justify-center text-3xl shadow-sm">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="You" className="w-full h-full object-cover rounded-[1.5rem]" />
                                    ) : '👤'}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Your Rank</p>
                                    <p className="text-3xl font-black text-slate-900">#{userRank}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 justify-end mb-1">
                                    <Star className="w-4 h-4 text-slate-700" />
                                    <span className="font-black text-slate-900">{userXP} XP</span>
                                </div>
                                <div className="flex items-center gap-1 justify-end">
                                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                                    <span className="font-bold text-slate-700">{currentStreak} days</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Top 3 Podium */}
                <div className="flex items-end justify-center gap-2 h-48">
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-14 h-14 bg-slate-200 rounded-full border-2 border-slate-300 flex items-center justify-center text-2xl mb-2 shadow-sm">
                            {MOCK_LEADERBOARD[1].avatar}
                        </div>
                        <div className="bg-slate-200 w-20 h-24 rounded-t-2xl flex flex-col items-center justify-center border-2 border-slate-300 border-b-0">
                            <Medal className="w-6 h-6 text-slate-500 mb-1" />
                            <span className="text-sm font-black text-slate-700">2nd</span>
                        </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-16 h-16 bg-yellow-200 rounded-full border-2 border-yellow-400 flex items-center justify-center text-3xl mb-2 shadow-md">
                            {MOCK_LEADERBOARD[0].avatar}
                        </div>
                        <div className="bg-yellow-200 w-24 h-32 rounded-t-2xl flex flex-col items-center justify-center border-2 border-yellow-400 border-b-0">
                            <Crown className="w-8 h-8 text-yellow-600 fill-yellow-600 mb-1" />
                            <span className="text-lg font-black text-yellow-800">1st</span>
                        </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-14 h-14 bg-amber-200 rounded-full border-2 border-amber-400 flex items-center justify-center text-2xl mb-2 shadow-sm">
                            {MOCK_LEADERBOARD[2].avatar}
                        </div>
                        <div className="bg-amber-200 w-20 h-20 rounded-t-2xl flex flex-col items-center justify-center border-2 border-amber-400 border-b-0">
                            <Medal className="w-6 h-6 text-amber-600 mb-1" />
                            <span className="text-sm font-black text-amber-700">3rd</span>
                        </div>
                    </motion.div>
                </div>

                {/* Full Leaderboard */}
                <div className="space-y-3">
                    {MOCK_LEADERBOARD.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                        >
                            <Card className={`border-study rounded-[1.5rem] overflow-hidden ${getRankBg(index + 1)}`}>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center">
                                            {getRankIcon(index + 1)}
                                        </div>
                                        <div className="w-12 h-12 bg-white rounded-xl border-study flex items-center justify-center text-2xl shadow-sm">
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-slate-900 truncate">{user.name}</p>
                                            <div className="flex items-center gap-2">
                                                <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                                                <span className="text-xs font-bold text-slate-600">{user.streak} days</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-900">{user.xp.toLocaleString()}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">XP</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
