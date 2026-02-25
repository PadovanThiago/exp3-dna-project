

## Página /deck com Open Graph otimizado

### O problema com links compartilhados em SPAs

LinkedIn, WhatsApp e outros crawlers **não executam JavaScript**. Eles leem apenas o HTML inicial. Como o site é uma SPA (React), as meta tags OG definidas via JavaScript (como o `BlogSEO.tsx` faz) **não funcionam para crawlers** — eles veem apenas as tags genéricas do `index.html`.

### Abordagem recomendada

Criar um **arquivo HTML estático** em `public/deck/index.html`. Isso garante que:

1. Os crawlers do LinkedIn/WhatsApp leiam as meta tags OG diretamente do HTML
2. A página funcione independentemente do React (carregamento instantâneo)
3. Não apareça no menu de navegação (não é uma rota React)
4. Funcione no domínio `exp3.ai/deck` sem configuração extra

### Estrutura

```text
public/
  deck/
    index.html    ← HTML com OG tags + conteúdo do deck
    deck-og.jpg   ← Imagem de preview para compartilhamento (1200x630px)
```

### O que será feito

1. **`public/deck/index.html`** — Página HTML completa com:
   - Meta tags Open Graph completas (`og:title`, `og:description`, `og:image`, `og:url`)
   - Meta tags Twitter Card (`twitter:card`, `twitter:title`, `twitter:image`)
   - Tag `<link rel="canonical">` apontando para `https://exp3.ai/deck`
   - O conteúdo HTML do deck integrado diretamente
   - Estilos inline ou link para o CSS do site para manter consistência visual
   - Favicon e branding EXP³

2. **Imagem OG** — Você precisará fornecer uma imagem de 1200x630px para o preview nos links. Posso usar a `exp3-og-banner.jpg` existente como fallback.

3. **Rota React** — Opcionalmente, adicionar uma rota `/deck` no React que redireciona para o HTML estático, caso alguém navegue internamente. Mas como a página é acessada apenas via link externo, o HTML em `public/deck/` já será servido diretamente pelo servidor.

### Detalhes técnicos das meta tags

```html
<meta property="og:title" content="EXP³ — [Título do Deck]" />
<meta property="og:description" content="[Descrição curta e impactante]" />
<meta property="og:image" content="https://exp3.ai/deck/deck-og.jpg" />
<meta property="og:url" content="https://exp3.ai/deck" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

### Próximo passo

Preciso que você me envie:
1. **O arquivo HTML** com o conteúdo do deck
2. **Uma imagem** para o preview do link (ideal: 1200x630px) — ou posso usar o banner OG existente
3. **Título e descrição** que deseja que apareçam quando o link for compartilhado

Com esses materiais, crio a página completa.

