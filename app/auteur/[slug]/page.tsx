import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { getAuthorBySlug } from '@/lib/authors'
import ArticleCard from '@/components/ArticleCard'
import { PersonStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData'
import { SITE_URL } from '@/lib/config'
import type { Article } from '@/lib/types'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const author = getAuthorBySlug(params.slug)
  if (!author) return { title: 'Auteur niet gevonden' }
  return {
    title: `${author.name} - ${author.role}`,
    description: author.bio,
    alternates: { canonical: `/auteur/${author.id}` },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}/auteur/${author.id}`,
      title: `${author.name} - ${author.role} | Acrypto.nl`,
      description: author.bio,
      images: author.avatar ? [{ url: `${SITE_URL}${author.avatar}`, alt: author.name }] : undefined,
    },
  }
}

async function getArticles(authorName: string): Promise<Article[]> {
  if (DB_READY) {
    try {
      const db = getDb()
      const rows = await db`
        SELECT * FROM articles
        WHERE status = 'published' AND (author_name = ${authorName} OR author_name = 'Acrypto Redactie')
        ORDER BY published_at DESC
        LIMIT 24
      `
      if (rows.length > 0) return rows as unknown as Article[]
    } catch {}
  }
  return MOCK_ARTICLES.slice(0, 12)
}

export default async function AuthorPage({ params }: Props) {
  const author = getAuthorBySlug(params.slug)
  if (!author) notFound()

  const articles = await getArticles(author.name)
  const initials = author.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <>
      <PersonStructuredData author={author} siteUrl={SITE_URL} />
      <BreadcrumbStructuredData siteUrl={SITE_URL} items={[
        { name: 'Home', path: '/' },
        { name: author.name, path: `/auteur/${author.id}` },
      ]} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/nieuws" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium mb-8">
          <ArrowLeft className="w-4 h-4" />
          Terug naar nieuws
        </Link>

        {/* Profiel */}
        <div className="flex flex-col sm:flex-row items-start gap-6 pb-8 border-b border-slate-100">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={112}
              height={112}
              className="w-28 h-28 rounded-2xl object-cover flex-shrink-0"
              priority
            />
          ) : (
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 text-white flex items-center justify-center font-bold text-3xl flex-shrink-0">
              {initials}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{author.name}</h1>
            <p className="text-primary-600 font-semibold mb-3">{author.role}</p>
            <p className="text-slate-600 leading-relaxed max-w-2xl">{author.bio}</p>
            {author.knowsAbout && author.knowsAbout.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {author.knowsAbout.map(topic => (
                  <span key={topic} className="text-xs px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-medium">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Artikelen */}
        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-6">Artikelen van {author.name.split(' ')[0]}</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(a => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Nog geen artikelen.</p>
        )}
      </div>
    </>
  )
}
