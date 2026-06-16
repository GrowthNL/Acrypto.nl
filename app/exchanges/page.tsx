import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Check, X, ArrowRight, ExternalLink } from 'lucide-react'
import { EXCHANGES } from '@/lib/exchanges'
import { BreadcrumbStructuredData } from '@/components/StructuredData'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Beste crypto exchanges vergelijken (2026)',
  description:
    'Vergelijk de beste crypto exchanges voor Nederlandse gebruikers: kosten, aantal coins, iDEAL en veiligheid. Onafhankelijk overzicht, geen financieel advies.',
  alternates: { canonical: '/exchanges' },
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-amber-500">
      <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
      <span className="font-bold text-slate-900">{rating.toFixed(1)}</span>
    </span>
  )
}

export default function ExchangesPage() {
  return (
    <>
      <BreadcrumbStructuredData siteUrl={SITE_URL} items={[
        { name: 'Home', path: '/' },
        { name: 'Exchanges', path: '/exchanges' },
      ]} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2">Vergelijker</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Beste crypto exchanges vergelijken</h1>
        <p className="text-slate-600 leading-relaxed max-w-2xl">
          Wil je crypto kopen? Dan heb je een betrouwbare exchange nodig. Hieronder vergelijken we
          populaire exchanges voor Nederlandse gebruikers op kosten, aantal coins, betaalmethodes en
          veiligheid. Dit overzicht is informatief en vormt geen financieel advies; doe altijd je eigen onderzoek.
        </p>

        <div className="mt-8 space-y-4">
          {EXCHANGES.map((ex, i) => (
            <div key={ex.id} className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <h2 className="text-lg font-bold text-slate-900">{ex.name}</h2>
                  <Stars rating={ex.rating} />
                </div>
                <a
                  href={ex.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  Naar {ex.name} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-sm text-slate-600 mb-4">{ex.highlight}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-sm">
                <div><p className="text-xs text-slate-400">Kosten</p><p className="font-semibold text-slate-800">{ex.fee}</p></div>
                <div><p className="text-xs text-slate-400">Coins</p><p className="font-semibold text-slate-800">{ex.cryptos}</p></div>
                <div><p className="text-xs text-slate-400">Opgericht</p><p className="font-semibold text-slate-800">{ex.founded} · {ex.country}</p></div>
                <div><p className="text-xs text-slate-400">iDEAL/SEPA</p><p className="font-semibold text-slate-800">{ex.ideal ? 'Ja' : 'Nee'}</p></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ul className="space-y-1">
                  {ex.pros.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1">
                  {ex.cons.map(c => (
                    <li key={c} className="flex items-start gap-2 text-sm text-slate-500">
                      <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
          <strong>Let op:</strong> sommige links kunnen affiliate-links zijn. Dit overzicht is informatief
          en vormt geen beleggingsadvies. Crypto-investeringen zijn risicovol; doe altijd je eigen onderzoek.
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/kennisbank/hoe-koop-je-crypto" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline">
            Hoe koop je crypto? <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/koersen" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline">
            Bekijk live koersen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
