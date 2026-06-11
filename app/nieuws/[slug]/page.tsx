import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Calendar, ArrowLeft, ExternalLink } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ArticleStructuredData } from '@/components/StructuredData'
import ArticleCard from '@/components/ArticleCard'
import { formatDate, readingTime, getCategoryStyle, timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Article } from '@/lib/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'
const FALLBACK_IMAGE = '/images/crypto-default.jpg'

interface Props {
  params: { slug: string }
}

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data as Article | null
}

async function getRelated(article: Article): Promise<Article[]> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('category', article.category)
    .neq('id', article.id)
    .order('published_at', { ascending: false })
    .limit(3)
  return (data as Article[]) || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Artikel niet gevonden' }

  return {
    title: article.title,
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main article */}
          <article className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <Link href="/nieuws" className="hover:text-accent transition-colors">Nieuws</Link>
              <span>/</span>
              <span className="text-gray-400 truncate">{article.title}</span>
            </nav>

            {/* Category & meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', categoryStyle)}>
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{readingTime(article.content)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg text-gray-400 leading-relaxed mb-6 border-l-2 border-accent pl-4">
                {article.excerpt}
              </p>
            )}

            {/* Hero image */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
              <Image
                src={imageUrl}
                alt={article.image_alt || article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 672px"
              />
            </div>

            {/* Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/nieuws?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-1 bg-surface2 hover:bg-accent/20 hover:text-accent border border-border rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Source */}
            {article.source_url && (
              <div className="mt-4 pt-4 border-t border-border">
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-accent transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Bron: {article.source_name || article.source_url}
                </a>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-surface2 border border-border rounded-xl text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Disclaimer:</strong> Dit artikel is uitsluitend bedoeld voor informatieve doeleinden en vormt geen beleggingsadvies. Handel in cryptocurrencies brengt aanzienlijke risico&apos;s met zich mee.
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Link href="/nieuws" className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Terug naar nieuws
            </Link>

            {related.length > 0 && (
              <div className="bg-surface border border-border rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Gerelateerd nieuws</h3>
                {related.map(rel => (
                  <ArticleCard key={rel.id} article={rel} variant="compact" />
                ))}
              </div>
            )}

            {/* Ad slot placeholder */}
            <div className="bg-surface border border-dashed border-border rounded-xl p-6 text-center text-gray-600 text-xs">
              Advertentieruimte
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
