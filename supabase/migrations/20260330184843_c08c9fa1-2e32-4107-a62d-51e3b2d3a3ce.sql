
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL DEFAULT '',
  language text NOT NULL DEFAULT 'pt',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
