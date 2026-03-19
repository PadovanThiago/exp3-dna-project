import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft, Plus, Pencil, Trash2, Lightbulb, LayoutGrid, X,
  Download, Copy, Check, Link2, Unlink, Zap, Search, Settings,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  ident: string;
  label: string;
  descricao: string;
  interpretacao: string;
  metricas: string[];
  regras_condicionais: string[];
  parametros: string;
  emergentes: string;
  criado_em: string;
};

type Acao = {
  id: string;
  ident: string;
  label: string;
  descricao: string;
  criado_em: string;
};

type InsightAcao = {
  id: string;
  insight_id: string;
  acao_id: string;
};

const EMPTY_INSIGHT = {
  ident: "",
  label: "",
  descricao: "",
  interpretacao: "",
  metricas: [] as string[],
  regras_condicionais: [] as string[],
  parametros: "",
  emergentes: "",
};

const EMPTY_ACAO = {
  ident: "",
  label: "",
  descricao: "",
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

  // Acoes state
  const [allAcoes, setAllAcoes] = useState<Acao[]>([]);
  const [insightAcoes, setInsightAcoes] = useState<Record<string, string[]>>({}); // insight_id -> acao_id[]

  // Dialogs
  const [insightDialog, setInsightDialog] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [form, setForm] = useState(EMPTY_INSIGHT);

  const [acaoDialog, setAcaoDialog] = useState(false);
  const [editingAcao, setEditingAcao] = useState<Acao | null>(null);
  const [acaoForm, setAcaoForm] = useState(EMPTY_ACAO);

  const [linkDialog, setLinkDialog] = useState(false);
  const [linkInsightId, setLinkInsightId] = useState<string | null>(null);
  const [linkSearch, setLinkSearch] = useState("");
  const [selectedAcaoIds, setSelectedAcaoIds] = useState<string[]>([]);

  const [acoesManagerOpen, setAcoesManagerOpen] = useState(false);

  // Perguntas CRUD
  const [perguntasManagerOpen, setPerguntasManagerOpen] = useState(false);
  const [perguntaDialog, setPerguntaDialog] = useState(false);
  const [editingPergunta, setEditingPergunta] = useState<Pergunta | null>(null);
  const [perguntaForm, setPerguntaForm] = useState({ label: "", pergunta: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<Pergunta | null>(null);

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

  const fetchAllAcoes = useCallback(async () => {
    const { data } = await supabase
      .from("neodash_acoes")
      .select("*")
      .order("ident", { ascending: true });
    if (data) setAllAcoes(data);
  }, []);

  const fetchInsightAcoes = useCallback(async (insightIds: string[]) => {
    if (insightIds.length === 0) { setInsightAcoes({}); return; }
    const { data } = await supabase
      .from("neodash_insight_acoes")
      .select("*")
      .in("insight_id", insightIds);
    if (data) {
      const map: Record<string, string[]> = {};
      data.forEach((r: InsightAcao) => {
        if (!map[r.insight_id]) map[r.insight_id] = [];
        map[r.insight_id].push(r.acao_id);
      });
      setInsightAcoes(map);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchPerguntas(), fetchInsightCounts(), fetchAllAcoes()]).then(() => setLoading(false));
  }, [fetchPerguntas, fetchInsightCounts, fetchAllAcoes]);

  useEffect(() => {
    if (selectedPergunta) {
      fetchInsights(selectedPergunta.id);
    }
  }, [selectedPergunta, fetchInsights]);

  useEffect(() => {
    if (insights.length > 0) {
      fetchInsightAcoes(insights.map((i) => i.id));
    } else {
      setInsightAcoes({});
    }
  }, [insights, fetchInsightAcoes]);

  // ── Insight CRUD ──
  const openInsightDialog = (insight?: Insight) => {
    if (insight) {
      setEditingInsight(insight);
      setForm({
        ident: insight.ident,
        label: insight.label,
        descricao: insight.descricao,
        interpretacao: insight.interpretacao,
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

  // ── Acao CRUD ──
  const openAcaoDialog = (acao?: Acao) => {
    if (acao) {
      setEditingAcao(acao);
      setAcaoForm({ ident: acao.ident, label: acao.label, descricao: acao.descricao });
    } else {
      setEditingAcao(null);
      setAcaoForm(EMPTY_ACAO);
    }
    setAcaoDialog(true);
  };

  const saveAcao = async () => {
    if (!acaoForm.ident.trim() || !acaoForm.label.trim()) return;
    if (editingAcao) {
      await supabase.from("neodash_acoes").update(acaoForm).eq("id", editingAcao.id);
      toast({ title: "Ação atualizada" });
    } else {
      await supabase.from("neodash_acoes").insert(acaoForm);
      toast({ title: "Ação criada" });
    }
    setAcaoDialog(false);
    fetchAllAcoes();
  };

  const deleteAcao = async (id: string) => {
    await supabase.from("neodash_acoes").delete().eq("id", id);
    toast({ title: "Ação removida" });
    fetchAllAcoes();
    // Refresh links
    if (insights.length > 0) fetchInsightAcoes(insights.map((i) => i.id));
  };

  // ── Link/Unlink acoes ──
  const openLinkDialog = (insightId: string) => {
    setLinkInsightId(insightId);
    setSelectedAcaoIds(insightAcoes[insightId] || []);
    setLinkSearch("");
    setLinkDialog(true);
  };

  const saveLinkAcoes = async () => {
    if (!linkInsightId) return;
    const current = insightAcoes[linkInsightId] || [];
    const toAdd = selectedAcaoIds.filter((id) => !current.includes(id));
    const toRemove = current.filter((id) => !selectedAcaoIds.includes(id));

    for (const acao_id of toAdd) {
      await supabase.from("neodash_insight_acoes").insert({ insight_id: linkInsightId, acao_id });
    }
    for (const acao_id of toRemove) {
      await supabase.from("neodash_insight_acoes").delete().eq("insight_id", linkInsightId).eq("acao_id", acao_id);
    }

    toast({ title: "Ações vinculadas atualizadas" });
    setLinkDialog(false);
    fetchInsightAcoes(insights.map((i) => i.id));
  };

  const unlinkAcao = async (insightId: string, acaoId: string) => {
    await supabase.from("neodash_insight_acoes").delete().eq("insight_id", insightId).eq("acao_id", acaoId);
    toast({ title: "Ação desvinculada" });
    fetchInsightAcoes(insights.map((i) => i.id));
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
        ident: ins.ident || "",
        label: ins.label || "",
        descricao: ins.descricao || "",
        interpretacao: ins.interpretacao || "",
        metricas: ins.metricas || [],
        regras_condicionais: ins.regras_condicionais || [],
        parametros: ins.parametros || "",
        emergentes: ins.emergentes || "",
        acoes: (insightAcoes[ins.id] || []).map((acaoId) => {
          const acao = allAcoes.find((a) => a.id === acaoId);
          return acao ? { ident: acao.ident, label: acao.label, descricao: acao.descricao } : null;
        }).filter(Boolean),
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

  const getAcoesForInsight = (insightId: string): Acao[] => {
    const ids = insightAcoes[insightId] || [];
    return ids.map((id) => allAcoes.find((a) => a.id === id)).filter(Boolean) as Acao[];
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
          <Button size="sm" variant="outline" onClick={() => setAcoesManagerOpen(true)}>
            <Zap className="h-4 w-4 mr-1" /> Ações
          </Button>
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
            {insights.map((ins) => {
              const linkedAcoes = getAcoesForInsight(ins.id);
              return (
                <Card key={ins.id} className="bg-card/60 border-border/50 group">
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {ins.ident && (
                          <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">{ins.ident}</Badge>
                        )}
                        {ins.label && (
                          <span className="text-sm font-semibold text-foreground">{ins.label}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openLinkDialog(ins.id)} className="p-1.5 rounded hover:bg-accent" title="Vincular ações">
                          <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => openInsightDialog(ins)} className="p-1.5 rounded hover:bg-accent">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => deleteInsight(ins.id)} className="p-1.5 rounded hover:bg-destructive/20 text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Descrição */}
                    <h3 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Descrição</h3>
                    <p className="text-sm text-foreground/90 leading-relaxed mb-4">{ins.descricao}</p>

                    {/* Fields grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ins.interpretacao && <FieldBlock label="Interpretação" value={ins.interpretacao} />}
                      {ins.parametros && <FieldBlock label="Parâmetros" value={ins.parametros} />}
                      {ins.emergentes && <FieldBlock label="Emergentes" value={ins.emergentes} />}
                    </div>

                    {/* Array fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {ins.metricas?.length > 0 && (
                        <ListBlock label="Métricas" items={ins.metricas} color="text-primary" />
                      )}
                      {ins.regras_condicionais?.length > 0 && (
                        <ListBlock label="Regras Condicionais" items={ins.regras_condicionais} color="text-primary" />
                      )}
                    </div>

                    {/* Linked acoes */}
                    {linkedAcoes.length > 0 && (
                      <div className="mt-4 bg-secondary/30 rounded-lg p-3">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground block mb-2">
                          <Zap className="h-3 w-3 inline mr-1" />Ações vinculadas
                        </span>
                        <div className="space-y-2">
                          {linkedAcoes.map((acao) => (
                            <div key={acao.id} className="flex items-start justify-between gap-2 text-xs">
                              <div className="flex-1">
                                <span className="font-mono text-primary mr-1.5">{acao.ident}</span>
                                <span className="font-medium text-foreground">{acao.label}</span>
                                {acao.descricao && <p className="text-muted-foreground mt-0.5">{acao.descricao}</p>}
                              </div>
                              <button onClick={() => unlinkAcao(ins.id, acao.id)} className="p-1 rounded hover:bg-destructive/20 text-destructive flex-shrink-0" title="Desvincular">
                                <Unlink className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>

        {/* Export dialog */}
        <Dialog open={exportDialog} onOpenChange={setExportDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Exportar JSON — {selectedPergunta.label}</DialogTitle>
              <DialogDescription>JSON estruturado pronto para consumo por IA.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1 min-h-0 rounded-lg border border-border bg-secondary/30 p-4">
              <pre className="text-xs text-foreground/80 whitespace-pre font-mono leading-relaxed">
                {buildExportJson()}
              </pre>
            </ScrollArea>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" /> Baixar .json
              </Button>
              <Button onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Insight dialog */}
        <InsightDialog
          open={insightDialog}
          onOpenChange={setInsightDialog}
          editing={!!editingInsight}
          form={form}
          setForm={setForm}
          onSave={saveInsight}
        />

        {/* Link acoes dialog */}
        <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
          <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Vincular ações ao insight</DialogTitle>
              <DialogDescription>Selecione as ações que deseja vincular.</DialogDescription>
            </DialogHeader>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={linkSearch}
                onChange={(e) => setLinkSearch(e.target.value)}
                placeholder="Buscar por ident ou label..."
                className="pl-9 h-9 text-sm"
              />
            </div>
            <ScrollArea className="flex-1 min-h-0 max-h-[50vh]">
              <div className="space-y-1 pr-3">
                {allAcoes
                  .filter((a) => {
                    const q = linkSearch.toLowerCase();
                    return !q || a.ident.toLowerCase().includes(q) || a.label.toLowerCase().includes(q) || a.descricao.toLowerCase().includes(q);
                  })
                  .map((acao) => {
                    const checked = selectedAcaoIds.includes(acao.id);
                    return (
                      <label key={acao.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            if (v) setSelectedAcaoIds([...selectedAcaoIds, acao.id]);
                            else setSelectedAcaoIds(selectedAcaoIds.filter((id) => id !== acao.id));
                          }}
                          className="mt-0.5"
                        />
                        <div className="flex-1 text-sm">
                          <span className="font-mono text-primary mr-1.5">{acao.ident}</span>
                          <span className="font-medium text-foreground">{acao.label}</span>
                          {acao.descricao && <p className="text-xs text-muted-foreground mt-0.5">{acao.descricao}</p>}
                        </div>
                      </label>
                    );
                  })}
                {allAcoes.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">Nenhuma ação cadastrada. Crie uma primeiro.</p>
                )}
              </div>
            </ScrollArea>
            <DialogFooter className="gap-2">
              <Button variant="outline" size="sm" onClick={() => { setLinkDialog(false); openAcaoDialog(); }}>
                <Plus className="h-4 w-4 mr-1" /> Nova ação
              </Button>
              <Button onClick={saveLinkAcoes}>Salvar vínculos</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Acao CRUD dialog */}
        <AcaoDialog
          open={acaoDialog}
          onOpenChange={setAcaoDialog}
          editing={!!editingAcao}
          form={acaoForm}
          setForm={setAcaoForm}
          onSave={saveAcao}
        />

        {/* Acoes Manager dialog */}
        <Dialog open={acoesManagerOpen} onOpenChange={setAcoesManagerOpen}>
          <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Gerenciar Ações</DialogTitle>
              <DialogDescription>Crie, edite ou remova ações disponíveis para vincular a insights.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1 min-h-0 max-h-[60vh]">
              <div className="space-y-2 pr-3">
                {allAcoes.map((acao) => (
                  <div key={acao.id} className="flex items-start justify-between gap-2 p-3 rounded-lg bg-secondary/30 group/acao">
                    <div className="flex-1 text-sm">
                      <span className="font-mono text-primary mr-1.5">{acao.ident}</span>
                      <span className="font-medium text-foreground">{acao.label}</span>
                      {acao.descricao && <p className="text-xs text-muted-foreground mt-0.5">{acao.descricao}</p>}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover/acao:opacity-100 transition-opacity">
                      <button onClick={() => openAcaoDialog(acao)} className="p-1.5 rounded hover:bg-accent">
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteAcao(acao.id)} className="p-1.5 rounded hover:bg-destructive/20 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {allAcoes.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">Nenhuma ação cadastrada.</p>
                )}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button onClick={() => openAcaoDialog()}>
                <Plus className="h-4 w-4 mr-1" /> Nova ação
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            <button key={p.id} onClick={() => setSelectedPergunta(p)} className="text-left group">
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
  open, onOpenChange, editing, form, setForm, onSave,
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ident</label>
            <Input value={form.ident} onChange={(e) => setForm({ ...form, ident: e.target.value })} placeholder="Ex: I1, I2..." className="h-9" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Label</label>
            <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Nome curto do insight" className="h-9" />
          </div>
        </div>
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

const AcaoDialog = ({
  open, onOpenChange, editing, form, setForm, onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: boolean;
  form: typeof EMPTY_ACAO;
  setForm: (v: typeof EMPTY_ACAO) => void;
  onSave: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{editing ? "Editar Ação" : "Nova Ação"}</DialogTitle>
        <DialogDescription>Defina os dados da ação.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ident *</label>
            <Input value={form.ident} onChange={(e) => setForm({ ...form, ident: e.target.value })} placeholder="Ex: A1, A2..." className="h-9" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Label *</label>
            <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Nome da ação" className="h-9" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
          <Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Descrição da ação" rows={3} />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={onSave} disabled={!form.ident.trim() || !form.label.trim()}>{editing ? "Salvar" : "Criar"}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default NeoDashAdmin;
