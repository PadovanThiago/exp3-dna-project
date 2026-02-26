
-- Drop all existing restrictive policies on posts
DROP POLICY IF EXISTS "Admins can create posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;

-- 1. Public: anyone can SELECT published posts (PERMISSIVE)
CREATE POLICY "Published posts are viewable by everyone"
ON public.posts
FOR SELECT
TO public
USING (status = 'published'::post_status);

-- 2. Admin: can SELECT all posts (PERMISSIVE)
CREATE POLICY "Admins can view all posts"
ON public.posts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Admin: can INSERT (PERMISSIVE)
CREATE POLICY "Admins can create posts"
ON public.posts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Admin: can UPDATE (PERMISSIVE)
CREATE POLICY "Admins can update posts"
ON public.posts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 5. Admin: can DELETE (PERMISSIVE)
CREATE POLICY "Admins can delete posts"
ON public.posts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
