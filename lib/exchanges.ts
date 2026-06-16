/**
 * Exchanges voor de vergelijker (/exchanges).
 *
 * `affiliateUrl` is nu de gewone homepage van de exchange. Vervang deze door je
 * eigen affiliate-link zodra je een partnerprogramma hebt (bijv. Bitvavo, Bybit).
 * Houd de informatie feitelijk en up-to-date; dit is geen beleggingsadvies.
 */
export interface Exchange {
  id: string
  name: string
  affiliateUrl: string
  rating: number // 0-5
  founded: string
  country: string
  fee: string
  cryptos: string
  ideal: boolean // iDEAL / SEPA voor NL
  highlight: string
  pros: string[]
  cons: string[]
}

export const EXCHANGES: Exchange[] = [
  {
    id: 'bitvavo',
    name: 'Bitvavo',
    affiliateUrl: 'https://bitvavo.com/',
    rating: 4.7,
    founded: '2018',
    country: 'Nederland',
    fee: 'vanaf 0,25%',
    cryptos: '300+',
    ideal: true,
    highlight: 'Populairste Nederlandse exchange, iDEAL en lage kosten.',
    pros: ['Nederlandse exchange met iDEAL', 'Lage handelskosten', 'Gebruiksvriendelijk, ook voor beginners'],
    cons: ['Minder geschikt voor geavanceerd traden'],
  },
  {
    id: 'kraken',
    name: 'Kraken',
    affiliateUrl: 'https://www.kraken.com/',
    rating: 4.5,
    founded: '2011',
    country: 'VS',
    fee: 'vanaf 0,16%',
    cryptos: '200+',
    ideal: false,
    highlight: 'Gevestigde exchange met sterke reputatie op het gebied van veiligheid.',
    pros: ['Lange staat van dienst', 'Sterke beveiliging', 'Veel handelsparen'],
    cons: ['Geen iDEAL', 'Interface minder simpel voor starters'],
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    affiliateUrl: 'https://www.coinbase.com/',
    rating: 4.3,
    founded: '2012',
    country: 'VS',
    fee: 'vanaf 0,5%',
    cryptos: '250+',
    ideal: false,
    highlight: 'Beursgenoteerd en zeer toegankelijk voor beginners.',
    pros: ['Beursgenoteerd (transparantie)', 'Zeer gebruiksvriendelijk', 'Uitgebreide leeromgeving'],
    cons: ['Hogere kosten', 'Geen iDEAL'],
  },
  {
    id: 'bybit',
    name: 'Bybit',
    affiliateUrl: 'https://www.bybit.com/',
    rating: 4.2,
    founded: '2018',
    country: 'Dubai',
    fee: 'vanaf 0,1%',
    cryptos: '600+',
    ideal: false,
    highlight: 'Veel coins en geavanceerde handelsmogelijkheden.',
    pros: ['Zeer veel coins', 'Lage handelskosten', 'Geavanceerde tools'],
    cons: ['Minder geschikt voor absolute beginners', 'Geen iDEAL'],
  },
]
