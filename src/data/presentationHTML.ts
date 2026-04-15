export const presentationHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EXP³ — Pinheiro Neto Advogados</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0A0F1C;--fg:#E5E7EB;--cyan:#00D9FF;--cyan2:rgba(0,217,255,0.15);--dim:rgba(255,255,255,0.45);--line:rgba(255,255,255,0.08);--card:rgba(255,255,255,0.04);--card2:rgba(255,255,255,0.06);--tr:all .5s cubic-bezier(.4,0,.2,1)}
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--fg);font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.deck{display:flex;height:100vh;overflow:hidden;transition:transform .6s cubic-bezier(.4,0,.2,1)}
.slide{min-width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;padding:5vw 7vw;flex-direction:column;position:relative}
.slide-dark{background:var(--bg)}
.slide-accent{background:linear-gradient(135deg,#0B1120 0%,#0F1A2E 100%)}
.slide-subtle{background:#0C1222}
h1{font-size:clamp(28px,3.4vw,52px);font-weight:300;line-height:1.15;letter-spacing:-.5px;max-width:820px}
h2{font-size:clamp(20px,2vw,30px);font-weight:300;line-height:1.3;color:var(--dim);max-width:700px;margin-top:1rem}
.tag{display:inline-block;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--cyan);border:1px solid rgba(0,217,255,.25);padding:4px 14px;border-radius:999px;margin-bottom:1.8rem}
.logo-sm{position:absolute;bottom:2.5rem;right:3.5rem;font-size:15px;font-weight:300;color:rgba(255,255,255,.12);letter-spacing:3px}
.cyan{color:var(--cyan)}

.s1h{font-size:clamp(52px,7vw,96px);font-weight:200;letter-spacing:6px;color:var(--cyan);margin-bottom:.5rem}
.s1sub{font-size:clamp(13px,1.1vw,16px);color:var(--dim);line-height:1.7;max-width:600px;text-align:center;margin-bottom:2.5rem}
.s1foot{font-size:12px;color:rgba(255,255,255,.25);position:absolute;bottom:3rem}

.s2c{display:grid;grid-template-columns:1fr 60px 1fr;gap:0;max-width:900px;width:100%;margin-top:2rem}
.s2card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:2.2rem 2rem}
.s2vs{display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--dim);font-weight:500}
.s2card h3{font-size:17px;font-weight:600;margin:.8rem 0 .5rem}
.s2card p{font-size:13px;color:var(--dim);line-height:1.65}
.s2icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--cyan2);margin-bottom:.2rem}
.s2icon svg{width:20px;height:20px;stroke:var(--cyan);fill:none;stroke-width:1.5}
.s2note{font-size:13px;color:var(--cyan);margin-top:2rem;text-align:center;opacity:.7}

.s3g{display:grid;grid-template-columns:1fr 60px 1fr;gap:0;max-width:920px;width:100%;margin-top:2rem}
.s3card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:2rem 1.8rem}
.s3card h3{font-size:16px;font-weight:600;margin:.5rem 0}
.s3card p.sub{font-size:12px;color:var(--dim);margin-bottom:.8rem}
.s3card ul{list-style:none;padding:0}
.s3card li{font-size:12.5px;color:var(--dim);padding:4px 0;padding-left:16px;position:relative}
.s3card li::before{content:"";position:absolute;left:0;top:10px;width:6px;height:6px;border-radius:50%;background:var(--cyan);opacity:.5}
.s3plus{display:flex;align-items:center;justify-content:center;font-size:22px;color:rgba(255,255,255,.15);font-weight:300}
.s3note{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:1rem 1.5rem;max-width:920px;width:100%;margin-top:1.5rem;font-size:12.5px;color:var(--dim);line-height:1.6;text-align:center}
.s3icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:var(--cyan2);margin-bottom:.2rem}
.s3icon svg{width:18px;height:18px;stroke:var(--cyan);fill:none;stroke-width:1.5}

.s4g{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;max-width:960px;width:100%;margin-top:2rem}
.s4card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:1.8rem 1.6rem;display:flex;flex-direction:column}
.s4num{font-size:28px;font-weight:200;color:var(--cyan);margin-bottom:.8rem}
.s4card h3{font-size:15px;font-weight:600;margin-bottom:.5rem}
.s4card p{font-size:12.5px;color:var(--dim);line-height:1.6;flex:1}
.s4tag{font-size:10px;color:var(--cyan);opacity:.7;margin-top:.8rem;letter-spacing:.5px}
.s4icon{margin-bottom:.5rem}
.s4icon svg{width:32px;height:32px;stroke:var(--cyan);fill:none;stroke-width:1;opacity:.5}

.s5g{display:grid;grid-template-columns:1fr 50px 1fr;gap:0;max-width:920px;width:100%;margin-top:2rem}
.s5col{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:1.5rem}
.s5arrow{display:flex;align-items:center;justify-content:center;font-size:22px;color:rgba(255,255,255,.15)}
.s5header{display:flex;align-items:center;gap:8px;margin-bottom:1.2rem;font-size:11px;font-weight:500;letter-spacing:1px;text-transform:uppercase}
.s5header .dot{width:8px;height:8px;border-radius:50%}
.s5row{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);align-items:flex-start}
.s5row:last-child{border-bottom:none}
.s5row .icon{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.s5row .icon svg{width:14px;height:14px;stroke-width:1.5;fill:none}
.s5row h4{font-size:13px;font-weight:500;margin-bottom:2px}
.s5row p{font-size:11px;color:var(--dim);line-height:1.5}
.s5note{max-width:920px;width:100%;margin-top:1rem;font-size:11.5px;color:var(--dim);text-align:center;opacity:.7}

.s6g{display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;max-width:960px;width:100%;margin-top:2rem;align-items:start}
.s6step{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:1.3rem 1.1rem;position:relative}
.s6step .num{font-size:10px;color:var(--cyan);opacity:.6;margin-bottom:.6rem;font-weight:500}
.s6step h3{font-size:13px;font-weight:600;margin-bottom:.3rem}
.s6step .sub{font-size:11px;color:var(--dim);margin-bottom:.6rem}
.s6step p{font-size:11px;color:var(--dim);line-height:1.55}
.s6step ul{list-style:none;padding:0}
.s6step li{font-size:11px;color:var(--dim);padding:2.5px 0;padding-left:14px;position:relative}
.s6step li::before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--cyan);opacity:.4}
.s6arr{display:flex;align-items:center;justify-content:center}
.s6icon{margin-bottom:.5rem}
.s6icon svg{width:28px;height:28px;stroke:var(--cyan);fill:none;stroke-width:1;opacity:.5}
.s6motor{display:flex;flex-direction:column;gap:.6rem}
.s6motor>div{background:var(--card2);border:1px solid var(--line);border-radius:10px;padding:.8rem .9rem}
.s6motor h4{font-size:12px;font-weight:600;color:var(--cyan);margin-bottom:.2rem}
.s6motor p{font-size:10.5px;color:var(--dim);line-height:1.5}
.s6motor .tag2{font-size:9px;color:var(--dim);opacity:.6;margin-top:3px}
.s6badges{display:flex;flex-wrap:wrap;gap:4px;margin-top:.5rem}
.s6badges span{font-size:9px;padding:2px 8px;border-radius:4px;background:var(--cyan2);color:var(--cyan);font-weight:500}

.s7sep{width:60px;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);margin:2rem auto}
.s7p{font-size:clamp(14px,1.2vw,17px);color:var(--dim);line-height:1.8;max-width:640px;text-align:center;margin-bottom:1rem}
.s7q{font-size:clamp(14px,1.2vw,17px);color:var(--fg);line-height:1.8;max-width:640px;text-align:center;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:1.5rem 2rem;margin-top:1rem}

.nav{position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:90}
.dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15);cursor:pointer;transition:var(--tr)}
.dot.on{background:var(--cyan);box-shadow:0 0 8px rgba(0,217,255,.4)}
.progress{position:fixed;top:0;left:0;height:2px;background:var(--cyan);transition:width .5s;z-index:91}
.btn-nav{position:fixed;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:rgba(10,15,28,.7);color:var(--dim);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;z-index:90;transition:var(--tr);backdrop-filter:blur(8px)}
.btn-nav:hover{border-color:var(--cyan);color:var(--cyan)}
.prev{left:1.5rem}
.next{right:1.5rem}

@media(max-width:768px){
.slide{padding:6vh 6vw}
.s2c,.s3g,.s5g{grid-template-columns:1fr;gap:1rem}
.s2vs,.s3plus,.s5arrow,.s6arr{display:none}
.s4g{grid-template-columns:1fr}
.s6g{grid-template-columns:1fr}
.btn-nav{display:none}
.deck{flex-direction:column;transform:none!important;overflow-y:auto;height:auto}
.slide{min-width:100vw;height:auto;min-height:100vh}
}
</style>
</head>
<body>

<div class="progress" id="prog"></div>
<div class="deck" id="deck">

<div class="slide slide-dark">
<div class="s1h">EXP³</div>
<div class="s1sub">Trabalhamos na camada entre dado bruto e resultado confiável. Isso envolve formalizar o conhecimento organizacional em estruturas que máquinas operam de forma determinística, gestão de conhecimento com taxonomia controlada e uma arquitetura que separa o que o LLM faz do que ele não deveria fazer sozinho.</div>
<div class="s1foot">Pinheiro Neto Advogados  ·  2026</div>
</div>

<div class="slide slide-accent">
<div class="tag">O ponto de partida</div>
<h1>Dois contextos diferentes<br>que exigem abordagens diferentes.</h1>
<div class="s2c">
<div class="s2card">
<div class="s2icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg></div>
<h3>Uso individual</h3>
<p style="font-size:12px;color:var(--cyan);opacity:.7;margin-bottom:.5rem">IA como ferramenta pessoal</p>
<p>Uma pessoa, uma tarefa</p>
<p>Contexto único e conhecido</p>
<p>Resultado imediato</p>
<p>Funciona bem em escopo limitado</p>
</div>
<div class="s2vs">vs</div>
<div class="s2card" style="border-color:rgba(0,217,255,.2)">
<div class="s2icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="M12 9v3M8 16l-1-1M16 16l1-1"/></svg></div>
<h3>Implementação organizacional</h3>
<p style="font-size:12px;color:var(--cyan);opacity:.7;margin-bottom:.5rem">IA com o conhecimento da organização</p>
<p>Múltiplas equipes, múltiplos contextos</p>
<p>Conhecimento distribuído e implícito</p>
<p>Consistência ao longo do tempo</p>
<p>Exige uma abordagem fundamentalmente diferente</p>
</div>
</div>
<div class="s2note">Atuamos na implementação organizacional.</div>
<div class="logo-sm">EXP³</div>
</div>

<div class="slide slide-subtle">
<div class="tag">Por que é mais difícil do que parece</div>
<h2 style="text-align:center;margin-bottom:.5rem">Implementação organizacional tem duas dimensões<br>que precisam andar juntas</h2>
<div class="s3g">
<div class="s3card">
<div class="s3icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></div>
<h3>Dimensão Tecnológica</h3>
<p class="sub">Sistemas, dados e arquitetura</p>
<ul><li>Qualidade e estrutura dos dados</li><li>Arquitetura que separa responsabilidades</li><li>Modelos e motores de processamento</li><li>Integração com sistemas existentes</li></ul>
</div>
<div class="s3plus">+</div>
<div class="s3card">
<div class="s3icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg></div>
<h3>Dimensão Organizacional</h3>
<p class="sub">Pessoas, conhecimento e cultura</p>
<ul><li>Como o conhecimento trafega na organização</li><li>Quem valida e quem adota</li><li>Vocabulário e processos de cada equipe</li><li>Engajamento e mudança de prática</li></ul>
</div>
</div>
<div class="s3note">Resolver só o lado técnico sem o lado organizacional não resolve. As duas dimensões são interdependentes e precisam ser trabalhadas ao mesmo tempo.</div>
<div class="logo-sm">EXP³</div>
</div>

<div class="slide slide-dark">
<div class="tag">O que a gente observa</div>
<h2 style="text-align:center;margin-bottom:.5rem">Três problemas que aparecem<br>em toda implementação organizacional</h2>
<div class="s4g">
<div class="s4card">
<div class="s4num">01</div>
<div class="s4icon"><svg viewBox="0 0 24 24"><path d="M4 4l16 16M4 12h16M12 4v16"/><circle cx="8" cy="8" r="2"/><circle cx="16" cy="16" r="2"/></svg></div>
<h3>Deriva semântica</h3>
<p>Equipes diferentes usam os mesmos termos com sentidos diferentes. A IA aprende com esse ruído e multiplica a inconsistência ao invés de reduzir.</p>
<div class="s4tag">Vocabulário não controlado</div>
</div>
<div class="s4card">
<div class="s4num">02</div>
<div class="s4icon"><svg viewBox="0 0 24 24"><path d="M12 2v10l6 4"/><circle cx="12" cy="12" r="10" stroke-dasharray="4 2"/></svg></div>
<h3>Conhecimento não formalizado</h3>
<p>O raciocínio acumulado pelos especialistas é o maior ativo do escritório. Quando formalizado, a IA consegue amplificá-lo e distribuí-lo, transformando expertise individual em capacidade coletiva.</p>
<div class="s4tag">Saber implícito, não estruturado</div>
</div>
<div class="s4card">
<div class="s4num">03</div>
<div class="s4icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg></div>
<h3>Resultado sem raciocínio</h3>
<p>A IA entrega uma resposta mas não mostra como chegou até ela. Em qualquer contexto onde a decisão precisa ser explicada ou contestada, isso não é suficiente.</p>
<div class="s4tag">Inferência não rastreável</div>
</div>
</div>
<div class="logo-sm">EXP³</div>
</div>

<div class="slide slide-accent">
<div class="tag">Como a EXP³ responde</div>
<h2 style="text-align:center;margin-bottom:.5rem">Cada problema tem uma resposta técnica direta</h2>
<div class="s5g">
<div class="s5col">
<div class="s5header"><div class="dot" style="background:#D4537E"></div>O problema</div>
<div class="s5row"><div class="icon" style="background:rgba(212,83,126,.15)"><svg viewBox="0 0 24 24" style="stroke:#D4537E"><path d="M4 4l16 16M4 12h16"/></svg></div><div><h4>Deriva semântica</h4><p>Vocabulário não controlado, significados que divergem entre equipes</p></div></div>
<div class="s5row"><div class="icon" style="background:rgba(212,83,126,.15)"><svg viewBox="0 0 24 24" style="stroke:#D4537E"><circle cx="12" cy="12" r="8" stroke-dasharray="4 2"/></svg></div><div><h4>Conhecimento não formalizado</h4><p>Saber que vive em especialistas, não na organização</p></div></div>
<div class="s5row"><div class="icon" style="background:rgba(212,83,126,.15)"><svg viewBox="0 0 24 24" style="stroke:#D4537E"><rect x="5" y="5" width="14" height="14" rx="2"/></svg></div><div><h4>Resultado sem raciocínio</h4><p>Conclusão sem o caminho, impossível de auditar ou defender</p></div></div>
</div>
<div class="s5arrow">→</div>
<div class="s5col" style="border-color:rgba(0,217,255,.15)">
<div class="s5header"><div class="dot" style="background:var(--cyan)"></div>A resposta EXP³</div>
<div class="s5row"><div class="icon" style="background:var(--cyan2)"><svg viewBox="0 0 24 24" style="stroke:var(--cyan)"><path d="M12 2v20M2 12h20"/></svg></div><div><h4>Tecnologia Social + Taxonomia Controlada</h4><p>Mapeamos o vocabulário real do escritório e criamos um padrão que os sistemas conseguem ler, interpretar e trabalhar.</p></div></div>
<div class="s5row"><div class="icon" style="background:var(--cyan2)"><svg viewBox="0 0 24 24" style="stroke:var(--cyan)"><path d="M4 6h16M4 12h16M4 18h10"/></svg></div><div><h4>Metodologia de Formalização</h4><p>O raciocínio dos especialistas, formalizado, se torna operável pela IA em qualquer escala. O que antes alcançava poucos passa a estar disponível para toda a organização.</p></div></div>
<div class="s5row"><div class="icon" style="background:var(--cyan2)"><svg viewBox="0 0 24 24" style="stroke:var(--cyan)"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"/></svg></div><div><h4>Motor Analítico-Simbólico</h4><p>O raciocínio por trás de cada resposta fica registrado passo a passo, não só a conclusão. Possível revisar, contestar e defender cada decisão</p></div></div>
</div>
</div>
<div class="s5note">O Motor Determinístico garante que cálculos e aplicações de regras sejam sempre idênticos. Mesma entrada, mesma saída. Sem variação por sessão ou usuário.</div>
<div class="logo-sm">EXP³</div>
</div>

<div class="slide slide-dark">
<div class="tag">Referência técnica</div>
<h2 style="text-align:center;margin-bottom:.3rem">Arquitetura</h2>
<p style="font-size:13px;color:var(--dim);text-align:center;margin-bottom:1.5rem">Como os motores funcionam juntos</p>
<div class="s6g">
<div class="s6step">
<div class="num">01 · Entrada</div>
<div class="s6icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg></div>
<h3>Dados da Organização</h3>
<p class="sub">Sistemas, documentos, contratos, conhecimento tácito dos especialistas.</p>
<ul><li>Bases e sistemas existentes</li><li>Conhecimento ainda implícito</li><li>Processos não formalizados</li></ul>
</div>
<div class="s6step">
<div class="num">02 · Metodologia EXP³</div>
<div class="s6icon"><svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></div>
<h3>Tecnologia Social + Taxonomia</h3>
<p class="sub">Mapeamos fluxos de conhecimento e criamos vocabulário controlado operável por máquina.</p>
<ul><li>Mapeamento de fluxos</li><li>Vocabulário controlado</li><li>Extração do implícito</li><li>Formalização de regras</li></ul>
</div>
<div class="s6step">
<div class="num">03 · Processamento</div>
<div class="s6motor">
<div><h4>Motor Determinístico</h4><p>Calcula com exatidão absoluta</p><p>Mesma entrada, sempre mesma saída. Auditável em cada etapa. Substitui o LLM onde precisão é obrigatória.</p><div class="tag2">Sem variação por sessão</div></div>
<div><h4>Motor Analítico-Simbólico</h4><p>Raciocina com regras formais</p><p>Inferência encadeada e documentada. O caminho inteiro do raciocínio fica visível, não só a conclusão.</p><div class="tag2">Regras do negócio com precisão</div></div>
</div>
</div>
<div class="s6step">
<div class="s6icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
<h3>O LLM narra e interpreta<br>o resultado</h3>
<div class="s6badges"><span>Consistente</span><span>Auditável</span><span>Previsível</span><span>Rastreável</span></div>
</div>
</div>
<div class="logo-sm">EXP³</div>
</div>

<div class="slide slide-accent">
<div class="s1h" style="font-size:clamp(36px,5vw,64px)">EXP³</div>
<h2 style="text-align:center">Gostamos de trabalhar em<br>terrenos não mapeados</h2>
<div class="s7sep"></div>
<div class="s7p">Esse mundo de IA em organizações ainda está sendo construído. Não existem receitas prontas e a maioria das implementações que a gente vê ainda está tentando descobrir o que funciona de verdade.</div>
<div class="s7p">A EXP³ prefere os desafios que ainda não têm resposta pronta. Quanto mais específico o problema, mais interessante fica.</div>
<div class="s7sep"></div>
<div class="s7q">Se a conversa fez sentido, queremos ouvir e explorar juntos. Qual é o desafio do Pinheiro Neto Advogados quando o assunto é implementação de IA em nível organizacional?</div>
<div class="logo-sm">EXP³</div>
</div>

</div>

<div class="nav" id="nav"></div>
<button class="btn-nav prev" id="prev">←</button>
<button class="btn-nav next" id="next">→</button>

<script>
(function(){
const deck=document.getElementById('deck'),nav=document.getElementById('nav'),prog=document.getElementById('prog');
const slides=document.querySelectorAll('.slide'),total=slides.length;
let cur=0,isMobile=window.innerWidth<=768;

function dots(){nav.innerHTML='';for(let i=0;i<total;i++){const d=document.createElement('div');d.className='dot'+(i===cur?' on':'');d.onclick=()=>go(i);nav.appendChild(d)}}

function go(i){
  if(i<0||i>=total)return;cur=i;
  if(!isMobile)deck.style.transform='translateX(-'+cur*100+'vw)';
  else slides[cur].scrollIntoView({behavior:'smooth'});
  dots();prog.style.width=((cur+1)/total*100)+'%';
}

dots();prog.style.width=(1/total*100)+'%';

document.getElementById('prev').onclick=()=>go(cur-1);
document.getElementById('next').onclick=()=>go(cur+1);

document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key===' ')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});

let tx=0;
document.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50){dx<0?go(cur+1):go(cur-1)}},{passive:true});

window.addEventListener('resize',()=>{isMobile=window.innerWidth<=768;if(!isMobile)deck.style.transform='translateX(-'+cur*100+'vw)'});
})();
</script>
</body>
</html>`;
