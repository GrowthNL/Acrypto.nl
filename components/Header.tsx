'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'

const navLinks = [
  { href: '/nieuws',     label: 'Nieuws'     },
  { href: '/koersen',    label: 'Koersen'    },
  { href: '/kennisbank', label: 'Kennisbank' },
  { href: '/exchanges',  label: 'Exchanges'  },
  { href: '/contact',    label: 'Contact'    },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Acrypto.nl home">
      {/* Apex-beeldmerk: inkt A met lime dwarsbalk */}
      <svg width="30" height="30" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <path d="M28 97 L60 29 L92 97" stroke="#0C100E" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 69 L78 69" stroke="#C5FA4A" strokeWidth="13" strokeLinecap="round" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        acrypto<span className="text-primary-600">.nl</span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block w-56">
            <Suspense fallback={null}><SearchBar /></Suspense>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-3 border-b border-slate-50">
            <Suspense fallback={null}><SearchBar /></Suspense>
          </div>
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3.5 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
