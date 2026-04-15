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
  --sh-hover:0 16px 44px rgba(0,0,0,.38);
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
  background-image:radial-gradient(circle,rgba(0,217,255,.028) 1px,transparent 1px);
  background-size:28px 28px;pointer-events:none;z-index:0;
}

/* ── SLIDES ── */
.slide{
  position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;
  padding:56px 80px 68px;opacity:0;transform:translateX(44px);
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

/* ── TYPOGRAPHY SYSTEM ── */
.lab{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--cyan);margin-bottom:16px;display:flex;align-items:center;gap:10px}
.lab::before{content:'';display:inline-block;width:24px;height:1.5px;background:var(--cyan);border-radius:2px;flex-shrink:0}
.hdl{font-size:clamp(24px,3vw,36px);font-weight:700;letter-spacing:-.5px;line-height:1.2;margin-bottom:32px}


/* ════════════════════════════════════════
   SLIDE 1 — HERO
════════════════════════════════════════ */
.s1{background:radial-gradient(ellipse 72% 62% at 50% 48%,rgba(0,35,70,.55),var(--bg) 74%);text-align:center}
.ring{position:absolute;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.ring.r1{width:600px;height:600px;background:radial-gradient(circle,rgba(0,217,255,.055),transparent 68%)}
.ring.r2{width:390px;height:390px;border:1px solid rgba(0,217,255,.07)}
.ring.r3{width:555px;height:555px;border:1px solid rgba(0,217,255,.038)}
.arc{position:absolute;pointer-events:none;opacity:.045}
.hero-logo{font-size:clamp(72px,9.5vw,108px);font-weight:800;letter-spacing:-3px;line-height:1;color:#fff;margin-bottom:24px;position:relative;z-index:2;text-shadow:0 0 100px rgba(0,217,255,.22)}
.hero-logo sup{font-size:clamp(46px,6vw,70px);background:linear-gradient(135deg,#00D9FF,#80EEFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-div{width:52px;height:2px;background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.15));margin:0 auto 30px;border-radius:2px;position:relative;z-index:2}
.hero-div::after{content:'';position:absolute;width:6px;height:6px;border-radius:50%;background:var(--cyan);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px var(--cyan)}
.hero-tag{font-size:clamp(16px,1.6vw,20px);font-weight:400;color:var(--fg2);max-width:600px;line-height:1.78;position:relative;z-index:2;margin:0 auto}
.hero-tag strong{color:var(--fg);font-weight:600}
.hero-meta{
  position:absolute;bottom:44px;left:50%;transform:translateX(-50%);
  font-size:13px;letter-spacing:.06em;color:var(--fg2);
  display:flex;align-items:center;gap:12px;z-index:2;
  white-space:nowrap;font-weight:400;font-style:italic;
}
.hero-meta::before,.hero-meta::after{content:'';width:30px;height:1px;background:rgba(255,255,255,.16)}


/* ════════════════════════════════════════
   SLIDE 2 — INDIVIDUAL VS ORGANIZACIONAL
════════════════════════════════════════ */
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
  box-shadow:var(--sh-sm);opacity:.62;
}
.ccard.gl{
  opacity:1;border-color:rgba(0,217,255,.22);
  background:linear-gradient(150deg,rgba(0,217,255,.09),var(--bg3) 55%);
  box-shadow:var(--sh-glow),var(--sh-sm),inset 0 1px 0 rgba(0,217,255,.1);
}
.ccard .tp{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--fg3);margin-bottom:12px}
.ccard.gl .tp{color:var(--cyan);opacity:.85}
.ccard .ico-wrap{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.ccard.gl .ico-wrap{background:rgba(0,217,255,.08);border-color:rgba(0,217,255,.2)}
.ccard .ico-wrap svg{width:20px;height:20px;color:var(--fg3)}
.ccard.gl .ico-wrap svg{color:var(--cyan)}
.ccard .tt{font-size:17px;font-weight:700;margin-bottom:16px;line-height:1.3;color:var(--fg2)}
.ccard.gl .tt{color:var(--cyan)}
.ccard ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.ccard li{font-size:14px;color:var(--fg3);line-height:1.5;padding-left:18px;position:relative}
.ccard.gl li{color:var(--fg2)}
.ccard li::before{content:'';position:absolute;left:0;top:9px;width:7px;height:1px;background:var(--fg3)}
.ccard.gl li::before{background:var(--cyan);opacity:.6}
.dois-note{
  margin-top:20px;text-align:center;
  font-size:14px;font-weight:600;color:var(--cyan);letter-spacing:.02em;
  display:flex;align-items:center;justify-content:center;gap:10px;
}
.dois-note::before,.dois-note::after{content:'';flex:1;max-width:80px;height:1px;background:rgba(0,217,255,.25)}

/* ════════════════════════════════════════
   SLIDE 3 — FUSÃO TECNOLÓGICO + SOCIAL
════════════════════════════════════════ */
.fusion-w{width:100%;max-width:960px}
.fusion-grid{
  display:grid;grid-template-columns:1fr auto 1fr;gap:0;align-items:stretch;
  margin-bottom:20px;
}
.fusion-card{
  border-radius:var(--rad);padding:26px 24px 22px;
  display:flex;flex-direction:column;gap:0;
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
  width:40px;height:40px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  margin-bottom:16px;
}
.fusion-card.tech .fusion-icon{background:rgba(0,217,255,.1);border:1px solid rgba(0,217,255,.2)}
.fusion-card.soc .fusion-icon{background:rgba(255,107,51,.1);border:1px solid rgba(255,107,51,.2)}
.fusion-card.tech .fusion-icon svg{color:var(--cyan)}
.fusion-card.soc .fusion-icon svg{color:var(--orange)}
.fusion-label{
  font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  margin-bottom:10px;
}
.fusion-card.tech .fusion-label{color:var(--cyan)}
.fusion-card.soc .fusion-label{color:var(--orange)}
.fusion-tt{font-size:17px;font-weight:700;color:var(--fg);margin-bottom:14px;line-height:1.3}
.fusion-ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.fusion-ul li{font-size:13px;line-height:1.55;padding-left:16px;position:relative}
.fusion-card.tech .fusion-ul li{color:var(--fg2)}
.fusion-card.soc .fusion-ul li{color:var(--fg2)}
.fusion-card.tech .fusion-ul li::before{content:'';position:absolute;left:0;top:8px;width:6px;height:1.5px;background:var(--cyan);opacity:.7}
.fusion-card.soc .fusion-ul li::before{content:'';position:absolute;left:0;top:8px;width:6px;height:1.5px;background:var(--orange);opacity:.7}

.fusion-mid{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:0 20px;gap:8px;
}
.fusion-mid-line{
  width:2px;flex:1;max-height:100px;
  border-radius:2px;
}
.fusion-mid-line.top{background:linear-gradient(180deg,rgba(0,217,255,.4),rgba(255,107,51,.4))}
.fusion-mid-line.bot{background:linear-gradient(180deg,rgba(255,107,51,.4),transparent)}
.fusion-mid-node{
  width:40px;height:40px;border-radius:50%;
  background:var(--bg2);border:1px solid rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;font-weight:700;color:var(--fg3);
}

.fusion-bottom{
  padding:14px 20px;
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
  border-radius:10px;text-align:center;
  font-size:14px;color:var(--fg2);line-height:1.6;
}
.fusion-bottom strong{color:var(--fg);font-weight:600}

/* ════════════════════════════════════════
   SLIDE 4 — TRÊS PROBLEMAS
════════════════════════════════════════ */
.s2-w{width:100%;max-width:980px}
.prob-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.prob-card{
  background:var(--bg3);border:1px solid var(--border);border-radius:var(--rad);
  padding:28px 24px 24px;display:flex;flex-direction:column;
  box-shadow:var(--sh-sm);position:relative;overflow:hidden;
}
.prob-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2.5px;
  background:linear-gradient(90deg,var(--orange),rgba(255,107,51,.2));
  border-radius:2px 2px 0 0;
}
.prob-n{
  font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--orange);opacity:.7;margin-bottom:18px;
}
.prob-ico{
  width:42px;height:42px;border-radius:10px;
  background:rgba(255,107,51,.08);border:1px solid rgba(255,107,51,.18);
  display:flex;align-items:center;justify-content:center;margin-bottom:18px;
}
.prob-ico svg{width:20px;height:20px;color:var(--orange)}
.prob-tt{font-size:17px;font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:14px}
.prob-d{font-size:14px;color:var(--fg2);line-height:1.65;flex:1;margin-bottom:18px}
.prob-tag{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(255,107,51,.07);border:1px solid rgba(255,107,51,.18);
  border-radius:7px;padding:6px 12px;
  font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--orange);align-self:flex-start;
}


/* ════════════════════════════════════════
   SLIDE 3 — PONTE PROBLEMA / RESPOSTA
════════════════════════════════════════ */
.s3-w{width:100%;max-width:960px}
.bridge-grid{
  display:grid;grid-template-columns:1fr auto 1fr;gap:0;align-items:stretch;
}
.bridge-col{display:flex;flex-direction:column;gap:10px}
.bridge-title{
  font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  margin-bottom:6px;display:flex;align-items:center;gap:8px;
}
.bridge-title.prob{color:var(--orange)}
.bridge-title.sol{color:var(--cyan)}
.bridge-title svg{width:13px;height:13px;flex-shrink:0}

.bitem{
  display:flex;align-items:flex-start;gap:12px;
  padding:12px 15px;border-radius:10px;border:1px solid;flex:1;
}
.bitem.p{background:rgba(255,107,51,.05);border-color:rgba(255,107,51,.18)}
.bitem.s{background:rgba(0,217,255,.055);border-color:rgba(0,217,255,.18)}
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
.bitem-desc{font-size:13px;font-weight:500;color:var(--fg);line-height:1.5}
.bitem-sub{font-size:12px;color:var(--fg3);line-height:1.4;margin-top:2px}

.bridge-arrow{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:0 20px;gap:5px;
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
  margin-top:18px;padding:11px 18px;
  background:rgba(0,217,255,.04);border:1px solid rgba(0,217,255,.14);border-radius:9px;
  font-size:12px;color:var(--fg3);line-height:1.55;text-align:center;
}
.bridge-note strong{color:var(--fg2);font-weight:600}


/* ════════════════════════════════════════
   SLIDE 4 — VISÃO PINHEIRO NETO
════════════════════════════════════════ */
.s4-w{width:100%;max-width:1000px}
.plist{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}
.pitem{
  display:flex;flex-direction:column;gap:0;
  background:var(--bg3);border:1px solid var(--border);
  border-radius:16px;padding:26px 26px 22px;
  box-shadow:var(--sh-sm);transition:all .25s ease;
  position:relative;overflow:hidden;
}
.pitem::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--cyan),rgba(0,217,255,.2));
  border-radius:2px 2px 0 0;
}
.pitem:hover{background:rgba(0,217,255,.025);box-shadow:var(--sh-glow);transform:translateY(-3px)}
.pitem-head{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.pitem-n{
  width:40px;height:40px;border-radius:50%;flex-shrink:0;
  background:rgba(0,217,255,.09);border:1.5px solid rgba(0,217,255,.3);
  display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:800;color:var(--cyan);
}
.pitem-ico{
  width:36px;height:36px;border-radius:10px;flex-shrink:0;
  background:rgba(0,217,255,.07);border:1px solid rgba(0,217,255,.16);
  display:flex;align-items:center;justify-content:center;
}
.pitem-ico svg{width:18px;height:18px;color:var(--cyan)}
.pitem-tt{font-size:15px;font-weight:700;color:var(--fg);line-height:1.35}
.pitem-t{font-size:13px;color:var(--fg2);line-height:1.6;margin-bottom:14px;flex:1}
.pitem-cap{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(0,217,255,.06);border:1px solid rgba(0,217,255,.18);
  border-radius:6px;padding:5px 11px;
  font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--cyan);
  align-self:flex-start;
}
.pitem-cap::before{content:'↳';opacity:.6;font-size:11px}
.fnote{font-size:13px;color:var(--fg3);font-style:italic;text-align:center;padding:8px;line-height:1.55}


/* ════════════════════════════════════════
   SLIDE 5 — BACKUP TÉCNICO (pipeline)
════════════════════════════════════════ */
.s5-w{width:100%;max-width:1060px}
.pipe-full{display:flex;align-items:stretch;gap:0;width:100%}

.stg{
  flex:1;display:flex;flex-direction:column;
  background:var(--bg3);border:1px solid var(--border);border-radius:14px;
  padding:22px 18px 18px;min-width:0;position:relative;z-index:1;
  box-shadow:var(--sh-sm);
}
.stg.hl{
  background:linear-gradient(155deg,rgba(0,217,255,.1),var(--bg3) 60%);
  border-color:rgba(0,217,255,.26);box-shadow:var(--sh-glow),var(--sh-sm);
}
.stg-n{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--fg3);margin-bottom:12px}
.stg.hl .stg-n{color:var(--cyan)}
.stg-ico{width:38px;height:38px;margin-bottom:12px;color:var(--cyan);opacity:.5;flex-shrink:0}
.stg.hl .stg-ico{opacity:.9}
.stg-tt{font-size:14px;font-weight:700;color:var(--fg);line-height:1.35;margin-bottom:8px}
.stg-d{font-size:12px;color:var(--fg2);line-height:1.6;flex:1;margin-bottom:10px}
.stg-ul{list-style:none;display:flex;flex-direction:column;gap:5px}
.stg-ul li{font-size:12px;color:var(--fg3);line-height:1.5;padding-left:14px;position:relative}
.stg-ul li::before{content:'›';position:absolute;left:0;color:var(--cyan);opacity:.5}
.stg.hl .stg-ul li{color:var(--fg2)}
.stg.hl .stg-ul li::before{opacity:.9}

.conn{
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;width:28px;position:relative;z-index:2;
}
.conn::before{
  content:'';position:absolute;top:50%;left:2px;right:8px;height:1px;
  background:linear-gradient(90deg,rgba(0,217,255,.15),rgba(0,217,255,.45));
}
.conn::after{
  content:'';position:absolute;right:2px;top:50%;transform:translateY(-50%);
  width:0;height:0;border-left:6px solid rgba(0,217,255,.5);
  border-top:4px solid transparent;border-bottom:4px solid transparent;
}

.motors-wrap{
  flex:1.3;display:flex;gap:10px;position:relative;z-index:1;
  background:var(--bg2);border:1px solid var(--border);border-radius:14px;
  padding:18px;box-shadow:var(--sh-sm);
}
.motors-label{
  position:absolute;top:-11px;left:18px;
  background:var(--bg2);padding:2px 10px;
  font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--fg3);border:1px solid var(--border);border-radius:5px;
}
.mcard{
  flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:10px;
  padding:18px 16px 16px;display:flex;flex-direction:column;
  box-shadow:var(--sh-sm);
}
.mcard-label{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan);opacity:.8;margin-bottom:10px}
.mcard-tt{font-size:14px;font-weight:700;color:var(--fg);margin-bottom:8px;line-height:1.3}
.mcard-d{font-size:12px;color:var(--fg2);line-height:1.6;flex:1}
.mcard-tag{margin-top:10px;font-size:11px;font-weight:600;color:var(--cyan);opacity:.65;display:flex;align-items:center;gap:6px}
.mcard-tag::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--cyan);opacity:.6;flex-shrink:0}

.conn-b{
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;width:34px;position:relative;z-index:2;
}
.conn-b::before{
  content:'';position:absolute;top:50%;left:2px;right:12px;height:2px;
  background:linear-gradient(90deg,rgba(0,217,255,.25),rgba(0,217,255,.6));
  border-radius:2px;
}
.conn-b::after{
  content:'';position:absolute;right:2px;top:50%;transform:translateY(-50%);
  width:0;height:0;border-left:8px solid rgba(0,217,255,.6);
  border-top:5px solid transparent;border-bottom:5px solid transparent;
}

.result-card{
  flex:.65;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;position:relative;z-index:1;
  background:var(--bg2);
  background-image:linear-gradient(155deg,rgba(0,217,255,.15),rgba(0,217,255,.04));
  border:1px solid rgba(0,217,255,.32);border-radius:14px;
  padding:24px 18px;
  box-shadow:0 0 44px rgba(0,217,255,.12),var(--sh-sm);
}
.result-ico{width:34px;height:34px;color:var(--cyan);opacity:.9;margin-bottom:14px}
.result-title{font-size:16px;font-weight:700;color:var(--fg);margin-bottom:16px;line-height:1.35}
.result-tags{display:flex;flex-direction:column;gap:6px;width:100%}
.result-tag{
  display:flex;align-items:center;gap:8px;
  background:rgba(0,217,255,.07);border:1px solid rgba(0,217,255,.2);border-radius:7px;
  padding:7px 12px;font-size:12px;font-weight:600;color:var(--cyan);
}
.result-dot{width:5px;height:5px;border-radius:50%;background:var(--cyan);flex-shrink:0;opacity:.75}

/* backup badge */
.backup-badge{
  position:absolute;top:22px;right:40px;
  background:rgba(255,107,51,.08);border:1px solid rgba(255,107,51,.2);
  border-radius:7px;padding:5px 12px;
  font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--orange);
}

/* ════════════════════════════════════════
   SLIDE FINAL — ENCERRAMENTO
════════════════════════════════════════ */
.s-close{
  background:radial-gradient(ellipse 65% 58% at 50% 48%,rgba(0,35,70,.5),var(--bg) 72%);
  text-align:center;
}
.close-wrap{max-width:600px;position:relative;z-index:2}
.close-icon{
  width:56px;height:56px;border-radius:50%;
  background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.22);
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 28px;
}
.close-icon svg{width:26px;height:26px;color:var(--cyan)}
.close-hdl{
  font-size:clamp(26px,3.2vw,40px);font-weight:700;letter-spacing:-.5px;
  line-height:1.2;margin-bottom:24px;color:var(--fg);
}
.close-hdl span{
  background:linear-gradient(135deg,var(--cyan),#80EEFF);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.close-body{
  font-size:clamp(15px,1.5vw,18px);color:var(--fg2);line-height:1.75;
  margin-bottom:36px;
}
.close-body strong{color:var(--fg);font-weight:600}
.close-line{
  width:1px;height:40px;
  background:linear-gradient(180deg,rgba(0,217,255,.5),transparent);
  margin:0 auto 24px;
}
.close-tag{
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(0,217,255,.07);border:1px solid rgba(0,217,255,.2);
  border-radius:10px;padding:12px 24px;
  font-size:14px;font-weight:600;color:var(--fg2);line-height:1.5;
}
.close-tag strong{color:var(--cyan);font-weight:700}
</style>
</head>

<body>
<div class="deck" id="deck">


<!-- ═══════════════════════════════
     SLIDE 1 — HERO
═══════════════════════════════ -->
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
  <p class="hero-tag">Trabalhamos na camada entre <strong>dado bruto e resultado confiável</strong>. Isso envolve formalizar o conhecimento organizacional em estruturas que máquinas operam de forma determinística, <strong>gestão de conhecimento com taxonomia controlada</strong> e uma arquitetura que separa o que o LLM faz do que ele <strong>não deveria fazer sozinho</strong>.</p>
  <div class="hero-meta">Pinheiro Neto Advogados &nbsp;·&nbsp; 2026</div>
</div>


<!-- ═══════════════════════════════
     SLIDE 2 — INDIVIDUAL VS ORGANIZACIONAL
═══════════════════════════════ -->
<div class="slide" data-index="1">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s2-w">
    <p class="lab">O ponto de partida</p>
    <h2 class="hdl">Dois contextos diferentes<br>que exigem abordagens diferentes.</h2>
    <div class="two-col">
      <div class="vs">vs</div>

      <!-- card apagado — uso individual -->
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
          <li>Resultado imediato</li>
          <li>Funciona bem em escopo limitado</li>
        </ul>
      </div>

      <!-- card destacado — implementação organizacional -->
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
          <li>Consistência ao longo do tempo</li>
          <li>Exige uma abordagem fundamentalmente diferente</li>
        </ul>
      </div>
    </div>
    <p class="dois-note">Atuamos na implementação organizacional.</p>
  </div>
</div>


<!-- ═══════════════════════════════
     SLIDE 3 — FUSÃO TECNOLÓGICO + SOCIAL
═══════════════════════════════ -->
<div class="slide" data-index="2">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="fusion-w">
    <p class="lab">Por que é mais difícil do que parece</p>
    <h2 class="hdl" style="margin-bottom:22px">Implementação organizacional tem duas dimensões<br>que precisam andar juntas</h2>

    <div class="fusion-grid">

      <!-- Dimensão Tecnológica -->
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

      <!-- Centro -->
      <div class="fusion-mid">
        <div class="fusion-mid-line top"></div>
        <div class="fusion-mid-node">+</div>
        <div class="fusion-mid-line bot"></div>
      </div>

      <!-- Dimensão Organizacional -->
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
          <li>Quem valida e quem adota</li>
          <li>Vocabulário e processos de cada equipe</li>
          <li>Engajamento e mudança de prática</li>
        </ul>
      </div>

    </div>

    <div class="fusion-bottom">
      Resolver só o lado técnico sem o lado organizacional não resolve. <strong>As duas dimensões são interdependentes</strong> e precisam ser trabalhadas ao mesmo tempo.
    </div>
  </div>
</div>


<!-- ═══════════════════════════════
     SLIDE 4 — TRÊS PROBLEMAS
═══════════════════════════════ -->
<div class="slide" data-index="3">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s2-w">
    <p class="lab">O que a gente observa</p>
    <h2 class="hdl">Três problemas que aparecem<br>em toda implementação organizacional</h2>
    <div class="prob-grid">

      <div class="prob-card">
        <p class="prob-n">01</p>
        <div class="prob-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6H4z"/><path d="M14 14h6v6h-6z"/>
            <line x1="10" y1="7" x2="14" y2="7" stroke-dasharray="2 1.5"/>
            <line x1="7" y1="10" x2="7" y2="14" stroke-dasharray="2 1.5"/>
            <line x1="17" y1="10" x2="17" y2="14" stroke-dasharray="2 1.5"/>
            <line x1="10" y1="17" x2="14" y2="17" stroke-dasharray="2 1.5"/>
          </svg>
        </div>
        <p class="prob-tt">Deriva semântica</p>
        <p class="prob-d">Equipes diferentes usam os mesmos termos com sentidos diferentes. A IA aprende com esse ruído e multiplica a inconsistência ao invés de reduzir.</p>
        <div class="prob-tag">Vocabulário não controlado</div>
      </div>

      <div class="prob-card">
        <p class="prob-n">02</p>
        <div class="prob-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 20v-1a6 6 0 0 1 12 0v1"/>
            <line x1="18" y1="8" x2="22" y2="8"/><line x1="20" y1="6" x2="20" y2="10"/>
            <line x1="2" y1="8" x2="5" y2="8" stroke-dasharray="1.5 1.5"/>
          </svg>
        </div>
        <p class="prob-tt">Conhecimento não formalizado</p>
        <p class="prob-d">O raciocínio acumulado pelos especialistas é o maior ativo do escritório. Quando formalizado, a IA consegue amplificá-lo e distribuí-lo, transformando expertise individual em capacidade coletiva.</p>
        <div class="prob-tag">Saber implícito, não estruturado</div>
      </div>

      <div class="prob-card">
        <p class="prob-n">03</p>
        <div class="prob-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <path d="M9 12h6M12 9v6" opacity=".35"/>
            <path d="M8 8l8 8M16 8l-8 8" stroke-width="1.3"/>
          </svg>
        </div>
        <p class="prob-tt">Resultado sem raciocínio</p>
        <p class="prob-d">A IA entrega uma resposta mas não mostra como chegou até ela. Em qualquer contexto onde a decisão precisa ser explicada ou contestada, isso não é suficiente.</p>
        <div class="prob-tag">Inferência não rastreável</div>
      </div>

    </div>
  </div>
</div>


<!-- ═══════════════════════════════
     SLIDE 5 — COMO A EXP³ RESPONDE
═══════════════════════════════ -->
<div class="slide" data-index="4">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="s3-w">
    <p class="lab">Como a EXP³ responde</p>
    <h2 class="hdl" style="margin-bottom:20px">Cada problema tem uma resposta técnica direta</h2>

    <div class="bridge-grid">

      <!-- coluna: problemas -->
      <div class="bridge-col">
        <p class="bridge-title prob">
          <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6.5" cy="6.5" r="5.5"/><line x1="6.5" y1="4" x2="6.5" y2="6.5"/><line x1="6.5" y1="8.5" x2="6.5" y2="9"/></svg>
          O problema
        </p>
        <div class="bitem p">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M1.5 9L5 4.5l2.5 2L10 3"/><line x1="5" y1="4.5" x2="5" y2="2.5" opacity=".5"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Deriva semântica</span>
            <span class="bitem-desc">Vocabulário não controlado, significados que divergem entre equipes</span>
          </div>
        </div>
        <div class="bitem p">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6.5" cy="4.5" r="2.5"/><path d="M2 11v-.5A4.5 4.5 0 0 1 11 10.5V11"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Conhecimento não formalizado</span>
            <span class="bitem-desc">Saber que vive em especialistas, não na organização</span>
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

      <!-- seta central -->
      <div class="bridge-arrow">
        <div class="bridge-arrow-line"></div>
        <div class="bridge-arrow-head">→</div>
        <div class="bridge-arrow-line"></div>
      </div>

      <!-- coluna: respostas EXP3 -->
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
            <span class="bitem-desc">Mapeamos o vocabulário real do escritório e criamos um padrão que os sistemas conseguem ler, interpretar e trabalhar.</span>
          </div>
        </div>
        <div class="bitem s">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="1.5" y="4" width="4.5" height="6" rx="1.5"/><rect x="7" y="3" width="4.5" height="7" rx="1.5"/><line x1="3.75" y1="2" x2="3.75" y2="4"/><line x1="9.25" y1="1.5" x2="9.25" y2="3"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Metodologia de Formalização</span>
            <span class="bitem-desc">O raciocínio dos especialistas, formalizado, se torna operável pela IA em qualquer escala. O que antes alcançava poucos passa a estar disponível para toda a organização.</span>
          </div>
        </div>
        <div class="bitem s">
          <div class="bitem-ico">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M1.5 10l2.5-3.5 2 2 2-3.5L11 8"/></svg>
          </div>
          <div class="bitem-text">
            <span class="bitem-label">Motor Analítico-Simbólico</span>
            <span class="bitem-desc">O raciocínio por trás de cada resposta fica registrado passo a passo, não só a conclusão. Possível revisar, contestar e defender cada decisão</span>
          </div>
        </div>
      </div>

    </div>

    <p class="bridge-note">O <strong>Motor Determinístico</strong> garante que cálculos e aplicações de regras sejam sempre idênticos. Mesma entrada, mesma saída. Sem variação por sessão ou usuário.</p>
  </div>
</div>


<!-- ═══════════════════════════════
     SLIDE 6 — BACKUP TÉCNICO
═══════════════════════════════ -->
<div class="slide" data-index="5">
  <div class="slogo">EXP<sup>³</sup></div>
  <div class="backup-badge">Referência técnica</div>
  <div class="s5-w">
    <p class="lab">Arquitetura</p>
    <h2 class="hdl" style="margin-bottom:22px;font-size:clamp(20px,2.4vw,28px)">Como os motores funcionam juntos</h2>

    <div class="pipe-full">

      <!-- 01 — DADOS -->
      <div class="stg">
        <div class="stg-n">01 · Entrada</div>
        <svg class="stg-ico" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <ellipse cx="22" cy="10" rx="13" ry="4.5"/>
          <path d="M9 10v8c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5V10"/>
          <path d="M9 18v8c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5v-8"/>
          <path d="M9 26v7c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5v-7"/>
        </svg>
        <p class="stg-tt">Dados da Organização</p>
        <p class="stg-d">Sistemas, documentos, contratos, conhecimento tácito dos especialistas.</p>
        <ul class="stg-ul">
          <li>Bases e sistemas existentes</li>
          <li>Conhecimento ainda implícito</li>
          <li>Processos não formalizados</li>
        </ul>
      </div>

      <div class="conn"></div>

      <!-- 02 — TECNOLOGIA SOCIAL -->
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

      <!-- 03/04 — MOTORES -->
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

      <!-- RESULTADO -->
      <div class="result-card">
        <svg class="result-ico" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 5h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H12l-8 5V7a2 2 0 0 1 2-2z"/>
          <line x1="11" y1="14" x2="25" y2="14"/>
          <line x1="11" y1="19" x2="20" y2="19"/>
        </svg>
        <p class="result-title">O LLM narra e interpreta<br>o resultado</p>
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




<!-- ═══════════════════════════════
     SLIDE 7 — ENCERRAMENTO
═══════════════════════════════ -->
<div class="slide s-close" data-index="6">
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
      Esse mundo de IA em organizações ainda está sendo construído. Não existem receitas prontas e a maioria das implementações que a gente vê ainda está tentando descobrir o que funciona de verdade.<br><br>
      A EXP³ prefere os desafios que ainda <strong>não têm resposta pronta</strong>. Quanto mais específico o problema, mais interessante fica.
    </p>
    <div class="close-line"></div>
    <div class="close-tag">
      Se a conversa fez sentido, queremos ouvir e explorar juntos. <strong>Qual é o desafio do Pinheiro Neto Advogados quando o assunto é implementação de IA em nível organizacional?</strong>
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
