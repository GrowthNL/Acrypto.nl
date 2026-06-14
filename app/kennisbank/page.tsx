import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, BookOpen, Zap, Shield, GraduationCap } from 'lucide-react'

export const revalidate = 3600

interface Props {
  searchParams: { niveau?: string }
}

const NIVEAU_LABELS: Record<string, string> = {
  beginner: 'Beginners',
  intermediate: 'Gevorderd',
  advanced: 'Expert',
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const niveau = searchParams.niveau?.toLowerCase()
  const niveauLabel = niveau ? NIVEAU_LABELS[niveau] : undefined

  return {
    title: niveauLabel ? `Crypto kennisbank: ${niveauLabel}` : 'Crypto kennisbank',
    description: niveauLabel
      ? `Crypto-uitleg op niveau ${niveauLabel.toLowerCase()} in begrijpelijk Nederlands. Van Bitcoin basics tot geavanceerde concepten.`
      : 'Leer alles over cryptocurrencies in begrijpelijk Nederlands. Van Bitcoin basics tot DeFi: de complete Nederlandse crypto kennisbank.',
    // Canonical altijd naar de hoofdpagina; niveaufilters niet los indexeren.
    alternates: { canonical: '/kennisbank' },
    robots: niveauLabel ? { index: false, follow: true } : undefined,
  }
}

const levels = [
  { key: 'beginner',     label: 'Beginners',  desc: 'Nieuw in crypto? Begin hier.',       icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { key: 'intermediate', label: 'Gevorderd',  desc: 'Al enige ervaring? Ga dieper.',       icon: Zap,      color: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-100' },
  { key: 'advanced',     label: 'Expert',     desc: 'Diepgaande technische kennis.',        icon: Shield,   color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-100' },
]

const articles = [
  { title: 'Wat is Bitcoin?',              slug: 'wat-is-bitcoin',                difficulty: 'beginner',     category: 'basics',    excerpt: 'De complete gids over Bitcoin: wat het is, hoe het werkt en waarom het revolutionair is.' },
  { title: 'Hoe koop je cryptocurrency?',  slug: 'hoe-koop-je-crypto',            difficulty: 'beginner',     category: 'basics',    excerpt: 'Stap voor stap uitgelegd hoe je je eerste crypto koopt via een Nederlandse exchange.' },
  { title: 'Wat is een crypto wallet?',    slug: 'wat-is-een-crypto-wallet',      difficulty: 'beginner',     category: 'beveiliging', excerpt: 'Alles over hot wallets, cold wallets en hoe je je crypto veilig bewaart.' },
  { title: 'Wat is Ethereum?',             slug: 'wat-is-ethereum',               difficulty: 'beginner',     category: 'basics',    excerpt: 'Ethereum en smart contracts uitgelegd: het platform achter DeFi, NFTs en Web3.' },
  { title: 'Crypto veilig bewaren',        slug: 'crypto-veilig-bewaren',         difficulty: 'beginner',     category: 'beveiliging', excerpt: 'De beste praktijken voor het veilig bewaren van cryptocurrency.' },
  { title: 'Wat is DeFi?',                slug: 'wat-is-defi',                   difficulty: 'intermediate', category: 'defi',      excerpt: 'Gedecentraliseerde financiën: lenen, uitlenen en handelen zonder bank.' },
  { title: 'Crypto belasting Nederland',   slug: 'crypto-belasting-nederland',    difficulty: 'intermediate', category: 'juridisch', excerpt: 'Hoe geef je cryptocurrency op bij de Belastingdienst in Nederland?' },
  { title: 'Wat zijn altcoins?',           slug: 'wat-zijn-altcoins',             difficulty: 'beginner',     category: 'basics',    excerpt: 'Een overzicht van de duizenden cryptocurrencies buiten Bitcoin om.' },
  { title: 'Wat is blockchain?',           slug: 'wat-is-blockchain',             difficulty: 'beginner',     category: 'basics',    excerpt: 'De technologie achter crypto uitgelegd: hoe werkt een blockchain precies?' },
]

const diffLabel: Record<string, { label: string; color: string; bg: string }> = {
  beginner:     { label: 'Beginners', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  intermediate: { label: 'Gevorderd', color: 'text-amber-700',   bg: 'bg-amber-50'   },
  advanced:     { label: 'Expert',    color: 'text-violet-700',  bg: 'bg-violet-50'  },
}

export default function KennisbankPage({ searchParams }: Props) {
  const niveau = searchParams.niveau?.toLowerCase()
  const activeNiveau = niveau && NIVEAU_LABELS[niveau] ? niveau : undefined
  const visibleArticles = activeNiveau
    ? articles.filter(a => a.difficulty === activeNiveau)
    : articles

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-10 flex items-start gap-4">
        <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
          <GraduationCap className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Crypto Kennisbank</h1>
          <p className="text-slate-500 mt-1 max-w-2xl">
            Alles wat je moet weten over cryptocurrencies: van Bitcoin basics tot geavanceerde DeFi concepten, geschreven voor een Nederlands publiek.
          </p>
        </div>
      </div>

      {/* Level cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {levels.map(l => {
          const isActive = activeNiveau === l.key
          return (
            <Link
              key={l.key}
              href={isActive ? '/kennisbank' : `/kennisbank?niveau=${l.key}`}
              aria-pressed={isActive}
              className={`group flex items-center gap-4 p-5 bg-white border ${isActive ? 'border-primary-300 ring-2 ring-primary-100' : l.border} rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all`}
            >
              <div className={`w-11 h-11 rounded-xl ${l.bg} flex items-center justify-center flex-shrink-0`}>
                <l.icon className={`w-5 h-5 ${l.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold ${l.color}`}>{l.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{l.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-400 transition-colors flex-shrink-0" />
            </Link>
          )
        })}
      </div>

      {/* Articles grid */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          {activeNiveau ? `${NIVEAU_LABELS[activeNiveau]} artikelen` : 'Populaire artikelen'}
        </h2>
        <div className="flex items-center gap-3">
          {activeNiveau && (
            <Link href="/kennisbank" className="text-sm font-semibold text-primary-600 hover:underline">
              Toon alles
            </Link>
          )}
          <span className="text-sm text-slate-400">{visibleArticles.length} artikelen</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleArticles.map(a => {
          const diff = diffLabel[a.difficulty]
          return (
            <Link
              key={a.slug}
              href={`/kennisbank/${a.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diff.bg} ${diff.color}`}>
                  {diff.label}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors mb-2 leading-snug">
                {a.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{a.excerpt}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
