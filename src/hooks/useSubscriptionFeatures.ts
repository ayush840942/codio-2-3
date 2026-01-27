
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useSubscriptionFeatures = () => {
  const { user, isSubscribed, subscriptionTier, loading, refreshSubscription } = useAuth();

  const canAccessLevel = (levelId: number): boolean => {
    if (isSubscribed) return true;

    // Free users can access first 10 levels
    return levelId <= 10;
  };

  const hasFeature = (feature: string): boolean => {
    const tier = subscriptionTier || 'free';

    if (tier === 'premium-yearly' || tier === 'pro') {
      return true; // All features
    }

    if (tier === 'premium-monthly') {
      // Premium monthly gets everything except Memos (Pro only)
      return feature !== 'memos';
    }

    // Free tier
    return ['basic_levels', 'basic_hints', 'basic_progress'].includes(feature);
  };

  const getHintLimit = (): number => {
    if (!isSubscribed) return 50;
    return -1; // Unlimited for all paid tiers
  };

  const getMaxLevels = (): number => {
    if (isSubscribed) return 200;
    return 10; // Free users get 10 levels
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
