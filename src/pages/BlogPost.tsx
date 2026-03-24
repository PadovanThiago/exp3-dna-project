import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { BlogSEO } from '@/components/BlogSEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import type { Post, PostCategory } from '@/types/blog';

const categoryLabels: Record<string, Record<PostCategory, string>> = {
  pt: { article: 'Artigo', case_study: 'Case de Sucesso', news: 'Notícia' },
  en: { article: 'Article', case_study: 'Case Study', news: 'News' },
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [siblingPost, setSiblingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchPost();
  }, [slug, language]);

  const fetchPost = async () => {
    setLoading(true);
    setSiblingPost(null);

    // 1. Try to find the post by slug in the current language
    const { data: directMatch } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .eq('language', language)
      .maybeSingle();

    if (directMatch) {
      const p = directMatch as unknown as Post;
      setPost(p);
      // Fetch sibling for hreflang
      await fetchSibling(p);
      setLoading(false);
      return;
    }

    // 2. Try slug in any language, then find best version
    const { data: anyLangMatch } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (anyLangMatch) {
      const source = anyLangMatch as unknown as Post;
      // Try to find the version in the current language by translation_group_id
      const { data: translated } = await supabase
        .from('posts')
        .select('*')
        .eq('translation_group_id', source.translation_group_id)
        .eq('language', language)
        .eq('status', 'published')
        .maybeSingle();

      if (translated) {
        const p = translated as unknown as Post;
        setPost(p);
        await fetchSibling(p);
      } else {
        // Fallback to EN or whatever exists
        const fallback = source.language === 'en' ? source : null;
        if (fallback) {
          setPost(fallback);
          await fetchSibling(fallback);
        } else {
          // Just show whatever we found
          setPost(source);
          await fetchSibling(source);
        }
      }
    } else {
      setPost(null);
    }

    setLoading(false);
  };

  const fetchSibling = async (currentPost: Post) => {
    const otherLang = currentPost.language === 'pt' ? 'en' : 'pt';
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('translation_group_id', currentPost.translation_group_id)
      .eq('language', otherLang)
      .eq('status', 'published')
      .maybeSingle();

    if (data) {
      setSiblingPost(data as unknown as Post);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-3xl px-4">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {language === 'pt' ? 'Post não encontrado' : 'Post not found'}
          </h1>
          <Button asChild variant="outline">
            <Link to={language === 'en' ? '/en/blog' : '/blog'}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              {language === 'pt' ? 'Voltar ao blog' : 'Back to blog'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BlogSEO post={post} siblingPost={siblingPost} />

      <article className="section-padding pt-32 md:pt-40">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to={language === 'en' ? '/en/blog' : '/blog'} className="hover:text-primary transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-foreground truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Fallback notice */}
          {post.language !== language && (
            <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground">
              {language === 'pt'
                ? 'Este conteúdo ainda não está disponível em português. Exibindo versão em inglês.'
                : 'This content is not yet available in English. Showing the Portuguese version.'}
            </div>
          )}

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <Badge
              variant="outline"
              className={`mb-4 ${
                post.category === 'case_study'
                  ? 'bg-exp3-emerald/10 text-exp3-emerald border-exp3-emerald/20'
                  : post.category === 'news'
                  ? 'bg-exp3-orange/10 text-exp3-orange border-exp3-orange/20'
                  : 'bg-primary/10 text-primary border-primary/20'
              }`}
            >
              {categoryLabels[language][post.category]}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border/50 pb-6">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author_name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              {post.reading_time_minutes && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.reading_time_minutes} min {language === 'pt' ? 'de leitura' : 'read'}
                </span>
              )}
            </div>
          </motion.header>

          {/* Cover image */}
          {post.cover_image_url && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 rounded-xl overflow-hidden"
            >
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-auto"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground
              prose-code:text-primary prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-card text-muted-foreground">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="mt-12">
            <Button asChild variant="outline">
              <Link to={language === 'en' ? '/en/blog' : '/blog'}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                {language === 'pt' ? 'Voltar ao blog' : 'Back to blog'}
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
