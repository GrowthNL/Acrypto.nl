import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Over Acrypto.nl | Nederlands Crypto Nieuws Platform',
  description: 'Acrypto.nl is het meest betrouwbare Nederlandse platform voor crypto nieuws, live koersen en educatie. Leer meer over onze missie en redactie.',
  alternates: { canonical: '/over-ons' },
}

export default function OverOnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2">Over ons</p>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
          Het meest betrouwbare<br />Nederlandse crypto platform
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Acrypto.nl brengt dagelijks het beste cryptocurrency nieuws, live koersen en educatieve content
          in helder, begrijpelijk Nederlands.
        </p>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-primary-900 mb-2">Onze missie</h2>
        <p className="text-primary-800 leading-relaxed">
          Crypto nieuws is vaak complex, Engelstalig en moeilijk te verifiëren. Wij geloven dat elke
          Nederlander toegang verdient tot accurate, actuele en begrijpelijke informatie over de
          cryptomarkt. Zonder hype, zonder sensatie.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {[
          { icon: TrendingUp, title: 'Actueel nieuws',  desc: 'Dagelijks bijgewerkt met de meest relevante ontwikkelingen op de cryptomarkt.' },
          { icon: Shield,     title: 'Betrouwbaar',     desc: 'Wij controleren feiten en bronnen. Geen clickbait, geen onbevestigde geruchten.' },
          { icon: BookOpen,   title: 'Educatief',       desc: 'Onze kennisbank legt complexe concepten uit in begrijpelijk Nederlands.' },
          { icon: Zap,        title: 'Snelle koersen',  desc: 'Live koersen voor meer dan 50 cryptocurrencies, rechtstreeks via CoinGecko.' },
        ].map(item => (
          <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
              <item.icon className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-amber-100 bg-amber-50 rounded-2xl p-6 mb-10">
        <h2 className="text-sm font-bold text-amber-800 mb-2">Geen beleggingsadvies</h2>
        <p className="text-sm text-amber-700 leading-relaxed">
          Alle content op Acrypto.nl is uitsluitend bedoeld voor informatieve en educatieve doeleinden.
          Niets op deze website vormt financieel of beleggingsadvies. Handel in cryptocurrencies brengt
          aanzienlijke risico&apos;s met zich mee. Doe altijd je eigen onderzoek (DYOR) en raadpleeg een
          financieel adviseur voor persoonlijk advies.
        </p>
      </div>

      <div className="text-center">
        <p className="text-slate-500 mb-4 text-sm">Vragen, tips of samenwerking? We horen het graag.</p>
        <a
          href="mailto:info@acrypto.nl"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
        >
          Contact opnemen
        </a>
      </div>
    </div>
  )
}
