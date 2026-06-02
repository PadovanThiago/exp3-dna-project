## Problema

O site é uma SPA (React + Vite). WhatsApp, LinkedIn, Slack, Facebook **não executam JavaScript** — eles leem apenas o HTML inicial servido pelo servidor. Hoje, qualquer URL (`/`, `/about`, `/services`, `/blog`, `/deck`, etc.) entrega o mesmo `index.html`, então o preview mostra sempre o mesmo título, descrição e imagem.

Já existe uma solução parcial: o `vite-plugin-og-pages.ts` gera HTML estático para posts do blog em build time. Vamos **estender o mesmo padrão** para as demais páginas — é a abordagem mais simples, mantém tudo num lugar só e não exige worker/edge function nova.

## O que será feito

### 1. Corrigir o `index.html` (fallback global)
- Trocar o `og:image` que hoje aponta para `https://lovable.dev/opengraph-image-p98pqg.png` pelo banner próprio `https://exp3.ai/exp3-og-banner.jpg` (já usado pelas edge functions).
- Adicionar `og:image:width=1200` e `og:image:height=630` para LinkedIn renderizar o card grande.

### 2. Estender `vite-plugin-og-pages.ts` para rotas institucionais
Gerar `dist/<rota>/index.html` para cada rota pública em PT e EN, com OG tags próprias:

| Rota | Título | Descrição |
|---|---|---|
| `/` | EXP³ \| Strategic Intelligence That Operates | (atual do index.html) |
| `/about` | About EXP³ \| (…) | (extraída de About.tsx) |
| `/services` | Services \| EXP³ | (…) |
| `/contact` | Contact \| EXP³ | (…) |
| `/blog` | Blog \| EXP³ — Insights on AI | (…) |
| `/en`, `/en/about`, `/en/services`, `/en/contact`, `/en/blog` | versões EN equivalentes | (…) |

Cada HTML estático contém:
- `<title>`, `<meta name="description">`
- `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type=website`
- `twitter:card=summary_large_image` e equivalentes
- `<link rel="canonical">` e `<link rel="alternate" hreflang>` PT↔EN
- `<meta http-equiv="refresh" content="0;url=…">` para que humanos que abram o HTML estático sejam redirecionados pro SPA (o crawler ignora o refresh, mas lê as meta tags primeiro)

Os textos PT/EN ficam definidos num dicionário no próprio plugin (uma única fonte de verdade), espelhando o que está em `src/locales/translations.ts`.

### 3. Adicionar OG tags nos decks estáticos
- `public/deck/index.html`, `public/deck-en/index.html`, `public/deck-fr/index.html` hoje **não têm** meta tags OG. Adicionar bloco OG no `<head>` de cada um, apontando para a imagem `deck-og.jpg` (já existe em `public/deck/`) ou para `exp3-og-banner.jpg` como fallback.

### 4. Validar
- Build local: confirmar que `dist/about/index.html`, `dist/blog/index.html`, `dist/en/about/index.html`, etc., são gerados com as meta tags certas.
- Testar 1–2 URLs publicadas no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) e no [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) depois do deploy.

## Limitações honestas

- Páginas dinâmicas (posts do blog) já funcionam via o plugin existente — nada muda lá.
- Rotas privadas (`/admin/*`, `/neodash`) **não** receberão HTML estático (são internas).
- O usuário humano que abrir um link continua vendo o SPA normalmente (graças ao `meta refresh` ou ao fallback do servidor que entrega o `index.html` para rotas não-existentes — vamos confirmar o comportamento do hosting da Lovable; se necessário, ajustamos).

## Arquivos a alterar

- `index.html` — corrigir `og:image`
- `vite-plugin-og-pages.ts` — adicionar geração das rotas institucionais
- `public/deck/index.html`, `public/deck-en/index.html`, `public/deck-fr/index.html` — adicionar OG tags

Nenhum código de UI/React será tocado. A solução é puramente build-time e estática.
