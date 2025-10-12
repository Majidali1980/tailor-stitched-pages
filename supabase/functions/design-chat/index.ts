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
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional fashion design consultant for MA Tailor, specializing in Pakistani and Indian stitched clothing. Your role is to:

1. Help customers design their perfect dress by discussing:
   - Dress type (Shalwar Kameez, Maxi, Frock, Saree, etc.)
   - Fabric choices (Silk, Cotton, Chiffon, Lawn, etc.)
   - Neck designs (Round, V-neck, Boat neck, etc.)
   - Sleeve styles (Full, Half, 3/4, Cap sleeves, etc.)
   - Bottom styles (Trouser, Sharara, Gharara, etc.)
   - Embellishment and embroidery preferences
   
2. Suggest color combinations based on:
   - Season
   - Occasion (wedding, party, casual, formal)
   - Skin tone
   - Current fashion trends

3. Recommend designs that suit:
   - Body type
   - Personal style
   - Budget considerations
   
4. Provide practical advice on:
   - Fabric care
   - Style maintenance
   - Matching accessories
   
Be conversational, friendly, and culturally aware. Ask clarifying questions to understand customer needs better.`
          },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error('Error in design-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});