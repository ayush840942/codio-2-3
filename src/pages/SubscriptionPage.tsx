import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Crown, Check, Sparkles, Zap, Shield, Star, Lock, Users, BadgeCheck, TrendingUp, Gift
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PaymentLoadingOverlay from '@/components/loading/PaymentLoadingOverlay';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import MobileHeader from '@/components/MobileHeader';
import { toDatabaseId } from '@/utils/idMapping';

interface LocalPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  tagline: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ElementType;
  accent: string;
  features: string[];
  cta: string;
  popular?: boolean;
  savings?: string;
}

const plans: LocalPlan[] = [
  {
    id: 'trial',
    name: 'PREMIUM TRIAL',
    price: 0,
    period: '7 DAYS',
    tagline: 'Full access, zero commitment.',
    badge: 'FREE TRIAL',
    badgeColor: 'bg-pastel-mint',
    icon: Gift,
    accent: 'bg-pastel-mint',
    cta: 'Start Free Trial →',
    features: [
      'All 200+ Levels Unlocked',
      'Unlimited AI Hints',
      'No Advertisements',
      'Streak Shield Protection',
      'Cancel Anytime — No Card Needed',
    ],
  },
  {
    id: 'premium-monthly',
    name: 'PRO MONTHLY',
    price: 19,
    period: 'MONTH',
    tagline: 'Everything. Every day. Unlimited.',
    icon: Crown,
    accent: 'bg-pastel-lavender',
    popular: true,
    badge: 'MOST POPULAR',
    badgeColor: 'bg-black',
    cta: 'Go Pro Now →',
    features: [
      'All 200+ Levels (Trial + Beyond)',
      'Unlimited AI Hints',
      'Playground + Code Builder',
      'Code Battles Access',
      'Streak Shield + Unlimited Hearts',
      'No Ads — Ever',
    ],
  },
  {
    id: 'premium-yearly',
    name: 'ELITE YEARLY',
    price: 149,
    originalPrice: 228,
    period: 'YEAR',
    tagline: 'Best deal. All features. All year.',
    savings: 'SAVE 35%',
    icon: Shield,
    accent: 'bg-pastel-yellow',
    badge: 'BEST VALUE',
    badgeColor: 'bg-pastel-yellow border-2 border-black',
    cta: 'Get Elite Access →',
    features: [
      'Everything in Pro Monthly',
      'Memos & Learning Notes',
      'Exclusive Elite Badge',
      'Early Feature Access',
      'VIP Priority Support',
      'All Future Languages Included',
    ],
  },
];

const stats = [
  { icon: Users, value: '50K+', label: 'Active Learners' },
  { icon: BadgeCheck, value: '4.9★', label: 'App Store Rating' },
  { icon: TrendingUp, value: '200+', label: 'Levels & Challenges' },
];

const freeVsPro = [
  { feature: 'Levels Available', free: 'First 30 only', pro: '200+ Levels ✓' },
  { feature: 'AI Coding Hints', free: '3 per day', pro: 'Unlimited ✓' },
  { feature: 'Advertisements', free: 'Shown', pro: 'None ✓' },
  { feature: 'Streak Shield', free: '✗', pro: 'Included ✓' },
  { feature: 'Playground', free: '✗', pro: 'Full Access ✓' },
  { feature: 'Code Battles', free: '✗', pro: 'Included ✓' },
];

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isSubscribed, subscriptionTier, startTrial } = useAuth();
  const { loading, isProcessing, handleSubscribe } = useSubscription(user as any);
  const [activeTab, setActiveTab] = useState<'trial' | 'plans' | 'compare'>('trial');
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Timer logic for active subscription/trial
  useEffect(() => {
    const updateTimer = async () => {
      if (!user || !isSubscribed) return;

      const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('end_date')
        .eq('user_id', toDatabaseId(user.id))
        .eq('status', 'active')
        .order('end_date', { ascending: false })
        .limit(1)
        .single();

      if (sub?.end_date) {
        const interval = setInterval(() => {
          const now = new Date().getTime();
          const end = new Date(sub.end_date).getTime();
          const diff = end - now;

          if (diff <= 0) {
            setTimeLeft('EXPIRED');
            clearInterval(interval);
            return;
          }

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          setTimeLeft(`${days}d ${hours}h ${mins}m`);
        }, 1000);

        return () => clearInterval(interval);
      }
    };

    updateTimer();
  }, [user?.id, isSubscribed]);

  const handlePlanSubscribe = async (plan: LocalPlan) => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      navigate('/auth');
      return;
    }
    if (plan.id === 'trial') {
      const success = await startTrial();
      if (success) {
        toast.success('🎉 7-Day Free Trial Started!', { description: 'Enjoy full access — no credit card needed.' });
        navigate('/');
      } else {
        toast.error('Failed to start trial. Maybe you already used it?');
      }
      return;
    }
    try {
      const periodMap: Record<string, 'month' | 'year' | 'once'> = {
        'MONTH': 'month',
        'YEAR': 'year',
        '7 DAYS': 'once',
      };
      const result = await handleSubscribe({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        period: periodMap[plan.period] ?? 'once',
        description: plan.tagline,
        features: plan.features.map(f => ({ name: f, included: true })),
      } as any);
      if (result > 0) {
        toast.success(`✅ Welcome to ${plan.name}!`, { description: 'Your premium access is now active.' });
        navigate('/');
      }
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    }
  };


  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-pastel-yellow/30 to-white font-draw overflow-x-hidden">
      <PaymentLoadingOverlay isVisible={isProcessing} />

      <div className="max-w-md mx-auto px-5 pb-28" style={{ paddingTop: 'calc(var(--safe-area-top) + 3.5rem)' }}>
        {/* Unified Mobile Header */}
        <MobileHeader
          title="Go Premium"
          showBack
          rightElement={
            <div className="w-10 h-10 bg-pastel-yellow border-2 border-black rounded-xl flex items-center justify-center shadow-comic-sm rotate-3">
              <Crown className="w-6 h-6 text-black" strokeWidth={2.5} />
            </div>
          }
        />

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-white border-2 border-black rounded-2xl p-3 text-center shadow-[3px_3px_0_#000]">
              <s.icon className="h-5 w-5 mx-auto mb-1 text-black" strokeWidth={2.5} />
              <p className="text-lg font-black text-black leading-none">{s.value}</p>
              <p className="text-[9px] font-black text-black/50 uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black rounded-3xl p-6 mb-6 border-3 border-black shadow-[6px_6px_0_#333] relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-pastel-yellow/20 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-pastel-mint/20 rounded-full blur-2xl" />
          <Crown className="h-10 w-10 text-pastel-yellow mb-3" strokeWidth={2} />
          <h2 className="text-2xl font-black text-white uppercase leading-tight mb-1">
            Unlock Full<br />Doodle Power
          </h2>
          <p className="text-sm font-bold text-white/60 mb-4">
            Only <span className="text-pastel-yellow font-black">$0.41/day</span> with Elite Yearly
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['200+ LEVELS', '∞ AI HINTS', 'NO ADS', 'STREAK SHIELD'].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pastel-mint rounded flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-black" strokeWidth={4} />
                </div>
                <span className="text-xs font-black text-white/80">{f}</span>
              </div>
            ))}
          </div>
          {/* Money back */}
          <div className="mt-4 flex items-center gap-2 border border-white/20 rounded-xl px-3 py-2">
            <Shield className="h-4 w-4 text-pastel-mint shrink-0" />
            <p className="text-[10px] font-black text-white/70 uppercase">30-day money-back guarantee. No questions asked.</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="grid grid-cols-3 mb-5 bg-black/5 rounded-2xl p-1 border-2 border-black">
          {(['trial', 'plans', 'compare'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 rounded-xl text-xs font-black uppercase transition-all ${activeTab === tab ? 'bg-black text-white shadow-[2px_2px_0_#444]' : 'text-black/50'}`}
            >
              {tab === 'trial' ? '🎁 Free Trial' : tab === 'plans' ? '💎 Plans' : '⚖️ Compare'}
            </button>
          ))}
        </div>

        {/* Free trial tab */}
        {activeTab === 'trial' && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            {isSubscribed ? (
              <div className="bg-black border-4 border-cc-yellow rounded-3xl p-8 shadow-comic-lg mb-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cc-yellow/10 rounded-full blur-2xl" />
                <div className="text-5xl mb-4 animate-bounce">🛡️</div>
                <h3 className="text-3xl font-black text-cc-yellow uppercase mb-2">ACCESS ACTIVE</h3>
                <div className="inline-block px-4 py-1 bg-cc-yellow text-black font-black rounded-lg text-xs uppercase mb-6">
                  {subscriptionTier === 'trial' ? '7-Day Free Trial' : subscriptionTier?.split('-').join(' ').toUpperCase()}
                </div>

                <div className="space-y-1 mb-8">
                  <p className="text-white/40 font-black uppercase text-[10px] tracking-widest">Time Remaining</p>
                  <p className="text-4xl font-black text-white font-mono tracking-tighter">{timeLeft || '--:--:--'}</p>
                </div>

                <DrawnButton
                  onClick={() => navigate('/')}
                  className="w-full bg-cc-yellow text-black h-14 text-xl"
                >
                  START CODING 🚀
                </DrawnButton>
              </div>
            ) : (
              <div className="bg-pastel-mint border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0_#000] mb-4">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="text-2xl font-black text-black uppercase mb-1">7-Day Free Trial</h3>
                <p className="text-sm font-bold text-black/70 mb-5">
                  Zero cost. No credit card. Full access to everything for 7 days. Cancel any time.
                </p>
                {plans[0].features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2.5">
                    <div className="w-6 h-6 bg-white border-2 border-black rounded-lg flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-black" strokeWidth={4} />
                    </div>
                    <span className="text-sm font-black text-black uppercase">{f}</span>
                  </div>
                ))}
                <button
                  onClick={() => handlePlanSubscribe(plans[0])}
                  className="w-full mt-5 h-14 bg-black text-white font-black text-lg uppercase rounded-2xl shadow-[4px_4px_0_#333] active:shadow-none active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Start Free Trial — $0
                </button>
                <p className="text-center mt-2 text-[10px] font-bold text-black/40 uppercase">No card needed • Cancel anytime</p>
              </div>
            )}
            {!isSubscribed && (
              <p className="text-center text-xs font-bold text-black/40 px-4">
                After trial, you'll be prompted to choose Pro ($19/mo) or Elite ($149/yr). No auto-charge.
              </p>
            )}
          </motion.div>
        )}

        {/* Plans tab */}
        {activeTab === 'plans' && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {plans.slice(1).map((plan, i) => (
              <div
                key={plan.id}
                className={`relative bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_#000] ${plan.popular ? 'border-black' : ''}`}
              >
                {plan.badge && (
                  <div className={`absolute top-0 right-0 ${plan.badgeColor} border-l-4 border-b-4 border-black px-4 py-1.5`}>
                    <span className={`text-[10px] font-black uppercase ${plan.id === 'premium-monthly' ? 'text-white' : 'text-black'}`}>{plan.badge}</span>
                  </div>
                )}
                <div className={`${plan.accent} border-b-4 border-black p-5`}>
                  <plan.icon className="h-8 w-8 text-black mb-2" strokeWidth={2.5} />
                  <h3 className="text-xl font-black text-black uppercase leading-tight">{plan.name}</h3>
                  <p className="text-xs font-bold text-black/60">{plan.tagline}</p>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-black">${plan.price}</span>
                    <span className="text-sm font-bold text-black/50">/{plan.period}</span>
                    {plan.originalPrice && (
                      <span className="text-sm line-through text-black/30 font-bold">${plan.originalPrice}</span>
                    )}
                  </div>
                  {plan.savings && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-black px-2 py-0.5 rounded-full border border-green-300 mb-3">{plan.savings}</span>
                  )}
                  {plan.id === 'premium-yearly' && (
                    <p className="text-xs font-black text-black/50 mb-3">That's just $0.41 per day!</p>
                  )}
                  <div className="space-y-2 mb-5">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0" strokeWidth={3} />
                        <span className="text-xs font-black text-black/80 uppercase">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePlanSubscribe(plan)}
                    disabled={loading === plan.id}
                    className={`w-full h-13 py-3.5 font-black text-base uppercase rounded-2xl border-2 border-black shadow-[4px_4px_0_#000] active:shadow-none active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ${plan.popular ? 'bg-black text-white' : 'bg-white text-black'}`}
                  >
                    {loading === plan.id ? (
                      <div className="w-5 h-5 border-3 border-current border-t-transparent rounded-full animate-spin" />
                    ) : plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Comparison tab */}
        {activeTab === 'compare' && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_#000]">
              {/* Header */}
              <div className="grid grid-cols-3 border-b-4 border-black">
                <div className="p-3 border-r-2 border-black">
                  <p className="text-xs font-black text-black/50 uppercase">Feature</p>
                </div>
                <div className="p-3 border-r-2 border-black text-center">
                  <Lock className="h-4 w-4 mx-auto text-black/40" strokeWidth={2.5} />
                  <p className="text-xs font-black text-black/50 uppercase mt-1">Free</p>
                </div>
                <div className="p-3 text-center bg-pastel-mint">
                  <Crown className="h-4 w-4 mx-auto text-black" strokeWidth={2.5} />
                  <p className="text-xs font-black text-black uppercase mt-1">Pro+</p>
                </div>
              </div>
              {freeVsPro.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 ${i < freeVsPro.length - 1 ? 'border-b-2 border-black/10' : ''}`}>
                  <div className="p-3 border-r-2 border-black/10">
                    <p className="text-xs font-black text-black uppercase leading-tight">{row.feature}</p>
                  </div>
                  <div className="p-3 border-r-2 border-black/10 text-center">
                    <p className="text-xs font-bold text-black/40">{row.free}</p>
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-black text-green-700">{row.pro}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handlePlanSubscribe(plans[0])}
              className="w-full mt-5 h-14 bg-black text-white font-black text-base uppercase rounded-2xl shadow-[4px_4px_0_#333] active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Start Free Trial — $0
            </button>
          </motion.div>
        )}

        {/* Trust footer */}
        <div className="flex items-center justify-center gap-4 mt-8 opacity-50">
          <div className="flex items-center gap-1 text-xs font-black uppercase">
            <Shield className="h-3.5 w-3.5" />
            SECURE
          </div>
          <div className="w-1 h-1 rounded-full bg-black" />
          <div className="flex items-center gap-1 text-xs font-black uppercase">
            <Star className="h-3.5 w-3.5" />
            30-DAY GUARANTEE
          </div>
          <div className="w-1 h-1 rounded-full bg-black" />
          <span className="text-xs font-black uppercase">CANCEL ANYTIME</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;