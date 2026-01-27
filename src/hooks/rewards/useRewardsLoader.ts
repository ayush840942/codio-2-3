
import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserRewards } from '@/types/rewards';
import { calculateTrialStatus } from '@/utils/trialUtils';

export const useRewardsLoader = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateRewardsInDB = useCallback(async (updates: any): Promise<boolean> => {
    if (!user) return false;

    try {
      console.log('Updating rewards in database and local storage:', updates);

      // Save to localStorage as backup
      const storageKey = `codio_rewards_${user.id}`;
      const existingLocal = localStorage.getItem(storageKey);
      const localData = existingLocal ? JSON.parse(existingLocal) : {};

      localStorage.setItem(storageKey, JSON.stringify({
        ...localData,
        ...updates,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('user_rewards')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating rewards in database:', error);
        return false;
      }

      console.log('Rewards updated successfully');
      return true;
    } catch (error) {
      console.error('Error in updateRewardsInDB:', error);
      return false;
    }
  }, [user]);

  const loadRewards = useCallback(async (setRewards: React.Dispatch<React.SetStateAction<UserRewards>>) => {
    if (!user) return;

    try {
      setLoading(true);
      const storageKey = `codio_rewards_${user.id}`;
      console.log('Loading rewards for user:', user.id);

      // 1. Try to load from localStorage first for immediate UI
      const stored = localStorage.getItem(storageKey);
      let localData: any = null;
      if (stored) {
        try {
          localData = JSON.parse(stored);
          console.log('Found local rewards:', localData);
        } catch (e) {
          console.error('Failed to parse local rewards:', e);
        }
      }

      // 2. Load from database
      const { data, error } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading rewards from DB:', error);

        if (localData) {
          console.log('Falling back to local data');
          const trialStatus = calculateTrialStatus(localData.trial_start_date || new Date().toISOString(), user.created_at);
          setRewards({
            xp: localData.xp || 0,
            coins: localData.coins || 0,
            streak: localData.streak || 0,
            loginStreak: localData.loginStreak || 0,
            dailyStreak: localData.dailyStreak || 0,
            badges: localData.badges || [],
            hintPoints: localData.hintPoints || 50,
            lastClaimDate: localData.lastClaimDate || null,
            freeHintDays: localData.freeHintDays || 30,
            totalXpEarned: localData.totalXpEarned || 0,
            levelsCompleted: localData.levelsCompleted || 0,
            perfectSolutions: localData.perfectSolutions || 0,
            hintPointsSpent: localData.hintPointsSpent || 0,
            trialStartDate: localData.trial_start_date || null,
            isTrialActive: localData.isTrialActive || false,
            ...trialStatus
          });
          return;
        }

        // Create initial rewards if none exist and no local data
        const initialRewards = {
          user_id: user.id,
          hint_points: 50,
          login_streak: 0,
          last_claim_date: null,
          trial_start_date: new Date().toISOString().split('T')[0]
        };

        const { error: insertError } = await supabase
          .from('user_rewards')
          .insert(initialRewards);

        if (insertError) {
          console.error('Error creating initial rewards:', insertError);
        }

        const trialStatus = calculateTrialStatus(initialRewards.trial_start_date, user.created_at);
        setRewards({
          xp: 0,
          coins: 0,
          streak: 0,
          loginStreak: 0,
          dailyStreak: 0,
          badges: [],
          hintPoints: 50,
          lastClaimDate: null,
          freeHintDays: 30,
          totalXpEarned: 0,
          levelsCompleted: 0,
          perfectSolutions: 0,
          hintPointsSpent: 0,
          trialStartDate: initialRewards.trial_start_date,
          isTrialActive: false,
          ...trialStatus
        });
        return;
      }

      if (data) {
        console.log('Loaded rewards from database:', data);
        const trialStatus = calculateTrialStatus(data.trial_start_date, user.created_at);

        // Merge DB data with local data (local data might have more recent xp/coins)
        setRewards({
          xp: localData?.xp || 0,
          coins: localData?.coins || 0,
          streak: data.login_streak || localData?.streak || 0,
          loginStreak: data.login_streak || localData?.loginStreak || 0,
          dailyStreak: data.login_streak || localData?.dailyStreak || 0,
          badges: localData?.badges || [],
          hintPoints: data.hint_points || 0,
          lastClaimDate: data.last_claim_date,
          freeHintDays: Math.max(0, 30 - Math.floor((Date.now() - new Date(data.trial_start_date || user.created_at || Date.now()).getTime()) / (1000 * 60 * 60 * 24))),
          totalXpEarned: localData?.totalXpEarned || 0,
          levelsCompleted: localData?.levelsCompleted || 0,
          perfectSolutions: localData?.perfectSolutions || 0,
          hintPointsSpent: localData?.hintPointsSpent || 0,
          trialStartDate: data.trial_start_date,
          isTrialActive: false, // Default will be updated by trialStatus
          ...trialStatus
        });
      }
    } catch (error) {
      console.error('Error in loadRewards:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    loading,
    setLoading,
    updateRewardsInDB,
    loadRewards
  };
};

