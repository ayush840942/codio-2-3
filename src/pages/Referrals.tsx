import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Share2, Gift, Users, Trophy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { toast } from 'sonner';
import Logo from '@/components/ui/logo';

const Referrals = () => {
  const navigate = useNavigate();
  const { referralStats, loading, applyReferralCode, refreshStats } = useReferralSystem();
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=web.codezen';

  const handleCopy = () => {
    if (referralStats?.referralCode) {
      navigator.clipboard.writeText(`${PLAY_STORE_URL}&referral=${referralStats.referralCode}`);
      toast.success('Link copied!');
    }
  };

  const handleShare = async () => {
    if (referralStats?.referralCode) {
      const shareData = {
        title: 'Join CodeZen',
        text: `Learn coding with me! Use my code ${referralStats.referralCode} for bonus rewards 🎁`,
        url: `${PLAY_STORE_URL}&referral=${referralStats.referralCode}`
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch { handleCopy(); }
      } else { handleCopy(); }
    }
  };

  const handleApplyCode = async () => {
    if (!code.trim()) return toast.error('Enter a code');
    setIsApplying(true);
    try {
      const success = await applyReferralCode(code.trim());
      if (success) { setCode(''); await refreshStats(); }
    } finally { setIsApplying(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { icon: Users, label: 'Total', value: referralStats?.totalReferrals || 0, color: 'text-blue-600' },
    { icon: Trophy, label: 'Completed', value: referralStats?.completedReferrals || 0, color: 'text-emerald-600' },
    { icon: Gift, label: 'XP Earned', value: referralStats?.totalRewardsEarned?.xp || 0, color: 'text-amber-600' },
  ];

  const steps = [
    { step: 1, text: 'Share your unique referral link' },
    { step: 2, text: 'Friend downloads & signs up' },
    { step: 3, text: 'Both get rewards when they complete 3 levels!' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="w-9 h-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Logo size="sm" showText={false} />
          <h1 className="font-semibold text-foreground">Refer & Earn</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Invite Friends, Earn Rewards</h2>
          <p className="text-sm text-muted-foreground">Get 100 XP, 50 coins & 15 hints for each friend!</p>
        </motion.div>

        {/* Your Code */}
        <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your Referral Code</p>
            <div className="bg-background rounded-lg px-4 py-3 text-center">
              <code className="text-2xl font-bold text-primary tracking-widest">
                {referralStats?.referralCode || '------'}
              </code>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCopy} variant="outline" className="flex-1 h-10">
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
              <Button onClick={handleShare} className="flex-1 h-10 bg-primary">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-3">
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Apply Code */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="text-sm font-medium text-foreground">Have a referral code?</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="flex-1 h-10 uppercase"
                maxLength={16}
              />
              <Button
                onClick={handleApplyCode}
                disabled={!code.trim() || isApplying}
                className="h-10 px-6"
              >
                {isApplying ? '...' : 'Apply'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get 50 XP + 25 coins + 10 hints instantly!
            </p>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <p className="font-medium text-foreground">How it works</p>
            <div className="space-y-3">
              {steps.map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{item.step}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Referrals;
