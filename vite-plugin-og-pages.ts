/**
 * Vite plugin – generates static HTML pages for each published blog post
 * at build time so crawlers get proper Open Graph meta tags without JS.
 *
 * Output: dist/blog/<slug>/index.html  (and dist/en/blog/<slug>/index.html)
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
  content: string;
  cover_image_url: string | null;
  author_name: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  published_at: string | null;
  created_at: string;
  language: string;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPostHtml(post: PostRow): string {
  const title = (post.meta_title || post.title).replace(/ \| EXP³$/i, "");
  const description = post.meta_description || post.excerpt || "";
  const image = post.og_image_url || post.cover_image_url || DEFAULT_OG_IMAGE;
  const langPrefix = post.language === "en" ? "/en" : "";
  const url = `${SITE_URL}${langPrefix}/blog/${post.slug}`;
  const publishedAt = post.published_at || post.created_at;
  const lang = post.language === "pt" ? "pt-BR" : "en";

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(title)} | EXP³</title>
  <meta name="description" content="${escapeAttr(description)}"/>
  <meta name="author" content="${escapeAttr(post.author_name || "EXP³")}"/>

  <meta property="og:type" content="article"/>
  <meta property="og:title" content="${escapeAttr(title)}"/>
  <meta property="og:description" content="${escapeAttr(description)}"/>
  <meta property="og:image" content="${escapeAttr(image)}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="${escapeAttr(url)}"/>
  <meta property="og:site_name" content="EXP³"/>
  <meta property="article:published_time" content="${escapeAttr(publishedAt)}"/>
  <meta property="article:author" content="${escapeAttr(post.author_name || "EXP³")}"/>

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
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="${SITE_URL}/blog"/>
  <meta property="og:type" content="website"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta http-equiv="refresh" content="0;url=${SITE_URL}/blog"/>
</head>
<body><h1>EXP³ Blog</h1></body>
</html>`;
}

interface StaticRoute {
  /** Path relative to outDir, e.g. "" for home, "about", "en", "en/about" */
  outPath: string;
  /** Public URL path, e.g. "/", "/about", "/en", "/en/about" */
  urlPath: string;
  language: "pt" | "en";
  title: string;
  description: string;
  /** Optional sibling path in the other language, for hreflang alternates */
  altPath?: string;
}

const STATIC_ROUTES: StaticRoute[] = [
  // Portuguese (default)
  {
    outPath: "",
    urlPath: "/",
    language: "pt",
    title: "EXP³ | Inteligência estratégica que opera",
    description:
      "Transformamos o potencial da IA em capacidade operacional através da simbiose cognitiva: onde a criatividade humana e o poder da máquina se elevam mutuamente.",
    altPath: "/en",
  },
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

function buildStaticRouteHtml(route: StaticRoute): string {
  const url = `${SITE_URL}${route.urlPath === "/" ? "" : route.urlPath}`;
  const lang = route.language === "pt" ? "pt-BR" : "en";
  const altLang = route.language === "pt" ? "en" : "pt-BR";
  const altUrl = route.altPath
    ? `${SITE_URL}${route.altPath === "/" ? "" : route.altPath}`
    : "";

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(route.title)}</title>
  <meta name="description" content="${escapeAttr(route.description)}"/>

  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${escapeAttr(route.title)}"/>
  <meta property="og:description" content="${escapeAttr(route.description)}"/>
  <meta property="og:image" content="${DEFAULT_OG_IMAGE}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="${escapeAttr(url)}"/>
  <meta property="og:site_name" content="EXP³"/>
  <meta property="og:locale" content="${lang === "pt-BR" ? "pt_BR" : "en_US"}"/>

  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${escapeAttr(route.title)}"/>
  <meta name="twitter:description" content="${escapeAttr(route.description)}"/>
  <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}"/>

  <link rel="canonical" href="${escapeAttr(url)}"/>
  ${altUrl ? `<link rel="alternate" hreflang="${altLang}" href="${escapeAttr(altUrl)}"/>` : ""}
  ${altUrl ? `<link rel="alternate" hreflang="${lang}" href="${escapeAttr(url)}"/>` : ""}
  <meta http-equiv="refresh" content="0;url=${escapeAttr(url)}"/>
</head>
<body>
  <h1>${escapeHtml(route.title)}</h1>
  <p>${escapeHtml(route.description)}</p>
</body>
</html>`;
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
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn("[og-pages] Missing Supabase env vars – skipping OG page generation.");
        return;
      }

      console.log("[og-pages] Fetching published posts…");

      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/posts?status=eq.published&select=title,slug,excerpt,content,cover_image_url,author_name,meta_title,meta_description,og_image_url,published_at,created_at,language`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );

        if (!res.ok) {
          console.warn(`[og-pages] Failed to fetch posts: ${res.status}`);
          return;
        }

        const posts = (await res.json()) as PostRow[];
        console.log(`[og-pages] Generating HTML for ${posts.length} posts…`);

        // Generate blog/index.html fallback
        const blogDir = path.join(outDir, "blog");
        fs.mkdirSync(blogDir, { recursive: true });
        const blogIndex = path.join(blogDir, "index.html");
        if (!fs.existsSync(blogIndex)) {
          fs.writeFileSync(blogIndex, buildFallbackHtml(), "utf-8");
        }

        for (const post of posts) {
          const langPrefix = post.language === "en" ? "en/blog" : "blog";
          const dir = path.join(outDir, langPrefix, post.slug);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "index.html"), buildPostHtml(post), "utf-8");
        }

        console.log("[og-pages] Done ✓");
      } catch (err) {
        console.warn("[og-pages] Error generating OG pages:", err);
      }
    },
  };
}
