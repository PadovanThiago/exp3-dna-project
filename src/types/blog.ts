export type PostCategory = 'article' | 'case_study' | 'news';
export type PostStatus = 'draft' | 'published';
export type PostLanguage = 'pt' | 'en';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: PostCategory;
  status: PostStatus;
  cover_image_url: string | null;
  tags: string[];
  author_name: string;
  reading_time_minutes: number | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  published_at: string | null;
  created_at: string;
  language: PostLanguage;
  updated_at: string;
  translation_group_id: string;
}

export interface PostInsert {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string;
  category?: PostCategory;
  status?: PostStatus;
  cover_image_url?: string | null;
  tags?: string[];
  author_name?: string;
  reading_time_minutes?: number | null;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image_url?: string | null;
  language?: PostLanguage;
  published_at?: string | null;
  translation_group_id?: string;
}
