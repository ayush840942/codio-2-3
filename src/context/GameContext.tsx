import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRewards } from '@/context/RewardsContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { toDatabaseId } from '@/utils/idMapping';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { PuzzleLevel } from '@/types/game';
import { initialLevels as levelSourceData } from '@/data/gameLevels';
import { registerPlugin } from '@capacitor/core';
import { getLevelConfig } from '@/utils/levelManifest';

interface InAppReviewPlugin {
  triggerReview(): Promise<void>;
}

const InAppReview = registerPlugin<InAppReviewPlugin>('InAppReview');

// Re-export PuzzleLevel for backward compatibility
export type { PuzzleLevel } from '@/types/game';

type GameContextType = {
  gameState: {
    levels: PuzzleLevel[];
    subscription: {
      active: boolean;
      tier: string | null;
    };
  };
  completeLevel: (levelId: number, attempts?: number) => Promise<void>;
  resetProgress: () => Promise<void>;
  syncWithDatabase: () => Promise<void>;
  canAccessLevel: (levelId: number) => boolean;
  updateXP?: (newXP: number) => void; // Deprecated - use rewards.addXP instead
  isTrialUser: boolean;
  trialDaysRemaining: number;
  isLoaded: boolean;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const calculateTrialDaysRemaining = (startDate: string): number => {
  const start = new Date(startDate);
  const now = new Date();
  const differenceInDays = (now.getTime() - start.getTime()) / (1000 * 3600 * 24);
  return Math.max(0, 7 - Math.floor(differenceInDays));
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<{
    levels: PuzzleLevel[];
    subscription: {
      active: boolean;
      tier: string | null;
    };
  }>({
    levels: [],
    subscription: {
      active: false,
      tier: null
    }
  });
  const [isTrialUser, setIsTrialUser] = useState(false);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();
  const { addXP } = useRewards();
  const { isSubscribed, canAccessLevel: subscriptionCanAccessLevel, getMaxLevels } = useSubscriptionFeatures();

  useEffect(() => {
    const initializeGame = async () => {
      if (user) {
        try {
          const isGuest = user.email === 'guest@codio.local';
          const levelsCacheKey = `codio_levels_cache_${user.id}`;
          const subCacheKey = `codio_subscription_cache_${user.id}`;

          let dbLevels: any[] = [];
          let subscriptionData = null;
          let profileData = null;

          // 1. Try loading from Local Cache first for immediate UI
          const cachedLevels = localStorage.getItem(levelsCacheKey);
          if (cachedLevels) {
            dbLevels = JSON.parse(cachedLevels);
          }

          const cachedSub = localStorage.getItem(subCacheKey);
          if (cachedSub) {
            subscriptionData = JSON.parse(cachedSub);
          }

          // Initial UI update from cache
          if (dbLevels.length > 0 || subscriptionData) {
            const cachedInitialLevels = levelSourceData.map(level => {
              const cachedLevel = dbLevels?.find(l => l.level_id === level.id || l.levelId === level.id);
              return {
                ...level,
                isCompleted: cachedLevel?.is_completed ?? cachedLevel?.isCompleted ?? false,
                isUnlocked: (cachedLevel?.is_unlocked ?? cachedLevel?.isUnlocked) || level.id === 1,
                attempts: cachedLevel?.attempts || 0
              };
            });

            setGameState({
              levels: cachedInitialLevels,
              subscription: {
                active: !!subscriptionData,
                tier: subscriptionData?.plan_id || null
              }
            });
          }

          // 2. Try fetching from Supabase if online
          if (!isGuest) {
            try {
              const dbUserId = toDatabaseId(user.id);
              const { data: remoteLevels, error: levelsError } = await supabase
                .from('user_levels')
                .select('*')
                .eq('user_id', dbUserId);

              if (!levelsError && remoteLevels) {
                dbLevels = remoteLevels;
                localStorage.setItem(levelsCacheKey, JSON.stringify(dbLevels));
              }

              // Fetch subscription status
              const { data: subData, error: subscriptionError } = await supabase
                .from('user_subscriptions')
                .select('*')
                .eq('user_id', dbUserId)
                .eq('status', 'active')
                .single();

              if (!subscriptionError && subData) {
                subscriptionData = subData;
                localStorage.setItem(subCacheKey, JSON.stringify(subscriptionData));
              }

              // Fetch user profile to check trial status
              const { data: profData, error: profileError } = await supabase
                .from('profiles')
                .select('trial_start_date')
                .eq('id', dbUserId)
                .single();

              if (!profileError) profileData = profData;

            } catch (onlineError) {
              console.warn('Silent fallback to cache due to network error:', onlineError);
            }
          }

          // Final update with the most fresh data available (DB or Cache)
          const finalLevels = levelSourceData.map(level => {
            const dbLevel = dbLevels?.find(l => l.level_id === level.id || l.levelId === level.id);

            return {
              ...level,
              isCompleted: dbLevel?.is_completed ?? dbLevel?.isCompleted ?? false,
              isUnlocked: (dbLevel?.is_unlocked ?? dbLevel?.isUnlocked) || level.id === 1,
              attempts: dbLevel?.attempts || 0
            };
          });

          const trialStartDate = profileData?.trial_start_date;
          const isTrial = trialStartDate != null;
          const daysRemaining = isTrial ? calculateTrialDaysRemaining(trialStartDate) : 0;

          setIsTrialUser(isTrial);
          setTrialDaysRemaining(daysRemaining);

          setGameState({
            levels: finalLevels,
            subscription: {
              active: !!subscriptionData,
              tier: subscriptionData?.plan_id || null
            }
          });

          setIsLoaded(true);
        } catch (error) {
          console.error('Initialization error:', error);
          setIsLoaded(true); // Still set loaded to true to avoid stuck UI
        }
      } else {
        // Default state for no user
        const defaultLevels = levelSourceData.map((level, index) => ({
          ...level,
          isCompleted: false,
          isUnlocked: index === 0,
          attempts: 0
        }));

        setGameState({
          levels: defaultLevels,
          subscription: { active: false, tier: null }
        });
        setIsTrialUser(false);
        setTrialDaysRemaining(0);
        setIsLoaded(true);
      }
    };

    initializeGame();
  }, [user]);

  // Real-time Level Progress Subscription
  useEffect(() => {
    if (!user) return;

    const dbId = toDatabaseId(user.id);
    console.log('Setting up real-time level progress listener for:', dbId);

    const levelsSubscription = supabase
      .channel(`levels_realtime_${dbId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_levels',
          filter: `user_id=eq.${dbId}`
        },
        (payload: any) => {
          console.log('Real-time level update received:', payload);
          if (payload.new) {
            const updatedLevel = payload.new;

            setGameState(prevState => ({
              ...prevState,
              levels: prevState.levels.map(level => {
                if (level.id === updatedLevel.level_id) {
                  return {
                    ...level,
                    isCompleted: updatedLevel.is_completed,
                    isUnlocked: updatedLevel.is_unlocked,
                    attempts: updatedLevel.attempts
                  };
                }
                // Also handle the next level becoming unlocked if previous was completed
                if (updatedLevel.is_completed && level.id === updatedLevel.level_id + 1) {
                  return { ...level, isUnlocked: true };
                }
                return level;
              })
            }));

            // Update cache
            const cacheKey = `codio_levels_cache_${user.id}`;
            const cached = localStorage.getItem(cacheKey);
            let levels = cached ? JSON.parse(cached) : [];
            const idx = levels.findIndex((l: any) => l.level_id === updatedLevel.level_id);
            if (idx >= 0) {
              levels[idx] = updatedLevel;
            } else {
              levels.push(updatedLevel);
            }
            localStorage.setItem(cacheKey, JSON.stringify(levels));
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up levels listener');
      supabase.removeChannel(levelsSubscription);
    };
  }, [user?.id]);

  const canAccessLevel = useCallback((levelId: number): boolean => {
    console.log(`Checking access for level ${levelId}`);

    // Check subscription limits first
    if (!subscriptionCanAccessLevel(levelId)) {
      console.log(`Level ${levelId} blocked by subscription`);
      return false;
    }

    // Level 1 is always accessible
    if (levelId === 1) return true;

    // Check if previous level is completed
    const previousLevel = gameState.levels.find(level => level.id === levelId - 1);
    const isAccessible = previousLevel?.isCompleted || false;

    console.log(`Level ${levelId - 1} completed: ${previousLevel?.isCompleted}, Level ${levelId} accessible: ${isAccessible}`);
    return isAccessible;
  }, [gameState.levels, subscriptionCanAccessLevel]);

  const updateUserProgress = async (
    levelId: number,
    isCompleted: boolean = false,
    hintsUsed: number = 0,
    attempts: number = 0
  ) => {
    if (!user) return;

    try {
      const isGuest = user.email === 'guest@codio.local';
      const cacheKey = `codio_levels_cache_${user.id}`;

      // Update Local Cache Immediately
      const savedLevelsStr = localStorage.getItem(cacheKey);
      let savedLevels = savedLevelsStr ? JSON.parse(savedLevelsStr) : [];

      // Upsert into cache
      const existingIdx = savedLevels.findIndex((l: any) => l.level_id === levelId || l.levelId === levelId);
      const levelData = {
        level_id: levelId,
        is_completed: isCompleted,
        hints_used: hintsUsed,
        attempts: attempts,
        is_unlocked: true,
        updated_at: new Date().toISOString()
      };

      if (existingIdx >= 0) {
        savedLevels[existingIdx] = levelData;
      } else {
        savedLevels.push(levelData);
      }
      localStorage.setItem(cacheKey, JSON.stringify(savedLevels));

      // Sync to Supabase if not a guest
      if (!isGuest) {
        const dbUserId = toDatabaseId(user.id);
        const { error } = await supabase
          .from('user_levels')
          .upsert(
            {
              user_id: dbUserId,
              ...levelData
            },
            { onConflict: 'user_id,level_id' }
          );

        if (error) throw error;
      }
    } catch (error) {
      console.warn('Progress update sync error (offline?):', error);
      // No toast here as we have local cache updated
    }
  };

  const completeLevel = useCallback(async (levelId: number, attempts: number = 1) => {
    console.log(`Completing level ${levelId} with ${attempts} attempts`);

    try {
      const level = gameState.levels.find(l => l.id === levelId);
      const xpGained = level?.xpReward || 10;

      // Update local state immediately
      setGameState(prevState => ({
        ...prevState,
        levels: prevState.levels.map(level =>
          level.id === levelId
            ? { ...level, isCompleted: true, attempts }
            : level
        )
      }));

      // Update database
      if (user) {
        await updateUserProgress(levelId, true, 0, attempts);

        // Add XP to rewards (only if not already completed)
        if (!level?.isCompleted && xpGained > 0) {
          await addXP(xpGained);
        }

        // Unlock next level
        const nextLevelId = levelId + 1;
        const maxLevels = getMaxLevels();

        if (nextLevelId <= maxLevels) {
          setGameState(prevState => ({
            ...prevState,
            levels: prevState.levels.map(level =>
              level.id === nextLevelId
                ? { ...level, isUnlocked: true }
                : level
            )
          }));
        }
      }

      toast.success(`🎉 Level ${levelId} completed!`);

      // In-App Review Logic
      const completedCountKey = 'codio_completed_levels_count';
      const lastCount = parseInt(localStorage.getItem(completedCountKey) || '0', 10);
      const newCount = lastCount + 1;
      localStorage.setItem(completedCountKey, newCount.toString());

      if (newCount === 3) {
        console.log('Triggering In-App Review after 3 levels');
        try {
          await InAppReview.triggerReview();
        } catch (e) {
          console.error('Failed to trigger in-app review:', e);
        }
      }
    } catch (error) {
      console.error('Error completing level:', error);
      toast.error('Failed to save progress');
    }
  }, [user, gameState.levels, getMaxLevels]);

  const resetProgress = useCallback(async () => {
    if (!user) {
      console.error('No user logged in, cannot reset progress');
      return;
    }

    try {
      // Reset levels in the database
      const dbUserId = toDatabaseId(user.id);
      const { error } = await supabase
        .from('user_levels')
        .delete()
        .eq('user_id', dbUserId);

      if (error) {
        console.error('Error resetting user levels:', error);
        throw error;
      }

      // Reset local game state
      setGameState(prevState => ({
        ...prevState,
        levels: prevState.levels.map((level, index) => ({
          ...level,
          isCompleted: false,
          attempts: 0,
          isUnlocked: index === 0 // Only first level is unlocked
        }))
      }));

      toast.success('Progress reset successfully!');
    } catch (error) {
      console.error('Failed to reset progress:', error);
      toast.error('Failed to reset progress. Please try again.');
    }
  }, [user]);

  const syncWithDatabase = useCallback(async () => {
    if (!user) {
      console.error('No user logged in, cannot sync with database');
      return;
    }

    try {
      // Sync all levels
      await Promise.all(
        gameState.levels.map(level =>
          updateUserProgress(level.id, level.isCompleted, 0, level.attempts || 0)
        )
      );

      toast.success('Game progress synced with database!');
    } catch (error) {
      console.error('Failed to sync with database:', error);
      toast.error('Failed to sync with database. Please try again.');
    }
  }, [user, gameState.levels]);

  const updateXP = useCallback((newXP: number) => {
    console.warn('updateXP is deprecated. Use rewards.addXP() instead.');
    // No-op - XP is now managed by RewardsContext
  }, []);

  const value = {
    gameState,
    completeLevel,
    resetProgress,
    syncWithDatabase,
    canAccessLevel,
    updateXP,
    isTrialUser,
    trialDaysRemaining,
    isLoaded
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
