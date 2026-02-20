export type PostCategory = 'article' | 'case_study' | 'news';
export type PostStatus = 'draft' | 'published';

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
  updated_at: string;
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
  published_at?: string | null;
}
