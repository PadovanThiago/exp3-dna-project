/**
 * Unified OG edge function — returns crawler-friendly HTML with
 * per-route Open Graph metadata for ANY public path on exp3.ai.
 *
 * Called by the Cloudflare Worker (cloudflare-worker/og-proxy.js)
 * whenever a social-media crawler hits the site. Humans never reach
 * this function — they get the SPA directly.
 *
 * Query params:
 *   ?path=/en/blog/my-post   (full original path; required)
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://exp3.ai";
const DEFAULT_OG_IMAGE = "https://exp3.ai/exp3-og-banner.jpg";
const DECK_OG_IMAGE = "https://exp3.ai/deck-og.jpg";

type Lang = "pt" | "en" | "fr";

interface RouteMeta {
  lang: Lang;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  altLinks?: Array<{ hreflang: string; href: string }>;
}

// --- Static route table -------------------------------------------------
const STATIC_ROUTES: Record<string, RouteMeta> = {
  "/": {
    lang: "pt",
    title: "EXP³ | Inteligência estratégica que opera",
    description:
      "Transformamos o potencial da IA em capacidade operacional através da simbiose cognitiva: onde criatividade humana e poder das máquinas se elevam mutuamente.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/` },
      { hreflang: "en", href: `${SITE_URL}/en` },
    ],
  },
  "/about": {
    lang: "pt",
    title: "Quem somos | EXP³",
    description:
      "Think tank estratégico que desenha e opera o futuro dos negócios com IA. Conheça a metodologia EXP³ — Explore, Exploit, Explain.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/about` },
      { hreflang: "en", href: `${SITE_URL}/en/about` },
    ],
  },
  "/services": {
    lang: "pt",
    title: "Serviços | EXP³",
    description:
      "Consultoria estratégica de IA: validação de valor, escala e eficiência, governança e confiança. Engenharia e resultados para empresas.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/services` },
      { hreflang: "en", href: `${SITE_URL}/en/services` },
    ],
  },
  "/contact": {
    lang: "pt",
    title: "Contato | EXP³",
    description:
      "Vamos conversar sobre como transformar o potencial da IA em capacidade operacional na sua organização. Resposta em até 24h.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/contact` },
      { hreflang: "en", href: `${SITE_URL}/en/contact` },
    ],
  },
  "/blog": {
    lang: "pt",
    title: "Blog | EXP³ — Insights sobre IA e transformação digital",
    description:
      "Artigos, cases de sucesso e insights sobre inteligência artificial, transformação digital e inovação estratégica.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/blog` },
      { hreflang: "en", href: `${SITE_URL}/en/blog` },
    ],
  },
  "/en": {
    lang: "en",
    title: "EXP³ | Strategic Intelligence That Operates",
    description:
      "Transform AI potential into operational capacity through cognitive symbiosis: where human creativity and machine power elevate each other.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/` },
      { hreflang: "en", href: `${SITE_URL}/en` },
    ],
  },
  "/en/about": {
    lang: "en",
    title: "About | EXP³",
    description:
      "Strategic think tank that designs and operates the future of business with AI. Meet the EXP³ methodology — Explore, Exploit, Explain.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/about` },
      { hreflang: "en", href: `${SITE_URL}/en/about` },
    ],
  },
  "/en/services": {
    lang: "en",
    title: "Services | EXP³",
    description:
      "Strategic AI consulting: value validation, scale and efficiency, governance and trust. Engineering and results for enterprises.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/services` },
      { hreflang: "en", href: `${SITE_URL}/en/services` },
    ],
  },
  "/en/contact": {
    lang: "en",
    title: "Contact | EXP³",
    description:
      "Let's talk about turning AI potential into operational capacity in your organization. Response within 24h.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/contact` },
      { hreflang: "en", href: `${SITE_URL}/en/contact` },
    ],
  },
  "/en/blog": {
    lang: "en",
    title: "Blog | EXP³ — Insights on AI and digital transformation",
    description:
      "Articles, case studies and insights on artificial intelligence, digital transformation and strategic innovation.",
    altLinks: [
      { hreflang: "pt-BR", href: `${SITE_URL}/blog` },
      { hreflang: "en", href: `${SITE_URL}/en/blog` },
    ],
  },
  "/deck": {
    lang: "pt",
    title: "EXP³ | Apresentação institucional",
    description:
      "Conheça a EXP³ — think tank estratégico que transforma o potencial da IA em capacidade operacional.",
    image: DECK_OG_IMAGE,
  },
  "/deck-en": {
    lang: "en",
    title: "EXP³ | Institutional Deck",
    description:
      "Meet EXP³ — a strategic think tank turning AI potential into operational capacity.",
    image: DECK_OG_IMAGE,
  },
  "/deck-fr": {
    lang: "fr",
    title: "EXP³ | Présentation institutionnelle",
    description:
      "Découvrez EXP³ — think tank stratégique qui transforme le potentiel de l'IA en capacité opérationnelle.",
    image: DECK_OG_IMAGE,
  },
};

function escapeAttr(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function htmlLang(lang: Lang): string {
  if (lang === "pt") return "pt-BR";
  if (lang === "fr") return "fr-FR";
  return "en";
}

function ogLocale(lang: Lang): string {
  if (lang === "pt") return "pt_BR";
  if (lang === "fr") return "fr_FR";
  return "en_US";
}

function renderHtml(opts: {
  url: string;
  meta: RouteMeta;
  publishedAt?: string;
  author?: string;
}): string {
  const { url, meta } = opts;
  const image = meta.image || DEFAULT_OG_IMAGE;
  const type = meta.type || "website";
  const alt = meta.altLinks || [];

  return `<!DOCTYPE html>
<html lang="${htmlLang(meta.lang)}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeAttr(meta.title)}</title>
  <meta name="description" content="${escapeAttr(meta.description)}"/>
  <link rel="canonical" href="${escapeAttr(url)}"/>
  ${alt
    .map(
      (a) =>
        `<link rel="alternate" hreflang="${a.hreflang}" href="${escapeAttr(a.href)}"/>`,
    )
    .join("\n  ")}
  <meta property="og:type" content="${type}"/>
  <meta property="og:title" content="${escapeAttr(meta.title)}"/>
  <meta property="og:description" content="${escapeAttr(meta.description)}"/>
  <meta property="og:image" content="${escapeAttr(image)}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="${escapeAttr(url)}"/>
  <meta property="og:site_name" content="EXP³"/>
  <meta property="og:locale" content="${ogLocale(meta.lang)}"/>
  ${opts.publishedAt
      ? `<meta property="article:published_time" content="${escapeAttr(opts.publishedAt)}"/>`
      : ""}
  ${opts.author
      ? `<meta property="article:author" content="${escapeAttr(opts.author)}"/>`
      : ""}
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${escapeAttr(meta.title)}"/>
  <meta name="twitter:description" content="${escapeAttr(meta.description)}"/>
  <meta name="twitter:image" content="${escapeAttr(image)}"/>
</head>
<body>
  <h1>${escapeAttr(meta.title)}</h1>
  <p>${escapeAttr(meta.description)}</p>
  <p><a href="${escapeAttr(url)}">${escapeAttr(url)}</a></p>
</body>
</html>`;
}

function normalizePath(p: string): string {
  if (!p) return "/";
  // strip trailing slash except root
  let out = p.split("?")[0].split("#")[0];
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out || "/";
}

function parseBlogPath(
  pathname: string,
): { lang: Lang; slug: string } | null {
  const m = pathname.match(/^\/(en\/)?blog\/([^/]+)$/);
  if (!m) return null;
  return { lang: m[1] ? "en" : "pt", slug: m[2] };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const rawPath = url.searchParams.get("path") || "/";
  const pathname = normalizePath(rawPath);
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  // 1) Blog post route?
  const blog = parseBlogPath(pathname);
  if (blog) {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: post } = await supabase
      .from("posts")
      .select(
        "title,slug,excerpt,cover_image_url,author_name,meta_title,meta_description,og_image_url,published_at,created_at,language",
      )
      .eq("slug", blog.slug)
      .eq("status", "published")
      .maybeSingle();

    if (post) {
      const lang = (post.language as Lang) || blog.lang;
      const title = (post.meta_title as string) || (post.title as string);
      const description =
        (post.meta_description as string) ||
        (post.excerpt as string) ||
        "";
      const image =
        (post.og_image_url as string) ||
        (post.cover_image_url as string) ||
        DEFAULT_OG_IMAGE;
      const langPrefix = lang === "en" ? "/en" : "";
      const postUrl = `${SITE_URL}${langPrefix}/blog/${post.slug}`;
      const html = renderHtml({
        url: postUrl,
        meta: {
          lang,
          title,
          description,
          image,
          type: "article",
        },
        publishedAt:
          (post.published_at as string) || (post.created_at as string),
        author: (post.author_name as string) || "EXP³",
      });
      return new Response(html, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=600, s-maxage=600",
        },
      });
    }
    // Post not found — fall through to blog-index meta
    const blogIndexPath = blog.lang === "en" ? "/en/blog" : "/blog";
    const meta = STATIC_ROUTES[blogIndexPath];
    return new Response(
      renderHtml({ url: `${SITE_URL}${blogIndexPath}`, meta }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
        },
      },
    );
  }

  // 2) Static route?
  const meta = STATIC_ROUTES[pathname];
  if (meta) {
    return new Response(renderHtml({ url: canonical, meta }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  // 3) Unknown path → fallback to PT home meta with canonical = requested path
  const fallback = STATIC_ROUTES["/"];
  return new Response(
    renderHtml({ url: canonical, meta: fallback }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=600, s-maxage=600",
      },
    },
  );
});
