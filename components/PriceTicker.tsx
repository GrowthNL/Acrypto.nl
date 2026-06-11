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
        const res = await fetch('/api/prices?limit=20')
        if (res.ok) setPrices(await res.json())
      } catch {}
    }
    load()
    const id = setInterval(load, 60_000)
    return () => clearInterval(id)
  }, [])

  if (prices.length === 0) {
    return (
      <div className="bg-slate-50 border-b border-slate-100 h-9 flex items-center px-6 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  const doubled = [...prices, ...prices]

  return (
    <div className="bg-slate-50 border-b border-slate-100 overflow-hidden h-9 relative">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {doubled.map((coin, i) => {
          const up = coin.price_change_percentage_24h >= 0
          return (
            <span key={`${coin.coin_id}-${i}`} className="inline-flex items-center gap-1.5 px-4 text-xs">
              <span className="font-semibold text-slate-700">{coin.symbol}</span>
              <span className="text-slate-600 font-mono">{formatEur(coin.current_price_eur)}</span>
              <span className={`inline-flex items-center gap-0.5 font-medium ${up ? 'text-up' : 'text-down'}`}>
                {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {formatPriceChange(coin.price_change_percentage_24h)}
              </span>
              <span className="text-slate-200 ml-1">|</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
