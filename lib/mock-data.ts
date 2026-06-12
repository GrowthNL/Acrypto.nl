import type { Article } from './types'

const now = Date.now()
const ago = (min: number) => new Date(now - min * 60_000).toISOString()

function quickTake(points: string[]): string {
  return `
<div class="quick-take">
  <div class="quick-take-header">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
    Quick Take
  </div>
  <ul>
    ${points.map(p => `<li>${p}</li>`).join('\n    ')}
  </ul>
</div>`
}

function toc(items: [string, string][]): string {
  return `
<div class="toc-box">
  <div class="toc-title">Inhoudsopgave</div>
  <ol>
    ${items.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('\n    ')}
  </ol>
</div>`
}

/* ────────── ARTIKEL 1 — Bitcoin bear market ────────── */
const art1Content = `
${quickTake([
  'Bitcoin staat op 12 juni 2026 rond €55.000 — een daling van 34% ten opzichte van het 2026-hoogtepunt van ~€75.700.',
  'Bitcoin bear market-verliezen naderen $211 miljard, meldt Blockchain Stories op 7 juni.',
  'CryptoQuant: de "realized price" van Bitcoin (gemiddelde inkoopprijs) ligt op ~$53.600 — historisch een bodemniveau.',
  'Analisten zien een mogelijke bodem in Q3 2026 als macro-omstandigheden niet verder verslechteren.',
])}

${toc([
  ['hoe-ver-gedaald', 'Hoe ver is Bitcoin gedaald in 2026?'],
  ['realized-price', 'De realized price: historische bodem-indicator'],
  ['etf-uitstroom', 'ETF-uitstroom: institutionele beleggers verlaten de markt'],
  ['analisten', 'Wat analisten nu verwachten'],
  ['risicos', 'Risico\'s en scenario\'s'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="hoe-ver-gedaald">Hoe ver is Bitcoin gedaald in 2026?</h2>

<p>Na een sterke bull run in 2024 en begin 2025 bereikte Bitcoin in 2026 een hoogtepunt van circa <strong>€75.700</strong> (gemiddelde koers over 2026 volgens exchange-rates.org). Sindsdien is de koers significant gedaald: op 12 juni 2026 noteert Bitcoin rond de <strong>€55.000</strong>, een daling van ruim <strong>34%</strong> ten opzichte van het jaarrecord.</p>

<p>In absolute dollars: Bitcoin handelt rond $61.000–$62.000 na eerder te zijn gezakt naar $60.000. De totale marktkapitalisatie van de cryptomarkt is teruggelopen naar circa <strong>$2,1 biljoen</strong>, een forse terugval ten opzichte van de piek.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">€55.000</div>
    <div class="stat-label">Bitcoin koers (12 jun '26)</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">−34%</div>
    <div class="stat-label">t.o.v. 2026-hoogtepunt</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">$2,1T</div>
    <div class="stat-label">Totale marktcap</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">$211B</div>
    <div class="stat-label">Bear market-verliezen</div>
  </div>
</div>

<h2 id="realized-price">De realized price: historische bodem-indicator</h2>

<p>On-chain analytics platform <strong>CryptoQuant</strong> rapporteerde dat de "realized price" van Bitcoin — het gewogen gemiddelde van de inkoopprijs van alle Bitcoin-houders — momenteel rond de <strong>$53.600</strong> ligt. Dit is het niveau waarop gemiddeld gezien alle Bitcoin-houders break-even draaien.</p>

<p>Historisch gezien heeft Bitcoin bij elke grote bear market de realized price bereikt of kort onderschreden, alvorens te herstellen. In 2022 dook de koers enkele maanden onder de realized price; in 2018 en 2015 was eenzelfde patroon te zien. Analist Julio Moreno van CryptoQuant stelt dat het huidige niveau nog steeds boven de realized price ligt, maar dat de markt "dicht bij de bodem" is — mits er geen verdere macro-schokken komen.</p>

<div class="highlight-box">
  <strong>Realized price ≠ garantie:</strong> Hoewel de realized price historisch een goede bodemindicator was, is dit geen zekerheid. In een extreem bearish macro-scenario (stijgende rente, recessie) kan Bitcoin de realized price langdurig onderschrijden.
</div>

<h2 id="etf-uitstroom">ETF-uitstroom: institutionele beleggers verlaten de markt</h2>

<p>De eerste twee weken van juni 2026 tonen zorgwekkende ETF-data: Bitcoin spot-ETFs in de VS noteerden een <strong>gecumuleerde netto-uitstroom van $4,4 miljard in slechts 13 handelsdagen</strong>, een van de langste uitstroomperiodes in de korte geschiedenis van de instrumenten.</p>

<p>Over heel Q1 2026 daalden institutionele Bitcoin ETF-holdings met 17%, van 313.000 BTC naar 261.000 BTC. Hedge funds waren de grootste verkopers: zij verminderden hun posities met 39%. Opvallend is dat banken en sovereign wealth funds juist kochten — een teken dat langetermijnbeleggers de dip aangrijpen.</p>

<h2 id="analisten">Wat analisten nu verwachten</h2>

<table class="comparison-table">
  <thead>
    <tr><th>Bron</th><th>Verwacht bodem</th><th>Tijdlijn</th></tr>
  </thead>
  <tbody>
    <tr><td>CryptoQuant (Julio Moreno)</td><td>$56.000–$70.000</td><td>Q3 2026</td></tr>
    <tr><td>Compass Point</td><td class="td-up">$60.000–$68.000</td><td>Nabij</td></tr>
    <tr><td>Bearish scenario</td><td class="td-down">&lt; $50.000</td><td>Bij macro-verslechtering</td></tr>
    <tr><td>KuCoin Research</td><td>Bear market halverwege</td><td>Herstel eind 2026</td></tr>
  </tbody>
</table>

<p>Er is een duidelijk verschil tussen kortetermijntraders (die uitstappen) en langetermijninstitutionelen (die bijkopen). Dat patroon deed zich ook voor bij de bodem van 2022, vlak voordat het herstel inzette.</p>

<h2 id="risicos">Risico's en scenario's</h2>

<div class="warning-box">
  <div class="warning-title">⚠️ Verdere daling is mogelijk</div>
  Verschillende analisten waarschuwen dat Bitcoin nog onder $50.000 kan zakken als macro-omstandigheden verslechteren — bijvoorbeeld bij hernieuwde inflatie of rentestijgingen door de Fed. Handel nooit met geld dat je niet kunt missen.
</div>

<ul>
  <li><strong>Bull scenario:</strong> Bitcoin houdt boven de realized price ($53.600), ETF-uitstroom stabiliseert, herstel richting $75.000–$80.000 in Q4 2026.</li>
  <li><strong>Base scenario:</strong> Bodem tussen $56.000 en $68.000 in Q3 2026, gevolgd door langzaam herstel.</li>
  <li><strong>Bear scenario:</strong> Macro-verslechtering duwt Bitcoin onder $50.000 en mogelijk naar $40.000 als historische steunniveaus breken.</li>
</ul>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Zitten we nu in een bear market of een correctie?</div>
    <div class="faq-a">Een daling van 20%+ ten opzichte van een recente piek wordt technisch gezien als een bear market beschouwd. Met een daling van 34% van het 2026-hoogtepunt kwalificeren analisten de huidige fase als een bear market. Of het een tijdelijke correctie is of een langdurige neerwaartse trend, hangt sterk af van macro-economische ontwikkelingen.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Is het slim om nu bij te kopen?</div>
    <div class="faq-a">Dit is een persoonlijke beslissing. DCA (dollar-cost averaging) — periodiek een vast bedrag investeren — kan het timingrisico spreiden. Investeer nooit meer dan je bereid bent volledig te verliezen. Dit is geen beleggingsadvies.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Hoe lang duren crypto bear markets gemiddeld?</div>
    <div class="faq-a">Historisch gezien duren crypto bear markets 8 tot 14 maanden. Als de huidige neerwaartse cyclus begon in Q1 2026, zou een bodem en herstel richting Q3–Q4 2026 in lijn zijn met historische patronen. Maar elke cyclus is anders.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 2 — ETF uitstroom ────────── */
const art2Content = `
${quickTake([
  '$4,4 miljard netto-uitstroom uit Bitcoin spot-ETFs in de eerste 13 handelsdagen van juni 2026.',
  'Professionele Bitcoin ETF-holdings daalden 17% in Q1 2026: hedge funds verkochten 39% van hun posities.',
  'Jane Street verlaagde haar Bitcoin ETF-blootstelling en vergrootte juist haar Ethereum-positie.',
  'Banken en sovereign wealth funds kochten juist bij — een klassiek divergentiepatroon bij marktbodems.',
])}

${toc([
  ['etf-uitstroom', 'De grote uitstroom: $4,4 miljard in 13 dagen'],
  ['q1-data', 'Q1 2026: wie verkocht, wie kocht?'],
  ['jane-street', 'Jane Street: Bitcoin verlaten, Ethereum omarmd'],
  ['divergentie', 'Divergentie als bodensignaal?'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="etf-uitstroom">De grote uitstroom: $4,4 miljard in 13 dagen</h2>

<p>De eerste twee handelsweken van juni 2026 zijn historisch slecht voor Bitcoin spot-ETFs. Volgens data van het Bitcoin Foundation News noteerden de grote Amerikaanse Bitcoin-ETFs een <strong>gecumuleerde netto-uitstroom van $4,4 miljard</strong> in 13 opeenvolgende handelsdagen — een van de langste ononderbroken uitstroomreeksen.</p>

<p>Ter vergelijking: in de eerste week na lancering in januari 2024 stroomde er dagelijks meer dan $1 miljard in. De kentering begon in Q1 2026, toen Bitcoin van zijn jaarrecord begon te dalen.</p>

<div class="stat-grid">
  <div class="stat-box stat-down">
    <div class="stat-value">$4,4B</div>
    <div class="stat-label">ETF-uitstroom (13 dagen)</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">−17%</div>
    <div class="stat-label">Institutionele holdings Q1</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">−39%</div>
    <div class="stat-label">Vermindering hedge funds</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">+7.800</div>
    <div class="stat-label">BTC gekocht door banken</div>
  </div>
</div>

<h2 id="q1-data">Q1 2026: wie verkocht, wie kocht?</h2>

<p>CoinShares publiceerde in juni een gedetailleerd rapport over institutionele Bitcoin ETF-holdings in Q1 2026. De bevindingen zijn opvallend:</p>

<table class="comparison-table">
  <thead><tr><th>Type belegger</th><th>Verandering in BTC</th><th>% verandering</th></tr></thead>
  <tbody>
    <tr><td>Hedge funds</td><td class="td-down">−31.400 BTC</td><td class="td-down">−39%</td></tr>
    <tr><td>Brokerage firms</td><td class="td-down">−18.800 BTC</td><td class="td-down">−53%</td></tr>
    <tr><td>Professionele adviseurs</td><td class="td-down">−9.400 BTC</td><td class="td-down">−6%</td></tr>
    <tr><td>Banken</td><td class="td-up">+5.200 BTC</td><td class="td-up">+8%</td></tr>
    <tr><td>Sovereign wealth funds</td><td class="td-up">+2.600 BTC</td><td class="td-up">+14%</td></tr>
  </tbody>
</table>

<p>De conclusie is duidelijk: kortetermijntraders (hedge funds, brokers) nemen winst en verminderen risico; langetermijninstitutionelen (banken, staatsfondsen) zien het als aankoopkans.</p>

<h2 id="jane-street">Jane Street: Bitcoin verlaten, Ethereum omarmd</h2>

<p>Eén van de meest opmerkelijke individuele institutionele moves is die van <strong>Jane Street</strong>, één van de grootste market makers ter wereld. Uit verplichte 13F-rapportages bij de SEC blijkt dat Jane Street haar Bitcoin ETF-posities drastisch verlaagde, terwijl ze tegelijkertijd haar Ethereum-blootstelling verdubbelde.</p>

<p>De motivatie is niet officieel bevestigd, maar marktanalists speculeren dat Jane Street anticipeert op relatieve outperformance van Ethereum na de Pectra-upgrade of gebruik maakt van arbitragemogelijkheden in de ETH/BTC-ratio, die historisch laag staat.</p>

<h2 id="divergentie">Divergentie als bodensignaal?</h2>

<div class="highlight-box">
  <strong>Historisch patroon:</strong> In 2022 bereikte de Bitcoin ETF-uitstroom (via futures-producten) een piek vlak voor de marktbodem. De "smart money" (banken, sovereign funds) begon toen stil bij te kopen, terwijl retail en hedge funds nog uitstapten. Een vergelijkbaar divergentiepatroon tekent zich nu af.
</div>

<p>Dit betekent niet dat een herstel onmiddellijk bevorstaat. Maar het is een signaal dat ervaren, langetermijnbeleggers de huidige prijzen als aantrekkelijk beschouwen voor langdurige positionering — wat de neerwaartse beweging op termijn kan dempen.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Wat is een 13F-rapportage?</div>
    <div class="faq-a">Institutionele beleggers met meer dan $100 miljoen aan beheerd vermogen moeten elk kwartaal een 13F-formulier indienen bij de SEC (Amerikaanse beurswaakhond), met daarin een overzicht van hun aandelenbeleggingen inclusief ETFs. Dit geeft inzicht in wat "smart money" doet.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Heeft ETF-uitstroom direct invloed op de Bitcoin-koers?</div>
    <div class="faq-a">Indirect ja. Wanneer ETF-aandelen worden teruggegeven (redemption), verkopen de ETF-aanbieders de onderliggende Bitcoin om het geld terug te geven aan beleggers. Dit verhoogt de verkoopdruk op de spotmarkt. Bij grote uitstromen kan dit de koers neerwaarts drukken.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 3 — Ethereum crasht ────────── */
const art3Content = `
${quickTake([
  'Ethereum noteert op 12 juni 2026 circa €1.480 ($1.617) — het laagste punt in maanden.',
  'Sentiment indicator: Ethereum zit in de "extreme angst"-zone; sociale media staan vol bearish berichten.',
  'US Ethereum ETFs noteerden in mei 2026 een netto-uitstroom van $401 miljoen — derde grootste ooit.',
  'Kritiek steunniveau: als ETH onder €1.420 ($1.545) zakt, is €920 ($1.000) het volgende doelwit.',
])}

${toc([
  ['koers', 'Ethereum koers: van hoogtepunt naar dieptepunt'],
  ['sentiment', 'Sentiment: extreme angst domineert'],
  ['etf', 'ETH ETF-uitstroom: institutionelen trekken zich terug'],
  ['technisch', 'Technische analyse: cruciale niveaus'],
  ['pectra', 'Pectra in perspectief: waarom de upgrade niet helpt'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="koers">Ethereum koers: van hoogtepunt naar dieptepunt</h2>

<p>Ethereum noteert op 12 juni 2026 circa <strong>€1.480</strong> (ongeveer $1.617) — een daling van meer dan <strong>17% in de afgelopen twee weken</strong>. Daarmee presteert Ethereum slechter dan Bitcoin, dat in dezelfde periode met circa 14% daalde. De ETH/BTC-ratio — die aangeeft hoeveel BTC één ETH waard is — zit op zijn laagste punt in ruim twee jaar.</p>

<p>De daling valt samen met bredere macro-onzekerheid en een negatief sentiment in de cryptomarkt. Ethereum heeft in 2026 nog geen nieuw all-time high bereikt, in tegenstelling tot Bitcoin, dat begin 2026 nog boven de €75.000 piekte.</p>

<div class="stat-grid">
  <div class="stat-box stat-down">
    <div class="stat-value">€1.480</div>
    <div class="stat-label">ETH koers (12 jun '26)</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">−17%</div>
    <div class="stat-label">Daling afgelopen 2 weken</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">−$401M</div>
    <div class="stat-label">ETH ETF uitstroom mei</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">€1.420</div>
    <div class="stat-label">Kritiek steunniveau</div>
  </div>
</div>

<h2 id="sentiment">Sentiment: extreme angst domineert</h2>

<p>Volgens BeInCrypto is het sociale sentiment rondom Ethereum gedaald naar de "extreme angst"-zone — een niveau dat voor het laatste werd gezien in de bear market van 2022. Op platformen als X (voorheen Twitter) en Reddit domineren bearish berichten; het volume van Ethereum-gerelateerde discussies is het laagste in jaren.</p>

<p>Paradoxaal gezien is extreme angst in crypto-markten historisch gezien soms een contrarisch koopsignaal. In 2022 markeerde soortgelijk extreme angst de langetermijnbodem van Ethereum bij ~$880. Of datzelfde patroon zich nu herhaalt, hangt af van macro-factoren buiten de crypto-sector.</p>

<h2 id="etf">ETH ETF-uitstroom: institutionelen trekken zich terug</h2>

<p>Amerikaanse Ethereum spot-ETFs — goedgekeurd in juli 2024 — presteerden nooit zo sterk als hun Bitcoin-equivalenten. In mei 2026 verslechterde de situatie verder: <strong>netto-uitstroom van $401 miljoen</strong>, de op twee na grootste maandelijkse uitstroom in de korte geschiedenis van het product.</p>

<p>Opmerkelijk is dat Jane Street, zoals ook bij Bitcoin gemeld, juist haar Ethereum-posities heeft vergroot. Maar de totale institutionele vraag is onvoldoende om de verkoopdruk te compenseren.</p>

<h2 id="technisch">Technische analyse: cruciale niveaus</h2>

<p>Technisch analisten wijzen op twee cruciale niveaus voor Ethereum:</p>
<ul>
  <li><strong>€1.420 ($1.545):</strong> Dit is het primaire steunniveau. Als ETH hier doorheen zakt op weeksluitingsbasis, versnelt de verkoop vermoedelijk.</li>
  <li><strong>€920 ($1.000):</strong> Het volgende grote steunniveau, dat historisch als "bodem" fungeerde in 2022. Meerdere analisten noemen dit niveau als worst-case scenario voor 2026.</li>
</ul>

<div class="warning-box">
  <div class="warning-title">⚠️ Hoog risico op verdere daling</div>
  Ethereum heeft een historisch gemiddeld juni-rendement van −6,74% (mediaan −5,65%). Slechts drie van de afgelopen tien junes sloten groen. Seizoenspatronen suggereren verdere druk de komende weken.
</div>

<h2 id="pectra">Pectra in perspectief: waarom de upgrade niet helpt</h2>

<p>De Pectra-upgrade — de grootste Ethereum-update in jaren — verbetert technisch de fundamentals van het netwerk. Maar in een bearish marktomgeving reageert de koers niet positief op fundamenteel goed nieuws. "Buy the rumour, sell the news" heeft zich ook hier voltrokken: Ethereum is na de upgrade verder gedaald.</p>

<p>Dit is een bekend patroon: technologische upgrades verbeteren de lange termijn waardepropositie, maar geven geen directe koersimpuls als het macro-klimaat ongunstig is.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Kan Ethereum echt naar $1.000 zakken?</div>
    <div class="faq-a">Technisch is het mogelijk. Meerdere analisten noemen $1.000 als worst-case scenario voor 2026 bij een verdere macro-verslechtering. Historisch heeft Ethereum eerder extreme dalingen meegemaakt (−92% in 2018, −80% in 2022). Dat maakt het asset potentieel lucratief op lange termijn, maar ook bijzonder riskant op korte termijn.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Presteert Ethereum altijd slechter dan Bitcoin in een bear market?</div>
    <div class="faq-a">Niet altijd, maar vaak. In bear markets heeft Bitcoin de neiging om relatief beter te presteren omdat het als "digitaal goud" wordt gezien. Altcoins, waaronder Ethereum, krijgen doorgaans zwaarder klappen. In herstelperiodes draait dit soms om.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 4 — Solana bear ────────── */
const art4Content = `
${quickTake([
  'Solana daalt meer dan 20% in juni 2026 — harder dan Ethereum (−17%) en Bitcoin (−14%).',
  'Ondanks de daling behoudt Solana een toppositie: Fortune plaatst SOL in zijn top 3 crypto-ranking voor 2026.',
  'SOL Strategies, een Canadees beursgenoteerd bedrijf, kocht in juni voor $18 miljoen aan SOL.',
  'Fundamentals blijven sterk: Solana is de primaire USDC-infrastructuur voor Circle en groeit bij banken als JPMorgan.',
])}

${toc([
  ['daling', 'De daling: waarom daalt Solana harder?'],
  ['fortune', 'Fortune top 3: erkenning ondanks koersdruk'],
  ['usdc', 'USDC en JPMorgan: fundamentele groei'],
  ['sol-strategies', 'SOL Strategies: institutioneel koopt de dip'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="daling">De daling: waarom daalt Solana harder?</h2>

<p>In de eerste weken van juni 2026 daalde Solana (SOL) met meer dan <strong>20%</strong> — aanmerkelijk meer dan Ethereum (−17%) en Bitcoin (−14%). De relatieve zwakte van Solana ten opzichte van de twee grootste coins is opvallend, gezien de sterke fundamentals van het netwerk.</p>

<p>De verklaring ligt grotendeels in het risicokarakter van de asset. In een bearish omgeving worden kleinere coins met meer risico gezien dan Bitcoin, ongeacht hun technologische merites. Beleggers die risico willen verminderen, verkopen altcoins zoals Solana vóór ze Bitcoin liquideren. Dit "risk-off" patroon is ook terug te zien in de ETH/BTC- en SOL/BTC-ratio's, die beide sterk daalden.</p>

<div class="stat-grid">
  <div class="stat-box stat-down">
    <div class="stat-value">&gt;−20%</div>
    <div class="stat-label">SOL daling juni 2026</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">−12%</div>
    <div class="stat-label">SOL/ETH ratio (jun)</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">Top 3</div>
    <div class="stat-label">Fortune Crypto 100 ranking</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">$18M</div>
    <div class="stat-label">SOL Strategies aankoop</div>
  </div>
</div>

<h2 id="fortune">Fortune top 3: erkenning ondanks koersdruk</h2>

<p>Terwijl de koers daalt, blijft Solana's reputatie in de sector sterk. <strong>Fortune</strong> plaatste Solana in zijn Crypto 100-lijst voor 2026 op de <strong>derde positie</strong> voor blockchains en protocollen — alleen voorafgegaan door Bitcoin en Ethereum. De rangschikking is gebaseerd op netwerkherstelbestendigheid, adoptie, ontwikkelersactiviteit en ecosysteemgroei.</p>

<p>Solana scoort bijzonder goed op transactievolume en kosten: met gemiddeld meer dan 1.000 transacties per seconde (TPS) en kosten van minder dan een eurocent per transactie, is het netwerk efficiënter dan de meeste alternatieven.</p>

<h2 id="usdc">USDC en JPMorgan: fundamentele groei</h2>

<p>Ondanks de koersdaling groeien de fundamentals van Solana. Circle's USD Coin (USDC) heeft Solana aangewezen als de <strong>primaire blockchain-infrastructuur</strong> voor zijn digitale dollar — een erkenning van de netwerksnelheid en -betrouwbaarheid.</p>

<p>Opmerkelijker is de samenwerking met <strong>JPMorgan</strong>, die het Solana-netwerk gebruikt voor institutionele betalingsinfrastructuur. Dit soort adoptie door traditionele financiële giganten geeft Solana een fundamentele waardepropositie die losstaat van de dagelijkse koersbewegingen.</p>

<h2 id="sol-strategies">SOL Strategies: institutioneel koopt de dip</h2>

<p>In juni 2026 maakte <strong>SOL Strategies</strong>, een Canadees beursgenoteerd bedrijf dat focust op het Solana-ecosysteem, bekend voor $18 miljoen aan SOL te hebben gekocht. Dit volgt op eerdere aankopen in de loop van 2025. De strategie lijkt vergelijkbaar met die van MicroStrategy (nu Strategy) voor Bitcoin: grote hoeveelheden kopen en langdurig aanhouden.</p>

<div class="highlight-box">
  <strong>Verschil prijs vs fundamentals:</strong> De Solana-koers daalt door macro-druk en "risk-off"-sentiment. De fundamentele metrics — transactievolume, ontwikkelaarsactiviteit, institutionele adoptie — blijven sterk of groeien. Dit is geen garantie voor koersherstel, maar het suggereert dat de technologische propositie intact is.
</div>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Is Solana een goede langetermijninvestering?</div>
    <div class="faq-a">Dat hangt af van je eigen analyse en risicotolerantie. Solana heeft sterke technologische fundamentals en groeiende institutionele adoptie. Tegelijkertijd is het een volatile asset die in bear markets zwaarder daalt dan Bitcoin. Doe altijd je eigen onderzoek. Dit is geen beleggingsadvies.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Waarom daalt Solana harder dan Bitcoin in een bear market?</div>
    <div class="faq-a">Bitcoin wordt gezien als de "veiligste" crypto — een soort digitaal goud. Altcoins zoals Solana worden als risicovoller beschouwd. In een "risk-off" omgeving verkopen beleggers eerst hun risicovolste activa. Bij een herstel draait dit patroon vaak om: altcoins presteren dan juist sterker dan Bitcoin.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 5 — Belasting 2026 ────────── */
const art5Content = `
${quickTake([
  'Crypto valt in box 3 van de inkomstenbelasting — belasting over fictief rendement van 6,04%.',
  'Peildatum is 1 januari 2026: de waarde van al je crypto op die datum is bepalend.',
  'Nieuw in 2026: DAC8-richtlijn verplicht exchanges zoals Bitvavo al je transacties te melden aan de Belastingdienst.',
  'DeFi-posities, staking-rewards en NFTs moeten allemaal worden opgegeven.',
])}

${toc([
  ['box3', 'Crypto in box 3: de basisregel'],
  ['peildatum', 'Peildatum 1 januari: zo bepaal je de waarde'],
  ['defi', 'DeFi, staking en NFTs: hoe geef je dit op?'],
  ['dac8', 'DAC8: je exchange deelt je data automatisch'],
  ['tips', 'Praktische tips voor je aangifte'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="box3">Crypto in box 3: de basisregel</h2>

<p>In Nederland wordt cryptocurrency behandeld als een <strong>bezitting in box 3</strong> (sparen en beleggen). Dit geldt ongeacht het type: Bitcoin, altcoins, stablecoins, DeFi-tokens, NFTs met vermogenswaarde — ze vallen allemaal in box 3.</p>

<p>In box 3 betaal je belasting over een <strong>fictief rendement</strong>, niet over je werkelijke winst of verlies. Voor 2025 (aangifte in 2026) is het fictief rendement voor beleggingen vastgesteld op <strong>6,04%</strong>. Over dat fictieve rendement betaal je 36% belasting.</p>

<div class="highlight-box">
  <strong>Rekenvoorbeeld:</strong> Je had op 1 januari 2026 voor €30.000 aan crypto. Fictief rendement: 6,04% × €30.000 = €1.812. Belasting: 36% × €1.812 = <strong>€652</strong>. Geen vermogenswinstbelasting — dit is belasting over fictief rendement, ook als je verlies hebt gemaakt.
</div>

<h2 id="peildatum">Peildatum 1 januari: zo bepaal je de waarde</h2>

<p>De waarde van je crypto op <strong>1 januari 2026 om 00:00 uur</strong> is bepalend. Niet de waarde op het moment van aangifte, niet je aankoopprijs — alleen de waarde op die peildatum.</p>

<p>Gezien de bear market van juni 2026 kan de waarde op 1 januari 2026 (vroeg in het jaar, toen Bitcoin nog hoger stond) hoger zijn dan de huidige koers. Dat betekent dat je belasting betaalt over een waarde die nu niet meer bestaat — een frustrerende maar wettelijke situatie.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">1 jan</div>
    <div class="stat-label">Peildatum box 3</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">6,04%</div>
    <div class="stat-label">Fictief rendement 2025</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">36%</div>
    <div class="stat-label">Box 3 belastingtarief</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">€57.684</div>
    <div class="stat-label">Heffingsvrij vermogen 2026</div>
  </div>
</div>

<h2 id="defi">DeFi, staking en NFTs: hoe geef je dit op?</h2>

<ul>
  <li><strong>Staking-rewards:</strong> De ontvangen tokens tellen als vermogen op de peildatum. Er is nog discussie of rewards ook als inkomen in box 1 kunnen vallen — raadpleeg een belastingadviseur bij grote bedragen.</li>
  <li><strong>Liquidity pool-posities:</strong> Gebruik de waarde van de onderliggende activa op 1 januari.</li>
  <li><strong>Lending (Aave, Compound):</strong> Uitgeleende crypto telt mee als bezitting; je schuld aan het protocol is aftrekbaar als box 3-schuld.</li>
  <li><strong>NFTs:</strong> NFTs met een objectieve handelswaarde (bijv. recent verkochte vergelijkbare NFTs) vallen in box 3.</li>
</ul>

<div class="warning-box">
  <div class="warning-title">⚠️ Verzwijgen is strafbaar</div>
  Crypto op buitenlandse exchanges — ook niet-EU-exchanges — moet worden opgegeven. Verzwijgen is fiscale fraude en kan leiden tot boetes tot 300% van de verschuldigde belasting en een strafrechtelijke vervolging.
</div>

<h2 id="dac8">DAC8: je exchange deelt je data automatisch</h2>

<p>Per 1 januari 2026 is de <strong>DAC8-richtlijn</strong> volledig van kracht in de EU. Dit verplicht MiCA-gecertificeerde crypto-exchanges (waaronder Bitvavo, Coinbase EU, Kraken EU) om transactiedata van hun klanten automatisch te delen met de belastingautoriteiten van het betreffende EU-land.</p>

<p>Concreet: Bitvavo stuurt jouw handelshistorie, stortingen en opnames automatisch naar de Belastingdienst. Dit werkt vergelijkbaar met hoe banken al jaren je rekeningoverzichten delen. Je aangifte wordt daarmee steeds meer een controlemoment — de Belastingdienst weet al wat je hebt gedaan.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Betaal ik belasting als mijn crypto in waarde is gedaald?</div>
    <div class="faq-a">Ja, mogelijk wel. In box 3 betaal je over de waarde op de peildatum (1 januari), ongeacht wat er daarna met de koers gebeurt. Als Bitcoin op 1 januari 2026 €68.000 waard was en nu €55.000, betaal je toch over de peildatumwaarde van €68.000.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Moet ik een hardware wallet ook opgeven?</div>
    <div class="faq-a">Ja. Of je crypto op een exchange staat, in een software wallet of op een hardware wallet — het maakt geen verschil voor de belastingplicht. De totale waarde op 1 januari moet worden opgegeven.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Welke hulpmiddelen zijn er voor crypto-aangifte?</div>
    <div class="faq-a">Koinly, CoinTracking en CryptoTax.nl zijn populaire platforms die je handelshistorie importeren en automatisch belastingrapporten genereren compatibel met de Nederlandse Belastingdienst. De kosten zijn fiscaal aftrekbaar als kosten van vermogensbeheer.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 6 — Bull market voorbij? ────────── */
const art6Content = `
${quickTake([
  'Bitcoin daalde 34% van zijn 2026-hoogtepunt — officieel bear market-territorium.',
  'Analisten zijn verdeeld: sommigen zien een tijdelijke correctie, anderen een echte bearmarkt.',
  'Macrofactoren spelen een grote rol: inflatieonzekerheid en kwartaalresultaten techbedrijven bepalen het lot van risicovolle assets.',
  'Institutioneel: hedge funds verkopen, maar banken en sovereign funds kopen bij — een klassiek divergentiepatroon.',
])}

${toc([
  ['definitie', 'Is dit een bear market? De definitie'],
  ['macro', 'Macrofactoren: de aanjager achter de daling'],
  ['bullvsbear', 'Bull vs. bear: wat zeggen de argumenten?'],
  ['scenario', 'Drie scenario\'s voor de rest van 2026'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="definitie">Is dit een bear market? De definitie</h2>

<p>Technisch gezien geldt een daling van meer dan 20% als de definitie van een bear market. Bitcoin daalde van zijn 2026-hoogtepunt van circa €75.700 naar de huidige ~€55.000 — een daling van <strong>34%</strong>. Volgens de technische definitie zitten we dus inderdaad in een bear market.</p>

<p>Maar er is nuance. In de crypto-wereld zijn correcties van 30–50% binnen een bredere bull run historisch normaal. De vraag is of dit het begin is van een langdurige neerwaartse cyclus (zoals 2018 en 2022) of een tijdelijke correctie binnen een bredere bullish trend (zoals de correcties van mei 2021 en september 2021).</p>

<h2 id="macro">Macrofactoren: de aanjager achter de daling</h2>

<p>De crypto-markt opereert niet in een vacuüm. De huidige daling valt samen met:</p>
<ul>
  <li><strong>Macro-onzekerheid:</strong> Nieuwe inflatiedata heeft twijfels gezaaid over het tempo van Fed-renteverlagingen. Hogere rente maakt risicovolle assets minder aantrekkelijk.</li>
  <li><strong>Technische correctie:</strong> Na een sterke bull run in 2024–begin 2026 was een correctie technisch te verwachten. Winst nemen na een verdubbeling of meer is normaal marktgedrag.</li>
  <li><strong>Seasonaliteit:</strong> Historisch gezien zijn mei en juni zwakke maanden voor crypto — het patroon "sell in May and go away" geldt ook in crypto-markten.</li>
</ul>

<div class="stat-grid">
  <div class="stat-box stat-down">
    <div class="stat-value">−34%</div>
    <div class="stat-label">BTC daling van 2026-top</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">$2,1T</div>
    <div class="stat-label">Huidige marktcap</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">22</div>
    <div class="stat-label">Fear &amp; Greed Index</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">Q3 '26</div>
    <div class="stat-label">Verwachte bodem (consensus)</div>
  </div>
</div>

<h2 id="bullvsbear">Bull vs. bear: wat zeggen de argumenten?</h2>

<table class="comparison-table">
  <thead><tr><th>Bullish argumenten</th><th>Bearish argumenten</th></tr></thead>
  <tbody>
    <tr><td>Bitcoin realized price ($53.600) biedt steun</td><td>Macro-onzekerheid blijft</td></tr>
    <tr><td>Banken en sovereign funds kopen bij</td><td>Hedge funds en brokers verkopen massal</td></tr>
    <tr><td>Historisch: bear duurt 8–14 maanden</td><td>Ethereum en altcoins kunnen nog veel verder dalen</td></tr>
    <tr><td>Halving-cyclus wijst op herstel eind 2026</td><td>$50.000 is geen definitief steunniveau</td></tr>
    <tr><td>Institutional adoption groeit structureel</td><td>Seculiere bear scenario niet uitgesloten</td></tr>
  </tbody>
</table>

<h2 id="scenario">Drie scenario's voor de rest van 2026</h2>

<p><strong>Scenario 1 — Tijdelijke correctie (basis):</strong> Bitcoin houdt de $56.000–$60.000 als bodem, macro verbetert in H2 2026, herstel richting $75.000–$80.000 eind 2026. Kans: 45% volgens mediane analistenconsensus.</p>

<p><strong>Scenario 2 — Langdurige bear (negatief):</strong> Macro verslechtert, Bitcoin zakt door $50.000, langdurig herstel duurt tot 2027. Kans: 35% volgens mediane analistenconsensus.</p>

<p><strong>Scenario 3 — Snelle V-herstel (bullish):</strong> Positief macro-nieuws of grote institutionele aankondiging stuwt Bitcoin snel terug boven $70.000. Historisch zeldzaam na een daling van >30%, maar niet onmogelijk. Kans: 20% volgens mediane analistenconsensus.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Hoe lang duurt de gemiddelde crypto bear market?</div>
    <div class="faq-a">De crypto bear markets van 2018 en 2022 duurden respectievelijk 12 en 14 maanden van piek naar bodem. Als de huidige cyclus begon in januari 2026 (na de piek), zou een bodem tussen Q3 en Q4 2026 historisch in lijn zijn.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Moet ik nu mijn crypto verkopen?</div>
    <div class="faq-a">Dat is een persoonlijke beslissing afhankelijk van je tijdshorizon, risicotolerantie en financiële situatie. Langetermijnbeleggers die in Bitcoin geloven, houden doorgaans door bear markets heen. Kortetermijntraders stappen soms uit om later lager te herinstappen. Er is geen universeel goed antwoord. Dit is geen beleggingsadvies.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 7 — Bear market overleven ────────── */
const art7Content = `
${quickTake([
  'Een bear market is emotioneel zwaar — maar ook de fase waarin de beste langetermijnposities worden opgebouwd.',
  'DCA (dollar-cost averaging): periodiek kleine bedragen investeren verlaagt de gemiddelde inkoopprijs.',
  'Portfolio-diversificatie en positiegroottes begrenzen het risico op permanente verliezen.',
  'Psychologie: FOMO en fear zijn je grootste vijanden. Heb een strategie en houd je eraan.',
])}

${toc([
  ['psychologie', 'Psychologie: de grootste vijand ben jezelf'],
  ['dca', 'Strategie 1: Dollar-Cost Averaging (DCA)'],
  ['positiegrootte', 'Strategie 2: positiegroottes en risicobeheer'],
  ['stablecoins', 'Strategie 3: stablecoins als buffer'],
  ['fundamentals', 'Strategie 4: focus op fundamentals'],
  ['belasting', 'Strategie 5: gebruik belastingverliesverrekening'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="psychologie">Psychologie: de grootste vijand ben jezelf</h2>

<p>In een bear market dalen niet alleen koersen — ook het vertrouwen en de discipline van beleggers. Onderzoek toont aan dat de meeste particuliere beleggers op de slechts mogelijke momenten kopen (na sterke stijgingen, gedreven door FOMO) en verkopen (na sterke dalingen, gedreven door angst). Dit patroon wordt "buy high, sell low" genoemd, en is de voornaamste reden waarom de meeste beleggers slechter presteren dan de markt.</p>

<p>De oplossing: heb een plan en houd je eraan, ongeacht de emoties van de dag.</p>

<div class="highlight-box">
  <strong>Onthoud:</strong> In een bear market is geld niet "verdwenen" — het is van de een naar de ander gegaan. De beste langetermijnrendementen worden doorgaans behaald door wie kopen en aanhouden tijdens bear markets, niet door wie uitstapt en later duurder terugkomt.
</div>

<h2 id="dca">Strategie 1: Dollar-Cost Averaging (DCA)</h2>

<p><strong>Dollar-Cost Averaging (DCA)</strong> is de strategie van periodiek een vast bedrag investeren, ongeacht de koers. Koop je elke maand voor €100 Bitcoin, dan koop je bij lage koersen meer BTC en bij hoge koersen minder — wat resulteert in een lagere gemiddelde inkoopprijs over tijd.</p>

<p>DCA werkt het best voor beleggers die:</p>
<ul>
  <li>Een langetermijnhorizon hebben (minimaal 3–5 jaar)</li>
  <li>Niet de tijd hebben of willen besteden aan dagelijkse koersanalyse</li>
  <li>Emotioneel rust willen bewaren</li>
</ul>

<h2 id="positiegrootte">Strategie 2: positiegroottes en risicobeheer</h2>

<p>Nooit meer investeren in een enkele positie dan je bereid bent volledig te verliezen. Een vuistregel die door veel ervaren beleggers wordt gehanteerd: <strong>crypto mag maximaal 5–10% van je totale beleggingsportefeuille uitmaken</strong>. Binnen crypto zelf is diversificatie van belang: leg niet alles in één coin.</p>

<h2 id="stablecoins">Strategie 3: stablecoins als buffer</h2>

<p>Een gedeelte van je crypto-portefeuille aanhouden in stablecoins (USDC, EURC) geeft je liquiditeit om bij te kopen op dieptepunten, zonder je crypto te moeten omzetten naar fiat (met mogelijke belastingimplicaties).</p>

<h2 id="fundamentals">Strategie 4: focus op fundamentals</h2>

<p>In een bear market daalt nagenoeg alles — ook goede projecten. De kunst is onderscheid te maken tussen projecten die dalen door marktsentiment (maar sterke fundamentals hebben) versus projecten die dalen omdat de technologie of het team tekortschiet. Focuseer op netwerk-activiteit, ontwikkelaarsgemeenschap en institutionele adoptie als indicatoren.</p>

<h2 id="belasting">Strategie 5: belastingverliesverrekening</h2>

<p>In box 3 kun je de waarde van je crypto-bezittingen op de peildatum (1 januari) opgeven tegen de werkelijke marktwaarde. Als je voor de peildatum van 2027 aanzienlijke verliezen hebt, verlaagt dit je box 3-belastinggrondslag. Overleg met een belastingadviseur over de timing van eventuele aan- en verkopen in relatie tot peildata.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Moet ik uitstappen en later terugkopen?</div>
    <div class="faq-a">Markttiming is bewezen moeilijk — ook voor professionele beleggers. Onderzoek toont aan dat beleggers die "uitstappen en later terugkopen" de beste handelsdagen vaak missen. Mis je de 10 beste handelsdagen in een jaar, dan halveert je rendement doorgaans. Tenzij je een bewezen timing-strategie hebt, is uitstappen riskant.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is het verschil tussen een bear market en een correctie?</div>
    <div class="faq-a">Een correctie is een tijdelijke daling van 10–20% binnen een grotere opwaartse trend. Een bear market is een daling van meer dan 20% van een recente piek, waarbij het pessimistisch sentiment langdurig aanhoudt. In de praktijk is het verschil pas achteraf duidelijk.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 8 — Marktanalyse ────────── */
const art8Content = `
${quickTake([
  'Bitcoin: ~€55.000 ($61.165) op 12 juni 2026 — marktcap $2,1 biljoen.',
  'Ethereum: ~€1.480 ($1.617) — extreme angst in sentiment, historisch laag versus Bitcoin.',
  'Fear & Greed Index: 22 (Angst) — markt is nog niet in extreme bodemterritorie, maar close.',
  'Solana daalt harder dan alles: −20%+ in juni, maar Fortune-erkenning en institutionele kopers in actie.',
])}

${toc([
  ['overzicht', 'Weekoverzicht: breed rood, angst domineert'],
  ['koersen', 'Koerstabel: de top 10 in beeld'],
  ['fear-greed', 'Fear & Greed Index: 22 — angst, maar geen wanhoop'],
  ['on-chain', 'On-chain: wat zegt de data?'],
  ['outlook', 'Vooruitblik komende week'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="overzicht">Weekoverzicht: breed rood, angst domineert</h2>

<p>De week van 8–12 juni 2026 was voor cryptobeleggers zwaar. De gehele markt daalde breed: Bitcoin verloor circa 5% op weekbasis, Ethereum bijna 12% en Solana meer dan 15%. De totale marktkapitalisatie daalde van $2,25 biljoen naar $2,11 biljoen.</p>

<p>Het macro-klimaat bleef onzeker: nieuwe inflatiedata uit de VS gaf gemengde signalen, waardoor de markten fluctueerden. De narratief van "Fed-renteverlagingen als redder" verloor aan kracht, wat risicovolle activa breed onder druk zette.</p>

<h2 id="koersen">Koerstabel: de top 10 in beeld</h2>

<table class="comparison-table">
  <thead>
    <tr><th>Coin</th><th>Koers (12 jun '26)</th><th>7 dagen</th><th>YTD</th></tr>
  </thead>
  <tbody>
    <tr><td>Bitcoin (BTC)</td><td>~€55.000</td><td class="td-down">−5,1%</td><td class="td-down">−17%</td></tr>
    <tr><td>Ethereum (ETH)</td><td>~€1.480</td><td class="td-down">−11,8%</td><td class="td-down">−38%</td></tr>
    <tr><td>Solana (SOL)</td><td>N/B*</td><td class="td-down">−15,2%</td><td class="td-down">−32%</td></tr>
    <tr><td>BNB</td><td>N/B*</td><td class="td-down">−6,4%</td><td class="td-down">−22%</td></tr>
    <tr><td>XRP</td><td>N/B*</td><td class="td-down">−9,1%</td><td class="td-down">−29%</td></tr>
  </tbody>
</table>
<p style="font-size:0.8rem;color:#94a3b8;margin-top:-0.5rem">*N/B = niet beschikbaar in deze rapportage. Zie live koersen op de <a href="/koersen">koersenpagina</a>.</p>

<h2 id="fear-greed">Fear &amp; Greed Index: 22 — angst, maar geen wanhoop</h2>

<p>De <strong>Crypto Fear &amp; Greed Index</strong> staat op <strong>22</strong> — in de "Angst"-zone (0 = extreme angst, 100 = extreme hebzucht). Dit is een significante omslag: slechts enkele maanden geleden stond de index nog boven de 70.</p>

<p>Een stand van 22 is psychologisch voor veel beleggers een pijnlijk niveau — maar historisch gezien zijn dit de niveaus waarbij langetermijninvesteerders beginnen bij te kopen. Extreme angst (index &lt; 10) werd in 2022 bij de bodem bereikt. Momenteel zijn we nog niet in dat extreme territorium.</p>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">22</div>
    <div class="stat-label">Fear &amp; Greed Index</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">$2,11T</div>
    <div class="stat-label">Totale marktcap</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">52%</div>
    <div class="stat-label">Bitcoin Dominance</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">$68B</div>
    <div class="stat-label">24u handelsvolume</div>
  </div>
</div>

<h2 id="on-chain">On-chain: wat zegt de data?</h2>

<p>On-chain data biedt een genuanceerder beeld dan de koers alleen:</p>
<ul>
  <li><strong>Long-term holders (LTH):</strong> Het percentage Bitcoin dat meer dan een jaar niet bewogen heeft, blijft hoog. Ervaren houders verkopen niet.</li>
  <li><strong>Exchange reserves:</strong> De hoeveelheid Bitcoin op exchanges daalt — minder BTC beschikbaar voor directe verkoop. Historisch een positief signaal.</li>
  <li><strong>Realized price:</strong> ~$53.600 — we naderen een historisch steunniveau.</li>
  <li><strong>NUPL (Net Unrealized Profit/Loss):</strong> Daalt richting "Capitulation"-zone, maar is er nog niet. Bodem wordt doorgaans bereikt bij echte capitulatie.</li>
</ul>

<div class="highlight-box">
  <strong>On-chain consensus:</strong> De data wijst niet op onmiddellijk herstel, maar ook niet op een catastrofale verdere daling. We bevinden ons in een "pijn"-fase — lang genoeg gedaald om zwakke handen uit te schudden, maar nog niet diep genoeg voor een echte capitulatie-bodem.
</div>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Wat is Bitcoin Dominance en waarom is het gestegen?</div>
    <div class="faq-a">Bitcoin Dominance geeft aan welk percentage van de totale crypto-marktcap Bitcoin uitmaakt. Bij 52% (gestegen ten opzichte van eerder dit jaar) presteren altcoins slechter dan Bitcoin. In bear markets stijgt de Bitcoin Dominance typisch: beleggers verkopen risicovolstere altcoins eerder dan Bitcoin.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Hoe betrouwbaar zijn on-chain indicatoren?</div>
    <div class="faq-a">On-chain data is transparant en manipulatie-resistent, maar de interpretatie ervan is niet altijd eenduidig. Gebruik ze als aanvullende context bij andere analyses, niet als enige beslissingsgrond. Historische patronen herhalen zich niet altijd exact.</div>
  </div>
</div>
`

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'mock-1',
    title: 'Is €55.000 de bodem? Bitcoin daalt 34% van zijn 2026-hoogtepunt te midden van grote ETF-uitstroom',
    slug: 'bitcoin-55000-bodem-bear-market-2026-etf-uitstroom',
    excerpt: 'Bitcoin noteert op 12 juni 2026 rond €55.000 — een daling van 34% ten opzichte van het jaarrecord. Bear market-verliezen naderen $211 miljard. CryptoQuant ziet mogelijke bodem in Q3 2026.',
    content: art1Content,
    image_url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80',
    image_alt: 'Bitcoin munt op een rode achtergrond met dalende grafiek',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'bitcoin', tags: ['bitcoin', 'bear-market', 'koers', 'etf', 'bodem'],
    status: 'published', featured: true, view_count: 5821,
    published_at: ago(45), created_at: ago(45), updated_at: ago(45),
  },
  {
    id: 'mock-2',
    title: 'Bitcoin ETFs: $4,4 miljard uitstroom in 13 dagen — hedge funds verlaten de markt',
    slug: 'bitcoin-etf-uitstroom-4-miljard-hedge-funds-verkopen',
    excerpt: 'Professionele Bitcoin ETF-holdings daalden 17% in Q1 2026. Hedge funds verkochten 39% van hun posities. Maar banken en sovereign wealth funds kopen juist bij — een klassiek divergentiepatroon.',
    content: art2Content,
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    image_alt: 'Handelsschermen met rode koersgrafieken',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'bitcoin', tags: ['bitcoin', 'etf', 'institutioneel', 'uitstroom', 'hedge-funds'],
    status: 'published', featured: false, view_count: 3204,
    published_at: ago(480), created_at: ago(480), updated_at: ago(480),
  },
  {
    id: 'mock-3',
    title: 'Ethereum koers crasht naar €1.480: extreme angst domineert sentiment',
    slug: 'ethereum-koers-crash-1480-extreme-angst-sentiment',
    excerpt: 'Ethereum noteert ~€1.480 — het laagste punt in maanden. ETH ETF-uitstroom bedraagt $401M in mei. Analisten waarschuwen voor een daling richting €920 ($1.000) als het kritieke steunniveau breekt.',
    content: art3Content,
    image_url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80',
    image_alt: 'Ethereum logo met dalende koersgrafiek',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'ethereum', tags: ['ethereum', 'koers', 'daling', 'etf', 'angst'],
    status: 'published', featured: false, view_count: 4102,
    published_at: ago(900), created_at: ago(900), updated_at: ago(900),
  },
  {
    id: 'mock-4',
    title: 'Solana daalt harder dan Ethereum in juni — maar Fortune plaatst SOL in zijn top 3 van 2026',
    slug: 'solana-daling-juni-2026-harder-ethereum-fortune-top-3',
    excerpt: 'Solana verliest meer dan 20% in juni 2026. Toch erkent Fortune het netwerk in zijn top 3 crypto-ranking. SOL Strategies kocht voor $18M, Circle maakt Solana primaire USDC-infrastructuur.',
    content: art4Content,
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
    image_alt: 'Blockchain netwerkvisualisatie in blauw',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'altcoins', tags: ['solana', 'sol', 'daling', 'fortune', 'usdc'],
    status: 'published', featured: false, view_count: 2876,
    published_at: ago(1260), created_at: ago(1260), updated_at: ago(1260),
  },
  {
    id: 'mock-5',
    title: 'Crypto belasting aangifte 2026: box 3, DAC8 en DeFi uitgelegd',
    slug: 'crypto-belasting-aangifte-2026-box3-dac8-defi',
    excerpt: 'Aangifte 2026 staat voor de deur. Box 3, fictief rendement van 6,04%, peildatum 1 januari. Met DAC8 deelt Bitvavo je transacties automatisch met de Belastingdienst. Alles wat je moet weten.',
    content: art5Content,
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    image_alt: 'Laptop met belastingformulier en crypto-grafiek',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'regulering', tags: ['belasting', 'box3', 'dac8', 'aangifte', 'defi'],
    status: 'published', featured: false, view_count: 6310,
    published_at: ago(1620), created_at: ago(1620), updated_at: ago(1620),
  },
  {
    id: 'mock-6',
    title: 'Is de crypto bull market van 2026 voorbij? Drie scenario\'s voor de rest van het jaar',
    slug: 'is-crypto-bull-market-2026-voorbij-drie-scenarios',
    excerpt: 'Bitcoin daalde 34% van zijn 2026-hoogtepunt. Is de bull market voorbij, of is dit een tijdelijke correctie? Analisten zijn verdeeld. Wij zetten drie scenario\'s uiteen voor H2 2026.',
    content: art6Content,
    image_url: 'https://images.unsplash.com/photo-1611079829529-fc15b25f72f4?w=1200&q=80',
    image_alt: 'Bull en bear markt symboliek met grafieken',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'marktanalyse', tags: ['bear-market', 'bull-market', 'analyse', 'bitcoin', 'scenario'],
    status: 'published', featured: false, view_count: 4987,
    published_at: ago(2040), created_at: ago(2040), updated_at: ago(2040),
  },
  {
    id: 'mock-7',
    title: 'Crypto bear market overleven: 5 strategieën voor DCA, risicobeheer en psychologie',
    slug: 'crypto-bear-market-overleven-strategieen-dca-risicobeheer',
    excerpt: 'Bear markets zijn emotioneel zwaar — maar ook de periode waarin de beste langetermijnposities worden opgebouwd. Vijf bewezen strategieën om je portefeuille te beschermen en kansen te benutten.',
    content: art7Content,
    image_url: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80',
    image_alt: 'Persoon die crypto-grafieken analyseert',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'marktanalyse', tags: ['bear-market', 'strategie', 'dca', 'risicobeheer', 'psychologie'],
    status: 'published', featured: false, view_count: 3432,
    published_at: ago(2520), created_at: ago(2520), updated_at: ago(2520),
  },
  {
    id: 'mock-8',
    title: 'Marktanalyse week 24: Bitcoin €55k, Fear & Greed op 22, marktcap $2,1 biljoen',
    slug: 'marktanalyse-week-24-bitcoin-55k-fear-greed-22',
    excerpt: 'De cryptomarkt staat op $2,1 biljoen marktcap. Fear & Greed Index: 22 (Angst). Bitcoin dominance stijgt naar 52%. On-chain data: we naderen de realized price — historisch een bodemniveau.',
    content: art8Content,
    image_url: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=1200&q=80',
    image_alt: 'Crypto koersgrafiek analyse met rode kaarsen',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'marktanalyse', tags: ['marktanalyse', 'bitcoin', 'fear-greed', 'on-chain', 'week24'],
    status: 'published', featured: false, view_count: 4104,
    published_at: ago(2880), created_at: ago(2880), updated_at: ago(2880),
  },
]
