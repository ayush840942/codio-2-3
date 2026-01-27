import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HEARTS_CONFIG } from '@/data/heartsData';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface HeartsContextType {
    hearts: number;
    maxHearts: number;
    lastRefillTime: number;
    timeUntilNextHeart: number;
    canPlay: boolean;
    loseHeart: () => void;
    purchaseHeart: (xpBalance: number) => { success: boolean; newXP: number };
    refillHearts: () => void;
}

const HeartsContext = createContext<HeartsContextType | undefined>(undefined);

export const HeartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [hearts, setHearts] = useState<number>(HEARTS_CONFIG.MAX_HEARTS);
    const [lastRefillTime, setLastRefillTime] = useState<number>(Date.now());
    const [timeUntilNextHeart, setTimeUntilNextHeart] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load hearts from localStorage or database
    useEffect(() => {
        const loadHearts = async () => {
            if (!user) return;

            const isGuest = user.email === 'guest@codio.local';
            const cacheKey = `codio_hearts_cache_${user.id}`;

            try {
                // First, try loading from cache for immediate UI responsiveness
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const data = JSON.parse(cached);
                    setHearts(data.hearts ?? HEARTS_CONFIG.MAX_HEARTS);
                    setLastRefillTime(data.lastRefillTime || Date.now());
                }

                if (!isGuest) {
                    // Try to fetch newest data from database for real users
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('hearts, hearts_last_refill')
                        .eq('id', user.id)
                        .maybeSingle();

                    if (!error && data) {
                        const dbHearts = (data as any).hearts;
                        const dbLastRefill = (data as any).hearts_last_refill;

                        // Only update state if different or not cached
                        if (dbHearts !== undefined || dbLastRefill) {
                            const finalHearts = dbHearts ?? HEARTS_CONFIG.MAX_HEARTS;
                            const finalRefillTime = dbLastRefill ? new Date(dbLastRefill).getTime() : Date.now();

                            setHearts(finalHearts);
                            setLastRefillTime(finalRefillTime);

                            // Update cache with fresh DB data
                            localStorage.setItem(cacheKey, JSON.stringify({
                                hearts: finalHearts,
                                lastRefillTime: finalRefillTime
                            }));
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to load hearts:', error);
            } finally {
                setIsLoaded(true);
            }
        };
        loadHearts();
    }, [user]);

    // Save hearts to localStorage and database
    const saveHearts = useCallback(async (newHearts: number, newRefillTime: number) => {
        if (!user || !isLoaded) return;

        const isGuest = user.email === 'guest@codio.local';
        const cacheKey = `codio_hearts_cache_${user.id}`;

        // Always save to cache for offline support
        try {
            localStorage.setItem(cacheKey, JSON.stringify({
                hearts: newHearts,
                lastRefillTime: newRefillTime,
            }));
        } catch (error) {
            console.error('Failed to save hearts to cache:', error);
        }

        // Save to database for real users if online
        if (!isGuest) {
            try {
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        hearts: newHearts,
                        hearts_last_refill: new Date(newRefillTime).toISOString()
                    } as any)
                    .eq('id', user.id);

                if (error) throw error;
            } catch (error) {
                console.error('Failed to sync hearts to database (offline?):', error);
                // No toast here to avoid bothering the user while offline
            }
        }
    }, [user, isLoaded]);

    // Auto-refill timer
    useEffect(() => {
        if (!isLoaded) return;

        if (hearts >= HEARTS_CONFIG.MAX_HEARTS) {
            setTimeUntilNextHeart(0);
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceRefill = now - lastRefillTime;
            const heartsToAdd = Math.floor(timeSinceRefill / HEARTS_CONFIG.REFILL_TIME_MS);

            if (heartsToAdd > 0) {
                const newHearts = Math.min(hearts + heartsToAdd, HEARTS_CONFIG.MAX_HEARTS);
                // Preserve the "remainder" time to prevent premature resets
                const newRefillTime = lastRefillTime + (heartsToAdd * HEARTS_CONFIG.REFILL_TIME_MS);

                setHearts(newHearts);
                setLastRefillTime(newRefillTime);
                saveHearts(newHearts, newRefillTime);
            }

            // Calculate time until next heart
            const timeRemaining = HEARTS_CONFIG.REFILL_TIME_MS - (timeSinceRefill % HEARTS_CONFIG.REFILL_TIME_MS);
            setTimeUntilNextHeart(timeRemaining);
        }, 1000);

        return () => clearInterval(interval);
    }, [hearts, lastRefillTime, saveHearts, isLoaded]);

    const loseHeart = useCallback(() => {
        setHearts(prev => {
            const newHearts = Math.max(0, prev - 1);
            let newRefillTime = lastRefillTime;
            if (newHearts < HEARTS_CONFIG.MAX_HEARTS && prev === HEARTS_CONFIG.MAX_HEARTS) {
                // Start refill timer when losing first heart
                newRefillTime = Date.now();
                setLastRefillTime(newRefillTime);
            }
            saveHearts(newHearts, newRefillTime);
            return newHearts;
        });
    }, [lastRefillTime, saveHearts]);

    const purchaseHeart = useCallback((xpBalance: number): { success: boolean; newXP: number } => {
        if (xpBalance < HEARTS_CONFIG.XP_COST_PER_HEART) {
            return { success: false, newXP: xpBalance };
        }

        if (hearts >= HEARTS_CONFIG.MAX_HEARTS) {
            return { success: false, newXP: xpBalance };
        }

        setHearts(prev => {
            const newHearts = Math.min(prev + HEARTS_CONFIG.HEARTS_PER_PURCHASE, HEARTS_CONFIG.MAX_HEARTS);
            saveHearts(newHearts, lastRefillTime);
            return newHearts;
        });
        return {
            success: true,
            newXP: xpBalance - HEARTS_CONFIG.XP_COST_PER_HEART
        };
    }, [hearts, lastRefillTime, saveHearts]);

    const refillHearts = useCallback(() => {
        const newRefillTime = Date.now();
        setHearts(HEARTS_CONFIG.MAX_HEARTS);
        setLastRefillTime(newRefillTime);
        saveHearts(HEARTS_CONFIG.MAX_HEARTS, newRefillTime);
    }, [saveHearts]);

    const canPlay = hearts > 0;

    return (
        <HeartsContext.Provider
            value={{
                hearts,
                maxHearts: HEARTS_CONFIG.MAX_HEARTS,
                lastRefillTime,
                timeUntilNextHeart,
                canPlay,
                loseHeart,
                purchaseHeart,
                refillHearts,
            }}
        >
            {children}
        </HeartsContext.Provider>
    );
};

export const useHearts = () => {
    const context = useContext(HeartsContext);
    if (!context) {
        throw new Error('useHearts must be used within HeartsProvider');
    }
    return context;
};
