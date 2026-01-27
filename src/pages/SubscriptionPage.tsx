import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown, Check, Sparkles, Zap, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, handleSubscribe } = useSubscription(user);

  const plans = [
    {
      id: 'trial',
      name: 'Trial',
      price: 10,
      period: '7 days',
      description: 'Try all premium features',
      features: [
        '7-day full access',
        'No advertisements',
        'All premium features',
        'Cancel anytime'
      ],
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'premium-monthly',
      name: 'Premium',
      price: 49,
      period: 'month',
      description: 'Best for serious learners',
      features: [
        'Unlimited lessons',
        'Unlimited XP earning',
        'Code Battles access',
        'No advertisements',
        'Priority support'
      ],
      icon: Crown,
      gradient: 'from-primary to-purple-600',
      popular: true
    },
    {
      id: 'premium-yearly',
      name: 'Pro Yearly',
      price: 399,
      period: 'year',
      description: 'Best value - Save 32%',
      features: [
        'Everything in Premium',
        '2 months free',
        'Exclusive badges',
        'Early access features',
        'VIP support'
      ],
      icon: Shield,
      gradient: 'from-puzzle-orange to-yellow-500'
    }
  ];

  const handlePlanSubscribe = async (plan: any) => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      navigate('/auth');
      return;
    }

    try {
      const result = await handleSubscribe({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        period: plan.period,
        description: plan.description,
        features: plan.features
      });
      if (result > 0) {
        toast.success(`Successfully subscribed to ${plan.name}!`);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Subscription failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-background">
      <div className="px-4 py-6 space-y-6 max-w-md mx-auto pb-28">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-2xl bg-card border border-border"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">Go Premium</h1>
            <p className="text-sm text-muted-foreground">Unlock your full potential</p>
          </div>
        </div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-primary to-purple-700 border-0 overflow-hidden relative">
            <CardContent className="p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Premium Benefits</h2>
                  <p className="text-sm text-white/80">Level up your coding journey</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['No Ads', 'All Lessons', 'Unlimited XP', 'Code Battles'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-puzzle-green" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              {/* Decorative */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute right-12 bottom-2 w-16 h-16 bg-white/10 rounded-full" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Plans */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Choose Your Plan</h2>

          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${plan.popular ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
                }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-xl bg-primary text-primary-foreground px-3 py-1">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {plan.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-puzzle-green" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price & Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-foreground">₹{plan.price}</span>
                          <span className="text-muted-foreground">/{plan.period}</span>
                        </div>
                        <Button
                          onClick={() => handlePlanSubscribe(plan)}
                          disabled={loading === plan.id}
                          variant={plan.popular ? 'gradient' : 'secondary'}
                          className="rounded-xl px-6"
                        >
                          {loading === plan.id ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            'Get Plan'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-puzzle-green" />
            <span>Secure Payment</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-puzzle-orange" />
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;