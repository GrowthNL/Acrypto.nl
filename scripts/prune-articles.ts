#!/usr/bin/env node
/**
 * Prune-articles - haalt specifiek benoemde artikelen offline door hun status
 * op 'draft' te zetten. BEWUST geen harde DELETE: dit is volledig omkeerbaar
 * (status terug op 'published' zetten volstaat) en behoudt view_count/historie.
 *
 * Artikelen op 'draft' verdwijnen uit alle publieke queries, de sitemap en de
 * news-sitemap (die filteren op status = 'published').
 *
 * De lijst hieronder is bewust hardcoded en auditbaar. Voeg alleen slugs toe
 * die je expliciet wilt opschonen.
 *
 * Vereiste env: DATABASE_URL
 * Draaien:      npm run prune:articles   (of via de prune-articles workflow)
 */
import { getDb } from '../lib/db'

// Slugs die offline moeten. Reden erbij voor de logica/historie.
const TO_DRAFT: { slug: string; reason: string }[] = [
  {
    slug: 'geen-crypto-artikel-mogelijk',
    reason: 'Kapotte generatie (79 woorden, geen echt artikel)',
  },
  {
    slug: 'xrp-copy-trading-populair-onder-nederlanders-1781625876490',
    reason: 'Exacte duplicaat; behouden versie = xrp-copy-trading-populair-onder-nederlanders (301 in next.config)',
  },
]

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[prune] DATABASE_URL ontbreekt.')
    process.exit(1)
  }

  const db = getDb()
  console.log(`[prune] ${TO_DRAFT.length} artikel(en) op 'draft' zetten...`)

  for (const { slug, reason } of TO_DRAFT) {
    const rows = (await db`
      UPDATE articles
      SET status = 'draft'
      WHERE slug = ${slug} AND status = 'published'
      RETURNING id, title
    `) as unknown as { id: string; title: string }[]

    if (rows.length) {
      console.log(`[prune] ✓ offline: "${rows[0].title}" (${slug}) - ${reason}`)
    } else {
      console.log(`[prune] - overgeslagen (niet gevonden of al draft): ${slug}`)
    }
  }

  console.log('[prune] klaar.')
}

main().catch(err => {
  console.error('[prune] fout:', err)
  process.exit(1)
})
