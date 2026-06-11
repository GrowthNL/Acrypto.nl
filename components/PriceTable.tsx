import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { CryptoPrice } from '@/lib/types'
import { formatEur, formatPriceChange } from '@/lib/utils'

interface Props {
  prices: CryptoPrice[]
  compact?: boolean
}

export default function PriceTable({ prices, compact = false }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 border-b border-border">
            <th className="text-left py-3 px-4 font-medium">#</th>
            <th className="text-left py-3 px-4 font-medium">Naam</th>
            <th className="text-right py-3 px-4 font-medium">Koers</th>
            <th className="text-right py-3 px-4 font-medium">24u</th>
            {!compact && (
              <>
                <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Marktwaarde</th>
                <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Volume (24u)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {prices.map((coin) => {
            const isUp = coin.price_change_percentage_24h >= 0
            return (
              <tr
                key={coin.coin_id}
                className="border-b border-border/50 hover:bg-surface2/50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-500 font-mono">{coin.market_cap_rank}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    {coin.image && (
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <span className="font-medium text-gray-200">{coin.name}</span>
                      <span className="ml-1.5 text-xs text-gray-500 font-mono">{coin.symbol}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-mono font-medium text-gray-200">
                  {formatEur(coin.current_price_eur)}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`inline-flex items-center gap-1 font-medium ${isUp ? 'text-up' : 'text-down'}`}>
                    {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {formatPriceChange(coin.price_change_percentage_24h)}
                  </span>
                </td>
                {!compact && (
                  <>
                    <td className="py-3 px-4 text-right text-gray-400 hidden sm:table-cell">
                      {formatEur(coin.market_cap_eur)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-400 hidden md:table-cell">
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
