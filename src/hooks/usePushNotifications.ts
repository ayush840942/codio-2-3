import { useEffect, useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toDatabaseId } from '@/utils/idMapping';

interface PushNotificationState {
  token: string | null;
  notifications: PushNotificationSchema[];
  isSupported: boolean;
  isRegistered: boolean;
  isLoading: boolean;
}

export const usePushNotifications = () => {
  const { user } = useAuth();
  const [state, setState] = useState<PushNotificationState>({
    token: null,
    notifications: [],
    isSupported: false,
    isRegistered: false,
    isLoading: false,
  });

  // Save token to database with proper conflict handling
  const saveTokenToDatabase = useCallback(async (token: string) => {
    if (!user) {
      console.log('No user, skipping token save');
      return;
    }

    try {
      const platform = Capacitor.getPlatform();
      console.log('Saving push token to database for platform:', platform);

      // First try to find existing token
      const dbId = toDatabaseId(user.id);
      const { data: existingToken } = await supabase
        .from('push_tokens')
        .select('id')
        .eq('user_id', dbId)
        .eq('token', token)
        .single();

      if (existingToken) {
        // Update existing token
        const { error } = await supabase
          .from('push_tokens')
          .update({
            platform,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingToken.id);

        if (error) {
          console.error('Error updating push token:', error);
        } else {
          console.log('Push token updated in database');
        }
      } else {
        // Insert new token
        const dbId = toDatabaseId(user.id);
        const { error } = await supabase
          .from('push_tokens')
          .insert({
            user_id: dbId,
            token,
            platform,
          });

        if (error) {
          // Handle unique constraint violation
          if (error.code === '23505') {
            console.log('Token already exists, updating instead');
            await supabase
              .from('push_tokens')
              .update({
                platform,
                updated_at: new Date().toISOString(),
              })
              .eq('token', token);
          } else {
            console.error('Error saving push token:', error);
          }
        } else {
          console.log('Push token saved to database');
        }
      }
    } catch (err) {
      console.error('Error in saveTokenToDatabase:', err);
    }
  }, [user]);

  useEffect(() => {
    const isNative = Capacitor.isNativePlatform();
    setState(prev => ({ ...prev, isSupported: isNative }));

    if (!isNative) {
      console.log('Push notifications not supported on web - use Firebase for web push');
      return;
    }

    if (!user) {
      console.log('No user, skipping push notification setup');
      return;
    }

    const setupPushNotifications = async () => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        let permStatus = await PushNotifications.checkPermissions();
        console.log('Initial permission status:', permStatus.receive);

        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
          console.log('Permission after request:', permStatus.receive);
        }

        if (permStatus.receive !== 'granted') {
          console.log('Push notification permission denied');
          setState(prev => ({ ...prev, isLoading: false }));
          return;
        }

        /* 
        await PushNotifications.register();
        setState(prev => ({ ...prev, isRegistered: true, isLoading: false }));
        console.log('Push notifications registered successfully');
        */
        console.warn('Push notification registration skipped: missing google-services.json or Firebase setup');
        setState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.error('Error setting up push notifications:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    // Listeners
    const registrationListener = PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Push registration success, token:', token.value);
      setState(prev => ({ ...prev, token: token.value }));
      localStorage.setItem('pushToken', token.value);

      // Save to database
      await saveTokenToDatabase(token.value);
    });

    const registrationErrorListener = PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    });

    const notificationReceivedListener = PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push notification received:', notification);

        setState(prev => ({
          ...prev,
          notifications: [...prev.notifications, notification],
        }));

        // Show toast for foreground notifications
        toast(notification.title || 'New Notification', {
          description: notification.body,
          duration: 5000,
        });

        // Vibrate on notification
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    );

    const notificationActionListener = PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (action: ActionPerformed) => {
        console.log('Push notification action performed:', action);

        const data = action.notification.data;
        if (data?.route) {
          window.location.href = data.route;
        } else if (data?.type) {
          // Handle different notification types
          switch (data.type) {
            case 'streak':
              window.location.href = '/';
              break;
            case 'reward':
              window.location.href = '/hints';
              break;
            case 'level_reminder':
              window.location.href = '/levels';
              break;
            default:
              window.location.href = '/';
          }
        }
      }
    );

    setupPushNotifications();

    return () => {
      registrationListener.then(l => l.remove());
      registrationErrorListener.then(l => l.remove());
      notificationReceivedListener.then(l => l.remove());
      notificationActionListener.then(l => l.remove());
    };
  }, [user, saveTokenToDatabase]);

  const requestPermission = async () => {
    if (!state.isSupported) {
      toast.error('Push notifications require native app');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const permStatus = await PushNotifications.requestPermissions();
      if (permStatus.receive === 'granted') {
        await PushNotifications.register();
        setState(prev => ({ ...prev, isRegistered: true, isLoading: false }));
        toast.success('Notifications enabled!');
        return true;
      }
      toast.error('Permission denied by user');
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Error requesting permission:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const clearNotifications = () => {
    setState(prev => ({ ...prev, notifications: [] }));
  };

  // Send a notification via edge function
  const sendNotification = async (
    type: 'streak' | 'reward' | 'level_reminder' | 'custom',
    options?: { title?: string; body?: string; userId?: string }
  ) => {
    try {
      console.log('Sending notification via edge function:', { type, options });

      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          type,
          userId: options?.userId || user?.id,
          title: options?.title,
          body: options?.body,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      console.log('Notification sent successfully:', data);
      return data;
    } catch (err) {
      console.error('Error sending notification:', err);
      throw err;
    }
  };

  // Schedule a local notification (for when app is in foreground)
  const scheduleLocalNotification = async (title: string, body: string, delayMs: number = 0) => {
    if (!state.isSupported) return;

    try {
      // For immediate notifications, just show toast
      if (delayMs === 0) {
        toast(title, { description: body });
        return;
      }

      // For delayed, use setTimeout (basic approach for now)
      setTimeout(() => {
        toast(title, { description: body });
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      }, delayMs);
    } catch (error) {
      console.error('Error scheduling local notification:', error);
    }
  };

  return {
    ...state,
    requestPermission,
    clearNotifications,
    sendNotification,
    scheduleLocalNotification,
  };
};

