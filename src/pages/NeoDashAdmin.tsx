import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus, Pencil, Trash2, MessageSquare, Lightbulb,
  FolderOpen, ChevronRight, Search, LayoutGrid
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// ── Types ──────────────────────────────────────────────
type Topic = {
  id: string;
  name: string;
  description: string | null;
  color: string;
  sort_order: number;
  created_at: string;
};

type Question = {
  id: string;
  topic_id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  sort_order: number;
  created_at: string;
};

type Insight = {
  id: string;
  question_id: string;
  content: string;
  type: string;
  source: string | null;
  created_at: string;
};

const PRIORITY_COLORS: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-exp3-cyan/15 text-exp3-cyan border-exp3-cyan/30",
  high: "bg-exp3-orange/15 text-exp3-orange border-exp3-orange/30",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
};

const STATUS_COLORS: Record<string, string> = {
  open: "bg-exp3-cyan/15 text-exp3-cyan border-exp3-cyan/30",
  in_progress: "bg-exp3-orange/15 text-exp3-orange border-exp3-orange/30",
  resolved: "bg-exp3-emerald/15 text-exp3-emerald border-exp3-emerald/30",
  archived: "bg-muted text-muted-foreground",
};

const INSIGHT_COLORS: Record<string, string> = {
  observation: "bg-exp3-cyan/15 text-exp3-cyan border-exp3-cyan/30",
  hypothesis: "bg-exp3-orange/15 text-exp3-orange border-exp3-orange/30",
  conclusion: "bg-exp3-emerald/15 text-exp3-emerald border-exp3-emerald/30",
  action_item: "bg-primary/15 text-primary border-primary/30",
};

const TOPIC_COLORS = [
  "#06b6d4", "#f97316", "#10b981", "#8b5cf6", "#ec4899", "#eab308",
];

// ── Main Component ─────────────────────────────────────
const NeoDashAdmin = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Dialogs
  const [topicDialog, setTopicDialog] = useState(false);
  const [questionDialog, setQuestionDialog] = useState(false);
  const [insightDialog, setInsightDialog] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);

  // Form states
  const [topicForm, setTopicForm] = useState({ name: "", description: "", color: TOPIC_COLORS[0] });
  const [questionForm, setQuestionForm] = useState({ title: "", description: "", priority: "medium", status: "open" });
  const [insightForm, setInsightForm] = useState({ content: "", type: "observation", source: "" });

  // ── Data Fetching ──
  const fetchTopics = useCallback(async () => {
    const { data } = await supabase
      .from("neodash_topics")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setTopics(data as Topic[]);
  }, []);

  const fetchQuestions = useCallback(async () => {
    let query = supabase.from("neodash_questions").select("*").order("sort_order", { ascending: true });
    if (selectedTopic) query = query.eq("topic_id", selectedTopic);
    const { data } = await query;
    if (data) setQuestions(data as Question[]);
  }, [selectedTopic]);

  const fetchInsights = useCallback(async () => {
    if (!selectedQuestion) { setInsights([]); return; }
    const { data } = await supabase
      .from("neodash_insights")
      .select("*")
      .eq("question_id", selectedQuestion)
      .order("created_at", { ascending: true });
    if (data) setInsights(data as Insight[]);
  }, [selectedQuestion]);

  useEffect(() => {
    fetchTopics().then(() => setLoading(false));
  }, [fetchTopics]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);
  useEffect(() => { fetchInsights(); }, [fetchInsights]);

  // ── Topic CRUD ──
  const openTopicDialog = (topic?: Topic) => {
    if (topic) {
      setEditingTopic(topic);
      setTopicForm({ name: topic.name, description: topic.description || "", color: topic.color });
    } else {
      setEditingTopic(null);
      setTopicForm({ name: "", description: "", color: TOPIC_COLORS[topics.length % TOPIC_COLORS.length] });
    }
    setTopicDialog(true);
  };

  const saveTopic = async () => {
    if (!topicForm.name.trim()) return;
    if (editingTopic) {
      await supabase.from("neodash_topics").update(topicForm).eq("id", editingTopic.id);
      toast({ title: "Tópico atualizado" });
    } else {
      await supabase.from("neodash_topics").insert({ ...topicForm, sort_order: topics.length });
      toast({ title: "Tópico criado" });
    }
    setTopicDialog(false);
    fetchTopics();
  };

  const deleteTopic = async (id: string) => {
    await supabase.from("neodash_topics").delete().eq("id", id);
    if (selectedTopic === id) { setSelectedTopic(null); setSelectedQuestion(null); }
    toast({ title: "Tópico removido" });
    fetchTopics();
  };

  // ── Question CRUD ──
  const openQuestionDialog = (question?: Question) => {
    if (question) {
      setEditingQuestion(question);
      setQuestionForm({ title: question.title, description: question.description || "", priority: question.priority, status: question.status });
    } else {
      setEditingQuestion(null);
      setQuestionForm({ title: "", description: "", priority: "medium", status: "open" });
    }
    setQuestionDialog(true);
  };

  const saveQuestion = async () => {
    if (!questionForm.title.trim() || !selectedTopic) return;
    if (editingQuestion) {
      await supabase.from("neodash_questions").update(questionForm).eq("id", editingQuestion.id);
      toast({ title: "Pergunta atualizada" });
    } else {
      await supabase.from("neodash_questions").insert({ ...questionForm, topic_id: selectedTopic, sort_order: questions.length });
      toast({ title: "Pergunta criada" });
    }
    setQuestionDialog(false);
    fetchQuestions();
  };

  const deleteQuestion = async (id: string) => {
    await supabase.from("neodash_questions").delete().eq("id", id);
    if (selectedQuestion === id) setSelectedQuestion(null);
    toast({ title: "Pergunta removida" });
    fetchQuestions();
  };

  // ── Insight CRUD ──
  const openInsightDialog = (insight?: Insight) => {
    if (insight) {
      setEditingInsight(insight);
      setInsightForm({ content: insight.content, type: insight.type, source: insight.source || "" });
    } else {
      setEditingInsight(null);
      setInsightForm({ content: "", type: "observation", source: "" });
    }
    setInsightDialog(true);
  };

  const saveInsight = async () => {
    if (!insightForm.content.trim() || !selectedQuestion) return;
    if (editingInsight) {
      await supabase.from("neodash_insights").update(insightForm).eq("id", editingInsight.id);
      toast({ title: "Insight atualizado" });
    } else {
      await supabase.from("neodash_insights").insert({ ...insightForm, question_id: selectedQuestion });
      toast({ title: "Insight criado" });
    }
    setInsightDialog(false);
    fetchInsights();
  };

  const deleteInsight = async (id: string) => {
    await supabase.from("neodash_insights").delete().eq("id", id);
    toast({ title: "Insight removido" });
    fetchInsights();
  };

  // ── Filtered data ──
  const filteredQuestions = questions.filter(
    (q) => q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTopic = topics.find((t) => t.id === selectedTopic);
  const activeQuestion = questions.find((q) => q.id === selectedQuestion);

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

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Mapa do Conhecimento</h1>
          <Badge variant="outline" className="text-xs text-muted-foreground border-border">
            NeoDash
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{topics.length} tópicos</span>
          <span>·</span>
          <span>{questions.length} perguntas</span>
        </div>
      </header>

      {/* Main content — 3 columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Col 1: Topics */}
        <aside className="w-64 flex-shrink-0 border-r border-border bg-card/40 flex flex-col">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tópicos</span>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openTopicDialog()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => { setSelectedTopic(topic.id); setSelectedQuestion(null); }}
                className={`w-full text-left rounded-lg px-3 py-2.5 group flex items-center gap-2.5 transition-colors ${
                  selectedTopic === topic.id
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: topic.color }}
                />
                <span className="text-sm font-medium truncate flex-1">{topic.name}</span>
                <div className="hidden group-hover:flex items-center gap-0.5">
                  <button onClick={(e) => { e.stopPropagation(); openTopicDialog(topic); }} className="p-1 rounded hover:bg-accent">
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteTopic(topic.id); }} className="p-1 rounded hover:bg-destructive/20 text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </button>
            ))}
            {topics.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-xs text-muted-foreground">Nenhum tópico ainda</p>
                <Button size="sm" variant="ghost" className="mt-2 text-xs" onClick={() => openTopicDialog()}>
                  <Plus className="h-3 w-3 mr-1" /> Criar tópico
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Col 2: Questions */}
        <section className="w-80 flex-shrink-0 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {activeTopic && (
                  <>
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeTopic.color }} />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate max-w-[140px]">
                      {activeTopic.name}
                    </span>
                  </>
                )}
                {!activeTopic && (
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Perguntas</span>
                )}
              </div>
              {selectedTopic && (
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openQuestionDialog()}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
            {selectedTopic && (
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar perguntas…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-8 text-xs bg-secondary/50"
                />
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
            {!selectedTopic && (
              <div className="text-center py-12">
                <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-xs text-muted-foreground">Selecione um tópico</p>
              </div>
            )}
            {selectedTopic && filteredQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelectedQuestion(q.id)}
                className={`w-full text-left rounded-lg px-3 py-2.5 group transition-colors ${
                  selectedQuestion === q.id
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium leading-snug line-clamp-2">{q.title}</span>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-40" />
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${PRIORITY_COLORS[q.priority]}`}>
                    {q.priority}
                  </Badge>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${STATUS_COLORS[q.status]}`}>
                    {q.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="hidden group-hover:flex items-center gap-0.5 mt-1">
                  <button onClick={(e) => { e.stopPropagation(); openQuestionDialog(q); }} className="p-1 rounded hover:bg-accent">
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteQuestion(q.id); }} className="p-1 rounded hover:bg-destructive/20 text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </button>
            ))}
            {selectedTopic && filteredQuestions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-xs text-muted-foreground">Nenhuma pergunta</p>
                <Button size="sm" variant="ghost" className="mt-2 text-xs" onClick={() => openQuestionDialog()}>
                  <Plus className="h-3 w-3 mr-1" /> Nova pergunta
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Col 3: Insights detail */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {!selectedQuestion ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Lightbulb className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">Selecione uma pergunta para ver os insights</p>
              </div>
            </div>
          ) : (
            <>
              {/* Question header */}
              <div className="flex-shrink-0 p-5 border-b border-border bg-card/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-foreground">{activeQuestion?.title}</h2>
                    {activeQuestion?.description && (
                      <p className="text-sm text-muted-foreground mt-1">{activeQuestion.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={`text-xs ${PRIORITY_COLORS[activeQuestion?.priority || "medium"]}`}>
                        {activeQuestion?.priority}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${STATUS_COLORS[activeQuestion?.status || "open"]}`}>
                        {activeQuestion?.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => openInsightDialog()}>
                    <Plus className="h-4 w-4 mr-1" /> Insight
                  </Button>
                </div>
              </div>

              {/* Insights list */}
              <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-3">
                {insights.length === 0 && (
                  <div className="text-center py-12">
                    <Lightbulb className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                    <p className="text-xs text-muted-foreground">Nenhum insight registrado</p>
                    <Button size="sm" variant="ghost" className="mt-2 text-xs" onClick={() => openInsightDialog()}>
                      <Plus className="h-3 w-3 mr-1" /> Adicionar insight
                    </Button>
                  </div>
                )}
                {insights.map((ins) => (
                  <Card key={ins.id} className="bg-card/60 border-border/50 group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <Badge variant="outline" className={`text-[10px] mb-2 ${INSIGHT_COLORS[ins.type]}`}>
                            {ins.type.replace("_", " ")}
                          </Badge>
                          <p className="text-sm text-foreground leading-relaxed">{ins.content}</p>
                          {ins.source && (
                            <p className="text-xs text-muted-foreground mt-2">Fonte: {ins.source}</p>
                          )}
                        </div>
                        <div className="hidden group-hover:flex items-center gap-0.5 flex-shrink-0">
                          <button onClick={() => openInsightDialog(ins)} className="p-1.5 rounded hover:bg-accent">
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                          <button onClick={() => deleteInsight(ins.id)} className="p-1.5 rounded hover:bg-destructive/20 text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* ── Dialogs ── */}

      {/* Topic dialog */}
      <Dialog open={topicDialog} onOpenChange={setTopicDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTopic ? "Editar Tópico" : "Novo Tópico"}</DialogTitle>
            <DialogDescription>Organize perguntas por tema ou área de conhecimento.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome</label>
              <Input
                value={topicForm.name}
                onChange={(e) => setTopicForm({ ...topicForm, name: e.target.value })}
                placeholder="Ex: Estratégia de Dados"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
              <Textarea
                value={topicForm.description}
                onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })}
                placeholder="Breve descrição do tópico"
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cor</label>
              <div className="flex gap-2">
                {TOPIC_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setTopicForm({ ...topicForm, color: c })}
                    className={`h-7 w-7 rounded-full transition-all ${topicForm.color === c ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110" : "hover:scale-105"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTopicDialog(false)}>Cancelar</Button>
            <Button onClick={saveTopic}>{editingTopic ? "Salvar" : "Criar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question dialog */}
      <Dialog open={questionDialog} onOpenChange={setQuestionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingQuestion ? "Editar Pergunta" : "Nova Pergunta"}</DialogTitle>
            <DialogDescription>Registre perguntas que precisam de investigação.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Pergunta</label>
              <Input
                value={questionForm.title}
                onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                placeholder="Ex: Como medir ROI de analytics?"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
              <Textarea
                value={questionForm.description}
                onChange={(e) => setQuestionForm({ ...questionForm, description: e.target.value })}
                placeholder="Contexto adicional"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Prioridade</label>
                <Select value={questionForm.priority} onValueChange={(v) => setQuestionForm({ ...questionForm, priority: v })}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
                <Select value={questionForm.status} onValueChange={(v) => setQuestionForm({ ...questionForm, status: v })}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuestionDialog(false)}>Cancelar</Button>
            <Button onClick={saveQuestion}>{editingQuestion ? "Salvar" : "Criar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Insight dialog */}
      <Dialog open={insightDialog} onOpenChange={setInsightDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingInsight ? "Editar Insight" : "Novo Insight"}</DialogTitle>
            <DialogDescription>Registre descobertas, hipóteses ou ações.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tipo</label>
              <Select value={insightForm.type} onValueChange={(v) => setInsightForm({ ...insightForm, type: v })}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="observation">Observação</SelectItem>
                  <SelectItem value="hypothesis">Hipótese</SelectItem>
                  <SelectItem value="conclusion">Conclusão</SelectItem>
                  <SelectItem value="action_item">Ação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Conteúdo</label>
              <Textarea
                value={insightForm.content}
                onChange={(e) => setInsightForm({ ...insightForm, content: e.target.value })}
                placeholder="Descreva o insight…"
                rows={4}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Fonte (opcional)</label>
              <Input
                value={insightForm.source}
                onChange={(e) => setInsightForm({ ...insightForm, source: e.target.value })}
                placeholder="URL, documento, reunião…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInsightDialog(false)}>Cancelar</Button>
            <Button onClick={saveInsight}>{editingInsight ? "Salvar" : "Criar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NeoDashAdmin;
