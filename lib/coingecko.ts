import { CryptoPrice } from './types'

const BASE_URL = 'https://api.coingecko.com/api/v3'
const API_KEY = process.env.COINGECKO_API_KEY

const headers: HeadersInit = API_KEY
  ? { 'x-cg-demo-api-key': API_KEY }
  : {}

export async function fetchTopCoins(limit = 50): Promise<CryptoPrice[]> {
  const params = new URLSearchParams({
    vs_currency: 'eur',
    order: 'market_cap_desc',
    per_page: String(limit),
    page: '1',
    sparkline: 'false',
    price_change_percentage: '24h',
  })

  const res = await fetch(`${BASE_URL}/coins/markets?${params}`, {
    headers,
    next: { revalidate: 600 },
    signal: AbortSignal.timeout(5000),
  })

  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`)

  const data = await res.json()
  return data.map((coin: Record<string, unknown>) => ({
    id: String(coin.id),
    coin_id: String(coin.id),
    symbol: String(coin.symbol).toUpperCase(),
    name: String(coin.name),
    image: coin.image as string | null,
    current_price_eur: Number(coin.current_price) || 0,
    current_price_usd: 0,
    market_cap_eur: Number(coin.market_cap) || 0,
    volume_24h_eur: Number(coin.total_volume) || 0,
    price_change_24h: Number(coin.price_change_24h) || 0,
    price_change_percentage_24h: Number(coin.price_change_percentage_24h) || 0,
    market_cap_rank: Number(coin.market_cap_rank) || 0,
    updated_at: new Date().toISOString(),
  }))
}

export async function fetchTickerCoins(): Promise<CryptoPrice[]> {
  return fetchTopCoins(20)
}

/**
 * Haalt marktdata van een enkele coin op via het CoinGecko id (bijv. 'bitcoin').
 * Retourneert null bij fouten zodat de pagina niet breekt.
 */
export async function fetchCoinById(coingeckoId: string): Promise<CryptoPrice | null> {
  try {
    const params = new URLSearchParams({
      vs_currency: 'eur',
      ids: coingeckoId,
      order: 'market_cap_desc',
      per_page: '1',
      page: '1',
      sparkline: 'false',
      price_change_percentage: '24h',
    })

    const res = await fetch(`${BASE_URL}/coins/markets?${params}`, {
      headers,
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) return null

    const data = await res.json()
    const coin = Array.isArray(data) ? data[0] : null
    if (!coin) return null

    return {
      id: String(coin.id),
      coin_id: String(coin.id),
      symbol: String(coin.symbol).toUpperCase(),
      name: String(coin.name),
      image: coin.image as string | null,
      current_price_eur: Number(coin.current_price) || 0,
      current_price_usd: 0,
      market_cap_eur: Number(coin.market_cap) || 0,
      volume_24h_eur: Number(coin.total_volume) || 0,
      price_change_24h: Number(coin.price_change_24h) || 0,
      price_change_percentage_24h: Number(coin.price_change_percentage_24h) || 0,
      market_cap_rank: Number(coin.market_cap_rank) || 0,
      updated_at: new Date().toISOString(),
    }
  } catch {
    return null
  }
}
