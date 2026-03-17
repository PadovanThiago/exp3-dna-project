import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft, Plus, Pencil, Trash2, Lightbulb, LayoutGrid, X,
  Download, Copy, Check,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// ── Types ──
type Pergunta = {
  id: string;
  label: string;
  pergunta: string;
  criado_em: string;
};

type Insight = {
  id: string;
  pergunta_id: string;
  descricao: string;
  interpretacao: string;
  acionaveis: string[];
  metricas: string[];
  regras_condicionais: string[];
  parametros: string;
  emergentes: string;
  criado_em: string;
};

const EMPTY_INSIGHT = {
  descricao: "",
  interpretacao: "",
  acionaveis: [] as string[],
  metricas: [] as string[],
  regras_condicionais: [] as string[],
  parametros: "",
  emergentes: "",
};

// ── Array field helper ──
const ArrayField = ({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
}) => {
  const [draft, setDraft] = useState("");
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {items.map((item, i) => (
          <Badge key={i} variant="outline" className="text-xs gap-1 pr-1">
            {item}
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="ml-0.5 hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              e.preventDefault();
              onChange([...items, draft.trim()]);
              setDraft("");
            }
          }}
          placeholder="Digite e pressione Enter"
          className="h-8 text-xs"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 text-xs px-3"
          disabled={!draft.trim()}
          onClick={() => { onChange([...items, draft.trim()]); setDraft(""); }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

// ── Main ──
const NeoDashAdmin = () => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [insightCounts, setInsightCounts] = useState<Record<string, number>>({});
  const [selectedPergunta, setSelectedPergunta] = useState<Pergunta | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog
  const [insightDialog, setInsightDialog] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [form, setForm] = useState(EMPTY_INSIGHT);

  // ── Fetch ──
  const fetchPerguntas = useCallback(async () => {
    const { data } = await supabase
      .from("neodash_perguntas")
      .select("*")
      .order("label", { ascending: true });
    if (data) setPerguntas(data);
  }, []);

  const fetchInsightCounts = useCallback(async () => {
    const { data } = await supabase.from("neodash_insights_v2").select("pergunta_id");
    if (data) {
      const counts: Record<string, number> = {};
      data.forEach((r) => { counts[r.pergunta_id] = (counts[r.pergunta_id] || 0) + 1; });
      setInsightCounts(counts);
    }
  }, []);

  const fetchInsights = useCallback(async (perguntaId: string) => {
    const { data } = await supabase
      .from("neodash_insights_v2")
      .select("*")
      .eq("pergunta_id", perguntaId)
      .order("criado_em", { ascending: true });
    if (data) setInsights(data);
  }, []);

  useEffect(() => {
    Promise.all([fetchPerguntas(), fetchInsightCounts()]).then(() => setLoading(false));
  }, [fetchPerguntas, fetchInsightCounts]);

  useEffect(() => {
    if (selectedPergunta) fetchInsights(selectedPergunta.id);
  }, [selectedPergunta, fetchInsights]);

  // ── Insight CRUD ──
  const openInsightDialog = (insight?: Insight) => {
    if (insight) {
      setEditingInsight(insight);
      setForm({
        descricao: insight.descricao,
        interpretacao: insight.interpretacao,
        acionaveis: insight.acionaveis || [],
        metricas: insight.metricas || [],
        regras_condicionais: insight.regras_condicionais || [],
        parametros: insight.parametros,
        emergentes: insight.emergentes,
      });
    } else {
      setEditingInsight(null);
      setForm(EMPTY_INSIGHT);
    }
    setInsightDialog(true);
  };

  const saveInsight = async () => {
    if (!form.descricao.trim() || !selectedPergunta) return;
    if (editingInsight) {
      await supabase.from("neodash_insights_v2").update(form).eq("id", editingInsight.id);
      toast({ title: "Insight atualizado" });
    } else {
      await supabase.from("neodash_insights_v2").insert({ ...form, pergunta_id: selectedPergunta.id });
      toast({ title: "Insight criado" });
    }
    setInsightDialog(false);
    fetchInsights(selectedPergunta.id);
    fetchInsightCounts();
  };

  const deleteInsight = async (id: string) => {
    if (!selectedPergunta) return;
    await supabase.from("neodash_insights_v2").delete().eq("id", id);
    toast({ title: "Insight removido" });
    fetchInsights(selectedPergunta.id);
    fetchInsightCounts();
  };

  // ── Export ──
  const [exportDialog, setExportDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildExportJson = () => {
    return JSON.stringify({
      pergunta: {
        label: selectedPergunta?.label ?? "",
        texto: selectedPergunta?.pergunta ?? "",
      },
      insights: insights.map((ins) => ({
        descricao: ins.descricao || "",
        interpretacao: ins.interpretacao || "",
        acionaveis: ins.acionaveis || [],
        metricas: ins.metricas || [],
        regras_condicionais: ins.regras_condicionais || [],
        parametros: ins.parametros || "",
        emergentes: ins.emergentes || "",
      })),
    }, null, 2);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildExportJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "JSON copiado" });
  };

  const handleDownload = () => {
    const blob = new Blob([buildExportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedPergunta?.label?.toLowerCase() || "export"}-insights.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Carregando…</p>
        </div>
      </div>
    );
  }

  // ── Detail view ──
  if (selectedPergunta) {
    return (
      <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
        <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-6 py-3 flex items-center gap-3">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setSelectedPergunta(null); setInsights([]); }}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Badge variant="outline" className="text-xs font-mono border-primary/40 text-primary">
            {selectedPergunta.label}
          </Badge>
          <h1 className="text-sm font-medium text-foreground truncate flex-1">{selectedPergunta.pergunta}</h1>
          <Button size="sm" variant="outline" onClick={() => { setCopied(false); setExportDialog(true); }}>
            <Download className="h-4 w-4 mr-1" /> Exportar JSON
          </Button>
          <Button size="sm" onClick={() => openInsightDialog()}>
            <Plus className="h-4 w-4 mr-1" /> Insight
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin p-6 max-w-4xl mx-auto w-full">
          {/* Question card */}
          <Card className="mb-6 bg-card/60 border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-primary font-mono">{selectedPergunta.label}</span>
              </div>
              <p className="text-base text-foreground leading-relaxed">{selectedPergunta.pergunta}</p>
              <p className="text-xs text-muted-foreground mt-3">
                {insights.length} insight{insights.length !== 1 ? "s" : ""} registrado{insights.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          {/* Insights */}
          {insights.length === 0 && (
            <div className="text-center py-16">
              <Lightbulb className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground mb-3">Nenhum insight registrado para esta pergunta</p>
              <Button size="sm" variant="outline" onClick={() => openInsightDialog()}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar insight
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {insights.map((ins) => (
              <Card key={ins.id} className="bg-card/60 border-border/50 group">
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-sm font-semibold text-foreground leading-snug flex-1">Descrição</h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openInsightDialog(ins)} className="p-1.5 rounded hover:bg-accent">
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteInsight(ins.id)} className="p-1.5 rounded hover:bg-destructive/20 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4">{ins.descricao}</p>

                  {/* Fields grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Interpretação */}
                    {ins.interpretacao && (
                      <FieldBlock label="Interpretação" value={ins.interpretacao} />
                    )}
                    {/* Parâmetros */}
                    {ins.parametros && (
                      <FieldBlock label="Parâmetros" value={ins.parametros} />
                    )}
                    {/* Emergentes */}
                    {ins.emergentes && (
                      <FieldBlock label="Emergentes" value={ins.emergentes} />
                    )}
                  </div>

                  {/* Array fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {ins.acionaveis?.length > 0 && (
                      <ListBlock label="Acionáveis" items={ins.acionaveis} color="text-exp3-cyan" />
                    )}
                    {ins.metricas?.length > 0 && (
                      <ListBlock label="Métricas" items={ins.metricas} color="text-exp3-orange" />
                    )}
                    {ins.regras_condicionais?.length > 0 && (
                      <ListBlock label="Regras Condicionais" items={ins.regras_condicionais} color="text-exp3-emerald" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Insight dialog */}
        <InsightDialog
          open={insightDialog}
          onOpenChange={setInsightDialog}
          editing={!!editingInsight}
          form={form}
          setForm={setForm}
          onSave={saveInsight}
        />
      </div>
    );
  }

  // ── List view (main) ──
  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Mapa do Conhecimento</h1>
          <Badge variant="outline" className="text-xs text-muted-foreground border-border">NeoDash</Badge>
        </div>
        <span className="text-xs text-muted-foreground">{perguntas.length} perguntas estratégicas</span>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {perguntas.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPergunta(p)}
              className="text-left group"
            >
              <Card className="h-full bg-card/60 border-border/50 hover:border-primary/40 hover:bg-card/80 transition-all duration-200 cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary font-mono">{p.label}</span>
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      {insightCounts[p.id] || 0} insight{(insightCounts[p.id] || 0) !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors">
                    {p.pergunta}
                  </p>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

// ── Sub-components ──

const FieldBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-secondary/30 rounded-lg p-3">
    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground block mb-1">{label}</span>
    <p className="text-xs text-foreground/80 leading-relaxed">{value}</p>
  </div>
);

const ListBlock = ({ label, items, color }: { label: string; items: string[]; color: string }) => (
  <div className="bg-secondary/30 rounded-lg p-3">
    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">{label}</span>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className={`text-xs leading-relaxed flex items-start gap-1.5 ${color}`}>
          <span className="mt-1.5 h-1 w-1 rounded-full bg-current flex-shrink-0" />
          <span className="text-foreground/80">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const InsightDialog = ({
  open,
  onOpenChange,
  editing,
  form,
  setForm,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: boolean;
  form: typeof EMPTY_INSIGHT;
  setForm: (v: typeof EMPTY_INSIGHT) => void;
  onSave: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{editing ? "Editar Insight" : "Novo Insight"}</DialogTitle>
        <DialogDescription>Preencha os campos do insight estruturado.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição *</label>
          <Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Descrição do insight" rows={3} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Interpretação</label>
          <Textarea value={form.interpretacao} onChange={(e) => setForm({ ...form, interpretacao: e.target.value })} placeholder="Interpretação analítica" rows={2} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Parâmetros</label>
            <Textarea value={form.parametros} onChange={(e) => setForm({ ...form, parametros: e.target.value })} placeholder="Parâmetros relevantes" rows={2} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Emergentes</label>
            <Textarea value={form.emergentes} onChange={(e) => setForm({ ...form, emergentes: e.target.value })} placeholder="Padrões emergentes" rows={2} />
          </div>
        </div>
        <ArrayField label="Acionáveis" items={form.acionaveis} onChange={(v) => setForm({ ...form, acionaveis: v })} />
        <ArrayField label="Métricas" items={form.metricas} onChange={(v) => setForm({ ...form, metricas: v })} />
        <ArrayField label="Regras Condicionais" items={form.regras_condicionais} onChange={(v) => setForm({ ...form, regras_condicionais: v })} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={onSave} disabled={!form.descricao.trim()}>{editing ? "Salvar" : "Criar"}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default NeoDashAdmin;
