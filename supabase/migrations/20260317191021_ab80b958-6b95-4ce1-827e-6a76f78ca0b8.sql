
-- Topics/Themes for organizing questions
CREATE TABLE public.neodash_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  color text DEFAULT '#6366f1',
  sort_order integer DEFAULT 0,
  workspace_id uuid, -- future: link to workspaces
  created_by uuid,   -- future: link to auth.users
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Questions linked to topics
CREATE TABLE public.neodash_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES public.neodash_topics(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'archived')),
  sort_order integer DEFAULT 0,
  workspace_id uuid,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Insights linked to questions
CREATE TABLE public.neodash_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES public.neodash_questions(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  type text DEFAULT 'observation' CHECK (type IN ('observation', 'hypothesis', 'conclusion', 'action_item')),
  source text,
  workspace_id uuid,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_neodash_questions_topic ON public.neodash_questions(topic_id);
CREATE INDEX idx_neodash_insights_question ON public.neodash_insights(question_id);
CREATE INDEX idx_neodash_questions_status ON public.neodash_questions(status);

-- Enable RLS
ALTER TABLE public.neodash_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neodash_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neodash_insights ENABLE ROW LEVEL SECURITY;

-- Permissive policies for now (no auth yet - internal tool)
CREATE POLICY "Allow full access to topics" ON public.neodash_topics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to questions" ON public.neodash_questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to insights" ON public.neodash_insights FOR ALL USING (true) WITH CHECK (true);

-- Auto-update timestamps
CREATE TRIGGER update_neodash_topics_updated_at
  BEFORE UPDATE ON public.neodash_topics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_neodash_questions_updated_at
  BEFORE UPDATE ON public.neodash_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_neodash_insights_updated_at
  BEFORE UPDATE ON public.neodash_insights
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
