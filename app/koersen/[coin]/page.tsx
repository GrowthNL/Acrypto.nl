import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, TrendingUp, TrendingDown, ArrowLeft, RefreshCw } from 'lucide-react'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { fetchCoinById, fetchCoinMarketChart } from '@/lib/coingecko'
import ArticleCard from '@/components/ArticleCard'
import PriceChart from '@/components/PriceChart'
import { BreadcrumbStructuredData, FAQStructuredData } from '@/components/StructuredData'
import { getCoinConfig, COIN_SLUGS } from '@/lib/coins'
import { SITE_URL } from '@/lib/config'
import { formatEur, formatPriceChange, formatDateTime, cn } from '@/lib/utils'
import type { Article, CryptoPrice } from '@/lib/types'

export const revalidate = 300

interface Props {
  params: { coin: string }
}

export function generateStaticParams() {
  return COIN_SLUGS.map(coin => ({ coin }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const coin = getCoinConfig(params.coin)
  if (!coin) return { title: 'Coin niet gevonden' }
  return {
    title: coin.title,
    description: coin.description,
    alternates: { canonical: `/koersen/${coin.slug}` },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      url: `${SITE_URL}/koersen/${coin.slug}`,
      title: `${coin.title} | Acrypto.nl`,
      description: coin.description,
    },
  }
}

async function getCoinNews(category: string | undefined, name: string): Promise<Article[]> {
  if (!category) return []
  if (!DB_READY) {
    return MOCK_ARTICLES.filter(a => a.category === category).slice(0, 3)
  }
  try {
    const db = getDb()
    // Nieuws uit de gekoppelde categorie of met de coin-naam in de titel.
    const rows = await db`
      SELECT * FROM articles
      WHERE status = 'published' AND (category = ${category} OR title ILIKE ${'%' + name + '%'})
      ORDER BY published_at DESC
      LIMIT 3
    `
    if (rows.length > 0) return rows as unknown as Article[]
  } catch {}
  return MOCK_ARTICLES.filter(a => a.category === category).slice(0, 3)
}

export default async function CoinPage({ params }: Props) {
  const coin = getCoinConfig(params.coin)
  if (!coin) notFound()

  const [price, news, chart] = await Promise.all([
    fetchCoinById(coin.coingeckoId),
    getCoinNews(coin.newsCategory, coin.name),
    fetchCoinMarketChart(coin.coingeckoId, 30),
  ])

  const up = (price?.price_change_percentage_24h ?? 0) >= 0

  return (
    <>
      <BreadcrumbStructuredData siteUrl={SITE_URL} items={[
        { name: 'Home', path: '/' },
        { name: 'Koersen', path: '/koersen' },
        { name: coin.name, path: `/koersen/${coin.slug}` },
      ]} />
      <FAQStructuredData faqs={coin.faqs} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Kruimelpad">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/koersen" className="hover:text-primary-600 transition-colors">Koersen</Link>
          <span>/</span>
          <span className="text-slate-500">{coin.name}</span>
        </nav>

        {/* Coin header + price card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-card p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {price?.image && (
                <Image src={price.image} alt={coin.name} width={48} height={48} className="rounded-full" />
              )}
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">{coin.name} koers</h1>
                <p className="text-sm text-slate-400 font-mono">{coin.symbol}</p>
              </div>
            </div>
            {price ? (
              <div className="text-right">
                <p className="text-3xl font-extrabold text-slate-900 font-mono">{formatEur(price.current_price_eur)}</p>
                <span className={cn(
                  'inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full mt-1',
                  up ? 'bg-emerald-50 text-up' : 'bg-red-50 text-down'
                )}>
                  {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPriceChange(price.price_change_percentage_24h)} (24u)
                </span>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Koers tijdelijk niet beschikbaar</p>
            )}
          </div>

          {price && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Marktwaarde</p>
                <p className="text-sm font-bold text-slate-800">{formatEur(price.market_cap_eur)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Volume (24u)</p>
                <p className="text-sm font-bold text-slate-800">{formatEur(price.volume_24h_eur)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Marktrang</p>
                <p className="text-sm font-bold text-slate-800">#{price.market_cap_rank || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Basisvaluta</p>
                <p className="text-sm font-bold text-slate-800">Euro (€)</p>
              </div>
            </div>
          )}

          {chart.length > 1 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <PriceChart points={chart} up={up} days={30} />
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4">
            <RefreshCw className="w-3 h-3" />
            Bijgewerkt: {formatDateTime(new Date())} · Databron: CoinGecko · Indicatief
          </div>
        </div>

        {/* Waar kopen CTA */}
        <div className="bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100 rounded-2xl p-6 mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Waar koop je {coin.name}?</h2>
            <p className="text-sm text-slate-600 mt-0.5">Vergelijk betrouwbare exchanges op kosten, coins en iDEAL.</p>
          </div>
          <Link href="/exchanges" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors whitespace-nowrap">
            Exchanges vergelijken <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Intro / uitleg */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Wat is {coin.name}?</h2>
          <div className="space-y-3 text-slate-600 leading-relaxed">
            {coin.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        {/* Coin news */}
        {news.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">Laatste {coin.name} nieuws</h2>
              {coin.newsCategory && (
                <Link href={`/categorie/${coin.newsCategory}`} className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  Meer nieuws <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {news.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        )}

        {/* Kennisbank links */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card mb-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <h2 className="font-bold text-slate-900">Meer leren over {coin.name}</h2>
          </div>
          <ul className="space-y-2">
            {coin.relatedKennisbank.map(item => (
              <li key={item.slug}>
                <Link href={`/kennisbank/${item.slug}`} className="text-sm text-primary-600 hover:underline flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Veelgestelde vragen over {coin.name}</h2>
          <div className="space-y-3">
            {coin.faqs.map((faq, i) => (
              <details key={i} className="group border border-slate-100 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer font-semibold text-sm text-slate-800 hover:text-primary-600 transition-colors list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mb-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> de koersdata op deze pagina is indicatief en afkomstig van CoinGecko. Niets op deze pagina vormt financieel of beleggingsadvies. De koers van {coin.name} kan sterk schommelen en historische koersen bieden geen garantie voor de toekomst. Doe altijd je eigen onderzoek.
        </div>

        <Link href="/koersen" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Terug naar alle koersen
        </Link>
      </div>
    </>
  )
}
