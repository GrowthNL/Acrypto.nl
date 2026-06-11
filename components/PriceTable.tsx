import Image from 'next/image'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { CryptoPrice } from '@/lib/types'
import { formatEur, formatPriceChange } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  prices: CryptoPrice[]
  compact?: boolean
}

export default function PriceTable({ prices, compact = false }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs font-semibold text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th className="text-left py-3 px-4 w-10">#</th>
            <th className="text-left py-3 px-4">Naam</th>
            <th className="text-right py-3 px-4">Koers</th>
            <th className="text-right py-3 px-4">24u</th>
            {!compact && (
              <>
                <th className="text-right py-3 px-4 hidden sm:table-cell">Marktwaarde</th>
                <th className="text-right py-3 px-4 hidden lg:table-cell">Volume (24u)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {prices.map((coin, idx) => {
            const up = coin.price_change_percentage_24h >= 0
            return (
              <tr
                key={coin.coin_id}
                className="border-b border-slate-50 hover:bg-primary-50/40 transition-colors"
              >
                <td className="py-3.5 px-4 text-slate-400 text-xs font-mono w-10">{coin.market_cap_rank}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    {coin.image ? (
                      <Image src={coin.image} alt={coin.name} width={32} height={32} className="rounded-full flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900">{coin.name}</span>
                      <span className="ml-2 text-xs text-slate-400 font-mono">{coin.symbol}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900">
                  {formatEur(coin.current_price_eur)}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className={cn(
                    'inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full',
                    up ? 'bg-emerald-50 text-up' : 'bg-red-50 text-down'
                  )}>
                    {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {formatPriceChange(coin.price_change_percentage_24h)}
                  </span>
                </td>
                {!compact && (
                  <>
                    <td className="py-3.5 px-4 text-right text-slate-500 hidden sm:table-cell">
                      {formatEur(coin.market_cap_eur)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500 hidden lg:table-cell">
                      {formatEur(coin.volume_24h_eur)}
                    </td>
                  </>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
