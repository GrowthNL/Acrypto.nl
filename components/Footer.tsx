import Link from 'next/link'

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M28 97 L60 29 L92 97" stroke="#FFFFFF" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 69 L78 69" stroke="#C5FA4A" strokeWidth="13" strokeLinecap="round" />
    </svg>
  )
}

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">

          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <LogoMark />
              <span className="font-display font-bold text-white text-lg">acrypto<span className="text-brand">.nl</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Het meest betrouwbare Nederlandse platform voor crypto nieuws, koersen en educatie.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Nieuws</h3>
            <ul className="space-y-2 text-sm">
              {[['Laatste nieuws','/nieuws'],['Bitcoin','/categorie/bitcoin'],['Ethereum','/categorie/ethereum'],['Altcoins','/categorie/altcoins'],['DeFi','/categorie/defi']].map(([l,h]) => (
                <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Informatie</h3>
            <ul className="space-y-2 text-sm">
              {[['Alle koersen','/koersen'],['Exchanges vergelijken','/exchanges'],['Bitcoin koers','/koersen/bitcoin'],['Kennisbank','/kennisbank']].map(([l,h]) => (
                <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Acrypto.nl</h3>
            <ul className="space-y-2 text-sm">
              {[['Over ons','/over-ons'],['Redactioneel beleid','/redactioneel-beleid'],['Contact','/contact'],['Disclaimer','/disclaimer'],['Privacybeleid','/privacy']].map(([l,h]) => (
                <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 text-xs text-slate-500 leading-relaxed">
          <p className="mb-1">
            Acrypto.nl is een uitgave van <span className="text-slate-300 font-medium">Growth - Online Marketing Bureau Almere</span>.
            {' '}KvK 67106366 · Zeussingel 77, 1363 TM Almere. Contact via het{' '}
            <Link href="/contact" className="text-slate-300 hover:text-white underline">contactformulier</Link>.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© {year} Acrypto.nl. Geen beleggingsadvies. Handel in crypto brengt risico&apos;s met zich mee.</p>
          <p>Koersen zijn indicatief en gebaseerd op CoinGecko-data.</p>
        </div>
      </div>
    </footer>
  )
}
