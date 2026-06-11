'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/nieuws',     label: 'Nieuws'     },
  { href: '/koersen',    label: 'Koersen'    },
  { href: '/kennisbank', label: 'Kennisbank' },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="9" fill="url(#lg)" />
        {/* A shape */}
        <path
          d="M9.5 26L18 10L26.5 26"
          stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M13 21.5H23"
          stroke="white" strokeWidth="2.8" strokeLinecap="round"
        />
        {/* Subtle upward tick top-right */}
        <path
          d="M23.5 13.5L26 11L28 12.5"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        <span className="gradient-text">a</span>crypto
        <span className="text-slate-400 font-medium">.nl</span>
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
          <Link
            href="/nieuws"
            className="ml-3 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-violet-600 hover:from-primary-700 hover:to-violet-700 text-white rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            Laatste nieuws
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
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
