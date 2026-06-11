import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ChevronRight, GraduationCap, Zap, Shield } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { KnowledgeArticle } from '@/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Crypto Kennisbank',
  description: 'Leer alles over cryptocurrencies. Van Bitcoin basics voor beginners tot geavanceerde DeFi concepten. De meest complete Nederlandse crypto kennisbank.',
  alternates: { canonical: '/kennisbank' },
}

const difficultyConfig = {
  beginner: { label: 'Beginners', icon: BookOpen, color: 'text-green-400', bg: 'bg-green-500/10' },
  intermediate: { label: 'Gevorderd', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  advanced: { label: 'Expert', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10' },
}

const staticArticles = [
  { title: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin', difficulty: 'beginner', category: 'basics', excerpt: 'De complete gids over Bitcoin: wat het is, hoe het werkt en waarom het revolutionair is.' },
  { title: 'Hoe koop je cryptocurrency?', slug: 'hoe-koop-je-crypto', difficulty: 'beginner', category: 'basics', excerpt: 'Stap voor stap uitgelegd hoe je je eerste crypto koopt via een Nederlandse exchange.' },
  { title: 'Wat is een crypto wallet?', slug: 'wat-is-een-crypto-wallet', difficulty: 'beginner', category: 'basics', excerpt: 'Alles over hot wallets, cold wallets, hardware wallets en hoe je je crypto veilig bewaart.' },
  { title: 'Wat is Ethereum?', slug: 'wat-is-ethereum', difficulty: 'beginner', category: 'basics', excerpt: 'Ethereum en smart contracts uitgelegd: het platform achter DeFi, NFTs en Web3.' },
  { title: 'Wat is DeFi?', slug: 'wat-is-defi', difficulty: 'intermediate', category: 'defi', excerpt: 'Gedecentraliseerde financiën: lenen, uitlenen en handelen zonder bank.' },
  { title: 'Crypto veilig bewaren', slug: 'crypto-veilig-bewaren', difficulty: 'beginner', category: 'security', excerpt: 'De beste praktijken voor het veilig opslaan van cryptocurrency en het vermijden van oplichting.' },
  { title: 'Wat zijn altcoins?', slug: 'wat-zijn-altcoins', difficulty: 'beginner', category: 'basics', excerpt: 'Een overzicht van altcoins: de cryptocurrencies buiten Bitcoin om.' },
  { title: 'Crypto belasting Nederland', slug: 'crypto-belasting-nederland', difficulty: 'intermediate', category: 'legal', excerpt: 'Hoe zit het met de belasting op cryptocurrency winsten in Nederland?' },
  { title: 'Wat is blockchain?', slug: 'wat-is-blockchain', difficulty: 'beginner', category: 'basics', excerpt: 'De technologie achter crypto uitgelegd: hoe werkt een blockchain precies?' },
]

export default async function KennisbankPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-white">Crypto Kennisbank</h1>
        </div>
        <p className="text-gray-500 max-w-2xl">
          Alles wat je moet weten over cryptocurrencies. Van Bitcoin basics tot geavanceerde blockchain concepten, geschreven voor een Nederlands publiek.
        </p>
      </div>

      {/* Difficulty tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {Object.entries(difficultyConfig).map(([key, cfg]) => (
          <Link
            key={key}
            href={`/kennisbank?niveau=${key}`}
            className={`flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-accent/40 transition-colors group`}
          >
            <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center`}>
              <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</p>
              <p className="text-xs text-gray-500">Artikelen voor {cfg.label.toLowerCase()}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-accent transition-colors" />
          </Link>
        ))}
      </div>

      {/* Articles grid */}
      <h2 className="text-xl font-bold text-white mb-5">Populaire artikelen</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {staticArticles.map(article => {
          const diff = difficultyConfig[article.difficulty as keyof typeof difficultyConfig]
          return (
            <Link
              key={article.slug}
              href={`/kennisbank/${article.slug}`}
              className="group bg-surface hover:bg-surface2 border border-border hover:border-accent/30 rounded-xl p-5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diff.bg} ${diff.color}`}>
                  {diff.label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-accent transition-colors mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
