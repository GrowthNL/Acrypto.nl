/**
 * Coin-configuratie voor de detailpagina's onder /koersen/[coin].
 * coingeckoId koppelt aan de CoinGecko API. De content is uitleg + FAQ in
 * begrijpelijk Nederlands, zonder koersvoorspellingen of beleggingsadvies.
 */

export interface CoinConfig {
  slug: string
  coingeckoId: string
  symbol: string
  name: string
  title: string
  description: string
  intro: string[]
  faqs: { q: string; a: string }[]
  newsCategory?: string // gekoppelde nieuwscategorie
  relatedKennisbank: { label: string; slug: string }[]
}

export const COIN_CONFIG: Record<string, CoinConfig> = {
  bitcoin: {
    slug: 'bitcoin',
    coingeckoId: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    title: 'Bitcoin koers (BTC) live in euro',
    description: 'Live Bitcoin koers (BTC) in euro, met 24-uurs verandering, marktwaarde en volume. Plus uitleg over wat Bitcoin is. Indicatieve data, geen advies.',
    intro: [
      'Bitcoin (BTC) is de eerste en grootste cryptocurrency ter wereld, gelanceerd in 2009. Op deze pagina zie je de actuele Bitcoin koers in euro, samen met de verandering over 24 uur, de marktwaarde en het handelsvolume.',
      'Bitcoin wordt door veel beleggers gezien als digitaal goud vanwege het beperkte aanbod van maximaal 21 miljoen munten. De koers kan sterk schommelen; de hier getoonde data is indicatief en bedoeld als informatie, niet als beleggingsadvies.',
    ],
    faqs: [
      { q: 'Wat is de Bitcoin koers nu?', a: 'De actuele Bitcoin koers in euro staat bovenaan deze pagina en wordt regelmatig bijgewerkt via CoinGecko. De getoonde koers is indicatief.' },
      { q: 'Hoeveel Bitcoin zijn er?', a: 'Er zullen nooit meer dan 21 miljoen Bitcoin bestaan. Dat vaste maximum is vastgelegd in de code van het netwerk.' },
      { q: 'Hoe koop ik Bitcoin?', a: 'Bitcoin koop je via een crypto-exchange. Na registratie en identiteitsverificatie kun je euro’s storten en Bitcoin kopen. Doe eerst eigen onderzoek.' },
    ],
    newsCategory: 'bitcoin',
    relatedKennisbank: [
      { label: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin' },
      { label: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto' },
    ],
  },
  ethereum: {
    slug: 'ethereum',
    coingeckoId: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    title: 'Ethereum koers (ETH) live in euro',
    description: 'Live Ethereum koers (ETH) in euro, met 24-uurs verandering, marktwaarde en volume. Plus uitleg over wat Ethereum is. Indicatieve data, geen advies.',
    intro: [
      'Ethereum (ETH) is na Bitcoin de grootste cryptocurrency en het bekendste platform voor smart contracts en gedecentraliseerde applicaties. Op deze pagina vind je de actuele Ethereum koers in euro met de belangrijkste marktgegevens.',
      'Ethereum vormt de basis voor veel DeFi-toepassingen en NFTs. De waarde van ETH kan flink fluctueren; de getoonde data is indicatief en vormt geen beleggingsadvies.',
    ],
    faqs: [
      { q: 'Wat is de Ethereum koers nu?', a: 'De actuele ETH koers in euro staat bovenaan deze pagina en wordt regelmatig bijgewerkt via CoinGecko.' },
      { q: 'Waarvoor wordt Ethereum gebruikt?', a: 'Ethereum wordt gebruikt voor smart contracts, DeFi-toepassingen, NFTs en talloze andere gedecentraliseerde applicaties.' },
      { q: 'Wat is staking bij Ethereum?', a: 'Bij staking zet je ETH vast om het netwerk te helpen beveiligen, waarvoor je een beloning kunt ontvangen. Hier zijn ook risico’s aan verbonden.' },
    ],
    newsCategory: 'ethereum',
    relatedKennisbank: [
      { label: 'Wat is Ethereum?', slug: 'wat-is-ethereum' },
      { label: 'Wat is DeFi?', slug: 'wat-is-defi' },
    ],
  },
  xrp: {
    slug: 'xrp',
    coingeckoId: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    title: 'XRP koers live in euro',
    description: 'Live XRP koers in euro, met 24-uurs verandering, marktwaarde en volume. Plus uitleg over wat XRP is. Indicatieve data, geen beleggingsadvies.',
    intro: [
      'XRP is de cryptocurrency die hoort bij het XRP Ledger, een netwerk dat is gericht op snelle en goedkope internationale betalingen. Op deze pagina zie je de actuele XRP koers in euro met de belangrijkste marktgegevens.',
      'XRP wordt vaak geassocieerd met het bedrijf Ripple, dat het netwerk mede heeft ontwikkeld. De koers kan sterk schommelen; de getoonde data is indicatief en vormt geen advies.',
    ],
    faqs: [
      { q: 'Wat is XRP?', a: 'XRP is de digitale munt van het XRP Ledger, een blockchain gericht op snelle en goedkope grensoverschrijdende betalingen.' },
      { q: 'Wat is het verschil tussen XRP en Ripple?', a: 'XRP is de cryptocurrency; Ripple is het bedrijf dat betrokken is bij de ontwikkeling van toepassingen rond het XRP Ledger.' },
      { q: 'Is de XRP koers indicatief?', a: 'Ja, de koers op deze pagina is indicatief en bedoeld als informatie, niet als beleggingsadvies.' },
    ],
    newsCategory: 'altcoins',
    relatedKennisbank: [
      { label: 'Wat zijn altcoins?', slug: 'wat-zijn-altcoins' },
      { label: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto' },
    ],
  },
  solana: {
    slug: 'solana',
    coingeckoId: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    title: 'Solana koers (SOL) live in euro',
    description: 'Live Solana koers (SOL) in euro, met 24-uurs verandering, marktwaarde en volume. Plus uitleg over wat Solana is. Indicatieve data, geen advies.',
    intro: [
      'Solana (SOL) is een blockchain die bekendstaat om hoge snelheid en lage transactiekosten. Het platform wordt gebruikt voor DeFi, NFTs en andere gedecentraliseerde applicaties. Hier vind je de actuele Solana koers in euro.',
      'Solana is een van de bekendere altcoins. Zoals bij alle crypto kan de koers heftig bewegen; de getoonde data is indicatief en vormt geen beleggingsadvies.',
    ],
    faqs: [
      { q: 'Wat is Solana?', a: 'Solana is een snelle blockchain met lage kosten, gebruikt voor onder meer DeFi-toepassingen, NFTs en games.' },
      { q: 'Waarom is Solana populair?', a: 'Solana staat bekend om zijn hoge transactiesnelheid en lage kosten in vergelijking met sommige andere netwerken.' },
      { q: 'Is de Solana koers indicatief?', a: 'Ja, de koers op deze pagina is indicatief en uitsluitend bedoeld als informatie.' },
    ],
    newsCategory: 'altcoins',
    relatedKennisbank: [
      { label: 'Wat zijn altcoins?', slug: 'wat-zijn-altcoins' },
      { label: 'Wat is DeFi?', slug: 'wat-is-defi' },
    ],
  },
  cardano: {
    slug: 'cardano',
    coingeckoId: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    title: 'Cardano koers (ADA) live in euro',
    description: 'Live Cardano koers (ADA) in euro, met 24-uurs verandering, marktwaarde en volume. Plus uitleg over wat Cardano is. Indicatieve data, geen advies.',
    intro: [
      'Cardano (ADA) is een blockchain-platform dat de nadruk legt op een wetenschappelijke, onderzoeksgedreven aanpak. Het ondersteunt smart contracts en gedecentraliseerde applicaties. Op deze pagina zie je de actuele Cardano koers in euro.',
      'Cardano is een bekende altcoin met een actieve community. De koers kan sterk schommelen; de getoonde data is indicatief en vormt geen beleggingsadvies.',
    ],
    faqs: [
      { q: 'Wat is Cardano?', a: 'Cardano is een blockchain-platform voor smart contracts dat bekendstaat om zijn academische, peer-reviewed ontwikkelaanpak.' },
      { q: 'Wat is ADA?', a: 'ADA is de cryptocurrency van het Cardano-netwerk, gebruikt voor transacties en staking.' },
      { q: 'Is de Cardano koers indicatief?', a: 'Ja, de koers op deze pagina is indicatief en bedoeld als informatie, niet als advies.' },
    ],
    newsCategory: 'altcoins',
    relatedKennisbank: [
      { label: 'Wat zijn altcoins?', slug: 'wat-zijn-altcoins' },
      { label: 'Wat is blockchain?', slug: 'wat-is-blockchain' },
    ],
  },
}

export const COIN_SLUGS = Object.keys(COIN_CONFIG)

export function getCoinConfig(slug: string): CoinConfig | null {
  return COIN_CONFIG[slug?.toLowerCase()] ?? null
}

// Reverse-lookup: CoinGecko id (bijv. 'ripple') -> onze slug (bijv. 'xrp').
const GECKO_ID_TO_SLUG: Record<string, string> = Object.values(COIN_CONFIG).reduce(
  (acc, c) => { acc[c.coingeckoId] = c.slug; return acc },
  {} as Record<string, string>,
)

export function getCoinSlugByGeckoId(geckoId: string): string | null {
  return GECKO_ID_TO_SLUG[geckoId?.toLowerCase()] ?? null
}
