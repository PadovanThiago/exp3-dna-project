import { useEffect } from 'react';
import type { Post } from '@/types/blog';

interface BlogSEOProps {
  post?: Post;
  listPage?: boolean;
}

export function BlogSEO({ post, listPage }: BlogSEOProps) {
  useEffect(() => {
    if (listPage) {
      document.title = 'Blog | EXP³ — Insights sobre IA e Transformação Digital';
      setMeta('description', 'Artigos, cases de sucesso e insights sobre inteligência artificial, transformação digital e inovação estratégica.');
      setMeta('og:title', 'Blog | EXP³');
      setMeta('og:description', 'Artigos, cases e insights sobre IA e transformação digital.');
      setMeta('og:type', 'website');
      removeJsonLd();
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
    setLink('canonical', `https://exp3.ai/blog/${post.slug}`);

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
  }, [post, listPage]);

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
