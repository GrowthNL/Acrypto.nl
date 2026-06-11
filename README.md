# Acrypto.nl

Modern Nederlands crypto nieuws platform — automatisch gegenereerde artikelen, live koersen en kennisbank.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — donker thema met Bitcoin oranje
- **Supabase** — PostgreSQL database + Row Level Security
- **Claude API** — Nederlandse artikelen genereren vanuit RSS
- **CoinGecko API** — live crypto koersen
- **Vercel** — hosting + cron jobs

## Features

- Automatische scraping van 8+ internationale & Nederlandse crypto nieuwsbronnen
- Claude AI herschrijft artikelen naar originele Nederlandse content
- Google Discover geoptimaliseerd (JSON-LD, grote afbeeldingen, Core Web Vitals)
- Live prijsticker met top 20 coins
- Koersenoverzicht (top 50)
- Kennisbank voor beginners
- Newsletter aanmelding
- Sitemap.xml automatisch gegenereerd

## Setup

### 1. Installeer dependencies

```bash
npm install
```

### 2. Environment variables

Kopieer `.env.example` naar `.env.local` en vul in:

```bash
cp .env.example .env.local
```

Vul in:
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL van Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Anon key van Supabase
- `SUPABASE_SERVICE_KEY` — Service role key (voor server-side writes)
- `ANTHROPIC_API_KEY` — Claude API key
- `CRON_SECRET` — Willekeurige string voor cron beveiliging
- `NEXT_PUBLIC_SITE_URL` — https://acrypto.nl (of localhost:3000)

### 3. Database setup

Ga naar Supabase → SQL Editor en voer uit:

```sql
-- Kopieer de inhoud van supabase/schema.sql
-- Daarna optioneel seed data:
-- supabase/seed-knowledge.sql
```

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Automatische scraping

### Vercel Cron (aanbevolen)
Stel in Vercel de environment variables in. De `vercel.json` configureert automatisch:
- `/api/scrape` — elke 3 uur (nieuws scrapen + publiceren)
- `/api/prices` — elke 10 minuten (koersen updaten)

### GitHub Actions (backup)
Voeg toe in GitHub repository secrets:
- `CRON_SECRET` — zelfde waarde als in Vercel
- `SITE_URL` — https://acrypto.nl

### Handmatig triggeren
```bash
SITE_URL=https://acrypto.nl CRON_SECRET=xxx npm run scrape
```

## Deploy naar Vercel

```bash
# Installeer Vercel CLI
npm i -g vercel

# Deploy
vercel

# Voeg environment variables toe via Vercel dashboard
```

## Nieuwsbronnen

| Bron | Taal | RSS |
|------|------|-----|
| Crypto Insiders | 🇳🇱 | https://crypto-insiders.nl/feed/ |
| Bitcoin Magazine NL | 🇳🇱 | https://www.bitcoinmagazine.nl/feed/ |
| CoinTelegraph | 🇬🇧 | https://cointelegraph.com/rss |
| CoinDesk | 🇬🇧 | https://www.coindesk.com/arc/outboundfeeds/rss/ |
| Decrypt | 🇬🇧 | https://decrypt.co/feed |
| NewsBTC | 🇬🇧 | https://www.newsbtc.com/feed/ |
| CryptoSlate | 🇬🇧 | https://cryptoslate.com/feed/ |
| Bitcoin Magazine | 🇬🇧 | https://bitcoinmagazine.com/.rss/full/ |

Engelstalige artikelen worden door Claude vertaald en herschreven naar originele Nederlandse content.

## Google Discover optimalisatie

- ✅ NewsArticle JSON-LD structured data
- ✅ Open Graph afbeeldingen (1200×630px)
- ✅ Mobile-first design
- ✅ Snelle laadtijden (Next.js ISR + Vercel CDN)
- ✅ Sitemap.xml automatisch bijgewerkt
- ✅ robots.txt

## Roadmap

- [ ] Telegram kanaal auto-post
- [ ] Prijsalerts (email)
- [ ] Basis portfolio tracker
- [ ] Exchange vergelijker (affiliate)
- [ ] TradingView grafieken op koerspagina
- [ ] Admin panel voor artikel management
- [ ] Plausible Analytics integratie
