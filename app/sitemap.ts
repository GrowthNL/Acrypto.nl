import { MetadataRoute } from 'next'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { MOCK_KENNISBANK } from '@/lib/mock-kennisbank'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                    lastModified: new Date(), changeFrequency: 'hourly',  priority: 1   },
    { url: `${SITE_URL}/nieuws`,        lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${SITE_URL}/koersen`,       lastModified: new Date(), changeFrequency: 'always',  priority: 0.8 },
    { url: `${SITE_URL}/kennisbank`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  ]

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

  return [...staticPages, ...articlePages, ...knowledgePages]
}
