import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Share2,
  Gift,
  Users,
  Trophy,
  CheckCircle2,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { DrawnButton, DrawnCard, DrawnInput } from '@/components/ui/HandDrawnComponents';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { toast } from 'sonner';
import Logo from '@/components/ui/logo';
import MobileHeader from '@/components/MobileHeader';

const Referrals = () => {
  const navigate = useNavigate();
  const { referralStats, loading, applyReferralCode, refreshStats } = useReferralSystem();
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=web.codezen';

  const handleCopy = () => {
    if (referralStats?.referralCode) {
      navigator.clipboard.writeText(`${PLAY_STORE_URL}&referral=${referralStats.referralCode}`);
      toast.success('Link copied! Go share it!');
    }
  };

  const handleShare = async () => {
    if (referralStats?.referralCode) {
      const shareData = {
        title: 'Join Codio!',
        text: `Level up your coding skills with me! Use my code ${referralStats.referralCode} for EPIC rewards 🎁`,
        url: `${PLAY_STORE_URL}&referral=${referralStats.referralCode}`
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch { handleCopy(); }
      } else { handleCopy(); }
    }
  };

  const handleApplyCode = async () => {
    if (!code.trim()) return toast.error('Enter a code, genius!');
    setIsApplying(true);
    try {
      const success = await applyReferralCode(code.trim());
      if (success) {
        setCode('');
        await refreshStats();
        toast.success('BAM! Reward unlocked!');
      }
    } finally { setIsApplying(false); }
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-pastel-yellow/20 flex items-center justify-center font-draw">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-black border-t-pastel-pink rounded-full animate-spin" />
          <p className="text-black font-black uppercase tracking-widest text-xs">Loading Loot...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Users, label: 'Friends', value: referralStats?.totalReferrals || 0, color: 'bg-pastel-blue' },
    { icon: Trophy, label: 'Wins', value: referralStats?.completedReferrals || 0, color: 'bg-pastel-mint' },
    { icon: Sparkles, label: 'Bonus XP', value: referralStats?.totalRewardsEarned?.xp || 0, color: 'bg-pastel-yellow' },
  ];

  const steps = [
    { step: 1, text: 'Blast your unique link to the world!', color: 'bg-pastel-pink' },
    { step: 2, text: 'Friend lands on Codio & signs up!', color: 'bg-pastel-blue' },
    { step: 3, text: 'Profit! Both get rewards after 3 levels!', color: 'bg-pastel-mint' },
  ];

  return (
    <div className="min-h-[100dvh] bg-pastel-yellow/20 font-draw overflow-x-hidden">
      {/* Unified Mobile Header */}
      <MobileHeader
        title="Refer & Earn"
        showBack
        rightElement={
          <div className="w-10 h-10 bg-pastel-pink border-2 border-black rounded-xl flex items-center justify-center shadow-comic-sm rotate-6">
            <Gift className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
        }
      />

      <div className="max-w-2xl mx-auto px-6 pb-10 space-y-10" style={{ paddingTop: 'calc(var(--safe-area-top) + 4.5rem)' }}>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-pastel-mint rounded-full blur-2xl opacity-30"
            />
            <div className="w-24 h-24 bg-white border-3 border-black rounded-[2.5rem] flex items-center justify-center relative z-10 shadow-comic-lg rotate-[-10deg]">
              <Gift className="w-12 h-12 text-black relative z-10" strokeWidth={2.5} />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [5, 15, 5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-pastel-yellow border-2 border-black rounded-lg p-2 shadow-comic-sm"
            >
              <Star className="w-6 h-6 fill-white text-black" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-4xl font-black text-black leading-none tracking-tighter uppercase mt-4">Invite Your Crew</h2>
            <p className="text-black/40 font-bold italic mt-2 uppercase text-[10px] tracking-widest">Double the learning, double the loot!</p>
          </div>
        </motion.div>

        {/* Your Code card - Comic Style */}
        <DrawnCard className="bg-white border-4 p-0 overflow-hidden shadow-comic-lg rotate-1">
          <div className="bg-black text-white p-3 text-center border-b-3 border-black">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Your Secret Access Code</span>
          </div>
          <div className="p-8 text-center space-y-6">
            <div className="bg-pastel-yellow/20 border-3 border-dashed border-black rounded-2xl px-6 py-8 relative group">
              <div className="absolute inset-0 bg-pastel-yellow opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
              <code className="text-5xl font-black text-black tracking-[0.15em] uppercase drop-shadow-[2px_2px_0_white]">
                {referralStats?.referralCode || '------'}
              </code>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCopy}
                className="flex-1 h-14 bg-white border-3 border-black rounded-2xl font-black text-lg uppercase tracking-tight shadow-comic-sm active:translate-y-1 active:shadow-none transition-all"
              >
                <Copy className="w-5 h-5 inline mr-2" strokeWidth={3} /> COPY
              </button>
              <DrawnButton
                onClick={handleShare}
                className="flex-1 h-14 bg-pastel-yellow text-xl shadow-comic-sm"
              >
                <Share2 className="w-5 h-5 mr-2" strokeWidth={3} /> SHARE
              </DrawnButton>
            </div>
            <p className="text-[10px] font-black text-black/30 uppercase tracking-widest italic leading-none">
              Friend gets 50 XP instantly! You get 100 XP!
            </p>
          </div>
        </DrawnCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <DrawnCard className={`${stat.color} p-4 text-center shadow-comic-sm rotate-[${i % 2 === 0 ? '-2deg' : '2deg'}] hover:rotate-0 transition-transform`}>
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-black" strokeWidth={3} />
                <div className="text-2xl font-black text-black tracking-tighter">{stat.value}</div>
                <div className="text-[8px] font-black text-black/40 uppercase tracking-widest italic">{stat.label}</div>
              </DrawnCard>
            </motion.div>
          ))}
        </div>

        {/* Apply Code */}
        <DrawnCard className="bg-white shadow-comic rotate-[-1deg]">
          <div className="p-6 space-y-5">
            <h3 className="text-xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 fill-pastel-yellow text-black" strokeWidth={3} />
              GOT A CODE?
            </h3>
            <div className="flex gap-3">
              <DrawnInput
                placeholder="TYPE IT HERE..."
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="flex-1 h-14 uppercase font-black text-lg bg-white"
                maxLength={16}
              />
              <DrawnButton
                onClick={handleApplyCode}
                disabled={!code.trim() || isApplying}
                className="h-14 px-8 bg-pastel-pink shadow-comic-sm whitespace-nowrap"
              >
                {isApplying ? '...' : 'CLAIM!'}
              </DrawnButton>
            </div>
          </div>
        </DrawnCard>

        {/* How it works stickers */}
        <div className="space-y-6 !mt-16 pb-12">
          <h3 className="text-2xl font-black text-black uppercase tracking-tighter px-2">HOW IT WORKS:</h3>
          <div className="space-y-4">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-6"
              >
                <div className={`w-12 h-12 rounded-2xl border-3 border-black ${item.color} flex items-center justify-center flex-shrink-0 shadow-comic-sm rotate-[${i % 2 === 0 ? '-8deg' : '8deg'}]`}>
                  <span className="text-2xl font-black text-black">{item.step}</span>
                </div>
                <DrawnCard className="flex-1 bg-white shadow-comic-sm py-4 px-6 rotate-[${i % 2 === 0 ? '0.5deg' : '-0.5deg'}]">
                  <p className="text-sm font-black text-black/60 uppercase tracking-tight">{item.text}</p>
                </DrawnCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
