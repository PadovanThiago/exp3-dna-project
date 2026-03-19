
-- 1. Create neodash_projetos table
CREATE TABLE public.neodash_projetos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cliente TEXT DEFAULT '',
  dashboard_origem TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'ativo',
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Enable RLS (permissive)
ALTER TABLE public.neodash_projetos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to projetos" ON public.neodash_projetos FOR ALL USING (true) WITH CHECK (true);

-- 3. Create default project and assign existing perguntas
DO $$
DECLARE
  default_project_id UUID;
BEGIN
  INSERT INTO public.neodash_projetos (nome, cliente, dashboard_origem, status)
  VALUES ('Projeto Padrão', '', '', 'ativo')
  RETURNING id INTO default_project_id;

  -- Add projeto_id column
  ALTER TABLE public.neodash_perguntas ADD COLUMN projeto_id UUID REFERENCES public.neodash_projetos(id) ON DELETE CASCADE;

  -- Assign all existing perguntas to the default project
  UPDATE public.neodash_perguntas SET projeto_id = default_project_id WHERE projeto_id IS NULL;

  -- Make it NOT NULL after backfill
  ALTER TABLE public.neodash_perguntas ALTER COLUMN projeto_id SET NOT NULL;
END $$;

-- 4. Create indexes
CREATE INDEX idx_neodash_perguntas_projeto_id ON public.neodash_perguntas(projeto_id);
CREATE INDEX idx_neodash_projetos_status ON public.neodash_projetos(status);
