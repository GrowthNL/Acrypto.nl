#!/usr/bin/env node
/**
 * Backfill: geeft artikelen zonder afbeelding (image_url leeg/null) een unieke,
 * branded /api/og-afbeelding met de titel erin. Lost bestaande dubbele/lege
 * beelden op (die anders terugvielen op een vaste afbeelding per categorie).
 *
 * Idempotent: raakt alleen rijen met een leeg image_url aan.
 *
 * Vereiste env: DATABASE_URL
 * Draaien:      npm run backfill:images  (of via de backfill-images workflow)
 */
import { getDb } from '../lib/db'
import { SITE_URL } from '../lib/config'

interface Row {
  id: string
  title: string
  category: string | null
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[backfill] DATABASE_URL ontbreekt.')
    process.exit(1)
  }
  const db = getDb()

  const rows = (await db`
    SELECT id, title, category FROM articles
    WHERE image_url IS NULL OR image_url = ''
  `) as unknown as Row[]

  console.log(`[backfill] ${rows.length} artikel(en) zonder afbeelding gevonden.`)

  let updated = 0
  for (const r of rows) {
    const cat = r.category || 'nieuws'
    const img = `${SITE_URL}/api/og?title=${encodeURIComponent(r.title)}&category=${encodeURIComponent(cat)}`
    await db`UPDATE articles SET image_url = ${img} WHERE id = ${r.id}`
    updated++
  }

  console.log(`[backfill] klaar: ${updated} artikel(en) voorzien van een unieke afbeelding.`)
}

main().catch(err => {
  console.error('[backfill] fout:', err)
  process.exit(1)
})
