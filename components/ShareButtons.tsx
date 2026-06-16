'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

/** Deel-knoppen onder/bij artikelen. Vergroot distributie (en Discover-momentum). */
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  const links = [
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ]

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-slate-500 mr-1">Delen:</span>
      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors"
        >
          {l.label}
        </a>
      ))}
      <button
        onClick={copy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors"
        aria-label="Link kopiëren"
      >
        {copied ? <><Check className="w-3.5 h-3.5 text-emerald-600" /> Gekopieerd</> : <><Link2 className="w-3.5 h-3.5" /> Link</>}
      </button>
    </div>
  )
}
