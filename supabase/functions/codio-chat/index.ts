import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build conversation with system prompt
    const messages = [
      {
        role: 'system',
        content: `You are Codio, a cute and friendly robot AI assistant for a coding learning app. 
Your personality:
- Super friendly, enthusiastic, and encouraging
- Use emojis occasionally (🤖, 💻, ✨, 🎯, 🚀)
- Keep responses concise and easy to understand
- Break down complex concepts into simple terms
- Always be positive and motivating
- Use analogies and real-world examples
- Add fun coding tips and tricks

Your expertise:
- HTML, CSS, JavaScript, React, Python, and more
- Debugging help and error explanations
- Best practices and coding patterns
- Learning strategies and study tips

Style:
- Keep answers under 150 words when possible
- Use bullet points for lists
- Add code examples in markdown when helpful
- Be patient with beginners
- Celebrate user progress and achievements`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI Gateway request failed');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in codio-chat:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        response: "Oops! 🔧 I'm having a small glitch. Try asking me again!"
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
