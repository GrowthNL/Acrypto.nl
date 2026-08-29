#!/usr/bin/env node
/**
 * Verhuist de evergreen gidsen van de articles-tabel (/nieuws) naar de
 * knowledge_articles-tabel (/kennisbank), waar ze thuishoren.
 *
 * - Voegt de faqs-kolom toe aan knowledge_articles (indien nog niet aanwezig).
 * - Kopieert elke gids uit articles naar knowledge_articles met niveau/categorie,
 *   en zet interne /nieuws/<slug>-links om naar /kennisbank/<slug>.
 * - Zet de originele /nieuws-versie op 'draft' (301-redirect staat in next.config).
 *
 * Idempotent: een gids die al in knowledge_articles staat, wordt overgeslagen.
 *
 * Vereiste env: DATABASE_URL
 * Draaien:      npm run migrate:guides  (of via de migrate-guides workflow)
 */
import { getDb } from '../lib/db'

interface GuideMap {
  slug: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

const GUIDES: GuideMap[] = [
  { slug: 'crypto-kopen-nederland-stappenplan', difficulty: 'beginner',     category: 'kopen' },
  { slug: 'welke-crypto-kopen',                 difficulty: 'beginner',     category: 'kopen' },
  { slug: 'wat-is-bitvavo',                     difficulty: 'beginner',     category: 'exchanges' },
  { slug: 'bitcoin-kopen-stappenplan',          difficulty: 'beginner',     category: 'kopen' },
  { slug: 'wanneer-crypto-kopen',               difficulty: 'intermediate', category: 'strategie' },
  { slug: 'crypto-kopen-beginner-valkuilen',    difficulty: 'beginner',     category: 'kopen' },
  { slug: 'beste-crypto-exchange-nederland',    difficulty: 'beginner',     category: 'exchanges' },
  { slug: 'crypto-kopen-met-ideal',             difficulty: 'beginner',     category: 'kopen' },
  { slug: 'crypto-belasting-nederland',         difficulty: 'intermediate', category: 'juridisch' },
  { slug: 'crypto-wallet-uitleg',               difficulty: 'beginner',     category: 'beveiliging' },
]

const ALL_SLUGS = GUIDES.map(g => g.slug)

// Zet interne links naar de gidsen om van /nieuws/ naar /kennisbank/.
function rewriteLinks(html: string): string {
  let out = html
  for (const slug of ALL_SLUGS) {
    out = out.split(`/nieuws/${slug}`).join(`/kennisbank/${slug}`)
  }
  return out
}

interface ArticleRow {
  title: string
  excerpt: string | null
  content: string
  image_url: string | null
  tags: string[] | null
  faqs: unknown
  published_at: string
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[migrate] DATABASE_URL ontbreekt.')
    process.exit(1)
  }
  const db = getDb()

  await db`ALTER TABLE knowledge_articles ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'`
  console.log('[migrate] faqs-kolom gegarandeerd aanwezig op knowledge_articles.')

  let moved = 0
  let skipped = 0

  for (const g of GUIDES) {
    const already = await db`SELECT id FROM knowledge_articles WHERE slug = ${g.slug} LIMIT 1`
    if (already.length) {
      console.log(`[migrate] - staat al in kennisbank, overgeslagen: ${g.slug}`)
      skipped++
      continue
    }

    const rows = (await db`
      SELECT title, excerpt, content, image_url, tags, faqs, published_at
      FROM articles WHERE slug = ${g.slug} LIMIT 1
    `) as unknown as ArticleRow[]

    if (!rows.length) {
      console.log(`[migrate] ! bron niet gevonden in articles: ${g.slug}`)
      continue
    }
    const a = rows[0]
    const content = rewriteLinks(a.content)
    const faqsJson = JSON.stringify(a.faqs ?? [])

    await db`
      INSERT INTO knowledge_articles (
        title, slug, excerpt, content, category, difficulty, image_url, tags, faqs, published_at
      ) VALUES (
        ${a.title}, ${g.slug}, ${a.excerpt}, ${content}, ${g.category}, ${g.difficulty},
        ${a.image_url}, ${a.tags ?? []}, ${faqsJson}, ${a.published_at}
      )
    `
    // Originele /nieuws-versie offline (301 naar /kennisbank staat in next.config).
    await db`UPDATE articles SET status = 'draft' WHERE slug = ${g.slug}`
    moved++
    console.log(`[migrate] + verhuisd naar kennisbank: "${a.title}" (${g.slug}) [${g.difficulty}/${g.category}]`)
  }

  console.log(`[migrate] klaar: ${moved} verhuisd, ${skipped} overgeslagen (van ${GUIDES.length}).`)
}

main().catch(err => {
  console.error('[migrate] fout:', err)
  process.exit(1)
})
