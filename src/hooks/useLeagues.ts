import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useRewards } from '@/context/RewardsContext';

export interface LeaderboardUser {
    id: string;
    username: string;
    avatar_url: string | null;
    weekly_xp: number;
    isCurrentUser: boolean;
    rank?: number;
}

export const useLeagues = () => {
    const { user } = useAuth();
    const { rewards } = useRewards();
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const currentLeague = rewards.league || 'Bronze';

    const fetchLeaderboard = useCallback(async (isInitialLoad = true) => {
        try {
            if (isInitialLoad) setLoading(true);

            // 1. Fetch top users in the current league
            const { data: rewardsData, error: rewardsError } = await (supabase
                .from('user_rewards') as any)
                .select('*')
                .eq('league', currentLeague)
                .order('weekly_xp', { ascending: false })
                .limit(30);

            if (rewardsError) throw rewardsError;

            if (rewardsData) {
                // 2. Fetch profiles for these users
                const userIds = (rewardsData as any[]).map(r => r.user_id);
                const { data: profilesData, error: profilesError } = await supabase
                    .from('profiles')
                    .select('id, username, avatar_url')
                    .in('id', userIds);

                if (profilesError) throw profilesError;

                // 3. Combine and sort
                const combined: LeaderboardUser[] = (rewardsData as any[]).map(r => {
                    const profile = profilesData?.find(p => p.id === r.user_id);
                    return {
                        id: r.user_id,
                        username: profile?.username || 'Anonymous Hacker',
                        avatar_url: profile?.avatar_url || null,
                        weekly_xp: r.weekly_xp || 0,
                        isCurrentUser: r.user_id === user?.id
                    };
                }).sort((a, b) => b.weekly_xp - a.weekly_xp)
                    .map((user, idx) => ({ ...user, rank: idx + 1 }));

                setLeaderboard(combined);
            }
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
        } finally {
            if (isInitialLoad) setLoading(false);
        }
    }, [currentLeague, user?.id]);

    useEffect(() => {
        fetchLeaderboard(true);

        // 4. Set up Realtime subscription with optimized local patching
        const channel = supabase
            .channel(`league-${currentLeague}-optimized`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'user_rewards',
                    filter: `league=eq.${currentLeague}`
                },
                async (payload: any) => {
                    console.log('Instant XP Update:', payload);

                    if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
                        const newData = payload.new;

                        setLeaderboard(prev => {
                            const userExists = prev.find(u => u.id === newData.user_id);

                            if (userExists) {
                                // Patch existing user and re-sort
                                return prev.map(u =>
                                    u.id === newData.user_id
                                        ? { ...u, weekly_xp: newData.weekly_xp }
                                        : u
                                ).sort((a, b) => b.weekly_xp - a.weekly_xp)
                                    .map((u, idx) => ({ ...u, rank: idx + 1 }));
                            } else {
                                // New user entered the top 30? Just refetch to be safe and get profile
                                fetchLeaderboard(false);
                                return prev;
                            }
                        });
                    } else if (payload.eventType === 'DELETE') {
                        fetchLeaderboard(false);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [currentLeague, fetchLeaderboard]);

    return {
        leaderboard,
        loading,
        refresh: () => fetchLeaderboard(true)
    };
};
