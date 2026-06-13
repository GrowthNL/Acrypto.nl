import { NextRequest, NextResponse } from 'next/server'
import { fetchTopCoins } from '@/lib/coingecko'

export const revalidate = 60

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '50')

  try {
    const prices = await fetchTopCoins(Math.min(limit, 100))

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
