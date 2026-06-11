import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Article } from '@/lib/types'
import { timeAgo, getCategoryStyle, truncate, readingTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  article: Article
  variant?: 'default' | 'compact' | 'featured'
}

const FALLBACK_IMAGE = '/images/crypto-default.jpg'

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const imageUrl = article.image_url || FALLBACK_IMAGE
  const categoryStyle = getCategoryStyle(article.category)

  if (variant === 'compact') {
    return (
      <Link href={`/nieuws/${article.slug}`} className="flex gap-3 group py-3 border-b border-border last:border-0">
        <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.image_alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={cn('inline-block text-xs px-2 py-0.5 rounded-full mb-1', categoryStyle)}>
            {article.category}
          </span>
          <h3 className="text-sm font-medium text-gray-200 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/nieuws/${article.slug}`}
      className="group flex flex-col bg-surface hover:bg-surface2 border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imageUrl}
          alt={article.image_alt || article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className={cn('absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-medium', categoryStyle)}>
          {article.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-gray-100 group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-2">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-3">
            {truncate(article.excerpt, 120)}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          <span>{timeAgo(article.published_at)}</span>
          <span className="text-border">·</span>
          <span>{readingTime(article.content)}</span>
        </div>
      </div>
    </Link>
  )
}
