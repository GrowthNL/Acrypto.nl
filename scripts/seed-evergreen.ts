#!/usr/bin/env node
/**
 * Seed evergreen pillar-content - hoogwaardige, met de hand geschreven gidsen
 * (geen scraper-rewrites) die op langere termijn organisch verkeer trekken en
 * aan SEO/LLM/GEO/AIO-richtlijnen voldoen: answer-first, semantische structuur,
 * FAQ-schema (via de faqs-kolom), definities, interne links en inline SVG-
 * infographics.
 *
 * Draait idempotent: een artikel dat al bestaat (op slug) wordt overgeslagen.
 * Publiceert met gespreide, licht teruggezette datums zodat het geen
 * content-burst is en de evergreen-stukken buiten de news-sitemap (48u) vallen.
 *
 * Vereiste env: DATABASE_URL
 * Draaien:      npm run seed:evergreen  (of via de seed-evergreen workflow)
 */
import { getDb } from '../lib/db'
import { PRIMARY_AUTHOR } from '../lib/authors'
import { slugify } from '../lib/utils'

interface Seed {
  title: string
  slug: string
  excerpt: string
  tldr: string
  content: string
  category: string
  tags: string[]
  faqs: { q: string; a: string }[]
  daysAgo: number
}

// Herbruikbare, huisstijl-gekleurde stappen-infographic (inline SVG).
function stepsSVG(title: string, steps: string[]): string {
  const w = 720
  const gap = w / steps.length
  const nodes = steps
    .map((s, i) => {
      const cx = gap * i + gap / 2
      const label = s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      const words = label.split(' ')
      const mid = Math.ceil(words.length / 2)
      const l1 = words.slice(0, mid).join(' ')
      const l2 = words.slice(mid).join(' ')
      return `
    <g>
      <circle cx="${cx}" cy="46" r="22" fill="#C5FA4A" stroke="#0C100E" stroke-width="2"/>
      <text x="${cx}" y="53" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#0C100E">${i + 1}</text>
      <text x="${cx}" y="96" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#0C100E">${l1}</text>
      <text x="${cx}" y="113" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#0C100E">${l2}</text>
    </g>`
    })
    .join('')
  const line = `<line x1="${gap / 2}" y1="46" x2="${w - gap / 2}" y2="46" stroke="#0C100E" stroke-width="2" stroke-dasharray="4 4" opacity="0.4"/>`
  return `<figure class="my-8"><svg viewBox="0 0 ${w} 130" role="img" aria-label="${title}" style="width:100%;height:auto;background:#F3F4EF;border-radius:12px;padding:8px">${line}${nodes}</svg><figcaption class="text-sm text-muted mt-2 text-center">${title}</figcaption></figure>`
}

const ARTICLES: Seed[] = [
  {
    title: 'Crypto kopen in Nederland: het complete stappenplan',
    slug: 'crypto-kopen-nederland-stappenplan',
    excerpt: 'Crypto kopen in Nederland in 4 stappen: kies een DNB-geregistreerde aanbieder, identificeer je, stort via iDEAL en koop veilig je eerste crypto.',
    tldr: 'Crypto kopen in Nederland doe je in vier stappen: kies een bij DNB geregistreerde aanbieder, doorloop de identificatie, stort geld via iDEAL en koop je eerste crypto. Begin klein, spreid je aankopen en bewaar grotere bedragen in een eigen wallet.',
    category: 'nieuws',
    tags: ['crypto kopen', 'bitcoin', 'beginners', 'ideal', 'nederland'],
    daysAgo: 16,
    content: `<p>Steeds meer Nederlanders orienteren zich op cryptovaluta. Of je nu nieuwsgierig bent naar Bitcoin of een klein deel van je spaargeld wilt spreiden: de eerste aankoop roept vaak dezelfde vragen op. Welke aanbieder is betrouwbaar? Hoe werkt de betaling met iDEAL? En hoe bewaar je je crypto veilig? In deze gids lopen we stap voor stap door het hele proces, toegespitst op de Nederlandse situatie.</p>
<p><strong>Kort antwoord:</strong> crypto kopen in Nederland doe je in vier stappen: (1) kies een bij De Nederlandsche Bank geregistreerde aanbieder, (2) maak een account aan en doorloop de identificatie, (3) stort geld via iDEAL, en (4) koop je eerste crypto. Hieronder werken we elke stap uit.</p>
${stepsSVG('Crypto kopen in 4 stappen', ['Kies aanbieder', 'Verifieer account', 'Stort via iDEAL', 'Koop crypto'])}
<h2>Stap 1: Kies een betrouwbare aanbieder</h2>
<p>In Nederland moeten aanbieders van cryptodiensten geregistreerd staan bij <strong>De Nederlandsche Bank (DNB)</strong>, en onder de Europese MiCA-regelgeving gelden aanvullende eisen. Controleer daarom altijd of een platform officieel geregistreerd is voordat je geld overmaakt.</p>
<p>Populaire aanbieders voor Nederlandse gebruikers zijn onder andere Bitvavo, Kraken en Coinbase. Let bij je keuze op de handelskosten, het aanbod aan munten, of iDEAL wordt ondersteund en op het gebruiksgemak. Een uitgebreide vergelijking vind je op onze <a href="/exchanges">exchange-vergelijking</a>.</p>
<h2>Stap 2: Maak een account aan en identificeer jezelf</h2>
<p>Na je keuze maak je een account aan met je e-mailadres. Vervolgens doorloop je een verplichte identificatiecontrole (<strong>KYC</strong>, "Know Your Customer"). Dit is wettelijk verplicht om witwassen tegen te gaan. Je hebt hiervoor doorgaans een geldig identiteitsbewijs, een selfie of videocontrole en soms een kleine verificatiebetaling nodig.</p>
<p>Zet direct <strong>tweestapsverificatie (2FA)</strong> aan. Dat is een van de belangrijkste dingen die je kunt doen om je account te beveiligen.</p>
<h2>Stap 3: Stort geld via iDEAL</h2>
<p>Zodra je account is geverifieerd, kun je geld storten. De meeste Nederlandse platforms ondersteunen iDEAL, waarmee je direct vanaf je bankrekening betaalt. Andere opties zijn een SEPA-overschrijving of soms een creditcard, al brengt die laatste vaak hogere kosten met zich mee. Begin met een bedrag dat je kunt missen: crypto is deelbaar, dus je kunt al voor enkele tientjes een klein deel van een munt kopen.</p>
<h2>Stap 4: Koop je eerste crypto</h2>
<p>Zoek de gewenste munt op (bijvoorbeeld Bitcoin of Ethereum), vul het bedrag in en bevestig. Je ziet vooraf hoeveel crypto je ontvangt en welke kosten je betaalt. Bij een <em>marktorder</em> koop je direct tegen de huidige koers; bij een <em>limietorder</em> stel je zelf een prijs in. Voor beginners is een marktorder meestal het eenvoudigst.</p>
<h2>Wat betekent dit voor jou als beginner?</h2>
<p>De techniek is laagdrempelig, maar de belangrijkste beslissingen zijn strategisch. Een paar nuchtere uitgangspunten die veel ervaren gebruikers hanteren:</p>
<ul>
<li><strong>Spreiding in tijd:</strong> periodiek een klein bedrag kopen (dollar-cost averaging) middelt je aankoopprijs uit.</li>
<li><strong>Alleen inleggen wat je kunt missen:</strong> koersen kunnen fors dalen en historische stijgingen bieden geen garantie.</li>
<li><strong>Wees kritisch op "hete tips":</strong> rendementbeloftes op social media zijn vaak te mooi om waar te zijn.</li>
</ul>
<h2>Je crypto veilig bewaren</h2>
<p>Na aankoop staat je crypto standaard in de wallet van het platform. Voor kleine bedragen is dat prima. Bewaar je grotere bedragen, dan kiezen veel gebruikers voor een eigen wallet. Meer daarover lees je in onze gids over de <a href="/nieuws/crypto-wallet-uitleg">crypto wallet</a>. De gouden regel: wie de sleutels (de seed phrase) beheert, beheert de crypto. Deel die zin nooit en bewaar hem offline.</p>
<p>Wil je weten welke munt bij je past? Lees dan verder in <a href="/nieuws/welke-crypto-kopen">welke crypto kopen</a>.</p>`,
    faqs: [
      { q: 'Is crypto kopen in Nederland legaal?', a: 'Ja, crypto kopen is legaal in Nederland. Aanbieders moeten wel geregistreerd zijn bij De Nederlandsche Bank en voldoen aan Europese regelgeving.' },
      { q: 'Hoeveel geld heb ik minimaal nodig om crypto te kopen?', a: 'Bij de meeste platforms kun je al vanaf enkele euro\'s beginnen, omdat crypto in kleine delen te koop is. Begin met een bedrag dat je kunt missen.' },
      { q: 'Moet ik belasting betalen over crypto?', a: 'Ja, in Nederland valt crypto doorgaans in box 3 (vermogen). Je geeft de waarde op de peildatum op bij je aangifte. Raadpleeg de Belastingdienst voor jouw situatie.' },
      { q: 'Wat is de veiligste manier om crypto te bewaren?', a: 'Voor grotere bedragen wordt een hardware-wallet (cold wallet) als het veiligst beschouwd, omdat die offline blijft. Bewaar je herstelzin altijd veilig en offline.' },
    ],
  },
  {
    title: 'Welke crypto kopen? Zo maak je een onderbouwde keuze',
    slug: 'welke-crypto-kopen',
    excerpt: 'Welke crypto kopen? Leer hoe je munten beoordeelt op techniek, gebruik en risico, met de verschillen tussen Bitcoin, Ethereum en altcoins helder uitgelegd.',
    tldr: 'Er bestaat geen "beste" crypto voor iedereen. Beoordeel een munt op het probleem dat hij oplost, het gebruik in de praktijk, het team en de risico\'s. Bitcoin en Ethereum zijn de meest gevestigde namen; kleinere altcoins bieden meer potentieel maar ook meer risico.',
    category: 'altcoins',
    tags: ['welke crypto kopen', 'bitcoin', 'ethereum', 'altcoins', 'beginners'],
    daysAgo: 14,
    content: `<p>"Welke crypto moet ik kopen?" is misschien wel de meestgestelde vraag onder beginners. Het eerlijke antwoord: er bestaat geen munt die voor iedereen de beste is. Wel kun je leren om zelf een onderbouwde keuze te maken, in plaats van blind een tip van internet te volgen. In deze gids laten we zien waar je op let.</p>
<p><strong>Kort antwoord:</strong> beoordeel een cryptomunt op vier punten: welk probleem lost hij op, wordt hij in de praktijk gebruikt, wie zit er achter, en hoe groot is het risico. Begin bij de gevestigde namen (Bitcoin, Ethereum) voordat je naar kleinere altcoins kijkt.</p>
<h2>De drie hoofdcategorieen</h2>
<p>Grofweg vallen de meeste munten in drie groepen:</p>
<ul>
<li><strong>Bitcoin (BTC):</strong> de oudste en grootste, vaak gezien als "digitaal goud" en waardeopslag.</li>
<li><strong>Ethereum (ETH):</strong> een platform voor slimme contracten en toepassingen (DeFi, NFT's).</li>
<li><strong>Altcoins:</strong> alle overige munten, van serieuze projecten tot speculatieve memecoins.</li>
</ul>
<h2>Vier vragen om elke munt te beoordelen</h2>
<p>Loop voor elke munt die je overweegt deze vragen na:</p>
<ol>
<li><strong>Welk probleem lost het op?</strong> Een munt zonder duidelijk doel is vooral speculatie.</li>
<li><strong>Wordt het echt gebruikt?</strong> Kijk naar actieve gebruikers, transacties en toepassingen, niet alleen naar de koers.</li>
<li><strong>Wie zit erachter?</strong> Een transparant, ervaren team is een goed teken.</li>
<li><strong>Wat is het risico?</strong> Kleinere munten kunnen harder stijgen, maar ook veel harder dalen of zelfs verdwijnen.</li>
</ol>
<h2>Wat betekent dit voor jou?</h2>
<p>Voor de meeste beginners is het verstandig om te starten bij de gevestigde namen en pas later, met kennis van zaken, naar kleinere projecten te kijken. Spreiding over meerdere munten kan het risico verlagen, maar spreiding zonder begrip is geen strategie. Investeer alleen in wat je snapt, en alleen met geld dat je kunt missen. Dit is geen beleggingsadvies: doe altijd eigen onderzoek.</p>
<p>Weet je welke munt je wilt? Lees dan het <a href="/nieuws/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>. Twijfel je over het moment? Bekijk <a href="/nieuws/wanneer-crypto-kopen">wanneer crypto kopen</a>.</p>`,
    faqs: [
      { q: 'Wat is de beste crypto om te kopen voor beginners?', a: 'Er is geen enkele "beste" munt. Veel beginners starten bij gevestigde namen als Bitcoin en Ethereum omdat die het meest bekend en liquide zijn, maar elke keuze blijft risicovol. Doe eigen onderzoek.' },
      { q: 'Wat is het verschil tussen Bitcoin en altcoins?', a: 'Bitcoin is de eerste en grootste cryptomunt, vaak gezien als waardeopslag. Altcoins zijn alle andere munten, met uiteenlopende doelen en risicoprofielen.' },
      { q: 'Is het slim om in veel verschillende munten te spreiden?', a: 'Spreiding kan het risico verlagen, maar alleen als je begrijpt waarin je investeert. Spreiden over munten die je niet kent, verlaagt het risico niet echt.' },
    ],
  },
  {
    title: 'Wat is Bitvavo? Uitleg, kosten en aandachtspunten',
    slug: 'wat-is-bitvavo',
    excerpt: 'Wat is Bitvavo? Een Nederlands crypto-platform met iDEAL-support. Lees hoe het werkt, wat de kosten zijn en waar je op moet letten voordat je begint.',
    tldr: 'Bitvavo is een in Amsterdam gevestigd crypto-handelsplatform, populair in Nederland door iDEAL-betalingen, een groot muntaanbod en relatief lage kosten. Zoals bij elk platform geldt: controleer registratie, kosten en beveiliging voordat je begint.',
    category: 'nieuws',
    tags: ['bitvavo', 'crypto exchange', 'ideal', 'nederland', 'kosten'],
    daysAgo: 12,
    content: `<p>Bitvavo is een van de bekendste crypto-platforms in Nederland. Als je je orienteert op je eerste aankoop, kom je de naam vrijwel zeker tegen. Maar wat is Bitvavo precies, hoe werkt het en waar moet je op letten? In deze uitleg zetten we het nuchter op een rij.</p>
<p><strong>Kort antwoord:</strong> Bitvavo is een in Amsterdam gevestigd handelsplatform waar je crypto kunt kopen, verkopen en bewaren. Het is in Nederland populair vanwege iDEAL-betalingen, een breed aanbod aan munten en relatief lage handelskosten.</p>
<h2>Hoe werkt Bitvavo?</h2>
<p>Na registratie en identificatie (KYC) stort je euro's, bijvoorbeeld via iDEAL, en koop je daarmee crypto. Het platform biedt een app en een website, en je kunt je aangekochte munten op het platform laten staan of naar een eigen wallet sturen. De werkwijze komt overeen met het algemene <a href="/nieuws/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>.</p>
<h2>Wat kost het?</h2>
<p>Platforms verdienen doorgaans aan handelskosten (een percentage per transactie) en soms aan opname- of stortingskosten. Die tarieven veranderen regelmatig, dus controleer de actuele kosten altijd op de officiele website voordat je begint. Bij veel of grote transacties tikken kosten sneller aan dan je denkt.</p>
<h2>Waar moet je op letten?</h2>
<ul>
<li><strong>Registratie en toezicht:</strong> controleer of het platform voldoet aan de Nederlandse en Europese regels.</li>
<li><strong>Beveiliging:</strong> zet tweestapsverificatie (2FA) aan en gebruik een sterk, uniek wachtwoord.</li>
<li><strong>Eigen beheer:</strong> voor grotere bedragen overwegen veel gebruikers een eigen <a href="/nieuws/crypto-wallet-uitleg">crypto wallet</a> in plaats van alles op het platform te laten staan.</li>
</ul>
<h2>Wat betekent dit voor jou?</h2>
<p>Bitvavo is voor veel Nederlanders een toegankelijk startpunt, maar "populair" betekent niet automatisch "het beste voor jouw situatie". Vergelijk het met andere aanbieders op kosten, aanbod en gebruiksgemak via onze <a href="/exchanges">exchange-vergelijking</a>, en maak daarna een eigen keuze. Dit artikel is voorlichting, geen aanbeveling of beleggingsadvies.</p>`,
    faqs: [
      { q: 'Is Bitvavo veilig?', a: 'Bitvavo past standaard beveiligingsmaatregelen toe en moet aan Nederlandse en Europese regels voldoen. Je eigen beveiliging is minstens zo belangrijk: gebruik tweestapsverificatie en een sterk wachtwoord.' },
      { q: 'Kan ik bij Bitvavo met iDEAL betalen?', a: 'Ja, iDEAL is een van de redenen dat Bitvavo populair is bij Nederlandse gebruikers, omdat je direct vanaf je bankrekening kunt storten.' },
      { q: 'Wat kost handelen bij Bitvavo?', a: 'Platforms rekenen doorgaans een percentage per transactie. Tarieven wijzigen regelmatig, dus controleer de actuele kosten altijd op de officiele website.' },
    ],
  },
  {
    title: 'Bitcoin kopen: stappenplan en tips voor beginners',
    slug: 'bitcoin-kopen-stappenplan',
    excerpt: 'Bitcoin kopen als beginner? Ontdek stap voor stap hoe je veilig BTC koopt in Nederland, wat het kost en hoe je je bitcoin daarna goed bewaart.',
    tldr: 'Bitcoin koop je via een geregistreerd platform: account aanmaken, identificeren, euro\'s storten (bijvoorbeeld met iDEAL) en BTC kopen. Je hoeft geen hele bitcoin te kopen; een klein deel kan ook. Bewaar grotere bedragen in een eigen wallet.',
    category: 'bitcoin',
    tags: ['bitcoin kopen', 'btc', 'beginners', 'wallet', 'ideal'],
    daysAgo: 10,
    content: `<p>Bitcoin is voor veel mensen de eerste kennismaking met crypto. Het is de oudste en bekendste cryptomunt, en wordt vaak omschreven als "digitaal goud". Wil je bitcoin kopen maar weet je niet waar te beginnen? Deze gids loopt het proces met je door.</p>
<p><strong>Kort antwoord:</strong> je koopt bitcoin via een geregistreerd platform. Je maakt een account aan, doorloopt de identificatie, stort euro's (bijvoorbeeld via iDEAL) en koopt daarmee BTC. Je hoeft geen hele bitcoin te kopen: een klein deel kan ook.</p>
${stepsSVG('Bitcoin kopen in 4 stappen', ['Account aanmaken', 'Identificatie (KYC)', 'Euro storten', 'Bitcoin kopen'])}
<h2>Een deel van een bitcoin kopen</h2>
<p>Een misverstand onder beginners is dat je een hele bitcoin moet kopen. Dat hoeft niet: bitcoin is deelbaar tot acht decimalen (de kleinste eenheid heet een "satoshi"). Je kunt dus prima voor 25 of 50 euro instappen en dan een fractie van een BTC bezitten.</p>
<h2>Wat kost bitcoin kopen?</h2>
<p>Je betaalt handelskosten aan het platform, meestal een klein percentage van je aankoop. Daarnaast kunnen er kosten zijn als je bitcoin naar een eigen wallet stuurt (netwerkkosten). Vergelijk de tarieven van aanbieders voordat je kiest.</p>
<h2>Je bitcoin veilig bewaren</h2>
<p>Na aankoop staat je bitcoin op het platform. Voor kleine bedragen is dat prima, maar voor grotere bedragen kiezen veel mensen voor een eigen wallet, zodat ze zelf de sleutels beheren. Meer daarover lees je in onze gids over de <a href="/nieuws/crypto-wallet-uitleg">crypto wallet</a>.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Bitcoin blijft ondanks zijn bekendheid een risicovolle en volatiele belegging. De koers kan in korte tijd fors bewegen. Veel mensen kiezen daarom voor periodiek een klein bedrag inleggen in plaats van in een keer een groot bedrag. Leg alleen in wat je kunt missen en doe eigen onderzoek. Dit is geen beleggingsadvies.</p>
<p>Wil je het bredere plaatje? Lees het algemene <a href="/nieuws/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a> of ontdek <a href="/nieuws/welke-crypto-kopen">welke crypto bij je past</a>.</p>`,
    faqs: [
      { q: 'Moet ik een hele bitcoin kopen?', a: 'Nee. Bitcoin is deelbaar tot acht decimalen, dus je kunt al voor een klein bedrag een fractie van een bitcoin kopen.' },
      { q: 'Waar kan ik het beste bitcoin kopen in Nederland?', a: 'Via een bij DNB geregistreerd platform dat iDEAL ondersteunt. Vergelijk aanbieders op kosten, aanbod en gebruiksgemak voordat je kiest.' },
      { q: 'Hoe bewaar ik mijn bitcoin veilig?', a: 'Voor kleine bedragen volstaat de wallet van het platform. Voor grotere bedragen wordt een eigen (hardware-)wallet als veiliger beschouwd, omdat je dan zelf de sleutels beheert.' },
    ],
  },
  {
    title: 'Wanneer crypto kopen? Zo denk je over timing',
    slug: 'wanneer-crypto-kopen',
    excerpt: 'Wanneer crypto kopen? Timing van de markt is vrijwel onmogelijk. Ontdek waarom spreiden in de tijd voor de meeste mensen verstandiger is dan gokken op het juiste moment.',
    tldr: 'Perfect timen wanneer je crypto koopt, lukt vrijwel niemand. Veel mensen kiezen daarom voor spreiden in de tijd (dollar-cost averaging): periodiek een vast bedrag inleggen, ongeacht de koers. Zo verklein je het risico van een slecht instapmoment.',
    category: 'marktanalyse',
    tags: ['wanneer crypto kopen', 'timing', 'dca', 'beginners', 'strategie'],
    daysAgo: 9,
    content: `<p>"Moet ik nu instappen of wachten?" Het is een vraag die bijna iedereen zich stelt voordat hij crypto koopt. De verleiding is groot om te wachten op "de dip" of te kopen als alles stijgt. In deze gids leggen we uit waarom timing zo lastig is en welke aanpak veel mensen daarom kiezen.</p>
<p><strong>Kort antwoord:</strong> de markt perfect timen lukt vrijwel niemand, ook professionals niet. Een veelgebruikte aanpak is spreiden in de tijd: periodiek een vast bedrag inleggen, ongeacht de koers. Zo hoef je niet te gokken op het ideale moment.</p>
<h2>Waarom timing zo moeilijk is</h2>
<p>Cryptokoersen worden bewogen door nieuws, sentiment en gebeurtenissen die niemand vooraf kent. Wie wacht op de "bodem", mist vaak de stijging; wie koopt op de "top", schrikt van de daling. Emotie speelt hierbij een grote rol: angst en hebzucht leiden zelden tot goede beslissingen.</p>
<h2>Dollar-cost averaging (spreiden in de tijd)</h2>
<p>Bij <strong>dollar-cost averaging (DCA)</strong> koop je met vaste tussenpozen een vast bedrag, bijvoorbeeld elke maand voor 50 euro. Soms koop je duur, soms goedkoop, maar gemiddeld middel je je aankoopprijs uit. Het grote voordeel: je hoeft de markt niet te voorspellen en je haalt emotie uit je beslissingen.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>In plaats van je af te vragen <em>wanneer</em> je moet kopen, is de nuttigere vraag vaak <em>hoeveel</em> je verantwoord kunt en wilt inleggen, en over welke periode. Leg alleen in wat je kunt missen en houd er rekening mee dat koersen fors kunnen dalen. Historische stijgingen bieden geen garantie voor de toekomst. Dit is geen beleggingsadvies: doe altijd eigen onderzoek.</p>
<p>Klaar om te beginnen? Bekijk het <a href="/nieuws/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a> en lees welke <a href="/nieuws/crypto-kopen-beginner-valkuilen">valkuilen beginners</a> het beste kunnen vermijden.</p>`,
    faqs: [
      { q: 'Wat is het beste moment om crypto te kopen?', a: 'Er is geen betrouwbaar "beste" moment; de markt perfect timen lukt vrijwel niemand. Veel mensen spreiden hun aankopen daarom in de tijd in plaats van te wachten op het ideale moment.' },
      { q: 'Wat is dollar-cost averaging?', a: 'Dollar-cost averaging is periodiek een vast bedrag inleggen, ongeacht de koers. Zo middel je je aankoopprijs uit en verklein je het risico van een slecht instapmoment.' },
      { q: 'Moet ik wachten op een koersdaling voordat ik koop?', a: 'Wachten op "de dip" klinkt logisch, maar in de praktijk is die moeilijk te voorspellen. Spreiden in de tijd is voor veel mensen een nuchtere alternatieve aanpak.' },
    ],
  },
  {
    title: 'Crypto kopen als beginner: 7 valkuilen om te vermijden',
    slug: 'crypto-kopen-beginner-valkuilen',
    excerpt: 'Begin je met crypto? Vermijd deze 7 veelgemaakte beginnersfouten, van FOMO en hete tips tot slechte beveiliging, en start met een nuchter plan.',
    tldr: 'De grootste beginnersfouten bij crypto zijn: handelen op emotie (FOMO), blind tips volgen, alles op een platform laten staan, geen 2FA gebruiken, meer inleggen dan je kunt missen, koersen najagen en geen eigen onderzoek doen. Een nuchter plan voorkomt de meeste problemen.',
    category: 'nieuws',
    tags: ['crypto beginner', 'valkuilen', 'fomo', 'beveiliging', 'strategie'],
    daysAgo: 7,
    content: `<p>De meeste beginnersfouten in crypto zijn niet technisch, maar menselijk. Ze kosten mensen geld dat met een beetje voorbereiding bespaard had kunnen blijven. Hier zijn zeven veelgemaakte valkuilen, en hoe je ze vermijdt.</p>
<p><strong>Kort antwoord:</strong> de grootste valkuilen zijn handelen op emotie, blind tips volgen, slechte beveiliging en meer inleggen dan je kunt missen. Een nuchter plan en eigen onderzoek voorkomen de meeste problemen.</p>
<h2>1. Kopen uit FOMO</h2>
<p>FOMO ("fear of missing out") zorgt ervoor dat mensen kopen als de koers al hard is gestegen, uit angst iets te missen. Juist dan is het risico op een daling groot. Laat je niet opjagen door een stijgende grafiek.</p>
<h2>2. Blind hete tips volgen</h2>
<p>"Deze munt gaat 100x!" Rendementbeloftes op social media zijn vaak marketing of manipulatie. Volg nooit blind een tip; onderzoek zelf waar een munt voor staat.</p>
<h2>3. Alles op het platform laten staan</h2>
<p>Voor kleine bedragen is dat prima, maar voor grotere bedragen wordt een eigen <a href="/nieuws/crypto-wallet-uitleg">crypto wallet</a> als veiliger gezien.</p>
<h2>4. Geen tweestapsverificatie</h2>
<p>2FA is een van de simpelste en belangrijkste beveiligingsmaatregelen. Zet het direct aan op elk account.</p>
<h2>5. Meer inleggen dan je kunt missen</h2>
<p>Crypto is volatiel. Leg nooit geld in dat je op korte termijn nodig hebt of niet kunt verliezen.</p>
<h2>6. Koersen najagen</h2>
<p>Voortdurend kopen en verkopen op basis van dagkoersen leidt zelden tot betere resultaten en kost extra aan handelskosten. Overweeg <a href="/nieuws/wanneer-crypto-kopen">spreiden in de tijd</a>.</p>
<h2>7. Geen eigen onderzoek doen</h2>
<p>De belangrijkste vuistregel: investeer alleen in wat je begrijpt. Neem de tijd om te leren voordat je grotere bedragen inlegt.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Vrijwel al deze valkuilen komen neer op geduld en discipline. Begin klein, beveilig je accounts goed en laat je niet leiden door emotie of hype. Dit artikel is voorlichting en geen beleggingsadvies.</p>
<p>Klaar voor stap een? Lees het <a href="/nieuws/crypto-kopen-nederland-stappenplan">complete stappenplan</a>.</p>`,
    faqs: [
      { q: 'Wat is de grootste fout die crypto-beginners maken?', a: 'Handelen op emotie, vooral kopen uit FOMO wanneer de koers al hard is gestegen. Een nuchter plan en spreiden in de tijd helpen dit te voorkomen.' },
      { q: 'Is het veilig om mijn crypto op een platform te laten staan?', a: 'Voor kleine bedragen is dat meestal prima. Voor grotere bedragen wordt een eigen wallet aangeraden, zodat je zelf de sleutels beheert.' },
      { q: 'Hoeveel geld moet ik als beginner inleggen?', a: 'Alleen een bedrag dat je volledig kunt missen. Crypto is volatiel en je kunt (een deel van) je inleg verliezen.' },
    ],
  },
  {
    title: 'Beste crypto exchange in Nederland: waar let je op?',
    slug: 'beste-crypto-exchange-nederland',
    excerpt: 'Op zoek naar de beste crypto exchange in Nederland? Leer op welke punten je platforms vergelijkt: kosten, aanbod, beveiliging, iDEAL en gebruiksgemak.',
    tldr: 'Er is geen enkele "beste" exchange voor iedereen. Vergelijk platforms op kosten, muntaanbod, beveiliging, betaalmethoden (zoals iDEAL), gebruiksgemak en registratie/toezicht. Welke het beste past, hangt af van jouw situatie en hoe vaak je handelt.',
    category: 'nieuws',
    tags: ['crypto exchange', 'vergelijken', 'bitvavo', 'kraken', 'nederland'],
    daysAgo: 5,
    content: `<p>"Wat is de beste crypto exchange?" is een logische vraag, maar het antwoord hangt af van jouw situatie. Iemand die eenmalig een klein bedrag inlegt, let op andere dingen dan iemand die vaak handelt. In deze gids leggen we uit op welke punten je platforms vergelijkt.</p>
<p><strong>Kort antwoord:</strong> er is geen enkele beste exchange voor iedereen. Vergelijk op kosten, aanbod, beveiliging, betaalmethoden en gebruiksgemak, en kies wat bij jouw manier van gebruiken past.</p>
<h2>Waarop vergelijk je een exchange?</h2>
<ul>
<li><strong>Kosten:</strong> handelskosten (fees) verschillen sterk en tikken bij veel handelen aan.</li>
<li><strong>Aanbod:</strong> hoeveel en welke munten kun je kopen?</li>
<li><strong>Beveiliging:</strong> biedt het platform 2FA en andere waarborgen?</li>
<li><strong>Betaalmethoden:</strong> wordt iDEAL ondersteund? Voor Nederlandse gebruikers is dat het handigst.</li>
<li><strong>Gebruiksgemak:</strong> is de app overzichtelijk en is er Nederlandstalige support?</li>
<li><strong>Registratie en toezicht:</strong> voldoet het platform aan de Nederlandse en Europese regels?</li>
</ul>
<h2>Bekende aanbieders in Nederland</h2>
<p>Voor Nederlandse gebruikers zijn onder andere Bitvavo, Kraken en Coinbase bekende namen. Ze verschillen in kosten, aanbod en gebruiksgemak. Lees bijvoorbeeld onze uitleg <a href="/nieuws/wat-is-bitvavo">wat is Bitvavo</a>, en bekijk de volledige naast-elkaar-vergelijking op onze <a href="/exchanges">exchange-pagina</a>.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Kies niet op basis van reclame of een enkele review, maar op basis van jouw eigen wensen: hoe vaak handel je, welke munten wil je, en hoe belangrijk is gebruiksgemak versus lage kosten? Begin eventueel bij een toegankelijk platform en heroverweeg later als je behoeften veranderen. Dit is geen aanbeveling of beleggingsadvies.</p>`,
    faqs: [
      { q: 'Wat is de beste crypto exchange in Nederland?', a: 'Er is geen enkele beste exchange voor iedereen. Welke het beste past, hangt af van kosten, aanbod, beveiliging, betaalmethoden en hoe vaak je handelt.' },
      { q: 'Welke exchanges ondersteunen iDEAL?', a: 'Diverse in Nederland populaire platforms ondersteunen iDEAL, waaronder Bitvavo. Controleer de betaalmethoden altijd op de officiele website van het platform.' },
      { q: 'Waar moet ik op letten bij het kiezen van een exchange?', a: 'Op kosten, muntaanbod, beveiliging (zoals 2FA), betaalmethoden, gebruiksgemak en of het platform aan de Nederlandse en Europese regels voldoet.' },
    ],
  },
  {
    title: 'Crypto kopen met iDEAL: hoe werkt het?',
    slug: 'crypto-kopen-met-ideal',
    excerpt: 'Crypto kopen met iDEAL is voor Nederlanders de snelste manier om te storten. Lees hoe het werkt, wat het kost en waarom veel platforms iDEAL aanbieden.',
    tldr: 'Met iDEAL stort je direct vanaf je Nederlandse bankrekening geld op een crypto-platform, waarna je crypto koopt. Het is snel, vertrouwd en veel Nederlandse platforms (zoals Bitvavo) ondersteunen het. Let wel op eventuele storting- en handelskosten.',
    category: 'nieuws',
    tags: ['crypto kopen', 'ideal', 'betalen', 'nederland', 'bitvavo'],
    daysAgo: 4,
    content: `<p>iDEAL is voor Nederlanders de meest vertrouwde manier om online te betalen, en dat geldt ook voor crypto. Wil je crypto kopen met iDEAL? In deze korte gids leggen we uit hoe het werkt en waar je op let.</p>
<p><strong>Kort antwoord:</strong> je stort met iDEAL direct vanaf je Nederlandse bankrekening euro's op een crypto-platform, en koopt daar vervolgens crypto mee. Veel in Nederland actieve platforms ondersteunen iDEAL, wat het snel en laagdrempelig maakt.</p>
<h2>Hoe werkt crypto kopen met iDEAL?</h2>
<ol>
<li>Maak een account aan bij een geregistreerd platform en doorloop de identificatie.</li>
<li>Kies bij "storten" voor iDEAL en selecteer je bank.</li>
<li>Bevestig de betaling in je eigen bank-app; het bedrag staat vrijwel direct op je account.</li>
<li>Koop met dat saldo de crypto van je keuze.</li>
</ol>
<h2>Wat kost het?</h2>
<p>Sommige platforms rekenen geen of lage stortingskosten voor iDEAL, andere wel. Daarnaast betaal je handelskosten bij de aankoop zelf. Controleer de actuele tarieven altijd op de officiele website van het platform.</p>
<h2>Waarom iDEAL populair is</h2>
<p>iDEAL is snel, je betaalt in je vertrouwde bankomgeving en het geld is meestal direct beschikbaar. Voor beginners is het daardoor vaak de makkelijkste manier om te starten. Meer over het hele proces lees je in het <a href="/nieuws/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>iDEAL maakt de instap eenvoudig, maar de aankoop zelf blijft een risicovolle belegging. Leg alleen in wat je kunt missen en doe eigen onderzoek. Dit is geen beleggingsadvies.</p>`,
    faqs: [
      { q: 'Kan ik crypto kopen met iDEAL?', a: 'Ja. Veel in Nederland actieve platforms ondersteunen iDEAL, waarmee je direct vanaf je bankrekening stort en vervolgens crypto koopt.' },
      { q: 'Is crypto kopen met iDEAL veilig?', a: 'De betaling verloopt via je eigen vertrouwde bankomgeving. Zorg daarnaast zelf voor een goed beveiligd account met tweestapsverificatie.' },
      { q: 'Kost crypto kopen met iDEAL extra geld?', a: 'Sommige platforms rekenen geen of lage stortingskosten voor iDEAL, andere wel. Daarnaast betaal je handelskosten bij de aankoop. Controleer de actuele tarieven.' },
    ],
  },
  {
    title: 'Crypto en belasting in Nederland: zo zit het',
    slug: 'crypto-belasting-nederland',
    excerpt: 'Hoe werkt belasting op crypto in Nederland? Crypto valt doorgaans in box 3 (vermogen). Lees hoe de peildatum werkt en waar je op moet letten bij je aangifte.',
    tldr: 'In Nederland valt crypto voor particulieren doorgaans in box 3 (vermogen). Je geeft de totale waarde van je crypto op 1 januari (de peildatum) op bij je belastingaangifte. Bij handelen als onderneming of bijzondere situaties kunnen andere regels gelden; raadpleeg de Belastingdienst of een adviseur.',
    category: 'regulering',
    tags: ['crypto belasting', 'box 3', 'belastingdienst', 'aangifte', 'nederland'],
    daysAgo: 3,
    content: `<p>Bezit je crypto, dan krijg je vroeg of laat te maken met de Belastingdienst. Hoe zit dat precies in Nederland? In deze gids leggen we de hoofdlijnen nuchter uit. Let op: belastingregels veranderen en ieders situatie is anders, dus dit is algemene voorlichting en geen fiscaal advies.</p>
<p><strong>Kort antwoord:</strong> voor de meeste particulieren valt crypto in box 3 (vermogen). Je geeft de waarde van je crypto op de peildatum (1 januari) op bij je aangifte. Je betaalt dus belasting over je vermogen, niet direct over je winst.</p>
<h2>Crypto valt meestal in box 3</h2>
<p>Box 3 gaat over je vermogen: spaargeld, beleggingen en dus ook crypto. De Belastingdienst kijkt naar de totale waarde van je bezittingen op <strong>1 januari</strong> van het belastingjaar. Die waarde geef je op. Anders dan bij aandelenwinst betaal je in box 3 niet rechtstreeks over de behaalde winst, maar over je vermogen (volgens de dan geldende systematiek).</p>
<h2>De peildatum: 1 januari</h2>
<p>Omdat de peildatum 1 januari is, telt de waarde van je crypto op dat moment. Koersschommelingen door het jaar heen zijn voor box 3 in beginsel niet bepalend. Bewaar wel een goed overzicht van wat je bezit en wat het waard was.</p>
<h2>Wanneer gelden er andere regels?</h2>
<p>Handel je zeer actief, mine je op grote schaal, of ontvang je crypto als beloning voor werk, dan kan de situatie anders liggen (bijvoorbeeld box 1). Ook voor ondernemers gelden andere regels. Twijfel je? Raadpleeg dan de Belastingdienst of een fiscaal adviseur.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Houd gedurende het jaar een overzicht bij van je crypto: welke munten, hoeveel en de waarde. Dat maakt je aangifte een stuk makkelijker. Reken niet op deze tekst als definitief advies: de regels wijzigen regelmatig en je eigen situatie is leidend. Raadpleeg voor zekerheid de Belastingdienst.</p>
<p>Wil je eerst weten hoe je begint? Lees het <a href="/nieuws/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>.</p>`,
    faqs: [
      { q: 'In welke box valt crypto in Nederland?', a: 'Voor de meeste particulieren valt crypto in box 3 (vermogen). Bij actief handelen als onderneming of bijzondere situaties kunnen andere regels gelden.' },
      { q: 'Over welke datum moet ik mijn crypto opgeven?', a: 'Voor box 3 telt de waarde van je crypto op de peildatum, 1 januari van het belastingjaar.' },
      { q: 'Betaal ik belasting over mijn cryptowinst?', a: 'In box 3 betaal je over je vermogen volgens de geldende systematiek, niet rechtstreeks over de behaalde winst. Raadpleeg de Belastingdienst voor jouw situatie.' },
    ],
  },
  {
    title: 'Crypto wallet uitleg: welke past bij jou?',
    slug: 'crypto-wallet-uitleg',
    excerpt: 'Wat is een crypto wallet en welke soorten zijn er? Ontdek het verschil tussen hot en cold wallets en hoe je je crypto veilig bewaart met je seed phrase.',
    tldr: 'Een crypto wallet bewaart de sleutels waarmee je bij je crypto kunt. Er zijn hot wallets (online, handig, voor kleine bedragen) en cold wallets (offline hardware, veiliger voor grotere bedragen). Wie de seed phrase beheert, beheert de crypto: bewaar die zin altijd veilig en offline.',
    category: 'nieuws',
    tags: ['crypto wallet', 'hot wallet', 'cold wallet', 'seed phrase', 'beveiliging'],
    daysAgo: 2,
    content: `<p>Zodra je crypto bezit, wil je die veilig bewaren. Daarvoor gebruik je een wallet. Maar wat is een crypto wallet precies, en welke soorten zijn er? In deze gids leggen we het helder uit.</p>
<p><strong>Kort antwoord:</strong> een crypto wallet bewaart niet de munten zelf, maar de digitale sleutels waarmee je erbij kunt. Er zijn hot wallets (verbonden met internet, handig voor dagelijks gebruik) en cold wallets (offline, veiliger voor grotere bedragen).</p>
${stepsSVG('Twee soorten wallets: hot versus cold', ['Hot wallet: online, handig', 'Voor kleine bedragen', 'Cold wallet: offline', 'Voor grotere bedragen'])}
<h2>Wat is een crypto wallet?</h2>
<p>Een wallet beheert je <strong>private keys</strong>: de sleutels die bewijzen dat de crypto van jou is. De munten zelf staan op de blockchain; je wallet geeft je toegang. Verlies je je sleutels, dan verlies je de toegang tot je crypto. Vandaar dat veilige opslag zo belangrijk is.</p>
<h2>Hot wallet versus cold wallet</h2>
<ul>
<li><strong>Hot wallet:</strong> een app op je telefoon of computer, of de wallet van een exchange. Verbonden met internet, dus handig en snel, maar iets kwetsbaarder. Prima voor kleinere bedragen.</li>
<li><strong>Cold wallet:</strong> een fysiek apparaatje (hardware-wallet) dat offline blijft. Veiliger tegen hacks, en daarom populair voor grotere bedragen die je langer wilt bewaren.</li>
</ul>
<h2>De seed phrase: jouw noodsleutel</h2>
<p>Bij het aanmaken van een eigen wallet krijg je een <strong>seed phrase</strong>: een reeks van meestal 12 of 24 woorden waarmee je je wallet kunt herstellen. Wie deze zin heeft, heeft toegang tot je crypto. Deel hem dus nooit, bewaar hem offline (bijvoorbeeld op papier) en nooit als screenshot of in de cloud.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Voor kleine bedragen die je actief gebruikt, is de wallet van een betrouwbaar platform meestal voldoende. Bouw je een grotere positie op die je langer wilt aanhouden, dan is een cold wallet het overwegen waard. De belangrijkste regel blijft: bescherm je seed phrase alsof het de sleutel van je kluis is, want dat is het.</p>
<p>Nog niet begonnen? Lees eerst het <a href="/nieuws/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>.</p>`,
    faqs: [
      { q: 'Wat is een crypto wallet?', a: 'Een crypto wallet bewaart de digitale sleutels waarmee je toegang hebt tot je crypto. De munten zelf staan op de blockchain; de wallet geeft je toegang.' },
      { q: 'Wat is het verschil tussen een hot en een cold wallet?', a: 'Een hot wallet is verbonden met internet (handig, voor kleine bedragen). Een cold wallet is een offline hardware-apparaat, veiliger voor grotere bedragen.' },
      { q: 'Wat gebeurt er als ik mijn seed phrase kwijtraak?', a: 'Zonder je seed phrase kun je een eigen wallet niet herstellen en verlies je de toegang tot je crypto. Bewaar de zin daarom veilig en offline, en deel hem nooit.' },
    ],
  },
]

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[seed] DATABASE_URL ontbreekt.')
    process.exit(1)
  }
  const db = getDb()
  let inserted = 0
  let skipped = 0

  for (const a of ARTICLES) {
    const slug = a.slug || slugify(a.title)
    const exists = await db`SELECT id FROM articles WHERE slug = ${slug} LIMIT 1`
    if (exists.length) {
      console.log(`[seed] - bestaat al, overgeslagen: ${slug}`)
      skipped++
      continue
    }
    const publishedAt = new Date(Date.now() - a.daysAgo * 24 * 60 * 60 * 1000).toISOString()
    await db`
      INSERT INTO articles (
        title, slug, excerpt, tldr, content, image_url, source_url, source_name,
        author_name, category, tags, faqs, status, featured, published_at
      ) VALUES (
        ${a.title}, ${slug}, ${a.excerpt}, ${a.tldr}, ${a.content}, ${null}, ${null},
        ${'Acrypto.nl redactie'}, ${PRIMARY_AUTHOR.name}, ${a.category}, ${a.tags},
        ${JSON.stringify(a.faqs)}, ${'published'}, ${false}, ${publishedAt}
      )
    `
    inserted++
    console.log(`[seed] + gepubliceerd: "${a.title}" (${slug})`)
  }
  console.log(`[seed] klaar: ${inserted} toegevoegd, ${skipped} overgeslagen (van ${ARTICLES.length}).`)
}

main().catch(err => {
  console.error('[seed] fout:', err)
  process.exit(1)
})
