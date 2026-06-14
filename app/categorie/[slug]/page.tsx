import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, TrendingUp } from 'lucide-react'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import ArticleCard from '@/components/ArticleCard'
import NewsletterSignup from '@/components/NewsletterSignup'
import { BreadcrumbStructuredData, FAQStructuredData } from '@/components/StructuredData'
import { getCategoryConfig, CATEGORY_SLUGS } from '@/lib/categories'
import { getCoinConfig } from '@/lib/coins'
import { SITE_URL } from '@/lib/config'
import type { Article } from '@/lib/types'

export const revalidate = 300

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryConfig(params.slug)
  if (!cat) return { title: 'Categorie niet gevonden' }
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `/categorie/${cat.slug}` },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      url: `${SITE_URL}/categorie/${cat.slug}`,
      title: `${cat.title} | Acrypto.nl`,
      description: cat.description,
    },
  }
}

async function getArticles(category: string): Promise<Article[]> {
  if (!DB_READY) {
    return MOCK_ARTICLES.filter(a => a.category === category).slice(0, 12)
  }
  try {
    const db = getDb()
    const rows = await db`
      SELECT * FROM articles
      WHERE status = 'published' AND category = ${category}
      ORDER BY published_at DESC
      LIMIT 12
    `
    if (rows.length > 0) return rows as unknown as Article[]
  } catch {}
  return MOCK_ARTICLES.filter(a => a.category === category).slice(0, 12)
}

export default async function CategoryPage({ params }: Props) {
  const cat = getCategoryConfig(params.slug)
  if (!cat) notFound()

  const articles = await getArticles(cat.slug)
  const coin = cat.relatedCoin ? getCoinConfig(cat.relatedCoin) : null

  return (
    <>
      <BreadcrumbStructuredData siteUrl={SITE_URL} items={[
        { name: 'Home', path: '/' },
        { name: 'Nieuws', path: '/nieuws' },
        { name: cat.label, path: `/categorie/${cat.slug}` },
      ]} />
      <FAQStructuredData faqs={cat.faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Kruimelpad">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/nieuws" className="hover:text-primary-600 transition-colors">Nieuws</Link>
          <span>/</span>
          <span className="text-slate-500">{cat.label}</span>
        </nav>

        {/* Header + SEO intro */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{cat.h1}</h1>
          <div className="space-y-3 text-slate-600 leading-relaxed">
            {cat.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        {/* Articles */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900">Laatste artikelen</h2>
          <Link href="/nieuws" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            Alle nieuws <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {articles.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        ) : (
          <div className="text-center py-16 mb-12 bg-slate-50 rounded-2xl">
            <p className="text-slate-400">Er zijn nog geen artikelen in deze categorie. Kom binnenkort terug.</p>
          </div>
        )}

        {/* Internal links: kennisbank + coin */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <h2 className="font-bold text-slate-900">Meer leren</h2>
            </div>
            <ul className="space-y-2">
              {cat.relatedKennisbank.map(item => (
                <li key={item.slug}>
                  <Link href={`/kennisbank/${item.slug}`} className="text-sm text-primary-600 hover:underline flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {coin && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h2 className="font-bold text-slate-900">Live koers</h2>
              </div>
              <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                Bekijk de actuele {coin.name} koers in euro met marktwaarde en 24-uurs verandering.
              </p>
              <Link href={`/koersen/${coin.slug}`} className="text-sm font-semibold text-primary-600 hover:underline flex items-center gap-1">
                {coin.name} koers ({coin.symbol}) <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Veelgestelde vragen</h2>
          <div className="space-y-3">
            {cat.faqs.map((faq, i) => (
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
        <div className="max-w-3xl mb-12 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
          <strong>Let op:</strong> alle informatie op deze pagina is uitsluitend bedoeld voor informatieve doeleinden en vormt geen financieel advies. Handel in crypto brengt risico&apos;s met zich mee. Doe altijd je eigen onderzoek.
        </div>

        <NewsletterSignup />
      </div>
    </>
  )
}
