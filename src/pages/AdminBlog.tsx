import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus, Edit, Trash2, Eye, LogOut, ArrowLeft
} from 'lucide-react';
import type { Post, PostCategory } from '@/types/blog';

const categoryLabels: Record<PostCategory, string> = {
  article: 'Artigo',
  case_study: 'Case',
  news: 'Notícia',
};

const AdminBlog: React.FC = () => {
  console.log('[AdminBlog] componente montado');
  const { isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [loading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) fetchPosts();
  }, [isAdmin]);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data as unknown as Post[]);
    setFetching(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    await supabase.from('posts').delete().eq('id', id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/blog"><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Gerenciar Blog</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link to="/admin/blog/new">
                <Plus className="w-4 h-4 mr-2" /> Novo Post
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut} title="Sair">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Posts list */}
        {fetching ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-4 animate-pulse">
                <div className="h-5 bg-muted rounded w-1/2 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-4">Nenhum post ainda.</p>
            <Button asChild>
              <Link to="/admin/blog/new">
                <Plus className="w-4 h-4 mr-2" /> Criar primeiro post
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[post.category]}
                    </Badge>
                    <Badge
                      variant={post.status === 'published' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {post.status === 'published' ? '✓ Publicado' : 'Rascunho'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {post.status === 'published' && (
                    <Button variant="ghost" size="icon" asChild title="Ver">
                      <Link to={`/blog/${post.slug}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" asChild title="Editar">
                    <Link to={`/admin/blog/edit/${post.id}`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePost(post.id)}
                    title="Excluir"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
