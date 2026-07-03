#!/usr/bin/env node
/**
 * Content-audit - analyseert de gepubliceerde artikelen in de database en
 * rapporteert kwaliteitssignalen die relevant zijn voor SEO op een jong domein:
 *
 *  - totaal aantal + publicatietempo (artikelen/dag)
 *  - dunne content (te weinig woorden)
 *  - ontbrekende tldr / faqs (structured-data & UX)
 *  - (bijna-)dubbele titels (kandidaten om samen te voegen/verwijderen)
 *  - artikelen zonder enige weergave (0 views)
 *  - categorie-verdeling
 *
 * Draait read-only; verandert NIETS in de database. Bedoeld om te bepalen
 * welke artikelen kandidaat zijn om te snoeien ("content pruning").
 *
 * Vereiste env: DATABASE_URL
 * Draaien:      npm run audit:content   (of via de content-audit workflow)
 */
import { getDb } from '../lib/db'
import { titlesAreSimilar } from '../lib/rss'

const THIN_WORDS = 400 // onder deze woordtelling = dun/te licht

interface Row {
  id: string
  title: string
  slug: string
  content: string
  tldr: string | null
  faqs: unknown
  category: string
  view_count: number
  published_at: string
  source_name: string | null
}

function wordCount(html: string): number {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length
}

function faqCount(faqs: unknown): number {
  if (Array.isArray(faqs)) return faqs.length
  if (typeof faqs === 'string') {
    try {
      const p = JSON.parse(faqs)
      return Array.isArray(p) ? p.length : 0
    } catch {
      return 0
    }
  }
  return 0
}

function dayKey(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10)
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[audit] DATABASE_URL ontbreekt.')
    process.exit(1)
  }

  const db = getDb()
  const rows = (await db`
    SELECT id, title, slug, content, tldr, faqs, category, view_count,
           published_at, source_name
    FROM articles
    WHERE status = 'published'
    ORDER BY published_at DESC
  `) as unknown as Row[]

  const total = rows.length
  const out: string[] = []
  const p = (s = '') => out.push(s)

  p('# Content-audit acrypto.nl')
  p('')
  p(`**Totaal gepubliceerde artikelen:** ${total}`)
  p('')

  // ---- Publicatietempo (laatste 21 dagen) ----
  const perDay = new Map<string, number>()
  for (const r of rows) perDay.set(dayKey(r.published_at), (perDay.get(dayKey(r.published_at)) || 0) + 1)
  const days = Array.from(perDay.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1)).slice(0, 21)
  p('## Publicatietempo (laatste 21 dagen)')
  p('')
  p('| Datum | Artikelen |')
  p('|---|---|')
  for (const [d, n] of days) p(`| ${d} | ${n} |`)
  const last7 = days.slice(0, 7).reduce((s, [, n]) => s + n, 0)
  p('')
  p(`Gemiddeld laatste 7 dagen: **${(last7 / Math.min(7, days.length || 1)).toFixed(1)} artikelen/dag**`)
  p('')

  // ---- Woordtelling / dunne content ----
  const withWords = rows.map(r => ({ r, w: wordCount(r.content) }))
  const thin = withWords.filter(x => x.w < THIN_WORDS).sort((a, b) => a.w - b.w)
  const avgWords = Math.round(withWords.reduce((s, x) => s + x.w, 0) / (total || 1))
  p('## Lengte / dunne content')
  p('')
  p(`Gemiddelde lengte: **${avgWords} woorden**. Dunne artikelen (< ${THIN_WORDS} woorden): **${thin.length}**`)
  p('')
  if (thin.length) {
    p('| Woorden | Titel | Slug |')
    p('|---|---|---|')
    for (const x of thin.slice(0, 40)) p(`| ${x.w} | ${x.r.title.slice(0, 70)} | ${x.r.slug} |`)
    p('')
  }

  // ---- Ontbrekende tldr / faqs ----
  const noTldr = rows.filter(r => !r.tldr || r.tldr.trim().length < 20)
  const noFaqs = rows.filter(r => faqCount(r.faqs) === 0)
  p('## Structured data / volledigheid')
  p('')
  p(`Zonder TL;DR: **${noTldr.length}** · Zonder FAQ's: **${noFaqs.length}**`)
  p('')

  // ---- (Bijna-)dubbele titels ----
  const dupPairs: string[] = []
  const seenDup = new Set<string>()
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      if (titlesAreSimilar(rows[i].title, rows[j].title)) {
        const key = rows[j].slug
        if (!seenDup.has(key)) {
          seenDup.add(key)
          dupPairs.push(`- "${rows[i].title.slice(0, 60)}" (${rows[i].slug})\n  ~ "${rows[j].title.slice(0, 60)}" (${rows[j].slug})`)
        }
      }
    }
  }
  p('## Mogelijke dubbelingen (zelfde verhaal, andere titel)')
  p('')
  p(`Gevonden overlappende paren: **${dupPairs.length}**`)
  p('')
  if (dupPairs.length) {
    for (const line of dupPairs.slice(0, 40)) p(line)
    p('')
  }

  // ---- 0 views ----
  const zeroViews = rows.filter(r => (r.view_count || 0) === 0)
  p('## Bereik')
  p('')
  p(`Artikelen met 0 weergaven: **${zeroViews.length}** van ${total}`)
  p('(Logisch bij een nieuw domein zonder verkeer; wordt pas zinvol als er bezoek is.)')
  p('')

  // ---- Categorie-verdeling ----
  const perCat = new Map<string, number>()
  for (const r of rows) perCat.set(r.category, (perCat.get(r.category) || 0) + 1)
  p('## Categorie-verdeling')
  p('')
  p('| Categorie | Aantal |')
  p('|---|---|')
  for (const [c, n] of Array.from(perCat.entries()).sort((a, b) => b[1] - a[1])) p(`| ${c} | ${n} |`)
  p('')

  // ---- Snoei-samenvatting ----
  const pruneSlugs = new Set<string>()
  thin.forEach(x => pruneSlugs.add(x.r.slug))
  seenDup.forEach(s => pruneSlugs.add(s))
  p('## Snoei-kandidaten (samenvatting)')
  p('')
  p(`Uniek aantal artikelen dat dun **of** dubbel is: **${pruneSlugs.size}**`)
  p('Advies: dunne artikelen verrijken of verwijderen, dubbelingen samenvoegen naar 1 sterke versie (met 301-redirect).')
  p('')

  console.log(out.join('\n'))
}

main().catch(err => {
  console.error('[audit] fout:', err)
  process.exit(1)
})
