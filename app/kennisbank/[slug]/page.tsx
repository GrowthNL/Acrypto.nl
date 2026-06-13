import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, BookOpen, Tag } from 'lucide-react'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_KENNISBANK } from '@/lib/mock-kennisbank'
import { KnowledgeArticleStructuredData, BreadcrumbStructuredData, FAQStructuredData } from '@/components/StructuredData'
import { formatDate, readingTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { KnowledgeArticle } from '@/lib/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80'

interface Props {
  params: { slug: string }
}

const difficultyConfig = {
  beginner:     { label: 'Beginners',  color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
  intermediate: { label: 'Gevorderd',  color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-100'     },
  advanced:     { label: 'Expert',     color: 'text-violet-700',  bg: 'bg-violet-50 border-violet-100'   },
}

async function getArticle(slug: string): Promise<KnowledgeArticle | null> {
  if (!DB_READY) return MOCK_KENNISBANK.find(a => a.slug === slug) ?? null
  try {
    const db = getDb()
    const rows = await db`
      SELECT * FROM knowledge_articles
      WHERE slug = ${slug}
      LIMIT 1
    `
    if (rows.length > 0) return rows[0] as unknown as KnowledgeArticle
  } catch {}
  return MOCK_KENNISBANK.find(a => a.slug === slug) ?? null
}

async function getRelated(article: KnowledgeArticle): Promise<KnowledgeArticle[]> {
  return MOCK_KENNISBANK
    .filter(a => a.id !== article.id && (a.category === article.category || a.difficulty === article.difficulty))
    .slice(0, 4)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Artikel niet gevonden' }

  const diff = difficultyConfig[article.difficulty]

  return {
    title: `${article.title} | Crypto Kennisbank | Acrypto.nl`,
    description: article.excerpt || undefined,
    alternates: { canonical: `/kennisbank/${article.slug}` },
    openGraph: {
      type: 'article',
      locale: 'nl_NL',
      url: `${SITE_URL}/kennisbank/${article.slug}`,
      title: article.title,
      description: article.excerpt || undefined,
      images: article.image_url
        ? [{ url: article.image_url, width: 1200, height: 630, alt: article.title }]
        : [{ url: `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(article.category)}`, width: 1200, height: 630 }],
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [`${SITE_URL}`],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || undefined,
      images: [article.image_url || `${SITE_URL}/api/og`],
    },
    other: {
      'article:section': 'Crypto Kennisbank',
      'article:tag': article.tags?.join(', ') || '',
    },
  }
}

export default async function KennisbankArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await getRelated(article)
  const diff = difficultyConfig[article.difficulty]
  const imageUrl = article.image_url || FALLBACK_IMAGE

  return (
    <>
      <KnowledgeArticleStructuredData article={article} siteUrl={SITE_URL} />
      <BreadcrumbStructuredData siteUrl={SITE_URL} items={[
        { name: 'Home', path: '/' },
        { name: 'Kennisbank', path: '/kennisbank' },
        { name: article.title, path: `/kennisbank/${article.slug}` },
      ]} />
      {article.faqs?.length ? <FAQStructuredData faqs={article.faqs} /> : null}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

          {/* Main article */}
          <article>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/kennisbank" className="hover:text-primary-600 transition-colors">Kennisbank</Link>
              <span>/</span>
              <span className="text-slate-500 truncate max-w-[200px]">{article.title}</span>
            </nav>

            {/* Category & difficulty */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-semibold border', diff.bg, diff.color)}>
                {diff.label}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 font-medium border border-primary-100">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{readingTime(article.content)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg text-slate-600 leading-relaxed mb-6 border-l-4 border-primary-500 pl-4">
                {article.excerpt}
              </p>
            )}

            {/* Hero image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-card">
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            </div>

            {/* Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100">
                <Tag className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/nieuws?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-1 bg-slate-50 hover:bg-primary-50 hover:text-primary-700 border border-slate-200 hover:border-primary-200 rounded-full transition-colors font-medium"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> Dit artikel is uitsluitend bedoeld voor informatieve en educatieve doeleinden. Het vormt geen financieel of fiscaal advies. Doe altijd je eigen onderzoek en raadpleeg een professional voor persoonlijk advies.
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <Link
              href="/kennisbank"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar kennisbank
            </Link>

            {related.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card">
                <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary-500" />
                  Meer artikelen
                </h3>
                <div className="space-y-3">
                  {related.map(rel => {
                    const rdiff = difficultyConfig[rel.difficulty]
                    return (
                      <Link
                        key={rel.id}
                        href={`/kennisbank/${rel.slug}`}
                        className="group block"
                      >
                        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full', rdiff.bg, rdiff.color)}>
                              {rdiff.label}
                            </span>
                            <p className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors mt-1 leading-snug line-clamp-2">
                              {rel.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Difficulty indicator */}
            <div className={cn('border rounded-2xl p-4', diff.bg)}>
              <p className={cn('text-xs font-bold mb-1', diff.color)}>Niveau: {diff.label}</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {article.difficulty === 'beginner'
                  ? 'Dit artikel is geschikt voor iedereen die nieuw is in de wereld van cryptocurrency.'
                  : article.difficulty === 'intermediate'
                  ? 'Dit artikel gaat ervan uit dat je de basisconcepten van crypto al kent.'
                  : 'Dit artikel behandelt geavanceerde concepten voor ervaren crypto-gebruikers.'}
              </p>
            </div>

            {/* CTA to nieuws */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-primary-700 mb-1">Dagelijks crypto nieuws</p>
              <p className="text-xs text-primary-600 leading-relaxed mb-3">
                Blijf op de hoogte van het laatste nieuws op de cryptomarkt.
              </p>
              <Link
                href="/nieuws"
                className="block w-full text-center text-xs font-semibold bg-primary-600 text-white rounded-lg py-2 hover:bg-primary-700 transition-colors"
              >
                Lees het nieuws
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
