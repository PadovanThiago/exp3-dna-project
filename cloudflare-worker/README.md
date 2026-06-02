# OG Proxy — Cloudflare Worker

Por que existe: o site é uma SPA hospedada na Lovable. Crawlers de redes
sociais (WhatsApp, LinkedIn, Slack, Facebook, X) **não executam
JavaScript**, então sempre veem o mesmo `index.html` e mostram a mesma
preview para qualquer link.

Este Worker fica na frente de `exp3.ai/*` no Cloudflare. Quando detecta
um user-agent de crawler, ele faz um proxy interno para a edge function
`og` no Supabase, que retorna um HTML leve com as meta tags corretas
para aquela rota. Usuários reais continuam recebendo o app normalmente.

## Pré-requisitos
- Domínio `exp3.ai` no Cloudflare (já está, pois o DNS é gerenciado lá).
- A edge function `og` já está deployada automaticamente pela Lovable
  em `https://hnveejswefpgbeiwmfys.supabase.co/functions/v1/og`.

## Deploy do Worker (passo a passo)

1. Acesse o painel da Cloudflare → conta → **Workers & Pages** →
   **Create application** → **Create Worker**.
2. Dê um nome qualquer (ex.: `exp3-og-proxy`) e clique em **Deploy**.
3. Em **Edit code**, cole o conteúdo de `og-proxy.js` (este diretório)
   substituindo tudo. Clique em **Save and deploy**.
4. Vá em **Settings → Triggers → Routes** e adicione:
   - `exp3.ai/*`  → zona `exp3.ai`
   - `www.exp3.ai/*` → zona `exp3.ai` (se www estiver em uso)
5. Pronto. O Worker já está interceptando crawlers.

## Como testar

Simular um crawler do WhatsApp/Facebook:
```bash
curl -A "facebookexternalhit/1.1" -s https://exp3.ai/about | head
curl -A "linkedinbot/1.0" -s https://exp3.ai/en/blog | head
curl -A "WhatsApp/2.0" -s https://exp3.ai/blog/<slug-de-um-post> | head
```
Você deve ver `<title>` e `<meta property="og:*">` específicos da rota.

Validadores oficiais:
- LinkedIn: <https://www.linkedin.com/post-inspector/>
- Facebook/WhatsApp: <https://developers.facebook.com/tools/debug/>
- X/Twitter: <https://cards-dev.twitter.com/validator>

## Manutenção
- Para mudar títulos/descrições das páginas institucionais, edite
  `STATIC_ROUTES` em `supabase/functions/og/index.ts`.
- Posts do blog buscam título/imagem direto do banco — basta publicar.
- O Worker em si raramente precisa mudar.
