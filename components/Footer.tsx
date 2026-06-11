import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-accent">A</span>crypto.nl
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Het meest betrouwbare Nederlandse platform voor crypto nieuws, koersen en educatie.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Nieuws</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/nieuws" className="hover:text-accent transition-colors">Laatste nieuws</Link></li>
              <li><Link href="/nieuws?cat=bitcoin" className="hover:text-accent transition-colors">Bitcoin</Link></li>
              <li><Link href="/nieuws?cat=ethereum" className="hover:text-accent transition-colors">Ethereum</Link></li>
              <li><Link href="/nieuws?cat=altcoins" className="hover:text-accent transition-colors">Altcoins</Link></li>
              <li><Link href="/nieuws?cat=defi" className="hover:text-accent transition-colors">DeFi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Informatie</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/koersen" className="hover:text-accent transition-colors">Alle koersen</Link></li>
              <li><Link href="/kennisbank" className="hover:text-accent transition-colors">Kennisbank</Link></li>
              <li><Link href="/kennisbank?cat=beginners" className="hover:text-accent transition-colors">Voor beginners</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Acrypto.nl</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/over-ons" className="hover:text-accent transition-colors">Over ons</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacybeleid</Link></li>
              <li><Link href="/disclaimer" className="hover:text-accent transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {year} Acrypto.nl — Geen beleggingsadvies. Handel in crypto brengt risico&apos;s met zich mee.
          </p>
          <p className="text-xs text-gray-600">
            Koersen en nieuws zijn indicatief en kunnen afwijken.
          </p>
        </div>
      </div>
    </footer>
  )
}
