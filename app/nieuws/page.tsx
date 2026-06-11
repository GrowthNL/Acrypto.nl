import type { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import ArticleCard from '@/components/ArticleCard'
import NewsletterSignup from '@/components/NewsletterSignup'
import { CATEGORIES } from '@/lib/utils'
import Link from 'next/link'
import type { Article } from '@/lib/types'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Crypto Nieuws',
  description: 'Het laatste cryptocurrency nieuws uit Nederland en de wereld. Dagelijks bijgewerkte artikelen over Bitcoin, Ethereum, DeFi en meer.',
  alternates: { canonical: '/nieuws' },
}

interface Props {
  searchParams: { cat?: string; page?: string }
}

export default async function NieuwsPage({ searchParams }: Props) {
  const category = searchParams.cat?.toLowerCase()
  const page = parseInt(searchParams.page || '1')
  const perPage = 18
  const offset = (page - 1) * perPage

  const supabase = createServerSupabaseClient()
  let query = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + perPage - 1)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, count } = await query
  const articles = (data as Article[]) || []
  const totalPages = Math.ceil((count || 0) / perPage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {category
            ? `${CATEGORIES.find(c => c.id === category)?.label || category} nieuws`
            : 'Crypto Nieuws'}
        </h1>
        <p className="text-gray-500">
          {category
            ? `Alle artikelen over ${category}`
            : 'Het laatste nieuws over cryptocurrencies, blockchain en digitale activa'}
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/nieuws"
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            !category
              ? 'bg-accent text-white border-accent'
              : 'border-border text-gray-400 hover:border-accent hover:text-accent'
          }`}
        >
          Alles
        </Link>
        {CATEGORIES.map(cat => (
          <Link
            key={cat.id}
            href={`/nieuws?cat=${cat.id}`}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
              category === cat.id
                ? 'bg-accent text-white border-accent'
                : 'border-border text-gray-400 hover:border-accent hover:text-accent'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg mb-2">Nog geen artikelen beschikbaar</p>
          <p className="text-sm">Er worden automatisch nieuwe artikelen gepubliceerd.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link
              key={p}
              href={`/nieuws?${category ? `cat=${category}&` : ''}page=${p}`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm border transition-colors ${
                p === page
                  ? 'bg-accent text-white border-accent'
                  : 'border-border text-gray-400 hover:border-accent'
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
