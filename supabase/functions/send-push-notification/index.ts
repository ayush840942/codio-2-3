import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FCM_URL = 'https://fcm.googleapis.com/fcm/send';

interface NotificationPayload {
  type: 'streak' | 'reward' | 'level_reminder' | 'custom';
  userId?: string;
  title?: string;
  body?: string;
  data?: Record<string, string>;
}

// Predefined notification templates
const notificationTemplates = {
  streak: {
    title: '🔥 Keep Your Streak Alive!',
    body: "Don't break your learning streak! Complete a puzzle today.",
  },
  reward: {
    title: '🎁 Daily Reward Ready!',
    body: 'Your daily reward is waiting. Claim it now!',
  },
  level_reminder: {
    title: '📚 Continue Learning',
    body: "You're making great progress! Ready for the next challenge?",
  },
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const fcmServerKey = Deno.env.get('FCM_SERVER_KEY');
    if (!fcmServerKey) {
      console.error('FCM_SERVER_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'FCM not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const payload: NotificationPayload = await req.json();
    console.log('Received notification request:', payload);

    const { type, userId, title, body, data } = payload;

    // Get notification content
    let notificationTitle = title;
    let notificationBody = body;

    if (!title || !body) {
      const template = notificationTemplates[type as keyof typeof notificationTemplates];
      if (template) {
        notificationTitle = notificationTitle || template.title;
        notificationBody = notificationBody || template.body;
      } else {
        return new Response(
          JSON.stringify({ error: 'Invalid notification type or missing title/body' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Get push tokens
    let query = supabase.from('push_tokens').select('token, user_id, platform');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: tokens, error: tokensError } = await query;

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
        JSON.stringify({ message: 'No tokens found', sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Sending notification to ${tokens.length} device(s)`);

    // Send notifications
    const results = await Promise.allSettled(
      tokens.map(async (tokenRecord) => {
        const fcmPayload = {
          to: tokenRecord.token,
          notification: {
            title: notificationTitle,
            body: notificationBody,
            icon: '/favicon.ico',
            click_action: 'OPEN_APP',
          },
          data: {
            type,
            ...data,
          },
        };

        const response = await fetch(FCM_URL, {
          method: 'POST',
          headers: {
            'Authorization': `key=${fcmServerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fcmPayload),
        });

        const result = await response.json();
        console.log(`FCM response for user ${tokenRecord.user_id}:`, result);

        // Log the notification
        await supabase.from('notification_logs').insert({
          user_id: tokenRecord.user_id,
          title: notificationTitle,
          body: notificationBody,
          type,
          success: result.success === 1,
        });

        // Remove invalid tokens
        if (result.failure === 1 && result.results?.[0]?.error === 'NotRegistered') {
          console.log('Removing invalid token:', tokenRecord.token);
          await supabase
            .from('push_tokens')
            .delete()
            .eq('token', tokenRecord.token);
        }

        return result;
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Notifications sent: ${successful} successful, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        message: 'Notifications sent',
        sent: successful,
        failed,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
