import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatDate } from '@/lib/utils'
import type { KnowledgeArticle } from '@/lib/types'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

async function getArticle(slug: string): Promise<KnowledgeArticle | null> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase
    .from('knowledge_articles')
    .select('*')
    .eq('slug', slug)
    .single()
  return data as KnowledgeArticle | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Artikel niet gevonden' }
  return {
    title: article.title,
    description: article.excerpt || undefined,
    alternates: { canonical: `/kennisbank/${article.slug}` },
  }
}

export default async function KennisbankArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        <span>/</span>
        <Link href="/kennisbank" className="hover:text-accent transition-colors">Kennisbank</Link>
        <span>/</span>
        <span className="text-gray-400 truncate">{article.title}</span>
      </nav>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs bg-accent/20 text-accent px-2.5 py-1 rounded-full font-medium">
          {article.category}
        </span>
        <span className="text-xs bg-surface2 text-gray-400 px-2.5 py-1 rounded-full">
          {article.difficulty === 'beginner' ? 'Beginners' : article.difficulty === 'intermediate' ? 'Gevorderd' : 'Expert'}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">{article.title}</h1>

      {article.excerpt && (
        <p className="text-lg text-gray-400 border-l-2 border-accent pl-4 mb-8">
          {article.excerpt}
        </p>
      )}

      <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

      <div className="mt-10 pt-6 border-t border-border">
        <Link href="/kennisbank" className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Terug naar kennisbank
        </Link>
      </div>
    </div>
  )
}
