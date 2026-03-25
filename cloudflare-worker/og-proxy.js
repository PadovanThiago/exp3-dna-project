/**
 * Cloudflare Worker — OG Proxy for Blog Crawlers
 *
 * Deploy this worker on Cloudflare with a route pattern:
 *   exp3.ai/blog/*
 *   exp3.ai/en/blog/*
 *
 * It intercepts crawler requests and proxies them to the
 * Supabase edge function that returns static HTML with OG tags.
 * Normal users pass through to the SPA unchanged.
 */

const EDGE_FUNCTION_BASE =
  "https://hnveejswefpgbeiwmfys.supabase.co/functions/v1/og-blog";

const CRAWLER_PATTERNS = [
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "slackbot",
  "telegrambot",
  "discordbot",
  "embedly",
  "quora link preview",
  "pinterest",
  "vkshare",
];

function isCrawler(ua) {
  if (!ua) return false;
  const lower = ua.toLowerCase();
  return CRAWLER_PATTERNS.some((p) => lower.includes(p));
}

function extractSlug(pathname) {
  // Matches /blog/:slug or /en/blog/:slug
  const match = pathname.match(/^(?:\/en)?\/blog\/([^/?#]+)/);
  return match ? match[1] : null;
}

export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";
    const url = new URL(request.url);
    const slug = extractSlug(url.pathname);

    // Only proxy if it's a crawler AND we have a slug
    if (!slug || !isCrawler(ua)) {
      return fetch(request);
    }

    // Build edge function URL preserving any query params
    const edgeUrl = new URL(EDGE_FUNCTION_BASE);
    edgeUrl.searchParams.set("slug", slug);
    for (const [key, value] of url.searchParams) {
      if (key !== "slug") edgeUrl.searchParams.set(key, value);
    }

    // Proxy (internal rewrite, not redirect)
    const response = await fetch(edgeUrl.toString(), {
      headers: {
        "User-Agent": ua,
        Accept: "text/html",
      },
    });

    // Return with original status and headers, add cache
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "X-OG-Proxy": "cloudflare-worker",
      },
    });
  },
};
