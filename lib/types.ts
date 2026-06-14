export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  image_url: string | null
  image_alt: string | null
  source_url: string | null
  source_name: string | null
  author_name: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  featured: boolean
  view_count: number
  published_at: string
  created_at: string
  updated_at: string
  tldr?: string | null
  faqs?: { q: string; a: string }[]
}

export interface KnowledgeArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  image_url: string | null
  tags: string[]
  published_at: string
  created_at: string
  updated_at: string
  faqs?: { q: string; a: string }[]
}

export interface CryptoPrice {
  id: string
  coin_id: string
  symbol: string
  name: string
  image: string | null
  current_price_eur: number
  current_price_usd: number
  market_cap_eur: number
  volume_24h_eur: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_rank: number
  updated_at: string
}

export interface RssItem {
  title: string
  link: string
  contentSnippet?: string
  content?: string
  pubDate?: string
  enclosure?: { url: string; type: string }
  'media:content'?: { $: { url: string } }
}

export interface GeneratedArticle {
  title: string
  slug: string
  excerpt: string
  tldr: string
  content: string
  tags: string[]
  category: string
  faqs?: { q: string; a: string }[]
}
