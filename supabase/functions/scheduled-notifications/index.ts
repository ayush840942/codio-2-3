import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FCM_URL = 'https://fcm.googleapis.com/fcm/send';

interface UserStreak {
  user_id: string;
  current_streak: number;
  last_activity_date: string;
}

// Notification templates
const streakTemplates = {
  atRisk: {
    title: '🔥 Your Streak is at Risk!',
    body: "Don't lose your {streak}-day streak! Complete a puzzle now.",
  },
  reminder: {
    title: '📚 Daily Learning Reminder',
    body: 'Keep the momentum going! Your daily puzzle awaits.',
  },
  reward: {
    title: '🎁 Daily Reward Available!',
    body: 'Claim your daily reward and bonus hints!',
  },
  milestone: {
    title: '🏆 Streak Milestone Approaching!',
    body: "You're {away} days away from a {milestone}-day streak reward!",
  },
};

async function sendFCMNotification(token: string, title: string, body: string, data: Record<string, string> = {}) {
  const fcmServerKey = Deno.env.get('FCM_SERVER_KEY');
  if (!fcmServerKey) {
    console.error('FCM_SERVER_KEY not configured');
    return { success: false, error: 'FCM not configured' };
  }

  try {
    const response = await fetch(FCM_URL, {
      method: 'POST',
      headers: {
        'Authorization': `key=${fcmServerKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title,
          body,
          icon: '/favicon.ico',
          click_action: 'OPEN_APP',
        },
        data: {
          ...data,
          timestamp: new Date().toISOString(),
        },
      }),
    });

    const result = await response.json();
    return { success: result.success === 1, result };
  } catch (error) {
    console.error('FCM send error:', error);
    return { success: false, error: String(error) };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Parse request to determine notification type
    let notificationType = 'all';
    try {
      const body = await req.json();
      notificationType = body.type || 'all';
    } catch {
      // Default to 'all' if no body
    }

    console.log(`Running scheduled notifications: ${notificationType}`);

    // Get all users with push tokens
    const { data: tokens, error: tokensError } = await supabase
      .from('push_tokens')
      .select('user_id, token, platform');

    if (tokensError) {
      console.error('Error fetching tokens:', tokensError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch tokens' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!tokens || tokens.length === 0) {
      console.log('No push tokens found');
      return new Response(
        JSON.stringify({ message: 'No tokens to notify', sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userTokenMap = new Map<string, string[]>();
    tokens.forEach(t => {
      const existing = userTokenMap.get(t.user_id) || [];
      existing.push(t.token);
      userTokenMap.set(t.user_id, existing);
    });

    const userIds = Array.from(userTokenMap.keys());
    console.log(`Found ${userIds.length} users with push tokens`);

    // Get user streak data
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, current_streak, last_activity_date, hint_points')
      .in('id', userIds);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    }

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    let sentCount = 0;
    let failedCount = 0;
    const notifications: Array<{ userId: string; type: string; success: boolean }> = [];

    for (const profile of profiles || []) {
      const userTokens = userTokenMap.get(profile.id) || [];
      if (userTokens.length === 0) continue;

      const lastActivity = profile.last_activity_date?.split('T')[0];
      const streak = profile.current_streak || 0;

      let notificationToSend: { title: string; body: string; type: string } | null = null;

      // Determine which notification to send
      if (notificationType === 'all' || notificationType === 'streak') {
        // User hasn't played today - streak at risk
        if (lastActivity === yesterday && streak > 0) {
          notificationToSend = {
            title: streakTemplates.atRisk.title,
            body: streakTemplates.atRisk.body.replace('{streak}', String(streak)),
            type: 'streak_risk',
          };
        }
        // Check for milestone approaching (7, 14, 30, 60, 100 days)
        else if (lastActivity === today) {
          const milestones = [7, 14, 30, 60, 100];
          for (const milestone of milestones) {
            const away = milestone - streak;
            if (away > 0 && away <= 3) {
              notificationToSend = {
                title: streakTemplates.milestone.title,
                body: streakTemplates.milestone.body
                  .replace('{away}', String(away))
                  .replace('{milestone}', String(milestone)),
                type: 'milestone',
              };
              break;
            }
          }
        }
      }

      // Daily reward reminder (morning notification)
      if (!notificationToSend && (notificationType === 'all' || notificationType === 'reward')) {
        const hour = now.getUTCHours();
        // Send reward reminders in the morning (8-10 AM UTC)
        if (hour >= 8 && hour <= 10) {
          notificationToSend = {
            title: streakTemplates.reward.title,
            body: streakTemplates.reward.body,
            type: 'daily_reward',
          };
        }
      }

      // General reminder for inactive users
      if (!notificationToSend && (notificationType === 'all' || notificationType === 'reminder')) {
        if (!lastActivity || lastActivity < yesterday) {
          notificationToSend = {
            title: streakTemplates.reminder.title,
            body: streakTemplates.reminder.body,
            type: 'reminder',
          };
        }
      }

      if (notificationToSend) {
        // Send to all user's devices
        for (const token of userTokens) {
          const result = await sendFCMNotification(
            token,
            notificationToSend.title,
            notificationToSend.body,
            { notification_type: notificationToSend.type, route: '/level-map' }
          );

          if (result.success) {
            sentCount++;
          } else {
            failedCount++;
            
            // Remove invalid tokens
            if (result.result?.results?.[0]?.error === 'NotRegistered') {
              await supabase.from('push_tokens').delete().eq('token', token);
              console.log('Removed invalid token');
            }
          }

          notifications.push({
            userId: profile.id,
            type: notificationToSend.type,
            success: result.success,
          });
        }

        // Log notification
        await supabase.from('notification_logs').insert({
          user_id: profile.id,
          title: notificationToSend.title,
          body: notificationToSend.body,
          type: notificationToSend.type,
          success: true,
        });
      }
    }

    console.log(`Scheduled notifications complete: ${sentCount} sent, ${failedCount} failed`);

    return new Response(
      JSON.stringify({
        message: 'Scheduled notifications processed',
        sent: sentCount,
        failed: failedCount,
        details: notifications,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Scheduled notification error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
