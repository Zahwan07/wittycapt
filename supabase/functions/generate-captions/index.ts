import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();

    if (!image) {
      throw new Error("No image provided");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    console.log("Analyzing product image with AI...");

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
            content: `Kamu adalah AI copywriter expert untuk UMKM Indonesia yang handal bikin caption Instagram/TikTok yang engaging dan natural.

TUGAS:
1. Analisis foto produk dengan detail (jenis produk, warna, mood, style, branding style)
2. Generate 10 caption berbeda dengan 10 tone berbeda
3. Setiap caption harus catchy, pendek, natural bahasa Indonesia (tidak formal)
4. Sesuaikan CTA dengan tone (DM sekarang, Order via WhatsApp, Cek link di bio, Tersedia COD)

10 TONE YANG HARUS ADA (urutan ini):
1. Hard-selling (langsung jualan, tegas, persuasif)
2. Soft-selling (halus, subtle, tidak pushy)
3. Storytelling (cerita pendek menarik)
4. Gen Z / Playful (fun, casual, bahasa gaul)
5. Professional (formal tapi tetap friendly)
6. Luxury / Premium (mewah, eksklusif, high-end)
7. Minimalist (simple, clean, to the point)
8. Humor (lucu, jenaka, bikin senyum)
9. Lifestyle (aspirational, relate ke gaya hidup)
10. E-commerce Ready (lengkap dengan hashtag dan benefit)

OUTPUT FORMAT JSON:
{
  "captions": [
    {"tone": "Hard-selling", "text": "caption text"},
    {"tone": "Soft-selling", "text": "caption text"},
    ...dst
  ]
}

RULES:
- Setiap caption HARUS beda tone dan pendekatan
- Maksimal 3-4 kalimat per caption
- Hindari repetisi kata/kalimat antar caption
- Gunakan emoji dengan bijak (jangan berlebihan)
- Hanya caption e-commerce ready yang pakai hashtag
- Bahasa Indonesia natural, bukan formal/kaku`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this product image and create 10 different captions for Indonesian UMKM social media. Make sure each caption has a clearly different tone and approach.",
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from AI response
    let parsedContent;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[1]);
      } else {
        parsedContent = JSON.parse(content);
      }
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", content);
      throw new Error("Invalid JSON response from AI");
    }

    console.log("Successfully generated captions");

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-captions:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
