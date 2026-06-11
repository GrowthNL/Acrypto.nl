'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatEur, formatPriceChange } from '@/lib/utils'
import type { CryptoPrice } from '@/lib/types'

export default function PriceTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/prices?limit=20', { next: { revalidate: 60 } })
        if (res.ok) {
          const data = await res.json()
          setPrices(data)
        }
      } catch {}
    }
    load()
    const interval = setInterval(load, 60_000)
    return () => clearInterval(interval)
  }, [])

  if (prices.length === 0) {
    return (
      <div className="bg-surface border-b border-border h-9 flex items-center px-4">
        <div className="h-3 w-64 bg-surface2 rounded animate-pulse" />
      </div>
    )
  }

  const doubled = [...prices, ...prices]

  return (
    <div className="bg-surface border-b border-border overflow-hidden h-9 relative">
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface to-transparent z-10" />
      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {doubled.map((coin, i) => (
          <span key={`${coin.coin_id}-${i}`} className="inline-flex items-center gap-1.5 px-4 text-xs">
            <span className="font-semibold text-gray-300">{coin.symbol}</span>
            <span className="text-gray-400">{formatEur(coin.current_price_eur)}</span>
            <span
              className={`inline-flex items-center gap-0.5 ${
                coin.price_change_percentage_24h >= 0 ? 'text-up' : 'text-down'
              }`}
            >
              {coin.price_change_percentage_24h >= 0
                ? <TrendingUp className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />}
              {formatPriceChange(coin.price_change_percentage_24h)}
            </span>
            <span className="text-border ml-2">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
