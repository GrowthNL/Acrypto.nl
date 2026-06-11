import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { Article } from '@/lib/types'
import { timeAgo, getCategoryStyle, readingTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

const FALLBACK = 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80'

export default function FeaturedArticle({ article }: { article: Article }) {
  const img = article.image_url || FALLBACK
  const catStyle = getCategoryStyle(article.category)

  return (
    <Link
      href={`/nieuws/${article.slug}`}
      className="group relative flex flex-col md:flex-row bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full md:w-3/5 aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden bg-slate-100 flex-shrink-0">
        <Image
          src={img} alt={article.image_alt || article.title}
          fill priority
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 md:block hidden" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-7 md:p-10 md:w-2/5">
        <div className="flex items-center gap-2 mb-4">
          <span className={cn('text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide', catStyle)}>
            {article.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />{timeAgo(article.published_at)}
          </span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-primary-700 transition-colors">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6 line-clamp-3">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">{readingTime(article.content)}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all">
            Lees artikel <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
