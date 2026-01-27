import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useSoundEffects } from './useSoundEffects';

export interface Notification {
  id: string;
  type: 'friend_request' | 'challenge' | 'quest_complete';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { playNotification, playAchievement } = useSoundEffects();

  useEffect(() => {
    if (!user) return;

    // Subscribe to friend requests
    const friendsChannel = supabase
      .channel('friend-requests')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'friends',
          filter: `friend_id=eq.${user.id}`,
        },
        async (payload) => {
          console.log('New friend request:', payload);
          
          // Fetch friend's profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_name')
            .eq('id', payload.new.user_id)
            .single();

          const notification: Notification = {
            id: payload.new.id,
            type: 'friend_request',
            title: 'New Friend Request',
            message: `${profile?.user_name || 'Someone'} sent you a friend request!`,
            timestamp: new Date().toISOString(),
            read: false,
            data: payload.new,
          };

          setNotifications((prev) => [notification, ...prev]);
          playNotification();
          toast.success(notification.message);
        }
      )
      .subscribe();

    // Subscribe to challenges
    const challengesChannel = supabase
      .channel('challenges')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'challenges',
          filter: `challenged_id=eq.${user.id}`,
        },
        async (payload) => {
          console.log('New challenge:', payload);
          
          // Fetch challenger's profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_name')
            .eq('id', payload.new.challenger_id)
            .single();

          const notification: Notification = {
            id: payload.new.id,
            type: 'challenge',
            title: 'New Challenge',
            message: `${profile?.user_name || 'Someone'} challenged you to a duel!`,
            timestamp: new Date().toISOString(),
            read: false,
            data: payload.new,
          };

          setNotifications((prev) => [notification, ...prev]);
          playNotification();
          toast.success(notification.message);
        }
      )
      .subscribe();

    // Subscribe to quest completions
    const questsChannel = supabase
      .channel('quest-completions')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quest_progress',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Quest updated:', payload);
          
          if (payload.new.completed && !payload.old.completed) {
            const notification: Notification = {
              id: payload.new.id,
              type: 'quest_complete',
              title: 'Quest Completed!',
              message: `You completed a ${payload.new.quest_type} quest!`,
              timestamp: new Date().toISOString(),
              read: false,
              data: payload.new,
            };

            setNotifications((prev) => [notification, ...prev]);
            playAchievement();
            toast.success(notification.message, {
              description: 'Check your rewards!',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(friendsChannel);
      supabase.removeChannel(challengesChannel);
      supabase.removeChannel(questsChannel);
    };
  }, [user, playNotification, playAchievement]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAsRead,
    clearAll,
  };
};
