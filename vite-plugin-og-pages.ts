/**
 * Vite plugin – generates static HTML for crawlers (LinkedIn, WhatsApp,
 * Slack, Facebook, etc.) so each public route ships its own Open Graph
 * meta tags without relying on client-side JavaScript.
 *
 * Strategy: after Vite builds dist/index.html (the SPA shell), clone it
 * for each route and inject route-specific <title>, description, og:* and
 * twitter:* tags. Humans still get the full SPA; crawlers read the static
 * head and stop. No meta-refresh, no redirect loops.
 *
 * Output:
 *   dist/about/index.html, dist/services/index.html, dist/contact/index.html,
 *   dist/blog/index.html, dist/en/index.html, dist/en/about/index.html, …
 *   dist/blog/<slug>/index.html, dist/en/blog/<slug>/index.html
 */
import { Plugin } from "vite";
import path from "path";
import fs from "fs";

const SITE_URL = "https://exp3.ai";
const DEFAULT_OG_IMAGE = "https://exp3.ai/exp3-og-banner.jpg";

interface PostRow {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author_name: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  published_at: string | null;
  created_at: string;
  language: string;
}

interface StaticRoute {
  /** Output dir relative to outDir, e.g. "about", "en", "en/about". Empty = root. */
  outPath: string;
  /** Public URL path, e.g. "/about", "/en", "/en/about". */
  urlPath: string;
  language: "pt" | "en";
  title: string;
  description: string;
  /** Sibling path in the other language for hreflang alternates. */
  altPath?: string;
}

const STATIC_ROUTES: StaticRoute[] = [
  // Portuguese (default — root already covered by dist/index.html)
  {
    outPath: "about",
    urlPath: "/about",
    language: "pt",
    title: "Quem somos | EXP³",
    description:
      "Think tank estratégico que desenha e opera o futuro dos negócios com IA. Conheça a metodologia EXP³ — Explore, Exploit, Explain.",
    altPath: "/en/about",
  },
  {
    outPath: "services",
    urlPath: "/services",
    language: "pt",
    title: "Serviços | EXP³",
    description:
      "Consultoria estratégica de IA: validação de valor, escala e eficiência, governança e confiança. Engenharia e resultados para empresas.",
    altPath: "/en/services",
  },
  {
    outPath: "contact",
    urlPath: "/contact",
    language: "pt",
    title: "Contato | EXP³",
    description:
      "Vamos conversar sobre como transformar o potencial da IA em capacidade operacional na sua organização. Resposta em até 24h.",
    altPath: "/en/contact",
  },
  {
    outPath: "blog",
    urlPath: "/blog",
    language: "pt",
    title: "Blog | EXP³ — Insights sobre IA e transformação digital",
    description:
      "Artigos, cases de sucesso e insights sobre inteligência artificial, transformação digital e inovação estratégica.",
    altPath: "/en/blog",
  },
  // English
  {
    outPath: "en",
    urlPath: "/en",
    language: "en",
    title: "EXP³ | Strategic Intelligence That Operates",
    description:
      "Transform AI potential into operational capacity through cognitive symbiosis: where human creativity and machine power elevate each other.",
    altPath: "/",
  },
  {
    outPath: "en/about",
    urlPath: "/en/about",
    language: "en",
    title: "About | EXP³",
    description:
      "Strategic think tank that designs and operates the future of business with AI. Meet the EXP³ methodology — Explore, Exploit, Explain.",
    altPath: "/about",
  },
  {
    outPath: "en/services",
    urlPath: "/en/services",
    language: "en",
    title: "Services | EXP³",
    description:
      "Strategic AI consulting: value validation, scale and efficiency, governance and trust. Engineering and results for enterprises.",
    altPath: "/services",
  },
  {
    outPath: "en/contact",
    urlPath: "/en/contact",
    language: "en",
    title: "Contact | EXP³",
    description:
      "Let's talk about turning AI potential into operational capacity in your organization. Response within 24h.",
    altPath: "/contact",
  },
  {
    outPath: "en/blog",
    urlPath: "/en/blog",
    language: "en",
    title: "Blog | EXP³ — Insights on AI and digital transformation",
    description:
      "Articles, case studies and insights on artificial intelligence, digital transformation and strategic innovation.",
    altPath: "/blog",
  },
];

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

interface MetaOverrides {
  lang: string; // "pt-BR" | "en"
  title: string;
  description: string;
  url: string;
  image: string;
  type: "website" | "article";
  canonical: string;
  altLinks?: Array<{ hreflang: string; href: string }>;
  articlePublishedTime?: string;
  articleAuthor?: string;
}

/**
 * Take the SPA shell HTML and inject route-specific head tags.
 * Strips any existing tags we are about to set so we never duplicate.
 */
function injectMeta(shellHtml: string, m: MetaOverrides): string {
  let html = shellHtml;

  // Set <html lang="…">
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${m.lang}"`);

  // Remove existing tags we will overwrite
  const stripPatterns: RegExp[] = [
    /<title>[\s\S]*?<\/title>/i,
    /<meta\s+name="description"[^>]*>\s*/gi,
    /<meta\s+property="og:title"[^>]*>\s*/gi,
    /<meta\s+property="og:description"[^>]*>\s*/gi,
    /<meta\s+property="og:image"[^>]*>\s*/gi,
    /<meta\s+property="og:image:width"[^>]*>\s*/gi,
    /<meta\s+property="og:image:height"[^>]*>\s*/gi,
    /<meta\s+property="og:url"[^>]*>\s*/gi,
    /<meta\s+property="og:type"[^>]*>\s*/gi,
    /<meta\s+property="og:locale"[^>]*>\s*/gi,
    /<meta\s+property="article:published_time"[^>]*>\s*/gi,
    /<meta\s+property="article:author"[^>]*>\s*/gi,
    /<meta\s+name="twitter:title"[^>]*>\s*/gi,
    /<meta\s+name="twitter:description"[^>]*>\s*/gi,
    /<meta\s+name="twitter:image"[^>]*>\s*/gi,
    /<link\s+rel="canonical"[^>]*>\s*/gi,
    /<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>\s*/gi,
  ];
  for (const re of stripPatterns) html = html.replace(re, "");

  const ogLocale = m.lang === "pt-BR" ? "pt_BR" : "en_US";

  const injected = [
    `<title>${escapeAttr(m.title)}</title>`,
    `<meta name="description" content="${escapeAttr(m.description)}"/>`,
    `<link rel="canonical" href="${escapeAttr(m.canonical)}"/>`,
    ...(m.altLinks ?? []).map(
      (a) =>
        `<link rel="alternate" hreflang="${a.hreflang}" href="${escapeAttr(a.href)}"/>`,
    ),
    `<meta property="og:type" content="${m.type}"/>`,
    `<meta property="og:title" content="${escapeAttr(m.title)}"/>`,
    `<meta property="og:description" content="${escapeAttr(m.description)}"/>`,
    `<meta property="og:image" content="${escapeAttr(m.image)}"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:url" content="${escapeAttr(m.url)}"/>`,
    `<meta property="og:locale" content="${ogLocale}"/>`,
    ...(m.articlePublishedTime
      ? [
          `<meta property="article:published_time" content="${escapeAttr(m.articlePublishedTime)}"/>`,
        ]
      : []),
    ...(m.articleAuthor
      ? [`<meta property="article:author" content="${escapeAttr(m.articleAuthor)}"/>`]
      : []),
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${escapeAttr(m.title)}"/>`,
    `<meta name="twitter:description" content="${escapeAttr(m.description)}"/>`,
    `<meta name="twitter:image" content="${escapeAttr(m.image)}"/>`,
  ].join("\n    ");

  // Insert just before </head>
  html = html.replace(/<\/head>/i, `    ${injected}\n  </head>`);
  return html;
}

function writeFile(outDir: string, outPath: string, html: string) {
  const dir = path.join(outDir, outPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
}

export default function ogPagesPlugin(): Plugin {
  let outDir = "dist";

  return {
    name: "vite-plugin-og-pages",
    apply: "build",

    configResolved(config) {
      outDir = config.build.outDir;
    },

    async closeBundle() {
      const shellPath = path.join(outDir, "index.html");
      if (!fs.existsSync(shellPath)) {
        console.warn("[og-pages] dist/index.html not found – skipping.");
        return;
      }
      const shellHtml = fs.readFileSync(shellPath, "utf-8");

      // 1) Static institutional routes
      console.log(
        `[og-pages] Writing ${STATIC_ROUTES.length} institutional route shells…`,
      );
      for (const route of STATIC_ROUTES) {
        const canonical = `${SITE_URL}${route.urlPath === "/" ? "" : route.urlPath}`;
        const altLinks = route.altPath
          ? [
              {
                hreflang: route.language === "pt" ? "en" : "pt-BR",
                href: `${SITE_URL}${route.altPath === "/" ? "" : route.altPath}`,
              },
              {
                hreflang: route.language === "pt" ? "pt-BR" : "en",
                href: canonical,
              },
            ]
          : undefined;

        const html = injectMeta(shellHtml, {
          lang: route.language === "pt" ? "pt-BR" : "en",
          title: route.title,
          description: route.description,
          url: canonical,
          image: DEFAULT_OG_IMAGE,
          type: "website",
          canonical,
          altLinks,
        });
        writeFile(outDir, route.outPath, html);
      }

      // 2) Blog posts (dynamic)
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn(
          "[og-pages] Missing Supabase env vars – skipping blog post OG generation.",
        );
        console.log("[og-pages] Done ✓");
        return;
      }

      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/posts?status=eq.published&select=title,slug,excerpt,cover_image_url,author_name,meta_title,meta_description,og_image_url,published_at,created_at,language`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        );

        if (!res.ok) {
          console.warn(`[og-pages] Failed to fetch posts: ${res.status}`);
          return;
        }

        const posts = (await res.json()) as PostRow[];
        console.log(`[og-pages] Writing ${posts.length} blog post shells…`);

        for (const post of posts) {
          const langPrefix = post.language === "en" ? "/en" : "";
          const outPath = `${post.language === "en" ? "en/blog" : "blog"}/${post.slug}`;
          const canonical = `${SITE_URL}${langPrefix}/blog/${post.slug}`;
          const title = (post.meta_title || post.title).replace(/ \| EXP³$/i, "");
          const description = post.meta_description || post.excerpt || "";
          const image =
            post.og_image_url || post.cover_image_url || DEFAULT_OG_IMAGE;

          const html = injectMeta(shellHtml, {
            lang: post.language === "pt" ? "pt-BR" : "en",
            title: `${title} | EXP³`,
            description,
            url: canonical,
            image,
            type: "article",
            canonical,
            articlePublishedTime: post.published_at || post.created_at,
            articleAuthor: post.author_name || "EXP³",
          });
          writeFile(outDir, outPath, html);
        }

        console.log("[og-pages] Done ✓");
      } catch (err) {
        console.warn("[og-pages] Error generating OG pages:", err);
      }
    },
  };
}
