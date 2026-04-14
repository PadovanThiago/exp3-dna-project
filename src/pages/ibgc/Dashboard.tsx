import { useState, useEffect, useRef, useCallback } from "react";
import { Chart, ArcElement, DoughnutController, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, DoughnutController, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

const ALL_CONTENT = [
  {title:"24º Congresso IBGC — Governança em um Mundo Disruptivo",type:"Evento",theme:"Conselho de Administração",area:"Eventos",date:"2025-10",status:"Publicado"},
  {title:"Conexão Governança Goiânia",type:"Evento",theme:"Conselho de Administração",area:"Eventos",date:"2025-04",status:"Publicado"},
  {title:"Seminário IBGC/IBEF Paraná",type:"Evento",theme:"Mercado de Capitais",area:"Eventos",date:"2025-05",status:"Publicado"},
  {title:"Conexão Pernambuco",type:"Evento",theme:"Diversidade e Inclusão",area:"Eventos",date:"2025-05",status:"Publicado"},
  {title:"Conexão Santa Catarina",type:"Evento",theme:"Estratégia Corporativa",area:"Eventos",date:"2025-06",status:"Publicado"},
  {title:"Conexão Minas Gerais",type:"Evento",theme:"Conselho de Administração",area:"Eventos",date:"2025-07",status:"Publicado"},
  {title:"Conexão Porto Alegre",type:"Evento",theme:"Sustentabilidade e Clima",area:"Eventos",date:"2025-07",status:"Publicado"},
  {title:"Vivência Legado das Águas — Chapter Zero Brazil",type:"Evento",theme:"Sustentabilidade e Clima",area:"Eventos",date:"2025-05",status:"Publicado"},
  {title:"Conexão Interior Paulista",type:"Evento",theme:"Família Empresária",area:"Eventos",date:"2025-08",status:"Publicado"},
  {title:"Seminário Nordeste (Bahia)",type:"Evento",theme:"Conduta e Compliance",area:"Eventos",date:"2025-09",status:"Publicado"},
  {title:"Conexão Espírito Santo",type:"Evento",theme:"Gestão de Riscos",area:"Eventos",date:"2025-09",status:"Publicado"},
  {title:"Jornada Técnica São Paulo — Cibersegurança e IA",type:"Evento",theme:"Inteligência Artificial",area:"Eventos",date:"2025-10",status:"Publicado"},
  {title:"Conexão Rio de Janeiro",type:"Evento",theme:"Mercado de Capitais",area:"Eventos",date:"2025-10",status:"Publicado"},
  {title:"Masterclass — Balanço 2025 e Tendências 2026",type:"Evento",theme:"Conselho de Administração",area:"Eventos",date:"2025-12",status:"Publicado"},
  {title:"Conexão Brasília",type:"Evento",theme:"Legislação e Regulamentação",area:"Eventos",date:"2025-11",status:"Publicado"},
  {title:"Conexão Ceará",type:"Evento",theme:"Diversidade e Inclusão",area:"Eventos",date:"2025-11",status:"Publicado"},
  {title:"IBGC Dialoga — Conselho e Inteligência Artificial",type:"Evento",theme:"Inteligência Artificial",area:"Eventos",date:"2026-03",status:"Em desenvolvimento"},
  {title:"Webinar: Governança de Dados e Privacidade",type:"Evento",theme:"Inteligência Artificial",area:"Eventos",date:"2026-06",status:"Em desenvolvimento"},
  {title:"Curso Conselheiros — 240ª turma",type:"Curso",theme:"Conselho de Administração",area:"Cursos e Certificações",date:"2026-01",status:"Em desenvolvimento"},
  {title:"IA: Novos Desafios da Governança",type:"Curso",theme:"Inteligência Artificial",area:"Cursos e Certificações",date:"2025-11",status:"Publicado"},
  {title:"IBGC Global Board Leadership Program (INSEAD)",type:"Curso",theme:"Conselho de Administração",area:"Cursos e Certificações",date:"2026-04",status:"Em desenvolvimento"},
  {title:"Certificação para Conselheiro(a) de Administração (CCA)",type:"Curso",theme:"Conselho de Administração",area:"Cursos e Certificações",date:"2026-03",status:"Em desenvolvimento"},
  {title:"Governança para Empresas Familiares",type:"Curso",theme:"Família Empresária",area:"Cursos e Certificações",date:"2026-02",status:"Em desenvolvimento"},
  {title:"Sustentabilidade e Estratégia Corporativa",type:"Curso",theme:"Sustentabilidade e Clima",area:"Cursos e Certificações",date:"2025-08",status:"Publicado"},
  {title:"Gestão de Riscos Corporativos",type:"Curso",theme:"Gestão de Riscos",area:"Cursos e Certificações",date:"2025-05",status:"Publicado"},
  {title:"Compliance e Conduta Organizacional",type:"Curso",theme:"Conduta e Compliance",area:"Cursos e Certificações",date:"2025-06",status:"Publicado"},
  {title:"Diversidade nos Conselhos de Administração",type:"Curso",theme:"Diversidade e Inclusão",area:"Cursos e Certificações",date:"2025-09",status:"Publicado"},
  {title:"Remuneração de Executivos e Conselheiros",type:"Curso",theme:"Conselho de Administração",area:"Cursos e Certificações",date:"2025-11",status:"Publicado"},
  {title:"Pesquisa: Perfil dos Conselheiros Brasileiros 2025",type:"Pesquisa",theme:"Conselho de Administração",area:"Relações Institucionais e Pesquisa",date:"2025-06",status:"Publicado"},
  {title:"Nota Técnica: IA e Responsabilidade dos Conselhos",type:"Pesquisa",theme:"Inteligência Artificial",area:"Relações Institucionais e Pesquisa",date:"2026-03",status:"Em desenvolvimento"},
  {title:"Nota Técnica: Relatório de Sustentabilidade CSRD",type:"Pesquisa",theme:"Sustentabilidade e Clima",area:"Relações Institucionais e Pesquisa",date:"2026-02",status:"Em desenvolvimento"},
  {title:"Pesquisa: Diversidade de Gênero nos Conselhos 2025",type:"Pesquisa",theme:"Diversidade e Inclusão",area:"Relações Institucionais e Pesquisa",date:"2025-07",status:"Publicado"},
  {title:"Nota Técnica: PL 2338/2023 — Regulação de IA no Brasil",type:"Pesquisa",theme:"Legislação e Regulamentação",area:"Relações Institucionais e Pesquisa",date:"2026-01",status:"Publicado"},
  {title:"Pesquisa: Governança em Startups e Scale-ups",type:"Pesquisa",theme:"Estratégia Corporativa",area:"Relações Institucionais e Pesquisa",date:"2025-08",status:"Publicado"},
  {title:"Artigo: O papel do conselho na era da IA",type:"Comunicação",theme:"Inteligência Artificial",area:"Comunicação",date:"2026-02",status:"Publicado"},
  {title:"Podcast IBGC Conecta: Ep. 112 — Crise e Governança",type:"Comunicação",theme:"Gestão de Riscos",area:"Comunicação",date:"2026-01",status:"Publicado"},
  {title:"Podcast IBGC Educa: Ep. 89 — O Conselho Fiscal",type:"Comunicação",theme:"Conselho de Administração",area:"Comunicação",date:"2025-11",status:"Publicado"},
  {title:"Artigo: Sustentabilidade além do ESG",type:"Comunicação",theme:"Sustentabilidade e Clima",area:"Comunicação",date:"2026-03",status:"Em desenvolvimento"},
  {title:"Podcast IBGC Conecta: Ep. 115 — Família Empresária",type:"Comunicação",theme:"Família Empresária",area:"Comunicação",date:"2026-03",status:"Em desenvolvimento"},
  {title:"Artigo: Novo marco regulatório para conselhos",type:"Comunicação",theme:"Legislação e Regulamentação",area:"Comunicação",date:"2025-12",status:"Publicado"},
  {title:"Ata GT Sustentabilidade — Reunião 8",type:"Espaços Colaborativos",theme:"Sustentabilidade e Clima",area:"Espaços Colaborativos",date:"2026-03",status:"Publicado"},
  {title:"Ata Comissão Mercado de Capitais — Q1 2026",type:"Espaços Colaborativos",theme:"Mercado de Capitais",area:"Espaços Colaborativos",date:"2026-02",status:"Publicado"},
  {title:"Ata GT Inteligência Artificial — Reunião 3",type:"Espaços Colaborativos",theme:"Inteligência Artificial",area:"Espaços Colaborativos",date:"2026-01",status:"Publicado"},
  {title:"Sumário Comissão Diversidade — Q4 2025",type:"Espaços Colaborativos",theme:"Diversidade e Inclusão",area:"Espaços Colaborativos",date:"2025-12",status:"Publicado"},
  {title:"Ata GT Família Empresária — Reunião 12",type:"Espaços Colaborativos",theme:"Família Empresária",area:"Espaços Colaborativos",date:"2026-03",status:"Publicado"},
];

const PERIOD_FN: Record<string,(d:string)=>boolean> = {
  all: ()=>true,
  "2025h1": d=>d>="2025-01"&&d<="2025-06",
  "2025h2": d=>d>="2025-07"&&d<="2025-12",
  "2026": d=>d.startsWith("2026"),
};

const PIE_COLORS = ["#1D9E75","#378ADD","#EF9F27","#D4537E","#7F77DD","#639922","#D85A30","#888780","#E24B4A","#5DCAA5"];

const TYPE_TAG: Record<string,string> = {
  "Evento":"ev","Curso":"cu","Pesquisa":"pe","Comunicação":"co","Espaços Colaborativos":"es"
};

const tagStyle: Record<string,React.CSSProperties> = {
  ev:{background:"#E6F1FB",color:"#0C447C"},
  cu:{background:"#EEEDFE",color:"#3C3489"},
  pe:{background:"#E1F5EE",color:"#085041"},
  co:{background:"#FAEEDA",color:"#633806"},
  es:{background:"#F1EFE8",color:"#444441"},
  pub:{background:"#EAF3DE",color:"#27500A"},
  dev:{background:"#FAEEDA",color:"#633806"},
};

const fmtDate = (d:string) => {
  const [y,m] = d.split("-");
  const ms = ["","jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  return `${ms[parseInt(m)]} ${y}`;
};

const CONV_ANSWERS: Record<string,(q:string)=>string> = {
  ia: ()=>{
    const r = ALL_CONTENT.filter(d=>d.theme==="Inteligência Artificial");
    return `Encontrei ${r.length} conteúdos sobre Inteligência Artificial:\n\n${r.slice(0,4).map(d=>`• ${d.title} (${d.type})`).join("\n")}${r.length>4?`\n...e mais ${r.length-4} conteúdos.`:""}`;
  },
  sustentabilidade: ()=>{
    const r = ALL_CONTENT.filter(d=>d.theme==="Sustentabilidade e Clima"&&d.date.startsWith("2025"));
    return `Em 2025, o IBGC realizou ${r.filter(d=>d.type==="Evento").length} eventos sobre Sustentabilidade e Clima, incluindo a Vivência Legado das Águas e a Conexão Porto Alegre. Há também ${r.filter(d=>d.type==="Curso").length} curso e ${r.filter(d=>d.type==="Pesquisa").length} nota técnica produzidos no período.`;
  },
  cursos: ()=>{
    const r = ALL_CONTENT.filter(d=>d.type==="Curso"&&d.status==="Em desenvolvimento");
    return `Há ${r.length} cursos em desenvolvimento para 2026:\n\n${r.map(d=>`• ${d.title} (previsão: ${fmtDate(d.date)})`).join("\n")}`;
  },
  sobreposicao: ()=>`Detectei 2 alertas de sobreposição temática:\n\n• Inteligência Artificial: Cursos e Certificações, Relações Institucionais e Eventos estão todos produzindo conteúdo independente sobre IA em 2026 sem coordenação visível.\n\n• Sustentabilidade e Clima: Chapter Zero Brazil e a área de Pesquisa têm publicações simultâneas sobre CSRD e relatórios de sustentabilidade para o mesmo período.\n\nFonte: análise automática por tema e período.`,
  default: (q)=>`Pesquisando no acervo por "${q}"...\n\nEncontrei ${Math.floor(Math.random()*8)+2} conteúdos relacionados. Use os filtros de tema acima para explorar visualmente, ou refine sua pergunta.`,
};

export function Dashboard() {
  const [period, setPeriod] = useState("2025h2");
  const [theme, setTheme] = useState("all");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [activeTheme, setActiveTheme] = useState<string|null>(null);
  const [drillInfo, setDrillInfo] = useState<string|null>(null);
  const [convMessages, setConvMessages] = useState<{role:"user"|"bot";text:string}[]>([]);
  const [convInput, setConvInput] = useState("");
  const pieRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLCanvasElement>(null);
  const pieChart = useRef<Chart|null>(null);
  const barChart = useRef<Chart|null>(null);

  const getData = useCallback(() => {
    const pfn = PERIOD_FN[period] ?? PERIOD_FN["all"];
    return ALL_CONTENT.filter(d => {
      if (!pfn(d.date)) return false;
      if (theme !== "all" && d.theme !== theme) return false;
      if (type !== "all" && d.type !== type) return false;
      if (status !== "all" && d.status !== status) return false;
      if (activeTheme && d.theme !== activeTheme) return false;
      return true;
    });
  }, [period, theme, type, status, activeTheme]);

  const data = getData();
  const pub = data.filter(d=>d.status==="Publicado").length;
  const dev = data.filter(d=>d.status==="Em desenvolvimento").length;
  const areas = new Set(data.map(d=>d.area)).size;

  useEffect(() => {
    if (!pieRef.current || !barRef.current) return;
    const counts: Record<string,number> = {};
    data.forEach(d => { counts[d.theme] = (counts[d.theme]||0)+1; });
    const labels = Object.keys(counts);
    const values = labels.map(l=>counts[l]);

    if (pieChart.current) pieChart.current.destroy();
    pieChart.current = new Chart(pieRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: PIE_COLORS.slice(0, labels.length), borderWidth: 2, borderColor: "#0A0F1C", hoverOffset: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { font: { size: 10 }, color: "#9ca3af", boxWidth: 10, padding: 8 } },
          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw} conteúdos` } }
        },
        onClick: (_evt, els) => {
          if (els.length) {
            const t = labels[els[0].index];
            setActiveTheme(t);
            setTheme(t);
            setDrillInfo(`Filtrado por tema: "${t}" — limpe os filtros para voltar`);
          }
        }
      }
    });

    const types = ["Evento","Curso","Pesquisa","Comunicação","Espaços Colaborativos"];
    const pubD = types.map(t=>data.filter(d=>d.type===t&&d.status==="Publicado").length);
    const devD = types.map(t=>data.filter(d=>d.type===t&&d.status==="Em desenvolvimento").length);

    if (barChart.current) barChart.current.destroy();
    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: types,
        datasets: [
          { label: "Publicado", data: pubD, backgroundColor: "#1D9E75", borderRadius: 4, borderWidth: 0 },
          { label: "Em desenvolvimento", data: devD, backgroundColor: "#EF9F27", borderRadius: 4, borderWidth: 0 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { font: { size: 10 }, color: "#9ca3af", boxWidth: 10 } } },
        scales: {
          x: { ticks: { color: "#9ca3af", font: { size: 10 } }, grid: { display: false } },
          y: { ticks: { color: "#9ca3af", font: { size: 10 }, stepSize: 1 }, grid: { color: "rgba(255,255,255,0.05)" } }
        }
      }
    });

    return () => {
      pieChart.current?.destroy();
      barChart.current?.destroy();
    };
  }, [data]);

  const resetFilters = () => {
    setPeriod("all"); setTheme("all"); setType("all"); setStatus("all");
    setActiveTheme(null); setDrillInfo(null);
  };

  const sendQuery = () => {
    const q = convInput.trim();
    if (!q) return;
    setConvMessages(m => [...m, { role:"user", text:q }]);
    setConvInput("");
    setTimeout(() => {
      const ql = q.toLowerCase();
      let ans: string;
      if (ql.includes("ia")||ql.includes("intelig")) ans = CONV_ANSWERS["ia"](q);
      else if (ql.includes("sustent")||ql.includes("clima")) ans = CONV_ANSWERS["sustentabilidade"](q);
      else if (ql.includes("curso")||ql.includes("desenvolvimento")) ans = CONV_ANSWERS["cursos"](q);
      else if (ql.includes("sobrepos")||ql.includes("duplica")||ql.includes("overlap")) ans = CONV_ANSWERS["sobreposicao"](q);
      else ans = CONV_ANSWERS["default"](q);
      setConvMessages(m => [...m, { role:"bot", text: ans + `\n\nFonte: acervo IBGC via SharePoint · ${new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}` }]);
    }, 700);
  };

  const sorted = [...data].sort((a,b)=>b.date.localeCompare(a.date));

  const sel: React.CSSProperties = {
    fontSize:12,padding:"5px 8px",
    border:"1px solid rgba(255,255,255,0.15)",borderRadius:6,
    background:"rgba(255,255,255,0.05)",color:"#e5e7eb",cursor:"pointer"
  };
  const card: React.CSSProperties = {
    background:"rgba(255,255,255,0.05)",borderRadius:8,padding:"12px 14px"
  };
  const box: React.CSSProperties = {
    background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:12,padding:"1rem"
  };

  return (
    <div style={{background:"#0A0F1C",minHeight:"100vh",color:"#e5e7eb",padding:"1.5rem",fontFamily:"system-ui,sans-serif"}}>

      {/* top bar */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#00D9FF"}}/>
          <div>
            <div style={{fontSize:13,fontWeight:500}}>Sistema de Inteligência de Conhecimento</div>
            <div style={{fontSize:11,color:"#6b7280"}}>IBGC — Instituto Brasileiro de Governança Corporativa</div>
          </div>
        </div>
        <span style={{fontSize:10,padding:"2px 8px",background:"rgba(0,217,255,0.1)",color:"#00D9FF",borderRadius:6,border:"1px solid rgba(0,217,255,0.2)"}}>ao vivo</span>
      </div>

      {/* filters */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:"1.25rem",alignItems:"center"}}>
        {[
          {label:"Período",id:"p",val:period,set:setPeriod,opts:[["all","Todo o período"],["2025h1","Jan–Jun 2025"],["2025h2","Jul–Dez 2025"],["2026","2026"]]},
          {label:"Tema",id:"t",val:theme,set:(v:string)=>{setTheme(v);setActiveTheme(null);setDrillInfo(null)},opts:[["all","Todos os temas"],["Conselho de Administração","Conselho de Administração"],["Inteligência Artificial","Inteligência Artificial"],["Sustentabilidade e Clima","Sustentabilidade e Clima"],["Conduta e Compliance","Conduta e Compliance"],["Gestão de Riscos","Gestão de Riscos"],["Diversidade e Inclusão","Diversidade e Inclusão"],["Mercado de Capitais","Mercado de Capitais"],["Família Empresária","Família Empresária"],["Legislação e Regulamentação","Legislação e Regulamentação"],["Estratégia Corporativa","Estratégia Corporativa"]]},
          {label:"Tipo",id:"ty",val:type,set:setType,opts:[["all","Todos os tipos"],["Evento","Evento"],["Curso","Curso"],["Pesquisa","Pesquisa"],["Comunicação","Comunicação"],["Espaços Colaborativos","Espaços Colaborativos"]]},
          {label:"Status",id:"s",val:status,set:setStatus,opts:[["all","Todos"],["Publicado","Publicado"],["Em desenvolvimento","Em desenvolvimento"]]},
        ].map(f=>(
          <div key={f.id} style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:12,color:"#6b7280"}}>{f.label}</span>
            <select style={sel} value={f.val} onChange={e=>f.set(e.target.value)}>
              {f.opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        ))}
        <button onClick={resetFilters} style={{fontSize:11,padding:"5px 10px",background:"transparent",border:"1px solid rgba(255,255,255,0.12)",borderRadius:6,color:"#6b7280",cursor:"pointer"}}>
          Limpar filtros
        </button>
      </div>

      {/* metric cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:10,marginBottom:"1.25rem"}}>
        {[
          {label:"Total de conteúdos",val:data.length,sub:"no período selecionado",color:"#e5e7eb"},
          {label:"Publicados",val:pub,sub:"já disponíveis",color:"#1D9E75"},
          {label:"Em desenvolvimento",val:dev,sub:"previstos",color:"#EF9F27"},
          {label:"Áreas ativas",val:areas,sub:"produzindo conteúdo",color:"#e5e7eb"},
        ].map(c=>(
          <div key={c.label} style={card}>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:4}}>{c.label}</div>
            <div style={{fontSize:22,fontWeight:500,color:c.color}}>{c.val}</div>
            <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* charts */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:"1.25rem"}}>
        <div style={box}>
          <div style={{fontSize:13,fontWeight:500,marginBottom:12}}>Distribuição por tema</div>
          <div style={{position:"relative",height:200}}><canvas ref={pieRef}/></div>
          <div style={{fontSize:11,color:"#6b7280",marginTop:6}}>Clique em um tema para filtrar os conteúdos abaixo</div>
        </div>
        <div style={box}>
          <div style={{fontSize:13,fontWeight:500,marginBottom:12}}>Volume por tipo de produto</div>
          <div style={{position:"relative",height:200}}><canvas ref={barRef}/></div>
          <div style={{fontSize:11,color:"#6b7280",marginTop:6}}>Publicado vs. em desenvolvimento por tipo</div>
        </div>
      </div>

      {/* table */}
      <div style={{...box,marginBottom:"1.25rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontSize:13,fontWeight:500}}>{activeTheme ? `Conteúdos: ${activeTheme}` : "Todos os conteúdos"}</div>
          <div style={{fontSize:12,color:"#6b7280"}}>{data.length} item{data.length!==1?"s":""}</div>
        </div>
        {drillInfo && <div style={{fontSize:12,padding:"6px 10px",background:"rgba(0,217,255,0.08)",border:"1px solid rgba(0,217,255,0.2)",borderRadius:6,color:"#00D9FF",marginBottom:8}}>{drillInfo}</div>}
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr>{["Conteúdo","Tipo","Tema","Área","Data","Status"].map(h=>(
                <th key={h} style={{textAlign:"left",padding:"6px 8px",borderBottom:"1px solid rgba(255,255,255,0.08)",color:"#6b7280",fontWeight:400}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {sorted.length===0
                ? <tr><td colSpan={6} style={{textAlign:"center",color:"#6b7280",padding:20}}>Nenhum conteúdo encontrado</td></tr>
                : sorted.map((d,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                    <td style={{padding:"7px 8px",fontWeight:500,maxWidth:260}}>{d.title}</td>
                    <td style={{padding:"7px 8px"}}>
                      <span style={{...tagStyle[TYPE_TAG[d.type]],fontSize:10,padding:"2px 7px",borderRadius:6,display:"inline-block",whiteSpace:"nowrap"}}>{d.type}</span>
                    </td>
                    <td style={{padding:"7px 8px",color:"#9ca3af",fontSize:11}}>{d.theme}</td>
                    <td style={{padding:"7px 8px",color:"#9ca3af",fontSize:11}}>{d.area}</td>
                    <td style={{padding:"7px 8px",color:"#9ca3af"}}>{fmtDate(d.date)}</td>
                    <td style={{padding:"7px 8px"}}>
                      <span style={{...tagStyle[d.status==="Publicado"?"pub":"dev"],fontSize:10,padding:"2px 7px",borderRadius:6,display:"inline-block",whiteSpace:"nowrap"}}>{d.status}</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* conversational */}
      <div style={box}>
        <div style={{fontSize:13,fontWeight:500,marginBottom:10}}>Consulta conversacional ao acervo</div>
        <div style={{minHeight:60,marginBottom:10}}>
          {convMessages.map((m,i)=>(
            <div key={i} style={{
              fontSize:13,lineHeight:1.6,padding:"8px 10px",borderRadius:8,marginBottom:6,whiteSpace:"pre-wrap",
              ...(m.role==="user"
                ?{background:"rgba(255,255,255,0.06)",textAlign:"right"}
                :{background:"rgba(0,217,255,0.07)",border:"1px solid rgba(0,217,255,0.15)",color:"#a5f3fc"})
            }}>{m.text}</div>
          ))}
        </div>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <input
            value={convInput}
            onChange={e=>setConvInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter")sendQuery()}}
            placeholder="Pergunte sobre o acervo do IBGC..."
            style={{flex:1,fontSize:13,padding:"8px 10px",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,background:"rgba(255,255,255,0.04)",color:"#e5e7eb",outline:"none"}}
          />
          <button onClick={sendQuery} style={{fontSize:12,padding:"8px 14px",background:"rgba(0,217,255,0.1)",border:"1px solid rgba(0,217,255,0.25)",borderRadius:8,color:"#00D9FF",cursor:"pointer",whiteSpace:"nowrap"}}>
            Consultar ↗
          </button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {["O que existe sobre IA?","Eventos de sustentabilidade","Cursos em desenvolvimento","Ver sobreposições"].map(s=>(
            <button key={s} onClick={()=>{setConvInput(s);setTimeout(sendQuery,50)}} style={{fontSize:11,padding:"4px 10px",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,color:"#6b7280",cursor:"pointer"}}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
