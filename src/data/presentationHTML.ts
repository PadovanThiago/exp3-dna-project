export const presentationHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EXP³ — Pinheiro Neto Advogados</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
/* ── DESIGN TOKENS ── */
:root{
  --bg:#0A0F1C;--bg2:#0D1628;--bg3:#111D33;--bg4:#162040;
  --cyan:#00D9FF;--cyan-dim:rgba(0,217,255,.09);--cyan-mid:rgba(0,217,255,.20);
  --orange:#FF6B33;--orange-dim:rgba(255,107,51,.08);
  --emerald:#00C77B;
  --fg:hsl(210,40%,96%);--fg2:hsl(215,22%,58%);--fg3:hsl(215,18%,42%);
  --border:rgba(255,255,255,.06);--border-c:rgba(0,217,255,.18);
  --sh-sm:0 2px 8px rgba(0,0,0,.18),0 8px 24px rgba(0,0,0,.16);
  --sh-glow:0 0 32px rgba(0,217,255,.10);
  --rad:14px;
}

/* ── RESET ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{
  font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--fg);
  height:100vh;overflow:hidden;user-select:none;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
}

/* ── DECK ── */
.deck{position:relative;width:100vw;height:100vh}
.deck::before{
  content:'';position:fixed;inset:0;
  background-image:radial-gradient(circle,rgba(0,217,255,.026) 1px,transparent 1px);
  background-size:28px 28px;pointer-events:none;z-index:0;
}

/* ── SLIDES ── */
.slide{
  position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;
  padding:52px 80px 64px;opacity:0;transform:translateX(44px);
  transition:opacity .5s cubic-bezier(.4,0,.2,1),transform .5s cubic-bezier(.4,0,.2,1);
  pointer-events:none;z-index:1;
}
.slide.active{opacity:1;transform:translateX(0);pointer-events:all}
.slide.leaving{opacity:0;transform:translateX(-44px)}

/* ── CHROME ── */
.progress-bar{position:fixed;bottom:0;left:0;height:2px;background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.3));transition:width .4s ease;z-index:200}
.nav-dots{position:fixed;right:22px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:8px;z-index:200}
.dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.14);cursor:pointer;transition:background .3s,transform .3s}
.dot.active{background:var(--cyan);transform:scale(1.6)}
.nav-btns{position:fixed;bottom:24px;right:36px;display:flex;gap:10px;z-index:200}
.nav-btn{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:rgba(255,255,255,.03);color:var(--fg2);cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.nav-btn:hover{background:var(--cyan-dim);border-color:rgba(0,217,255,.3);color:var(--cyan)}
.slide-counter{position:fixed;bottom:30px;left:40px;font-size:12px;font-weight:500;color:var(--fg3);letter-spacing:.08em;z-index:200}
.slogo{position:absolute;top:26px;left:40px;font-size:16px;font-weight:800;letter-spacing:-.3px;color:rgba(255,255,255,.45);z-index:10}
.slogo sup{color:var(--cyan);font-size:10px}

/* ── TYPOGRAPHY ── */
.lab{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--cyan);margin-bottom:14px;display:flex;align-items:center;gap:10px}
.lab::before{content:'';display:inline-block;width:24px;height:1.5px;background:var(--cyan);border-radius:2px;flex-shrink:0}
.hdl{font-size:clamp(22px,2.7vw,34px);font-weight:700;letter-spacing:-.5px;line-height:1.25;margin-bottom:28px}


/* ══════════════════════════════════════════
   SLIDE 1 — HERO
══════════════════════════════════════════ */
.s1{background:radial-gradient(ellipse 72% 62% at 50% 48%,rgba(0,35,70,.55),var(--bg) 74%);text-align:center}
.ring{position:absolute;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.ring.r1{width:600px;height:600px;background:radial-gradient(circle,rgba(0,217,255,.055),transparent 68%)}
.ring.r2{width:390px;height:390px;border:1px solid rgba(0,217,255,.07)}
.ring.r3{width:555px;height:555px;border:1px solid rgba(0,217,255,.038)}
.arc{position:absolute;pointer-events:none;opacity:.045}
.hero-logo{font-size:clamp(72px,9.5vw,108px);font-weight:800;letter-spacing:-3px;line-height:1;color:#fff;margin-bottom:24px;position:relative;z-index:2;text-shadow:0 0 100px rgba(0,217,255,.22)}
.hero-logo sup{font-size:clamp(46px,6vw,70px);background:linear-gradient(135deg,#00D9FF,#80EEFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-div{width:52px;height:2px;background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.15));margin:0 auto 28px;border-radius:2px;position:relative;z-index:2}
.hero-div::after{content:'';position:absolute;width:6px;height:6px;border-radius:50%;background:var(--cyan);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px var(--cyan)}
.hero-tag{font-size:clamp(16px,1.65vw,21px);font-weight:400;color:var(--fg2);max-width:640px;line-height:1.75;position:relative;z-index:2;margin:0 auto}
.hero-tag strong{color:var(--fg);font-weight:600}
.hero-meta{
  position:absolute;bottom:44px;left:50%;transform:translateX(-50%);
  font-size:13px;letter-spacing:.06em;color:var(--fg2);
  display:flex;align-items:center;gap:12px;z-index:2;
  white-space:nowrap;font-weight:400;font-style:italic;
}
.hero-meta::before,.hero-meta::after{content:'';width:30px;height:1px;background:rgba(255,255,255,.16)}


/* ══════════════════════════════════════════
   SLIDE 2 — PESQUISA STANFORD
══════════════════════════════════════════ */
.s-research-w{width:100%;max-width:960px}
.stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:22px}
.stat-box{
  background:var(--bg3);border:1px solid var(--border);border-radius:var(--rad);
  padding:28px 24px 24px;text-align:center;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.stat-box::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2.5px;
  border-radius:2px 2px 0 0;
}
.stat-box.s1-box::after{background:linear-gradient(90deg,var(--orange),rgba(255,107,51,.25))}
.stat-box.s2-box::after{background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.25))}
.stat-box.s3-box::after{background:linear-gradient(90deg,var(--emerald),rgba(0,199,123,.25))}
.stat-num{
  font-size:clamp(44px,5.5vw,66px);font-weight:800;letter-spacing:-2px;line-height:1;
  margin-bottom:12px;
}
.stat-box.s1-box .stat-num{color:var(--orange)}
.stat-box.s2-box .stat-num{color:var(--cyan)}
.stat-box.s3-box .stat-num{color:var(--emerald)}
.stat-label{font-size:clamp(13px,1.3vw,16px);font-weight:600;color:var(--fg);line-height:1.4;margin-bottom:8px}
.stat-sub{font-size:clamp(11px,1.1vw,13px);color:var(--fg3);line-height:1.5}

.research-quote{
  background:rgba(0,217,255,.04);border:1px solid rgba(0,217,255,.14);border-radius:10px;
  padding:16px 22px;margin-bottom:14px;text-align:center;
  font-size:clamp(14px,1.4vw,17px);color:var(--fg2);line-height:1.65;font-style:italic;
}
.research-quote strong{color:var(--fg);font-weight:600;font-style:normal}
.research-source{
  text-align:center;font-size:12px;color:var(--fg3);letter-spacing:.04em;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.research-source::before,.research-source::after{content:'';width:28px;height:1px;background:rgba(255,255,255,.1)}


/* ══════════════════════════════════════════
   SLIDE 3 — POR QUE FALHAM / O QUE FUNCIONOU
══════════════════════════════════════════ */
.s-fail-w{width:100%;max-width:960px}
.fail-grid{display:grid;grid-template-columns:1fr 48px 1fr;gap:0;align-items:stretch;margin-bottom:18px}
.fail-col{display:flex;flex-direction:column;gap:8px;padding:0 4px}
.fail-col-head{
  font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  padding:0 0 12px;margin-bottom:4px;display:flex;align-items:center;gap:8px;
  border-bottom:1px solid;
}
.fail-col.bad .fail-col-head{color:var(--orange);border-color:rgba(255,107,51,.2)}
.fail-col.good .fail-col-head{color:var(--cyan);border-color:rgba(0,217,255,.2)}
.fail-step{
  border-radius:10px;padding:12px 16px;display:flex;align-items:flex-start;gap:12px;
  border:1px solid;
}
.fail-col.bad .fail-step{background:rgba(255,107,51,.04);border-color:rgba(255,107,51,.14)}
.fail-col.good .fail-step{background:rgba(0,217,255,.04);border-color:rgba(0,217,255,.14)}
.fail-step-n{
  width:24px;height:24px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;font-weight:700;
}
.fail-col.bad .fail-step-n{background:rgba(255,107,51,.1);color:var(--orange)}
.fail-col.good .fail-step-n{background:rgba(0,217,255,.1);color:var(--cyan)}
.fail-step-txt{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.5}
.fail-step-txt strong{color:var(--fg);font-weight:600}

.fail-mid{
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
  padding-top:42px;
}
.fail-mid-line{width:1.5px;flex:1;max-height:90px;border-radius:2px;background:rgba(255,255,255,.06)}
.fail-mid-arrow{
  width:32px;height:32px;border-radius:50%;
  background:var(--bg2);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  font-size:12px;color:var(--fg3);
}

.fail-quote{
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
  border-radius:10px;padding:13px 20px;text-align:center;
  font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.65;font-style:italic;
}
.fail-quote strong{color:var(--fg);font-weight:600;font-style:normal}
.fail-quote cite{font-size:11px;color:var(--fg3);display:block;margin-top:6px;font-style:normal;letter-spacing:.04em}


/* ══════════════════════════════════════════
   SLIDE 4 — INDIVIDUAL VS ORGANIZACIONAL
══════════════════════════════════════════ */
.s2-w{width:100%;max-width:900px}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:18px;position:relative}
.vs{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:34px;height:34px;border-radius:50%;
  background:var(--bg2);border:1px solid var(--border-c);
  display:flex;align-items:center;justify-content:center;
  font-size:9px;font-weight:700;letter-spacing:.04em;color:var(--fg3);z-index:10;
}
.ccard{
  background:rgba(255,255,255,.018);border:1px solid rgba(255,255,255,.04);
  border-radius:var(--rad);padding:28px 26px 24px;
  box-shadow:var(--sh-sm);opacity:.55;
}
.ccard.gl{
  opacity:1;border-color:rgba(0,217,255,.22);
  background:linear-gradient(150deg,rgba(0,217,255,.09),var(--bg3) 55%);
  box-shadow:var(--sh-glow),var(--sh-sm),inset 0 1px 0 rgba(0,217,255,.1);
}
.ccard .tp{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--fg3);margin-bottom:12px}
.ccard.gl .tp{color:var(--cyan);opacity:.85}
.ccard .ico-wrap{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.ccard.gl .ico-wrap{background:rgba(0,217,255,.08);border-color:rgba(0,217,255,.2)}
.ccard .ico-wrap svg{width:20px;height:20px;color:var(--fg3)}
.ccard.gl .ico-wrap svg{color:var(--cyan)}
.ccard .tt{font-size:clamp(15px,1.5vw,18px);font-weight:700;margin-bottom:14px;line-height:1.3;color:var(--fg2)}
.ccard.gl .tt{color:var(--cyan)}
.ccard ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.ccard li{font-size:clamp(14px,1.35vw,16px);color:var(--fg3);line-height:1.55;padding-left:18px;position:relative}
.ccard.gl li{color:var(--fg2)}
.ccard li::before{content:'';position:absolute;left:0;top:10px;width:7px;height:1px;background:var(--fg3)}
.ccard.gl li::before{background:var(--cyan);opacity:.6}
.dois-note{
  margin-top:18px;text-align:center;
  font-size:clamp(13px,1.3vw,15px);font-weight:600;color:var(--cyan);letter-spacing:.02em;
  display:flex;align-items:center;justify-content:center;gap:10px;
}
.dois-note::before,.dois-note::after{content:'';flex:1;max-width:80px;height:1px;background:rgba(0,217,255,.25)}


/* ══════════════════════════════════════════
   SLIDE 5 — FUSÃO TECNOLÓGICO + SOCIAL
══════════════════════════════════════════ */
.fusion-w{width:100%;max-width:960px}
.fusion-grid{
  display:grid;grid-template-columns:1fr auto 1fr;gap:0;align-items:stretch;
  margin-bottom:18px;
}
.fusion-card{
  border-radius:var(--rad);padding:24px 22px 20px;
  display:flex;flex-direction:column;
  box-shadow:var(--sh-sm);
}
.fusion-card.tech{
  background:linear-gradient(150deg,rgba(0,217,255,.09),var(--bg3) 60%);
  border:1px solid rgba(0,217,255,.22);
}
.fusion-card.soc{
  background:linear-gradient(150deg,rgba(255,107,51,.08),var(--bg3) 60%);
  border:1px solid rgba(255,107,51,.2);
}
.fusion-icon{
  width:38px;height:38px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;margin-bottom:14px;
}
.fusion-card.tech .fusion-icon{background:rgba(0,217,255,.1);border:1px solid rgba(0,217,255,.2)}
.fusion-card.soc .fusion-icon{background:rgba(255,107,51,.1);border:1px solid rgba(255,107,51,.2)}
.fusion-card.tech .fusion-icon svg{color:var(--cyan)}
.fusion-card.soc .fusion-icon svg{color:var(--orange)}
.fusion-label{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:9px}
.fusion-card.tech .fusion-label{color:var(--cyan)}
.fusion-card.soc .fusion-label{color:var(--orange)}
.fusion-tt{font-size:clamp(15px,1.5vw,18px);font-weight:700;color:var(--fg);margin-bottom:12px;line-height:1.3}
.fusion-ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.fusion-ul li{font-size:clamp(13px,1.3vw,15px);line-height:1.55;padding-left:16px;position:relative;color:var(--fg2)}
.fusion-card.tech .fusion-ul li::before{content:'';position:absolute;left:0;top:9px;width:6px;height:1.5px;background:var(--cyan);opacity:.7}
.fusion-card.soc .fusion-ul li::before{content:'';position:absolute;left:0;top:9px;width:6px;height:1.5px;background:var(--orange);opacity:.7}
.fusion-mid{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:0 18px;gap:8px;
}
.fusion-mid-line{width:2px;flex:1;max-height:100px;border-radius:2px}
.fusion-mid-line.top{background:linear-gradient(180deg,rgba(0,217,255,.4),rgba(255,107,51,.4))}
.fusion-mid-line.bot{background:linear-gradient(180deg,rgba(255,107,51,.4),transparent)}
.fusion-mid-node{
  width:38px;height:38px;border-radius:50%;
  background:var(--bg2);border:1px solid rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;font-weight:700;color:var(--fg3);
}
.fusion-bottom{
  padding:13px 20px;
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
  border-radius:10px;text-align:center;
  font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.65;
}
.fusion-bottom strong{color:var(--fg);font-weight:600}


/* ══════════════════════════════════════════
   SLIDE 6 — TRÊS DESAFIOS
══════════════════════════════════════════ */
.prob-grid-w{width:100%;max-width:980px}
.prob-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.prob-card{
  background:var(--bg3);border:1px solid var(--border);border-radius:var(--rad);
  padding:26px 22px 22px;display:flex;flex-direction:column;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.prob-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2.5px;
  background:linear-gradient(90deg,var(--orange),rgba(255,107,51,.2));
  border-radius:2px 2px 0 0;
}
.prob-n{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--orange);opacity:.7;margin-bottom:16px}
.prob-ico{
  width:40px;height:40px;border-radius:10px;
  background:rgba(255,107,51,.08);border:1px solid rgba(255,107,51,.18);
  display:flex;align-items:center;justify-content:center;margin-bottom:16px;
}
.prob-ico svg{width:20px;height:20px;color:var(--orange)}
.prob-tt{font-size:clamp(15px,1.5vw,18px);font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:12px}
.prob-d{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.7;flex:1;margin-bottom:16px}
.prob-tag{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(255,107,51,.07);border:1px solid rgba(255,107,51,.18);
  border-radius:7px;padding:6px 11px;
  font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--orange);align-self:flex-start;
}


/* ══════════════════════════════════════════
   SLIDE 7 — COMO A EXP³ RESPONDE
══════════════════════════════════════════ */
.s3-w{width:100%;max-width:960px}
.bridge-grid{display:grid;grid-template-columns:1fr auto 1fr;gap:0;align-items:stretch}
.bridge-col{display:flex;flex-direction:column;gap:9px}
.bridge-title{
  font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  margin-bottom:4px;display:flex;align-items:center;gap:8px;
}
.bridge-title.prob{color:var(--orange)}
.bridge-title.sol{color:var(--cyan)}
.bridge-title svg{width:13px;height:13px;flex-shrink:0}
.bitem{
  display:flex;align-items:flex-start;gap:12px;
  padding:12px 14px;border-radius:10px;border:1px solid;flex:1;
}
.bitem.p{background:rgba(255,107,51,.04);border-color:rgba(255,107,51,.18)}
.bitem.s{background:rgba(0,217,255,.04);border-color:rgba(0,217,255,.18)}
.bitem-ico{width:26px;height:26px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.bitem.p .bitem-ico{background:rgba(255,107,51,.1)}
.bitem.s .bitem-ico{background:rgba(0,217,255,.1)}
.bitem-ico svg{width:13px;height:13px}
.bitem.p .bitem-ico svg{color:var(--orange)}
.bitem.s .bitem-ico svg{color:var(--cyan)}
.bitem-text{display:flex;flex-direction:column;gap:3px}
.bitem-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.65}
.bitem.p .bitem-label{color:var(--orange)}
.bitem.s .bitem-label{color:var(--cyan)}
.bitem-desc{font-size:clamp(13px,1.3vw,15px);font-weight:500;color:var(--fg);line-height:1.5}
.bridge-arrow{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:0 18px;gap:5px;
}
.bridge-arrow-line{width:2px;flex:1;max-height:160px;background:linear-gradient(180deg,rgba(255,107,51,.25),rgba(0,217,255,.45));border-radius:2px}
.bridge-arrow-head{
  width:26px;height:26px;border-radius:50%;
  background:linear-gradient(135deg,rgba(0,217,255,.15),rgba(0,217,255,.05));
  border:1px solid rgba(0,217,255,.3);
  display:flex;align-items:center;justify-content:center;
  color:var(--cyan);font-size:13px;
}
.bridge-note{
  margin-top:16px;padding:11px 18px;
  background:rgba(0,217,255,.04);border:1px solid rgba(0,217,255,.14);border-radius:9px;
  font-size:clamp(12px,1.2vw,14px);color:var(--fg3);line-height:1.55;text-align:center;
}
.bridge-note strong{color:var(--fg2);font-weight:600}


/* ══════════════════════════════════════════
   SLIDE 8 — EXPERIÊNCIA
══════════════════════════════════════════ */
.s-exp-w{width:100%;max-width:980px}
.exp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.exp-card{
  background:var(--bg3);border:1px solid var(--border);border-radius:var(--rad);
  padding:26px 22px 22px;display:flex;flex-direction:column;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.exp-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2.5px;
  border-radius:2px 2px 0 0;
}
.exp-card:nth-child(1)::after{background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.2))}
.exp-card:nth-child(2)::after{background:linear-gradient(90deg,var(--orange),rgba(255,107,51,.2))}
.exp-card:nth-child(3)::after{background:linear-gradient(90deg,var(--emerald),rgba(0,199,123,.2))}
.exp-sector{
  display:inline-flex;align-items:center;gap:6px;
  border-radius:6px;padding:5px 10px;margin-bottom:16px;align-self:flex-start;
  font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
}
.exp-card:nth-child(1) .exp-sector{background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.2);color:var(--cyan)}
.exp-card:nth-child(2) .exp-sector{background:rgba(255,107,51,.08);border:1px solid rgba(255,107,51,.2);color:var(--orange)}
.exp-card:nth-child(3) .exp-sector{background:rgba(0,199,123,.08);border:1px solid rgba(0,199,123,.2);color:var(--emerald)}
.exp-title{font-size:clamp(15px,1.5vw,18px);font-weight:700;color:var(--fg);line-height:1.35;margin-bottom:12px}
.exp-desc{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.7;flex:1}
.exp-note{
  margin-top:20px;text-align:center;
  font-size:clamp(12px,1.2vw,14px);color:var(--fg3);font-style:italic;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.exp-note::before,.exp-note::after{content:'';flex:1;max-width:60px;height:1px;background:rgba(255,255,255,.08)}


/* ══════════════════════════════════════════
   SLIDE 9 — ENCERRAMENTO
══════════════════════════════════════════ */
.s-close{
  background:radial-gradient(ellipse 65% 58% at 50% 48%,rgba(0,35,70,.5),var(--bg) 72%);
  text-align:center;
}
.close-wrap{max-width:620px;position:relative;z-index:2}
.close-icon{
  width:54px;height:54px;border-radius:50%;
  background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.22);
  display:flex;align-items:center;justify-content:center;margin:0 auto 26px;
}
.close-icon svg{width:24px;height:24px;color:var(--cyan)}
.close-hdl{
  font-size:clamp(24px,3vw,38px);font-weight:700;letter-spacing:-.5px;
  line-height:1.2;margin-bottom:22px;color:var(--fg);
}
.close-hdl span{
  background:linear-gradient(135deg,var(--cyan),#80EEFF);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.close-body{
  font-size:clamp(15px,1.5vw,18px);color:var(--fg2);line-height:1.78;margin-bottom:32px;
}
.close-body strong{color:var(--fg);font-weight:600}
.close-line{width:1px;height:38px;background:linear-gradient(180deg,rgba(0,217,255,.5),transparent);margin:0 auto 22px}
.close-tag{
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(0,217,255,.07);border:1px solid rgba(0,217,255,.2);
  border-radius:10px;padding:12px 22px;
  font-size:clamp(13px,1.3vw,15px);font-weight:500;color:var(--fg2);line-height:1.55;
}
.close-tag strong{color:var(--cyan);font-weight:700}


/* ══════════════════════════════════════════
   SLIDE 10 — CONTATO
══════════════════════════════════════════ */
.s-contact{
  background:radial-gradient(ellipse 60% 55% at 50% 48%,rgba(0,25,55,.5),var(--bg) 72%);
  text-align:center;
}
.contact-wrap{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:0}
.contact-logo{font-size:clamp(36px,4.5vw,52px);font-weight:800;letter-spacing:-2px;line-height:1;color:#fff;margin-bottom:6px;text-shadow:0 0 60px rgba(0,217,255,.2)}
.contact-logo sup{font-size:clamp(22px,2.8vw,32px);background:linear-gradient(135deg,#00D9FF,#80EEFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.contact-tagline{font-size:clamp(12px,1.2vw,14px);color:var(--fg3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:40px}
.contact-divider{width:40px;height:1.5px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);margin-bottom:32px}
.contact-name{font-size:clamp(22px,2.6vw,32px);font-weight:700;color:var(--fg);letter-spacing:-.3px;margin-bottom:6px}
.contact-role{font-size:clamp(14px,1.4vw,17px);color:var(--fg3);font-weight:400;margin-bottom:30px;letter-spacing:.02em}
.contact-info-grid{display:flex;flex-direction:column;gap:12px;align-items:center}
.contact-info-row{
  display:flex;align-items:center;gap:12px;
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
  border-radius:10px;padding:11px 22px;min-width:280px;
}
.contact-info-icon{width:20px;height:20px;flex-shrink:0;color:var(--cyan);opacity:.8}
.contact-info-text{font-size:clamp(14px,1.4vw,17px);color:var(--fg2);font-weight:500}


/* ══════════════════════════════════════════
   BACKUP — ARQUITETURA TÉCNICA
══════════════════════════════════════════ */
.s5-w{width:100%;max-width:1060px}
.pipe-full{display:flex;align-items:stretch;gap:0;width:100%}
.stg{
  flex:1;display:flex;flex-direction:column;
  background:var(--bg3);border:1px solid var(--border);border-radius:14px;
  padding:20px 17px 17px;min-width:0;position:relative;z-index:1;box-shadow:var(--sh-sm);
}
.stg.hl{
  background:linear-gradient(155deg,rgba(0,217,255,.1),var(--bg3) 60%);
  border-color:rgba(0,217,255,.26);box-shadow:var(--sh-glow),var(--sh-sm);
}
.stg-n{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--fg3);margin-bottom:10px}
.stg.hl .stg-n{color:var(--cyan)}
.stg-ico{width:36px;height:36px;margin-bottom:10px;color:var(--cyan);opacity:.5;flex-shrink:0}
.stg.hl .stg-ico{opacity:.9}
.stg-tt{font-size:13px;font-weight:700;color:var(--fg);line-height:1.35;margin-bottom:7px}
.stg-d{font-size:12px;color:var(--fg2);line-height:1.6;flex:1;margin-bottom:9px}
.stg-ul{list-style:none;display:flex;flex-direction:column;gap:5px}
.stg-ul li{font-size:12px;color:var(--fg3);line-height:1.5;padding-left:13px;position:relative}
.stg-ul li::before{content:'›';position:absolute;left:0;color:var(--cyan);opacity:.5}
.stg.hl .stg-ul li{color:var(--fg2)}
.stg.hl .stg-ul li::before{opacity:.9}
.conn{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:26px;position:relative;z-index:2}
.conn::before{content:'';position:absolute;top:50%;left:2px;right:7px;height:1px;background:linear-gradient(90deg,rgba(0,217,255,.15),rgba(0,217,255,.45))}
.conn::after{content:'';position:absolute;right:2px;top:50%;transform:translateY(-50%);width:0;height:0;border-left:6px solid rgba(0,217,255,.5);border-top:4px solid transparent;border-bottom:4px solid transparent}
.motors-wrap{
  flex:1.3;display:flex;gap:9px;position:relative;z-index:1;
  background:var(--bg2);border:1px solid var(--border);border-radius:14px;
  padding:17px;box-shadow:var(--sh-sm);
}
.motors-label{position:absolute;top:-11px;left:17px;background:var(--bg2);padding:2px 9px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--fg3);border:1px solid var(--border);border-radius:5px}
.mcard{flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 14px;display:flex;flex-direction:column;box-shadow:var(--sh-sm)}
.mcard-label{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan);opacity:.8;margin-bottom:9px}
.mcard-tt{font-size:13px;font-weight:700;color:var(--fg);margin-bottom:7px;line-height:1.3}
.mcard-d{font-size:12px;color:var(--fg2);line-height:1.6;flex:1}
.mcard-tag{margin-top:9px;font-size:11px;font-weight:600;color:var(--cyan);opacity:.65;display:flex;align-items:center;gap:5px}
.mcard-tag::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--cyan);opacity:.6;flex-shrink:0}
.conn-b{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:32px;position:relative;z-index:2}
.conn-b::before{content:'';position:absolute;top:50%;left:2px;right:11px;height:2px;background:linear-gradient(90deg,rgba(0,217,255,.25),rgba(0,217,255,.6));border-radius:2px}
.conn-b::after{content:'';position:absolute;right:2px;top:50%;transform:translateY(-50%);width:0;height:0;border-left:8px solid rgba(0,217,255,.6);border-top:5px solid transparent;border-bottom:5px solid transparent}
.result-card{
  flex:.65;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;position:relative;z-index:1;
  background:var(--bg2);background-image:linear-gradient(155deg,rgba(0,217,255,.15),rgba(0,217,255,.04));
  border:1px solid rgba(0,217,255,.32);border-radius:14px;padding:22px 17px;
  box-shadow:0 0 44px rgba(0,217,255,.12),var(--sh-sm);
}
.result-ico{width:32px;height:32px;color:var(--cyan);opacity:.9;margin-bottom:12px}
.result-title{font-size:15px;font-weight:700;color:var(--fg);margin-bottom:14px;line-height:1.35}
.result-tags{display:flex;flex-direction:column;gap:6px;width:100%}
.result-tag{display:flex;align-items:center;gap:8px;background:rgba(0,217,255,.07);border:1px solid rgba(0,217,255,.2);border-radius:7px;padding:7px 11px;font-size:12px;font-weight:600;color:var(--cyan)}
.result-dot{width:5px;height:5px;border-radius:50%;background:var(--cyan);flex-shrink:0;opacity:.75}
.backup-badge{position:absolute;top:22px;right:40px;background:rgba(255,107,51,.08);border:1px solid rgba(255,107,51,.2);border-radius:7px;padding:5px 12px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--orange)}

</style>
</head>
<body>
<div class="deck" id="deck">


<!-- ════════════════════════════════
     SLIDE 1 — HERO
════════════════════════════════ -->
<div class="slide s1 active" data-index="0">
  <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
  <svg class="arc" style="top:-60px;right:-60px;width:500px" viewBox="0 0 400 400" fill="none">
    <circle cx="200" cy="200" r="178" stroke="var(--cyan)" stroke-width="1.1"/>
    <circle cx="200" cy="200" r="130" stroke="var(--cyan)" stroke-width=".7"/>
    <circle cx="200" cy="200" r="82"  stroke="var(--cyan)" stroke-width=".4"/>
  </svg>
  <svg class="arc" style="bottom:-90px;left:-90px;width:390px" viewBox="0 0 400 400" fill="none">
    <circle cx="200" cy="200" r="165" stroke="var(--cyan)" stroke-width=".9"/>
    <circle cx="200" cy="200" r="105" stroke="var(--cyan)" stroke-width=".5"/>
  </svg>
  <div class="hero-logo">EXP<sup>³</sup></div>
  <div class="hero-div"></div>
  <p class="hero-tag">
    Implementação organizacional de <strong>inteligência artificial</strong>.<br>
    Trabalhamos na camada entre dado bruto e resultado confiável, formalizando o conhecimento organizacional em estruturas que máquinas operam com <strong>precisão e raciocínio auditável</strong>.
  </p>
  <div class="hero-meta">Pinheiro Neto Advogados &nbsp;·&nbsp; 2026</div>
</div>


<!-- ════════════════════════════════
     SLIDE 2 — PESQUISA STANFORD
════════════════════════════════ -->
<div class="slide" data-index="1">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s-research-w">
    <p class="lab">O que a pesquisa mais recente mostra</p>
    <h2 class="hdl">51 implementações reais analisadas.<br>Os padrões são consistentes.</h2>

    <div class="stat-grid">
      <div class="stat-box s1-box">
        <div class="stat-num">95%</div>
        <div class="stat-label">dos projetos piloto de IA generativa não produzem impacto financeiro mensurável</div>
        <div class="stat-sub">MIT / NANDA Initiative, 2025</div>
      </div>
      <div class="stat-box s2-box">
        <div class="stat-num">77%</div>
        <div class="stat-label">dos desafios mais difíceis são invisíveis: mudança organizacional, dados e processos</div>
        <div class="stat-sub">Stanford Digital Economy Lab, 2026</div>
      </div>
      <div class="stat-box s3-box">
        <div class="stat-num">61%</div>
        <div class="stat-label">dos projetos que funcionaram tiveram ao menos uma tentativa anterior que falhou</div>
        <div class="stat-sub">Stanford Digital Economy Lab, 2026</div>
      </div>
    </div>

    <div class="research-quote">
      <strong>"A tecnologia foi consistentemente descrita como a parte mais fácil."</strong><br>
      Para cada R$&nbsp;1 investido em tecnologia, organizações bem-sucedidas investiram até R$&nbsp;10 em intangíveis: redesenho de processos, capacitação e transformação organizacional.
    </div>

    <div class="research-source">
      Stanford Digital Economy Lab &nbsp;·&nbsp; "The Enterprise AI Playbook" &nbsp;·&nbsp; Brynjolfsson, Pereira &amp; Graylin &nbsp;·&nbsp; Abril 2026
    </div>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 3 — POR QUE FALHAM
════════════════════════════════ -->
<div class="slide" data-index="2">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s-fail-w">
    <p class="lab">O que a pesquisa revela</p>
    <h2 class="hdl">O padrão de falha é documentado.<br>O padrão de sucesso também.</h2>

    <div class="fail-grid">
      <!-- coluna: caminho que falha -->
      <div class="fail-col bad">
        <div class="fail-col-head">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="3" y1="3" x2="10" y2="10"/><line x1="10" y1="3" x2="3" y2="10"/></svg>
          Caminho que falha
        </div>
        <div class="fail-step">
          <div class="fail-step-n">1</div>
          <div class="fail-step-txt">Identifica oportunidade e <strong>escolhe uma ferramenta de IA</strong></div>
        </div>
        <div class="fail-step">
          <div class="fail-step-n">2</div>
          <div class="fail-step-txt"><strong>Aplica ao processo existente</strong>, sem questioná-lo</div>
        </div>
        <div class="fail-step">
          <div class="fail-step-n">3</div>
          <div class="fail-step-txt">Espera o resultado.<br><strong>Resultado: frustração.</strong> A IA amplificou o problema, não resolveu.</div>
        </div>
      </div>

      <!-- coluna central -->
      <div class="fail-mid">
        <div class="fail-mid-line"></div>
        <div class="fail-mid-arrow">vs</div>
        <div class="fail-mid-line"></div>
      </div>

      <!-- coluna: caminho que funciona -->
      <div class="fail-col good">
        <div class="fail-col-head">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2.5 6.5l3 3 5-5"/></svg>
          Caminho que funciona
        </div>
        <div class="fail-step">
          <div class="fail-step-n">1</div>
          <div class="fail-step-txt"><strong>Mapeia organização, dados e conhecimento</strong> antes de qualquer tecnologia</div>
        </div>
        <div class="fail-step">
          <div class="fail-step-n">2</div>
          <div class="fail-step-txt"><strong>Redesenha processos</strong> e redefine papéis a partir do que a IA pode fazer</div>
        </div>
        <div class="fail-step">
          <div class="fail-step-n">3</div>
          <div class="fail-step-txt">Aí sim <strong>conecta a tecnologia</strong>. Com a base certa, o resultado escala.</div>
        </div>
      </div>
    </div>

    <div class="fail-quote">
      "AI amplifies whatever process it is applied to. If the process is broken, AI makes it worse faster."
      <cite>Stanford Enterprise AI Playbook, 2026 &nbsp;·&nbsp; O mesmo caso de uso levou semanas numa empresa e anos em outra. A diferença nunca foi o modelo. Foi o contexto organizacional.</cite>
    </div>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 4 — INDIVIDUAL VS ORGANIZACIONAL
════════════════════════════════ -->
<div class="slide" data-index="3">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s2-w">
    <p class="lab">Onde atuamos</p>
    <h2 class="hdl">Dois contextos com desafios<br>fundamentalmente diferentes.</h2>
    <div class="two-col">
      <div class="vs">vs</div>

      <div class="ccard">
        <p class="tp">Uso individual</p>
        <div class="ico-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <circle cx="12" cy="8" r="4"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/>
          </svg>
        </div>
        <p class="tt">IA como ferramenta pessoal</p>
        <ul>
          <li>Uma pessoa, uma tarefa</li>
          <li>Contexto único e conhecido</li>
          <li>Resultado imediato e individual</li>
          <li>Adoção simples, escala limitada</li>
        </ul>
      </div>

      <div class="ccard gl">
        <p class="tp">Implementação organizacional</p>
        <div class="ico-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            <line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/>
          </svg>
        </div>
        <p class="tt">IA com o conhecimento da organização</p>
        <ul>
          <li>Múltiplas equipes, múltiplos contextos</li>
          <li>Conhecimento distribuído e implícito</li>
          <li>Consistência e rastreabilidade ao longo do tempo</li>
          <li>Exige redesenho de processos e estrutura de dados</li>
        </ul>
      </div>
    </div>
    <p class="dois-note">A EXP³ atua na implementação organizacional.</p>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 5 — FUSÃO TECNOLÓGICO + SOCIAL
════════════════════════════════ -->
<div class="slide" data-index="4">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="fusion-w">
    <p class="lab">Por que é mais difícil do que parece</p>
    <h2 class="hdl" style="margin-bottom:18px">Implementação organizacional tem duas dimensões<br>que não funcionam separadas.</h2>

    <div class="fusion-grid">
      <div class="fusion-card tech">
        <div class="fusion-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <p class="fusion-label">Dimensão Tecnológica</p>
        <p class="fusion-tt">Sistemas, dados e arquitetura</p>
        <ul class="fusion-ul">
          <li>Qualidade e estrutura dos dados</li>
          <li>Arquitetura que separa responsabilidades</li>
          <li>Modelos e motores de processamento</li>
          <li>Integração com sistemas existentes</li>
        </ul>
      </div>

      <div class="fusion-mid">
        <div class="fusion-mid-line top"></div>
        <div class="fusion-mid-node">+</div>
        <div class="fusion-mid-line bot"></div>
      </div>

      <div class="fusion-card soc">
        <div class="fusion-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="7" r="4"/><circle cx="4" cy="19" r="2"/><circle cx="20" cy="19" r="2"/>
            <line x1="12" y1="11" x2="12" y2="15"/><line x1="12" y1="15" x2="5" y2="18"/><line x1="12" y1="15" x2="19" y2="18"/>
          </svg>
        </div>
        <p class="fusion-label">Dimensão Organizacional</p>
        <p class="fusion-tt">Pessoas, conhecimento e cultura</p>
        <ul class="fusion-ul">
          <li>Como o conhecimento trafega na organização</li>
          <li>Vocabulário e processos de cada equipe</li>
          <li>Quem valida e quem adota</li>
          <li>Engajamento e mudança de prática</li>
        </ul>
      </div>
    </div>

    <div class="fusion-bottom">
      Resolver só o lado técnico sem o lado organizacional não resolve. <strong>As duas dimensões são interdependentes e precisam ser trabalhadas ao mesmo tempo.</strong> McKinsey: organizações de alta performance são 3x mais propensas a redesenhar completamente seus processos ao implementar IA.
    </div>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 6 — TRÊS DESAFIOS
════════════════════════════════ -->
<div class="slide" data-index="5">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="prob-grid-w">
    <p class="lab">O que a gente encontra</p>
    <h2 class="hdl">Três desafios que aparecem<br>em toda implementação organizacional.</h2>
    <div class="prob-grid">

      <div class="prob-card">
        <p class="prob-n">01</p>
        <div class="prob-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 20v-1a6 6 0 0 1 12 0v1"/>
            <line x1="18" y1="8" x2="22" y2="8"/><line x1="20" y1="6" x2="20" y2="10"/>
          </svg>
        </div>
        <p class="prob-tt">Conhecimento que vive nas pessoas</p>
        <p class="prob-d">O raciocínio acumulado pelos especialistas ao longo dos anos é o maior ativo de qualquer organização. Enquanto não está formalizado, ele não pode ser operado, distribuído nem amplificado pela IA. Stanford identificou isso como causa de falha em 27% dos projetos analisados.</p>
        <div class="prob-tag">Saber implícito, não estruturado</div>
      </div>

      <div class="prob-card">
        <p class="prob-n">02</p>
        <div class="prob-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
            <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
          </svg>
        </div>
        <p class="prob-tt">Dados distribuídos que a IA não acessa</p>
        <p class="prob-d">Em 59% das implementações analisadas pelo Stanford, os dados estavam espalhados por múltiplos sistemas de equipes diferentes. Organizações com décadas de documentos, contratos e pareceres têm um acervo vasto, mas raramente conectado de forma que um sistema de IA consiga usar.</p>
        <div class="prob-tag">Dado existe, acesso não</div>
      </div>

      <div class="prob-card">
        <p class="prob-n">03</p>
        <div class="prob-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
          </svg>
        </div>
        <p class="prob-tt">A resposta precisa ser verificável</p>
        <p class="prob-d">Em contextos de alta exigência técnica e responsabilidade, como o jurídico, uma resposta certa gerada por um modelo que não mostra seu raciocínio não é suficiente. O raciocínio precisa ser auditável, defensável e rastreável passo a passo.</p>
        <div class="prob-tag">Inferência não rastreável</div>
      </div>

    </div>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 7 — COMO A EXP³ RESPONDE
════════════════════════════════ -->
<div class="slide" data-index="6">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s3-w">
    <p class="lab">Como a EXP³ responde</p>
    <h2 class="hdl" style="margin-bottom:18px">Cada desafio tem uma resposta técnica direta.</h2>

    <div class="bridge-grid">
      <div class="bridge-col">
        <p class="bridge-title prob">
          <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6.5" cy="6.5" r="5.5"/><line x1="6.5" y1="4" x2="6.5" y2="6.5"/><line x1="6.5" y1="8.5" x2="6.5" y2="9"/></svg>
          O desafio
        </p>
        <div class="bitem p">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6.5" cy="4.5" r="2.5"/><path d="M2 11v-.5A4.5 4.5 0 0 1 11 10.5V11"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Conhecimento nas pessoas</span>
            <span class="bitem-desc">Saber que vive em especialistas, não na organização</span>
          </div>
        </div>
        <div class="bitem p">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><ellipse cx="6.5" cy="3" rx="4.5" ry="1.5"/><path d="M2 3v7c0 .83 2.01 1.5 4.5 1.5S11 10.83 11 10V3"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Dados distribuídos</span>
            <span class="bitem-desc">Acervo valioso espalhado em sistemas desconectados</span>
          </div>
        </div>
        <div class="bitem p">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="1.5" y="1.5" width="10" height="10" rx="2"/><line x1="4" y1="6.5" x2="9" y2="6.5"/><line x1="6.5" y1="4" x2="6.5" y2="9" opacity=".4"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Resultado sem raciocínio</span>
            <span class="bitem-desc">Conclusão sem o caminho, impossível de auditar ou defender</span>
          </div>
        </div>
      </div>

      <div class="bridge-arrow">
        <div class="bridge-arrow-line"></div>
        <div class="bridge-arrow-head">→</div>
        <div class="bridge-arrow-line"></div>
      </div>

      <div class="bridge-col">
        <p class="bridge-title sol">
          <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6.5" cy="6.5" r="5.5"/><path d="M4 6.5l2 2 3-3"/></svg>
          A resposta EXP³
        </p>
        <div class="bitem s">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="3.5" cy="6.5" r="1.8"/><circle cx="9.5" cy="3.5" r="1.5"/><circle cx="9.5" cy="9.5" r="1.5"/><line x1="5.3" y1="5.9" x2="8" y2="4.5"/><line x1="5.3" y1="7.1" x2="8" y2="8.5"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Tecnologia Social + Taxonomia Controlada</span>
            <span class="bitem-desc">Mapeamos e formalizamos o vocabulário real e os fluxos de conhecimento da organização. O que estava implícito passa a ser operável pela IA.</span>
          </div>
        </div>
        <div class="bitem s">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 10l2.5-3 2 2 2-3L11 8"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Entrada pelos processos</span>
            <span class="bitem-desc">Antes de conectar qualquer modelo, a gente entende como o trabalho realmente acontece e onde os dados que importam estão.</span>
          </div>
        </div>
        <div class="bitem s">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="1.5" y="4" width="4.5" height="6" rx="1.5"/><rect x="7" y="3" width="4.5" height="7" rx="1.5"/><line x1="3.75" y1="2" x2="3.75" y2="4"/><line x1="9.25" y1="1.5" x2="9.25" y2="3"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Arquitetura Neuro-Simbólica</span>
            <span class="bitem-desc">O modelo de linguagem narra e interpreta. A lógica formal verifica. O raciocínio é rastreável passo a passo, não uma caixa preta.</span>
          </div>
        </div>
      </div>
    </div>

    <p class="bridge-note">O <strong>Motor Determinístico</strong> garante que cálculos e aplicações de regras sejam sempre idênticos: mesma entrada, mesma saída, sem variação por sessão ou usuário. Essencial em qualquer contexto onde precisão não é opcional.</p>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 8 — EXPERIÊNCIA
════════════════════════════════ -->
<div class="slide" data-index="7">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s-exp-w">
    <p class="lab">Projetos em desenvolvimento</p>
    <h2 class="hdl">Três organizações construindo<br>inteligência como infraestrutura.</h2>

    <div class="exp-grid">

      <div class="exp-card">
        <div class="exp-sector">Fintech · Pagamentos</div>
        <p class="exp-title">Uma empresa que pensa com dados próprios</p>
        <p class="exp-desc">Uma startup de recuperação de vendas em crescimento acelerado que, quando o projeto estiver em produção, competirá não só por produto, mas pela qualidade da sua própria inteligência. A área de Customer Success não apenas gerenciará clientes: antecipará comportamentos. A vantagem competitiva passará a ser sistêmica e proprietária, impossível de replicar comprando ferramenta.</p>
      </div>

      <div class="exp-card">
        <div class="exp-sector">Marketing Digital · Agência</div>
        <p class="exp-title">A inteligência da agência, acessível a qualquer hora</p>
        <p class="exp-desc">Uma das maiores agências de marketing do Brasil onde clientes poderão acessar inteligência sobre suas campanhas a qualquer momento, em linguagem natural, sem esperar relatório ou analista. Internamente, anos de aprendizado acumulado passarão de apresentações esquecidas para ativos operacionais. O diferencial competitivo migrará do talento individual para a arquitetura de conhecimento que a agência construiu.</p>
      </div>

      <div class="exp-card">
        <div class="exp-sector">Entretenimento · Conglomerado</div>
        <p class="exp-title">O capital criativo do elenco como ativo estratégico</p>
        <p class="exp-desc">Uma plataforma onde anos de fragmentos, observações e ideias de cada criador param de se perder quando uma temporada termina ou um talento muda de projeto. Cada voz é preservada e amplificada pela IA sem ser homogeneizada. O conglomerado transforma seu acervo criativo coletivo em ativo proprietário, impossível de replicar por competidores que dependem de ferramentas genéricas.</p>
      </div>

    </div>

    <p class="exp-note">Projetos em andamento, identificações preservadas por confidencialidade</p>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 9 — ENCERRAMENTO
════════════════════════════════ -->
<div class="slide s-close" data-index="8">
  <div class="ring r1" style="opacity:.6"></div>
  <div class="ring r2"></div>
  <svg class="arc" style="top:-80px;right:-80px;width:420px;opacity:.035" viewBox="0 0 400 400" fill="none">
    <circle cx="200" cy="200" r="178" stroke="var(--cyan)" stroke-width="1"/>
    <circle cx="200" cy="200" r="118" stroke="var(--cyan)" stroke-width=".6"/>
  </svg>
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="close-wrap">
    <p class="lab" style="justify-content:center">EXP³</p>
    <h2 class="close-hdl">Gostamos de trabalhar em<br><span>terrenos não mapeados</span></h2>
    <p class="close-body">
      Esse mundo de IA em organizações ainda está sendo construído. Não existem receitas prontas, e a maioria das implementações que a gente vê ainda está tentando descobrir o que funciona de verdade.<br><br>
      A EXP³ prefere os desafios que ainda <strong>não têm resposta pronta</strong>. Quanto mais específico o problema, mais interessante fica para a gente.
    </p>
    <div class="close-line"></div>
    <div class="close-tag">
      Se a conversa fez sentido, queremos ouvir e explorar juntos. <strong>Qual é o desafio do Pinheiro Neto Advogados quando o assunto é implementação de IA em nível organizacional?</strong>
    </div>
  </div>
</div>


<!-- ════════════════════════════════
     SLIDE 10 — CONTATO
════════════════════════════════ -->
<div class="slide s-contact" data-index="9">
  <div class="ring r1" style="opacity:.4"></div>
  <div class="ring r2" style="opacity:.5"></div>
  <svg class="arc" style="bottom:-100px;left:-100px;width:450px;opacity:.03" viewBox="0 0 400 400" fill="none">
    <circle cx="200" cy="200" r="178" stroke="var(--cyan)" stroke-width="1"/>
    <circle cx="200" cy="200" r="118" stroke="var(--cyan)" stroke-width=".7"/>
  </svg>
  <div class="contact-wrap">
    <div class="contact-logo">EXP<sup>³</sup></div>
    <div class="contact-tagline">Implementação organizacional de IA</div>
    <div class="contact-divider"></div>
    <div class="contact-name">Thiago Padovan</div>
    <div class="contact-role">Founder</div>
    <div class="contact-info-grid">
      <div class="contact-info-row">
        <svg class="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <span class="contact-info-text">thiago@exp3.ai</span>
      </div>
      <div class="contact-info-row">
        <svg class="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.99-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span class="contact-info-text">11 98338-9707</span>
      </div>
    </div>
  </div>
</div>


<!-- ════════════════════════════════
     BACKUP — ARQUITETURA TÉCNICA
════════════════════════════════ -->
<div class="slide" data-index="10">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="backup-badge">Referência técnica</div>
  <div class="s5-w">
    <p class="lab">Arquitetura</p>
    <h2 class="hdl" style="margin-bottom:20px;font-size:clamp(18px,2.2vw,26px)">Como os motores funcionam juntos</h2>

    <div class="pipe-full">
      <div class="stg">
        <div class="stg-n">01 · Entrada</div>
        <svg class="stg-ico" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <ellipse cx="22" cy="10" rx="13" ry="4.5"/>
          <path d="M9 10v8c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5V10"/>
          <path d="M9 18v8c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5v-8"/>
          <path d="M9 26v7c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5v-7"/>
        </svg>
        <p class="stg-tt">Dados da Organização</p>
        <p class="stg-d">Sistemas, documentos, contratos e conhecimento tácito dos especialistas.</p>
        <ul class="stg-ul">
          <li>Bases e sistemas existentes</li>
          <li>Conhecimento implícito</li>
          <li>Processos não formalizados</li>
        </ul>
      </div>

      <div class="conn"></div>

      <div class="stg hl">
        <div class="stg-n">02 · Metodologia EXP³</div>
        <svg class="stg-ico" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <circle cx="22" cy="12" r="5"/>
          <circle cx="10" cy="32" r="4.5"/>
          <circle cx="34" cy="32" r="4.5"/>
          <circle cx="22" cy="36" r="3.5"/>
          <line x1="18" y1="16" x2="12" y2="28"/>
          <line x1="26" y1="16" x2="32" y2="28"/>
          <line x1="14.5" y1="32" x2="18.5" y2="35"/>
          <line x1="29.5" y1="32" x2="25.5" y2="35"/>
        </svg>
        <p class="stg-tt">Tecnologia Social + Taxonomia</p>
        <p class="stg-d">Mapeamos fluxos de conhecimento e criamos vocabulário controlado operável por máquina.</p>
        <ul class="stg-ul">
          <li>Mapeamento de fluxos</li>
          <li>Vocabulário controlado</li>
          <li>Extração do implícito</li>
          <li>Formalização de regras</li>
        </ul>
      </div>

      <div class="conn"></div>

      <div class="motors-wrap">
        <div class="motors-label">03 · Processamento</div>
        <div class="mcard">
          <div class="mcard-label">Motor Determinístico</div>
          <p class="mcard-tt">Calcula com exatidão absoluta</p>
          <p class="mcard-d">Mesma entrada, sempre mesma saída. Auditável em cada etapa. Substitui o LLM onde precisão é obrigatória.</p>
          <div class="mcard-tag">Sem variação por sessão</div>
        </div>
        <div class="mcard">
          <div class="mcard-label">Motor Analítico-Simbólico</div>
          <p class="mcard-tt">Raciocina com regras formais</p>
          <p class="mcard-d">Inferência encadeada e documentada. O caminho inteiro do raciocínio fica visível, não só a conclusão.</p>
          <div class="mcard-tag">Regras do negócio com precisão</div>
        </div>
      </div>

      <div class="conn-b"></div>

      <div class="result-card">
        <svg class="result-ico" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 5h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H12l-8 5V7a2 2 0 0 1 2-2z"/>
          <line x1="11" y1="14" x2="25" y2="14"/>
          <line x1="11" y1="19" x2="20" y2="19"/>
        </svg>
        <p class="result-title">O LLM narra e interpreta o resultado</p>
        <div class="result-tags">
          <div class="result-tag"><span class="result-dot"></span>Consistente</div>
          <div class="result-tag"><span class="result-dot"></span>Auditável</div>
          <div class="result-tag"><span class="result-dot"></span>Previsível</div>
          <div class="result-tag"><span class="result-dot"></span>Rastreável</div>
        </div>
      </div>
    </div>
  </div>
</div>


</div><!-- /deck -->

<div class="progress-bar" id="progress"></div>
<nav class="nav-dots" id="navDots"></nav>
<div class="nav-btns">
  <button class="nav-btn" id="prevBtn" title="Anterior">&#8592;</button>
  <button class="nav-btn" id="nextBtn" title="Próximo">&#8594;</button>
</div>
<div class="slide-counter" id="counter"></div>

<script>
(function(){
  var slides=document.querySelectorAll('.slide');
  var dotsNav=document.getElementById('navDots');
  var progress=document.getElementById('progress');
  var counter=document.getElementById('counter');
  var total=slides.length;
  var current=0,busy=false,dotEls=[];

  slides.forEach(function(_,i){
    var d=document.createElement('div');
    d.className='dot'+(i===0?' active':'');
    d.addEventListener('click',function(){goTo(i)});
    dotsNav.appendChild(d);dotEls.push(d);
  });

  function goTo(n){
    if(busy||n===current||n<0||n>=total)return;
    busy=true;var old=current;
    slides[old].classList.add('leaving');
    setTimeout(function(){slides[old].classList.remove('active','leaving')},500);
    slides[n].classList.add('active');
    dotEls[old].classList.remove('active');
    dotEls[n].classList.add('active');
    current=n;update();
    setTimeout(function(){busy=false},550);
  }

  function update(){
    progress.style.width=((current+1)/total*100)+'%';
    counter.textContent=(current+1)+' / '+total;
  }

  document.getElementById('nextBtn').addEventListener('click',function(){goTo(current+1)});
  document.getElementById('prevBtn').addEventListener('click',function(){goTo(current-1)});
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='ArrowDown')goTo(current+1);
    if(e.key==='ArrowLeft'||e.key==='ArrowUp')goTo(current-1);
  });
  var tx=0;
  document.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  document.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-tx;
    if(dx<-40)goTo(current+1);if(dx>40)goTo(current-1);
  },{passive:true});
  update();
})();
</script>
</body>
</html>
`;
