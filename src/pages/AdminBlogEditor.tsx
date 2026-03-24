import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Languages, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Post, PostCategory, PostStatus, PostLanguage } from '@/types/blog';

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
  const [translating, setTranslating] = useState(false);
  const [siblingPost, setSiblingPost] = useState<Post | null>(null);
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
    language: 'en' as PostLanguage,
    translation_group_id: '',
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
        language: post.language || 'en',
        translation_group_id: post.translation_group_id || '',
      });

      // Fetch sibling translation
      if (post.translation_group_id) {
        const otherLang = post.language === 'pt' ? 'en' : 'pt';
        const { data: sibling } = await supabase
          .from('posts')
          .select('*')
          .eq('translation_group_id', post.translation_group_id)
          .eq('language', otherLang)
          .maybeSingle();
        if (sibling) setSiblingPost(sibling as unknown as Post);
      }
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

    const payload: Record<string, any> = {
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
      language: form.language,
      published_at: status === 'published'
        ? (isEditing && form.status === 'published' ? undefined : new Date().toISOString())
        : null,
    };

    // Set translation_group_id for new posts
    if (!isEditing) {
      payload.translation_group_id = crypto.randomUUID();
    }

    let error;
    let savedPostId = id;
    if (isEditing) {
      ({ error } = await supabase.from('posts').update(payload).eq('id', id));
    } else {
      const { data, error: insertErr } = await supabase.from('posts').insert(payload).select('id').single();
      error = insertErr;
      if (data) savedPostId = data.id;
    }

    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Salvo!', description: publishNow ? 'Post publicado com sucesso.' : 'Post salvo.' });
      navigate('/admin/blog');
    }
    setSaving(false);
  };

  const handleTranslate = async () => {
    if (!id) {
      toast({ title: 'Erro', description: 'Salve o post antes de traduzir.', variant: 'destructive' });
      return;
    }

    const targetLang = form.language === 'pt' ? 'en' : 'pt';

    setTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('translate-post', {
        body: { postId: id, targetLanguage: targetLang },
      });

      if (error) throw error;

      if (data?.error === 'Translation already exists') {
        toast({ title: 'Tradução já existe', description: `Já existe versão em ${targetLang === 'pt' ? 'Português' : 'English'}.` });
      } else if (data?.success) {
        toast({ title: 'Tradução criada!', description: `Versão em ${targetLang === 'pt' ? 'Português' : 'English'} gerada com sucesso.` });
        // Reload to show sibling
        await loadPost();
      } else {
        throw new Error(data?.error || 'Unknown error');
      }
    } catch (err: any) {
      toast({ title: 'Erro na tradução', description: err.message, variant: 'destructive' });
    }
    setTranslating(false);
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
            {isEditing && (
              <Button
                variant="outline"
                onClick={handleTranslate}
                disabled={translating}
              >
                {translating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Languages className="w-4 h-4 mr-2" />
                )}
                {translating
                  ? 'Traduzindo...'
                  : `Gerar ${form.language === 'pt' ? 'EN' : 'PT'}`}
              </Button>
            )}
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

        {/* Translation sibling info */}
        {siblingPost && (
          <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Tradução vinculada: </span>
              <Badge variant="outline" className="ml-1">
                {siblingPost.language === 'pt' ? 'PT' : 'EN'}
              </Badge>
              <span className="ml-2 text-foreground font-medium">{siblingPost.title}</span>
              <Badge variant={siblingPost.status === 'published' ? 'default' : 'secondary'} className="ml-2 text-xs">
                {siblingPost.status === 'published' ? 'Publicado' : 'Rascunho'}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/admin/blog/edit/${siblingPost.id}`}>Editar</Link>
            </Button>
          </div>
        )}

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
                <Label>Idioma</Label>
                <Select
                  value={form.language}
                  onValueChange={(v) => setForm({ ...form, language: v as PostLanguage })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
