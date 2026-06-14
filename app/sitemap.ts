import { MetadataRoute } from 'next'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { MOCK_KENNISBANK } from '@/lib/mock-kennisbank'
import { SITE_URL } from '@/lib/config'
import { CATEGORY_SLUGS } from '@/lib/categories'
import { COIN_SLUGS } from '@/lib/coins'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                          lastModified: now, changeFrequency: 'hourly',  priority: 1   },
    { url: `${SITE_URL}/nieuws`,              lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${SITE_URL}/koersen`,             lastModified: now, changeFrequency: 'always',  priority: 0.8 },
    { url: `${SITE_URL}/kennisbank`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/over-ons`,            lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/contact`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/redactioneel-beleid`, lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${SITE_URL}/disclaimer`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/privacy`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Categorie-hubpagina's
  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map(slug => ({
    url: `${SITE_URL}/categorie/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Coin-detailpagina's
  const coinPages: MetadataRoute.Sitemap = COIN_SLUGS.map(slug => ({
    url: `${SITE_URL}/koersen/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  let articlePages: MetadataRoute.Sitemap = MOCK_ARTICLES.map(a => ({
    url: `${SITE_URL}/nieuws/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  let knowledgePages: MetadataRoute.Sitemap = MOCK_KENNISBANK.map(a => ({
    url: `${SITE_URL}/kennisbank/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  if (DB_READY) {
    try {
      const db = getDb()
      const [articles, knowledgeArticles] = await Promise.all([
        db`SELECT slug, published_at, updated_at FROM articles WHERE status = 'published' ORDER BY published_at DESC LIMIT 1000`,
        db`SELECT slug, updated_at FROM knowledge_articles`,
      ])

      if (articles.length) {
        articlePages = (articles as { slug: string; updated_at: string }[]).map(a => ({
          url: `${SITE_URL}/nieuws/${a.slug}`,
          lastModified: new Date(a.updated_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      }

      if (knowledgeArticles.length) {
        knowledgePages = (knowledgeArticles as { slug: string; updated_at: string }[]).map(a => ({
          url: `${SITE_URL}/kennisbank/${a.slug}`,
          lastModified: new Date(a.updated_at),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      }
    } catch {}
  }

  return [...staticPages, ...categoryPages, ...coinPages, ...articlePages, ...knowledgePages]
}
