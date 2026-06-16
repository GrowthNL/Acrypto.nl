/**
 * Auteursprofielen voor de author box en E-E-A-T (Google Discover/News).
 *
 * Voeg hier ECHTE personen toe die daadwerkelijk meelezen/redigeren. Verzin geen
 * fictieve auteurs: Google detecteert nep-bylines en dat schaadt je E-E-A-T juist.
 * Zolang er geen persoon aan een artikel is gekoppeld, valt het terug op de
 * redactie-byline hieronder.
 *
 * Koppelen gebeurt via `author_name` op het artikel (de scraper zet die nu op
 * "Acrypto Redactie"). Wil je een echt persoon koppelen, zet dan diens naam in
 * `author_name` en voeg het profiel hieronder toe met exact diezelfde `name`.
 */
export interface Author {
  id: string
  name: string
  role: string
  bio: string
  /** Optioneel: pad naar een avatar in /public, bijv. /authors/jan.jpg */
  avatar?: string
  /** Optioneel: externe profielen (LinkedIn, X) voor sameAs in structured data */
  sameAs?: string[]
}

export const REDACTIE: Author = {
  id: 'redactie',
  name: 'Acrypto Redactie',
  role: 'Redactie',
  bio:
    'De redactie van Acrypto.nl volgt de cryptomarkt dagelijks op de voet. Wij selecteren het ' +
    'belangrijkste nieuws, controleren bronnen en plaatsen ontwikkelingen in context voor de ' +
    'Nederlandse lezer. Onze artikelen zijn informatief en vormen geen financieel advies.',
}

// Voorbeeld van een echte auteur (uit-commentaar tot je 'm wilt gebruiken):
// export const JAN: Author = {
//   id: 'jan-jansen',
//   name: 'Jan Jansen',
//   role: 'Crypto-redacteur',
//   bio: 'Jan schrijft sinds 2018 over crypto en blockchain ...',
//   avatar: '/authors/jan-jansen.jpg',
//   sameAs: ['https://www.linkedin.com/in/...'],
// }

const ALL: Author[] = [REDACTIE /*, JAN */]

/** Zoekt het auteursprofiel bij een naam; valt terug op de redactie-byline. */
export function getAuthor(name?: string | null): Author {
  if (!name) return REDACTIE
  const match = ALL.find(a => a.name.toLowerCase() === name.toLowerCase())
  if (match) return match
  // Onbekende naam: toon de naam wel, maar met de generieke redactie-bio.
  return { ...REDACTIE, id: 'redactie', name }
}
