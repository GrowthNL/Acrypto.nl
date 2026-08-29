#!/usr/bin/env node
/**
 * Werkt de evergreen kennisbank-gidsen bij met veel diepgaandere, waardevollere
 * content en een unieke, relevante hero-afbeelding per gids.
 *
 * - Content: 1200-1800 woorden per gids, answer-first, met tabellen, voorbeelden,
 *   inline SVG-infographics en uitgebreide FAQ's (SEO/GEO/AIO-geoptimaliseerd).
 * - Afbeelding: via de Unsplash-API (distinct per gids), met een branded
 *   /api/og-fallback zodat er nooit een dubbele of ontbrekende afbeelding is.
 *
 * Idempotent: draait een UPDATE op bestaande slugs in knowledge_articles.
 *
 * Vereiste env: DATABASE_URL. Optioneel: UNSPLASH_ACCESS_KEY.
 * Draaien:      npm run update:guides  (of via de update-guides workflow)
 */
import { getDb } from '../lib/db'
import { fetchUnsplashImage } from '../lib/unsplash'

const SITE = 'https://acrypto.nl'

interface GuideUpdate {
  slug: string
  excerpt: string
  imgCategory: string
  imgTags: string[]
  content: string
  faqs: { q: string; a: string }[]
}

// Huisstijl-gekleurde stappen-infographic (inline SVG).
function stepsSVG(title: string, steps: string[]): string {
  const w = 760
  const gap = w / steps.length
  const nodes = steps
    .map((s, i) => {
      const cx = gap * i + gap / 2
      const words = s.split(' ')
      const mid = Math.ceil(words.length / 2)
      const l1 = words.slice(0, mid).join(' ')
      const l2 = words.slice(mid).join(' ')
      return `<g><circle cx="${cx}" cy="46" r="22" fill="#C5FA4A" stroke="#0C100E" stroke-width="2"/><text x="${cx}" y="53" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#0C100E">${i + 1}</text><text x="${cx}" y="96" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#0C100E">${l1}</text><text x="${cx}" y="113" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#0C100E">${l2}</text></g>`
    })
    .join('')
  const line = `<line x1="${gap / 2}" y1="46" x2="${w - gap / 2}" y2="46" stroke="#0C100E" stroke-width="2" stroke-dasharray="4 4" opacity="0.4"/>`
  return `<figure class="my-8"><svg viewBox="0 0 ${w} 130" role="img" aria-label="${title}" style="width:100%;height:auto;background:#F3F4EF;border-radius:12px;padding:8px">${line}${nodes}</svg><figcaption class="text-sm text-muted mt-2 text-center">${title}</figcaption></figure>`
}

const GUIDES: GuideUpdate[] = [
  {
    slug: 'crypto-kopen-nederland-stappenplan',
    imgCategory: 'nieuws',
    imgTags: ['smartphone', 'payment'],
    excerpt: 'Crypto kopen in Nederland: een compleet, praktisch stappenplan van het kiezen van een DNB-geregistreerde aanbieder tot het veilig bewaren van je eerste munten, inclusief kosten, iDEAL en veelgemaakte fouten.',
    content: `<p>Je eerste crypto kopen voelt vaak spannender dan het is. De techniek is de afgelopen jaren flink vereenvoudigd: met een geverifieerd account en iDEAL koop je binnen enkele minuten je eerste stukje Bitcoin of Ethereum. De echte kunst zit niet in de knoppen, maar in het maken van verstandige keuzes: bij wie koop je, hoeveel leg je in, en hoe bewaar je het veilig? Deze gids loopt het complete proces met je door, toegespitst op de Nederlandse situatie in 2026.</p>
<p><strong>Kort antwoord:</strong> crypto kopen in Nederland doe je in vier stappen: (1) kies een bij De Nederlandsche Bank geregistreerde aanbieder, (2) maak een account aan en doorloop de identificatie, (3) stort euro's via iDEAL, en (4) koop je eerste crypto. Begin met een klein bedrag dat je kunt missen en bewaar grotere bedragen in een eigen wallet.</p>
${stepsSVG('Crypto kopen in 4 stappen', ['Kies aanbieder', 'Verifieer account', 'Stort via iDEAL', 'Koop crypto'])}
<h2>Stap 1: Kies een betrouwbare aanbieder</h2>
<p>In Nederland moeten aanbieders van cryptodiensten zijn geregistreerd bij <strong>De Nederlandsche Bank (DNB)</strong>. Sinds de invoering van de Europese <strong>MiCA</strong>-regelgeving (Markets in Crypto-Assets) gelden bovendien strengere, uniforme eisen voor vergunningen, transparantie en consumentenbescherming. Controleer daarom altijd of een platform officieel geregistreerd of vergund is voordat je geld overmaakt.</p>
<p>Vergelijk platforms in elk geval op deze punten:</p>
<ul>
<li><strong>Kosten:</strong> de handelskosten (fees) verschillen sterk. Bij veel of grote transacties tikt een half procent verschil flink aan.</li>
<li><strong>Aanbod:</strong> hoeveel en welke munten kun je kopen? Voor beginners is een beperkt, degelijk aanbod vaak prettiger dan honderden obscure tokens.</li>
<li><strong>Betaalmethoden:</strong> ondersteunt het platform iDEAL? Voor Nederlandse gebruikers is dat verreweg het handigst.</li>
<li><strong>Beveiliging:</strong> biedt het tweestapsverificatie (2FA), en hoe gaat het om met bewaring van tegoeden?</li>
<li><strong>Gebruiksgemak en support:</strong> een overzichtelijke app en Nederlandstalige klantenservice schelen veel frustratie.</li>
</ul>
<p><strong>Let op deze waarschuwingssignalen:</strong> een platform dat rendement "garandeert", agressief adverteert met winst, of geen duidelijke registratie toont, is een reden tot voorzichtigheid. Een uitgebreide vergelijking van aanbieders vind je op onze <a href="/exchanges">exchange-vergelijking</a>, en lees ook <a href="/kennisbank/beste-crypto-exchange-nederland">waar je op let bij het kiezen van een exchange</a>.</p>
<h2>Stap 2: Maak een account aan en identificeer jezelf</h2>
<p>Registreren gaat met je e-mailadres en een sterk, uniek wachtwoord. Daarna volgt een verplichte identificatiecontrole, ook wel <strong>KYC</strong> ("Know Your Customer") genoemd. Dit is wettelijk verplicht om witwassen en fraude tegen te gaan. Je hebt doorgaans nodig:</p>
<ul>
<li>een geldig identiteitsbewijs (paspoort, ID-kaart of rijbewijs);</li>
<li>een selfie of korte videocontrole om te bewijzen dat jij het bent;</li>
<li>soms een kleine verificatiebetaling vanaf een bankrekening op jouw naam.</li>
</ul>
<p>De verificatie duurt meestal enkele minuten tot een paar uur. Zet meteen <strong>tweestapsverificatie (2FA)</strong> aan, bij voorkeur via een authenticator-app in plaats van sms. Dit is een van de belangrijkste en simpelste dingen die je kunt doen om je account te beveiligen.</p>
<h2>Stap 3: Stort geld via iDEAL</h2>
<p>Zodra je account geverifieerd is, stort je euro's. De meeste Nederlandse platforms ondersteunen <strong>iDEAL</strong>, waarmee je direct vanaf je bankrekening betaalt en het geld vrijwel meteen beschikbaar is. Andere opties zijn een SEPA-overschrijving (soms een dag vertraging) of een creditcard (vaak duurder). Hieronder de belangrijkste verschillen:</p>
<table>
<thead><tr><th>Methode</th><th>Snelheid</th><th>Kosten</th><th>Handig voor</th></tr></thead>
<tbody>
<tr><td>iDEAL</td><td>Vrijwel direct</td><td>Laag / geen</td><td>Nederlandse gebruikers, dagelijks gebruik</td></tr>
<tr><td>SEPA-overschrijving</td><td>Enkele uren tot 1 dag</td><td>Meestal geen</td><td>Grotere bedragen</td></tr>
<tr><td>Creditcard</td><td>Direct</td><td>Vaak hoger</td><td>Gemak, kleine bedragen</td></tr>
</tbody>
</table>
<p>Een belangrijke vuistregel: begin met een bedrag dat je kunt missen. Je hoeft geen hele munt te kopen, want crypto is deelbaar. Voor 25 of 50 euro bezit je al een fractie van een Bitcoin.</p>
<h2>Stap 4: Koop je eerste crypto</h2>
<p>Zoek de gewenste munt op, vul het bedrag in en bevestig. Je ziet vooraf hoeveel crypto je ontvangt en welke kosten je betaalt. Twee begrippen die je vaak tegenkomt:</p>
<ul>
<li><strong>Marktorder:</strong> je koopt direct tegen de actuele koers. Simpel en snel, ideaal voor beginners.</li>
<li><strong>Limietorder:</strong> je stelt zelf een prijs in; de order wordt pas uitgevoerd als de koers dat niveau bereikt. Handig als je gericht op een bepaalde prijs wilt kopen.</li>
</ul>
<p>Let ook op de <strong>spread</strong>: het verschil tussen de koop- en verkoopprijs. Samen met de handelskosten bepaalt dit wat je aankoop werkelijk kost. Nog niet zeker welke munt bij je past? Lees dan <a href="/kennisbank/welke-crypto-kopen">welke crypto kopen</a>.</p>
<h2>Hoeveel moet je inleggen, en wanneer?</h2>
<p>Dit is waar de meeste waarde zit, en waar techniek plaatsmaakt voor strategie. Een paar nuchtere uitgangspunten die veel ervaren gebruikers hanteren:</p>
<ul>
<li><strong>Spreiding in tijd (dollar-cost averaging):</strong> in plaats van in een keer een groot bedrag inleggen, koop je periodiek een vast, klein bedrag. Zo middel je je aankoopprijs uit en verklein je het risico van een slecht instapmoment. Meer hierover lees je in <a href="/kennisbank/wanneer-crypto-kopen">wanneer crypto kopen</a>.</li>
<li><strong>Alleen geld dat je kunt missen:</strong> cryptokoersen kunnen in korte tijd fors dalen. Historische stijgingen bieden geen enkele garantie voor de toekomst.</li>
<li><strong>Blijf kritisch:</strong> rendementbeloftes en "hete tips" op social media zijn zelden je vriend. Doe altijd eigen onderzoek.</li>
</ul>
<h2>Je crypto veilig bewaren</h2>
<p>Na aankoop staat je crypto standaard in de wallet van het platform. Voor kleine bedragen is dat prima en gemakkelijk. Bouw je een grotere positie op, dan kiezen veel mensen voor een <strong>eigen wallet</strong> waarbij ze zelf de sleutels beheren. De gouden regel: wie de sleutels (de <em>seed phrase</em>) beheert, beheert de crypto. Deel die woorden dus nooit, bewaar ze offline en nooit als screenshot of in de cloud. Een volledige uitleg vind je in onze gids <a href="/kennisbank/crypto-wallet-uitleg">crypto wallet uitleg</a>.</p>
<h2>Veelgemaakte beginnersfouten</h2>
<p>De grootste fouten zijn zelden technisch. Kopen uit angst iets te missen (FOMO), blind tips volgen, geen 2FA gebruiken en meer inleggen dan verantwoord is, kosten beginners het vaakst geld. We zetten de belangrijkste valkuilen op een rij in <a href="/kennisbank/crypto-kopen-beginner-valkuilen">crypto kopen als beginner: 7 valkuilen</a>.</p>
<h2>Conclusie</h2>
<p>Crypto kopen in Nederland is technisch eenvoudig: kies een geregistreerde aanbieder, verifieer je account, stort via iDEAL en koop. De belangrijkste beslissingen zijn strategisch: begin klein, spreid in de tijd, beveilig je account en bewaar grotere bedragen veilig. Zo geef je jezelf de beste uitgangspositie, met de risico's helder voor ogen. Dit artikel is voorlichting en geen beleggingsadvies: doe altijd je eigen onderzoek.</p>`,
    faqs: [
      { q: 'Is crypto kopen in Nederland legaal?', a: 'Ja, crypto kopen is legaal in Nederland. Aanbieders moeten geregistreerd zijn bij De Nederlandsche Bank en voldoen aan de Europese MiCA-regelgeving.' },
      { q: 'Hoeveel geld heb ik minimaal nodig om crypto te kopen?', a: 'Bij de meeste platforms kun je al vanaf enkele euro\'s beginnen, omdat crypto in kleine delen te koop is. Begin met een bedrag dat je volledig kunt missen.' },
      { q: 'Wat is de goedkoopste manier om crypto te kopen?', a: 'Let op de handelskosten (fees) en de spread van het platform, en stort bij voorkeur met iDEAL of SEPA in plaats van creditcard. Vergelijk aanbieders voordat je kiest, want de tarieven verschillen sterk.' },
      { q: 'Moet ik belasting betalen over crypto?', a: 'Ja, voor de meeste particulieren valt crypto in box 3 (vermogen). Je geeft de waarde op de peildatum (1 januari) op bij je aangifte. Lees meer in onze gids over crypto en belasting.' },
      { q: 'Hoe lang duurt het voordat ik kan kopen?', a: 'Na registratie en identiteitsverificatie (KYC), die meestal enkele minuten tot een paar uur duurt, en een iDEAL-storting kun je vrijwel direct je eerste crypto kopen.' },
      { q: 'Wat is de veiligste manier om crypto te bewaren?', a: 'Voor grotere bedragen wordt een hardware-wallet (cold wallet) als het veiligst beschouwd, omdat die offline blijft. Bewaar je seed phrase altijd veilig en offline, en deel hem nooit.' },
    ],
  },
  {
    slug: 'welke-crypto-kopen',
    imgCategory: 'altcoins',
    imgTags: ['coins', 'choice'],
    excerpt: 'Welke crypto kopen? Leer met een helder afwegingskader hoe je munten beoordeelt op nut, gebruik, team en risico, met de verschillen tussen Bitcoin, Ethereum, altcoins en stablecoins praktisch uitgelegd.',
    content: `<p>"Welke crypto moet ik kopen?" is misschien wel de meestgestelde vraag onder beginners, en tegelijk de vraag met het minst bevredigende antwoord. Er bestaat namelijk geen munt die voor iedereen de beste is. Wat wel bestaat, is een manier van denken waarmee je zelf een onderbouwde keuze maakt, in plaats van blind een tip van internet te volgen. Deze gids geeft je dat kader.</p>
<p><strong>Kort antwoord:</strong> beoordeel elke cryptomunt op vier vragen: welk probleem lost hij op, wordt hij in de praktijk gebruikt, wie zit erachter, en hoe groot is het risico. Begin bij de gevestigde namen (Bitcoin, Ethereum) en verdiep je pas later in kleinere altcoins.</p>
<h2>De vier hoofdcategorieen</h2>
<p>Duizenden munten laten zich grofweg indelen in vier groepen, elk met een eigen rol en risicoprofiel:</p>
<table>
<thead><tr><th>Type</th><th>Voorbeeld</th><th>Rol</th><th>Risico</th></tr></thead>
<tbody>
<tr><td>Bitcoin</td><td>BTC</td><td>Waardeopslag, "digitaal goud"</td><td>Relatief lager (binnen crypto)</td></tr>
<tr><td>Smart-contractplatforms</td><td>Ethereum (ETH)</td><td>Basis voor apps, DeFi, NFT's</td><td>Gemiddeld</td></tr>
<tr><td>Altcoins</td><td>Solana, Cardano, etc.</td><td>Uiteenlopende doelen</td><td>Hoger</td></tr>
<tr><td>Stablecoins</td><td>USDC, USDT</td><td>Gekoppeld aan de dollar</td><td>Laag in koers, maar tegenpartijrisico</td></tr>
</tbody>
</table>
<h2>Vier vragen om elke munt te beoordelen</h2>
<p>Loop voor elke munt die je overweegt deze vier vragen na. Kun je ze niet beantwoorden, dan weet je waarschijnlijk te weinig om erin te stappen.</p>
<ol>
<li><strong>Welk probleem lost het op?</strong> Een munt met een duidelijk doel (betalen, contracten uitvoeren, data opslaan) heeft bestaansrecht. Een munt zonder duidelijke functie is vooral speculatie.</li>
<li><strong>Wordt het echt gebruikt?</strong> Kijk verder dan de koers: hoeveel actieve gebruikers, transacties en toepassingen zijn er? Echte adoptie is een sterker signaal dan een stijgende grafiek.</li>
<li><strong>Wie zit erachter?</strong> Een transparant, ervaren en actief team met een heldere routekaart is een goed teken. Anonieme teams met grootse beloftes zijn een risico.</li>
<li><strong>Wat is het risico?</strong> Kleinere munten kunnen harder stijgen, maar ook veel harder dalen of zelfs volledig verdwijnen. Hoe kleiner en jonger, hoe groter het risico.</li>
</ol>
<h2>Memecoins: een aparte categorie</h2>
<p>Munten als Dogecoin of Shiba Inu ontlenen hun waarde vooral aan hype en gemeenschap, niet aan onderliggende techniek of gebruik. Ze kunnen spectaculair stijgen, maar net zo hard instorten. Zie ze als het meest speculatieve deel van de markt, en leg er nooit geld in dat je niet volledig kunt missen.</p>
<h2>Spreiding: nut en grens</h2>
<p>Spreiden over meerdere munten kan het risico verlagen, maar alleen als je begrijpt waarin je investeert. Spreiden over tien munten die je geen van alle kent, is geen strategie maar tien keer gokken. Veel mensen kiezen voor een kern van gevestigde munten, aangevuld met een klein deel voor kleinere projecten die ze bewust hebben onderzocht.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Voor de meeste beginners is het verstandig om te starten bij de gevestigde namen en pas later, met kennis van zaken, naar kleinere projecten te kijken. Investeer alleen in wat je begrijpt, en alleen met geld dat je kunt missen. Dit is geen beleggingsadvies: gebruik het kader hierboven en doe altijd je eigen onderzoek.</p>
<p>Weet je welke munt je wilt kopen? Volg dan het <a href="/kennisbank/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>. Twijfel je over het moment? Lees <a href="/kennisbank/wanneer-crypto-kopen">wanneer crypto kopen</a>.</p>`,
    faqs: [
      { q: 'Wat is de beste crypto om te kopen voor beginners?', a: 'Er is geen enkele "beste" munt. Veel beginners starten bij gevestigde namen als Bitcoin en Ethereum omdat die het meest bekend, gebruikt en liquide zijn, maar elke keuze blijft risicovol. Beoordeel elke munt op nut, gebruik, team en risico.' },
      { q: 'Wat is het verschil tussen Bitcoin en altcoins?', a: 'Bitcoin is de eerste en grootste cryptomunt, vaak gezien als waardeopslag. Altcoins zijn alle andere munten, met sterk uiteenlopende doelen en risicoprofielen.' },
      { q: 'Zijn memecoins een goede investering?', a: 'Memecoins ontlenen hun waarde vooral aan hype en gemeenschap, niet aan techniek of gebruik. Ze zijn zeer speculatief en risicovol; leg er nooit geld in dat je niet volledig kunt missen.' },
      { q: 'In hoeveel verschillende munten moet ik spreiden?', a: 'Spreiding kan het risico verlagen, maar alleen als je elke munt begrijpt. Veel mensen kiezen voor een kern van gevestigde munten met eventueel een klein deel voor bewust onderzochte kleinere projecten.' },
      { q: 'Wat zijn stablecoins?', a: 'Stablecoins zoals USDC zijn gekoppeld aan een stabiele waarde, meestal de Amerikaanse dollar. Ze schommelen nauwelijks in koers, maar kennen wel tegenpartij- en reserverisico\'s.' },
    ],
  },
  {
    slug: 'wat-is-bitvavo',
    imgCategory: 'marktanalyse',
    imgTags: ['smartphone', 'app'],
    excerpt: 'Wat is Bitvavo? Een uitgebreide uitleg over het Nederlandse crypto-platform: hoe het werkt, wat het kost, hoe veilig het is en waar je op moet letten voordat je begint.',
    content: `<p>Bitvavo is een van de bekendste crypto-platforms in Nederland. Wie zich orienteert op een eerste aankoop, komt de naam vrijwel zeker tegen. Maar wat is Bitvavo precies, hoe werkt het, wat kost het en waar moet je op letten? In deze uitleg zetten we het nuchter en volledig op een rij, zonder verkooppraatjes.</p>
<p><strong>Kort antwoord:</strong> Bitvavo is een in Amsterdam gevestigd handelsplatform waar je crypto kunt kopen, verkopen en bewaren. Het is in Nederland populair vanwege iDEAL-betalingen, een breed muntaanbod en relatief lage handelskosten.</p>
<h2>Hoe werkt Bitvavo?</h2>
<p>De werkwijze komt overeen met het algemene <a href="/kennisbank/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>. Je maakt een account aan, doorloopt de identificatie (KYC), stort euro's (bijvoorbeeld via iDEAL) en koopt daarmee crypto. Je kunt je munten op het platform laten staan of naar een eigen wallet sturen. Bitvavo biedt zowel een app als een website, met een overzichtelijke interface die op beginners is gericht.</p>
<h2>Wat kost Bitvavo?</h2>
<p>Platforms verdienen doorgaans aan <strong>handelskosten</strong> (een percentage per transactie) en soms aan opname- of stortingskosten. Bij Bitvavo betaal je een percentage per handel, dat afhangt van je handelsvolume: hoe meer je handelt, hoe lager het tarief. Daarnaast is er, net als bij elk platform, een <strong>spread</strong>: het kleine verschil tussen de koop- en verkoopprijs.</p>
<p>Belangrijk: tarieven veranderen regelmatig. Controleer de actuele kosten altijd op de officiele website voordat je begint. Bij veel of grote transacties tikken kosten sneller aan dan je denkt, dus reken het voor jouw situatie door.</p>
<h2>Is Bitvavo veilig?</h2>
<p>Bitvavo moet voldoen aan de Nederlandse en Europese regels (DNB-registratie en MiCA) en past standaard beveiligingsmaatregelen toe, zoals tweestapsverificatie. Toch is een groot deel van de veiligheid afhankelijk van jou:</p>
<ul>
<li>Zet <strong>tweestapsverificatie (2FA)</strong> aan, bij voorkeur met een authenticator-app.</li>
<li>Gebruik een sterk, uniek wachtwoord dat je nergens anders gebruikt.</li>
<li>Overweeg voor grotere bedragen een eigen <a href="/kennisbank/crypto-wallet-uitleg">crypto wallet</a> in plaats van alles op het platform te laten staan.</li>
</ul>
<h2>Voor- en nadelen op een rij</h2>
<table>
<thead><tr><th>Voordelen</th><th>Aandachtspunten</th></tr></thead>
<tbody>
<tr><td>iDEAL-betalingen, direct storten</td><td>Kosten kunnen bij veel handelen oplopen</td></tr>
<tr><td>Breed muntaanbod</td><td>Groot aanbod kan beginners verleiden tot speculatie</td></tr>
<tr><td>Overzichtelijke app, Nederlandstalig</td><td>Tegoed op een platform is niet hetzelfde als in eigen beheer</td></tr>
</tbody>
</table>
<h2>Wat betekent dit voor jou?</h2>
<p>Bitvavo is voor veel Nederlanders een toegankelijk startpunt, maar "populair" betekent niet automatisch "het beste voor jouw situatie". Vergelijk het met andere aanbieders op kosten, aanbod en gebruiksgemak via onze <a href="/exchanges">exchange-vergelijking</a> en lees <a href="/kennisbank/beste-crypto-exchange-nederland">waar je op let bij het kiezen</a>. Dit artikel is voorlichting, geen aanbeveling of beleggingsadvies.</p>`,
    faqs: [
      { q: 'Is Bitvavo veilig?', a: 'Bitvavo moet voldoen aan Nederlandse en Europese regels en past standaard beveiligingsmaatregelen toe. Je eigen beveiliging is minstens zo belangrijk: gebruik tweestapsverificatie en een sterk, uniek wachtwoord.' },
      { q: 'Kan ik bij Bitvavo met iDEAL betalen?', a: 'Ja, iDEAL is een van de redenen dat Bitvavo populair is bij Nederlandse gebruikers, omdat je direct vanaf je bankrekening kunt storten.' },
      { q: 'Wat kost handelen bij Bitvavo?', a: 'Je betaalt een percentage per transactie, dat lager wordt naarmate je meer handelt, plus een spread. Tarieven wijzigen regelmatig, dus controleer de actuele kosten op de officiele website.' },
      { q: 'Is Bitvavo geschikt voor beginners?', a: 'De app is overzichtelijk en Nederlandstalig, wat het toegankelijk maakt voor beginners. Begin klein, zet 2FA aan en doe eigen onderzoek voordat je grotere bedragen inlegt.' },
      { q: 'Moet ik mijn crypto op Bitvavo laten staan?', a: 'Voor kleine bedragen is dat meestal prima. Voor grotere bedragen kiezen veel mensen voor een eigen wallet, zodat ze zelf de sleutels beheren.' },
    ],
  },
  {
    slug: 'bitcoin-kopen-stappenplan',
    imgCategory: 'bitcoin',
    imgTags: ['coin', 'payment'],
    excerpt: 'Bitcoin kopen als beginner: een volledig stappenplan voor Nederland, met uitleg over kosten, het kopen van een deel van een bitcoin, en hoe je je BTC daarna veilig bewaart.',
    content: `<p>Bitcoin is voor veel mensen de eerste kennismaking met crypto. Het is de oudste en bekendste cryptomunt, met het langste trackrecord, en wordt vaak omschreven als "digitaal goud". Wil je bitcoin kopen maar weet je niet waar te beginnen? Deze gids loopt het complete proces met je door en beantwoordt de vragen die beginners het vaakst hebben.</p>
<p><strong>Kort antwoord:</strong> je koopt bitcoin via een geregistreerd platform. Je maakt een account aan, doorloopt de identificatie, stort euro's (bijvoorbeeld via iDEAL) en koopt daarmee BTC. Je hoeft geen hele bitcoin te kopen: een klein deel kan ook.</p>
${stepsSVG('Bitcoin kopen in 4 stappen', ['Account aanmaken', 'Identificatie (KYC)', 'Euro storten', 'Bitcoin kopen'])}
<h2>Waarom mensen bitcoin kopen</h2>
<p>Bitcoin heeft een vast maximum van 21 miljoen munten, wat het schaars maakt. Voorstanders zien het als bescherming tegen geldontwaarding en als een onafhankelijke, wereldwijde waardeopslag. Tegelijk is de koers zeer volatiel en zijn er geen garanties. Begrijp waarom je koopt voordat je begint, dat helpt je rustig te blijven als de koers beweegt.</p>
<h2>Een deel van een bitcoin kopen</h2>
<p>Een hardnekkig misverstand is dat je een hele bitcoin moet kopen. Dat hoeft niet: bitcoin is deelbaar tot acht decimalen. De kleinste eenheid heet een <strong>satoshi</strong> (0,00000001 BTC). Je kunt dus prima voor 25 of 50 euro instappen en een fractie van een bitcoin bezitten. Dit maakt bitcoin toegankelijk, ongeacht je budget.</p>
<h2>Wat kost bitcoin kopen?</h2>
<p>Je betaalt op twee manieren:</p>
<ul>
<li><strong>Handelskosten (fees):</strong> een percentage van je aankoop dat het platform rekent.</li>
<li><strong>Spread:</strong> het verschil tussen de koop- en verkoopprijs.</li>
</ul>
<p>Daarnaast kunnen er <strong>netwerkkosten</strong> zijn als je bitcoin naar een eigen wallet stuurt. Vergelijk de tarieven van aanbieders voordat je kiest, want ze lopen uiteen.</p>
<h2>Je bitcoin veilig bewaren</h2>
<p>Na aankoop staat je bitcoin op het platform. Voor kleine bedragen is dat prima. Voor grotere bedragen kiezen veel mensen voor een eigen wallet, zodat ze zelf de sleutels beheren. Een hardware-wallet (cold wallet) die offline blijft, geldt als de veiligste optie voor langere bewaring. Lees hoe dat werkt in <a href="/kennisbank/crypto-wallet-uitleg">crypto wallet uitleg</a>.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Bitcoin blijft ondanks zijn bekendheid een risicovolle en volatiele belegging. De koers kan in korte tijd fors bewegen. Veel mensen kiezen daarom voor periodiek een klein bedrag inleggen (<a href="/kennisbank/wanneer-crypto-kopen">spreiden in de tijd</a>) in plaats van in een keer een groot bedrag. Leg alleen in wat je kunt missen en doe eigen onderzoek. Dit is geen beleggingsadvies.</p>
<p>Wil je het bredere plaatje? Lees het algemene <a href="/kennisbank/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a> of ontdek <a href="/kennisbank/welke-crypto-kopen">welke crypto bij je past</a>.</p>`,
    faqs: [
      { q: 'Moet ik een hele bitcoin kopen?', a: 'Nee. Bitcoin is deelbaar tot acht decimalen (de kleinste eenheid heet een satoshi), dus je kunt al voor een klein bedrag een fractie van een bitcoin kopen.' },
      { q: 'Waar kan ik het beste bitcoin kopen in Nederland?', a: 'Via een bij DNB geregistreerd platform dat iDEAL ondersteunt. Vergelijk aanbieders op kosten, aanbod en gebruiksgemak voordat je kiest.' },
      { q: 'Wat kost het om bitcoin te kopen?', a: 'Je betaalt handelskosten (een percentage) en een spread aan het platform, en soms netwerkkosten als je bitcoin naar een eigen wallet stuurt. Tarieven verschillen per aanbieder.' },
      { q: 'Hoe bewaar ik mijn bitcoin veilig?', a: 'Voor kleine bedragen volstaat de wallet van het platform. Voor grotere bedragen wordt een eigen hardware-wallet (cold wallet) als veiliger beschouwd, omdat je zelf de sleutels beheert.' },
      { q: 'Is bitcoin een goede investering?', a: 'Bitcoin is volatiel en er zijn geen garanties; historische stijgingen zeggen niets over de toekomst. Of het bij je past hangt af van je doelen en risicobereidheid. Leg alleen in wat je kunt missen en doe eigen onderzoek.' },
    ],
  },
  {
    slug: 'wanneer-crypto-kopen',
    imgCategory: 'marktanalyse',
    imgTags: ['chart', 'clock'],
    excerpt: 'Wanneer crypto kopen? De markt perfect timen lukt vrijwel niemand. Ontdek waarom spreiden in de tijd (dollar-cost averaging) voor de meeste mensen verstandiger is, met een rekenvoorbeeld.',
    content: `<p>"Moet ik nu instappen of nog even wachten?" Bijna iedereen stelt zich die vraag voordat hij crypto koopt. De verleiding is groot om te wachten op "de dip" of juist te kopen als alles stijgt. In deze gids leggen we uit waarom timing zo lastig is, en welke nuchtere aanpak veel ervaren beleggers daarom kiezen.</p>
<p><strong>Kort antwoord:</strong> de markt perfect timen lukt vrijwel niemand, ook professionals niet. Een veelgebruikte aanpak is spreiden in de tijd: periodiek een vast bedrag inleggen, ongeacht de koers. Zo hoef je niet te gokken op het ideale moment en haal je emotie uit je beslissingen.</p>
<h2>Waarom timing zo moeilijk is</h2>
<p>Cryptokoersen worden bewogen door nieuws, sentiment en gebeurtenissen die niemand vooraf kent. Wie wacht op de "bodem", mist vaak de stijging die eraan voorafgaat; wie koopt op de "top", schrikt van de daling erna. Bovendien speelt emotie een grote rol: <strong>angst</strong> (om te verliezen) en <strong>hebzucht</strong> (om winst te missen, FOMO) leiden zelden tot goede beslissingen. Zelfs professionele handelaren slagen er structureel niet in de markt consequent goed te timen.</p>
<h2>Dollar-cost averaging: spreiden in de tijd</h2>
<p>Bij <strong>dollar-cost averaging (DCA)</strong> koop je met vaste tussenpozen een vast bedrag, bijvoorbeeld elke maand voor 50 euro. Soms koop je duur, soms goedkoop, maar gemiddeld middel je je aankoopprijs uit. Het grote voordeel: je hoeft de markt niet te voorspellen, je bouwt gedisciplineerd op, en je haalt emotie uit het proces.</p>
${stepsSVG('Zo werkt spreiden in de tijd (DCA)', ['Kies vast bedrag', 'Kies vaste periode', 'Koop automatisch', 'Prijs middelt uit'])}
<h3>Een eenvoudig rekenvoorbeeld</h3>
<p>Stel je koopt drie maanden lang elke maand voor 100 euro, terwijl de koers beweegt:</p>
<table>
<thead><tr><th>Maand</th><th>Koers</th><th>Ingelegd</th><th>Aangekocht</th></tr></thead>
<tbody>
<tr><td>1</td><td>100</td><td>100</td><td>1,00</td></tr>
<tr><td>2</td><td>50</td><td>100</td><td>2,00</td></tr>
<tr><td>3</td><td>80</td><td>100</td><td>1,25</td></tr>
</tbody>
</table>
<p>Je legde 300 euro in en kocht 4,25 eenheden: een gemiddelde prijs van circa 70,6 per eenheid, terwijl de gemiddelde koers 76,7 was. Doordat je meer kocht toen het goedkoop was, valt je gemiddelde aankoopprijs lager uit. Dat is het idee achter spreiden.</p>
<h2>Wanneer is een keer inleggen logischer?</h2>
<p>Spreiden is geen wet. Wie een bedrag heeft dat toch bedoeld is voor de lange termijn, kan er ook voor kiezen dat ineens in te leggen. Statistisch gezien levert dat soms meer op, maar het voelt risicovoller en vergt een sterke maag als de koers direct daalt. De juiste keuze hangt af van je risicobereidheid en je horizon.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>In plaats van je af te vragen <em>wanneer</em> je moet kopen, is de nuttigere vraag vaak <em>hoeveel</em> je verantwoord kunt en wilt inleggen, en over welke periode. Leg alleen in wat je kunt missen en houd er rekening mee dat koersen fors kunnen dalen. Historische stijgingen bieden geen garantie. Dit is geen beleggingsadvies: doe altijd eigen onderzoek.</p>
<p>Klaar om te beginnen? Bekijk het <a href="/kennisbank/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a> en lees welke <a href="/kennisbank/crypto-kopen-beginner-valkuilen">valkuilen beginners</a> het beste kunnen vermijden.</p>`,
    faqs: [
      { q: 'Wat is het beste moment om crypto te kopen?', a: 'Er is geen betrouwbaar "beste" moment; de markt perfect timen lukt vrijwel niemand. Veel mensen spreiden hun aankopen daarom in de tijd in plaats van te wachten op het ideale moment.' },
      { q: 'Wat is dollar-cost averaging (DCA)?', a: 'DCA is periodiek een vast bedrag inleggen, ongeacht de koers. Zo middel je je aankoopprijs uit, bouw je gedisciplineerd op en verklein je het risico van een slecht instapmoment.' },
      { q: 'Moet ik wachten op een koersdaling voordat ik koop?', a: 'Wachten op "de dip" klinkt logisch, maar die is vooraf vrijwel niet te voorspellen. Spreiden in de tijd is voor veel mensen een nuchtere alternatieve aanpak.' },
      { q: 'Is het beter om alles in een keer of gespreid in te leggen?', a: 'Beide kan. Ineens inleggen levert statistisch soms meer op maar voelt risicovoller; spreiden verlaagt het risico van slechte timing. De keuze hangt af van je horizon en risicobereidheid.' },
      { q: 'Kan ik spreiden automatiseren?', a: 'Sommige platforms bieden periodieke automatische aankopen aan. Controleer de kosten daarvan, want ook automatische aankopen brengen handelskosten met zich mee.' },
    ],
  },
  {
    slug: 'crypto-kopen-beginner-valkuilen',
    imgCategory: 'nieuws',
    imgTags: ['warning', 'learning'],
    excerpt: 'De 7 grootste valkuilen voor crypto-beginners, van FOMO en hete tips tot slechte beveiliging, met per valkuil een concrete oplossing zodat je ze zelf voorkomt.',
    content: `<p>De meeste beginnersfouten in crypto zijn niet technisch, maar menselijk. Ze kosten mensen geld dat met een beetje voorbereiding bespaard had kunnen blijven. Hieronder de zeven veelgemaakte valkuilen, en per valkuil een concrete manier om hem te vermijden.</p>
<p><strong>Kort antwoord:</strong> de grootste valkuilen zijn handelen op emotie (FOMO), blind tips volgen, slechte beveiliging en meer inleggen dan je kunt missen. Een nuchter plan, goede beveiliging en eigen onderzoek voorkomen de meeste problemen.</p>
<h2>1. Kopen uit FOMO</h2>
<p><strong>Het probleem:</strong> FOMO ("fear of missing out") zorgt ervoor dat mensen kopen als de koers al hard is gestegen, uit angst iets te missen. Juist dan is het risico op een daling groot.<br><strong>De oplossing:</strong> maak vooraf een plan (welk bedrag, welke munt, welke periode) en houd je eraan. Laat je niet opjagen door een stijgende grafiek.</p>
<h2>2. Blind hete tips volgen</h2>
<p><strong>Het probleem:</strong> "Deze munt gaat 100x!" Rendementbeloftes op social media zijn vaak marketing, of erger, manipulatie ("pump and dump").<br><strong>De oplossing:</strong> volg nooit blind een tip. Onderzoek zelf waar een munt voor staat aan de hand van een vast <a href="/kennisbank/welke-crypto-kopen">afwegingskader</a>.</p>
<h2>3. Alles op het platform laten staan</h2>
<p><strong>Het probleem:</strong> tegoed op een exchange is niet volledig in eigen beheer.<br><strong>De oplossing:</strong> voor kleine bedragen is dat prima, maar voor grotere bedragen is een eigen <a href="/kennisbank/crypto-wallet-uitleg">crypto wallet</a> veiliger.</p>
<h2>4. Geen tweestapsverificatie</h2>
<p><strong>Het probleem:</strong> een account met alleen een wachtwoord is kwetsbaar.<br><strong>De oplossing:</strong> zet 2FA aan, bij voorkeur met een authenticator-app in plaats van sms. Het is een van de simpelste en belangrijkste maatregelen.</p>
<h2>5. Meer inleggen dan je kunt missen</h2>
<p><strong>Het probleem:</strong> crypto is volatiel; wie geld inlegt dat hij nodig heeft, komt in de problemen bij een daling.<br><strong>De oplossing:</strong> leg nooit geld in dat je op korte termijn nodig hebt of niet kunt verliezen.</p>
<h2>6. Koersen najagen en overhandelen</h2>
<p><strong>Het probleem:</strong> voortdurend kopen en verkopen op dagkoersen leidt zelden tot betere resultaten en kost extra aan handelskosten en spread.<br><strong>De oplossing:</strong> overweeg <a href="/kennisbank/wanneer-crypto-kopen">spreiden in de tijd</a> en een langere horizon.</p>
<h2>7. Geen eigen onderzoek doen</h2>
<p><strong>Het probleem:</strong> investeren in iets dat je niet begrijpt.<br><strong>De oplossing:</strong> de belangrijkste vuistregel: investeer alleen in wat je begrijpt. Neem de tijd om te leren voordat je grotere bedragen inlegt, bijvoorbeeld met de rest van deze kennisbank.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Vrijwel al deze valkuilen komen neer op geduld en discipline. Begin klein, beveilig je accounts goed en laat je niet leiden door emotie of hype. Dit artikel is voorlichting en geen beleggingsadvies.</p>
<p>Klaar voor stap een? Lees het <a href="/kennisbank/crypto-kopen-nederland-stappenplan">complete stappenplan</a>.</p>`,
    faqs: [
      { q: 'Wat is de grootste fout die crypto-beginners maken?', a: 'Handelen op emotie, vooral kopen uit FOMO wanneer de koers al hard is gestegen. Een nuchter plan en spreiden in de tijd helpen dit te voorkomen.' },
      { q: 'Wat is een pump and dump?', a: 'Een pump and dump is een vorm van marktmanipulatie waarbij een munt kunstmatig wordt opgehypet zodat insiders duur kunnen verkopen, waarna de koers instort. Wees kritisch op "hete tips" die grote winst beloven.' },
      { q: 'Is het veilig om mijn crypto op een platform te laten staan?', a: 'Voor kleine bedragen is dat meestal prima. Voor grotere bedragen wordt een eigen wallet aangeraden, zodat je zelf de sleutels beheert.' },
      { q: 'Hoeveel geld moet ik als beginner inleggen?', a: 'Alleen een bedrag dat je volledig kunt missen. Crypto is volatiel en je kunt (een deel van) je inleg verliezen.' },
      { q: 'Hoe bescherm ik mijn account het beste?', a: 'Zet tweestapsverificatie (2FA) aan met een authenticator-app, gebruik een sterk en uniek wachtwoord, en wees alert op phishing-mails en nepwebsites.' },
    ],
  },
  {
    slug: 'beste-crypto-exchange-nederland',
    imgCategory: 'marktanalyse',
    imgTags: ['comparison', 'laptop'],
    excerpt: 'De beste crypto exchange in Nederland bestaat niet voor iedereen. Leer op welke zeven punten je platforms vergelijkt: kosten, aanbod, beveiliging, iDEAL, gebruiksgemak, support en toezicht.',
    content: `<p>"Wat is de beste crypto exchange?" is een logische vraag, maar het antwoord hangt af van jouw situatie. Iemand die eenmalig een klein bedrag inlegt en lang vasthoudt, let op andere dingen dan iemand die vaak handelt. In deze gids leggen we uit op welke punten je platforms objectief vergelijkt, zodat je zelf de beste keuze maakt.</p>
<p><strong>Kort antwoord:</strong> er is geen enkele beste exchange voor iedereen. Vergelijk op kosten, aanbod, beveiliging, betaalmethoden, gebruiksgemak, support en toezicht, en kies wat bij jouw manier van gebruiken past.</p>
<h2>Zeven punten om op te vergelijken</h2>
<ol>
<li><strong>Kosten:</strong> handelskosten (fees) en de spread verschillen sterk en tikken bij veel handelen flink aan. Reken het door voor jouw verwachte gebruik.</li>
<li><strong>Aanbod:</strong> hoeveel en welke munten kun je kopen? Voor beginners is een degelijk, overzichtelijk aanbod vaak prettiger dan honderden tokens.</li>
<li><strong>Beveiliging:</strong> biedt het platform 2FA, en hoe worden tegoeden bewaard en beschermd?</li>
<li><strong>Betaalmethoden:</strong> wordt iDEAL ondersteund? Voor Nederlandse gebruikers is dat het handigst en meestal het goedkoopst.</li>
<li><strong>Gebruiksgemak:</strong> is de app overzichtelijk, ook voor beginners?</li>
<li><strong>Support:</strong> is er (Nederlandstalige) klantenservice als er iets misgaat?</li>
<li><strong>Toezicht en registratie:</strong> voldoet het platform aan de Nederlandse (DNB) en Europese (MiCA) regels?</li>
</ol>
<h2>Type gebruiker bepaalt de keuze</h2>
<table>
<thead><tr><th>Jij bent...</th><th>Let vooral op</th></tr></thead>
<tbody>
<tr><td>Beginner, klein bedrag, lange termijn</td><td>Gebruiksgemak, iDEAL, beveiliging</td></tr>
<tr><td>Actieve handelaar</td><td>Lage handelskosten, kleine spread, aanbod</td></tr>
<tr><td>Gericht op specifieke altcoins</td><td>Muntaanbod, liquiditeit</td></tr>
</tbody>
</table>
<h2>Bekende aanbieders in Nederland</h2>
<p>Voor Nederlandse gebruikers zijn onder andere Bitvavo, Kraken en Coinbase bekende namen. Ze verschillen in kosten, aanbod en gebruiksgemak. Lees bijvoorbeeld onze uitleg <a href="/kennisbank/wat-is-bitvavo">wat is Bitvavo</a>, en bekijk de volledige naast-elkaar-vergelijking op onze <a href="/exchanges">exchange-pagina</a>.</p>
<h2>Waarschuwingssignalen</h2>
<p>Blijf weg bij platforms die rendement garanderen, die geen duidelijke registratie of vergunning tonen, of die je onder tijdsdruk zetten. Betrouwbare aanbieders zijn transparant over kosten, risico's en toezicht.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>Kies niet op basis van een reclame of een enkele review, maar op basis van jouw eigen wensen: hoe vaak handel je, welke munten wil je, en hoe belangrijk is gebruiksgemak versus lage kosten? Begin eventueel bij een toegankelijk, goed gereguleerd platform en heroverweeg later als je behoeften veranderen. Dit is geen aanbeveling of beleggingsadvies.</p>`,
    faqs: [
      { q: 'Wat is de beste crypto exchange in Nederland?', a: 'Er is geen enkele beste exchange voor iedereen. Welke het beste past, hangt af van kosten, aanbod, beveiliging, betaalmethoden en hoe vaak je handelt.' },
      { q: 'Welke exchanges ondersteunen iDEAL?', a: 'Diverse in Nederland populaire platforms ondersteunen iDEAL, waaronder Bitvavo. Controleer de betaalmethoden altijd op de officiele website van het platform.' },
      { q: 'Waar moet ik op letten bij het kiezen van een exchange?', a: 'Op kosten, muntaanbod, beveiliging (zoals 2FA), betaalmethoden, gebruiksgemak, support en of het platform aan de Nederlandse en Europese regels voldoet.' },
      { q: 'Zijn buitenlandse exchanges veilig om te gebruiken?', a: 'Kies bij voorkeur platforms die aan de Nederlandse en Europese regelgeving voldoen. Bij aanbieders zonder duidelijk toezicht loop je meer risico; wees daar extra kritisch.' },
      { q: 'Kan ik meerdere exchanges tegelijk gebruiken?', a: 'Ja, dat kan. Sommige mensen gebruiken het ene platform voor gemak en een ander voor een breder aanbod of lagere kosten. Houd wel het overzicht en beveilig elk account goed.' },
    ],
  },
  {
    slug: 'crypto-kopen-met-ideal',
    imgCategory: 'nieuws',
    imgTags: ['smartphone', 'banking'],
    excerpt: 'Crypto kopen met iDEAL is voor Nederlanders de snelste en vertrouwdste manier om te storten. Lees stap voor stap hoe het werkt, wat het kost en waar je op let.',
    content: `<p>iDEAL is voor Nederlanders de meest vertrouwde manier om online te betalen, en dat geldt ook voor crypto. Wil je crypto kopen met iDEAL? In deze gids leggen we uit hoe het precies werkt, wat het kost en waarom zoveel platforms het aanbieden.</p>
<p><strong>Kort antwoord:</strong> je stort met iDEAL direct vanaf je Nederlandse bankrekening euro's op een crypto-platform, en koopt daar vervolgens crypto mee. Veel in Nederland actieve platforms ondersteunen iDEAL, wat het snel en laagdrempelig maakt.</p>
<h2>Zo werkt crypto kopen met iDEAL</h2>
${stepsSVG('Crypto kopen met iDEAL', ['Account + verificatie', 'Kies iDEAL + je bank', 'Bevestig in bank-app', 'Koop crypto'])}
<ol>
<li>Maak een account aan bij een geregistreerd platform en doorloop de identificatie (KYC).</li>
<li>Kies bij "storten" voor iDEAL en selecteer je bank.</li>
<li>Bevestig de betaling in je eigen bank-app; het bedrag staat vrijwel direct op je account.</li>
<li>Koop met dat saldo de crypto van je keuze.</li>
</ol>
<h2>Wat kost het?</h2>
<p>Sommige platforms rekenen geen of lage stortingskosten voor iDEAL, andere wel. Daarnaast betaal je <strong>handelskosten</strong> en een <strong>spread</strong> bij de aankoop zelf. iDEAL is doorgaans goedkoper dan een creditcardbetaling. Controleer de actuele tarieven altijd op de officiele website van het platform.</p>
<h2>Waarom iDEAL zo populair is</h2>
<ul>
<li><strong>Snel:</strong> het geld is meestal direct beschikbaar, zodat je meteen kunt kopen.</li>
<li><strong>Vertrouwd:</strong> je betaalt in je eigen bankomgeving, zonder kaartgegevens te delen.</li>
<li><strong>Laagdrempelig:</strong> geen extra rekeningen of tussenpartijen nodig.</li>
</ul>
<p>Meer over het hele proces lees je in het <a href="/kennisbank/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>.</p>
<h2>Veilig betalen met iDEAL</h2>
<p>De iDEAL-betaling zelf verloopt via je vertrouwde bank, maar blijf alert op <strong>phishing</strong>. Controleer altijd of je op de echte website of app van het platform zit voordat je een betaling start, en klik niet op iDEAL-links in onverwachte e-mails. Zet daarnaast tweestapsverificatie op je crypto-account.</p>
<h2>Wat betekent dit voor jou?</h2>
<p>iDEAL maakt de instap eenvoudig en snel, maar de aankoop zelf blijft een risicovolle belegging. Leg alleen in wat je kunt missen en doe eigen onderzoek. Dit is geen beleggingsadvies.</p>`,
    faqs: [
      { q: 'Kan ik crypto kopen met iDEAL?', a: 'Ja. Veel in Nederland actieve platforms ondersteunen iDEAL, waarmee je direct vanaf je bankrekening stort en vervolgens crypto koopt.' },
      { q: 'Is crypto kopen met iDEAL veilig?', a: 'De betaling verloopt via je eigen vertrouwde bankomgeving. Zorg daarnaast zelf voor een goed beveiligd account met tweestapsverificatie en let op phishing.' },
      { q: 'Kost crypto kopen met iDEAL extra geld?', a: 'Sommige platforms rekenen geen of lage stortingskosten voor iDEAL, andere wel. Daarnaast betaal je handelskosten en een spread bij de aankoop. Controleer de actuele tarieven.' },
      { q: 'Hoe snel staat mijn iDEAL-storting op mijn account?', a: 'Meestal vrijwel direct, waarna je meteen crypto kunt kopen. Dat is een van de redenen dat iDEAL zo populair is bij Nederlandse gebruikers.' },
      { q: 'Is iDEAL goedkoper dan met creditcard betalen?', a: 'Doorgaans wel. Creditcardbetalingen brengen vaak hogere kosten met zich mee dan iDEAL of een SEPA-overschrijving.' },
    ],
  },
  {
    slug: 'crypto-belasting-nederland',
    imgCategory: 'regulering',
    imgTags: ['tax', 'documents'],
    excerpt: 'Hoe werkt belasting op crypto in Nederland? Voor de meeste particulieren valt crypto in box 3. Lees hoe de peildatum werkt, wanneer andere regels gelden en hoe je je aangifte voorbereidt.',
    content: `<p>Bezit je crypto, dan krijg je vroeg of laat te maken met de Belastingdienst. Hoe zit dat precies in Nederland? In deze gids leggen we de hoofdlijnen nuchter uit. Let op: belastingregels veranderen en ieders situatie is anders. Dit is algemene voorlichting en geen fiscaal advies. Raadpleeg voor zekerheid de Belastingdienst of een adviseur.</p>
<p><strong>Kort antwoord:</strong> voor de meeste particulieren valt crypto in box 3 (vermogen). Je geeft de waarde van je crypto op de peildatum, 1 januari, op bij je aangifte. Je wordt dus belast op basis van je vermogen, niet rechtstreeks op je behaalde winst.</p>
<h2>Crypto valt meestal in box 3</h2>
<p>Box 3 gaat over je vermogen: spaargeld, beleggingen en dus ook crypto. De Belastingdienst kijkt naar de totale waarde van je bezittingen op <strong>1 januari</strong> van het belastingjaar. Die waarde geef je op. Anders dan bij bijvoorbeeld winst uit onderneming word je in box 3 belast volgens de geldende vermogenssystematiek, niet direct op de winst die je met je crypto hebt gemaakt.</p>
<h2>De peildatum: 1 januari</h2>
<p>Omdat de peildatum 1 januari is, telt de waarde van je crypto op dat ene moment. Koersschommelingen gedurende het jaar zijn voor box 3 in beginsel niet bepalend. Verkoop je bijvoorbeeld in maart met winst en geef je dat geld uit, dan telt dat niet meer mee op de volgende peildatum. Houd wel altijd een goed overzicht bij.</p>
<h2>Wanneer gelden er andere regels?</h2>
<p>Niet elke situatie past netjes in box 3. Er kunnen andere regels gelden als je:</p>
<ul>
<li><strong>zeer actief handelt</strong> op een manier die op ondernemen lijkt;</li>
<li><strong>op grote schaal mint of staket</strong> als bron van inkomen;</li>
<li><strong>crypto als beloning voor werk</strong> ontvangt (dan kan het loon/box 1 zijn);</li>
<li><strong>als ondernemer</strong> crypto in je bedrijf gebruikt.</li>
</ul>
<p>Twijfel je in welke categorie jouw situatie valt? Raadpleeg dan de Belastingdienst of een fiscaal adviseur.</p>
<h2>Zo bereid je je aangifte voor</h2>
<ul>
<li>Houd een <strong>overzicht</strong> bij van welke munten je bezit en hoeveel.</li>
<li>Noteer de <strong>waarde op 1 januari</strong> (veel platforms bieden hiervoor een jaaroverzicht).</li>
<li>Bewaar exports en transactiegeschiedenis, ook van eigen wallets.</li>
<li>Reken alle bezittingen samen: crypto op platforms en in eigen wallets tellen allebei mee.</li>
</ul>
<h2>Wat betekent dit voor jou?</h2>
<p>Houd gedurende het jaar een overzicht bij van je crypto, dat maakt je aangifte een stuk makkelijker en betrouwbaarder. Reken niet op deze tekst als definitief advies: de regels wijzigen regelmatig en je eigen situatie is leidend. Raadpleeg voor zekerheid altijd de Belastingdienst.</p>
<p>Wil je eerst weten hoe je begint? Lees het <a href="/kennisbank/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>.</p>`,
    faqs: [
      { q: 'In welke box valt crypto in Nederland?', a: 'Voor de meeste particulieren valt crypto in box 3 (vermogen). Bij actief handelen als onderneming, minen/staken als inkomstenbron of crypto als loon kunnen andere regels gelden.' },
      { q: 'Over welke datum moet ik mijn crypto opgeven?', a: 'Voor box 3 telt de waarde van je crypto op de peildatum: 1 januari van het belastingjaar.' },
      { q: 'Betaal ik belasting over mijn cryptowinst?', a: 'In box 3 word je belast volgens de geldende vermogenssystematiek, niet rechtstreeks over de behaalde winst. Bij bijzondere situaties kan dat anders zijn; raadpleeg de Belastingdienst.' },
      { q: 'Moet ik crypto in mijn eigen wallet ook opgeven?', a: 'Ja. Alle crypto telt mee voor je vermogen, of het nu op een platform of in een eigen wallet staat. Houd van beide een overzicht bij.' },
      { q: 'Wat als ik vergeten ben mijn crypto op te geven?', a: 'Neem contact op met de Belastingdienst of een adviseur om dit recht te zetten. Het is verstandig dit tijdig te corrigeren; wacht niet af.' },
    ],
  },
  {
    slug: 'crypto-wallet-uitleg',
    imgCategory: 'nieuws',
    imgTags: ['hardware', 'security'],
    excerpt: 'Wat is een crypto wallet en welke soorten zijn er? Een complete uitleg over hot en cold wallets, private keys en je seed phrase, zodat je je crypto veilig bewaart.',
    content: `<p>Zodra je crypto bezit, wil je die veilig bewaren. Daarvoor gebruik je een wallet. Maar wat is een crypto wallet precies, en welke soorten zijn er? En wat is nu eigenlijk die "seed phrase" waar iedereen het over heeft? In deze gids leggen we het helder en volledig uit.</p>
<p><strong>Kort antwoord:</strong> een crypto wallet bewaart niet de munten zelf, maar de digitale sleutels waarmee je erbij kunt. Er zijn hot wallets (verbonden met internet, handig voor dagelijks gebruik) en cold wallets (offline, veiliger voor grotere bedragen).</p>
${stepsSVG('Twee soorten wallets', ['Hot wallet: online', 'Handig, klein bedrag', 'Cold wallet: offline', 'Veilig, groot bedrag'])}
<h2>Wat is een crypto wallet precies?</h2>
<p>Een veelvoorkomend misverstand is dat je crypto "in" je wallet zit. Dat is niet zo. Je munten staan altijd op de <strong>blockchain</strong>; je wallet beheert de <strong>private keys</strong>, de sleutels die bewijzen dat de crypto van jou is en waarmee je transacties ondertekent. Verlies je je sleutels, dan verlies je de toegang tot je crypto, ook al staan de munten nog gewoon op de blockchain. Vandaar dat veilige opslag van die sleutels zo belangrijk is.</p>
<h2>Hot wallet versus cold wallet</h2>
<table>
<thead><tr><th></th><th>Hot wallet</th><th>Cold wallet</th></tr></thead>
<tbody>
<tr><td>Vorm</td><td>App of exchange-wallet</td><td>Fysiek apparaat (hardware)</td></tr>
<tr><td>Verbinding</td><td>Online</td><td>Offline</td></tr>
<tr><td>Gemak</td><td>Hoog</td><td>Iets omslachtiger</td></tr>
<tr><td>Veiligheid</td><td>Voldoende voor kleine bedragen</td><td>Hoog, voor grotere bedragen</td></tr>
</tbody>
</table>
<p>Veel mensen combineren beide: een hot wallet voor kleine bedragen die ze actief gebruiken, en een cold wallet voor het grotere deel dat ze langer willen bewaren.</p>
<h2>Custodial versus non-custodial</h2>
<p>Nog een belangrijk onderscheid: bij een <strong>custodial</strong> wallet (bijvoorbeeld op een exchange) beheert een derde partij de sleutels voor je. Handig, maar je bent afhankelijk van dat platform. Bij een <strong>non-custodial</strong> wallet beheer je de sleutels helemaal zelf, met alle vrijheid en verantwoordelijkheid die daarbij hoort.</p>
<h2>De seed phrase: jouw noodsleutel</h2>
<p>Bij het aanmaken van een eigen wallet krijg je een <strong>seed phrase</strong>: een reeks van meestal 12 of 24 woorden waarmee je je wallet volledig kunt herstellen. Wie deze woorden heeft, heeft toegang tot je crypto. Daarom:</p>
<ul>
<li>Deel je seed phrase <strong>nooit</strong> met iemand, ook niet met "support".</li>
<li>Bewaar hem <strong>offline</strong> (bijvoorbeeld op papier of metaal), nooit als screenshot of in de cloud.</li>
<li>Maak eventueel een tweede kopie op een andere veilige plek, voor het geval de eerste verloren gaat.</li>
</ul>
<h2>Wat betekent dit voor jou?</h2>
<p>Voor kleine bedragen die je actief gebruikt, is de wallet van een betrouwbaar platform meestal voldoende. Bouw je een grotere positie op die je langer wilt aanhouden, dan is een cold wallet het overwegen waard. De belangrijkste regel blijft: bescherm je seed phrase alsof het de sleutel van je kluis is, want dat is het.</p>
<p>Nog niet begonnen? Lees eerst het <a href="/kennisbank/crypto-kopen-nederland-stappenplan">stappenplan om crypto te kopen</a>.</p>`,
    faqs: [
      { q: 'Wat is een crypto wallet?', a: 'Een crypto wallet bewaart de digitale sleutels (private keys) waarmee je toegang hebt tot je crypto. De munten zelf staan op de blockchain; de wallet geeft je toegang en laat je transacties ondertekenen.' },
      { q: 'Wat is het verschil tussen een hot en een cold wallet?', a: 'Een hot wallet is verbonden met internet (handig, voor kleine bedragen). Een cold wallet is een offline hardware-apparaat, veiliger voor grotere bedragen die je langer bewaart.' },
      { q: 'Wat is het verschil tussen custodial en non-custodial?', a: 'Bij een custodial wallet beheert een derde partij (zoals een exchange) de sleutels. Bij een non-custodial wallet beheer je de sleutels helemaal zelf, met meer vrijheid maar ook meer verantwoordelijkheid.' },
      { q: 'Wat gebeurt er als ik mijn seed phrase kwijtraak?', a: 'Zonder je seed phrase kun je een eigen (non-custodial) wallet niet herstellen en verlies je de toegang tot je crypto. Bewaar de woorden daarom veilig en offline, en deel ze nooit.' },
      { q: 'Mag ik mijn seed phrase op mijn telefoon bewaren?', a: 'Nee, dat wordt sterk afgeraden. Bewaar je seed phrase offline (bijvoorbeeld op papier of metaal) en nooit als screenshot, in een notitie-app of in de cloud, omdat die kwetsbaar zijn voor diefstal.' },
    ],
  },
]

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[update] DATABASE_URL ontbreekt.')
    process.exit(1)
  }
  const db = getDb()
  let updated = 0
  let missing = 0

  for (const g of GUIDES) {
    const exists = await db`SELECT id FROM knowledge_articles WHERE slug = ${g.slug} LIMIT 1`
    if (!exists.length) {
      console.log(`[update] ! niet gevonden in kennisbank: ${g.slug}`)
      missing++
      continue
    }
    const img =
      (await fetchUnsplashImage(g.imgCategory, g.imgTags)) ||
      `${SITE}/api/og?title=${encodeURIComponent(g.slug.replace(/-/g, ' '))}&category=kennisbank`

    await db`
      UPDATE knowledge_articles
      SET excerpt = ${g.excerpt},
          content = ${g.content},
          faqs = ${JSON.stringify(g.faqs)},
          image_url = ${img},
          updated_at = NOW()
      WHERE slug = ${g.slug}
    `
    updated++
    console.log(`[update] + bijgewerkt: ${g.slug} (afbeelding: ${img.slice(0, 60)}...)`)
  }

  console.log(`[update] klaar: ${updated} bijgewerkt, ${missing} niet gevonden (van ${GUIDES.length}).`)
}

main().catch(err => {
  console.error('[update] fout:', err)
  process.exit(1)
})
