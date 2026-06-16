import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Calendar, ArrowLeft, ExternalLink, Tag, List, ChevronRight } from 'lucide-react'
import { getDb, DB_READY } from '@/lib/db'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { ArticleStructuredData, BreadcrumbStructuredData, FAQStructuredData } from '@/components/StructuredData'
import ArticleCard from '@/components/ArticleCard'
import AuthorBox from '@/components/AuthorBox'
import { getAuthor } from '@/lib/authors'
import { formatDate, readingTime, getCategoryStyle, getCategoryImage, timeAgo, slugify } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Article } from '@/lib/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'

interface Props {
  params: { slug: string }
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi))
  return matches.map(m => ({
    text: m[1].replace(/<[^>]*>/g, ''),
    id: slugify(m[1].replace(/<[^>]*>/g, '')),
  }))
}

function addHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_, attrs, text) => {
    const id = slugify(text.replace(/<[^>]*>/g, ''))
    return `<h2${attrs} id="${id}">${text}</h2>`
  })
}

function injectInternalLinks(html: string, related: Article[]): string {
  if (related.length === 0) return html
  const picks = related.slice(0, 2)
  const box = `<div class="not-prose my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
<p class="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Lees ook</p>
${picks.map(a => `<a href="/nieuws/${a.slug}" class="block text-sm font-semibold text-blue-600 hover:underline mb-1">${a.title}</a>`).join('')}
</div>`
  let count = 0
  return html.replace(/<\/p>/gi, m => {
    count++
    return count === 2 ? `</p>${box}` : m
  })
}

async function getArticle(slug: string): Promise<Article | null> {
  if (!DB_READY) return MOCK_ARTICLES.find(a => a.slug === slug) ?? null
  try {
    const db = getDb()
    const rows = await db`
      SELECT * FROM articles
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `
    if (rows.length > 0) return rows[0] as unknown as Article
  } catch {}
  return MOCK_ARTICLES.find(a => a.slug === slug) ?? null
}

async function getRelated(article: Article): Promise<Article[]> {
  if (!DB_READY) {
    return MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
  }
  try {
    const db = getDb()
    const rows = await db`
      SELECT * FROM articles
      WHERE status = 'published'
        AND category = ${article.category}
        AND id != ${article.id}
      ORDER BY published_at DESC
      LIMIT 3
    `
    if (rows.length > 0) return rows as unknown as Article[]
  } catch {}
  return MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Artikel niet gevonden' }

  const ogImage = article.image_url || getCategoryImage(article.category)
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [`${SITE_URL}`],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || undefined,
      images: [ogImage],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await getRelated(article)
  const categoryStyle = getCategoryStyle(article.category)
  const imageUrl = article.image_url || getCategoryImage(article.category)
  const headings = extractHeadings(article.content)
  const contentWithIds = addHeadingIds(article.content)
  const faqs = Array.isArray(article.faqs) ? article.faqs : []
  const contentWithLinks = injectInternalLinks(contentWithIds, related)
  // "Bijgewerkt" tonen als de update minstens een uur na publicatie ligt.
  const isUpdated =
    !!article.updated_at &&
    new Date(article.updated_at).getTime() - new Date(article.published_at).getTime() > 3600_000

  return (
    <>
      <ArticleStructuredData article={article} siteUrl={SITE_URL} />
      <BreadcrumbStructuredData siteUrl={SITE_URL} items={[
        { name: 'Home', path: '/' },
        { name: 'Nieuws', path: '/nieuws' },
        { name: article.title, path: `/nieuws/${article.slug}` },
      ]} />
      {faqs.length > 0 && <FAQStructuredData faqs={faqs} />}

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
              <Link
                href={`/categorie/${article.category?.toLowerCase()}`}
                className={cn('text-xs px-2.5 py-1 rounded-full font-semibold hover:opacity-90 transition-opacity', categoryStyle)}
              >
                {article.category}
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              {isUpdated && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Bijgewerkt: {formatDate(article.updated_at)}</span>
                </div>
              )}
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
              <p className="text-lg text-slate-600 leading-relaxed mb-6 border-l-4 border-primary-500 pl-4">
                {article.excerpt}
              </p>
            )}

            {/* TLDR box - "In het kort" */}
            {article.tldr && (
              <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-xl quick-take">
                <p className="text-xs font-bold text-primary-700 uppercase tracking-wide mb-1.5">In het kort</p>
                <p className="text-sm text-primary-900 leading-relaxed">{article.tldr}</p>
                <p className="text-[11px] text-primary-600/80 mt-2 pt-2 border-t border-primary-100">
                  Informatief, geen financieel advies.
                </p>
              </div>
            )}

            {/* Table of Contents */}
            {headings.length >= 3 && (
              <nav className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <List className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-slate-700">Inhoudsopgave</span>
                </div>
                <ol className="space-y-1">
                  {headings.map((h, i) => (
                    <li key={h.id} className="flex items-start gap-2">
                      <span className="text-xs text-slate-400 font-mono mt-0.5 w-4 flex-shrink-0">{i + 1}.</span>
                      <a
                        href={`#${h.id}`}
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline leading-snug"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
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
              dangerouslySetInnerHTML={{ __html: contentWithLinks }}
            />

            {/* FAQ section */}
            {faqs.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Veelgestelde vragen</h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group border border-slate-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer font-semibold text-sm text-slate-800 hover:text-primary-600 transition-colors list-none">
                        {faq.q}
                        <ChevronRight className="w-4 h-4 flex-shrink-0 text-slate-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

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

            {/* Author box (E-E-A-T) */}
            <AuthorBox author={getAuthor(article.author_name)} />

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

        {/* Related articles – full-width below the grid */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Gerelateerde artikelen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(rel => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
