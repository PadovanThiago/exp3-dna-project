
-- Drop all existing restrictive policies
DROP POLICY IF EXISTS "Admins can create posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Published posts are viewable by everyone"
ON public.posts FOR SELECT
USING (status = 'published'::post_status);

CREATE POLICY "Admins can view all posts"
ON public.posts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create posts"
ON public.posts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update posts"
ON public.posts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete posts"
ON public.posts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
