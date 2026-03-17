
-- Drop old tables
DROP TABLE IF EXISTS public.neodash_insights CASCADE;
DROP TABLE IF EXISTS public.neodash_questions CASCADE;
DROP TABLE IF EXISTS public.neodash_topics CASCADE;

-- Pergunta table
CREATE TABLE public.neodash_perguntas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL UNIQUE,
  pergunta text NOT NULL,
  criado_em timestamptz NOT NULL DEFAULT now()
);

-- Insight table
CREATE TABLE public.neodash_insights_v2 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta_id uuid REFERENCES public.neodash_perguntas(id) ON DELETE CASCADE NOT NULL,
  descricao text NOT NULL,
  interpretacao text NOT NULL DEFAULT '',
  acionaveis text[] NOT NULL DEFAULT '{}',
  metricas text[] NOT NULL DEFAULT '{}',
  regras_condicionais text[] NOT NULL DEFAULT '{}',
  parametros text NOT NULL DEFAULT '',
  emergentes text NOT NULL DEFAULT '',
  criado_em timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_neodash_insights_v2_pergunta ON public.neodash_insights_v2(pergunta_id);

-- RLS
ALTER TABLE public.neodash_perguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neodash_insights_v2 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to perguntas" ON public.neodash_perguntas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to insights_v2" ON public.neodash_insights_v2 FOR ALL USING (true) WITH CHECK (true);

-- Seed the 6 strategic questions
INSERT INTO public.neodash_perguntas (label, pergunta) VALUES
  ('P1', 'Quais são os principais indicadores de performance do negócio e como eles se relacionam?'),
  ('P2', 'Quais padrões emergentes os dados revelam sobre o comportamento dos clientes?'),
  ('P3', 'Quais são os gargalos operacionais que impactam a eficiência da organização?'),
  ('P4', 'Como as tendências de mercado estão influenciando nossas métricas internas?'),
  ('P5', 'Quais oportunidades de otimização podem ser derivadas da análise cruzada de dados?'),
  ('P6', 'Quais riscos estratégicos os dados atuais sinalizam para os próximos trimestres?');
