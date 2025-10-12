import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dressType, fabricType, neckDesign, sleeveDesign, bottomStyle, additionalNotes } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Construct detailed prompt for design generation
    const prompt = `Generate a beautiful Pakistani/Indian stitched dress design with the following specifications:
- Dress Type: ${dressType}
- Fabric: ${fabricType}
- Neck Design: ${neckDesign}
- Sleeve Design: ${sleeveDesign}
- Bottom Style: ${bottomStyle}
${additionalNotes ? `- Additional Details: ${additionalNotes}` : ''}

Create a professional fashion illustration showing front view with intricate embroidery details, elegant color combinations, and traditional craftsmanship. Ultra high resolution, fashion photography style.`;

    console.log('Generating design with prompt:', prompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      })
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

    const data = await response.json();
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImageUrl) {
      throw new Error('No image generated');
    }

    // Generate suggestions based on the design
    const suggestionsResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: "You are a professional fashion designer specializing in Pakistani and Indian stitched dresses. Provide concise styling suggestions."
          },
          {
            role: "user",
            content: `For a ${dressType} made of ${fabricType} with ${neckDesign} neck and ${sleeveDesign} sleeves, suggest: 1) Complementary colors, 2) Embellishment ideas, 3) Styling tips. Keep it brief and practical.`
          }
        ]
      })
    });

    const suggestionsData = await suggestionsResponse.json();
    const suggestions = suggestionsData.choices?.[0]?.message?.content || '';

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('design_requests').insert({
      prompt: prompt,
      dress_type: dressType,
      fabric_type: fabricType,
      neck_design: neckDesign,
      sleeve_design: sleeveDesign,
      bottom_style: bottomStyle,
      additional_notes: additionalNotes,
      generated_image_url: generatedImageUrl,
      suggestions: suggestions
    });

    console.log('Design generated successfully');

    return new Response(
      JSON.stringify({ 
        image: generatedImageUrl,
        suggestions: suggestions
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-design function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});