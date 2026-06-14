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
  priority: number // lower = higher priority (Dutch sources get lower number)
}

export const RSS_SOURCES: RssSource[] = [
  // Dutch sources (highest priority)
  { name: 'Crypto Insiders',   url: 'https://crypto-insiders.nl/feed/',          language: 'nl', priority: 1 },
  { name: 'Bitcoin Magazine NL', url: 'https://www.bitcoinmagazine.nl/feed/',     language: 'nl', priority: 1 },
  { name: 'Newsbit',           url: 'https://newsbit.nl/feed/',                   language: 'nl', priority: 1 },
  { name: 'CoinJournal NL',    url: 'https://nl.coinjournal.net/feed/',           language: 'nl', priority: 2 },
  { name: 'BTC Direct Blog',   url: 'https://www.btcdirect.eu/nl/blog/feed',      language: 'nl', priority: 2 },
  // English sources
  { name: 'CoinTelegraph',     url: 'https://cointelegraph.com/rss',              language: 'en', priority: 3 },
  { name: 'CoinDesk',          url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', language: 'en', priority: 3 },
  { name: 'Decrypt',           url: 'https://decrypt.co/feed',                   language: 'en', priority: 3 },
  { name: 'The Block',         url: 'https://www.theblock.co/rss.xml',           language: 'en', priority: 4 },
  { name: 'NewsBTC',           url: 'https://www.newsbtc.com/feed/',              language: 'en', priority: 4 },
  { name: 'CryptoSlate',       url: 'https://cryptoslate.com/feed/',              language: 'en', priority: 4 },
  { name: 'Bitcoin Magazine',  url: 'https://bitcoinmagazine.com/.rss/full/',     language: 'en', priority: 4 },
]

// Only process articles published within the last 48 hours
const MAX_AGE_HOURS = 48

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
    const cutoff = new Date(Date.now() - MAX_AGE_HOURS * 60 * 60 * 1000)

    for (const item of feed.items.slice(0, 10)) {
      if (!item.title || !item.link) continue

      // Skip articles older than MAX_AGE_HOURS
      const pubDate = item.pubDate ? new Date(item.pubDate) : null
      if (pubDate && pubDate < cutoff) continue

      const imageUrl = extractImage(item as unknown as RssItem & Record<string, unknown>)
      const content = item.content || item.contentSnippet || item.summary || ''

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

// Extract meaningful keywords from a title for similarity comparison
function titleKeywords(title: string): Set<string> {
  const stopWords = new Set([
    'de', 'het', 'een', 'van', 'in', 'op', 'te', 'met', 'voor', 'aan', 'bij',
    'door', 'is', 'zijn', 'heeft', 'over', 'ook', 'maar', 'als', 'dit', 'dat',
    'the', 'a', 'an', 'of', 'in', 'on', 'to', 'with', 'for', 'at', 'by',
    'from', 'its', 'that', 'this', 'was', 'are', 'has', 'have', 'will', 'new',
    'more', 'how', 'why', 'what', 'when', 'says', 'amid', 'after', 'could',
  ])
  return new Set(
    title.toLowerCase().split(/\W+/).filter(w => w.length > 3 && !stopWords.has(w))
  )
}

// Returns true if two titles share 3+ significant keywords : same story, different source
export function titlesAreSimilar(a: string, b: string): boolean {
  const kA = titleKeywords(a)
  const kB = titleKeywords(b)
  let overlap = 0
  for (const word of Array.from(kB)) {
    if (kA.has(word)) overlap++
    if (overlap >= 3) return true
  }
  return false
}

export async function fetchAllSources(): Promise<FetchedItem[]> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(source => fetchRssSource(source))
  )

  const allItems = results
    .filter((r): r is PromiseFulfilledResult<FetchedItem[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)

  // Sort by source priority (Dutch first) then by date (newest first)
  allItems.sort((a, b) => {
    if (a.source.priority !== b.source.priority) return a.source.priority - b.source.priority
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  })

  // Deduplicate within batch: keep the highest-priority source per story
  const deduped: FetchedItem[] = []
  for (const item of allItems) {
    const isDuplicate = deduped.some(kept => titlesAreSimilar(kept.title, item.title))
    if (!isDuplicate) deduped.push(item)
  }

  return deduped
}
