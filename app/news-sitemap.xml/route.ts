import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { SITE_URL, SITE_NAME } from '@/lib/config'

// Google News-sitemap: bevat uitsluitend artikelen van de laatste 48 uur.
// Helpt Google News/Discover om verse content snel op te pikken.
export const revalidate = 900

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const since = Date.now() - 48 * 3600 * 1000
  let items: { slug: string; title: string; published_at: string }[] = []

  if (DB_READY) {
    try {
      const db = getDb()
      const rows = await db`
        SELECT slug, title, published_at FROM articles
        WHERE status = 'published' AND published_at > NOW() - INTERVAL '48 hours'
        ORDER BY published_at DESC
        LIMIT 1000
      `
      items = rows as { slug: string; title: string; published_at: string }[]
    } catch {}
  }

  if (!items.length) {
    items = MOCK_ARTICLES
      .filter(a => new Date(a.published_at).getTime() > since)
      .map(a => ({ slug: a.slug, title: a.title, published_at: a.published_at }))
  }

  const urls = items
    .map(
      a => `  <url>
    <loc>${SITE_URL}/nieuws/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE_NAME)}</news:name>
        <news:language>nl</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.published_at).toISOString()}</news:publication_date>
      <news:title>${esc(a.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900',
    },
  })
}
