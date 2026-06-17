import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, TrendingUp, Zap, Globe, Clock } from 'lucide-react'
import { getDb, DB_READY } from '@/lib/db'
import { fetchTopCoins } from '@/lib/coingecko'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import ArticleCard from '@/components/ArticleCard'
import PriceTable from '@/components/PriceTable'
import NewsletterSignup from '@/components/NewsletterSignup'
import { timeAgo, getCategoryStyle, readingTime, truncate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Article, CryptoPrice } from '@/lib/types'

export const revalidate = 300

const FALLBACK = 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80'

async function getArticles(): Promise<Article[]> {
  if (!DB_READY) return MOCK_ARTICLES
  try {
    const db = getDb()
    const data = await db`
      SELECT * FROM articles
      WHERE status = 'published'
      ORDER BY published_at DESC
      LIMIT 13
    `
    return data.length ? (data as unknown as Article[]) : MOCK_ARTICLES
  } catch {
    return MOCK_ARTICLES
  }
}

async function getPrices(): Promise<CryptoPrice[]> {
  try { return await fetchTopCoins(10) } catch { return [] }
}

async function getStats(): Promise<{ count: number; lastUpdated: string | null }> {
  if (!DB_READY) return { count: MOCK_ARTICLES.length, lastUpdated: MOCK_ARTICLES[0]?.published_at ?? null }
  try {
    const db = getDb()
    const rows = await db`SELECT COUNT(*)::int AS count, MAX(published_at) AS last FROM articles WHERE status = 'published'`
    const r = rows[0] as { count: number; last: string | null }
    return { count: Number(r.count) || 0, lastUpdated: r.last }
  } catch {
    return { count: 0, lastUpdated: null }
  }
}

async function getMostRead(): Promise<Article[]> {
  if (!DB_READY) return []
  try {
    const db = getDb()
    const rows = await db`
      SELECT * FROM articles
      WHERE status = 'published' AND published_at > NOW() - INTERVAL '30 days'
      ORDER BY view_count DESC NULLS LAST, published_at DESC
      LIMIT 5
    `
    return rows as unknown as Article[]
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [articles, prices, stats, mostRead] = await Promise.all([getArticles(), getPrices(), getStats(), getMostRead()])

  const featured  = articles.find(a => a.featured) || articles[0]
  const secondary = articles.filter(a => a.id !== featured?.id).slice(0, 2)
  const grid      = articles.filter(a => a.id !== featured?.id).slice(2, 8)
  const sidebar   = articles.filter(a => a.id !== featured?.id).slice(8, 12)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* ── Page header ── */}
      <div className="pt-8 pb-4 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-1">Dagelijks bijgewerkt</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Nederlands crypto nieuws en live koersen
          </h1>
          <p className="text-slate-500 mt-2 leading-relaxed">
            Het laatste cryptonieuws, actuele koersen en begrijpelijke uitleg voor beginners en gevorderden.
            Nuchter en zonder hype. Geen financieel advies.
          </p>
          {stats.lastUpdated && (
            <p className="text-xs text-slate-400 mt-2 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Laatst bijgewerkt {timeAgo(stats.lastUpdated)}
            </p>
          )}
        </div>
        <div className="hidden sm:flex gap-6 text-center flex-shrink-0">
          {[[String(stats.count || '—'),'Artikelen'],['8','Bronnen'],['50+','Coins']].map(([v,l]) => (
            <div key={l}>
              <p className="text-2xl font-extrabold text-slate-900">{v}</p>
              <p className="text-xs text-slate-400 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust signals + primary CTAs ── */}
      <div className="pb-6 flex flex-col gap-4">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          {[
            'Koersdata via CoinGecko',
            'Nederlandstalige uitleg',
            'Redactioneel onafhankelijk',
            'Geen financieel advies',
          ].map(s => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/nieuws" className="px-4 py-2 text-sm font-bold bg-brand text-ink rounded-xl hover:bg-brand-dim transition-colors">
            Bekijk laatste nieuws
          </Link>
          <Link href="/koersen" className="px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-700 rounded-xl hover:border-primary-300 hover:text-primary-700 transition-colors">
            Bekijk live koersen
          </Link>
          <Link href="/kennisbank" className="px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-700 rounded-xl hover:border-primary-300 hover:text-primary-700 transition-colors">
            Start met de kennisbank
          </Link>
        </div>
      </div>

      {/* ── Magazine hero grid ── */}
      <section className="pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* Featured - large left card, spans 2 columns + 2 rows */}
          {featured && (
            <Link
              href={`/nieuws/${featured.slug}`}
              className="group lg:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden bg-slate-100 min-h-[340px] lg:min-h-[480px] flex flex-col shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <Image
                src={featured.image_url || FALLBACK}
                alt={featured.image_alt || featured.title}
                fill priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Content pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className={cn('text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-3 inline-block', getCategoryStyle(featured.category))}>
                  {featured.category}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-snug mb-2 group-hover:text-primary-200 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-white/70 line-clamp-2 mb-3 hidden sm:block">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Clock className="w-3 h-3" />
                  <span>{timeAgo(featured.published_at)}</span>
                  <span>·</span>
                  <span>{readingTime(featured.content)}</span>
                  <span className="ml-auto flex items-center gap-1 text-white font-medium">
                    Lees meer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Secondary cards - right column, equal height as featured */}
          {secondary.map(article => (
            <Link
              key={article.id}
              href={`/nieuws/${article.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 min-h-[160px] lg:min-h-0 flex flex-col shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <Image
                src={article.image_url || FALLBACK}
                alt={article.image_alt || article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className={cn('text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 inline-block', getCategoryStyle(article.category))}>
                  {article.category}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-primary-200 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-white/60 mt-1">{timeAgo(article.published_at)}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── News grid - seamlessly below the hero ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {grid.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {mostRead.length >= 3 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card">
                <h3 className="text-sm font-bold text-slate-700 mb-3">Meest gelezen</h3>
                <ol className="space-y-2.5">
                  {mostRead.map((a, i) => (
                    <li key={a.id} className="flex items-start gap-3">
                      <span className="text-base font-extrabold text-primary-200 leading-none w-5 flex-shrink-0">{i + 1}</span>
                      <Link href={`/nieuws/${a.slug}`} className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-700">Meer nieuws</h3>
                <Link href="/nieuws" className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                  Alles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {sidebar.map(a => <ArticleCard key={a.id} article={a} variant="compact" />)}
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Categorieën</h3>
              <div className="flex flex-wrap gap-2">
                {['Bitcoin','Ethereum','Altcoins','DeFi','NFT','Regulering','Marktanalyse'].map(cat => (
                  <Link
                    key={cat}
                    href={`/categorie/${cat.toLowerCase()}`}
                    className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-primary-50 hover:text-primary-700 border border-slate-200 hover:border-primary-200 rounded-full transition-colors font-medium"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
              <p className="text-xs text-primary-700 leading-relaxed">
                <span className="font-bold">Betrouwbaar nieuws.</span> Acrypto.nl brengt dagelijks het beste crypto nieuws in helder Nederlands.
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
            <div className="p-8">
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
              <p className="text-sm text-slate-500 mt-0.5">Alles wat je moet weten over crypto, in begrijpelijk Nederlands</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { title: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin', tag: 'Beginners', desc: 'De complete gids over de eerste en grootste cryptocurrency.' },
              { title: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto', tag: 'Beginners', desc: 'Stap voor stap je eerste crypto kopen via een Nederlandse exchange.' },
              { title: 'Crypto veilig bewaren', slug: 'crypto-veilig-bewaren', tag: 'Beveiliging', desc: 'Hot wallets, cold wallets en hardware wallets uitgelegd.' },
            ].map(item => (
              <Link key={item.slug} href={`/kennisbank/${item.slug}`}
                className="group bg-white border border-slate-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-md transition-all">
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
