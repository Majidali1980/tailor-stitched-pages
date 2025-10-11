import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { popupType, context } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Fetch relevant data based on popup type
    let contextData = "";
    
    if (popupType === 'welcome' || popupType === 'design-suggestion') {
      const { data: designs } = await supabase
        .from('latest_designs')
        .select('title, description')
        .eq('is_active', true)
        .limit(3);
      contextData += `\nTrending Designs: ${JSON.stringify(designs)}`;
    }
    
    if (popupType === 'discount-offer' || popupType === 'occasion') {
      const { data: offers } = await supabase
        .from('discount_offers')
        .select('title, description, discount_percentage, discount_amount')
        .eq('is_active', true)
        .limit(2);
      contextData += `\nActive Offers: ${JSON.stringify(offers)}`;
    }
    
    if (popupType === 'cart-value') {
      const { data: services } = await supabase
        .from('stitching_services')
        .select('category, service_name, price')
        .limit(5);
      contextData += `\nStitching Services: ${JSON.stringify(services)}`;
    }

    const systemPrompts = {
      'welcome': `You are M.A Tailor's welcoming assistant. Create a warm, inviting welcome message for first-time visitors. Mention trending designs and encourage them to explore. Keep it friendly and elegant. Maximum 2 sentences.`,
      
      'design-suggestion': `You are M.A Tailor's style advisor. Suggest popular designs based on current trends. Be enthusiastic and helpful. Maximum 2 sentences.`,
      
      'discount-offer': `You are M.A Tailor's promotional assistant. Create urgency around time-sensitive offers. Be persuasive but elegant. Maximum 2 sentences.`,
      
      'measurement-reminder': `You are M.A Tailor's booking assistant. Gently remind users to complete their booking with measurements. Be helpful and encouraging. Maximum 2 sentences.`,
      
      'feedback': `You are M.A Tailor's customer care assistant. Politely ask returning customers for feedback and offer a small incentive. Be appreciative and warm. Maximum 2 sentences.`,
      
      'occasion': `You are M.A Tailor's seasonal promotions expert. Promote seasonal deals with cultural relevance (Eid, weddings, winter). Be festive and exciting. Maximum 2 sentences.`,
      
      'callback': `You are M.A Tailor's lead conversion specialist. Encourage idle visitors to request a callback. Be friendly and non-pushy. Maximum 2 sentences.`,
      
      'cart-value': `You are M.A Tailor's upselling assistant. Motivate users to add more items for better value or free perks. Be persuasive yet classy. Maximum 2 sentences.`,
      
      'exit-intent': `You are M.A Tailor's retention specialist. Create an exclusive, can't-miss offer for users about to leave. Be compelling and urgent. Maximum 2 sentences.`
    };

    const userPrompt = `
      Context: ${context || 'General website visitor'}
      ${contextData}
      
      Generate a compelling popup message for ${popupType}. Include:
      1. A catchy heading (max 6 words)
      2. Main message (max 2 sentences)
      3. Primary CTA text (max 3 words)
      4. Optional secondary CTA text (max 3 words)
      
      Respond in JSON format:
      {
        "heading": "...",
        "message": "...",
        "primaryCTA": "...",
        "secondaryCTA": "..."
      }
    `;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompts[popupType as keyof typeof systemPrompts] || systemPrompts['welcome'] },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.status, await response.text());
      throw new Error('Failed to generate popup content');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON response
    let popupContent;
    try {
      popupContent = JSON.parse(content);
    } catch (e) {
      // Fallback if AI doesn't return valid JSON
      popupContent = {
        heading: "Welcome to M.A Tailor",
        message: content.substring(0, 150),
        primaryCTA: "Explore Now",
        secondaryCTA: "Book Appointment"
      };
    }

    return new Response(JSON.stringify(popupContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-popup function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
