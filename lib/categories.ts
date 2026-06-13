/**
 * Categorie-configuratie voor SEO-hubpagina's onder /categorie/[slug].
 * Elke categorie heeft unieke metadata, intro-content en FAQ's zodat de
 * pagina's echte landingspagina's zijn in plaats van dunne filterresultaten.
 */

export interface CategoryConfig {
  slug: string
  label: string
  title: string // meta title (zonder branding, template voegt | Acrypto.nl toe)
  description: string // meta description, max ~155 tekens
  h1: string
  intro: string[] // paragrafen voor de SEO-intro
  faqs: { q: string; a: string }[]
  relatedKennisbank: { label: string; slug: string }[]
  relatedCoin?: string // slug van gerelateerde coin op /koersen/[coin]
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  bitcoin: {
    slug: 'bitcoin',
    label: 'Bitcoin',
    title: 'Bitcoin nieuws',
    description: 'Het laatste Bitcoin nieuws in het Nederlands: koersontwikkelingen, regelgeving, adoptie en marktanalyse. Dagelijks bijgewerkt, zonder hype.',
    h1: 'Bitcoin nieuws',
    intro: [
      'Op deze pagina vind je het laatste Bitcoin nieuws in het Nederlands. Bitcoin (BTC) is de eerste en grootste cryptocurrency en geldt voor veel beleggers als het ankerpunt van de hele markt. Ontwikkelingen rond de Bitcoin koers, regelgeving en institutionele adoptie hebben vaak direct invloed op de rest van de cryptomarkt.',
      'Wij volgen de belangrijkste bronnen en vatten het nieuws samen in heldere, nuchtere artikelen. Geen sensatie en geen koersvoorspellingen, maar context die je helpt begrijpen wat er speelt. Houd er rekening mee dat de koers van Bitcoin sterk kan schommelen en dat historische koersen geen garantie bieden voor de toekomst.',
    ],
    faqs: [
      { q: 'Waar gaat Bitcoin nieuws over?', a: 'Bitcoin nieuws behandelt onder meer de koersontwikkeling, regelgeving, institutionele adoptie, technische updates van het netwerk en macro-economische factoren die invloed hebben op de markt.' },
      { q: 'Hoe vaak wordt het Bitcoin nieuws bijgewerkt?', a: 'Wij werken het nieuws meerdere keren per dag bij op basis van betrouwbare internationale en Nederlandse bronnen.' },
      { q: 'Is dit Bitcoin nieuws beleggingsadvies?', a: 'Nee. Alle artikelen zijn uitsluitend informatief bedoeld en vormen geen financieel of beleggingsadvies. Doe altijd je eigen onderzoek.' },
    ],
    relatedKennisbank: [
      { label: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin' },
      { label: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto' },
      { label: 'Crypto veilig bewaren', slug: 'crypto-veilig-bewaren' },
    ],
    relatedCoin: 'bitcoin',
  },
  ethereum: {
    slug: 'ethereum',
    label: 'Ethereum',
    title: 'Ethereum nieuws',
    description: 'Actueel Ethereum nieuws in het Nederlands: ETH koers, netwerkupdates, smart contracts, DeFi en staking. Helder uitgelegd en dagelijks bijgewerkt.',
    h1: 'Ethereum nieuws',
    intro: [
      'Hier lees je het laatste Ethereum nieuws in het Nederlands. Ethereum (ETH) is na Bitcoin de grootste cryptocurrency en vormt de basis voor smart contracts, DeFi-toepassingen en NFTs. Updates aan het netwerk en veranderingen in het gebruik ervan zijn daarom relevant voor een groot deel van de cryptosector.',
      'We bespreken ontwikkelingen rond de ETH koers, technische upgrades, staking en de bredere toepassingen van het Ethereum-platform. We schrijven nuchter en in begrijpelijk Nederlands, zonder overdreven claims. De waarde van Ethereum kan sterk fluctueren.',
    ],
    faqs: [
      { q: 'Wat is het verschil tussen Bitcoin en Ethereum?', a: 'Bitcoin is vooral bedoeld als digitaal geld en waardeopslag. Ethereum is een programmeerbaar platform waarop ontwikkelaars applicaties en smart contracts kunnen bouwen.' },
      { q: 'Wat zijn smart contracts?', a: 'Smart contracts zijn zichzelf uitvoerende afspraken die als code op de Ethereum-blockchain draaien, zonder dat er een tussenpersoon nodig is.' },
      { q: 'Is Ethereum nieuws beleggingsadvies?', a: 'Nee, alle content is informatief en vormt geen financieel advies. Crypto kennt aanzienlijke risico’s.' },
    ],
    relatedKennisbank: [
      { label: 'Wat is Ethereum?', slug: 'wat-is-ethereum' },
      { label: 'Wat is DeFi?', slug: 'wat-is-defi' },
      { label: 'Wat is een crypto wallet?', slug: 'wat-is-een-crypto-wallet' },
    ],
    relatedCoin: 'ethereum',
  },
  altcoins: {
    slug: 'altcoins',
    label: 'Altcoins',
    title: 'Altcoins nieuws',
    description: 'Altcoin nieuws in het Nederlands: ontwikkelingen rond Solana, XRP, Cardano en andere cryptocurrencies buiten Bitcoin om. Nuchter en actueel.',
    h1: 'Altcoins nieuws',
    intro: [
      'Altcoins zijn alle cryptocurrencies buiten Bitcoin om. Op deze pagina volgen we het nieuws rond bekende altcoins zoals Solana, XRP en Cardano, maar ook opkomende projecten. Altcoins lopen vaak sterk uiteen in doel, technologie en risico.',
      'We leggen uit wat een project doet en waarom een ontwikkeling relevant is, zonder te vervallen in hype. Let op: altcoins kunnen extra volatiel zijn en sommige projecten dragen een hoger risico dan de grootste cryptocurrencies.',
    ],
    faqs: [
      { q: 'Wat zijn altcoins?', a: 'Altcoins is een verzamelnaam voor alle cryptocurrencies behalve Bitcoin. De term komt van “alternative coins”.' },
      { q: 'Zijn altcoins risicovoller dan Bitcoin?', a: 'Veel altcoins zijn kleiner en minder liquide dan Bitcoin, waardoor de koers heftiger kan schommelen. Doe altijd grondig eigen onderzoek.' },
      { q: 'Is dit altcoin nieuws beleggingsadvies?', a: 'Nee, alle artikelen zijn informatief en vormen geen financieel advies.' },
    ],
    relatedKennisbank: [
      { label: 'Wat zijn altcoins?', slug: 'wat-zijn-altcoins' },
      { label: 'Wat is blockchain?', slug: 'wat-is-blockchain' },
      { label: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto' },
    ],
  },
  defi: {
    slug: 'defi',
    label: 'DeFi',
    title: 'DeFi nieuws',
    description: 'DeFi nieuws in het Nederlands: gedecentraliseerde financien, lending, staking en protocollen. Begrijpelijk uitgelegd en dagelijks bijgewerkt.',
    h1: 'DeFi nieuws',
    intro: [
      'DeFi staat voor decentralized finance: financiele diensten zoals lenen, uitlenen en handelen die zonder traditionele bank op een blockchain draaien. Op deze pagina volgen we de belangrijkste ontwikkelingen in de DeFi-sector.',
      'We bespreken protocollen, rendementen, risico’s en regelgeving in heldere taal. DeFi biedt kansen, maar kent ook specifieke risico’s zoals smart-contractfouten en hoge volatiliteit. Doe altijd je eigen onderzoek.',
    ],
    faqs: [
      { q: 'Wat is DeFi?', a: 'DeFi (decentralized finance) verwijst naar financiele toepassingen die op een blockchain draaien zonder centrale tussenpersoon zoals een bank.' },
      { q: 'Wat zijn de risico’s van DeFi?', a: 'Risico’s zijn onder meer fouten in smart contracts, hacks, hoge volatiliteit en onduidelijke regelgeving.' },
      { q: 'Is DeFi nieuws beleggingsadvies?', a: 'Nee, alle content is uitsluitend informatief en vormt geen financieel advies.' },
    ],
    relatedKennisbank: [
      { label: 'Wat is DeFi?', slug: 'wat-is-defi' },
      { label: 'Wat is Ethereum?', slug: 'wat-is-ethereum' },
      { label: 'Crypto veilig bewaren', slug: 'crypto-veilig-bewaren' },
    ],
  },
  nft: {
    slug: 'nft',
    label: 'NFT',
    title: 'NFT nieuws',
    description: 'NFT nieuws in het Nederlands: digitale collectibles, kunst, gaming en marktontwikkelingen. Nuchter en begrijpelijk uitgelegd.',
    h1: 'NFT nieuws',
    intro: [
      'NFTs (non-fungible tokens) zijn unieke digitale eigendomsbewijzen op een blockchain. Ze worden gebruikt voor digitale kunst, verzamelobjecten, gaming en meer. Op deze pagina volgen we de belangrijkste NFT-ontwikkelingen.',
      'We schrijven over markttrends, projecten en toepassingen in helder Nederlands. De NFT-markt is sterk wisselend en speculatief; benader dit soort nieuws met een kritische blik.',
    ],
    faqs: [
      { q: 'Wat is een NFT?', a: 'Een NFT is een uniek, niet-uitwisselbaar digitaal eigendomsbewijs dat op een blockchain wordt vastgelegd.' },
      { q: 'Waarvoor worden NFTs gebruikt?', a: 'NFTs worden onder meer gebruikt voor digitale kunst, verzamelobjecten, gaming-items en toegangsbewijzen.' },
      { q: 'Is NFT nieuws beleggingsadvies?', a: 'Nee, alle artikelen zijn informatief bedoeld en vormen geen financieel advies.' },
    ],
    relatedKennisbank: [
      { label: 'Wat is blockchain?', slug: 'wat-is-blockchain' },
      { label: 'Wat is Ethereum?', slug: 'wat-is-ethereum' },
      { label: 'Wat is een crypto wallet?', slug: 'wat-is-een-crypto-wallet' },
    ],
  },
  regulering: {
    slug: 'regulering',
    label: 'Regulering',
    title: 'Crypto regelgeving nieuws',
    description: 'Nieuws over crypto regelgeving in Nederland en Europa: MiCA, belasting, toezicht en wetgeving. Helder uitgelegd en dagelijks bijgewerkt.',
    h1: 'Crypto regelgeving',
    intro: [
      'Regelgeving heeft grote invloed op de cryptomarkt. Op deze pagina volgen we het nieuws rond wetgeving, toezicht en belasting van crypto in Nederland en Europa, waaronder het Europese MiCA-kader.',
      'We leggen uit wat nieuwe regels betekenen voor gebruikers en de markt, in begrijpelijk Nederlands. Voor persoonlijk fiscaal of juridisch advies raden we aan een professional te raadplegen.',
    ],
    faqs: [
      { q: 'Wat is MiCA?', a: 'MiCA (Markets in Crypto-Assets) is het Europese wettelijke kader dat regels stelt aan crypto-aanbieders en -diensten binnen de EU.' },
      { q: 'Hoe wordt crypto belast in Nederland?', a: 'In Nederland valt crypto doorgaans in box 3 (vermogen). De exacte behandeling kan veranderen; raadpleeg de Belastingdienst of een adviseur.' },
      { q: 'Is dit regelgevingsnieuws juridisch advies?', a: 'Nee, alle content is informatief en vormt geen juridisch of fiscaal advies.' },
    ],
    relatedKennisbank: [
      { label: 'Crypto belasting Nederland', slug: 'crypto-belasting-nederland' },
      { label: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto' },
      { label: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin' },
    ],
  },
  marktanalyse: {
    slug: 'marktanalyse',
    label: 'Marktanalyse',
    title: 'Crypto marktanalyse',
    description: 'Crypto marktanalyse in het Nederlands: context bij koersbewegingen, trends en sentiment op de cryptomarkt. Nuchter, zonder koersvoorspellingen.',
    h1: 'Crypto marktanalyse',
    intro: [
      'Op deze pagina vind je marktanalyse en context bij de bewegingen op de cryptomarkt. We kijken naar trends, sentiment en macro-economische factoren die de koersen van Bitcoin, Ethereum en andere crypto beinvloeden.',
      'Onze analyses zijn bedoeld om je te helpen de markt beter te begrijpen, niet om koersen te voorspellen. Historische bewegingen bieden geen garantie voor de toekomst en niets op deze pagina is beleggingsadvies.',
    ],
    faqs: [
      { q: 'Geven jullie koersvoorspellingen?', a: 'Nee. We bieden context en analyse, maar doen geen koersvoorspellingen. De cryptomarkt is onvoorspelbaar en risicovol.' },
      { q: 'Waarop is de marktanalyse gebaseerd?', a: 'Op publiek beschikbare marktdata, nieuws en macro-economische ontwikkelingen, samengevat in begrijpelijke taal.' },
      { q: 'Is marktanalyse beleggingsadvies?', a: 'Nee, alle analyses zijn uitsluitend informatief en vormen geen financieel advies.' },
    ],
    relatedKennisbank: [
      { label: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin' },
      { label: 'Wat zijn altcoins?', slug: 'wat-zijn-altcoins' },
      { label: 'Wat is blockchain?', slug: 'wat-is-blockchain' },
    ],
  },
  nieuws: {
    slug: 'nieuws',
    label: 'Algemeen nieuws',
    title: 'Algemeen crypto nieuws',
    description: 'Algemeen crypto nieuws in het Nederlands: het belangrijkste cryptonieuws van de dag, helder en nuchter samengevat. Dagelijks bijgewerkt.',
    h1: 'Algemeen crypto nieuws',
    intro: [
      'Op deze pagina verzamelen we het algemene crypto nieuws dat niet onder een specifieke categorie valt. Van marktbrede ontwikkelingen tot bedrijfsnieuws en technologie.',
      'We brengen het nieuws in helder Nederlands, zonder hype. Crypto blijft een risicovolle markt; niets op deze pagina vormt financieel advies.',
    ],
    faqs: [
      { q: 'Wat valt onder algemeen crypto nieuws?', a: 'Marktbrede ontwikkelingen, bedrijfsnieuws, technologie en onderwerpen die meerdere cryptocurrencies raken.' },
      { q: 'Hoe vaak wordt dit bijgewerkt?', a: 'Meerdere keren per dag, op basis van betrouwbare bronnen.' },
      { q: 'Is dit nieuws beleggingsadvies?', a: 'Nee, alle content is informatief en vormt geen financieel advies.' },
    ],
    relatedKennisbank: [
      { label: 'Wat is Bitcoin?', slug: 'wat-is-bitcoin' },
      { label: 'Hoe koop je crypto?', slug: 'hoe-koop-je-crypto' },
      { label: 'Wat is blockchain?', slug: 'wat-is-blockchain' },
    ],
  },
}

export const CATEGORY_SLUGS = Object.keys(CATEGORY_CONFIG)

export function getCategoryConfig(slug: string): CategoryConfig | null {
  return CATEGORY_CONFIG[slug?.toLowerCase()] ?? null
}
