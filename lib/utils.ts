import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'
import { nl } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: nl })
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'd MMMM yyyy', { locale: nl })
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'd MMMM yyyy, HH:mm', { locale: nl })
}

export function formatEur(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `€${(amount / 1_000_000_000).toFixed(2)}B`
  }
  if (amount >= 1_000_000) {
    return `€${(amount / 1_000_000).toFixed(2)}M`
  }
  if (amount >= 1000) {
    return `€${amount.toLocaleString('nl-NL', { maximumFractionDigits: 2 })}`
  }
  if (amount < 0.01) {
    return `€${amount.toFixed(6)}`
  }
  return `€${amount.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatPriceChange(change: number): string {
  const prefix = change >= 0 ? '+' : ''
  return `${prefix}${change.toFixed(2)}%`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ý]/g, 'y')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100)
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

export function readingTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min leestijd`
}

export const CATEGORIES = [
  { id: 'nieuws',        label: 'Nieuws',        color: 'bg-blue-600 text-white'    },
  { id: 'bitcoin',       label: 'Bitcoin',       color: 'bg-amber-500 text-white'   },
  { id: 'ethereum',      label: 'Ethereum',      color: 'bg-violet-600 text-white'  },
  { id: 'altcoins',      label: 'Altcoins',      color: 'bg-emerald-600 text-white' },
  { id: 'defi',          label: 'DeFi',          color: 'bg-cyan-600 text-white'    },
  { id: 'nft',           label: 'NFT',           color: 'bg-pink-600 text-white'    },
  { id: 'regulering',    label: 'Regulering',    color: 'bg-red-600 text-white'     },
  { id: 'marktanalyse',  label: 'Marktanalyse',  color: 'bg-indigo-600 text-white'  },
]

export function getCategoryStyle(category: string): string {
  const cat = CATEGORIES.find(c => c.id === category.toLowerCase())
  return cat?.color ?? 'bg-slate-600 text-white'
}

export function getArticleCount(articles: { category: string }[], categoryId: string): number {
  return articles.filter(a => a.category === categoryId).length
}
