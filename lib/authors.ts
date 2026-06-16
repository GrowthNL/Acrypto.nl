/**
 * Auteursprofielen voor de author box en E-E-A-T (Google Discover/News).
 *
 * De primaire auteur hieronder verschijnt op de artikelen en in de structured
 * data als `Person`. Wil je meer (echte) auteurs, voeg ze toe aan KNOWN en koppel
 * ze via `author_name` op het artikel.
 */
export interface Author {
  id: string
  name: string
  role: string
  bio: string
  /** Pad naar avatar in /public, bijv. /authors/lars-mulder.jpg */
  avatar?: string
  /** Onderwerpen waar de auteur over schrijft (knowsAbout in structured data) */
  knowsAbout?: string[]
  /** Externe profielen (LinkedIn/X) voor sameAs */
  sameAs?: string[]
}

export const LARS: Author = {
  id: 'lars-mulder',
  name: 'Lars Mulder',
  role: 'Crypto- & blockchainredacteur',
  bio:
    'Lars Mulder volgt de cryptomarkt sinds de bull run van 2017 en schrijft sinds 2020 over ' +
    'Bitcoin, Ethereum en de bredere blockchain-wereld. Hij vertaalt complexe ontwikkelingen naar ' +
    'heldere, nuchtere Nederlandse artikelen, met oog voor context en risico en zonder hype. ' +
    'Zijn artikelen zijn informatief en vormen geen financieel advies.',
  avatar: '/authors/lars-mulder.webp',
  knowsAbout: ['Bitcoin', 'Ethereum', 'Altcoins', 'DeFi', 'Blockchain', 'Cryptoregulering', 'Marktanalyse'],
}

/** De redactie-byline blijft beschikbaar als alternatief. */
export const REDACTIE: Author = {
  id: 'redactie',
  name: 'Acrypto Redactie',
  role: 'Redactie',
  bio:
    'De redactie van Acrypto.nl volgt de cryptomarkt dagelijks op de voet, controleert bronnen en ' +
    'plaatst ontwikkelingen in context voor de Nederlandse lezer. Informatief, geen financieel advies.',
}

const KNOWN: Author[] = [LARS, REDACTIE]

/** De standaard/hoofdauteur die op artikelen wordt getoond. */
export const PRIMARY_AUTHOR = LARS

/** Zoekt het auteursprofiel bij een naam; valt terug op de hoofdauteur. */
export function getAuthor(name?: string | null): Author {
  if (name) {
    const match = KNOWN.find(a => a.name.toLowerCase() === name.toLowerCase())
    if (match) return match
  }
  return PRIMARY_AUTHOR
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return KNOWN.find(a => a.id === slug)
}
