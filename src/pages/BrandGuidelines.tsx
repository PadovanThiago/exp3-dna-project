import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const SubstackIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" width={size} height={size}>
    <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z"/>
  </svg>
);

const ColorSwatch = ({ name, hsl, hex, token, className }: { name: string; hsl: string; hex: string; token: string; className?: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div className={`w-24 h-24 rounded-xl border border-border shadow-lg ${className ?? ''}`} style={{ backgroundColor: hex }} />
    <div className="text-center">
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground font-mono">{hex}</p>
      <p className="text-xs text-muted-foreground font-mono">{hsl}</p>
      <p className="text-xs text-primary font-mono mt-1">{token}</p>
    </div>
  </div>
);

const BrandGuidelines: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-wide mx-auto text-center">
          <motion.div {...fadeIn}>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-4">Brand Guidelines</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Identidade visual
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guia completo dos elementos visuais que compõem a marca EXP³. 
              Use este documento como referência para manter a consistência da comunicação.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. LOGO */}
      <section className="section-padding border-b border-border">
        <div className="container-wide mx-auto">
          <motion.div {...fadeIn}>
            <SectionTitle number="01" title="Logo" />

            {/* Logo Normal (sobre fundo escuro) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Versão principal (fundo escuro)</h4>
                <div className="bg-exp3-navy rounded-2xl p-16 flex items-center justify-center border border-border">
                  <div className="text-6xl font-bold select-none">
                    <span className="text-foreground">EXP</span>
                    <span className="text-gradient-cyan text-5xl align-super">³</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Uso preferencial. "EXP" em branco <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">#F8FAFC</code> e "³" em cyan <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">#00D9FF</code>.
                </p>
              </div>

              {/* Logo Negativo (sobre fundo claro) */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Versão negativa (fundo claro)</h4>
                <div className="bg-exp3-gray-light rounded-2xl p-16 flex items-center justify-center border border-border">
                  <div className="text-6xl font-bold select-none">
                    <span className="text-exp3-navy">EXP</span>
                    <span className="text-exp3-cyan text-5xl align-super">³</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Para fundos claros. "EXP" em navy <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">#0A0F1C</code> e "³" em cyan <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">#00D9FF</code>.
                </p>
              </div>
            </div>

            {/* Área de proteção */}
            <div className="mt-12">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Área de proteção e tamanho mínimo</h4>
              <div className="glass-card p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex items-center justify-center">
                    <div className="border-2 border-dashed border-primary/30 p-12 rounded-xl relative">
                      <div className="text-4xl font-bold select-none">
                        <span className="text-foreground">EXP</span>
                        <span className="text-gradient-cyan text-3xl align-super">³</span>
                      </div>
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-primary/60">↕ 1x</span>
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-primary/60">↕ 1x</span>
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-primary/60">↔ 1x</span>
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary/60">↔ 1x</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      A área de proteção do logo é equivalente à altura do caractere "³". Nenhum elemento gráfico ou textual deve invadir esse espaço. O tamanho mínimo recomendado é de <strong className="text-foreground">80px</strong> de largura para digital e <strong className="text-foreground">20mm</strong> para impressão.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TIPOGRAFIA */}
      <section className="section-padding border-b border-border">
        <div className="container-wide mx-auto">
          <motion.div {...fadeIn}>
            <SectionTitle number="02" title="Tipografia" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {/* Títulos */}
              <div className="glass-card p-8">
                <p className="text-xs font-medium text-primary uppercase tracking-widest mb-6">Títulos & Headings</p>
                <p className="text-5xl font-bold text-foreground mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Inter</p>
                <p className="text-lg text-muted-foreground mb-6">Bold (700) / Extrabold (800)</p>
                <div className="space-y-3 border-t border-border pt-6">
                  <p className="text-4xl font-extrabold text-foreground">H1 — 48px / Extrabold</p>
                  <p className="text-3xl font-bold text-foreground">H2 — 36px / Bold</p>
                  <p className="text-2xl font-bold text-foreground">H3 — 24px / Bold</p>
                  <p className="text-xl font-semibold text-foreground">H4 — 20px / Semibold</p>
                </div>
              </div>

              {/* Corpo */}
              <div className="glass-card p-8">
                <p className="text-xs font-medium text-primary uppercase tracking-widest mb-6">Corpo de texto</p>
                <p className="text-5xl font-light text-foreground mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Inter</p>
                <p className="text-lg text-muted-foreground mb-6">Regular (400) / Medium (500)</p>
                <div className="space-y-4 border-t border-border pt-6">
                  <p className="text-base text-foreground leading-relaxed">
                    Body — 16px / Regular. Transformamos o potencial da IA em capacidade operacional através da simbiose cognitiva.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Small — 14px / Regular. Texto auxiliar e legendas para elementos secundários da interface.
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    Overline — 12px / Medium / Uppercase / Tracking wide
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORES */}
      <section className="section-padding border-b border-border">
        <div className="container-wide mx-auto">
          <motion.div {...fadeIn}>
            <SectionTitle number="03" title="Cores" />

            {/* Cores Primárias */}
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 mt-12">Paleta primária</h4>
            <div className="flex flex-wrap gap-8 mb-12">
              <ColorSwatch name="Navy (Background)" hsl="222 47% 6%" hex="#0A0F1C" token="--exp3-navy" />
              <ColorSwatch name="Navy Light" hsl="222 47% 12%" hex="#101A2E" token="--exp3-navy-light" />
              <ColorSwatch name="Cyan (Primary)" hsl="187 100% 50%" hex="#00D9FF" token="--exp3-cyan" />
              <ColorSwatch name="Cyan Glow" hsl="187 100% 60%" hex="#33E1FF" token="--exp3-cyan-glow" />
            </div>

            {/* Cores dos Strands */}
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">Cores dos Strands (DNA)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-card p-6 border-t-4 border-t-exp3-cyan">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-exp3-cyan" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Explore</p>
                    <p className="text-xs text-muted-foreground font-mono">#00D9FF</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Validação de valor, criatividade, descoberta.</p>
              </div>
              <div className="glass-card p-6 border-t-4 border-t-exp3-orange">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-exp3-orange" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Exploit</p>
                    <p className="text-xs text-muted-foreground font-mono">#FF6B33</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Escala, eficiência, engenharia de produção.</p>
              </div>
              <div className="glass-card p-6 border-t-4 border-t-exp3-emerald">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-exp3-emerald" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Explain</p>
                    <p className="text-xs text-muted-foreground font-mono">#00C781</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Confiança, governança, transparência.</p>
              </div>
            </div>

            {/* Cores Neutras */}
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">Neutras e suporte</h4>
            <div className="flex flex-wrap gap-8">
              <ColorSwatch name="Foreground" hsl="210 40% 98%" hex="#F8FAFC" token="--foreground" />
              <ColorSwatch name="Muted" hsl="215 20% 65%" hex="#94A3B8" token="--exp3-gray" />
              <ColorSwatch name="Border" hsl="217 32% 20%" hex="#1E293B" token="--border" />
              <ColorSwatch name="Card" hsl="222 47% 8%" hex="#0D1321" token="--card" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. ELEMENTOS */}
      <section className="section-padding border-b border-border">
        <div className="container-wide mx-auto">
          <motion.div {...fadeIn}>
            <SectionTitle number="04" title="Elementos visuais" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Glass Card */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Glass card</h4>
                <div className="glass-card p-8">
                  <p className="text-foreground font-semibold mb-2">Glass morphism</p>
                  <p className="text-sm text-muted-foreground">Cartões com backdrop-blur, borda semi-transparente e sombra profunda.</p>
                </div>
                <p className="text-xs text-muted-foreground font-mono mt-2">.glass-card</p>
              </div>

              {/* Glow Effects */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Glow effects</h4>
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-exp3-cyan/20 glow-cyan" />
                  <div className="w-16 h-16 rounded-xl bg-exp3-orange/20 glow-orange" />
                  <div className="w-16 h-16 rounded-xl bg-exp3-emerald/20 glow-emerald" />
                </div>
                <p className="text-xs text-muted-foreground font-mono mt-4">.glow-cyan .glow-orange .glow-emerald</p>
              </div>

              {/* Text Gradient */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Gradientes de texto</h4>
                <p className="text-3xl font-bold text-gradient-cyan mb-2">Gradient Cyan</p>
                <p className="text-3xl font-bold text-gradient-hero">Gradient Hero</p>
                <p className="text-xs text-muted-foreground font-mono mt-4">.text-gradient-cyan .text-gradient-hero</p>
              </div>

              {/* Buttons */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Botões</h4>
                <div className="flex flex-col gap-3">
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-sm">
                    Botão primário
                  </button>
                  <button className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors text-sm">
                    Botão secundário
                  </button>
                  <button className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                    Botão terciário
                  </button>
                </div>
              </div>

              {/* Icons */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Ícones e social</h4>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50 text-muted-foreground">
                    <SubstackIcon size={24} />
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-primary">
                    <SubstackIcon size={24} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Substack: plataforma social primária. Ícone SVG customizado.</p>
                <p className="text-xs text-muted-foreground mt-1">Demais ícones: biblioteca <code className="bg-secondary px-1 py-0.5 rounded">Lucide React</code>.</p>
              </div>

              {/* Hover/Animation */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Animações</h4>
                <div className="glass-card p-6 hover-lift cursor-pointer">
                  <p className="text-foreground font-semibold mb-1">Hover lift</p>
                  <p className="text-sm text-muted-foreground">Passe o mouse para ver.</p>
                </div>
                <p className="text-xs text-muted-foreground font-mono mt-2">.hover-lift — Framer Motion para transições de seção</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. APLICAÇÃO */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <motion.div {...fadeIn}>
            <SectionTitle number="05" title="Aplicação" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Header mockup */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Header / Navegação</h4>
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold">
                      <span className="text-foreground">EXP</span>
                      <span className="text-gradient-cyan align-super text-sm">³</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="text-primary">Início</span>
                      <span>Sobre</span>
                      <span>Serviços</span>
                      <span>Contato</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card mockup */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Cartão de serviço</h4>
                <div className="glass-card p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <div className="w-5 h-5 rounded-sm bg-primary/60" />
                  </div>
                  <p className="text-foreground font-semibold mb-2">Diagnóstico estratégico</p>
                  <p className="text-sm text-muted-foreground">Auditoria de maturidade em IA e dados.</p>
                </div>
              </div>

              {/* Footer mockup */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Footer</h4>
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold mb-1">
                        <span className="text-foreground">EXP</span>
                        <span className="text-gradient-cyan align-super text-xs">³</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Think Tank estratégico</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Parceiro:</span>
                      <div className="w-12 h-4 bg-muted-foreground/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* DNA strands mockup */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Strand cards (DNA)</h4>
                <div className="flex gap-3">
                  <div className="flex-1 glass-card p-4 border-t-2 border-t-exp3-cyan">
                    <p className="text-xs font-bold text-exp3-cyan">EXPLORE</p>
                    <p className="text-xs text-muted-foreground mt-1">Validação de valor</p>
                  </div>
                  <div className="flex-1 glass-card p-4 border-t-2 border-t-exp3-orange">
                    <p className="text-xs font-bold text-exp3-orange">EXPLOIT</p>
                    <p className="text-xs text-muted-foreground mt-1">Escala e eficiência</p>
                  </div>
                  <div className="flex-1 glass-card p-4 border-t-2 border-t-exp3-emerald">
                    <p className="text-xs font-bold text-exp3-emerald">EXPLAIN</p>
                    <p className="text-xs text-muted-foreground mt-1">Confiança</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Uso incorreto */}
            <div className="mt-16">
              <h4 className="text-sm font-medium text-destructive uppercase tracking-wider mb-6">✕ Usos incorretos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Não altere as cores do logo",
                  "Não use fundo colorido vibrante sob o logo",
                  "Não rotacione ou distorça o logo",
                  "Não represente os strands de forma sequencial (1→2→3)",
                ].map((rule, i) => (
                  <div key={i} className="p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                    <p className="text-sm text-muted-foreground">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const SectionTitle = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4">
    <span className="text-6xl font-extrabold text-primary/20">{number}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
  </div>
);

export default BrandGuidelines;
