import { useEffect } from 'react';
import type { Post } from '@/types/blog';

interface BlogSEOProps {
  post?: Post;
  siblingPost?: Post | null;
  listPage?: boolean;
}

export function BlogSEO({ post, siblingPost, listPage }: BlogSEOProps) {
  useEffect(() => {
    if (listPage) {
      document.title = 'Blog | EXP³ — Insights sobre IA e Transformação Digital';
      setMeta('description', 'Artigos, cases de sucesso e insights sobre inteligência artificial, transformação digital e inovação estratégica.');
      setMeta('og:title', 'Blog | EXP³');
      setMeta('og:description', 'Artigos, cases e insights sobre IA e transformação digital.');
      setMeta('og:type', 'website');
      removeJsonLd();
      clearLinks();
      return;
    }

    if (!post) return;

    const title = post.meta_title || post.title;
    const description = post.meta_description || post.excerpt || '';

    document.title = `${title} | EXP³`;
    setMeta('description', description);
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:type', 'article');
    if (post.og_image_url || post.cover_image_url) {
      setMeta('og:image', post.og_image_url || post.cover_image_url || '');
    }
    setMeta('article:published_time', post.published_at || post.created_at);
    setMeta('article:author', post.author_name);

    // Canonical URL
    const langPrefix = post.language === 'en' ? '/en' : '';
    setLink('canonical', `https://exp3.ai${langPrefix}/blog/${post.slug}`);

    // Only generate hreflang alternates if sibling exists
    if (siblingPost) {
      const ptSlug = post.language === 'pt' ? post.slug : siblingPost.slug;
      const enSlug = post.language === 'en' ? post.slug : siblingPost.slug;
      setLink('alternate-pt', `https://exp3.ai/blog/${ptSlug}`, 'alternate', 'pt');
      setLink('alternate-en', `https://exp3.ai/en/blog/${enSlug}`, 'alternate', 'en');
    } else {
      // Remove alternate links if no sibling
      removeLink('alternate-pt');
      removeLink('alternate-en');
    }

    // JSON-LD structured data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': post.category === 'case_study' ? 'CaseStudy' : 'Article',
      headline: title,
      description,
      author: {
        '@type': 'Organization',
        name: post.author_name,
      },
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at,
      ...(post.cover_image_url && { image: post.cover_image_url }),
      publisher: {
        '@type': 'Organization',
        name: 'EXP³',
      },
      inLanguage: post.language === 'pt' ? 'pt-BR' : 'en',
    };

    let script = document.getElementById('blog-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'blog-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = 'EXP³ — Strategic AI Consulting';
    };
  }, [post, siblingPost, listPage]);

  return null;
}

function setMeta(name: string, content: string) {
  const isOg = name.startsWith('og:') || name.startsWith('article:');
  const selector = isOg
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;

  let el = document.querySelector(selector) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    if (isOg) el.setAttribute('property', name);
    else el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeJsonLd() {
  const el = document.getElementById('blog-jsonld');
  if (el) el.remove();
}

function clearLinks() {
  removeLink('canonical');
  removeLink('alternate-pt');
  removeLink('alternate-en');
}

function removeLink(id: string) {
  const el = document.querySelector(`link[data-seo-id="${id}"]`);
  if (el) el.remove();
}

function setLink(id: string, href: string, rel: string = 'canonical', hreflang?: string) {
  let el = document.querySelector(`link[data-seo-id="${id}"]`) as HTMLLinkElement;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('data-seo-id', id);
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.rel = rel;
  el.href = href;
  if (hreflang) {
    el.hreflang = hreflang;
  }
}
