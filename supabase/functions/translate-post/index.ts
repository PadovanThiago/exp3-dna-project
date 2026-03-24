import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { postId, targetLanguage } = await req.json();

    if (!postId || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: "postId and targetLanguage are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the source post
    const { data: sourcePost, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (fetchError || !sourcePost) {
      return new Response(
        JSON.stringify({ error: "Post not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if translation already exists (exclude source post)
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("translation_group_id", sourcePost.translation_group_id)
      .eq("language", targetLanguage)
      .neq("id", postId)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Translation already exists", existingId: existing.id }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sourceLang = sourcePost.language === "pt" ? "Portuguese" : "English";
    const targetLang = targetLanguage === "pt" ? "Portuguese" : "English";

    // Translate using Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate from ${sourceLang} to ${targetLang}. Preserve HTML tags exactly. Maintain the same tone, technical terms, and formatting. Return ONLY a JSON object with keys: title, excerpt, content, slug, meta_title, meta_description. No markdown wrapping.`,
          },
          {
            role: "user",
            content: JSON.stringify({
              title: sourcePost.title,
              excerpt: sourcePost.excerpt || "",
              content: sourcePost.content,
              slug: sourcePost.slug,
              meta_title: sourcePost.meta_title || "",
              meta_description: sourcePost.meta_description || "",
            }),
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI Gateway error:", errText);
      return new Response(
        JSON.stringify({ error: "Translation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    let translatedText = aiData.choices?.[0]?.message?.content || "";

    // Clean markdown wrapping if present
    translatedText = translatedText.replace(/^```json\s*\n?/, "").replace(/\n?```\s*$/, "");

    let translated;
    try {
      translated = JSON.parse(translatedText);
    } catch {
      console.error("Failed to parse AI response:", translatedText);
      return new Response(
        JSON.stringify({ error: "Failed to parse translation" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert translated post
    const { data: newPost, error: insertError } = await supabase
      .from("posts")
      .insert({
        title: translated.title,
        slug: translated.slug || sourcePost.slug,
        excerpt: translated.excerpt || null,
        content: translated.content || sourcePost.content,
        category: sourcePost.category,
        status: sourcePost.status,
        cover_image_url: sourcePost.cover_image_url,
        tags: sourcePost.tags,
        author_name: sourcePost.author_name,
        reading_time_minutes: sourcePost.reading_time_minutes,
        meta_title: translated.meta_title || null,
        meta_description: translated.meta_description || null,
        og_image_url: sourcePost.og_image_url,
        language: targetLanguage,
        translation_group_id: sourcePost.translation_group_id,
        published_at: sourcePost.published_at,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: insertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, post: newPost }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
