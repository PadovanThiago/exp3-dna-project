import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CRAWLER_PATTERNS = [
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "slackbot",
  "telegrambot",
  "discordbot",
  "googlebot",
  "bingbot",
  "yandexbot",
  "embedly",
  "quora link preview",
  "outbrain",
  "pinterest",
  "vkshare",
  "w3c_validator",
];

const SITE_URL = "https://exp3.ai";
const DEFAULT_OG_IMAGE = "https://exp3.ai/exp3-og-banner.jpg";

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_PATTERNS.some((pattern) => ua.includes(pattern));
}

function buildHtml(post: Record<string, unknown> | null): string {
  if (!post) {
    return buildFallbackHtml();
  }

  const title = (post.meta_title || post.title) as string;
  const description =
    (post.meta_description || post.excerpt || "") as string;
  const image =
    (post.og_image_url || post.cover_image_url || DEFAULT_OG_IMAGE) as string;
  const lang = post.language as string;
  const langPrefix = lang === "en" ? "/en" : "";
  const url = `${SITE_URL}${langPrefix}/blog/${post.slug}`;
  const publishedAt = (post.published_at || post.created_at) as string;
  const authorName = (post.author_name || "EXP³") as string;

  return `<!DOCTYPE html>
<html lang="${lang === "pt" ? "pt-BR" : "en"}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(title)} | EXP³</title>
  <meta name="description" content="${escapeAttr(description)}"/>
  <meta name="author" content="${escapeAttr(authorName)}"/>

  <meta property="og:type" content="article"/>
  <meta property="og:title" content="${escapeAttr(title)}"/>
  <meta property="og:description" content="${escapeAttr(description)}"/>
  <meta property="og:image" content="${escapeAttr(image)}"/>
  <meta property="og:url" content="${escapeAttr(url)}"/>
  <meta property="og:site_name" content="EXP³"/>
  <meta property="article:published_time" content="${escapeAttr(publishedAt)}"/>
  <meta property="article:author" content="${escapeAttr(authorName)}"/>

  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${escapeAttr(title)}"/>
  <meta name="twitter:description" content="${escapeAttr(description)}"/>
  <meta name="twitter:image" content="${escapeAttr(image)}"/>

  <link rel="canonical" href="${escapeAttr(url)}"/>
  <meta http-equiv="refresh" content="0;url=${escapeAttr(url)}"/>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
</body>
</html>`;
}

function buildFallbackHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>EXP³ | Strategic AI Consulting</title>
  <meta name="description" content="Strategic AI consulting — cognitive symbiosis between human creativity and machine power."/>
  <meta property="og:title" content="EXP³ | Strategic AI Consulting"/>
  <meta property="og:description" content="Strategic AI consulting — cognitive symbiosis between human creativity and machine power."/>
  <meta property="og:image" content="${DEFAULT_OG_IMAGE}"/>
  <meta property="og:url" content="${SITE_URL}/blog"/>
  <meta property="og:type" content="website"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta http-equiv="refresh" content="0;url=${SITE_URL}/blog"/>
</head>
<body><h1>EXP³ Blog</h1></body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  // Accept slug via query param: ?slug=my-post-slug
  // Or via path: /og-blog/my-post-slug
  const pathParts = url.pathname.split("/").filter(Boolean);
  const slug =
    url.searchParams.get("slug") || pathParts[pathParts.length - 1] || "";

  if (!slug || slug === "og-blog") {
    return new Response(buildFallbackHtml(), {
      headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Check user-agent
  const userAgent = req.headers.get("user-agent") || "";
  if (!isCrawler(userAgent)) {
    // Redirect normal users to the SPA
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: `${SITE_URL}/blog/${slug}` },
    });
  }

  // Fetch post from database
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  const html = buildHtml(post);

  return new Response(html, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
