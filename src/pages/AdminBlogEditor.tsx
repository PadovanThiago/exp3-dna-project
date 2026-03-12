import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Post, PostCategory, PostStatus } from '@/types/blog';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const AdminBlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'article' as PostCategory,
    status: 'draft' as PostStatus,
    cover_image_url: '',
    tags: '',
    author_name: 'EXP³',
    meta_title: '',
    meta_description: '',
    og_image_url: '',
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/admin/login');
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isEditing && isAdmin) loadPost();
  }, [isEditing, isAdmin]);

  const loadPost = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (data) {
      const post = data as unknown as Post;
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        category: post.category,
        status: post.status,
        cover_image_url: post.cover_image_url || '',
        tags: post.tags?.join(', ') || '',
        author_name: post.author_name,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        og_image_url: post.og_image_url || '',
      });
    }
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : slugify(title),
    }));
  };

  const handleSave = async (publishNow?: boolean) => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast({ title: 'Erro', description: 'Título e slug são obrigatórios.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const status = publishNow ? 'published' : form.status;
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      category: form.category as PostCategory,
      status,
      cover_image_url: form.cover_image_url || null,
      tags,
      author_name: form.author_name,
      reading_time_minutes: estimateReadingTime(form.content),
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      og_image_url: form.og_image_url || null,
      published_at: status === 'published'
        ? (isEditing && form.status === 'published' ? undefined : new Date().toISOString())
        : null,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from('posts').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('posts').insert(payload));
    }

    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Salvo!', description: publishNow ? 'Post publicado com sucesso.' : 'Post salvo.' });
      navigate('/admin/blog');
    }
    setSaving(false);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/blog"><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? 'Editar Post' : 'Novo Post'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              Salvar rascunho
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving}>
              <Eye className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Título do post"
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="titulo-do-post"
                  className="text-sm font-mono"
                />
                <p className="text-xs text-muted-foreground">/blog/{form.slug || '...'}</p>
              </div>

              <div className="space-y-2">
                <Label>Resumo (Excerpt)</Label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Breve resumo do post para listagem e SEO"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Conteúdo (HTML)</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="<p>Conteúdo do post em HTML...</p>"
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Use HTML para formatar. Tags suportadas: h2, h3, p, ul, ol, blockquote, strong, em, a, img, code
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Configurações</h3>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v as PostCategory })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Artigo</SelectItem>
                    <SelectItem value="case_study">Case de Sucesso</SelectItem>
                    <SelectItem value="news">Notícia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Autor</Label>
                <Input
                  value={form.author_name}
                  onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="ia, estratégia, negócios"
                />
                <p className="text-xs text-muted-foreground">Separadas por vírgula</p>
              </div>

              <div className="space-y-2">
                <Label>Imagem de capa (URL)</Label>
                <Input
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground">SEO</h3>

              <div className="space-y-2">
                <Label>Meta título</Label>
                <Input
                  value={form.meta_title}
                  onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                  placeholder="Título para buscadores (max 60 chars)"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">{form.meta_title.length}/60</p>
              </div>

              <div className="space-y-2">
                <Label>Meta descrição</Label>
                <Textarea
                  value={form.meta_description}
                  onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  placeholder="Descrição para buscadores (max 160 chars)"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">{form.meta_description.length}/160</p>
              </div>

              <div className="space-y-2">
                <Label>OG Image (URL)</Label>
                <Input
                  value={form.og_image_url}
                  onChange={(e) => setForm({ ...form, og_image_url: e.target.value })}
                  placeholder="Imagem para compartilhamento social"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditor;
