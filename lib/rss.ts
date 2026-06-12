import Parser from 'rss-parser'
import { RssItem } from './types'

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media:content', { keepArray: false }],
      ['media:thumbnail', 'media:thumbnail', { keepArray: false }],
      ['enclosure', 'enclosure', { keepArray: false }],
    ],
  },
  timeout: 10000,
})

export interface RssSource {
  name: string
  url: string
  language: 'nl' | 'en'
}

export const RSS_SOURCES: RssSource[] = [
  { name: 'Crypto Insiders', url: 'https://crypto-insiders.nl/feed/', language: 'nl' },
  { name: 'Bitcoin Magazine NL', url: 'https://www.bitcoinmagazine.nl/feed/', language: 'nl' },
  { name: 'CoinTelegraph', url: 'https://cointelegraph.com/rss', language: 'en' },
  { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', language: 'en' },
  { name: 'Decrypt', url: 'https://decrypt.co/feed', language: 'en' },
  { name: 'NewsBTC', url: 'https://www.newsbtc.com/feed/', language: 'en' },
  { name: 'CryptoSlate', url: 'https://cryptoslate.com/feed/', language: 'en' },
  { name: 'Bitcoin Magazine', url: 'https://bitcoinmagazine.com/.rss/full/', language: 'en' },
]

export interface FetchedItem {
  title: string
  link: string
  content: string
  imageUrl: string | null
  pubDate: string
  source: RssSource
}

export async function fetchRssSource(source: RssSource): Promise<FetchedItem[]> {
  try {
    const feed = await parser.parseURL(source.url)
    const items: FetchedItem[] = []

    for (const item of feed.items.slice(0, 10)) {
      const imageUrl = extractImage(item as unknown as RssItem & Record<string, unknown>)
      const content = item.content || item.contentSnippet || item.summary || ''

      if (!item.title || !item.link) continue

      items.push({
        title: item.title,
        link: item.link,
        content: content.substring(0, 4000),
        imageUrl,
        pubDate: item.pubDate || new Date().toISOString(),
        source,
      })
    }

    return items
  } catch (err) {
    console.error(`RSS fetch error for ${source.name}:`, err)
    return []
  }
}

function extractImage(item: RssItem & Record<string, unknown>): string | null {
  if (item.enclosure && typeof item.enclosure === 'object') {
    const enc = item.enclosure as { url?: string; type?: string }
    if (enc.url && enc.type?.startsWith('image')) return enc.url
  }

  const mc = item['media:content'] as Record<string, unknown> | undefined
  if (mc?.$) {
    const attrs = mc.$ as Record<string, string>
    if (attrs.url) return attrs.url
  }

  const mt = item['media:thumbnail'] as Record<string, unknown> | undefined
  if (mt?.$) {
    const attrs = mt.$ as Record<string, string>
    if (attrs.url) return attrs.url
  }

  const imgMatch = (item.content || '').match(/<img[^>]+src="([^"]+)"/)
  if (imgMatch) return imgMatch[1]

  return null
}

export async function fetchAllSources(): Promise<FetchedItem[]> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(source => fetchRssSource(source))
  )

  return results
    .filter((r): r is PromiseFulfilledResult<FetchedItem[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)
}
