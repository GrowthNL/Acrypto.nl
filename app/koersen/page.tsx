import type { Metadata } from 'next'
import { fetchTopCoins } from '@/lib/coingecko'
import PriceTable from '@/components/PriceTable'
import { formatDateTime } from '@/lib/utils'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Crypto Koersen',
  description: 'Live cryptocurrency koersen in euro (EUR). Bekijk actuele prijzen van Bitcoin, Ethereum en meer dan 50 cryptocurrencies met marktwaarde en 24-uurs verandering.',
  alternates: { canonical: '/koersen' },
}

export default async function KoersenPage() {
  let prices = []
  let error = false

  try {
    prices = await fetchTopCoins(50)
  } catch {
    error = true
  }

  const updateTime = formatDateTime(new Date())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Live Crypto Koersen</h1>
          <p className="text-gray-500 text-sm">
            Actuele prijzen van de top 50 cryptocurrencies in Euro (€)
          </p>
        </div>
        <p className="text-xs text-gray-600">
          Bijgewerkt: {updateTime}
        </p>
      </div>

      {/* Stats bar */}
      {prices.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Aantal coins', value: '50+' },
            { label: 'Valuta', value: 'Euro (€)' },
            { label: 'Update interval', value: 'Elke 10 min' },
            { label: 'Bron', value: 'CoinGecko' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-sm font-semibold text-gray-200">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {error ? (
          <div className="p-10 text-center">
            <p className="text-gray-400 mb-2">Koersen tijdelijk niet beschikbaar</p>
            <p className="text-sm text-gray-600">Probeer de pagina te vernieuwen.</p>
          </div>
        ) : prices.length > 0 ? (
          <PriceTable prices={prices} />
        ) : (
          <div className="p-10 text-center">
            <div className="animate-pulse space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-10 bg-surface2 rounded" />
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-600 text-center">
        Koersen zijn indicatief en worden verzorgd door CoinGecko. Geen beleggingsadvies.
      </p>
    </div>
  )
}
