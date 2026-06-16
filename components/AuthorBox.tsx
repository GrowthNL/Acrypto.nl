import Image from 'next/image'
import Link from 'next/link'
import type { Author } from '@/lib/authors'

/** Auteursblok onder artikelen - versterkt E-E-A-T richting Google Discover/News. */
export default function AuthorBox({ author }: { author: Author }) {
  const initials = author.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="mt-10 flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
      {author.avatar ? (
        <Image
          src={author.avatar}
          alt={author.name}
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-violet-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
          {initials}
        </div>
      )}
      <div>
        <p className="text-sm font-bold text-slate-900">{author.name}</p>
        <p className="text-xs text-primary-600 font-medium mb-1.5">{author.role}</p>
        <p className="text-sm text-slate-600 leading-relaxed">{author.bio}</p>
        <Link
          href="/redactioneel-beleid"
          className="inline-block mt-2 text-xs font-semibold text-primary-600 hover:underline"
        >
          Ons redactioneel beleid
        </Link>
      </div>
    </div>
  )
}
