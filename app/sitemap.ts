import { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { MOCK_KENNISBANK } from '@/lib/mock-kennisbank'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'

export const revalidate = 3600

const SUPABASE_READY = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

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

  if (SUPABASE_READY) {
    try {
      const supabase = createServerSupabaseClient()
      const [{ data: articles }, { data: knowledgeArticles }] = await Promise.all([
        supabase
          .from('articles')
          .select('slug, published_at, updated_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(1000),
        supabase
          .from('knowledge_articles')
          .select('slug, updated_at'),
      ])

      if (articles?.length) {
        articlePages = articles.map(a => ({
          url: `${SITE_URL}/nieuws/${a.slug}`,
          lastModified: new Date(a.updated_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      }

      if (knowledgeArticles?.length) {
        knowledgePages = knowledgeArticles.map(a => ({
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
