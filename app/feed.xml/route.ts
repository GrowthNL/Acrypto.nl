import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/config'

// Ververst elk kwartier; genoeg vers voor feedreaders en social-automatisering.
export const revalidate = 900

interface FeedRow {
  title: string
  slug: string
  excerpt: string | null
  image_url: string | null
  category: string | null
  author_name: string | null
  published_at: string
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  let rows: FeedRow[] = MOCK_ARTICLES.slice(0, 30).map(a => ({
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt ?? null,
    image_url: a.image_url ?? null,
    category: a.category ?? null,
    author_name: a.author_name ?? null,
    published_at: a.published_at,
  }))

  if (DB_READY) {
    try {
      const db = getDb()
      const result = (await db`
        SELECT title, slug, excerpt, image_url, category, author_name, published_at
        FROM articles
        WHERE status = 'published'
        ORDER BY published_at DESC
        LIMIT 30
      `) as unknown as FeedRow[]
      if (result.length) rows = result
    } catch {
      // val terug op mock-data
    }
  }

  const now = new Date().toUTCString()
  const items = rows
    .map(a => {
      const url = `${SITE_URL}/nieuws/${a.slug}`
      const pub = new Date(a.published_at).toUTCString()
      const enclosure = a.image_url
        ? `\n      <enclosure url="${esc(a.image_url)}" type="image/jpeg" />`
        : ''
      const category = a.category ? `\n      <category>${esc(a.category)}</category>` : ''
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(a.excerpt || a.title)}</description>
      <dc:creator>${esc(a.author_name || SITE_NAME)}</dc:creator>
      <pubDate>${pub}</pubDate>${category}${enclosure}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE_NAME)} - Crypto nieuws</title>
    <link>${SITE_URL}/nieuws</link>
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>nl-NL</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600',
    },
  })
}
