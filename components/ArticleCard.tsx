'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Clock } from 'lucide-react'
import { Article } from '@/lib/types'
import { timeAgo, getCategoryStyle, truncate, readingTime, getCategoryImage } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  article: Article
  variant?: 'default' | 'compact' | 'hero'
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const fallback = getCategoryImage(article.category)
  const [imgSrc, setImgSrc] = useState(article.image_url || fallback)
  const catStyle = getCategoryStyle(article.category)

  if (variant === 'compact') {
    return (
      <Link href={`/nieuws/${article.slug}`} className="flex gap-3 group py-3 border-b border-slate-100 last:border-0">
        <div className="relative w-20 h-[60px] flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
          <Image
            src={imgSrc} alt={article.image_alt || article.title}
            fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="80px"
            onError={() => setImgSrc(fallback)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={cn('inline-block text-[10px] px-1.5 py-0.5 rounded-full font-semibold mb-1', catStyle)}>
            {article.category}
          </span>
          <h3 className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/nieuws/${article.slug}`}
      className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-primary-100 transition-all duration-250"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={imgSrc} alt={article.image_alt || article.title}
          fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px"
          onError={() => setImgSrc(fallback)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className={cn('absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide', catStyle)}>
          {article.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug mb-2 text-[0.9375rem]">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-sm text-slate-500 line-clamp-2 flex-1 mb-3 leading-relaxed">
            {truncate(article.excerpt, 120)}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-50">
          <span className="font-medium text-slate-500">{article.author_name}</span>
          <span>·</span>
          <Clock className="w-3 h-3" />
          <span>{timeAgo(article.published_at)}</span>
          <span>·</span>
          <span>{readingTime(article.content)}</span>
        </div>
      </div>
    </Link>
  )
}
