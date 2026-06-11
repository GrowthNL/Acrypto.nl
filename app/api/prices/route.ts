import { NextRequest, NextResponse } from 'next/server'
import { fetchTopCoins } from '@/lib/coingecko'
import { createServiceSupabaseClient } from '@/lib/supabase-server'

export const revalidate = 60

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const isVercelCron = req.headers.get('x-vercel-cron') === '1'

  try {
    const prices = await fetchTopCoins(Math.min(limit, 100))

    // If triggered by cron, also persist to Supabase for history
    if (isVercelCron && prices.length > 0) {
      const supabase = createServiceSupabaseClient()
      const upsertData = prices.map(p => ({
        coin_id: p.coin_id,
        symbol: p.symbol,
        name: p.name,
        image: p.image,
        current_price_eur: p.current_price_eur,
        current_price_usd: p.current_price_usd,
        market_cap_eur: p.market_cap_eur,
        volume_24h_eur: p.volume_24h_eur,
        price_change_24h: p.price_change_24h,
        price_change_percentage_24h: p.price_change_percentage_24h,
        market_cap_rank: p.market_cap_rank,
        updated_at: new Date().toISOString(),
      }))

      await supabase
        .from('crypto_prices')
        .upsert(upsertData, { onConflict: 'coin_id' })
    }

    return NextResponse.json(prices, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (err) {
    console.error('Prices API error:', err)
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 })
  }
}
