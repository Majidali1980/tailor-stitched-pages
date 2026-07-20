import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";

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
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase not configured');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Define tools for the AI assistant
    const tools = [
      {
        type: "function",
        function: {
          name: "get_gallery_designs",
          description: "Fetch design images from the gallery. Always use this at the start of conversation or when users ask about designs.",
          parameters: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Optional category filter"
              },
              limit: {
                type: "number",
                description: "Number of designs to return (default 8)",
                default: 8
              }
            }
          }
        }
      },
      {
        type: "function",
        function: {
          name: "get_stitching_prices",
          description: "Get stitching service prices. Use this when discussing pricing or services.",
          parameters: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Optional category filter"
              }
            }
          }
        }
      },
      {
        type: "function",
        function: {
          name: "get_discount_offers",
          description: "Fetch active discount offers and promotions. Use when users ask about discounts or to proactively suggest savings.",
          parameters: {
            type: "object",
            properties: {}
          }
        }
      },
      {
        type: "function",
        function: {
          name: "create_booking",
          description: "Create an appointment booking. Only call this after collecting ALL required information. Appointment date/time are optional.",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Customer's full name"
              },
              phone: {
                type: "string",
                description: "Customer's phone number"
              },
              email: {
                type: "string",
                description: "Customer's email (optional)"
              },
              appointment_date: {
                type: "string",
                description: "Date in YYYY-MM-DD format (optional)"
              },
              appointment_time: {
                type: "string",
                description: "Time in HH:MM format 24-hour (optional)"
              },
              service_type: {
                type: "string",
                description: "Exact service name from stitching services"
              },
              quantity: {
                type: "number",
                description: "Number of items",
                default: 1
              },
              price: {
                type: "number",
                description: "Price per item in PKR"
              },
              special_requirements: {
                type: "string",
                description: "Special notes or requirements"
              }
            },
            required: ["name", "phone", "service_type"]
          }
        }
      }
    ];

    const systemPrompt = `You are MA Tailor's AI Assistant - a warm, expert virtual tailor helping customers with custom stitching services.

🎯 YOUR MISSION:
Help customers explore designs, understand services, and book appointments seamlessly.

📋 CONVERSATION FLOW:
1. Warmly greet the customer and ask what outfit they're looking for.
2. Call get_gallery_designs early and showcase 2-3 designs enthusiastically.
3. Mention active discount offers via get_discount_offers.
4. When ready, collect booking details ONE question at a time (name, phone, service, quantity, optional date/time, special requirements) and confirm before calling create_booking.

💰 PRICING POLICY (STRICT):
- NEVER quote, estimate, mention, or hint at any price, rate, cost, or figure in PKR/USD/GBP or any currency.
- Do NOT call get_stitching_prices. Do NOT read prices from any tool result.
- If the customer asks about price, cost, rate, charges, discount amounts, or "how much":
  Respond warmly: "For the most accurate pricing tailored to your design, please contact us on WhatsApp at +92 307 0125273 and our team will share a detailed quote right away." 
  Provide the WhatsApp link: https://wa.me/923070125273
- When creating a booking, pass price: 0 (the team will confirm pricing via WhatsApp).

💡 STYLE:
- Conversational, warm, use emojis naturally ✨💖🎨
- Appointment scheduling is OPTIONAL
- Always confirm booking details before submitting

❌ NEVER quote prices in chat. Always redirect pricing questions to WhatsApp +92 307 0125273.`;

    // Call Lovable AI with streaming
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        tools,
        tool_choice: "auto",
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    // Create a TransformStream to handle tool calls
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      try {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let toolCalls: any[] = [];
        let currentToolCall: any = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim() || line.startsWith(":")) continue;
            if (!line.startsWith("data: ")) continue;

            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta;

              // Handle tool calls
              if (delta?.tool_calls) {
                for (const toolCall of delta.tool_calls) {
                  if (toolCall.index !== undefined) {
                    if (!toolCalls[toolCall.index]) {
                      toolCalls[toolCall.index] = {
                        id: toolCall.id || "",
                        type: "function",
                        function: { name: "", arguments: "" }
                      };
                    }
                    currentToolCall = toolCalls[toolCall.index];
                    
                    if (toolCall.function?.name) {
                      currentToolCall.function.name = toolCall.function.name;
                    }
                    if (toolCall.function?.arguments) {
                      currentToolCall.function.arguments += toolCall.function.arguments;
                    }
                  }
                }
              }

              // Check if we have complete tool calls to execute
              const finishReason = parsed.choices?.[0]?.finish_reason;
              if (finishReason === "tool_calls" && toolCalls.length > 0) {
                // Execute tool calls
                const toolResults = await Promise.all(
                  toolCalls.map(async (toolCall) => {
                    const functionName = toolCall.function.name;
                    const functionArgs = JSON.parse(toolCall.function.arguments);

                    console.log(`Executing tool: ${functionName}`, functionArgs);

                    let result: any;

                    if (functionName === "get_gallery_designs") {
                      const { category, limit = 6 } = functionArgs;
                      let query = supabase
                        .from('gallery')
                        .select('*')
                        .eq('is_active', true)
                        .order('display_order', { ascending: true })
                        .limit(limit);

                      if (category) {
                        query = query.eq('category', category);
                      }

                      const { data, error } = await query;
                      result = error ? { error: error.message } : { designs: data };
                    } 
                    else if (functionName === "get_stitching_prices") {
                      const { category } = functionArgs;
                      let query = supabase
                        .from('stitching_services')
                        .select('*')
                        .order('category', { ascending: true });

                      if (category) {
                        query = query.eq('category', category);
                      }

                      const { data, error } = await query;
                      result = error ? { error: error.message } : { 
                        services: data,
                        currency: "PKR",
                        note: "All prices in Pakistani Rupees"
                      };
                    }
                    else if (functionName === "get_discount_offers") {
                      const { data, error } = await supabase
                        .from('discount_offers')
                        .select('*')
                        .eq('is_active', true)
                        .order('display_order', { ascending: true });
                      
                      result = error ? { error: error.message } : { 
                        offers: data,
                        message: "Active discount offers available"
                      };
                    }
                    else if (functionName === "create_booking") {
                      const { data: dcCharges } = await supabase
                        .from('service_charges')
                        .select('*')
                        .eq('is_active', true)
                        .single();

                      const dc_charges = dcCharges?.amount || 0;
                      const amount_summary = (functionArgs.price * functionArgs.quantity) + dc_charges;

                      const { data, error } = await supabase
                        .from('appointments')
                        .insert({
                          name: functionArgs.name,
                          phone: functionArgs.phone,
                          email: functionArgs.email || null,
                          appointment_date: functionArgs.appointment_date || null,
                          appointment_time: functionArgs.appointment_time || null,
                          service_type: functionArgs.service_type,
                          quantity: functionArgs.quantity,
                          price: functionArgs.price,
                          dc_charges,
                          amount_summary,
                          special_requirements: functionArgs.special_requirements || null,
                          status: 'pending'
                        })
                        .select()
                        .single();

                      result = error ? { error: error.message } : { booking: data };
                    }

                    return {
                      tool_call_id: toolCall.id,
                      role: "tool",
                      name: functionName,
                      content: JSON.stringify(result)
                    };
                  })
                );

                // Make a new API call with tool results
                const followUpResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${LOVABLE_API_KEY}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    model: "google/gemini-2.5-flash",
                    messages: [
                      { role: "system", content: systemPrompt },
                      ...messages,
                      { role: "assistant", tool_calls: toolCalls },
                      ...toolResults
                    ],
                    stream: true,
                  }),
                });

                // Stream the follow-up response
                const followUpReader = followUpResponse.body!.getReader();
                while (true) {
                  const { done: followUpDone, value: followUpValue } = await followUpReader.read();
                  if (followUpDone) break;
                  await writer.write(followUpValue);
                }

                // Reset tool calls
                toolCalls = [];
                continue;
              }

              // Stream regular content
              if (delta?.content) {
                await writer.write(encoder.encode(line + "\n"));
              }
            } catch (e) {
              console.error("Error parsing SSE:", e);
            }
          }
        }

        await writer.close();
      } catch (error) {
        console.error("Streaming error:", error);
        await writer.abort(error);
      }
    })();

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
