import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { fetchAllSources, titlesAreSimilar } from '@/lib/rss'
import { generateDutchArticle } from '@/lib/claude'
import { fetchUnsplashImage } from '@/lib/unsplash'
import { slugify } from '@/lib/utils'

export const maxDuration = 300

const MAX_ARTICLES_PER_RUN = 2

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  const isVercelCron = req.headers.get('x-vercel-cron') === '1'
  const isAuthorized = isVercelCron || (cronSecret && authHeader === `Bearer ${cronSecret}`)

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getDb()
  const results = { fetched: 0, new: 0, published: 0, skipped_duplicate: 0, errors: 0 }

  try {
    const items = await fetchAllSources()
    results.fetched = items.length

    // Load recent article titles from DB once : used for cross-batch duplicate detection
    const recentRows = await db`
      SELECT title FROM articles
      WHERE published_at > NOW() - INTERVAL '48 hours'
    `
    const recentTitles = (recentRows as { title: string }[]).map(r => r.title)

    for (const item of items) {
      // Skip if this URL was already scraped
      const existing = await db`SELECT id FROM scraped_urls WHERE url = ${item.link} LIMIT 1`
      if (existing.length > 0) continue

      // Skip if a similar story was already published in the last 48 hours
      const isCrossBatchDuplicate = recentTitles.some(t => titlesAreSimilar(t, item.title))
      if (isCrossBatchDuplicate) {
        results.skipped_duplicate++
        await db`INSERT INTO scraped_urls (url) VALUES (${item.link}) ON CONFLICT DO NOTHING`
        continue
      }

      results.new++

      // Generate Dutch article with Claude
      const generated = await generateDutchArticle(
        item.title,
        item.content,
        item.source.name
      )

      if (!generated) {
        results.errors++
        await db`INSERT INTO scraped_urls (url) VALUES (${item.link}) ON CONFLICT DO NOTHING`
        continue
      }

      // Add generated title to recent list so same-run duplicates are also caught
      recentTitles.push(generated.title)

      // Fetch unique Unsplash image (ignores scraped image to avoid watermarks/logos)
      const imageUrl = await fetchUnsplashImage(generated.category || 'nieuws', generated.tags || [])

      // Ensure unique slug
      let slug = generated.slug || slugify(generated.title)
      const slugExists = await db`SELECT id FROM articles WHERE slug = ${slug} LIMIT 1`
      if (slugExists.length > 0) {
        slug = `${slug}-${Date.now()}`
      }

      // Insert article
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
            ${'Acrypto Redactie'},
            ${generated.category || 'nieuws'},
            ${generated.tags || []},
            ${JSON.stringify(generated.faqs || [])},
            ${'published'},
            ${false},
            ${new Date(item.pubDate).toISOString()}
          )
        `
        results.published++
        if (results.published >= MAX_ARTICLES_PER_RUN) {
          await db`INSERT INTO scraped_urls (url) VALUES (${item.link}) ON CONFLICT DO NOTHING`
          break
        }
      } catch (insertErr) {
        results.errors++
        console.error('Insert error:', insertErr)
      }

      // Mark URL as scraped
      await db`INSERT INTO scraped_urls (url) VALUES (${item.link}) ON CONFLICT DO NOTHING`
    }

    return NextResponse.json({ success: true, ...results })
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json({ error: 'Scrape failed', ...results }, { status: 500 })
  }
}
