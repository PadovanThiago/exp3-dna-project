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
  pointer-events:none;z-index:1;overflow:hidden;
}
.slide.active{opacity:1;transform:translateX(0);pointer-events:all}
.slide.leaving{opacity:0;transform:translateX(-44px)}

/* ── CHROME ── */
.progress-bar{position:fixed;bottom:0;left:0;height:2px;background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.3));transition:width .4s ease;z-index:200}
.nav-dots{position:fixed;right:22px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;z-index:200}
.dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.14);cursor:pointer;transition:background .3s,transform .3s}
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
.lab.org{color:var(--orange)}
.lab.org::before{background:var(--orange)}
.hdl{font-size:clamp(22px,2.7vw,34px);font-weight:700;letter-spacing:-.5px;line-height:1.25;margin-bottom:28px}

/* ── DIMENSION BADGE ── */
.dim-badge{
  display:inline-flex;align-items:center;gap:8px;
  border-radius:8px;padding:6px 14px;margin-bottom:16px;
  font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
}
.dim-badge.org{background:rgba(255,107,51,.1);border:1px solid rgba(255,107,51,.25);color:var(--orange)}
.dim-badge.tech{background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.22);color:var(--cyan)}
.dim-badge svg{width:13px;height:13px;flex-shrink:0}

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
   SLIDE 3 — COMPRESSÃO VS TRANSFORMAÇÃO
══════════════════════════════════════════ */
.s-compress-w{width:100%;max-width:960px}
.compress-grid{display:grid;grid-template-columns:1fr 40px 1fr;gap:0;align-items:stretch;margin-bottom:18px}
.compress-col{display:flex;flex-direction:column;gap:8px;padding:0 4px}
.compress-head{
  font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  padding:0 0 12px;margin-bottom:4px;display:flex;align-items:center;gap:8px;
  border-bottom:1px solid;
}
.compress-col.problem .compress-head{color:var(--orange);border-color:rgba(255,107,51,.2)}
.compress-col.insight .compress-head{color:var(--emerald);border-color:rgba(0,199,123,.2)}
.compress-item{
  border-radius:10px;padding:13px 16px;border:1px solid;
}
.compress-col.problem .compress-item{background:rgba(255,107,51,.04);border-color:rgba(255,107,51,.14)}
.compress-col.insight .compress-item{background:rgba(0,199,123,.05);border-color:rgba(0,199,123,.18)}
.compress-item-title{font-size:clamp(13px,1.3vw,15px);font-weight:700;margin-bottom:5px}
.compress-col.problem .compress-item-title{color:var(--fg)}
.compress-col.insight .compress-item-title{color:var(--fg)}
.compress-item-text{font-size:clamp(13px,1.25vw,15px);color:var(--fg2);line-height:1.6}
.compress-mid{
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  padding-top:38px;
}
.compress-mid-line{width:1.5px;flex:1;max-height:80px;border-radius:2px;background:rgba(255,255,255,.06)}
.compress-mid-ico{
  width:30px;height:30px;border-radius:50%;
  background:var(--bg2);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;color:var(--fg3);
}
.compress-distinction{
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
  border-radius:10px;padding:14px 20px;
  display:grid;grid-template-columns:1fr 1px 1fr;gap:0;
}
.compress-def{padding:6px 18px;text-align:center}
.compress-def:first-child{padding-left:6px}
.compress-def:last-child{padding-right:6px}
.compress-divider{background:rgba(255,255,255,.07);width:1px}
.compress-def-label{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px}
.compress-col.problem+.compress-mid~.compress-col.insight .compress-def-label{color:var(--emerald)}
.compress-def-label.p{color:var(--orange)}
.compress-def-label.t{color:var(--emerald)}
.compress-def-text{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.55}

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
   SLIDE 5 — DUAS DIMENSÕES (BIFURCAÇÃO)
══════════════════════════════════════════ */
.bifurc-w{width:100%;max-width:900px}
.bifurc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}
.bifurc-card{
  border-radius:var(--rad);padding:26px 24px 22px;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.bifurc-card.org{
  background:linear-gradient(150deg,rgba(255,107,51,.1),var(--bg3) 60%);
  border:1px solid rgba(255,107,51,.22);
}
.bifurc-card.tech{
  background:linear-gradient(150deg,rgba(0,217,255,.09),var(--bg3) 60%);
  border:1px solid rgba(0,217,255,.22);
}
.bifurc-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2.5px;
  border-radius:2px 2px 0 0;
}
.bifurc-card.org::after{background:linear-gradient(90deg,var(--orange),rgba(255,107,51,.2))}
.bifurc-card.tech::after{background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.2))}
.bifurc-ico{
  width:40px;height:40px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;margin-bottom:14px;
}
.bifurc-card.org .bifurc-ico{background:rgba(255,107,51,.1);border:1px solid rgba(255,107,51,.22)}
.bifurc-card.tech .bifurc-ico{background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.2)}
.bifurc-card.org .bifurc-ico svg{color:var(--orange)}
.bifurc-card.tech .bifurc-ico svg{color:var(--cyan)}
.bifurc-label{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:8px}
.bifurc-card.org .bifurc-label{color:var(--orange)}
.bifurc-card.tech .bifurc-label{color:var(--cyan)}
.bifurc-tt{font-size:clamp(16px,1.6vw,20px);font-weight:700;color:var(--fg);margin-bottom:12px;line-height:1.3}
.bifurc-ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.bifurc-ul li{font-size:clamp(13px,1.3vw,15px);line-height:1.6;padding-left:16px;position:relative;color:var(--fg2)}
.bifurc-card.org .bifurc-ul li::before{content:'';position:absolute;left:0;top:9px;width:6px;height:1.5px;background:var(--orange);opacity:.7}
.bifurc-card.tech .bifurc-ul li::before{content:'';position:absolute;left:0;top:9px;width:6px;height:1.5px;background:var(--cyan);opacity:.7}
.bifurc-note{
  text-align:center;padding:12px 20px;
  background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);border-radius:10px;
  font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.6;font-style:italic;
}
.bifurc-note strong{color:var(--fg);font-weight:600;font-style:normal}

/* ══════════════════════════════════════════
   SLIDES 6, 7, 8 — DIMENSÃO ORGANIZACIONAL
══════════════════════════════════════════ */
.dim-w{width:100%;max-width:980px}
.dim-w.narrow{max-width:900px}

/* Manifestações organizacionais — 3 cards */
.manifest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:16px}
.manifest-card{
  background:var(--bg3);border:1px solid rgba(255,107,51,.14);border-radius:var(--rad);
  padding:22px 18px 18px;display:flex;flex-direction:column;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.manifest-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,rgba(255,107,51,.6),rgba(255,107,51,.1));
  border-radius:2px 2px 0 0;
}
.manifest-n{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--orange);opacity:.7;margin-bottom:10px}
.manifest-ico{
  width:34px;height:34px;border-radius:9px;
  background:rgba(255,107,51,.09);border:1px solid rgba(255,107,51,.2);
  display:flex;align-items:center;justify-content:center;margin-bottom:12px;
}
.manifest-ico svg{width:17px;height:17px;color:var(--orange)}
.manifest-tt{font-size:clamp(14px,1.4vw,17px);font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:9px}
.manifest-d{font-size:clamp(13px,1.25vw,15px);color:var(--fg2);line-height:1.65;flex:1;margin-bottom:12px}
.manifest-tag{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(255,107,51,.07);border:1px solid rgba(255,107,51,.18);
  border-radius:6px;padding:5px 10px;
  font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--orange);align-self:flex-start;
}

/* Por que é difícil — dois momentos */
.reveal-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
.reveal-card{
  border-radius:var(--rad);padding:22px 20px 18px;
  box-shadow:var(--sh-sm);
}
.reveal-card.what{
  background:rgba(255,107,51,.04);border:1px solid rgba(255,107,51,.14);
}
.reveal-card.why{
  background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);
}
.reveal-label{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:10px}
.reveal-card.what .reveal-label{color:var(--orange)}
.reveal-card.why .reveal-label{color:var(--fg3)}
.reveal-tt{font-size:clamp(15px,1.5vw,18px);font-weight:700;color:var(--fg);margin-bottom:12px;line-height:1.3}
.reveal-body{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.7}
.reveal-body strong{color:var(--fg);font-weight:600}

.dim-quote{
  background:rgba(255,107,51,.04);border:1px solid rgba(255,107,51,.16);
  border-radius:10px;padding:13px 20px;text-align:center;
  font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.65;font-style:italic;
  margin-bottom:14px;
}
.dim-quote strong{color:var(--fg);font-weight:600;font-style:normal}

/* Resposta organizacional */
.org-resp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
.org-resp-step{
  background:var(--bg3);border:1px solid rgba(255,107,51,.14);border-radius:12px;
  padding:18px 16px 14px;display:flex;flex-direction:column;
  position:relative;overflow:hidden;
}
.org-resp-step::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,rgba(255,107,51,.5),transparent);
}
.org-step-n{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--orange);opacity:.65;margin-bottom:10px}
.org-step-tt{font-size:clamp(13px,1.3vw,15px);font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:8px}
.org-step-d{font-size:clamp(12px,1.2vw,14px);color:var(--fg2);line-height:1.6;flex:1}

.org-resp-note{
  padding:12px 18px;
  background:linear-gradient(90deg,rgba(255,107,51,.06),rgba(0,217,255,.04));
  border:1px solid rgba(255,255,255,.07);border-radius:10px;text-align:center;
  font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.55;
}
.org-resp-note strong{color:var(--fg);font-weight:700}
.org-resp-note em{color:var(--orange);font-style:normal;font-weight:600}

/* ══════════════════════════════════════════
   SLIDES 9, 10, 11 — DIMENSÃO TECNOLÓGICA
══════════════════════════════════════════ */
/* Desafios tecnológicos — 3 cards com cyan */
.tech-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:16px}
.tech-card{
  background:var(--bg3);border:1px solid rgba(0,217,255,.14);border-radius:var(--rad);
  padding:22px 18px 18px;display:flex;flex-direction:column;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.tech-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,rgba(0,217,255,.6),rgba(0,217,255,.1));
  border-radius:2px 2px 0 0;
}
.tech-n{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan);opacity:.7;margin-bottom:10px}
.tech-ico{
  width:34px;height:34px;border-radius:9px;
  background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.2);
  display:flex;align-items:center;justify-content:center;margin-bottom:12px;
}
.tech-ico svg{width:17px;height:17px;color:var(--cyan)}
.tech-tt{font-size:clamp(14px,1.4vw,17px);font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:9px}
.tech-d{font-size:clamp(13px,1.25vw,15px);color:var(--fg2);line-height:1.65;flex:1;margin-bottom:12px}
.tech-tag{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(0,217,255,.07);border:1px solid rgba(0,217,255,.2);
  border-radius:6px;padding:5px 10px;
  font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--cyan);align-self:flex-start;
}

/* Por que é difícil — tech */
.tech-reveal-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
.tech-reveal-card{
  border-radius:var(--rad);padding:22px 20px 18px;
  box-shadow:var(--sh-sm);
}
.tech-reveal-card.what{background:rgba(0,217,255,.04);border:1px solid rgba(0,217,255,.16)}
.tech-reveal-card.why{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07)}
.tech-reveal-label{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:10px}
.tech-reveal-card.what .tech-reveal-label{color:var(--cyan)}
.tech-reveal-card.why .tech-reveal-label{color:var(--fg3)}
.tech-reveal-tt{font-size:clamp(15px,1.5vw,18px);font-weight:700;color:var(--fg);margin-bottom:12px;line-height:1.3}
.tech-reveal-body{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.7}
.tech-reveal-body strong{color:var(--fg);font-weight:600}

.tech-quote{
  background:rgba(0,217,255,.04);border:1px solid rgba(0,217,255,.14);
  border-radius:10px;padding:13px 20px;text-align:center;
  font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.65;font-style:italic;
  margin-bottom:14px;
}
.tech-quote strong{color:var(--fg);font-weight:600;font-style:normal}

/* Arquitetura de resposta — 3 motores */
.motors-arch{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:16px}
.motor-card{
  border-radius:var(--rad);padding:22px 18px 18px;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.motor-card.llm{background:linear-gradient(150deg,rgba(0,217,255,.09),var(--bg3) 60%);border:1px solid rgba(0,217,255,.22)}
.motor-card.det{background:linear-gradient(150deg,rgba(0,199,123,.08),var(--bg3) 60%);border:1px solid rgba(0,199,123,.2)}
.motor-card.sym{background:linear-gradient(150deg,rgba(255,107,51,.07),var(--bg3) 60%);border:1px solid rgba(255,107,51,.2)}
.motor-label{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}
.motor-card.llm .motor-label{color:var(--cyan)}
.motor-card.det .motor-label{color:var(--emerald)}
.motor-card.sym .motor-label{color:var(--orange)}
.motor-ico{
  width:36px;height:36px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;margin-bottom:12px;
}
.motor-card.llm .motor-ico{background:rgba(0,217,255,.1);border:1px solid rgba(0,217,255,.22)}
.motor-card.det .motor-ico{background:rgba(0,199,123,.1);border:1px solid rgba(0,199,123,.22)}
.motor-card.sym .motor-ico{background:rgba(255,107,51,.08);border:1px solid rgba(255,107,51,.2)}
.motor-ico svg{width:18px;height:18px}
.motor-card.llm .motor-ico svg{color:var(--cyan)}
.motor-card.det .motor-ico svg{color:var(--emerald)}
.motor-card.sym .motor-ico svg{color:var(--orange)}
.motor-tt{font-size:clamp(14px,1.4vw,17px);font-weight:700;color:var(--fg);margin-bottom:9px;line-height:1.3}
.motor-d{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.65;flex:1;margin-bottom:10px}
.motor-card{display:flex;flex-direction:column}
.motor-prop{
  display:inline-flex;align-items:center;gap:6px;
  border-radius:6px;padding:5px 10px;
  font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
  align-self:flex-start;
}
.motor-card.llm .motor-prop{background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.2);color:var(--cyan)}
.motor-card.det .motor-prop{background:rgba(0,199,123,.08);border:1px solid rgba(0,199,123,.2);color:var(--emerald)}
.motor-card.sym .motor-prop{background:rgba(255,107,51,.07);border:1px solid rgba(255,107,51,.18);color:var(--orange)}

.tech-resp-note{
  padding:12px 18px;
  background:rgba(0,217,255,.04);
  border:1px solid rgba(0,217,255,.14);border-radius:10px;text-align:center;
  font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.55;
}
.tech-resp-note strong{color:var(--fg);font-weight:700}

/* ══════════════════════════════════════════
   SLIDE 12 — EXPERIÊNCIA / CASES
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
.exp-title{font-size:clamp(14px,1.45vw,17px);font-weight:700;color:var(--fg);line-height:1.35;margin-bottom:12px}
.exp-desc{font-size:clamp(13px,1.25vw,15px);color:var(--fg2);line-height:1.75;flex:1}
.exp-note{
  margin-top:20px;text-align:center;
  font-size:clamp(12px,1.2vw,14px);color:var(--fg3);font-style:italic;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.exp-note::before,.exp-note::after{content:'';flex:1;max-width:60px;height:1px;background:rgba(255,255,255,.08)}

/* ══════════════════════════════════════════
   SLIDE 13 — TIME
══════════════════════════════════════════ */
.team-w{width:100%;max-width:980px}
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:18px}
.team-card{
  background:var(--bg3);border:1px solid var(--border);border-radius:var(--rad);
  padding:28px 22px 24px;display:flex;flex-direction:column;align-items:flex-start;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.team-card:first-child{
  border-color:rgba(0,217,255,.2);
  background:linear-gradient(150deg,rgba(0,217,255,.06),var(--bg3) 55%);
}
.team-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  border-radius:2px 2px 0 0;
  background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.15));
}
.team-avatar{
  width:48px;height:48px;border-radius:14px;
  background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.18);
  display:flex;align-items:center;justify-content:center;margin-bottom:16px;
}
.team-card:nth-child(2) .team-avatar{background:rgba(255,107,51,.07);border-color:rgba(255,107,51,.18)}
.team-card:nth-child(3) .team-avatar{background:rgba(0,199,123,.07);border-color:rgba(0,199,123,.18)}
.team-avatar svg{width:22px;height:22px;color:var(--cyan)}
.team-card:nth-child(2) .team-avatar svg{color:var(--orange)}
.team-card:nth-child(3) .team-avatar svg{color:var(--emerald)}
.team-name{font-size:clamp(16px,1.6vw,19px);font-weight:700;color:var(--fg);margin-bottom:4px;line-height:1.2}
.team-role{font-size:clamp(12px,1.2vw,14px);font-weight:500;color:var(--cyan);letter-spacing:.04em;margin-bottom:16px}
.team-card:nth-child(2) .team-role{color:var(--orange)}
.team-card:nth-child(3) .team-role{color:var(--emerald)}
.team-bio{font-size:clamp(13px,1.25vw,15px);color:var(--fg2);line-height:1.7;flex:1}
.team-note{
  padding:13px 20px;
  background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);border-radius:10px;
  text-align:center;font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.65;
}
.team-note strong{color:var(--fg);font-weight:600}

/* ══════════════════════════════════════════
   SLIDE 14 — ENCERRAMENTO
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
   SLIDE 15 — CONTATO
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

/* ════════════════════════════════════════════
   CAPAS DE SEÇÃO
════════════════════════════════════════════ */
.s-section-cover{text-align:center}
.s-section-cover.sec-org{background:radial-gradient(ellipse 65% 58% at 50% 48%,rgba(50,15,0,.55),var(--bg) 72%)}
.s-section-cover.sec-tech{background:radial-gradient(ellipse 65% 58% at 50% 48%,rgba(0,30,65,.55),var(--bg) 72%)}
.s-section-cover.sec-cases{background:radial-gradient(ellipse 65% 58% at 50% 48%,rgba(0,35,20,.45),var(--bg) 72%)}
.sec-cover-wrap{max-width:640px;position:relative;z-index:2;display:flex;flex-direction:column;align-items:center}
.sec-cover-label{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin-bottom:24px;display:flex;align-items:center;gap:14px}
.s-section-cover.sec-org .sec-cover-label{color:var(--orange)}
.s-section-cover.sec-tech .sec-cover-label{color:var(--cyan)}
.s-section-cover.sec-cases .sec-cover-label{color:var(--emerald)}
.sec-cover-label::before,.sec-cover-label::after{content:'';display:inline-block;width:32px;height:1px}
.s-section-cover.sec-org .sec-cover-label::before,.s-section-cover.sec-org .sec-cover-label::after{background:rgba(255,107,51,.35)}
.s-section-cover.sec-tech .sec-cover-label::before,.s-section-cover.sec-tech .sec-cover-label::after{background:rgba(0,217,255,.35)}
.s-section-cover.sec-cases .sec-cover-label::before,.s-section-cover.sec-cases .sec-cover-label::after{background:rgba(0,199,123,.35)}
.sec-cover-title{font-size:clamp(40px,6vw,74px);font-weight:800;letter-spacing:-2.5px;line-height:1.05;margin-bottom:26px;color:var(--fg)}
.s-section-cover.sec-org .sec-cover-title span{background:linear-gradient(135deg,var(--orange),#FF9A6C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.s-section-cover.sec-tech .sec-cover-title span{background:linear-gradient(135deg,var(--cyan),#80EEFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.s-section-cover.sec-cases .sec-cover-title span{background:linear-gradient(135deg,var(--emerald),#5FFFC0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sec-cover-div{width:48px;height:2px;border-radius:2px;margin:0 auto 26px}
.s-section-cover.sec-org .sec-cover-div{background:linear-gradient(90deg,var(--orange),rgba(255,107,51,.15))}
.s-section-cover.sec-tech .sec-cover-div{background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.15))}
.s-section-cover.sec-cases .sec-cover-div{background:linear-gradient(90deg,var(--emerald),rgba(0,199,123,.15))}
.sec-cover-sub{font-size:clamp(15px,1.5vw,18px);color:var(--fg2);line-height:1.78;max-width:500px;text-align:center}

/* Think Tank Card Enhanced */
.team-note-enhanced{
  padding:22px 28px;
  background:linear-gradient(135deg,rgba(0,217,255,.07),rgba(255,255,255,.02));
  border:1px solid rgba(0,217,255,.2);border-radius:var(--rad);
}
.team-note-enhanced-title{
  font-size:clamp(12px,1.2vw,14px);font-weight:700;color:var(--cyan);
  margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase;
  display:flex;align-items:center;gap:10px;
}
.team-note-enhanced-title::before{content:'';display:inline-block;width:20px;height:1.5px;background:var(--cyan);border-radius:2px;flex-shrink:0}
.team-note-enhanced-body{font-size:clamp(13px,1.3vw,15px);color:var(--fg2);line-height:1.75}
.team-note-enhanced-body strong{color:var(--fg);font-weight:600}

</style>
</head>
<body>
<div class="deck" id="deck">

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

<div class="slide" data-index="1">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s-research-w">
    <p class="lab">O que a pesquisa mais recente mostra</p>
    <h2 class="hdl">51 implementações reais analisadas.<br>Os padrões são consistentes.</h2>

    <p style="font-size:clamp(14px,1.35vw,16px);color:var(--fg2);line-height:1.7;margin-bottom:20px;max-width:860px">Pesquisa conduzida pela Stanford Digital Economy Lab que analisou 51 implementações reais de IA em 41 organizações de 7 países e 9 setores diferentes. Ao contrário de estudos baseados em intenção ou expectativa, este trabalho acompanhou projetos que saíram do piloto e entraram em operação — mapeando o que funcionou, o que falhou e por quê. Os dados abaixo refletem os padrões consistentes encontrados nessa amostra.</p>

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

<div class="slide" data-index="2">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s-compress-w">
    <p class="lab">Por que a maioria falha</p>
    <h2 class="hdl">IA amplifica o que encontra.<br>Se o processo está quebrado, ela quebra mais rápido.</h2>

    <div class="compress-grid">
      <div class="compress-col problem">
        <div class="compress-head">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="3" y1="3" x2="10" y2="10"/><line x1="10" y1="3" x2="3" y2="10"/></svg>
          O que a maioria das organizações faz
        </div>
        <div class="compress-item">
          <div class="compress-item-title">Escolhe uma ferramenta de IA</div>
          <div class="compress-item-text">A decisão começa pela tecnologia, não pelo problema. A pergunta é "qual IA usar?" em vez de "o que queremos mudar?"</div>
        </div>
        <div class="compress-item">
          <div class="compress-item-title">Aplica ao processo existente</div>
          <div class="compress-item-text">O processo já existia, com suas inconsistências e julgamentos implícitos. A IA é encaixada sem questionar a lógica por trás.</div>
        </div>
        <div class="compress-item">
          <div class="compress-item-title">Espera o resultado</div>
          <div class="compress-item-text">O output chega mais rápido. Mas o que era impreciso ficou mais impreciso. O que era inconsistente ficou mais inconsistente.</div>
        </div>
      </div>

      <div class="compress-mid">
        <div class="compress-mid-line"></div>
        <div class="compress-mid-ico">⟷</div>
        <div class="compress-mid-line"></div>
      </div>

      <div class="compress-col insight">
        <div class="compress-head">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><polyline points="2,7 5,10 11,3"/></svg>
          O que a pesquisa identifica como diferença
        </div>
        <div class="compress-item">
          <div class="compress-item-title">A pergunta certa não é "como automatizar"</div>
          <div class="compress-item-text">É "o que se torna possível quando inteligência fica barata?" Essa pergunta muda o ponto de partida — e o resultado.</div>
        </div>
        <div class="compress-item">
          <div class="compress-item-title">Processo precisa ser redesenhado antes</div>
          <div class="compress-item-text">Organizações bem-sucedidas mapearam o que realmente acontecia, formalizaram os julgamentos implícitos, e só então conectaram a tecnologia.</div>
        </div>
        <div class="compress-item">
          <div class="compress-item-title">A distinção que define o resultado</div>
          <div class="compress-item-text">Compressão é fazer o mesmo mais rápido. Transformação é criar capacidades que antes não existiam economicamente. Nenhum volume de IA converte a primeira na segunda.</div>
        </div>
      </div>
    </div>

    <div class="compress-distinction">
      <div class="compress-def">
        <div class="compress-def-label p">Compressão</div>
        <div class="compress-def-text">Mesmo processo, mais rápido. O modelo de negócio não muda. A proposta de valor não muda. Só o atrito diminuiu.</div>
      </div>
      <div class="compress-divider"></div>
      <div class="compress-def">
        <div class="compress-def-label t">Transformação</div>
        <div class="compress-def-text">Novas capacidades que antes não existiam economicamente. Muda o que é possível fazer — não só o custo do que já era possível.</div>
      </div>
    </div>
  </div>
</div>

<div class="slide" data-index="3">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s2-w">
    <p class="lab">Onde atuamos</p>
    <h2 class="hdl">Dois contextos com desafios<br>fundamentalmente diferentes.</h2>

    <div class="two-col">
      <div class="ccard">
        <div class="tp">Uso Individual</div>
        <div class="ico-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </div>
        <div class="tt">IA como ferramenta pessoal</div>
        <ul>
          <li>Uma pessoa, uma tarefa</li>
          <li>Contexto único e conhecido</li>
          <li>Resultado imediato e individual</li>
          <li>Adoção simples, escala limitada</li>
        </ul>
      </div>
      <div class="vs">vs</div>
      <div class="ccard gl">
        <div class="tp">Implementação Organizacional</div>
        <div class="ico-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
        </div>
        <div class="tt">IA com o conhecimento da organização</div>
        <ul>
          <li>Múltiplas equipes, múltiplos contextos</li>
          <li>Conhecimento distribuído e implícito</li>
          <li>Consistência e rastreabilidade ao longo do tempo</li>
          <li>Exige redesenho de processos e estrutura de dados</li>
        </ul>
      </div>
    </div>

    <div class="dois-note">A EXP³ atua na implementação organizacional.</div>
  </div>
</div>

<div class="slide" data-index="4">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="bifurc-w">
    <p class="lab">A complexidade da implementação</p>
    <h2 class="hdl">Implementação organizacional tem dois lados.<br>Falhar em qualquer um é suficiente para comprometer o projeto.</h2>

    <div class="bifurc-grid">
      <div class="bifurc-card org">
        <div class="bifurc-label">Dimensão Organizacional</div>
        <div class="bifurc-ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="bifurc-tt">Pessoas, conhecimento e processos</div>
        <ul class="bifurc-ul">
          <li>Como o conhecimento circula na organização</li>
          <li>Quem decide o quê, com que critérios</li>
          <li>O que está documentado vs. o que realmente acontece</li>
          <li>Como as pessoas adotam e confiam em novos sistemas</li>
        </ul>
      </div>
      <div class="bifurc-card tech">
        <div class="bifurc-label">Dimensão Tecnológica</div>
        <div class="bifurc-ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <div class="bifurc-tt">Sistemas, dados e arquitetura</div>
        <ul class="bifurc-ul">
          <li>Onde os dados existem e como estão conectados</li>
          <li>Como o modelo processa e gera as respostas</li>
          <li>Como o raciocínio é documentado e auditável</li>
          <li>Como a precisão é garantida em contextos críticos</li>
        </ul>
      </div>
    </div>

    <div class="bifurc-note">
      A seguir, exploramos cada dimensão em profundidade — o que é, por que é difícil, e como a EXP³ responde.
    </div>
  </div>
</div>

<div class="slide s-section-cover sec-org">
  <div class="ring r1" style="opacity:.28"></div>
  <div class="ring r2" style="opacity:.14"></div>
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="sec-cover-wrap">
    <div class="sec-cover-label">01 de 02</div>
    <h2 class="sec-cover-title">Dimensão<br><span>Organizacional</span></h2>
    <div class="sec-cover-div"></div>
    <p class="sec-cover-sub">Pessoas, conhecimento e processos — o que está implícito, por que é difícil, e como a EXP³ responde.</p>
  </div>
</div>

<div class="slide" data-index="5">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="dim-w">
    <div class="dim-badge org">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
      Dimensão Organizacional
    </div>
    <p class="lab org">O desafio real</p>
    <h2 class="hdl">O conhecimento que nunca precisou ser explicado<br>é o primeiro obstáculo da implementação.</h2>

    <div class="manifest-grid">
      <div class="manifest-card">
        <div class="manifest-n">01</div>
        <div class="manifest-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div class="manifest-tt">Processo oficial vs. processo real</div>
        <div class="manifest-d">A maioria das organizações tem dois processos: o documentado e o que as pessoas realmente fazem. IA executa o documentado. O resultado frequentemente parece errado — porque o processo real nunca foi registrado.</div>
        <div class="manifest-tag">Saber implícito, não estruturado</div>
      </div>

      <div class="manifest-card">
        <div class="manifest-n">02</div>
        <div class="manifest-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <div class="manifest-tt">Julgamento implícito sem dono</div>
        <div class="manifest-d">Decisões que pareciam simples têm lógica humana não escrita por trás. Quando IA tenta executar, o julgamento ausente fica visível — e frequentemente revela que pertencia a ninguém de forma explícita. Cada um entendia diferente.</div>
        <div class="manifest-tag">Responsabilidade não reclamada</div>
      </div>

      <div class="manifest-card">
        <div class="manifest-n">03</div>
        <div class="manifest-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><line x1="18" y1="14" x2="22" y2="14"/><line x1="20" y1="12" x2="20" y2="16"/></svg>
        </div>
        <div class="manifest-tt">Conhecimento que vivia nas pessoas</div>
        <div class="manifest-d">Parte do que funcionava era pessoal, local e reversível — ligado a alguém que podia adaptar em tempo real. Automatizar esse conhecimento sem formalizá-lo primeiro produz inconsistência em escala.</div>
        <div class="manifest-tag">Dado existe, acesso não</div>
      </div>
    </div>

    <div class="dim-quote">
      A IA não cria esses problemas. Ela os revela. Como luz de neon num escritório que parecia limpo — tudo que estava lá o tempo todo fica visível de uma vez.
    </div>
  </div>
</div>

<div class="slide" data-index="6">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="dim-w narrow">
    <div class="dim-badge org">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
      Dimensão Organizacional
    </div>
    <p class="lab org">Por que é difícil</p>
    <h2 class="hdl">Revelar os problemas é a parte mais desconfortável.<br>Mas é também o ponto onde a mudança começa.</h2>

    <div class="reveal-grid">
      <div class="reveal-card what">
        <div class="reveal-label">O que acontece quando a IA chega</div>
        <div class="reveal-tt">A organização se vê no espelho</div>
        <div class="reveal-body">
          Iniciativas que "estavam funcionando bem" revelam processos documentados que contradizem as práticas reais. Políticas que contradizem incentivos. Responsabilidades que todo mundo achava que eram de outra pessoa.<br><br>
          A IA não inventa esse cenário. Ela simplesmente executa o que encontra, sem o filtro humano que absorvia as inconsistências ao longo dos anos.
        </div>
      </div>
      <div class="reveal-card why">
        <div class="reveal-label">Por que organizações travam</div>
        <div class="reveal-tt">O momentum que não é momentum</div>
        <div class="reveal-body">
          Projetos de IA costumam acumular defensores internos antes de terem sido realmente provados. Parar parece fracasso. Continuar parece prudência. A organização fica no meio — com um sistema bom o suficiente para ter apoio político, mas não o suficiente para merecer confiança operacional.<br><br>
          <strong>O que parece momentum é frequentemente drift</strong>: comprometimentos que ninguém escolheu explicitamente, mas que ficam cada vez mais difíceis de reverter.
        </div>
      </div>
    </div>

    <div class="dim-quote" style="margin-bottom:0">
      "IA não remove julgamento. Ela expõe se ele foi algum dia claramente atribuído." Quando a resposta é não, a implementação encontra resistência que não é resistência à tecnologia — é a organização se deparando com sua própria ambiguidade.
    </div>
  </div>
</div>

<div class="slide" data-index="7">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="dim-w">
    <div class="dim-badge org">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
      Dimensão Organizacional
    </div>
    <p class="lab org">Como respondemos</p>
    <h2 class="hdl">Nossa resposta começa antes de qualquer tecnologia:<br>formalizamos o que está implícito.</h2>

    <div class="org-resp-grid">
      <div class="org-resp-step">
        <div class="org-step-n">Passo 01</div>
        <div class="org-step-tt">Mapeamos o processo real</div>
        <div class="org-step-d">Conversamos com quem faz o trabalho, não apenas com quem o documenta. O mapa resultante mostra onde o processo documentado e o processo real divergem — e onde a IA vai falhar se conectada sem esse diagnóstico.</div>
      </div>
      <div class="org-resp-step">
        <div class="org-step-n">Passo 02</div>
        <div class="org-step-tt">Tornamos julgamentos explícitos</div>
        <div class="org-step-d">Para cada ponto de decisão no processo, identificamos quem decide, com que critérios, e o que acontece em cada variação. O que era implícito vira instrução estruturada. O que era de ninguém ganha um dono.</div>
      </div>
      <div class="org-resp-step">
        <div class="org-step-n">Passo 03</div>
        <div class="org-step-tt">Construímos taxonomia controlada</div>
        <div class="org-step-d">Criamos um vocabulário controlado — termos com significado preciso e compartilhado em toda a organização. Sem isso, equipes diferentes descrevem a mesma coisa com palavras diferentes, e a IA não consegue conectar os pontos.</div>
      </div>
      <div class="org-resp-step">
        <div class="org-step-n">Passo 04</div>
        <div class="org-step-tt">Só então conectamos a tecnologia</div>
        <div class="org-step-d">Com o processo mapeado, o julgamento explícito e o vocabulário estruturado, a implementação técnica tem uma base sólida. O sistema executa com precisão porque o que ele executa foi pensado com precisão.</div>
      </div>
    </div>

    <div class="org-resp-note">
      Chamamos isso de <em>Tecnologia Social</em> com <em>Taxonomia Controlada</em>. <strong>É a infraestrutura organizacional que torna a IA confiável.</strong>
    </div>
  </div>
</div>

<div class="slide s-section-cover sec-tech">
  <div class="ring r1" style="opacity:.28"></div>
  <div class="ring r2" style="opacity:.14"></div>
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="sec-cover-wrap">
    <div class="sec-cover-label">02 de 02</div>
    <h2 class="sec-cover-title">Dimensão<br><span>Tecnológica</span></h2>
    <div class="sec-cover-div"></div>
    <p class="sec-cover-sub">Sistemas, dados e arquitetura — como conectar, estruturar e tornar o raciocínio auditável em contextos de alta exigência.</p>
  </div>
</div>

<div class="slide" data-index="8">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="dim-w">
    <div class="dim-badge tech">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      Dimensão Tecnológica
    </div>
    <p class="lab">O desafio real</p>
    <h2 class="hdl">Ter os dados não é suficiente.<br>Conectar, estruturar e rastrear o raciocínio é o trabalho.</h2>

    <div class="tech-grid">
      <div class="tech-card">
        <div class="tech-n">01</div>
        <div class="tech-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
        </div>
        <div class="tech-tt">Dado existe, acesso não</div>
        <div class="tech-d">Organizações como escritórios de advocacia acumulam décadas de conhecimento em documentos, contratos, pareceres e precedentes. Esse conhecimento está distribuído por múltiplos sistemas que raramente se falam. A IA não consegue usar o que não consegue alcançar.</div>
        <div class="tech-tag">Dado distribuído, não conectado</div>
      </div>

      <div class="tech-card">
        <div class="tech-n">02</div>
        <div class="tech-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div class="tech-tt">Modelos produzem respostas convincentes mesmo quando erram</div>
        <div class="tech-d">Modelos de linguagem geram texto fluente e aparentemente bem-fundamentado. Em contextos casuais, esse comportamento é útil. Em contextos jurídicos ou financeiros, uma resposta errada apresentada com confiança é mais perigosa que um erro óbvio.</div>
        <div class="tech-tag">Precisão não garantida</div>
      </div>

      <div class="tech-card">
        <div class="tech-n">03</div>
        <div class="tech-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="tech-tt">A resposta precisa ser defensável</div>
        <div class="tech-d">Clientes, tribunais e reguladores esperam raciocínio, não apenas conclusão. "A IA chegou a essa resposta" não é justificativa aceitável. Cada conclusão precisa mostrar o caminho percorrido, passo a passo, de forma que possa ser questionada e defendida.</div>
        <div class="tech-tag">Inferência não rastreável</div>
      </div>
    </div>

    <div class="tech-quote" style="margin-bottom:0">
      Em 59% das implementações analisadas pelo Stanford, os dados estavam espalhados por múltiplos sistemas de equipes diferentes. Organizações com décadas de documentos têm acervo vasto — mas raramente conectado de forma que um sistema de IA consiga usar.
    </div>
  </div>
</div>

<div class="slide" data-index="9">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="dim-w narrow">
    <div class="dim-badge tech">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      Dimensão Tecnológica
    </div>
    <p class="lab">Por que é difícil</p>
    <h2 class="hdl">O problema não é que modelos de linguagem sejam ruins.<br>É que não foram projetados para precisão jurídica.</h2>

    <div class="tech-reveal-grid">
      <div class="tech-reveal-card what">
        <div class="tech-reveal-label">O que modelos de linguagem fazem bem</div>
        <div class="tech-reveal-tt">Narrar, sintetizar, interpretar</div>
        <div class="tech-reveal-body">
          Modelos de linguagem são projetados para completar padrões. Isso os torna extraordinários em narração, síntese de documentos e análise contextual. São ferramentas poderosas para entender o que está sendo perguntado e construir respostas em linguagem natural.<br><br>
          O problema aparece quando o contexto exige mais do que linguagem. Quando precisa de <strong>cálculo matemático exato</strong>, de <strong>aplicação formal de regras</strong> ou de <strong>raciocínio documentado passo a passo</strong> — áreas para as quais não foram projetados.
        </div>
      </div>
      <div class="tech-reveal-card why">
        <div class="tech-reveal-label">Por que o risco é maior no contexto jurídico</div>
        <div class="tech-reveal-tt">Consistência e auditabilidade não são opcionais</div>
        <div class="tech-reveal-body">
          Em contextos de alta exigência técnica e responsabilidade, uma resposta que muda dependendo de como a pergunta foi feita é inaceitável. O raciocínio precisa ser o mesmo sempre — mesma entrada, mesma saída, sem variação por sessão ou usuário.<br><br>
          Além disso, sistemas de IA têm um teto organizacional: eles param de escalar não quando a tecnologia falha, mas quando a organização não tem estrutura de governança para sustentar as consequências das decisões que o sistema toma. <strong>O teto é organizacional e tecnológico ao mesmo tempo.</strong>
        </div>
      </div>
    </div>

    <div class="tech-quote" style="margin-bottom:0">
      A pesquisa Stanford identificou o setor jurídico como o mais resistente à adoção de IA — não por falta de interesse, mas por ausência de garantias de precisão e rastreabilidade que o contexto exige.
    </div>
  </div>
</div>

<div class="slide" data-index="10">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="dim-w">
    <div class="dim-badge tech">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      Dimensão Tecnológica
    </div>
    <p class="lab">Como respondemos</p>
    <h2 class="hdl">Nossa arquitetura separa o que cada tipo<br>de raciocínio faz — e garante precisão em cada um.</h2>

    <div class="motors-arch">
      <div class="motor-card llm">
        <div class="motor-label">Motor de Linguagem</div>
        <div class="motor-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div class="motor-tt">Narra, interpreta e sintetiza</div>
        <div class="motor-d">O modelo de linguagem faz o que foi projetado para fazer: entende o contexto, lê documentos, interpreta perguntas e constrói respostas em linguagem natural. Não é substituído — é especializado dentro de seu escopo correto.</div>
        <div class="motor-prop">Linguagem e contexto</div>
      </div>

      <div class="motor-card det">
        <div class="motor-label">Motor Determinístico</div>
        <div class="motor-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6"/><path d="M9 12h6"/><path d="M9 15h4"/></svg>
        </div>
        <div class="motor-tt">Calcula com exatidão absoluta</div>
        <div class="motor-d">Mesma entrada, sempre mesma saída, sem variação por sessão ou usuário. Substitui o modelo de linguagem em todos os pontos onde cálculo ou aplicação de regra precisa ser exato. Auditável por design: cada operação é registrada.</div>
        <div class="motor-prop">Sem variação por sessão</div>
      </div>

      <div class="motor-card sym">
        <div class="motor-label">Motor Analítico-Simbólico</div>
        <div class="motor-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <div class="motor-tt">Encadeia regras formais com raciocínio visível</div>
        <div class="motor-d">Aplica regras jurídicas, processuais ou de negócio em sequência lógica documentada. Cada passo do raciocínio é visível — a conclusão não emerge de uma caixa preta, mas de uma cadeia de passos que pode ser questionada e defendida.</div>
        <div class="motor-prop">Raciocínio rastreável</div>
      </div>
    </div>

    <div class="tech-resp-note">
      Os três motores operam em conjunto. O resultado é um sistema <strong>inteligente na linguagem, exato no cálculo e auditável no raciocínio</strong> — simultaneamente.
    </div>
  </div>
</div>

<div class="slide s-section-cover sec-cases">
  <div class="ring r1" style="opacity:.28"></div>
  <div class="ring r2" style="opacity:.14"></div>
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="sec-cover-wrap">
    <div class="sec-cover-label">Projetos em desenvolvimento</div>
    <h2 class="sec-cover-title">Cases<br><span>EXP³</span></h2>
    <div class="sec-cover-div"></div>
    <p class="sec-cover-sub">Três organizações em setores distintos. A mesma premissa: inteligência como infraestrutura, não como produto.</p>
  </div>
</div>

<div class="slide" data-index="11">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s-exp-w">
    <p class="lab">Projetos em desenvolvimento</p>
    <h2 class="hdl">Três organizações construindo<br>inteligência como infraestrutura.</h2>

    <div class="exp-grid">
      <div class="exp-card">
        <div class="exp-sector">Fintech · Recuperação de Vendas</div>
        <div class="exp-title">Inteligência de dados e estruturação de Customer Success para uma plataforma de recuperação</div>
        <div class="exp-desc">A EXP³ redesenhou o escopo do projeto: em vez de produzir relatórios, construiu a infraestrutura de inteligência que a plataforma e seus clientes precisam. Reports semanais têm análise interpretativa embutida — cruzando dados históricos, identificando gargalos de conversão por canal e apontando onde está a oportunidade real. Em paralelo, a EXP³ está estruturando a área de Customer Success já orientada por dados desde o início: processos e indicadores que nascem com inteligência como premissa — não como retrofit após o fato.</div>
      </div>

      <div class="exp-card">
        <div class="exp-sector">Marketing Digital · Agência</div>
        <div class="exp-title">Mapeamento do conhecimento organizacional e arquitetura de inteligência para uma agência digital</div>
        <div class="exp-desc">O projeto é conduzido em três camadas, em ordem deliberada: diagnóstico interno (onde está o conhecimento da organização, como circula, onde há perda de inteligência entre áreas), otimização de operações e fluxos, e construção de agentes conversacionais que os clientes finais poderão usar para navegar em dados de campanhas sem depender de analistas intermediários. A EXP³ está defendendo essa sequência — porque construir a terceira camada antes de consolidar as primeiras é o erro mais comum que organizações cometem ao implementar IA.</div>
      </div>

      <div class="exp-card">
        <div class="exp-sector">Entretenimento · Criador Individual</div>
        <div class="exp-title">Arquitetura de memória criativa para um criador de conteúdo</div>
        <div class="exp-desc">A EXP³ está construindo um sistema em grafo que conecta fragmentos de ideias, referências e avaliações do criador em cinco etapas: captura em qualquer formato, enriquecimento e categorização, armazenamento estruturado, ideação assistida e feedback como dado. A premissa inegociável do projeto: a IA não escreve por ele. O sistema é alimentado exclusivamente pelo próprio repertório do criador — as variações geradas têm como matéria-prima o que só existe nele. É o oposto do que a maioria das ferramentas de IA para criadores faz.</div>
      </div>
    </div>

    <div class="exp-note">Projetos em andamento, identificações preservadas em confidencialidade</div>
  </div>
</div>

<div class="slide" data-index="12">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="team-w">
    <p class="lab">Quem faz</p>
    <h2 class="hdl">Consultores seniores com trajetórias complementares,<br>atuando em estrutura de think tank.</h2>

    <div class="team-grid">
      <div class="team-card">
        <div class="team-avatar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </div>
        <div class="team-name">Thiago Padovan</div>
        <div class="team-role">Consultor Sênior</div>
        <div class="team-bio">Desde 2011 trabalha com projetos de inovação organizacional, com foco em processos de inovação, redes e complexidade em empresas de diferentes setores. Atua na interseção entre gestão do conhecimento, design organizacional e implementação de IA.</div>
      </div>

      <div class="team-card">
        <div class="team-avatar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </div>
        <div class="team-name">Nilton Lessa</div>
        <div class="team-role">Consultor Sênior</div>
        <div class="team-bio">Engenheiro de software e consultor de inovação com mais de 20 anos em projetos tecnológicos complexos. Especializado em arquitetura de sistemas e implementação em contextos de alta exigência, onde precisão e confiabilidade não são opcionais. Sua experiência técnica ancora a camada de construção dos projetos da EXP³.</div>
      </div>

      <div class="team-card">
        <div class="team-avatar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </div>
        <div class="team-name">Luis Eugênio Pacheco</div>
        <div class="team-role">Consultor Sênior</div>
        <div class="team-bio">Engenheiro e consultor com mais de 20 anos em inovação e tecnologia aplicadas em organizações de diferentes portes e setores. Traz experiência prática em levar projetos complexos da concepção ao resultado, navegando tanto as dimensões técnicas quanto as organizacionais de cada implementação.</div>
      </div>
    </div>

    <div class="team-note-enhanced">
      <div class="team-note-enhanced-title">Estrutura Think Tank · Rede de Especialistas</div>
      <div class="team-note-enhanced-body">
        A EXP³ opera em <strong>estrutura de think tank</strong> — um modelo que vai além da consultoria tradicional. Além dos três sócios, a EXP³ funciona em colaboração contínua com especialistas na fronteira das aplicações de IA em <strong>deep tech, ética, organizações e IA responsável</strong>. Essa rede amplia as perspectivas disponíveis para cada projeto e mantém a EXP³ conectada ao que está sendo pensado e desenvolvido agora — não ao que estava em pauta há dois anos.
      </div>
    </div>
  </div>
</div>

<div class="slide s-close" data-index="13">
  <div class="ring r1" style="opacity:.6"></div>
  <div class="close-wrap">
    <div class="close-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </div>
    <div class="close-hdl">Gostamos de trabalhar em<br><span>terrenos não mapeados</span></div>
    <div class="close-body">
      Esse mundo de IA em organizações ainda está sendo construído. Não existem receitas prontas, e a maioria das implementações que a gente vê ainda está tentando descobrir o que funciona de verdade.<br><br>
      A EXP³ prefere os desafios que ainda <strong>não têm resposta pronta</strong>. Quanto mais específico o problema, mais interessante fica para a gente.
    </div>
    <div class="close-line"></div>
    <div class="close-tag">
      <strong>Qual é o desafio do Pinheiro Neto Advogados</strong> quando o assunto é implementação de IA em nível organizacional?
    </div>
  </div>
</div>

<div class="slide s-contact" data-index="14">
  <div class="ring r1" style="opacity:.5"></div>
  <div class="contact-wrap">
    <div class="contact-logo">EXP<sup>³</sup></div>
    <div class="contact-tagline">Implementação Organizacional de IA</div>
    <div class="contact-divider"></div>
    <div class="contact-name">Thiago Padovan</div>
    <div class="contact-info-grid">
      <div class="contact-info-row">
        <svg class="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span class="contact-info-text">thiago@exp3.ai</span>
      </div>
      <div class="contact-info-row">
        <svg class="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span class="contact-info-text">11 98338-9707</span>
      </div>
    </div>
  </div>
</div>

<div class="progress-bar" id="pb"></div>
<nav class="nav-dots" id="dots"></nav>
<div class="nav-btns">
  <button class="nav-btn" id="prevBtn">&#8592;</button>
  <button class="nav-btn" id="nextBtn">&#8594;</button>
</div>
<div class="slide-counter" id="counter"></div>

</div>

<script>
(function(){
  var slides=document.querySelectorAll('.slide');
  var dotEls=[];var current=0;var busy=false;
  // 15 slides total
  var dotsEl=document.getElementById('dots');
  var pb=document.getElementById('pb');
  var counter=document.getElementById('counter');
  var total=slides.length;

  slides.forEach(function(_,i){
    var d=document.createElement('button');
    d.className='dot'+(i===0?' active':'');
    d.setAttribute('aria-label','Slide '+(i+1));
    d.addEventListener('click',function(){goTo(i)});
    dotsEl.appendChild(d);
    dotEls.push(d);
  });

  function goTo(n){
    if(busy||n===current||n<0||n>=total)return;
    busy=true;
    var old=current;current=n;
    slides[old].classList.add('leaving');
    setTimeout(function(){slides[old].classList.remove('active','leaving')},500);
    slides[n].classList.add('active');
    dotEls[old].classList.remove('active');
    dotEls[n].classList.add('active');
    update();
    setTimeout(function(){busy=false},550);
  }

  function update(){
    pb.style.width=((current/(total-1))*100)+'%';
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
    var dx=tx-e.changedTouches[0].clientX;
    if(dx<-40)goTo(current+1);if(dx>40)goTo(current-1);
  });

  update();
})();
</script>
</body>
</html>
`;
