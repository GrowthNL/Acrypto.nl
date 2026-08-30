#!/usr/bin/env node
/**
 * Backfill/herstel van artikelafbeeldingen: geeft artikelen zonder echte foto
 * (leeg, of een branded /api/og-kaart) alsnog een ECHTE, UNIEKE Unsplash-foto.
 *
 * - Dedupe: geen twee artikelen krijgen dezelfde foto (vergelijkt op photo-id).
 * - Faalt Unsplash (rate-limit/timeout), dan blijft de branded /api/og-kaart
 *   staan als nette, unieke fallback (nooit leeg, nooit een categorie-duplicaat).
 * - Idempotent: een nieuwe run pakt alleen de resterende og-kaart/lege artikelen op.
 *
 * Vereiste env: DATABASE_URL, UNSPLASH_ACCESS_KEY.
 * Draaien:      npm run backfill:images  (of via de backfill-images workflow)
 */
import { getDb } from '../lib/db'
import { fetchUnsplashImage } from '../lib/unsplash'
import { SITE_URL } from '../lib/config'

interface Row {
  id: string
  title: string
  category: string | null
  tags: string[] | null
  image_url: string | null
}

function photoId(url: string | null): string | null {
  if (!url) return null
  const m = url.match(/photo-[0-9a-z]+/i)
  return m ? m[0] : null
}

function ogCard(title: string, category: string): string {
  return `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category || 'nieuws')}`
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[backfill] DATABASE_URL ontbreekt.')
    process.exit(1)
  }
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.error('[backfill] UNSPLASH_ACCESS_KEY ontbreekt - kan geen echte foto\'s ophalen.')
    process.exit(1)
  }
  const db = getDb()

  // Alle reeds gebruikte foto-ids verzamelen voor dedup.
  const allRows = (await db`SELECT image_url FROM articles`) as unknown as { image_url: string | null }[]
  const used = new Set<string>()
  for (const r of allRows) {
    const id = photoId(r.image_url)
    if (id) used.add(id)
  }

  // Artikelen die nog een echte foto missen: leeg of een /api/og-kaart.
  const targets = (await db`
    SELECT id, title, category, tags, image_url FROM articles
    WHERE image_url IS NULL OR image_url = '' OR image_url LIKE '%/api/og%'
    ORDER BY published_at DESC
  `) as unknown as Row[]

  console.log(`[backfill] ${targets.length} artikel(en) zonder echte foto.`)

  let withPhoto = 0
  let keptCard = 0

  for (const a of targets) {
    const cat = a.category || 'nieuws'
    let chosen: string | null = null

    // Tot 3 pogingen om een NIEUWE (niet eerder gebruikte) foto te vinden.
    for (let attempt = 0; attempt < 3; attempt++) {
      const url = await fetchUnsplashImage(cat, a.tags || [])
      const id = photoId(url)
      if (url && id && !used.has(id)) {
        chosen = url
        used.add(id)
        break
      }
      await sleep(300)
    }

    if (chosen) {
      await db`UPDATE articles SET image_url = ${chosen} WHERE id = ${a.id}`
      withPhoto++
    } else {
      // Geen unieke foto beschikbaar (rate-limit/dup): nette branded kaart behouden/zetten.
      if (!a.image_url || a.image_url === '') {
        await db`UPDATE articles SET image_url = ${ogCard(a.title, cat)} WHERE id = ${a.id}`
      }
      keptCard++
    }

    await sleep(250) // vriendelijk voor de Unsplash rate-limit
  }

  console.log(`[backfill] klaar: ${withPhoto} echte foto's toegekend, ${keptCard} op branded kaart gehouden (van ${targets.length}).`)
  if (keptCard > 0) console.log('[backfill] Tip: draai de workflow later nog eens om de resterende kaarten alsnog van een foto te voorzien (rate-limit reset per uur).')
}

main().catch(err => {
  console.error('[backfill] fout:', err)
  process.exit(1)
})
