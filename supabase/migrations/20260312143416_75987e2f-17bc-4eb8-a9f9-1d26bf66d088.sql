
-- Add language column to posts table with default 'pt'
ALTER TABLE public.posts ADD COLUMN language text NOT NULL DEFAULT 'pt';

-- Add check constraint for valid values
CREATE OR REPLACE FUNCTION public.validate_post_language()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.language NOT IN ('pt', 'en') THEN
    RAISE EXCEPTION 'language must be pt or en';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_post_language_trigger
  BEFORE INSERT OR UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_post_language();
