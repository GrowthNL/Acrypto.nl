import { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerSupabaseClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, published_at, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(1000)

  const { data: knowledgeArticles } = await supabase
    .from('knowledge_articles')
    .select('slug, updated_at')

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE_URL}/nieuws`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/koersen`, lastModified: new Date(), changeFrequency: 'always', priority: 0.8 },
    { url: `${SITE_URL}/kennisbank`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const articlePages: MetadataRoute.Sitemap = (articles || []).map(a => ({
    url: `${SITE_URL}/nieuws/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const knowledgePages: MetadataRoute.Sitemap = (knowledgeArticles || []).map(a => ({
    url: `${SITE_URL}/kennisbank/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages, ...knowledgePages]
}
