import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { Article } from '@/lib/types'
import { timeAgo, getCategoryStyle, readingTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  article: Article
}

const FALLBACK_IMAGE = '/images/crypto-default.jpg'

export default function FeaturedArticle({ article }: Props) {
  const imageUrl = article.image_url || FALLBACK_IMAGE
  const categoryStyle = getCategoryStyle(article.category)

  return (
    <Link
      href={`/nieuws/${article.slug}`}
      className="group relative block rounded-2xl overflow-hidden aspect-[21/9] md:aspect-[3/1]"
    >
      <Image
        src={imageUrl}
        alt={article.image_alt || article.title}
        fill
        priority
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className={cn('inline-block text-xs px-2.5 py-1 rounded-full font-medium mb-3', categoryStyle)}>
          {article.category}
        </span>
        <h1 className="text-xl md:text-3xl font-bold text-white leading-tight mb-2 group-hover:text-accent transition-colors max-w-3xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-sm md:text-base text-gray-300 line-clamp-2 max-w-2xl mb-3 hidden md:block">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{timeAgo(article.published_at)}</span>
          </div>
          <span>·</span>
          <span>{readingTime(article.content)}</span>
          <span className="flex items-center gap-1 text-accent font-medium ml-auto">
            Lees meer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
