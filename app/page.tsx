import Link from 'next/link'
import { ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { fetchTopCoins } from '@/lib/coingecko'
import FeaturedArticle from '@/components/FeaturedArticle'
import ArticleCard from '@/components/ArticleCard'
import PriceTable from '@/components/PriceTable'
import NewsletterSignup from '@/components/NewsletterSignup'
import type { Article, CryptoPrice } from '@/lib/types'

export const revalidate = 300 // 5 minutes

async function getArticles() {
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(13)
    return (data as Article[]) || []
  } catch {
    return []
  }
}

async function getPrices() {
  try {
    return await fetchTopCoins(10)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [articles, prices] = await Promise.all([getArticles(), getPrices()])

  const featured = articles.find(a => a.featured) || articles[0]
  const latestArticles = articles.filter(a => a.id !== featured?.id).slice(0, 8)
  const sidebarArticles = articles.slice(9, 13)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

      {/* Hero */}
      {featured && <FeaturedArticle article={featured} />}

      {/* Nieuws + Sidebar */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Laatste nieuws</h2>
          <Link href="/nieuws" className="flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors">
            Alles zien <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {latestArticles.slice(0, 6).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Meer nieuws</h3>
              {sidebarArticles.map(article => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
              {sidebarArticles.length === 0 && (
                <p className="text-sm text-gray-500">Nieuws wordt binnenkort geladen.</p>
              )}
            </div>

            {/* Categories */}
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Categorieën</h3>
              <div className="flex flex-wrap gap-2">
                {['Bitcoin', 'Ethereum', 'Altcoins', 'DeFi', 'NFT', 'Regulering', 'Marktanalyse'].map(cat => (
                  <Link
                    key={cat}
                    href={`/nieuws?cat=${cat.toLowerCase()}`}
                    className="text-xs px-3 py-1.5 bg-surface2 hover:bg-accent/20 hover:text-accent border border-border rounded-full transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Koersen */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold text-white">Live Koersen</h2>
          </div>
          <Link href="/koersen" className="flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors">
            Alle koersen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {prices.length > 0 ? (
            <PriceTable prices={prices} compact />
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              Koersen worden geladen...
            </div>
          )}
        </div>
      </section>

      {/* More news */}
      {latestArticles.slice(6).length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestArticles.slice(6).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
      )}

      {/* Kennisbank teaser */}
      <section className="bg-surface border border-border rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Kennisbank</h2>
            <p className="text-sm text-gray-500">Alles wat je moet weten over crypto</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { title: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin', cat: 'Beginners' },
            { title: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto', cat: 'Beginners' },
            { title: 'Wat is een wallet?', slug: 'wat-is-een-crypto-wallet', cat: 'Beginners' },
          ].map(item => (
            <Link
              key={item.slug}
              href={`/kennisbank/${item.slug}`}
              className="block p-4 bg-surface2 hover:bg-border rounded-xl transition-colors group"
            >
              <span className="text-xs text-accent font-medium">{item.cat}</span>
              <h3 className="text-sm font-medium text-gray-200 group-hover:text-accent transition-colors mt-1">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
        <Link
          href="/kennisbank"
          className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light font-medium transition-colors"
        >
          Bekijk de volledige kennisbank <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </div>
  )
}
