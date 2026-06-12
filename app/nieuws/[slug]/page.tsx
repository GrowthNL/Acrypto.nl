import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Calendar, ArrowLeft, ExternalLink, Tag } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { ArticleStructuredData, BreadcrumbStructuredData, FAQStructuredData } from '@/components/StructuredData'
import ArticleCard from '@/components/ArticleCard'
import { formatDate, readingTime, getCategoryStyle, timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Article } from '@/lib/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80'

interface Props {
  params: { slug: string }
}

const SUPABASE_READY = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function getArticle(slug: string): Promise<Article | null> {
  if (!SUPABASE_READY) return MOCK_ARTICLES.find(a => a.slug === slug) ?? null
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    if (data) return data as Article
  } catch {}
  return MOCK_ARTICLES.find(a => a.slug === slug) ?? null
}

async function getRelated(article: Article): Promise<Article[]> {
  if (!SUPABASE_READY) {
    return MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
  }
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('category', article.category)
      .neq('id', article.id)
      .order('published_at', { ascending: false })
      .limit(3)
    if (data && (data as Article[]).length > 0) return data as Article[]
  } catch {}
  return MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Artikel niet gevonden' }

  return {
    title: `${article.title} | Acrypto.nl`,
    description: article.excerpt || undefined,
    alternates: { canonical: `/nieuws/${article.slug}` },
    openGraph: {
      type: 'article',
      locale: 'nl_NL',
      url: `${SITE_URL}/nieuws/${article.slug}`,
      title: article.title,
      description: article.excerpt || undefined,
      images: article.image_url
        ? [{ url: article.image_url, width: 1200, height: 630, alt: article.title }]
        : [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630 }],
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [`${SITE_URL}`],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || undefined,
      images: [article.image_url || `${SITE_URL}/og-default.jpg`],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await getRelated(article)
  const categoryStyle = getCategoryStyle(article.category)
  const imageUrl = article.image_url || FALLBACK_IMAGE

  return (
    <>
      <ArticleStructuredData article={article} siteUrl={SITE_URL} />
      <BreadcrumbStructuredData siteUrl={SITE_URL} items={[
        { name: 'Home', path: '/' },
        { name: 'Nieuws', path: '/nieuws' },
        { name: article.title, path: `/nieuws/${article.slug}` },
      ]} />
      {article.faqs?.length ? <FAQStructuredData faqs={article.faqs} /> : null}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

          {/* Main article */}
          <article>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/nieuws" className="hover:text-primary-600 transition-colors">Nieuws</Link>
              <span>/</span>
              <span className="text-slate-500 truncate max-w-[200px]">{article.title}</span>
            </nav>

            {/* Category & meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-semibold', categoryStyle)}>
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
              {article.author_name && (
                <span className="text-xs text-slate-400">door {article.author_name}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg text-slate-600 leading-relaxed mb-6 border-l-3 border-primary-500 pl-4 border-l-4">
                {article.excerpt}
              </p>
            )}

            {/* Hero image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-card">
              <Image
                src={imageUrl}
                alt={article.image_alt || article.title}
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

            {/* Source */}
            {article.source_url && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-primary-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Bron: {article.source_name || article.source_url}
                </a>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> Dit artikel is uitsluitend bedoeld voor informatieve doeleinden en vormt geen beleggingsadvies. Handel in cryptocurrencies brengt aanzienlijke risico&apos;s met zich mee. Doe altijd je eigen onderzoek.
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <Link href="/nieuws" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" />
              Terug naar nieuws
            </Link>

            {related.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-card">
                <h3 className="text-sm font-bold text-slate-700 mb-4">Gerelateerd nieuws</h3>
                <div className="space-y-1">
                  {related.map(rel => (
                    <ArticleCard key={rel.id} article={rel} variant="compact" />
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-primary-700 mb-1">Dagelijks crypto nieuws</p>
              <p className="text-xs text-primary-600 leading-relaxed mb-3">
                Ontvang het beste nieuws elke ochtend gratis in je mailbox.
              </p>
              <Link
                href="/#nieuwsbrief"
                className="block w-full text-center text-xs font-semibold bg-primary-600 text-white rounded-lg py-2 hover:bg-primary-700 transition-colors"
              >
                Aanmelden
              </Link>
            </div>

            {/* Ad slot placeholder */}
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 text-xs">
              Advertentieruimte
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
