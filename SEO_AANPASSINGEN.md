# SEO- en technische aanpassingen

Overzicht van wat er in deze ronde is doorgevoerd. Voor de openstaande punten die
menselijke input vereisen, zie `TODO_LAATSTE_STAPPEN.md`.

## Fundament
- `lib/config.ts`: centrale `SITE_URL`, `IS_PRODUCTION` (via `VERCEL_ENV`), sitenaam en beschrijving.
- Preview/development staan automatisch op **noindex/nofollow**; alleen productie wordt geindexeerd.

## Indexeerbaarheid
- `app/robots.ts`: blokkeert alles op niet-productie; staat alles toe op productie met sitemap + host.
- `app/layout.tsx`: env-afhankelijke `robots` metadata.
- Zoek-, filter- en paginatie-views op `/nieuws` en niveaufilters op `/kennisbank` staan op `noindex, follow`.

## Metadata en titels
- Titeltemplate `%s | Acrypto.nl`; dubbele branding verwijderd (titels bevatten niet langer zelf "| Acrypto.nl").
- Unieke, CTR-gerichte titels en descriptions (max ~155 tekens) voor home, nieuws, koersen,
  kennisbank, categorie-, coin-, contact-, disclaimer-, redactioneel-beleid-, over-ons- en privacypagina's.

## Canonicals
- `/nieuws?cat=X` -> canonical en 301-redirect naar `/categorie/X`.
- `/nieuws` (en `?page=`) -> canonical naar `/nieuws`.
- `/kennisbank?niveau=` -> canonical naar `/kennisbank`.
- Alle nieuwe pagina's hebben self-canonicals.

## Schone URL's en redirects
- Nieuwe categorie-hubpagina's: `/categorie/[slug]` (bitcoin, ethereum, altcoins, defi, nft, regulering, marktanalyse, nieuws).
- 301-redirects van oude `/nieuws?cat=*` naar de hubpagina's (`next.config.mjs`).

## Sitemap
- `app/sitemap.ts` uitgebreid met categorie-, coin-, over-ons-, contact-, disclaimer-,
  redactioneel-beleid- en privacypagina's. Gebruikt productie-`SITE_URL`, schaalbaar opgezet.

## Nieuwe pagina's
- `/disclaimer`, `/redactioneel-beleid` (trust/E-E-A-T).
- `/categorie/[slug]` SEO-hubs met unieke intro (~200-400 woorden), laatste artikelen, FAQ,
  interne links naar kennisbank en coinpagina, breadcrumbs en disclaimer.
- `/koersen/[coin]` detailpagina's (BTC, ETH, XRP, SOL, ADA) met live data, uitleg, coin-nieuws,
  FAQ, kennisbanklinks, breadcrumbs, structured data en disclaimer.
- `/llms.txt` voor LLM/AEO-vindbaarheid.

## Structured data (JSON-LD)
- `Organization` en `WebSite` (met `@id`-koppeling) in de layout.
- `NewsArticle` (nieuws), `Article` (kennisbank), `BreadcrumbList`, `FAQPage` op relevante pagina's.
- Categorie- en coinpagina's hebben `BreadcrumbList` + `FAQPage` die overeenkomen met zichtbare FAQ's.

## LLM / GEO / AEO
- Nieuwsartikelen: "In het kort"-samenvatting met expliciete "geen financieel advies"-notitie.
- Categorie- en coinpagina's met zichtbare FAQ's gekoppeld aan FAQ-structured-data.
- `/llms.txt` met omschrijving, belangrijke pagina's en gebruiksinstructie voor AI.

## Interne links
- "Lees ook"-blok in nieuwsartikelen + volledige sectie gerelateerde artikelen.
- Categorie- en coinpagina's linken onderling en naar kennisbank.
- Koerstabel linkt coins door naar hun detailpagina; koersenpagina linkt naar nieuws/kennisbank.
- Categorielabel in artikelen linkt naar de categorie-hub.

## UX / content / compliance
- Homepage: duidelijkere hero, trust-signalen, concrete CTA's, accurate cijfers, betere nieuwsbrief-copy.
- Footer: alle links werken (schone categorie-URL's), redactioneel beleid toegevoegd.
- 404: extra links naar koersen, kennisbank en contact.
- Skip-link naar hoofdinhoud + `id="main-content"` voor toegankelijkheid.
- E-mailadres `info@acrypto.nl` (bestond niet) overal vervangen door het contactformulier.
- Privacy: externe diensten gecorrigeerd (Supabase -> Neon, Resend toegevoegd).
- Claude-prompt: verbod op agressieve beleggingsclaims en koersvoorspellingen; neutrale toon.

## Toegankelijkheid / techniek
- Skip-link, aria-labels op breadcrumb-navigaties, `aria-pressed` op kennisbank-niveaufilters.
- `fetchCoinById` met timeout en nette fallback zodat koersfouten de pagina niet breken.

## Checks
- `npx next build`: geslaagd.
- `npx next lint`: geen warnings of errors.
- Type-check (onderdeel van de build): geslaagd.
