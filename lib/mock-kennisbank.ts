import type { KnowledgeArticle } from '@/lib/types'

export const MOCK_KENNISBANK: KnowledgeArticle[] = [
  {
    id: 'kb-1',
    title: 'Wat is Bitcoin?',
    slug: 'wat-is-bitcoin',
    excerpt: 'Bitcoin is de eerste en grootste cryptocurrency ter wereld. In deze complete gids leer je wat Bitcoin is, hoe het werkt en waarom het door velen wordt gezien als digitaal goud.',
    category: 'basics',
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=80',
    tags: ['bitcoin', 'blockchain', 'cryptocurrency', 'beginners', 'digitaal goud'],
    published_at: '2026-06-01T08:00:00Z',
    created_at: '2026-06-01T08:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Wat is Bitcoin precies?', a: 'Bitcoin (BTC) is een digitale valuta die in 2009 werd gelanceerd door een anonieme persoon of groep onder de naam Satoshi Nakamoto. Het is de eerste gedecentraliseerde cryptocurrency: er is geen centrale bank of overheid die het beheert.' },
      { q: 'Hoeveel Bitcoin zijn er in totaal?', a: 'Er zullen nooit meer dan 21 miljoen Bitcoin bestaan. Dit vaste maximum is vastgelegd in de code van het netwerk. In juni 2026 zijn er circa 19,7 miljoen Bitcoin gemijnd.' },
      { q: 'Wat is de huidige Bitcoin koers?', a: 'In juni 2026 noteert Bitcoin rond de 55.000 euro per munt. De all-time high van 109.082 euro werd bereikt op 6 oktober 2025.' },
      { q: 'Is Bitcoin veilig?', a: 'Het Bitcoin-netwerk zelf wordt beschouwd als zeer veilig dankzij zijn proof-of-work consensusmechanisme. Risico\'s zitten vooral bij slechte opslagpraktijken door gebruikers zelf, zoals het bewaren op exchanges.' },
      { q: 'Hoe koop ik Bitcoin?', a: 'Je koopt Bitcoin via een cryptocurrency-exchange zoals Bitvavo, Coinbase of Kraken. Na registratie en identiteitsverificatie (KYC) kun je euro\'s storten en direct Bitcoin kopen.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Wat is Bitcoin?</h2>
  <ul>
    <li>Bitcoin (BTC) is de eerste cryptocurrency, gelanceerd in 2009</li>
    <li>Maximaal 21 miljoen Bitcoin zullen ooit bestaan</li>
    <li>Bitcoin is gedecentraliseerd: geen bank of overheid heeft controle</li>
    <li>In juni 2026 staat Bitcoin op circa 55.000 euro, na een all-time high van 109.082 euro in oktober 2025</li>
    <li>Het netwerk draait op proof-of-work: miners beveiligen het netwerk</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#wat-is-bitcoin">Wat is Bitcoin precies?</a></li>
    <li><a href="#hoe-werkt-bitcoin">Hoe werkt Bitcoin?</a></li>
    <li><a href="#blockchain">De blockchain uitgelegd</a></li>
    <li><a href="#mining-halving">Mining en de halving</a></li>
    <li><a href="#koers-geschiedenis">Koersgeschiedenis</a></li>
    <li><a href="#bitcoin-bewaren">Bitcoin kopen en bewaren</a></li>
    <li><a href="#bitcoin-vs-euro">Bitcoin versus traditioneel geld</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="wat-is-bitcoin">Wat is Bitcoin precies?</h2>
<p>Bitcoin (ticker: BTC) is een digitale valuta die in januari 2009 werd gelanceerd door een anonieme persoon of groep onder de naam Satoshi Nakamoto. Het is de eerste succesvolle gedecentraliseerde cryptocurrency: er is geen centrale bank, overheid of bedrijf dat het netwerk beheert.</p>
<p>Bitcoin stelt twee partijen in staat om direct geld naar elkaar over te maken, zonder tussenkomst van een bank of betalingsdienst. Transacties worden vastgelegd op een openbaar, onveranderlijk digitaal grootboek: de blockchain. Iedereen kan de transacties inzien, maar niemand kan ze achteraf aanpassen.</p>
<p>Veel beleggers beschouwen Bitcoin als "digitaal goud": een schaars bezit dat bescherming biedt tegen inflatie. In tegenstelling tot euro's of dollars kan de uitgifte van Bitcoin niet worden vergroot door een centrale instantie.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">21 miljoen</div>
    <div class="stat-label">Maximum aanbod</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">2009</div>
    <div class="stat-label">Jaar van lancering</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">€109.082</div>
    <div class="stat-label">All-time high (okt 2025)</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">~€55.000</div>
    <div class="stat-label">Koers juni 2026</div>
  </div>
</div>

<h2 id="hoe-werkt-bitcoin">Hoe werkt Bitcoin?</h2>
<p>Bitcoin werkt via een peer-to-peer netwerk van duizenden computers (nodes) wereldwijd. Wanneer je een transactie verstuurt, wordt deze uitgezonden naar alle nodes. Vervolgens controleren nodes of je voldoende saldo hebt en of de transactie geldig is.</p>
<p>Valide transacties worden gebundeld in een blok. Miners concurreren om dit blok aan de blockchain toe te voegen door een rekenkundige puzzel op te lossen. De winnaar ontvangt een blokbeloning in Bitcoin, plus de transactiekosten van de opgenomen transacties.</p>

<div class="highlight-box">
  <p><strong>Wist je dat?</strong> Het Bitcoin-netwerk verwerkt gemiddeld 7 transacties per seconde. Ter vergelijking: Visa verwerkt meer dan 24.000 transacties per seconde. Dit is een bekende kritiek op Bitcoin als betaalmiddel voor dagelijks gebruik.</p>
</div>

<h2 id="blockchain">De blockchain uitgelegd</h2>
<p>De blockchain is het fundament van Bitcoin. Stel je het voor als een digitaal kasboek dat door duizenden computers tegelijk wordt bijgehouden. Elk blok bevat een reeks transacties plus een verwijzing (hash) naar het vorige blok. Zo ontstaat een ketting van blokken: de blockchain.</p>
<p>Dit maakt manipulatie praktisch onmogelijk. Om een oude transactie te veranderen, moet een aanvaller alle blokken daarna opnieuw berekenen en tegelijk meer rekenkracht bezitten dan de rest van het netwerk (een "51%-aanval"). Voor het Bitcoin-netwerk zou dit onvoorstelbaar veel energie en hardware vereisen.</p>
<p>Lees ook: <a href="/kennisbank/wat-is-blockchain">Wat is blockchain? De technologie achter crypto uitgelegd</a>.</p>

<h2 id="mining-halving">Mining en de halving</h2>
<p>Bitcoin mining is het proces waarbij miners rekenkracht inzetten om nieuwe blokken te valideren en toe te voegen aan de blockchain. Als beloning ontvangen ze nieuw gecreeerde Bitcoin.</p>
<p>Elke 210.000 blokken (circa vier jaar) wordt de blokbeloning gehalveerd: de "halving". Dit bouwt schaarste in en beperkt de inflatie van Bitcoin.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">3,125 BTC</div>
    <div class="stat-label">Huidige blokbeloning (na halving april 2024)</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">~2028</div>
    <div class="stat-label">Volgende halving</div>
  </div>
</div>

<p>De meest recente halving vond plaats in april 2024, waarna de beloning daalde van 6,25 naar 3,125 BTC per blok. Historisch gezien volgde na elke halving, na een periode van 12-18 maanden, een significante koersstijging. Het is echter geen garantie voor de toekomst.</p>

<h2 id="koers-geschiedenis">Koersgeschiedenis</h2>
<p>Bitcoin heeft een bewogen koersgeschiedenis doorgemaakt:</p>
<ul>
  <li><strong>2009-2012:</strong> Lancering en vroege groei van vrijwel nul naar enkele euros</li>
  <li><strong>2017:</strong> Eerste grote bull run tot circa 16.000 euro</li>
  <li><strong>2020-2021:</strong> Bull run met all-time high van circa 55.000 euro in november 2021</li>
  <li><strong>2022:</strong> Bear market, Bitcoin daalt naar circa 15.000 euro</li>
  <li><strong>2023-2024:</strong> Herstel, Bitcoin ETF-goedkeuringen in de VS</li>
  <li><strong>Oktober 2025:</strong> All-time high van 109.082 euro bereikt</li>
  <li><strong>Juni 2026:</strong> Bear market, Bitcoin noteert rond de 55.000 euro</li>
</ul>
<p>Meer over de huidige markt: <a href="/nieuws/is-crypto-bull-market-2026-voorbij-drie-scenarios">Is de crypto bull market van 2026 voorbij? Drie scenario's</a>.</p>

<h2 id="bitcoin-bewaren">Bitcoin kopen en bewaren</h2>
<p>Je kunt Bitcoin kopen via een exchange zoals Bitvavo (Nederlands), Coinbase of Kraken. Na registratie en identiteitsverificatie (KYC) kun je euro's storten en direct Bitcoin kopen.</p>

<div class="warning-box">
  <p><strong>Belangrijk:</strong> Laat je Bitcoin niet langdurig op een exchange staan. Exchanges kunnen gehackt worden of failliet gaan. Bewaar grotere bedragen altijd in een eigen wallet, bij voorkeur een hardware wallet.</p>
</div>

<p>Meer over veilig bewaren: <a href="/kennisbank/crypto-veilig-bewaren">Crypto veilig bewaren</a> en <a href="/kennisbank/wat-is-een-crypto-wallet">Wat is een crypto wallet?</a>.</p>
<p>Beginners guide: <a href="/kennisbank/hoe-koop-je-crypto">Hoe koop je cryptocurrency? Stap voor stap uitgelegd</a>.</p>

<h2 id="bitcoin-vs-euro">Bitcoin versus traditioneel geld</h2>
<p>Het fundamentele verschil tussen Bitcoin en de euro is dat Bitcoin gedecentraliseerd en schaars is. De Europese Centrale Bank kan naar eigen inzicht nieuwe euro's creeren, wat leidt tot inflatie. Bitcoin heeft een hard maximum van 21 miljoen munten, vastgelegd in de code.</p>

<div class="comparison-table">
  <table>
    <thead><tr><th>Eigenschap</th><th>Bitcoin</th><th>Euro</th></tr></thead>
    <tbody>
      <tr><td>Uitgevers</td><td>Niemand (protocol)</td><td>Europese Centrale Bank</td></tr>
      <tr><td>Maximum aanbod</td><td>21 miljoen BTC</td><td>Onbeperkt</td></tr>
      <tr><td>Transactiesnelheid</td><td>10-60 minuten</td><td>Seconden (SEPA)</td></tr>
      <tr><td>Grenzeloos</td><td>Ja</td><td>Beperkt</td></tr>
      <tr><td>Censuurbestendig</td><td>Ja</td><td>Nee</td></tr>
    </tbody>
  </table>
</div>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen over Bitcoin</h2>
  <div class="faq-item">
    <div class="faq-q">Wat is Bitcoin precies?</div>
    <div class="faq-a">Bitcoin (BTC) is een digitale valuta die in 2009 werd gelanceerd door Satoshi Nakamoto. Het is de eerste gedecentraliseerde cryptocurrency: er is geen centrale bank of overheid die het beheert.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Hoeveel Bitcoin zijn er in totaal?</div>
    <div class="faq-a">Er zullen nooit meer dan 21 miljoen Bitcoin bestaan. In juni 2026 zijn er circa 19,7 miljoen Bitcoin gemijnd.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is de huidige Bitcoin koers?</div>
    <div class="faq-a">In juni 2026 noteert Bitcoin rond de 55.000 euro per munt. De all-time high van 109.082 euro werd bereikt op 6 oktober 2025.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Is Bitcoin veilig?</div>
    <div class="faq-a">Het Bitcoin-netwerk zelf is zeer veilig. Risico's zitten vooral bij slechte opslagpraktijken: bewaar je Bitcoin in je eigen wallet, niet op een exchange.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-2',
    title: 'Hoe koop je cryptocurrency?',
    slug: 'hoe-koop-je-crypto',
    excerpt: 'Stap voor stap uitgelegd hoe je je eerste cryptocurrency koopt via een Nederlandse exchange. Van aanmaken account tot veilig opslaan van je crypto.',
    category: 'basics',
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
    tags: ['kopen', 'exchange', 'bitvavo', 'beginners', 'stap voor stap'],
    published_at: '2026-06-01T09:00:00Z',
    created_at: '2026-06-01T09:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Welke exchange is het beste voor Nederlanders?', a: 'Bitvavo is de populairste Nederlandse exchange: nederlandstalige ondersteuning, lage kosten en iDEAL-storting. Coinbase en Kraken zijn goede internationale alternatieven.' },
      { q: 'Wat heb ik nodig om crypto te kopen?', a: 'Je hebt een geldig legitimatiebewijs nodig voor de verplichte KYC-verificatie, plus een bankrekeningnummer. De verificatie duurt doorgaans enkele minuten tot enkele uren.' },
      { q: 'Wat is het minimum bedrag om te starten?', a: 'Bij de meeste exchanges kun je al starten vanaf 10 tot 25 euro. Je hoeft geen hele Bitcoin te kopen: je kunt fractionele eenheden (satoshi\'s) kopen.' },
      { q: 'Zijn crypto exchanges veilig?', a: 'Gereguleerde exchanges zijn redelijk veilig, maar bewaar grotere bedragen altijd in je eigen wallet. Door Europese MiCA-regelgeving zijn exchanges in Nederland verplicht een vergunning te hebben.' },
      { q: 'Moet ik crypto aankopen belasting betalen?', a: 'In Nederland betaal je geen belasting op het moment van aankoop. Je betaalt vermogensbelasting (box 3) over de waarde van je crypto op 1 januari van het belastingjaar.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Crypto kopen in 5 stappen</h2>
  <ul>
    <li>Kies een betrouwbare, gereguleerde exchange (Bitvavo, Coinbase, Kraken)</li>
    <li>Maak een account aan en verifieer je identiteit (KYC)</li>
    <li>Stort euro's via iDEAL, bankoverschrijving of creditcard</li>
    <li>Koop je gewenste cryptocurrency</li>
    <li>Bewaar grotere bedragen in je eigen wallet, niet op de exchange</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#exchange-kiezen">De juiste exchange kiezen</a></li>
    <li><a href="#account-aanmaken">Account aanmaken en verificatie</a></li>
    <li><a href="#storten">Euro's storten</a></li>
    <li><a href="#crypto-kopen">Cryptocurrency kopen</a></li>
    <li><a href="#veilig-bewaren">Veilig bewaren</a></li>
    <li><a href="#dca-strategie">DCA: slim instappen</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="exchange-kiezen">Stap 1: De juiste exchange kiezen</h2>
<p>Een cryptocurrency-exchange is een platform waarop je crypto kunt kopen, verkopen en verhandelen. Voor Nederlanders zijn dit de meest populaire opties:</p>

<div class="comparison-table">
  <table>
    <thead><tr><th>Exchange</th><th>Kosten</th><th>Stortingen</th><th>Bijzonderheden</th></tr></thead>
    <tbody>
      <tr><td>Bitvavo</td><td>0,25%</td><td>iDEAL, SEPA</td><td>Nederlands, lage kosten</td></tr>
      <tr><td>Coinbase</td><td>1,49%</td><td>iDEAL, SEPA, creditcard</td><td>Gebruiksvriendelijk</td></tr>
      <tr><td>Kraken</td><td>0,26%</td><td>SEPA, creditcard</td><td>Geavanceerde functies</td></tr>
    </tbody>
  </table>
</div>

<div class="highlight-box">
  <p><strong>Tip voor Nederlanders:</strong> Bitvavo heeft een Nederlandstalige interface, accepteert iDEAL en is geregistreerd bij De Nederlandsche Bank. Dit maakt het de meest toegankelijke keuze voor beginners.</p>
</div>

<p>Zorg dat je altijd een gereguleerde exchange kiest. In Europa verplicht de MiCA-wetgeving alle exchanges om een vergunning te hebben. Dit biedt extra bescherming voor consumenten.</p>

<h2 id="account-aanmaken">Stap 2: Account aanmaken en verificatie</h2>
<p>Het aanmaken van een account duurt slechts enkele minuten. Je hebt nodig:</p>
<ul>
  <li>Een geldig e-mailadres</li>
  <li>Een sterk wachtwoord (gebruik een wachtwoordmanager)</li>
  <li>Een geldig legitimatiebewijs (paspoort, rijbewijs of ID-kaart) voor de KYC-verificatie</li>
  <li>Soms een selfie met je document</li>
</ul>
<p>KYC (Know Your Customer) is een wettelijke verplichting voor alle gereguleerde exchanges. De verificatie duurt doorgaans enkele minuten tot een paar uur. Zet ook meteen tweefactorauthenticatie (2FA) aan voor extra beveiliging.</p>

<h2 id="storten">Stap 3: Euro's storten</h2>
<p>Na verificatie kun je euro's storten. De populairste methodes:</p>
<ul>
  <li><strong>iDEAL:</strong> Direct en gratis bij Nederlandse exchanges. Bedragen zijn doorgaans direct beschikbaar.</li>
  <li><strong>Bankoverschrijving (SEPA):</strong> Gratis, maar duurt 1-2 werkdagen.</li>
  <li><strong>Creditcard/debitcard:</strong> Direct, maar hogere kosten (1-3%).</li>
</ul>

<div class="warning-box">
  <p><strong>Let op:</strong> Creditcardbetalingen voor crypto worden door sommige banken als "cash advance" beschouwd, wat extra kosten met zich meebrengt. Check de voorwaarden van je bank vooraf.</p>
</div>

<h2 id="crypto-kopen">Stap 4: Cryptocurrency kopen</h2>
<p>Eenmaal gestort kun je crypto kopen. Beginner tips:</p>
<ul>
  <li>Start met de meest liquide coins: Bitcoin (BTC) of Ethereum (ETH)</li>
  <li>Gebruik een limietorder om exact te bepalen tegen welke prijs je koopt</li>
  <li>Investeer nooit meer dan je bereid bent te verliezen</li>
  <li>Spreid je aankopen in de tijd (zie DCA hieronder)</li>
</ul>
<p>Je hoeft geen hele Bitcoin te kopen. Bij de meeste exchanges is het minimum orderbedrag 10 tot 25 euro. De kleinste eenheid van Bitcoin is een satoshi (0,00000001 BTC).</p>
<p>Meer over Bitcoin: <a href="/kennisbank/wat-is-bitcoin">Wat is Bitcoin?</a>. Meer over Ethereum: <a href="/kennisbank/wat-is-ethereum">Wat is Ethereum?</a>.</p>

<h2 id="veilig-bewaren">Stap 5: Veilig bewaren</h2>
<p>Na aankoop is de volgende stap: veilig bewaren. Laat je crypto niet op een exchange staan als je het voor langere tijd wilt aanhouden. Exchanges kunnen worden gehackt of failliet gaan.</p>
<p>Kies een eigen wallet: een software wallet (app op je telefoon of computer) voor kleinere bedragen, of een hardware wallet (fysiek apparaatje zoals Ledger of Trezor) voor grotere bedragen.</p>
<p>Uitgebreide uitleg: <a href="/kennisbank/wat-is-een-crypto-wallet">Wat is een crypto wallet?</a> en <a href="/kennisbank/crypto-veilig-bewaren">Crypto veilig bewaren</a>.</p>

<h2 id="dca-strategie">DCA: slim instappen met dollar-cost averaging</h2>
<p>In plaats van alles in een keer te kopen, kun je ook periodiek een vast bedrag investeren. Dit heet dollar-cost averaging (DCA). Voordelen:</p>
<ul>
  <li>Je spreidt het risico van slecht timen</li>
  <li>Je koopt automatisch meer wanneer de prijs laag is</li>
  <li>Emotioneel makkelijker: je hoeft de markt niet te volgen</li>
</ul>
<p>In de huidige bear market (juni 2026, Bitcoin rond 55.000 euro) gebruiken veel beleggers DCA om geleidelijk bij te kopen. Meer over deze strategie: <a href="/nieuws/crypto-bear-market-overleven-strategieen-dca-risicobeheer">Crypto bear market overleven: strategieen voor DCA en risicobeheer</a>.</p>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen</h2>
  <div class="faq-item">
    <div class="faq-q">Welke exchange is het beste voor Nederlanders?</div>
    <div class="faq-a">Bitvavo is de populairste Nederlandse exchange: nederlandstalige ondersteuning, lage kosten en iDEAL-storting. Coinbase en Kraken zijn goede internationale alternatieven.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is het minimum bedrag om te starten?</div>
    <div class="faq-a">Bij de meeste exchanges kun je al starten vanaf 10 tot 25 euro. Je hoeft geen hele Bitcoin te kopen.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Moet ik belasting betalen over crypto?</div>
    <div class="faq-a">In Nederland betaal je vermogensbelasting (box 3) over de waarde van je crypto op 1 januari. Meer info: <a href="/kennisbank/crypto-belasting-nederland">Crypto belasting Nederland</a>.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-3',
    title: 'Wat is een crypto wallet?',
    slug: 'wat-is-een-crypto-wallet',
    excerpt: 'Een crypto wallet bewaart je toegang tot je cryptocurrency. Leer het verschil tussen hot wallets en cold wallets, en welke wallet het beste bij jou past.',
    category: 'beveiliging',
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200&q=80',
    tags: ['wallet', 'hardware wallet', 'ledger', 'beveiliging', 'seed phrase'],
    published_at: '2026-06-01T10:00:00Z',
    created_at: '2026-06-01T10:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Wat is een crypto wallet precies?', a: 'Een crypto wallet bewaart niet de coins zelf, maar je private keys: de cryptografische sleutels die aantonen dat jij de eigenaar bent van bepaalde crypto op de blockchain.' },
      { q: 'Wat is het verschil tussen een hot en cold wallet?', a: 'Een hot wallet is verbonden met het internet (software wallet, exchange wallet). Een cold wallet staat offline (hardware wallet, paper wallet). Cold wallets zijn veiliger voor grote bedragen.' },
      { q: 'Wat is een seed phrase?', a: 'Een seed phrase is een reeks van 12 of 24 woorden die dient als back-up van je wallet. Wie je seed phrase heeft, heeft toegang tot al je crypto. Bewaar hem offline, nooit op een computer of telefoon.' },
      { q: 'Welke hardware wallet is het beste?', a: 'Ledger (Nano X, Nano S Plus) en Trezor zijn de twee meest betrouwbare hardware wallets. Koop ze altijd direct bij de fabrikant, nooit tweedehands.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Crypto wallets</h2>
  <ul>
    <li>Een wallet bewaart je private keys, niet de coins zelf</li>
    <li>Hot wallets zijn verbonden met internet (handig, minder veilig)</li>
    <li>Cold wallets staan offline (minder handig, veel veiliger)</li>
    <li>Voor bedragen boven 500 euro is een hardware wallet aan te raden</li>
    <li>Je seed phrase is je ultieme back-up: bewaar hem offline en veilig</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#wat-is-wallet">Wat is een crypto wallet?</a></li>
    <li><a href="#hot-cold">Hot wallets versus cold wallets</a></li>
    <li><a href="#soorten">Soorten wallets</a></li>
    <li><a href="#hardware-wallets">Hardware wallets</a></li>
    <li><a href="#seed-phrase">De seed phrase</a></li>
    <li><a href="#welke-kiezen">Welke wallet kies je?</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="wat-is-wallet">Wat is een crypto wallet?</h2>
<p>Een veelgehoord misverstand: een crypto wallet bewaart geen coins. De coins staan altijd op de blockchain. Wat een wallet wel bewaart, zijn je private keys: de cryptografische sleutels die bewijzen dat jij de eigenaar bent van bepaalde crypto op het netwerk.</p>
<p>Je kunt een wallet vergelijken met een bankpasje: het pasje zelf bevat geen geld, maar het geeft je toegang tot je geld. Verlies je je private key en je hebt geen back-up, dan ben je je crypto voor altijd kwijt.</p>
<p>"Not your keys, not your coins" is een bekende uitspraak in de crypto-wereld. Als je je crypto op een exchange laat staan, zijn het technisch gezien niet jouw sleutels: de exchange beheert ze namens jou.</p>

<h2 id="hot-cold">Hot wallets versus cold wallets</h2>
<p>Wallets worden ingedeeld in twee categorieen op basis van internetverbinding:</p>

<div class="comparison-table">
  <table>
    <thead><tr><th>Eigenschap</th><th>Hot wallet</th><th>Cold wallet</th></tr></thead>
    <tbody>
      <tr><td>Internetverbinding</td><td>Ja (altijd online)</td><td>Nee (offline)</td></tr>
      <tr><td>Gebruiksgemak</td><td>Hoog</td><td>Lager</td></tr>
      <tr><td>Veiligheid</td><td>Gemiddeld</td><td>Hoog</td></tr>
      <tr><td>Geschikt voor</td><td>Dagelijks gebruik, kleine bedragen</td><td>Lange termijn, grote bedragen</td></tr>
      <tr><td>Voorbeelden</td><td>MetaMask, Trust Wallet</td><td>Ledger, Trezor</td></tr>
    </tbody>
  </table>
</div>

<h2 id="soorten">Soorten wallets</h2>
<p>Binnen hot en cold wallets zijn er verschillende types:</p>
<ul>
  <li><strong>Exchange wallet:</strong> De wallet op een exchange zoals Bitvavo. Handig voor actief handelen, maar je beheert de sleutels niet zelf.</li>
  <li><strong>Software wallet (mobiel/desktop):</strong> Apps zoals MetaMask, Trust Wallet of Exodus. Je beheert je eigen sleutels, maar de wallet is verbonden met internet.</li>
  <li><strong>Hardware wallet:</strong> Fysiek apparaatje (Ledger, Trezor) dat je private keys offline bewaart. De veiligste optie voor grotere bedragen.</li>
  <li><strong>Paper wallet:</strong> Je private key afgedrukt op papier. Ouderwets en vatbaar voor fysieke schade, maar volledig offline.</li>
</ul>

<h2 id="hardware-wallets">Hardware wallets</h2>
<p>Voor iedereen met meer dan 500 euro in crypto is een hardware wallet sterk aan te raden. De twee meest betrouwbare merken:</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">Ledger</div>
    <div class="stat-label">Nano X / Nano S Plus. Frans bedrijf, groot ecosysteem.</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">Trezor</div>
    <div class="stat-label">Model T / Model One. Tsjechisch bedrijf, open-source firmware.</div>
  </div>
</div>

<div class="warning-box">
  <p><strong>Belangrijk:</strong> Koop een hardware wallet altijd rechtstreeks bij de fabrikant (ledger.com of trezor.io), nooit via tweedehands platforms zoals Marktplaats. Een gemanipuleerd apparaat kan je crypto stelen.</p>
</div>

<h2 id="seed-phrase">De seed phrase: je ultieme back-up</h2>
<p>Wanneer je een wallet aanmaakt, krijg je een seed phrase (ook wel recovery phrase of mnemonic phrase): een reeks van 12 of 24 willekeurige woorden. Dit is de master key van je wallet. Met deze woorden kun je je wallet altijd herstellen, ook als je apparaat kapot gaat of verloren raakt.</p>

<div class="warning-box">
  <p><strong>Gouden regels voor je seed phrase:</strong></p>
  <ul>
    <li>Schrijf hem op papier (niet digitaal tikken)</li>
    <li>Bewaar op minimaal twee fysieke locaties</li>
    <li>Nooit fotograferen of opslaan in de cloud</li>
    <li>Nooit online invoeren of aan iemand geven</li>
    <li>Overweeg een fireproof kluis voor lange-termijn opslag</li>
  </ul>
</div>

<h2 id="welke-kiezen">Welke wallet kies je?</h2>
<p>De juiste wallet hangt af van je situatie:</p>
<ul>
  <li><strong>Eerste kennismaking, kleine bedragen (&lt; 100 euro):</strong> Exchange wallet of software wallet</li>
  <li><strong>Regelmatig handelen:</strong> Software wallet (MetaMask voor Ethereum-ecosysteem)</li>
  <li><strong>Langetermijnbelegging, grotere bedragen:</strong> Hardware wallet (Ledger of Trezor)</li>
  <li><strong>Maximale beveiliging:</strong> Hardware wallet in combinatie met een beveiligde seed phrase back-up</li>
</ul>
<p>Meer tips over veiligheid: <a href="/kennisbank/crypto-veilig-bewaren">Crypto veilig bewaren: de complete gids</a>.</p>
<p>Klaar om te beginnen? Lees: <a href="/kennisbank/hoe-koop-je-crypto">Hoe koop je cryptocurrency?</a>.</p>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen</h2>
  <div class="faq-item">
    <div class="faq-q">Wat is een crypto wallet precies?</div>
    <div class="faq-a">Een crypto wallet bewaart je private keys: de cryptografische sleutels die aantonen dat jij de eigenaar bent van bepaalde crypto op de blockchain.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is een seed phrase?</div>
    <div class="faq-a">Een seed phrase is een reeks van 12 of 24 woorden die dient als back-up van je wallet. Wie je seed phrase heeft, heeft toegang tot al je crypto. Bewaar hem altijd offline.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Welke hardware wallet is het beste?</div>
    <div class="faq-a">Ledger en Trezor zijn de twee meest betrouwbare hardware wallets. Koop ze altijd direct bij de fabrikant.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-4',
    title: 'Wat is Ethereum?',
    slug: 'wat-is-ethereum',
    excerpt: 'Ethereum is meer dan alleen crypto: het is een programmabaar blockchain-platform. Leer hoe Ethereum werkt, wat smart contracts zijn en waarom ETH zo belangrijk is.',
    category: 'basics',
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80',
    tags: ['ethereum', 'smart contracts', 'defi', 'web3', 'proof-of-stake'],
    published_at: '2026-06-01T11:00:00Z',
    created_at: '2026-06-01T11:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Wat is Ethereum?', a: 'Ethereum is een gedecentraliseerd blockchain-platform waarop ontwikkelaars applicaties kunnen bouwen via smart contracts. Ether (ETH) is de native cryptocurrency van het Ethereum-netwerk.' },
      { q: 'Wat is het verschil tussen Bitcoin en Ethereum?', a: 'Bitcoin is primair digitaal geld en een waardeopslag. Ethereum is een programmeerbaar platform: het stelt ontwikkelaars in staat om gedecentraliseerde applicaties (dApps) te bouwen.' },
      { q: 'Wat is de huidige Ethereum koers?', a: 'In juni 2026 noteert Ethereum rond de 1.480 euro per munt, in lijn met de bredere crypto bear market.' },
      { q: 'Wat is een smart contract?', a: 'Een smart contract is een zelfuitvoerend programma op de blockchain. De regels zijn vastgelegd in code en worden automatisch uitgevoerd wanneer aan de voorwaarden wordt voldaan, zonder tussenkomst van een derde partij.' },
      { q: 'Wat is het verschil tussen ETH en gas?', a: 'Gas is de eenheid die het gebruik van rekenkracht op het Ethereum-netwerk meet. Je betaalt transactiekosten (gas fees) in ETH. Hoe drukker het netwerk, hoe hoger de gas fees.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Ethereum</h2>
  <ul>
    <li>Ethereum is een programmeerbaar blockchain-platform, niet alleen digitaal geld</li>
    <li>Smart contracts maken automatische, vertrouwensloze transacties mogelijk</li>
    <li>Ethereum switchte in 2022 van proof-of-work naar proof-of-stake (The Merge)</li>
    <li>ETH koers in juni 2026: circa 1.480 euro</li>
    <li>DeFi, NFTs en Web3 draaien grotendeels op Ethereum</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#wat-is-ethereum">Wat is Ethereum?</a></li>
    <li><a href="#smart-contracts">Smart contracts uitgelegd</a></li>
    <li><a href="#eth-gas">ETH en gas fees</a></li>
    <li><a href="#proof-of-stake">The Merge: proof-of-stake</a></li>
    <li><a href="#toepassingen">Toepassingen: DeFi, NFTs, Web3</a></li>
    <li><a href="#ethereum-vs-bitcoin">Ethereum versus Bitcoin</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="wat-is-ethereum">Wat is Ethereum?</h2>
<p>Ethereum werd in 2015 gelanceerd door Vitalik Buterin en een team van mede-oprichters. Waar Bitcoin primair digitaal geld is, is Ethereum een programmeerbaar blockchain-platform. Denk aan Ethereum als een wereldwijde computer waarop iedereen code kan uitvoeren, zonder centrale tussenpersoon.</p>
<p>De native cryptocurrency van het Ethereum-netwerk heet Ether (ETH). ETH wordt gebruikt om transactiekosten te betalen en als onderpand in het consensusmechanisme van het netwerk.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">2015</div>
    <div class="stat-label">Jaar van lancering</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">~€1.480</div>
    <div class="stat-label">ETH koers juni 2026</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">2e</div>
    <div class="stat-label">Positie op marktkapitalisatie</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">99,95%</div>
    <div class="stat-label">Energiebesparing na The Merge</div>
  </div>
</div>

<h2 id="smart-contracts">Smart contracts uitgelegd</h2>
<p>Het onderscheidende kenmerk van Ethereum is de ondersteuning voor smart contracts. Een smart contract is een stuk code dat op de blockchain staat en automatisch wordt uitgevoerd wanneer aan bepaalde voorwaarden wordt voldaan.</p>
<p>Een simpel voorbeeld: stel je een weddenschap voor waarbij 100 euro wordt overgemaakt naar de winnaar als het morgen regent. Een smart contract kan dit automatisch afhandelen: als het weerbericht "regen" bevestigt, wordt het geld automatisch vrijgegeven aan de winnaar, zonder dat iemand dit handmatig hoeft te doen.</p>
<p>Smart contracts zijn:</p>
<ul>
  <li><strong>Transparant:</strong> De code is openbaar controleerbaar op de blockchain</li>
  <li><strong>Onveranderlijk:</strong> Eenmaal gedeployed kan de code niet worden aangepast</li>
  <li><strong>Zelfuitvoerend:</strong> Ze draaien automatisch, zonder menselijke tussenkomst</li>
  <li><strong>Vertrouwensloos:</strong> Je hoeft de tegenpartij niet te vertrouwen, alleen de code</li>
</ul>

<h2 id="eth-gas">ETH en gas fees</h2>
<p>Elke operatie op het Ethereum-netwerk kost rekenkracht. Gas is de eenheid die meet hoeveel rekenkracht een transactie of smart contract kost. Je betaalt gas fees in ETH.</p>
<p>Gas fees fluctueren sterk: in drukke periodes (populaire NFT-drops, DeFi-hype) kunnen fees oplopen tot tientallen euros per transactie. In rustige periodes zijn fees soms minder dan een cent.</p>

<h2 id="proof-of-stake">The Merge: van proof-of-work naar proof-of-stake</h2>
<p>In september 2022 maakte Ethereum een historische overstap van proof-of-work (mining) naar proof-of-stake. Dit evenement staat bekend als "The Merge". Resultaat: Ethereum verbruikt nu circa 99,95% minder energie dan voorheen.</p>
<p>In proof-of-stake "staken" validators ETH als onderpand om transacties te valideren. Je hebt minimaal 32 ETH nodig om validator te worden, maar via staking pools kun je met een kleiner bedrag deelnemen.</p>

<h2 id="toepassingen">Toepassingen: DeFi, NFTs, Web3</h2>
<p>Ethereum is het fundament van een groot deel van de crypto-economie:</p>
<ul>
  <li><strong>DeFi (Decentralized Finance):</strong> Lenen, uitlenen en verhandelen zonder bank. Protocollen zoals Uniswap, Aave en Compound draaien op Ethereum. Meer: <a href="/kennisbank/wat-is-defi">Wat is DeFi?</a></li>
  <li><strong>NFTs (Non-Fungible Tokens):</strong> Unieke digitale eigendomsbewijzen voor kunst, muziek, games en meer</li>
  <li><strong>Web3:</strong> De volgende generatie internet waarbij gebruikers eigenaar zijn van hun data en digitale bezittingen</li>
  <li><strong>Stablecoins:</strong> Veel grote stablecoins zoals USDC en DAI zijn ERC-20 tokens op Ethereum</li>
</ul>

<h2 id="ethereum-vs-bitcoin">Ethereum versus Bitcoin</h2>
<div class="comparison-table">
  <table>
    <thead><tr><th>Eigenschap</th><th>Bitcoin</th><th>Ethereum</th></tr></thead>
    <tbody>
      <tr><td>Primair doel</td><td>Digitaal geld / waardeopslag</td><td>Programmeerbaar platform</td></tr>
      <tr><td>Consensus</td><td>Proof-of-work</td><td>Proof-of-stake</td></tr>
      <tr><td>Maximum aanbod</td><td>21 miljoen BTC</td><td>Geen hard cap</td></tr>
      <tr><td>Transactiesnelheid</td><td>~7 TPS</td><td>~30 TPS (+ Layer 2)</td></tr>
      <tr><td>Smart contracts</td><td>Beperkt</td><td>Volledig programmeerbaar</td></tr>
    </tbody>
  </table>
</div>
<p>Meer over de huidige markt: <a href="/nieuws/ethereum-koers-crash-1480-extreme-angst-sentiment">Ethereum koers crash naar 1.480 euro</a>.</p>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen over Ethereum</h2>
  <div class="faq-item">
    <div class="faq-q">Wat is Ethereum?</div>
    <div class="faq-a">Ethereum is een gedecentraliseerd blockchain-platform waarop ontwikkelaars applicaties kunnen bouwen via smart contracts. Ether (ETH) is de native cryptocurrency van het netwerk.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is een smart contract?</div>
    <div class="faq-a">Een smart contract is een zelfuitvoerend programma op de blockchain. De regels zijn vastgelegd in code en worden automatisch uitgevoerd wanneer aan de voorwaarden wordt voldaan.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is de huidige Ethereum koers?</div>
    <div class="faq-a">In juni 2026 noteert Ethereum rond de 1.480 euro per munt, in lijn met de bredere crypto bear market.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-5',
    title: 'Crypto veilig bewaren',
    slug: 'crypto-veilig-bewaren',
    excerpt: 'De beste praktijken voor het veilig bewaren van cryptocurrency. Van hardware wallets tot seed phrase beveiliging en bescherming tegen phishing.',
    category: 'beveiliging',
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80',
    tags: ['beveiliging', 'hardware wallet', 'seed phrase', 'phishing', '2FA'],
    published_at: '2026-06-01T12:00:00Z',
    created_at: '2026-06-01T12:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Hoe bewaar ik crypto het veiligst?', a: 'De veiligste methode is een hardware wallet (Ledger of Trezor) gecombineerd met een goed bewaarde, offline seed phrase back-up op minimaal twee locaties.' },
      { q: 'Wat moet ik doen als ik gehackt ben?', a: 'Als je vermoedt dat je wallet is gecompromitteerd, verplaats je resterende fondsen direct naar een nieuwe wallet met een nieuwe seed phrase. Meld het bij de exchange als het om een exchange-account gaat.' },
      { q: 'Is tweefactorauthenticatie genoeg?', a: 'Tweefactorauthenticatie (2FA) is noodzakelijk maar niet voldoende op zichzelf. Gebruik een authenticator-app (Google Authenticator, Authy) in plaats van SMS-verificatie, en bewaar grotere bedragen in een hardware wallet.' },
      { q: 'Wat zijn de gevaarlijkste oplichting-methodes in crypto?', a: 'De gevaarlijkste zijn: phishing-websites die exchanges nabootsen, nep-support medewerkers die vragen om je seed phrase, en "giveaway"-scams op sociale media waarbij ze beloven crypto te verdubbelen.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Crypto veilig bewaren</h2>
  <ul>
    <li>Gebruik een hardware wallet voor bedragen boven 500 euro</li>
    <li>Bewaar je seed phrase offline op minimaal twee locaties</li>
    <li>Activeer altijd tweefactorauthenticatie (gebruik een app, geen SMS)</li>
    <li>Geef je seed phrase nooit aan iemand, ook niet aan "support"</li>
    <li>Controleer altijd de URL voor je inlogt op een exchange</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#basisbeveiliging">Basisbeveiliging</a></li>
    <li><a href="#hardware-wallet">Hardware wallet</a></li>
    <li><a href="#seed-phrase">Seed phrase back-up</a></li>
    <li><a href="#exchange-beveiliging">Exchange beveiliging</a></li>
    <li><a href="#phishing">Phishing herkennen</a></li>
    <li><a href="#scams">Veelvoorkomende scams</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="basisbeveiliging">Basisbeveiliging: de grondbeginselen</h2>
<p>Beveiliging van cryptocurrency begint met een paar fundamentele regels die elk beginners moet kennen:</p>
<ul>
  <li><strong>Not your keys, not your coins:</strong> Als je je private keys niet beheert, ben je afhankelijk van een derde partij</li>
  <li><strong>Gebruik unieke wachtwoorden:</strong> Elk account verdient een uniek, sterk wachtwoord. Gebruik een wachtwoordmanager zoals Bitwarden of 1Password</li>
  <li><strong>Activeer 2FA:</strong> Tweefactorauthenticatie op alle accounts. Gebruik een authenticator-app, geen SMS</li>
  <li><strong>Houd software up-to-date:</strong> Verouderde software bevat vaak bekende beveiligingslekken</li>
</ul>

<h2 id="hardware-wallet">Hardware wallet: de gouden standaard</h2>
<p>Voor iedereen met meer dan 500 euro aan crypto is een hardware wallet sterk aanbevolen. Een hardware wallet bewaart je private keys offline in een speciaal beveiligd apparaatje. Zelfs als je computer volledig is geinfecteerd met malware, kan een aanvaller niet bij je crypto.</p>
<p>Populaire opties: Ledger Nano X (Bluetooth, mobiel gebruik), Ledger Nano S Plus (goedkoper, USB), Trezor Model T (touchscreen, open-source), Trezor Model One (budgetvriendelijk).</p>

<div class="warning-box">
  <p><strong>Koop altijd bij de fabrikant.</strong> Tweedehands hardware wallets kunnen zijn gemanipuleerd om je seed phrase te stelen. Koop uitsluitend bij ledger.com of trezor.io.</p>
</div>

<p>Meer over wallets: <a href="/kennisbank/wat-is-een-crypto-wallet">Wat is een crypto wallet?</a></p>

<h2 id="seed-phrase">Seed phrase: je ultieme back-up</h2>
<p>Je seed phrase (12 of 24 woorden) is de master key van je wallet. Met deze woorden kun je je wallet altijd herstellen. Verlies je de seed phrase en je apparaat, dan ben je je crypto voorgoed kwijt.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">12 of 24</div>
    <div class="stat-label">Woorden in een seed phrase</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">2048<sup>24</sup></div>
    <div class="stat-label">Mogelijke combinaties (onkraakbaar)</div>
  </div>
</div>

<p>Beste praktijken voor je seed phrase:</p>
<ul>
  <li>Schrijf hem op papier met een balpen (niet potlood, vervaagt)</li>
  <li>Bewaar op twee verschillende fysieke locaties (thuis + elders)</li>
  <li>Overweeg een metalen back-up (fireproof, waterproof) voor grote bedragen</li>
  <li>Nooit fotograferen, nooit typen op een computer of telefoon</li>
  <li>Nooit in de cloud opslaan (Google Drive, iCloud, etc.)</li>
  <li>Nooit aan iemand geven, ook niet aan "support medewerkers"</li>
</ul>

<h2 id="exchange-beveiliging">Exchange beveiliging</h2>
<p>Als je crypto op een exchange bewaart (voor actief handelen), volg dan deze regels:</p>
<ul>
  <li>Gebruik een uniek, sterk wachtwoord voor de exchange</li>
  <li>Activeer 2FA via een authenticator-app (niet SMS)</li>
  <li>Stel een anti-phishing code in (beschikbare optie bij grote exchanges)</li>
  <li>Activeer opname-whitelisting: betalingen gaan alleen naar vooraf goedgekeurde adressen</li>
  <li>Bewaar nooit meer dan nodig op de exchange</li>
</ul>

<h2 id="phishing">Phishing herkennen</h2>
<p>Phishing is een van de meest voorkomende manieren waarop mensen hun crypto verliezen. Aanvallers maken valse websites die exact lijken op echte exchanges.</p>
<p>Hoe herken je phishing:</p>
<ul>
  <li><strong>Controleer de URL:</strong> bitvavo.com versus b1tvavo.com of bitvavo-login.com</li>
  <li><strong>HTTPS certificaat:</strong> Controleer of het slot-icoontje aanwezig is</li>
  <li><strong>Sla bookmarks op:</strong> Ga altijd via je eigen bladwijzer naar de exchange, nooit via een zoekmachine-link</li>
  <li><strong>Twijfel je?</strong> Typ de URL handmatig in</li>
</ul>

<h2 id="scams">Veelvoorkomende scams</h2>
<div class="warning-box">
  <p><strong>Red flags: dit zijn ALTIJD scams:</strong></p>
  <ul>
    <li>Iemand vraagt je seed phrase of private key</li>
    <li>"Giveaway"-acties waarbij je eerst crypto moet sturen om meer terug te krijgen</li>
    <li>Beloftes van gegarandeerd rendement</li>
    <li>Nep-support medewerkers in Telegram of Discord die je DM-en</li>
    <li>Links in onbetrouwbare e-mails of berichten naar exchange-login pagina's</li>
  </ul>
</div>

<p>Meer info over de huidige markt en risico's: <a href="/nieuws/crypto-bear-market-overleven-strategieen-dca-risicobeheer">Crypto bear market overleven</a>.</p>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen</h2>
  <div class="faq-item">
    <div class="faq-q">Hoe bewaar ik crypto het veiligst?</div>
    <div class="faq-a">De veiligste methode is een hardware wallet (Ledger of Trezor) gecombineerd met een goed bewaarde, offline seed phrase back-up op minimaal twee locaties.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Is tweefactorauthenticatie genoeg?</div>
    <div class="faq-a">2FA is noodzakelijk maar niet voldoende. Gebruik een authenticator-app in plaats van SMS, en bewaar grotere bedragen in een hardware wallet.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat moet ik doen als ik gehackt ben?</div>
    <div class="faq-a">Verplaats je resterende fondsen direct naar een nieuwe wallet met een nieuwe seed phrase. Meld het bij de exchange als het om een exchange-account gaat.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-6',
    title: 'Wat is DeFi?',
    slug: 'wat-is-defi',
    excerpt: 'Gedecentraliseerde financiering (DeFi) maakt bankdiensten toegankelijk zonder tussenpersoon. Leer hoe je kunt lenen, uitlenen en handelen op DeFi-platforms.',
    category: 'defi',
    difficulty: 'intermediate',
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
    tags: ['defi', 'uniswap', 'aave', 'yield farming', 'smart contracts', 'ethereum'],
    published_at: '2026-06-01T13:00:00Z',
    created_at: '2026-06-01T13:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Wat is DeFi?', a: 'DeFi staat voor Decentralized Finance: financiele diensten zoals lenen, uitlenen en handelen die via smart contracts op een blockchain draaien, zonder centrale tussenpersoon zoals een bank.' },
      { q: 'Welke DeFi-protocollen zijn het grootste?', a: 'De grootste DeFi-protocollen zijn Uniswap (decentralized exchange), Aave (lenen en uitlenen), MakerDAO (stablecoin DAI) en Compound (lenen). Samen beheren ze miljarden aan locked value.' },
      { q: 'Wat zijn de risico\'s van DeFi?', a: 'Belangrijkste risico\'s: smart contract bugs (code-fouten die kunnen worden uitgebuit), liquidatierisico (bij onderpand-leningen), impermanent loss (bij liquidity providing) en marktrisico.' },
      { q: 'Heb ik DeFi nodig als beginner?', a: 'Nee. DeFi is geschikt voor gevorderde gebruikers die de risico\'s begrijpen. Beginners doen er goed aan eerst te starten met reguliere exchanges en de basis te leren.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: DeFi</h2>
  <ul>
    <li>DeFi = bankdiensten zonder bank, via smart contracts op blockchain</li>
    <li>Grootste categorieen: DEX, lending, stablecoins, yield farming</li>
    <li>Grootste protocollen: Uniswap, Aave, MakerDAO, Compound</li>
    <li>DeFi brengt unieke risico's: smart contract bugs, liquidatie, impermanent loss</li>
    <li>Geschikt voor gevorderde gebruikers die de risico's begrijpen</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#wat-is-defi">Wat is DeFi?</a></li>
    <li><a href="#dex">Decentralized Exchanges (DEX)</a></li>
    <li><a href="#lending">Lenen en uitlenen</a></li>
    <li><a href="#yield-farming">Yield farming en liquidity mining</a></li>
    <li><a href="#stablecoins">Stablecoins in DeFi</a></li>
    <li><a href="#risicos">Risico's van DeFi</a></li>
    <li><a href="#aan-de-slag">Hoe begin je met DeFi?</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="wat-is-defi">Wat is DeFi?</h2>
<p>DeFi staat voor Decentralized Finance: een ecosysteem van financiele diensten die draaien op blockchainsystemen, voornamelijk Ethereum. In tegenstelling tot traditionele finance zijn er geen banken, brokers of andere tussenpersonen. Alles wordt geregeld door smart contracts: zelfuitvoerende programma's op de blockchain.</p>
<p>Stel je voor dat je geld kunt lenen, uitlenen, en handelen in valuta, zonder ooit een bankpas of legitimatiebewijs te tonen. Dat is wat DeFi in theorie belooft: open, toegankelijke en grensloze financiering voor iedereen met een internetverbinding en een crypto wallet.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">$45 mrd</div>
    <div class="stat-label">Total Value Locked (TVL) in DeFi</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">2018</div>
    <div class="stat-label">Eerste DeFi-protocollen gelanceerd</div>
  </div>
</div>

<h2 id="dex">Decentralized Exchanges (DEX)</h2>
<p>Een decentralized exchange (DEX) is een platform waarop je direct crypto kunt ruilen zonder tussenkomst van een centrale partij. De meest populaire DEX is Uniswap, dat draait op Ethereum.</p>
<p>Op een DEX handelen gebruikers via liquidity pools: verzamelingen van twee tokens die door andere gebruikers zijn ingebracht. Ruilkoersen worden bepaald door een automatisch market maker (AMM) algoritme, niet door een orderboek.</p>

<div class="highlight-box">
  <p><strong>DEX vs. CEX:</strong> Op een centralized exchange (CEX) zoals Bitvavo bewaart het bedrijf je crypto. Op een DEX heb je altijd zelf de controle: transacties gaan direct vanuit je eigen wallet.</p>
</div>

<h2 id="lending">Lenen en uitlenen</h2>
<p>Via DeFi-protocollen zoals Aave en Compound kun je crypto uitlenen en rente verdienen, of crypto lenen door andere crypto als onderpand te storten.</p>
<p>Hoe werkt het lenen? Je stort Bitcoin als onderpand en leent USDC (dollar stablecoin). Je kunt dan USDC gebruiken zonder je Bitcoin te verkopen. Zodra je de lening terugbetaalt (plus rente), krijg je je onderpand terug.</p>

<div class="warning-box">
  <p><strong>Liquidatierisico:</strong> Als de waarde van je onderpand daalt onder een bepaalde drempel, kan het automatisch worden geliquideerd. In de huidige bear market (juni 2026) is dit een reeel risico. Leen nooit meer dan 50% van je onderpand waarde.</p>
</div>

<h2 id="yield-farming">Yield farming en liquidity mining</h2>
<p>Yield farming houdt in dat je je crypto inzet in DeFi-protocollen om rendement te verdienen. Dit kan door:</p>
<ul>
  <li><strong>Liquidity providing:</strong> Tokens storten in een DEX-pool en handelskosten verdienen</li>
  <li><strong>Lending:</strong> Crypto uitlenen op platforms als Aave voor rentebetalingen</li>
  <li><strong>Staking:</strong> Tokens vastzetten om het netwerk te beveiligen en beloningen te verdienen</li>
</ul>
<p>Rendementen kunnen aantrekkelijk zijn, maar de risico's zijn significant. Impermanent loss kan je winst tenietdoen als de prijsverhouding van twee tokens sterk verandert.</p>

<h2 id="stablecoins">Stablecoins in DeFi</h2>
<p>Stablecoins zijn cryptocurrencies die zijn gekoppeld aan een stabiele waarde, meestal de Amerikaanse dollar. Ze zijn essentieel in DeFi omdat ze handelen en lenen mogelijk maken zonder volatiliteitsrisico. Populaire stablecoins:</p>
<ul>
  <li><strong>USDC:</strong> Uitgegeven door Circle, volledig gedekt door dollars</li>
  <li><strong>DAI:</strong> Gedecentraliseerde stablecoin van MakerDAO, gedekt door crypto onderpand</li>
  <li><strong>USDT:</strong> Tether, grootste stablecoin qua marktkapitalisatie</li>
</ul>

<h2 id="risicos">Risico's van DeFi</h2>
<p>DeFi brengt unieke risico's met zich mee die je moet begrijpen voordat je ermee begint:</p>
<ul>
  <li><strong>Smart contract bugs:</strong> Fouten in de code kunnen door hackers worden uitgebuit. Zelfs grote, geauditeerde protocollen zijn niet immuun</li>
  <li><strong>Liquidatierisico:</strong> Onderpand-leningen kunnen worden geliquideerd bij grote koersdalingen</li>
  <li><strong>Impermanent loss:</strong> Bij liquidity providing kun je slechter af zijn dan simpelweg HODL-en</li>
  <li><strong>Rugpulls:</strong> Nep-projecten die plotseling verdwijnen met gebruikersfondsen</li>
  <li><strong>Gas fees:</strong> Hoge transactiekosten op Ethereum kunnen rendementen volledig wegeten</li>
</ul>

<h2 id="aan-de-slag">Hoe begin je met DeFi?</h2>
<p>Ben je klaar om DeFi te verkennen? Volg deze stappen:</p>
<ol>
  <li>Zet een MetaMask wallet op (zie: <a href="/kennisbank/wat-is-een-crypto-wallet">Wat is een crypto wallet?</a>)</li>
  <li>Koop ETH via een exchange (zie: <a href="/kennisbank/hoe-koop-je-crypto">Hoe koop je cryptocurrency?</a>)</li>
  <li>Stuur ETH naar je MetaMask wallet</li>
  <li>Ga naar een gevestigd protocol zoals Uniswap of Aave</li>
  <li>Start klein en leer de werking voor je grotere bedragen inzet</li>
</ol>
<p>Meer over Ethereum (het fundament van DeFi): <a href="/kennisbank/wat-is-ethereum">Wat is Ethereum?</a>.</p>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen</h2>
  <div class="faq-item">
    <div class="faq-q">Wat is DeFi?</div>
    <div class="faq-a">DeFi staat voor Decentralized Finance: financiele diensten zoals lenen, uitlenen en handelen via smart contracts op een blockchain, zonder centrale tussenpersoon zoals een bank.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Heb ik DeFi nodig als beginner?</div>
    <div class="faq-a">Nee. DeFi is geschikt voor gevorderde gebruikers die de risico's begrijpen. Beginners doen er goed aan eerst te starten met reguliere exchanges.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat zijn de risico's van DeFi?</div>
    <div class="faq-a">Belangrijkste risico's: smart contract bugs, liquidatierisico, impermanent loss en marktrisico. Gebruik nooit geld dat je niet kunt verliezen.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-7',
    title: 'Crypto belasting Nederland',
    slug: 'crypto-belasting-nederland',
    excerpt: 'Hoe geef je cryptocurrency op bij de Belastingdienst? Alles over box 3, het fictief rendement, DAC8 en de aangifte inkomstenbelasting 2026.',
    category: 'juridisch',
    difficulty: 'intermediate',
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    tags: ['belasting', 'box 3', 'aangifte', 'Nederland', 'DAC8', 'belastingdienst'],
    published_at: '2026-06-01T14:00:00Z',
    created_at: '2026-06-01T14:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Moet ik belasting betalen over crypto in Nederland?', a: 'Ja. Cryptocurrency valt in box 3 van de inkomstenbelasting. Je geeft de waarde van je crypto op 1 januari op als vermogen. Over dit vermogen betaal je een fictief rendement van 6,04% (2026), waarover je belasting betaalt.' },
      { q: 'Wat is het fictief rendement voor crypto in 2026?', a: 'Het fictief rendement voor overige bezittingen (waaronder crypto) is 6,04% in het belastingjaar 2026. Dit percentage is ongeacht of je daadwerkelijk rendement hebt gemaakt.' },
      { q: 'Hoe geef ik crypto op in mijn belastingaangifte?', a: 'Geef de eurowaarde van al je crypto op 1 januari van het belastingjaar op onder "Overige bezittingen" in box 3. Gebruik de slotkoers van grote exchanges voor de waardering.' },
      { q: 'Wat is DAC8 en wat betekent het voor mij?', a: 'DAC8 is een Europese richtlijn die exchanges verplicht om transactiedata van klanten te rapporteren aan de Belastingdienst. Vanaf 2026 wisselen EU-landen automatisch belastingdata uit over crypto-transacties.' },
      { q: 'Betaal ik belasting als ik crypto naar crypto ruil?', a: 'In Nederland is een crypto-naar-crypto-ruil geen belastbaar moment voor box 3. Wat telt is de totale waarde van je vermogen op 1 januari.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Crypto belasting Nederland 2026</h2>
  <ul>
    <li>Crypto valt in box 3 van de inkomstenbelasting</li>
    <li>Je geeft de waarde op 1 januari op als vermogen</li>
    <li>Fictief rendement voor crypto (overige bezittingen): 6,04% in 2026</li>
    <li>Heffingsvrij vermogen box 3: 57.000 euro per persoon (2026)</li>
    <li>DAC8 verplicht exchanges om transactiedata te rapporteren aan de Belastingdienst</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#box3">Crypto in box 3</a></li>
    <li><a href="#fictief-rendement">Fictief rendement 2026</a></li>
    <li><a href="#aangifte">Hoe doe je aangifte?</a></li>
    <li><a href="#dac8">DAC8: automatische uitwisseling</a></li>
    <li><a href="#staking-mining">Staking en mining-inkomsten</a></li>
    <li><a href="#tips">Praktische tips</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="box3">Crypto in box 3</h2>
<p>In Nederland valt cryptocurrency onder box 3 van de inkomstenbelasting: de vermogensrendementsheffing. Dit is dezelfde box als voor spaargeld en beleggingen. Je betaalt geen belasting op gerealiseerde winst (zoals in de VS), maar op je totale vermogen op de peildatum 1 januari.</p>
<p>Het maakt voor box 3 niet uit of je crypto hebt gekocht, verkocht of geruild in het belastingjaar. Wat telt, is de totale eurowaarde van al je bezittingen op 1 januari van het belastingjaar.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">1 januari</div>
    <div class="stat-label">Peildatum voor crypto-waarde</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">57.000 euro</div>
    <div class="stat-label">Heffingsvrij vermogen per persoon (2026)</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">6,04%</div>
    <div class="stat-label">Fictief rendement overige bezittingen</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">36%</div>
    <div class="stat-label">Belastingpercentage over fictief rendement</div>
  </div>
</div>

<h2 id="fictief-rendement">Fictief rendement 2026</h2>
<p>De Belastingdienst werkt met een fictief rendement: een verondersteld percentage dat je geacht wordt te verdienen op je vermogen. Voor cryptovaluta, die valt onder "overige bezittingen", geldt in 2026 een fictief rendement van 6,04%.</p>
<p>Rekenvoorbeeld: Je hebt op 1 januari 2026 crypto ter waarde van 10.000 euro. Na aftrek van het heffingsvrij vermogen (57.000 euro per persoon) betaal je pas belasting als je totale box 3 vermogen hoger is dan 57.000 euro.</p>
<p>Stel je hebt 80.000 euro aan vermogen totaal (crypto + spaargeld). Je berekent dan: fictief rendement over het bovenmatige deel van 23.000 euro x 6,04% = 1.389 euro fictief rendement. Hierover betaal je 36% = circa 500 euro belasting.</p>

<div class="highlight-box">
  <p><strong>Let op:</strong> Het fictief rendement-systeem betekent dat je belasting kunt betalen zelfs als je crypto in waarde is gedaald. In de huidige bear market (Bitcoin van circa 109.000 euro in oktober 2025 naar 55.000 euro in juni 2026) kan dit hard aankomen.</p>
</div>

<h2 id="aangifte">Hoe doe je aangifte?</h2>
<p>Stap voor stap de aangifte voor crypto:</p>
<ol>
  <li><strong>Bepaal de peildatumwaarde:</strong> Zoek de euro-waarde van al je crypto op 1 januari via CoinGecko, CoinMarketCap of een grote exchange</li>
  <li><strong>Verzamel je gegevens:</strong> Noteer de waarde van elke cryptocurrency die je bezat op de peildatum</li>
  <li><strong>Vul in onder Overige bezittingen:</strong> In de aangifte inkomstenbelasting, ga naar box 3 en kies "Overige bezittingen"</li>
  <li><strong>Voeg toe aan je vermogen:</strong> De totale crypto-waarde telt mee voor je box 3 vermogen</li>
</ol>
<p>Crypto op een exchange (in bewaring bij een ander) geef je op als "vordering". Crypto in je eigen wallet geef je op als "overig bezit".</p>

<p>Meer over de actuele belastingregels en DAC8: <a href="/nieuws/crypto-belasting-aangifte-2026-box3-dac8-defi">Crypto belastingaangifte 2026: Box 3, DAC8 en DeFi uitgelegd</a>.</p>

<h2 id="dac8">DAC8: automatische uitwisseling</h2>
<p>DAC8 is een Europese richtlijn die per 2026 verplicht dat exchanges en crypto-dienstverleners transactiedata rapporteren aan de belastingdiensten van EU-lidstaten. Dit betekent:</p>
<ul>
  <li>Bitvavo, Coinbase en andere exchanges rapporteren jouw transacties automatisch aan de Belastingdienst</li>
  <li>EU-landen wisselen deze data onderling uit</li>
  <li>Het wordt moeilijker (en illegaal) om crypto-vermogen niet op te geven</li>
</ul>
<p>Meld je crypto altijd correct aan. De Belastingdienst heeft dankzij DAC8 nu directe toegang tot transactiedata van alle grote Europese exchanges.</p>

<h2 id="staking-mining">Staking en mining-inkomsten</h2>
<p>Staking-beloningen en mining-opbrengsten zijn een grijs gebied in de Nederlandse belastingwetgeving. De gangbare interpretatie is dat ze ook in box 3 vallen als onderdeel van je vermogen op de peildatum. Sommige belastingadviseurs adviseren echter om staking-beloningen te behandelen als inkomsten.</p>
<p>Raadpleeg een belastingadviseur als je substantiele inkomsten uit staking of mining genereert.</p>

<h2 id="tips">Praktische tips</h2>
<ul>
  <li>Houd een nauwkeurig logboek bij van al je crypto-transacties en wallets</li>
  <li>Noteer de koers op 1 januari (vanuit meerdere bronnen)</li>
  <li>Gebruik crypto-belastingsoftware zoals Koinly of Blockpit voor complexe portefeuilles</li>
  <li>Vergeet geen crypto op buitenlandse exchanges of in DeFi-protocollen</li>
  <li>Controleer of je partner ook crypto heeft: vermogen boven de vrijstelling kun je verdelen</li>
</ul>

<div class="warning-box">
  <p><strong>Disclaimer:</strong> Dit artikel is informatief van aard en geen fiscaal advies. De belastingwetgeving voor crypto is in ontwikkeling. Raadpleeg een belastingadviseur voor persoonlijk advies.</p>
</div>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen</h2>
  <div class="faq-item">
    <div class="faq-q">Moet ik belasting betalen over crypto in Nederland?</div>
    <div class="faq-a">Ja. Cryptocurrency valt in box 3. Je geeft de waarde van je crypto op 1 januari op als vermogen. Het fictief rendement is 6,04% in 2026.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is DAC8?</div>
    <div class="faq-a">DAC8 is een Europese richtlijn die exchanges verplicht om transactiedata te rapporteren aan de Belastingdienst. Vanaf 2026 wisselen EU-landen automatisch belastingdata uit over crypto.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Betaal ik belasting als ik crypto naar crypto ruil?</div>
    <div class="faq-a">In Nederland is een crypto-naar-crypto-ruil geen belastbaar moment voor box 3. Wat telt is de totale waarde van je vermogen op 1 januari.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-8',
    title: 'Wat zijn altcoins?',
    slug: 'wat-zijn-altcoins',
    excerpt: 'Altcoins zijn alle cryptocurrencies naast Bitcoin. Leer welke soorten er zijn, wat de grootste zijn en hoe je verstandig omgaat met altcoin-beleggingen.',
    category: 'basics',
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80',
    tags: ['altcoins', 'ethereum', 'solana', 'XRP', 'beleggingen', 'marktkapitalisatie'],
    published_at: '2026-06-01T15:00:00Z',
    created_at: '2026-06-01T15:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Wat zijn altcoins?', a: 'Altcoins zijn alle cryptocurrencies naast Bitcoin. De naam komt van "alternative coins". Er zijn meer dan 20.000 altcoins, varierende van grote gevestigde projecten zoals Ethereum en Solana tot kleine speculatieve tokens.' },
      { q: 'Zijn altcoins risicovoller dan Bitcoin?', a: 'Over het algemeen wel. Altcoins hebben een lagere marktkapitalisatie en liquiditeit, wat leidt tot grotere koersschommelingen. Kleine altcoins (small-caps) zijn het risicovolst.' },
      { q: 'Wat zijn de grootste altcoins?', a: 'De grootste altcoins qua marktkapitalisatie zijn Ethereum (ETH), Tether (USDT), XRP, BNB, Solana (SOL) en USDC. De rangorde verandert regelmatig.' },
      { q: 'Wat is een "altcoin season"?', a: 'Een altcoin season is een periode waarbij altcoins sterk outperformen ten opzichte van Bitcoin. Dit gebeurt vaak in de late fase van een bull market, wanneer kapitaal van Bitcoin naar kleinere coins stroomt.' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Altcoins</h2>
  <ul>
    <li>Altcoins zijn alle cryptovaluta behalve Bitcoin</li>
    <li>Er zijn meer dan 20.000 verschillende altcoins</li>
    <li>Grootste altcoins: Ethereum, XRP, Solana, BNB</li>
    <li>Altcoins zijn over het algemeen risicovoller dan Bitcoin</li>
    <li>In de huidige bear market (juni 2026) staan de meeste altcoins 60-90% onder hun ATH</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#wat-zijn">Wat zijn altcoins?</a></li>
    <li><a href="#soorten">Soorten altcoins</a></li>
    <li><a href="#grootste">De grootste altcoins</a></li>
    <li><a href="#risico">Risico van altcoins</a></li>
    <li><a href="#altcoin-season">Altcoin season</a></li>
    <li><a href="#tips">Tips voor altcoin-beleggers</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="wat-zijn">Wat zijn altcoins?</h2>
<p>De term "altcoin" is een samentrekking van "alternative coin": alle cryptocurrencies die niet Bitcoin zijn. Ethereum, Solana, XRP, Cardano, en duizenden andere tokens zijn altcoins. Er zijn inmiddels meer dan 20.000 verschillende altcoins, hoewel het overgrote deel nauwelijks wordt verhandeld.</p>
<p>Bitcoin was de eerste cryptocurrency (gelanceerd in 2009). Alle latere projecten worden altcoins genoemd, ongeacht hun grootte, technologie of doel. Ethereum met een marktkapitalisatie van honderden miljarden euro's is dus technisch gezien een altcoin, net als een nieuw gelanceerd token met een marktkapitalisatie van een paar duizend euro.</p>

<h2 id="soorten">Soorten altcoins</h2>
<p>Altcoins zijn in te delen in verschillende categorieen:</p>
<ul>
  <li><strong>Smart contract platforms:</strong> Blockchains waarop developers applicaties kunnen bouwen. Ethereum is de grootste, gevolgd door Solana, Avalanche, Cardano en BNB Chain.</li>
  <li><strong>Stablecoins:</strong> Tokens met een vaste waarde, gekoppeld aan de dollar of euro. USDT, USDC en DAI zijn de grootste. Meer: <a href="/kennisbank/wat-is-defi">Stablecoins in DeFi</a>.</li>
  <li><strong>DeFi tokens:</strong> Governance-tokens van DeFi-protocollen zoals UNI (Uniswap), AAVE en MKR (Maker).</li>
  <li><strong>Layer 2 tokens:</strong> Tokens van schaalbaarheidssystemen bovenop Ethereum, zoals Polygon (POL) en Arbitrum (ARB).</li>
  <li><strong>Meme coins:</strong> Tokens gebaseerd op internetgrappen, zoals Dogecoin en Shiba Inu. Extreem speculatief.</li>
  <li><strong>Privacy coins:</strong> Tokens gericht op anonimiteit, zoals Monero (XMR).</li>
</ul>

<h2 id="grootste">De grootste altcoins</h2>
<div class="comparison-table">
  <table>
    <thead><tr><th>Altcoin</th><th>Ticker</th><th>Categorie</th><th>Koers juni 2026</th></tr></thead>
    <tbody>
      <tr><td>Ethereum</td><td>ETH</td><td>Smart contract platform</td><td>~€1.480</td></tr>
      <tr><td>Tether</td><td>USDT</td><td>Stablecoin</td><td>~€0,92</td></tr>
      <tr><td>XRP</td><td>XRP</td><td>Betalingen</td><td>~€1,80</td></tr>
      <tr><td>BNB</td><td>BNB</td><td>Exchange token</td><td>~€480</td></tr>
      <tr><td>Solana</td><td>SOL</td><td>Smart contract platform</td><td>~€115</td></tr>
    </tbody>
  </table>
</div>
<p>Meer over de actuele Solana-koers: <a href="/nieuws/solana-daling-juni-2026-harder-ethereum-fortune-top-3">Solana daalt harder dan Ethereum in juni 2026</a>.</p>
<p>Meer over Ethereum: <a href="/kennisbank/wat-is-ethereum">Wat is Ethereum?</a>.</p>

<h2 id="risico">Risico van altcoins</h2>
<p>Altcoins zijn over het algemeen risicovoller dan Bitcoin, om meerdere redenen:</p>
<ul>
  <li><strong>Lagere liquiditeit:</strong> Minder handelsvolume betekent grotere koersschommelingen bij aan- en verkoop</li>
  <li><strong>Hogere volatiliteit:</strong> Altcoins bewegen doorgaans sterker dan Bitcoin in beide richtingen</li>
  <li><strong>Projectrisico:</strong> Veel projecten falen of worden verlaten door hun ontwikkelaars</li>
  <li><strong>Reguleringsrisico:</strong> Altcoins lopen meer kans op reguleringsmaatregelen dan Bitcoin</li>
</ul>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">-85%</div>
    <div class="stat-label">Gemiddeld altcoin verlies t.o.v. ATH (bear market 2026)</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">-50%</div>
    <div class="stat-label">Bitcoin verlies t.o.v. ATH (bear market 2026)</div>
  </div>
</div>

<p>Altcoins dalen in bear markets doorgaans disproportioneel harder dan Bitcoin. In de huidige bear market staat Bitcoin circa 50% onder zijn all-time high van 109.082 euro (oktober 2025), terwijl de meeste altcoins 60-90% zijn gedaald.</p>

<h2 id="altcoin-season">Altcoin season</h2>
<p>Een altcoin season is een periode waarbij altcoins sterk outperformen ten opzichte van Bitcoin. Dit verschijnsel treedt vaak op in de late fase van een bull market: nadat Bitcoin eerst stijgt, stroomt kapitaal door naar altcoins die hogere rendementen beloven.</p>
<p>In de bull run van 2024-2025 beleefden veel altcoins explosieve stijgingen voordat de markt in 2026 omsloeg naar een bear market.</p>

<h2 id="tips">Tips voor altcoin-beleggers</h2>
<ul>
  <li>Doe altijd je eigen onderzoek (DYOR): lees het whitepaper, controleer het team</li>
  <li>Beperk je altcoin-allocatie: de meeste experts raden aan niet meer dan 20-30% van je portfolio in altcoins te zetten</li>
  <li>Wees sceptisch over hoge rendementsbeloftes</li>
  <li>Houd rekening met liquiditeit: verkopen van kleine altcoins kan moeilijk zijn in een bear market</li>
  <li>Overweeg DCA voor geleidelijk instappen</li>
</ul>
<p>Meer over beleggingsstrategie: <a href="/nieuws/crypto-bear-market-overleven-strategieen-dca-risicobeheer">Crypto bear market overleven</a>.</p>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen</h2>
  <div class="faq-item">
    <div class="faq-q">Wat zijn altcoins?</div>
    <div class="faq-a">Altcoins zijn alle cryptocurrencies naast Bitcoin. Er zijn meer dan 20.000 altcoins, van grote projecten zoals Ethereum tot kleine speculatieve tokens.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Zijn altcoins risicovoller dan Bitcoin?</div>
    <div class="faq-a">Over het algemeen wel. Altcoins hebben een lagere liquiditeit en hogere volatiliteit. In bear markets dalen ze doorgaans disproportioneel harder dan Bitcoin.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is een altcoin season?</div>
    <div class="faq-a">Een altcoin season is een periode waarbij altcoins sterk outperformen ten opzichte van Bitcoin. Dit gebeurt vaak in de late fase van een bull market.</div>
  </div>
</div>
`,
  },

  {
    id: 'kb-9',
    title: 'Wat is blockchain?',
    slug: 'wat-is-blockchain',
    excerpt: 'De blockchain is de technologie achter Bitcoin en andere cryptocurrencies. Leer hoe een blockchain werkt, wat consensusmechanismen zijn en waarom blockchain revolutionair is.',
    category: 'basics',
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    tags: ['blockchain', 'technologie', 'gedistribueerd', 'consensus', 'proof-of-work', 'proof-of-stake'],
    published_at: '2026-06-01T16:00:00Z',
    created_at: '2026-06-01T16:00:00Z',
    updated_at: '2026-06-12T08:00:00Z',
    faqs: [
      { q: 'Wat is een blockchain?', a: 'Een blockchain is een gedistribueerd digitaal grootboek: een database die wordt bijgehouden door duizenden computers tegelijk. Transacties worden gegroepeerd in blokken en aan elkaar gekoppeld in een onveranderlijke ketting.' },
      { q: 'Is blockchain hetzelfde als Bitcoin?', a: 'Nee. Blockchain is de onderliggende technologie. Bitcoin is een cryptocurrency die gebruikmaakt van blockchain. Niet elke blockchain heeft een cryptocurrency, en niet elke cryptocurrency is Bitcoin.' },
      { q: 'Wat is het verschil tussen proof-of-work en proof-of-stake?', a: 'Proof-of-work (Bitcoin) gebruikt rekenkracht om transacties te valideren, wat veel energie kost. Proof-of-stake (Ethereum) gebruikt ingezette crypto als onderpand en verbruikt circa 99,95% minder energie.' },
      { q: 'Kan een blockchain worden gehackt?', a: 'De Bitcoin- en Ethereum-blockchains zelf worden beschouwd als vrijwel onhackbaar dankzij hun gedistribueerde architectuur en consensusmechanismen. Kwetsbaarheden zitten eerder in applicaties bovenop de blockchain (zoals smart contracts of exchanges).' },
    ],
    content: `
<div class="quick-take">
  <h2>Quick Take: Blockchain</h2>
  <ul>
    <li>Een blockchain is een gedistribueerd, onveranderlijk digitaal grootboek</li>
    <li>Data is opgeslagen in blokken die cryptografisch aan elkaar zijn gekoppeld</li>
    <li>Geen centrale partij beheert de blockchain: duizenden nodes doen dit samen</li>
    <li>Twee populaire consensusmechanismen: proof-of-work (Bitcoin) en proof-of-stake (Ethereum)</li>
    <li>Blockchain is de onderliggende technologie voor alle cryptocurrencies</li>
  </ul>
</div>

<div class="toc-box">
  <h3>Inhoudsopgave</h3>
  <ol>
    <li><a href="#wat-is-blockchain">Wat is een blockchain?</a></li>
    <li><a href="#hoe-werkt">Hoe werkt een blockchain?</a></li>
    <li><a href="#consensus">Consensusmechanismen</a></li>
    <li><a href="#pow-pos">Proof-of-work versus proof-of-stake</a></li>
    <li><a href="#onveranderlijk">Waarom is blockchain onveranderlijk?</a></li>
    <li><a href="#toepassingen">Toepassingen buiten crypto</a></li>
    <li><a href="#faq">Veelgestelde vragen</a></li>
  </ol>
</div>

<h2 id="wat-is-blockchain">Wat is een blockchain?</h2>
<p>Een blockchain is een gedistribueerd digitaal grootboek: een database die niet op een centrale server staat, maar gelijktijdig wordt bijgehouden door duizenden computers wereldwijd. Elke computer in het netwerk (een "node") heeft een volledige kopie van alle transacties die ooit hebben plaatsgevonden.</p>
<p>Stel je een traditionele bank voor als een spreadsheet die alleen de bank zelf kan lezen en aanpassen. Een blockchain is als diezelfde spreadsheet, maar dan gepubliceerd en bijgehouden door duizenden mensen tegelijk. Niemand heeft exclusieve controle, en iedereen kan controleren of de data correct is.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">17.000+</div>
    <div class="stat-label">Bitcoin nodes wereldwijd</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">2009</div>
    <div class="stat-label">Eerste blockchain (Bitcoin) gelanceerd</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">0</div>
    <div class="stat-label">Succesvolle aanvallen op Bitcoin-blockchain</div>
  </div>
</div>

<h2 id="hoe-werkt">Hoe werkt een blockchain?</h2>
<p>De werking van een blockchain in drie stappen:</p>
<ol>
  <li><strong>Transactie initieren:</strong> Een gebruiker verstuurt een transactie (bijv. 0,1 Bitcoin naar een andere wallet). Deze transactie wordt uitgezonden naar alle nodes in het netwerk.</li>
  <li><strong>Validatie:</strong> Nodes controleren of de transactie geldig is (heeft de afzender genoeg saldo? Is de handtekening correct?). Valide transacties worden gebundeld in een nieuw blok.</li>
  <li><strong>Toevoeging aan de ketting:</strong> Het nieuwe blok wordt cryptografisch gekoppeld aan het vorige blok via een hash (een unieke vingerafdruk). Zo ontstaat een onveranderlijke ketting van blokken: de blockchain.</li>
</ol>

<div class="highlight-box">
  <p><strong>Wat is een hash?</strong> Een hash is een unieke, vaste-lengte code die wordt berekend uit de data in een blok. Elke minimale verandering in de data levert een volledig andere hash op. Elk blok bevat de hash van het vorige blok, waardoor de ketting onbreekbaar is.</p>
</div>

<h2 id="consensus">Consensusmechanismen</h2>
<p>Omdat er geen centrale autoriteit is, moeten alle nodes het eens worden over welke transacties geldig zijn. Dit wordt een consensusmechanisme. Er zijn verschillende methodes:</p>
<ul>
  <li><strong>Proof-of-work (PoW):</strong> Nodes (miners) concurreren om een wiskundig puzzel op te lossen. De winnaar mag het volgende blok toevoegen en ontvangt een beloning. Gebruikt door Bitcoin.</li>
  <li><strong>Proof-of-stake (PoS):</strong> Validators staken (vergrendelen) een hoeveelheid crypto als onderpand. De kans om het volgende blok te valideren is evenredig met het ingezette bedrag. Gebruikt door Ethereum na The Merge (2022).</li>
  <li><strong>Delegated Proof-of-Stake (DPoS):</strong> Tokenhouders stemmen op een beperkt aantal gedelegeerden die transacties valideren. Gebruikt door EOS en andere netwerken.</li>
</ul>

<h2 id="pow-pos">Proof-of-work versus proof-of-stake</h2>
<div class="comparison-table">
  <table>
    <thead><tr><th>Eigenschap</th><th>Proof-of-Work</th><th>Proof-of-Stake</th></tr></thead>
    <tbody>
      <tr><td>Energieverbruik</td><td>Zeer hoog</td><td>Zeer laag (-99,95%)</td></tr>
      <tr><td>Beveiliging</td><td>Bewezen (Bitcoin)</td><td>Sterk maar jonger</td></tr>
      <tr><td>Vereiste</td><td>Rekenkracht (hardware)</td><td>Crypto (stake)</td></tr>
      <tr><td>Gebruikt door</td><td>Bitcoin, Litecoin</td><td>Ethereum, Solana, Cardano</td></tr>
      <tr><td>Gedecentraliseerd</td><td>Hoog (maar mining pools)</td><td>Hoog (maar stake concentratie)</td></tr>
    </tbody>
  </table>
</div>

<h2 id="onveranderlijk">Waarom is blockchain onveranderlijk?</h2>
<p>Om een historische transactie te wijzigen, moet een aanvaller het betreffende blok aanpassen. Maar daardoor verandert de hash van dat blok, waardoor het volgende blok ongeldig wordt, enzovoorts tot het meest recente blok. De aanvaller moet alle blokken daarna opnieuw berekenen en tegelijk sneller zijn dan de rest van het netwerk.</p>
<p>Dit staat bekend als een "51%-aanval": een aanvaller heeft meer dan 50% van de totale rekenkracht (of staking power) nodig. Voor grote netwerken zoals Bitcoin en Ethereum is dit praktisch onmogelijk en astronomisch duur.</p>

<h2 id="toepassingen">Toepassingen buiten crypto</h2>
<p>Hoewel blockchain in de publieke perceptie synoniem is met cryptocurrency, heeft de technologie bredere toepassingen:</p>
<ul>
  <li><strong>Supply chain beheer:</strong> Tracking van producten van fabriek tot consument</li>
  <li><strong>Gezondheidszorg:</strong> Veilig delen van patient-data tussen instellingen</li>
  <li><strong>Stemmen:</strong> Transparante en controleerbare verkiezingen</li>
  <li><strong>Digitale identiteit:</strong> Eigendom van identiteitsgegevens zonder centrale database</li>
</ul>
<p>De technologie achter <a href="/kennisbank/wat-is-bitcoin">Bitcoin</a> en <a href="/kennisbank/wat-is-ethereum">Ethereum</a> is de basis van een snel evoluerend ecosysteem van gedecentraliseerde applicaties.</p>

<div class="faq-section" id="faq">
  <h2>Veelgestelde vragen</h2>
  <div class="faq-item">
    <div class="faq-q">Wat is een blockchain?</div>
    <div class="faq-a">Een blockchain is een gedistribueerd digitaal grootboek: een database die wordt bijgehouden door duizenden computers tegelijk. Transacties worden gegroepeerd in blokken en aan elkaar gekoppeld in een onveranderlijke ketting.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Is blockchain hetzelfde als Bitcoin?</div>
    <div class="faq-a">Nee. Blockchain is de onderliggende technologie. Bitcoin is een cryptocurrency die gebruikmaakt van blockchain.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Kan een blockchain worden gehackt?</div>
    <div class="faq-a">De Bitcoin- en Ethereum-blockchains zelf worden beschouwd als vrijwel onhackbaar. Kwetsbaarheden zitten eerder in applicaties bovenop de blockchain, zoals smart contracts of exchanges.</div>
  </div>
</div>
`,
  },
]
