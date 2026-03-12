
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTrialStatus } from './usePremiumGate';

export const useSubscriptionFeatures = () => {
  const { isSubscribed, subscriptionTier, loading, refreshSubscription } = useAuth();

  const canAccessLevel = (levelId: number): boolean => {
    if (isSubscribed) return true;

    // Free users can access first 30 levels only
    return levelId <= 30;
  };


  const hasFeature = (feature: string): boolean => {
    const tier = subscriptionTier || 'free';

    // Active Trial or Elite Yearly gets everything
    if (tier === 'premium-yearly' || tier === 'elite' || tier === 'trial') {
      return true;
    }

    // Pro Monthly gets Playground, Code Builder and Code Battles 
    // But Memos are for ELITE only
    if (tier === 'premium-monthly' || tier === 'pro') {
      if (feature === 'memos') return false;
      return true;
    }

    // Free tier
    return ['basic_levels', 'basic_hints', 'basic_progress', 'basic_sandbox'].includes(feature);
  };

  const getHintLimit = (): number => {
    if (isSubscribed || subscriptionTier === 'trial') return -1; // Unlimited
    return 3; // 3 free hints per day
  };

  const getMaxLevels = (): number => {
    if (isSubscribed || subscriptionTier === 'trial') return 200;
    return 30; // Free users get 30 levels
  };

  return {
    isSubscribed,
    subscriptionTier,
    loading,
    hasFeature,
    canAccessLevel,
    getHintLimit,
    getMaxLevels,
    refreshSubscription
  };
};
