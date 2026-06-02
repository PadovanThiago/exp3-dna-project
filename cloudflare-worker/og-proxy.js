/**
 * Cloudflare Worker — OG Proxy for social-media crawlers
 *
 * Deploy this worker on Cloudflare with a route pattern covering the
 * whole site so it can intercept any path:
 *
 *   exp3.ai/*
 *   www.exp3.ai/*
 *
 * Behavior:
 *   - Real users (any non-crawler UA) pass straight through to the SPA.
 *   - Social-media crawlers (LinkedIn, WhatsApp, Slack, Facebook, etc.)
 *     are silently proxied to the unified Supabase Edge Function
 *     `og`, which returns crawler-friendly HTML with the correct
 *     per-route Open Graph + Twitter tags.
 *
 * Result: links shared on WhatsApp / LinkedIn / Slack show the right
 * title, description and image for every public page (home, about,
 * services, contact, blog index, blog posts in PT and EN, decks).
 */

const EDGE_FUNCTION_URL =
  "https://hnveejswefpgbeiwmfys.supabase.co/functions/v1/og";

const CRAWLER_PATTERNS = [
  "facebookexternalhit",
  "facebot",
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
  "redditbot",
  "applebot",
  "skypeuripreview",
  "outbrain",
  "w3c_validator",
];

// Paths we never want to intercept (internal app, admin, assets).
const SKIP_PREFIXES = [
  "/assets/",
  "/static/",
  "/admin",
  "/neodash",
  "/demo/",
  "/api/",
  "/functions/",
  "/favicon",
  "/robots.txt",
  "/sitemap",
  "/llms.txt",
];

function isCrawler(ua) {
  if (!ua) return false;
  const lower = ua.toLowerCase();
  return CRAWLER_PATTERNS.some((p) => lower.includes(p));
}

function shouldSkip(pathname) {
  if (/\.[a-z0-9]{2,5}$/i.test(pathname)) return true; // static assets
  return SKIP_PREFIXES.some((p) => pathname.startsWith(p));
}

export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";
    const url = new URL(request.url);

    if (!isCrawler(ua) || shouldSkip(url.pathname)) {
      return fetch(request);
    }

    const edgeUrl = new URL(EDGE_FUNCTION_URL);
    edgeUrl.searchParams.set("path", url.pathname);

    const response = await fetch(edgeUrl.toString(), {
      headers: {
        "User-Agent": ua,
        Accept: "text/html",
      },
    });

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
