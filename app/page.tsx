import Link from 'next/link'
import { ArrowRight, BookOpen, TrendingUp, Zap, Globe } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { fetchTopCoins } from '@/lib/coingecko'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import FeaturedArticle from '@/components/FeaturedArticle'
import ArticleCard from '@/components/ArticleCard'
import PriceTable from '@/components/PriceTable'
import NewsletterSignup from '@/components/NewsletterSignup'
import type { Article, CryptoPrice } from '@/lib/types'

export const revalidate = 300

async function getArticles(): Promise<Article[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(13)
    return (data as Article[])?.length ? (data as Article[]) : MOCK_ARTICLES
  } catch {
    return MOCK_ARTICLES
  }
}

async function getPrices(): Promise<CryptoPrice[]> {
  try {
    return await fetchTopCoins(10)
  } catch {
    return []
  }
}

const stats = [
  { label: 'Artikelen per dag', value: '20+', icon: Zap },
  { label: 'Nieuwsbronnen', value: '8', icon: Globe },
  { label: 'Crypto gevolgd', value: '50+', icon: TrendingUp },
]

export default async function HomePage() {
  const [articles, prices] = await Promise.all([getArticles(), getPrices()])

  const featured = articles.find(a => a.featured) || articles[0]
  const grid     = articles.filter(a => a.id !== featured?.id).slice(0, 6)
  const sidebar  = articles.filter(a => a.id !== featured?.id).slice(6, 10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* ── Hero strip ── */}
      <section className="py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2">
              Dagelijks bijgewerkt
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Crypto nieuws dat telt
            </h1>
            <p className="text-slate-500 mt-2 text-base max-w-xl">
              Betrouwbaar, helder en elke dag vers. Alles wat je moet weten over Bitcoin, Ethereum en de cryptomarkt.
            </p>
          </div>
          {/* Quick stats */}
          <div className="flex gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center hidden sm:block">
                <p className="text-2xl font-extrabold text-slate-900">{value}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {featured && <FeaturedArticle article={featured} />}
      </section>

      {/* ── Latest + sidebar ── */}
      <section className="pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Laatste nieuws</h2>
          <Link href="/nieuws" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Alles zien <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 6-article grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {grid.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card">
              <h3 className="text-sm font-bold text-slate-700 mb-1">Meer nieuws</h3>
              {sidebar.map(a => <ArticleCard key={a.id} article={a} variant="compact" />)}
            </div>

            {/* Category chips */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Categorieën</h3>
              <div className="flex flex-wrap gap-2">
                {['Bitcoin','Ethereum','Altcoins','DeFi','NFT','Regulering','Marktanalyse'].map(cat => (
                  <Link
                    key={cat}
                    href={`/nieuws?cat=${cat.toLowerCase()}`}
                    className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-primary-50 hover:text-primary-700 border border-slate-200 hover:border-primary-200 rounded-full transition-colors font-medium"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mini disclaimer / trust signal */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
              <p className="text-xs text-primary-700 leading-relaxed">
                <span className="font-bold">Betrouwbaar nieuws.</span> Acrypto.nl gebruikt AI om internationale bronnen te vertalen en te herschrijven tot originele Nederlandstalige artikelen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live koersen ── */}
      <section className="pb-14">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-up animate-pulse" />
            <h2 className="text-xl font-bold text-slate-900">Live koersen</h2>
          </div>
          <Link href="/koersen" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Alle 50 coins <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card">
          {prices.length > 0 ? (
            <PriceTable prices={prices} compact />
          ) : (
            <div className="p-8 text-center">
              <div className="animate-pulse space-y-3">
                {Array.from({ length: 6 }).map((_,i) => <div key={i} className="h-11 bg-slate-50 rounded-lg" />)}
              </div>
            </div>
          )}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">Koersen in euro (€) · Bijgewerkt via CoinGecko · Elke 10 minuten</p>
          </div>
        </div>
      </section>

      {/* ── Kennisbank teaser ── */}
      <section className="pb-14">
        <div className="bg-gradient-to-br from-slate-50 to-primary-50/60 border border-primary-100/50 rounded-3xl p-8 md:p-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Crypto Kennisbank</h2>
              <p className="text-sm text-slate-500 mt-0.5">Alles wat je moet weten over crypto — in begrijpelijk Nederlands</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { title: 'Wat is Bitcoin?',          slug: 'wat-is-bitcoin',             tag: 'Beginners', desc: 'De complete gids over de eerste en grootste cryptocurrency.' },
              { title: 'Hoe koop je crypto?',       slug: 'hoe-koop-je-crypto',         tag: 'Beginners', desc: 'Stap voor stap je eerste crypto kopen via een Nederlandse exchange.' },
              { title: 'Crypto veilig bewaren',     slug: 'crypto-veilig-bewaren',      tag: 'Beveiliging', desc: 'Hot wallets, cold wallets en hardware wallets uitgelegd.' },
            ].map(item => (
              <Link
                key={item.slug}
                href={`/kennisbank/${item.slug}`}
                className="group bg-white border border-slate-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-md transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wide text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{item.tag}</span>
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-primary-700 transition-colors mt-2 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>

          <Link href="/kennisbank" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Bekijk alle artikelen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="pb-16">
        <NewsletterSignup />
      </section>
    </div>
  )
}
