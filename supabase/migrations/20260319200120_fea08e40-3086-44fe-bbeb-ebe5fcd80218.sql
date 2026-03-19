
-- Create neodash_acoes table
CREATE TABLE public.neodash_acoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ident text NOT NULL,
  label text NOT NULL,
  descricao text NOT NULL DEFAULT '',
  criado_em timestamp with time zone NOT NULL DEFAULT now()
);

-- Create junction table for insight <-> acao (N:N)
CREATE TABLE public.neodash_insight_acoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id uuid NOT NULL REFERENCES public.neodash_insights_v2(id) ON DELETE CASCADE,
  acao_id uuid NOT NULL REFERENCES public.neodash_acoes(id) ON DELETE CASCADE,
  criado_em timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (insight_id, acao_id)
);

-- Add ident and label columns to insights
ALTER TABLE public.neodash_insights_v2 ADD COLUMN ident text NOT NULL DEFAULT '';
ALTER TABLE public.neodash_insights_v2 ADD COLUMN label text NOT NULL DEFAULT '';

-- Remove acionaveis column from insights
ALTER TABLE public.neodash_insights_v2 DROP COLUMN acionaveis;

-- Enable RLS
ALTER TABLE public.neodash_acoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neodash_insight_acoes ENABLE ROW LEVEL SECURITY;

-- RLS policies for acoes
CREATE POLICY "Allow full access to acoes" ON public.neodash_acoes FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for junction table
CREATE POLICY "Allow full access to insight_acoes" ON public.neodash_insight_acoes FOR ALL USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX idx_neodash_insight_acoes_insight ON public.neodash_insight_acoes(insight_id);
CREATE INDEX idx_neodash_insight_acoes_acao ON public.neodash_insight_acoes(acao_id);
