#!/usr/bin/env node
/**
 * Standalone scrape + publish - draait VOLLEDIG in de GitHub Action.
 *
 * Anders dan scripts/scrape.mjs (die het Vercel-endpoint aanroept en op de
 * 300s Hobby-limiet stuk loopt), doet dit script al het werk in-process:
 * RSS ophalen -> Claude artikel laten schrijven -> Unsplash-afbeelding ->
 * direct naar de Neon-database schrijven. De Action heeft 15 minuten, dus
 * geen 504 meer en we kunnen meerdere artikelen per run publiceren.
 *
 * Vereiste env: DATABASE_URL, ANTHROPIC_API_KEY
 * Optioneel:    UNSPLASH_ACCESS_KEY, MAX_ARTICLES (default 3)
 *
 * Lokaal draaien:  npm run scrape:direct
 */
import { getDb } from '../lib/db'
import { fetchAllSources, titlesAreSimilar } from '../lib/rss'
import { generateDutchArticle } from '../lib/claude'
import { fetchUnsplashImage } from '../lib/unsplash'
import { slugify } from '../lib/utils'
import { PRIMARY_AUTHOR } from '../lib/authors'

const MAX_ARTICLES = Math.max(1, Number(process.env.MAX_ARTICLES || 3))
// Veiligheidsremmen zodat een trage/mislukkende batch nooit de hele Action-tijd opslokt.
const MAX_ATTEMPTS = Math.max(MAX_ARTICLES, Number(process.env.MAX_ATTEMPTS || 8))
const TIME_BUDGET_MS = Math.max(1, Number(process.env.TIME_BUDGET_MIN || 10)) * 60_000

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[scrape] DATABASE_URL ontbreekt - kan niet naar de database schrijven.')
    process.exit(1)
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[scrape] ANTHROPIC_API_KEY ontbreekt - kan geen artikelen genereren.')
    process.exit(1)
  }

  const db = getDb()
  const results = { fetched: 0, new: 0, published: 0, skipped_duplicate: 0, errors: 0 }

  const deadline = Date.now() + TIME_BUDGET_MS
  let attempts = 0

  const items = await fetchAllSources()
  results.fetched = items.length
  console.log(`[scrape] ${items.length} unieke items opgehaald; doel: max ${MAX_ARTICLES} artikel(en)`)

  // Titels van recent gepubliceerde artikelen voor cross-run duplicaatdetectie.
  const recentRows = await db`
    SELECT title FROM articles
    WHERE published_at > NOW() - INTERVAL '48 hours'
  `
  const recentTitles = (recentRows as { title: string }[]).map(r => r.title)

  for (const item of items) {
    if (results.published >= MAX_ARTICLES) break
    if (attempts >= MAX_ATTEMPTS) {
      console.log(`[scrape] max pogingen (${MAX_ATTEMPTS}) bereikt - stoppen`)
      break
    }
    if (Date.now() > deadline) {
      console.log('[scrape] tijdsbudget bereikt - stoppen')
      break
    }

    // Al eerder gescrapet? Overslaan.
    const existing = await db`SELECT id FROM scraped_urls WHERE url = ${item.link} LIMIT 1`
    if (existing.length > 0) continue

    // Vergelijkbaar verhaal al gepubliceerd de afgelopen 48 uur? Overslaan.
    if (recentTitles.some(t => titlesAreSimilar(t, item.title))) {
      results.skipped_duplicate++
      await db`INSERT INTO scraped_urls (url) VALUES (${item.link}) ON CONFLICT DO NOTHING`
      continue
    }

    results.new++
    attempts++
    console.log(`[scrape] genereren (poging ${attempts}/${MAX_ATTEMPTS}): "${item.title}" (${item.source.name})`)

    const generated = await generateDutchArticle(item.title, item.content, item.source.name)
    if (!generated) {
      results.errors++
      // Markeer als verwerkt zodat we deze bron niet eindeloos opnieuw proberen.
      await db`INSERT INTO scraped_urls (url) VALUES (${item.link}) ON CONFLICT DO NOTHING`
      // In CI hebben we tijd: ga door met de volgende i.p.v. de hele run te stoppen.
      continue
    }

    recentTitles.push(generated.title)

    const imageUrl = await fetchUnsplashImage(generated.category || 'nieuws', generated.tags || [])

    let slug = generated.slug || slugify(generated.title)
    const slugExists = await db`SELECT id FROM articles WHERE slug = ${slug} LIMIT 1`
    if (slugExists.length > 0) slug = `${slug}-${Date.now()}`

    try {
      await db`
        INSERT INTO articles (
          title, slug, excerpt, tldr, content, image_url, source_url, source_name,
          author_name, category, tags, faqs, status, featured, published_at
        ) VALUES (
          ${generated.title},
          ${slug},
          ${generated.excerpt},
          ${generated.tldr || null},
          ${generated.content},
          ${imageUrl || null},
          ${item.link},
          ${item.source.name},
          ${PRIMARY_AUTHOR.name},
          ${generated.category || 'nieuws'},
          ${generated.tags || []},
          ${JSON.stringify(generated.faqs || [])},
          ${'published'},
          ${false},
          ${new Date(item.pubDate).toISOString()}
        )
      `
      results.published++
      console.log(`[scrape] gepubliceerd (${results.published}/${MAX_ARTICLES}): "${generated.title}"`)
    } catch (insertErr) {
      results.errors++
      console.error('[scrape] insert-fout:', insertErr)
    }

    await db`INSERT INTO scraped_urls (url) VALUES (${item.link}) ON CONFLICT DO NOTHING`
  }

  console.log('[scrape] klaar:', JSON.stringify(results))
}

main().catch(err => {
  console.error('[scrape] onverwachte fout:', err)
  process.exit(1)
})
