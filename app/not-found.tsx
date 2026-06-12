import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden | Acrypto.nl',
}

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-primary-100 mb-6 select-none">404</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-3">Pagina niet gevonden</h1>
      <p className="text-slate-500 mb-10 leading-relaxed">
        De pagina die je zoekt bestaat niet (meer) of is verplaatst.<br />
        Probeer het nieuws of de kennisbank.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>
        <Link
          href="/nieuws"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-primary-300 hover:text-primary-700 transition-colors"
        >
          <Search className="w-4 h-4" />
          Bekijk nieuws
        </Link>
      </div>
    </div>
  )
}
