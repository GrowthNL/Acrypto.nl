import Link from 'next/link'

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="flg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#flg)" />
      <path d="M9.5 26L18 10L26.5 26" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 21.5H23" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">

          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <LogoMark />
              <span className="font-bold text-white">acrypto<span className="text-slate-500">.nl</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Het meest betrouwbare Nederlandse platform voor crypto nieuws, koersen en educatie.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Nieuws</h3>
            <ul className="space-y-2 text-sm">
              {[['Laatste nieuws','/nieuws'],['Bitcoin','/nieuws?cat=bitcoin'],['Ethereum','/nieuws?cat=ethereum'],['Altcoins','/nieuws?cat=altcoins'],['DeFi','/nieuws?cat=defi']].map(([l,h]) => (
                <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Informatie</h3>
            <ul className="space-y-2 text-sm">
              {[['Alle koersen','/koersen'],['Kennisbank','/kennisbank'],['Voor beginners','/kennisbank?niveau=beginner']].map(([l,h]) => (
                <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Acrypto.nl</h3>
            <ul className="space-y-2 text-sm">
              {[['Over ons','/over-ons'],['Contact','/contact'],['Privacybeleid','/privacy'],['Disclaimer','/disclaimer']].map(([l,h]) => (
                <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© {year} Acrypto.nl — Geen beleggingsadvies. Handel in crypto brengt risico&apos;s met zich mee.</p>
          <p>Koersen zijn indicatief en gebaseerd op CoinGecko-data.</p>
        </div>
      </div>
    </footer>
  )
}
