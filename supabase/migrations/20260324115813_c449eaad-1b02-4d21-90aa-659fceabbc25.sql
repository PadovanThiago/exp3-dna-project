
-- Add translation_group_id to posts
ALTER TABLE public.posts ADD COLUMN translation_group_id UUID DEFAULT gen_random_uuid();

-- Backfill existing posts: each gets its own group
UPDATE public.posts SET translation_group_id = gen_random_uuid() WHERE translation_group_id IS NULL;

-- Make NOT NULL after backfill
ALTER TABLE public.posts ALTER COLUMN translation_group_id SET NOT NULL;

-- Index for grouping
CREATE INDEX idx_posts_translation_group_id ON public.posts(translation_group_id);
