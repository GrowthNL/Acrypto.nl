import type { Metadata } from 'next'
import { fetchTopCoins } from '@/lib/coingecko'
import PriceTable from '@/components/PriceTable'
import type { CryptoPrice } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Crypto Koersen',
  description: 'Live cryptocurrency koersen in euro. Bekijk actuele prijzen van Bitcoin, Ethereum en 50+ cryptocurrencies.',
  alternates: { canonical: '/koersen' },
}

export default async function KoersenPage() {
  let prices: CryptoPrice[] = [], error = false
  try { prices = await fetchTopCoins(50) } catch { error = true }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-1">Live data</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Crypto Koersen</h1>
          <p className="text-slate-500 mt-1">Actuele prijzen van de top 50 cryptocurrencies in Euro (€)</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <RefreshCw className="w-3.5 h-3.5" />
          Bijgewerkt: {formatDateTime(new Date())}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Aantal cryptocurrencies', value: '50+' },
          { label: 'Basisvaluta',              value: 'Euro (€)' },
          { label: 'Update frequentie',        value: 'Elke 10 min' },
          { label: 'Databron',                 value: 'CoinGecko' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card text-center">
            <p className="text-xs text-slate-400 mb-1">{s.label}</p>
            <p className="text-sm font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card">
        {error ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 font-medium mb-1">Koersen tijdelijk niet beschikbaar</p>
            <p className="text-sm text-slate-400">Probeer de pagina te vernieuwen.</p>
          </div>
        ) : prices.length > 0 ? (
          <PriceTable prices={prices} />
        ) : (
          <div className="p-8">
            <div className="animate-pulse space-y-3">
              {Array.from({ length: 12 }).map((_,i) => (
                <div key={i} className="h-12 bg-slate-50 rounded-xl" />
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-400 text-center">
        Koersen zijn indicatief. Geen beleggingsadvies — handel in crypto brengt risico&apos;s met zich mee.
      </p>
    </div>
  )
}
