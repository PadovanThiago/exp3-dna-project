import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { BlogSEO } from '@/components/BlogSEO';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Post, PostCategory } from '@/types/blog';

const categoryLabels: Record<string, Record<PostCategory, string>> = {
  pt: { article: 'Artigo', case_study: 'Case', news: 'Notícia' },
  en: { article: 'Article', case_study: 'Case Study', news: 'News' },
};

const categoryColors: Record<PostCategory, string> = {
  article: 'bg-primary/10 text-primary border-primary/20',
  case_study: 'bg-exp3-emerald/10 text-exp3-emerald border-exp3-emerald/20',
  news: 'bg-exp3-orange/10 text-exp3-orange border-exp3-orange/20',
};

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PostCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Debug temporário — remover após validação em produção
    console.log('[Blog] Posts retornados:', data?.length ?? 0);
    console.log('[Blog] Status de cada post:', data?.map(p => ({ slug: (p as any).slug, status: (p as any).status })));
    if (error) console.error('[Blog] Erro na query:', error);

    if (!error && data) {
      setPosts(data as unknown as Post[]);
    }
    setLoading(false);
  };

  const filtered = posts.filter((p) => {
    const matchCategory = filter === 'all' || p.category === filter;
    const matchSearch = !search || 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt?.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  return (
    <div className="min-h-screen">
      <BlogSEO listPage />

      {/* Hero */}
      <section className="section-padding pt-32 md:pt-40">
        <div className="container-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {language === 'pt' ? 'Blog' : 'Blog'}
              <span className="text-gradient-cyan block mt-2">
                {language === 'pt' ? 'Insights & Cases' : 'Insights & Cases'}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'pt'
                ? 'Artigos, estudos de caso e tendências sobre IA, transformação digital e inovação estratégica.'
                : 'Articles, case studies and trends on AI, digital transformation and strategic innovation.'}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
          >
            <div className="flex gap-2 flex-wrap justify-center">
              {(['all', 'article', 'case_study', 'news'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
                  }`}
                >
                  {cat === 'all'
                    ? (language === 'pt' ? 'Todos' : 'All')
                    : categoryLabels[language][cat]}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={language === 'pt' ? 'Buscar...' : 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card/50 border-border/50"
              />
            </div>
          </motion.div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                {language === 'pt'
                  ? 'Nenhum post encontrado.'
                  : 'No posts found.'}
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="glass-card overflow-hidden hover-lift group block h-full"
                  >
                    {/* Cover image */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-exp3-emerald/20 relative overflow-hidden">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-2xl font-bold text-gradient-cyan">
                              {post.category === 'case_study' ? '📊' : post.category === 'news' ? '📰' : '📝'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className={categoryColors[post.category]}>
                          {categoryLabels[language][post.category]}
                        </Badge>
                      </div>

                      <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.published_at || post.created_at)}
                          </span>
                          {post.reading_time_minutes && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.reading_time_minutes} min
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
