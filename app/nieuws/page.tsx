import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'
import NewsletterSignup from '@/components/NewsletterSignup'
import { CATEGORIES } from '@/lib/utils'
import type { Article } from '@/lib/types'

export const revalidate = 300

interface Props {
  searchParams: { cat?: string; q?: string; page?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { cat, q } = searchParams
  const catLabel = CATEGORIES.find(c => c.id === cat?.toLowerCase())?.label
  const title = q
    ? `Zoekresultaten voor "${q}" | Acrypto.nl`
    : catLabel
    ? `${catLabel} nieuws | Acrypto.nl`
    : 'Crypto Nieuws | Acrypto.nl'
  const description = q
    ? `Crypto nieuwsartikelen over "${q}"`
    : 'Het laatste cryptocurrency nieuws in het Nederlands. Dagelijks bijgewerkt over Bitcoin, Ethereum, DeFi en meer.'
  return {
    title,
    description,
    alternates: { canonical: cat ? `/nieuws?cat=${cat}` : '/nieuws' },
  }
}

function filterMock(articles: Article[], cat?: string, q?: string): Article[] {
  let result = articles
  if (cat) result = result.filter(a => a.category === cat.toLowerCase())
  if (q) {
    const lower = q.toLowerCase()
    result = result.filter(a =>
      a.title.toLowerCase().includes(lower) ||
      (a.excerpt?.toLowerCase().includes(lower) ?? false) ||
      a.tags.some(t => t.toLowerCase().includes(lower))
    )
  }
  return result
}

export default async function NieuwsPage({ searchParams }: Props) {
  const category = searchParams.cat?.toLowerCase()
  const query    = searchParams.q?.trim()
  const page     = parseInt(searchParams.page || '1')
  const perPage  = 18
  const offset   = (page - 1) * perPage

  let articles: Article[] = filterMock(MOCK_ARTICLES, category, query)
  let totalCount = articles.length

  if (DB_READY) {
    try {
      const db = getDb()
      const params: unknown[] = ['published']
      const conditions = ['status = $1']

      if (category) {
        params.push(category)
        conditions.push(`category = $${params.length}`)
      }
      if (query) {
        params.push(`%${query}%`, `%${query}%`)
        conditions.push(`(title ILIKE $${params.length - 1} OR excerpt ILIKE $${params.length})`)
      }

      const whereStr = `WHERE ${conditions.join(' AND ')}`

      const [countRows, dataRows] = await Promise.all([
        db.query(`SELECT COUNT(*) as count FROM articles ${whereStr}`, params),
        db.query(`SELECT * FROM articles ${whereStr} ORDER BY published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`, [...params, perPage, offset]),
      ])

      if (dataRows.length > 0) {
        articles   = dataRows as unknown as Article[]
        totalCount = parseInt(String((countRows[0] as { count: string }).count || '0'))
      }
    } catch {}
  }

  const totalPages = Math.ceil(totalCount / perPage)
  const catLabel   = CATEGORIES.find(c => c.id === category)?.label || category

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
          {query
            ? `Resultaten voor "${query}"`
            : category
            ? `${catLabel} nieuws`
            : 'Crypto Nieuws'}
        </h1>
        <p className="text-slate-500">
          {query
            ? `${totalCount} artikel${totalCount !== 1 ? 'en' : ''} gevonden`
            : category
            ? `Alle artikelen over ${catLabel}`
            : 'Het laatste nieuws over cryptocurrencies, blockchain en digitale activa'}
        </p>
      </div>

      {/* Filters + Search row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="flex flex-wrap gap-2 flex-1">
          <Link
            href="/nieuws"
            className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
              !category && !query
                ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                : 'border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            Alles
          </Link>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/nieuws?cat=${cat.id}`}
              className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                category === cat.id
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg mb-2">Geen artikelen gevonden</p>
          <p className="text-slate-400 text-sm mb-6">Probeer een andere zoekterm of categorie</p>
          <Link href="/nieuws" className="text-sm font-semibold text-primary-600 hover:underline">
            Toon alle artikelen
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {articles.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link
              key={p}
              href={`/nieuws?${category ? `cat=${category}&` : query ? `q=${encodeURIComponent(query)}&` : ''}page=${p}`}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold border transition-colors ${
                p === page
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-slate-200 text-slate-600 hover:border-primary-300'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}

      <NewsletterSignup />
    </div>
  )
}
