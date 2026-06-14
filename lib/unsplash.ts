const CATEGORY_QUERIES: Record<string, string> = {
  bitcoin:      'bitcoin coin digital gold',
  ethereum:     'ethereum blockchain network',
  altcoins:     'cryptocurrency altcoin coins',
  defi:         'blockchain finance decentralized protocol',
  nft:          'digital art nft token collectible',
  regulering:   'government regulation finance law',
  marktanalyse: 'trading chart market stocks analysis',
  nieuws:       'cryptocurrency blockchain technology',
}

export async function fetchUnsplashImage(category: string, tags: string[] = []): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null

  const categoryQuery = CATEGORY_QUERIES[category?.toLowerCase()] ?? CATEGORY_QUERIES.nieuws
  const tagQuery = tags
    .filter(t => t.length > 3 && !['nieuws', 'bitcoin', 'crypto'].includes(t))
    .slice(0, 2)
    .join(' ')
  const query = [tagQuery, categoryQuery].filter(Boolean).join(' ').trim()

  try {
    const resp = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${key}`,
      { signal: AbortSignal.timeout(4000) }
    )
    if (!resp.ok) return null

    const data = await resp.json() as { urls?: { regular?: string } }
    const rawUrl = data.urls?.regular
    if (!rawUrl) return null

    const u = new URL(rawUrl)
    u.searchParams.set('w', '1200')
    u.searchParams.set('q', '80')
    u.searchParams.set('fit', 'crop')
    u.searchParams.set('crop', 'entropy')
    return u.toString()
  } catch {
    return null
  }
}
