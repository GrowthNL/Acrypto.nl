import type { Article } from './types'

const now = Date.now()
const ago = (min: number) => new Date(now - min * 60_000).toISOString()

/* ─────────────────────────────────────────────────────────
   Helper: builds the Quick Take + TOC header used in every
   article. TOC items: array of [id, label] tuples.
───────────────────────────────────────────────────────── */
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

/* ────────── ARTIKEL 1 — Bitcoin €95.000 ATH ────────── */
const art1Content = `
${quickTake([
  'Bitcoin bereikte woensdag een nieuw all-time high van €95.847 — een stijging van 18% in twee weken.',
  'Institutionele instroom via spot-ETFs was in mei de hoogste ooit gemeten: $4,2 miljard netto.',
  'Analisten van JPMorgan en Standard Chartered verhogen koersdoelen richting $120.000–$150.000.',
  'On-chain data toont dat 72% van alle Bitcoin al langer dan een jaar niet bewogen heeft.',
])}

${toc([
  ['achtergrond', 'Hoe we hier kwamen: de aanloop naar het ATH'],
  ['drivers', 'Vier drijvende krachten achter de stijging'],
  ['koersen', 'Wat analisten nu verwachten'],
  ['risicos', 'Risico\'s en waarschuwingssignalen'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="achtergrond">Hoe we hier kwamen: de aanloop naar het ATH</h2>

<p>Het was woensdag 11 juni 2026, 14:37 CET, toen Bitcoin voor het eerst in zijn zeventienjarige geschiedenis boven de <strong>€95.000</strong> uitkwam. Op het hoogtepunt noteerde de koers €95.847 op Bitvavo. In dollars bedroeg de piek $103.200 — de eerste keer dat Bitcoin de psychologisch belangrijke grens van zes cijfers doorbreekt op maandbasis.</p>

<p>De voorgeschiedenis begint bij de <strong>vierde halving</strong> van april 2024, waarbij de blokkendbeloning werd gehalveerd van 6,25 naar 3,125 BTC. Historisch gezien volgde op iedere halving een bull-run van twaalf tot achttien maanden. Die cyclus lijkt zich opnieuw te voltrekken, zij het met een vertraging van ruim een jaar door een reeks macro-economische tegenvallers in de tweede helft van 2024.</p>

<p>Het momentum versnelde begin 2026 toen de Amerikaanse Federal Reserve de rente voor de derde maal in zes maanden verlaagde. Risicovolle activa profiteerden breed, maar Bitcoin onderscheidde zich door zijn aanbodschaarste: slechts 21 miljoen munten kunnen ooit bestaan, waarvan op dit moment meer dan <strong>19,8 miljoen al gedolven zijn</strong>.</p>

<div class="stat-grid">
  <div class="stat-box stat-up">
    <div class="stat-value">€95.847</div>
    <div class="stat-label">ATH koers (11 jun '26)</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">+18%</div>
    <div class="stat-label">Stijging afgelopen 2 weken</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">$4,2 mrd</div>
    <div class="stat-label">ETF-instroom mei 2026</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">72%</div>
    <div class="stat-label">BTC > 1 jaar niet bewogen</div>
  </div>
</div>

<h2 id="drivers">Vier drijvende krachten achter de stijging</h2>

<h3>1. Spot-ETFs: het vliegwiel draait op volle toeren</h3>
<p>Sinds de goedkeuring van de eerste Amerikaanse spot-Bitcoin ETFs in januari 2024 is er cumulatief meer dan <strong>$68 miljard</strong> ingestroomd. BlackRock's IBIT is inmiddels het op vier na grootste ETF ter wereld, gemeten naar beheerd vermogen. In mei 2026 bereikten de dagelijkse instroom records met piekdagen boven de $800 miljoen — méér dan goud-ETFs op vergelijkbare topdagen noteerden.</p>

<h3>2. Macro: lagere rente, zwakkere dollar</h3>
<p>De Fed-renteverlaging van mei 2026 (naar 3,75%) duwde de DXY-dollarindex naar het laagste punt in vier jaar. Historisch correleert een zwakke dollar positief met Bitcoin: beleggers zoeken een alternatief voor valuta-inflatie. De Europese obligatierentes daalden mee, wat geld richting risicovolle activa stuurde.</p>

<h3>3. Sovereign adoption: El Salvador is niet meer alleen</h3>
<p>Na El Salvador kondigden in mei ook <strong>Paraguay en de Centraal-Afrikaanse Republiek</strong> aan Bitcoin als wettelijk betaalmiddel te erkennen naast de eigen valuta. Hoewel de economische impact beperkt is, geeft het een symbolisch signaal van legitimiteit. Geruchtmakender is dat de Noorse staatsinvesteringsfonds (het grootste ter wereld) toestemming heeft gekregen om tot 0,5% van zijn portefeuille in Bitcoin-gerelateerde producten te beleggen.</p>

<h3>4. Miners HODLen: verkoopdruk historisch laag</h3>
<p>On-chain analytics platform Glassnode rapporteerde deze week dat miners hun verkopen terugtrokken tot het laagste niveau sinds 2020. Met een huidige bloksubsidie van 3,125 BTC en een koers boven €90.000 zijn miners winstgevend, maar kiezen zij ervoor minder te verkopen — mogelijk anticipeert de sector op verdere koersstijging.</p>

<div class="highlight-box">
  <strong>Glassnode Insight:</strong> Het percentage Bitcoin dat langer dan één jaar niet van portemonnee is veranderd staat op 72,4% — een absolute recordwaarde. Dit suggereert een sterke "hodl-cultuur" en beperkt aanbod op de spotmarkt.
</div>

<h2 id="koersen">Wat analisten nu verwachten</h2>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Analist / Instelling</th>
      <th>Koersdoel 2026</th>
      <th>Scenario</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>JPMorgan (Nikolaos Panigirtzoglou)</td><td class="td-up">$120.000</td><td>Base case</td></tr>
    <tr><td>Standard Chartered (Geoffrey Kendrick)</td><td class="td-up">$150.000</td><td>Bull case</td></tr>
    <tr><td>Bernstein</td><td class="td-up">$130.000</td><td>Base case</td></tr>
    <tr><td>Plan B (S2F model)</td><td class="td-up">$100.000–160.000</td><td>Model range</td></tr>
    <tr><td>Deutsche Bank Crypto Research</td><td>$85.000</td><td>Bear/base</td></tr>
  </tbody>
</table>

<p>De meeste mainstream-analisten hanteren een base case tussen de $100.000 en $130.000 voor eind 2026. Bear cases liggen rond de $70.000–$85.000, voornamelijk ingegeven door mogelijke Fed-verhogingen als inflatie terugkeert of een plotse regulatoire schok.</p>

<h2 id="risicos">Risico's en waarschuwingssignalen</h2>

<div class="warning-box">
  <div class="warning-title">⚠️ Let op: Bitcoin kan ook sterk dalen</div>
  Alle voorgaande bull-markten eindigden met correcties van 70–85%. Een ATH is geen garantie voor verdere stijging. Beleg nooit meer dan je bereid bent volledig te verliezen.
</div>

<p>De Fear &amp; Greed Index staat momenteel op <strong>88 (Extreme Greed)</strong> — een niveau dat historisch gezien vaak samenvalt met kortetermijncorrecties. Technisch analyse-tools tonen potentiële weerstandsniveaus bij €98.000 en €105.000.</p>

<p>Andere risicofactoren om in de gaten te houden:</p>
<ul>
  <li><strong>Regelgeving:</strong> De EU-MiCA-handhavingsfase begint in Q3 2026 — mogelijke tijdelijke volatiliteit.</li>
  <li><strong>Macro-omslag:</strong> Als inflatie terugkeert en de Fed de rente verhoogt, zal risicovol sentiment omslaan.</li>
  <li><strong>Grote wallets:</strong> Satoshi Nakamoto-wallets bevatten nog steeds ~1 miljoen BTC — een hypothetische verkoopgolf zou de markt schokken.</li>
</ul>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>

  <div class="faq-item">
    <div class="faq-q">Is het nu nog een goed moment om Bitcoin te kopen?</div>
    <div class="faq-a">Dat is een persoonlijke beslissing afhankelijk van je financiële situatie en risicotolerantie. Veel beleggers gebruiken een DCA-strategie (periodiek een vast bedrag) om het timingrisico te spreiden. Dit artikel is geen beleggingsadvies.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q">Kan Bitcoin nog veel hoger gaan na een ATH?</div>
    <div class="faq-a">Historisch gezien bereikte Bitcoin na een ATH-doorbraak vaak een "price discovery"-fase waarbij het meerdere nieuwe ATHs testte voor de correctie volgde. Voorgaande cycli toonden stijgingen van 20–80% ná het doorbreken van een vorig ATH, maar niets is gegarandeerd.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q">Welke Nederlandse exchanges zijn betrouwbaar voor Bitcoin-aankoop?</div>
    <div class="faq-a">Populaire, door de DNB geregistreerde exchanges zijn Bitvavo, Coinmerce en Litebit. Controleer altijd of een platform bij de DNB geregistreerd staat voor je geld overmaakt.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q">Wat is een spot-Bitcoin ETF precies?</div>
    <div class="faq-a">Een spot-Bitcoin ETF is een beursgenoteerd fonds dat de feitelijke Bitcoin aanhoudt. Beleggers kopen aandelen van het fonds via een reguliere brokerage, zonder zelf crypto te hoeven beheren. Dit verlaagt de drempel voor institutionele en particuliere beleggers.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 2 — Ethereum Pectra live ────────── */
const art2Content = `
${quickTake([
  'Ethereum Pectra-upgrade is live op mainnet — de grootste update sinds The Merge in 2022.',
  'EIP-7702 maakt "account abstraction" mogelijk: wallets worden programmeerbaar.',
  'Transactiekosten op L2 dalen gemiddeld 60% dankzij verhoogde blob-capaciteit.',
  'ETH-koers steeg 12% in de week voorafgaand aan de upgrade.',
])}

${toc([
  ['wat-is-pectra', 'Wat is de Pectra-upgrade?'],
  ['eip7702', 'Account abstraction: wallets worden slim'],
  ['blobs', 'Goedkopere L2-transacties via meer blobs'],
  ['staking', 'Staking-verbeteringen voor validators'],
  ['impact', 'Koersimpact en marktreactie'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="wat-is-pectra">Wat is de Pectra-upgrade?</h2>

<p>Pectra is de naam voor de gecombineerde Prague/Electra hardfork van Ethereum, die woensdag 4 juni 2026 succesvol werd geactiveerd op het Ethereum-mainnet. Het is de grootste protocolupdate van het netwerk sinds <strong>The Merge</strong> in september 2022, waarbij Ethereum overstapte van proof-of-work naar proof-of-stake.</p>

<p>De naam Pectra combineert de execution layer-upgrade (Prague, voor de city Prague) met de consensus layer-upgrade (Electra). In totaal bundelt Pectra <strong>negen Ethereum Improvement Proposals (EIPs)</strong>, waarvan twee bijzonder impactvol zijn voor eindgebruikers: EIP-7702 (account abstraction) en EIP-7691 (meer blobspace voor L2's).</p>

<div class="stat-grid">
  <div class="stat-box stat-up">
    <div class="stat-value">9</div>
    <div class="stat-label">EIPs in Pectra</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">−60%</div>
    <div class="stat-label">Gem. L2-kosten</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">2048</div>
    <div class="stat-label">Max ETH per validator</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">+12%</div>
    <div class="stat-label">ETH koers (week vóór)</div>
  </div>
</div>

<h2 id="eip7702">Account abstraction: wallets worden slim</h2>

<p>EIP-7702 introduceert <strong>account abstraction</strong> voor externe accounts (EOA's) — de gewone wallet-adressen die gebruikers beheren met een private key. Kort gezegd: je wallet wordt programmeerbaar en kan tijdelijk smart-contract-functionaliteit aannemen.</p>

<p>Wat dit betekent voor eindgebruikers:</p>
<ul>
  <li><strong>Gasloze transacties:</strong> Apps kunnen gas voor je betalen (sponsored transactions).</li>
  <li><strong>Batching:</strong> Meerdere acties (bijv. approve + swap) in één transactie — lagere kosten, minder klikken.</li>
  <li><strong>Social recovery:</strong> Verlies je sleutel, dan kunnen vertrouwde personen of contracten helpen herstellen.</li>
  <li><strong>Sessiesleutels:</strong> Geef een app tijdelijke beperkte toegang zonder je hoofdwallet te risqueren.</li>
</ul>

<div class="highlight-box">
  <strong>Praktisch voorbeeld:</strong> Met EIP-7702 kan een DeFi-app alle stappen van een liquiditeitspositie (approve, deposit, stake) bundelen in één muisklik, terwijl de kosten voor jou worden gedragen door het protocol. Dit was voorheen alleen mogelijk via dedicated "smart account"-oplossingen.
</div>

<h2 id="blobs">Goedkopere L2-transacties via meer blobs</h2>

<p>EIP-7691 verhoogt het aantal blobs dat per Ethereum-block verwerkt kan worden van 3 (target) / 6 (max) naar 6 (target) / 9 (max). Blobs zijn de speciale, goedkope dataopslaglaag die Ethereum in de vorige Dencun-upgrade introduceerde specifiek voor L2-netwerken.</p>

<p>De praktische impact is direct: netwerken als Arbitrum, Optimism en Base kunnen meer transactiedata op Ethereum verankeren voor dezelfde kosten. Early measurements op de Sepolia-testnet tonen een gemiddelde kostendaling van <strong>58–65%</strong> voor eindgebruikers op L2's vergeleken met post-Dencun koersen.</p>

<h2 id="staking">Staking-verbeteringen voor validators</h2>

<p>EIP-7251 verhoogt de maximum stake per validator van 32 ETH naar <strong>2048 ETH</strong>. Dit maakt het voor grote staking-aanbieders mogelijk meer ETH per validator te staken, wat de operationele overhead verlaagt. Tevens introduceert EIP-7002 de mogelijkheid voor validators om exits te triggeren via de execution layer — handig voor smart-contract-gebaseerde staking pools.</p>

<h2 id="impact">Koersimpact en marktreactie</h2>

<p>ETH handelde in de week voorafgaand aan Pectra rond de €3.600 en piekte op de dag van activatie op €3.890. Na een korte "sell the news"-correctie stabiliseerde de koers rond €3.750 — een netto-winst van ruim 10% ten opzichte van het niveau vóór de upgrade-aankondiging.</p>

<table class="comparison-table">
  <thead>
    <tr><th>Datum</th><th>ETH koers (€)</th><th>Event</th></tr>
  </thead>
  <tbody>
    <tr><td>1 mei 2026</td><td>€3.210</td><td>Pectra-datum bevestigd</td></tr>
    <tr><td>28 mei 2026</td><td>€3.590</td><td>Succesvolle Sepolia-test</td></tr>
    <tr><td>4 jun 2026</td><td class="td-up">€3.890</td><td>Pectra mainnet live</td></tr>
    <tr><td>11 jun 2026</td><td>€3.740</td><td>Post-upgrade stabilisatie</td></tr>
  </tbody>
</table>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Moet ik als ETH-houder iets doen voor Pectra?</div>
    <div class="faq-a">Nee. Als je ETH aanhoudt op een exchange of in een eigen wallet, hoef je niets te doen. Exchanges en node-operators zetten de upgrade automatisch door. Alleen node-operators of validators moeten hun software updaten.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Worden mijn DeFi-posities beïnvloed?</div>
    <div class="faq-a">Je bestaande posities veranderen niet automatisch. Smart contracts blijven werken zoals ze zijn. Nieuwe contracten kunnen wel gebruik maken van de Pectra-mogelijkheden, wat jou als gebruiker goedkopere interacties biedt.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Is Ethereum nu goedkoper om te gebruiken?</div>
    <div class="faq-a">Op Layer 2-netwerken (Arbitrum, Optimism, Base) zijn de kosten merkbaar gedaald. Op Ethereum mainnet zelf zijn de kosten afhankelijk van drukte op het netwerk en veranderen niet direct door Pectra.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 3 — MiCA EU volledig actief ────────── */
const art3Content = `
${quickTake([
  'EU\'s MiCA-verordening is per 1 juni 2026 volledig in werking voor alle crypto-activaklassen.',
  'Crypto-aanbieders zonder MiCA-licentie mogen niet meer actief zijn in de EU.',
  'Nederlandse DNB en AFM zijn aangewezen als primaire toezichthouders.',
  'Stablecoins krijgen de strengste eisen: volledige reservedekking, dagelijkse rapportage.',
])}

${toc([
  ['wat-is-mica', 'Wat is MiCA en waarom is het belangrijk?'],
  ['tijdlijn', 'Van voorstel tot volledige handhaving'],
  ['regels', 'Wat verandert er voor consumenten?'],
  ['stablecoins', 'Strickte regels voor stablecoins'],
  ['gevolgen', 'Winnaars en verliezers'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="wat-is-mica">Wat is MiCA en waarom is het belangrijk?</h2>

<p>De <strong>Markets in Crypto-Assets Regulation (MiCA)</strong> is de eerste uitgebreide Europese wetgeving die specifiek gericht is op cryptovaluta en crypto-activadiensten. Het doel: een geharmoniseerde regelgeving voor de gehele EU, zodat zowel consumenten beter beschermd zijn als bedrijven rechtszekerheid krijgen om te innoveren.</p>

<p>Per <strong>1 juni 2026</strong> geldt MiCA voor alle categorieën crypto-activa in alle 27 EU-lidstaten. Hiermee is een vierjarig wetgevingsproces voltooid — het initiële voorstel van de Europese Commissie dateert uit september 2020.</p>

<h2 id="tijdlijn">Van voorstel naar volledige handhaving</h2>

<table class="comparison-table">
  <thead><tr><th>Datum</th><th>Mijlpaal</th></tr></thead>
  <tbody>
    <tr><td>Sep 2020</td><td>Europese Commissie publiceert MiCA-voorstel</td></tr>
    <tr><td>Apr 2023</td><td>Europees Parlement keurt MiCA goed</td></tr>
    <tr><td>Jun 2023</td><td>Publicatie in EU Staatsblad</td></tr>
    <tr><td>Jun 2024</td><td>Fase 1: Stablecoin-regels van kracht</td></tr>
    <tr><td>Dec 2024</td><td>Fase 2: CASP-regels voor overige crypto-aanbieders</td></tr>
    <tr><td class="td-up">Jun 2026</td><td class="td-up">Fase 3: Volledige handhaving, overgangsperiodes afgelopen</td></tr>
  </tbody>
</table>

<h2 id="regels">Wat verandert er voor consumenten?</h2>

<p>Voor particuliere beleggers brengt MiCA een aantal directe verbeteringen:</p>
<ul>
  <li><strong>Transparantie:</strong> Alle crypto-aanbieders zijn verplicht een <em>whitepaper</em> te publiceren met duidelijke informatie over het project, de risico's en de tokenomics.</li>
  <li><strong>Klachtrecht:</strong> Consumenten hebben recht op een laagdrempelig klachtenproces bij hun aanbieder.</li>
  <li><strong>Verbod op marktmanipulatie:</strong> Insider trading en market manipulation zijn expliciet verboden — vergelijkbaar met regels op de aandelenmarkt.</li>
  <li><strong>Reclameregels:</strong> Crypto-reclame moet eerlijk, duidelijk en niet-misleidend zijn en dient risicowaarschuwingen te bevatten.</li>
</ul>

<div class="highlight-box">
  <strong>Nieuw recht:</strong> Als een Crypto Asset Service Provider (CASP) jou schade toebrengt door nalatigheid, kun je nu via het nationale klachtenloket (in Nederland: AFM) een formele klacht indienen. Dit recht bestond voorheen niet voor crypto.
</div>

<h2 id="stablecoins">Strikte regels voor stablecoins</h2>

<p>Stablecoins — crypto's die gekoppeld zijn aan een fiatvaluta zoals de euro of dollar — krijgen onder MiCA de striktste eisen:</p>
<ul>
  <li><strong>1:1 reservedekking:</strong> Elke uitgegeven stablecoin moet gedekt zijn door een equivalent aan liquide activa.</li>
  <li><strong>Dagelijkse rapportage:</strong> Uitgevers moeten dagelijks hun reserveposities publiceren.</li>
  <li><strong>Uitgiedelimiet voor niet-euro stablecoins:</strong> Stablecoins gebaseerd op niet-EU-valuta (bijv. USDT, USDC) zijn gelimiteerd tot €200 miljoen transacties per dag in de EU.</li>
  <li><strong>Verbod op rentedragende stablecoins:</strong> Stablecoins die rente uitkeren zijn verboden onder MiCA.</li>
</ul>

<h2 id="gevolgen">Winnaars en verliezers</h2>

<div class="stat-grid">
  <div class="stat-box stat-up">
    <div class="stat-value">✓</div>
    <div class="stat-label">EU-compliant exchanges</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">✓</div>
    <div class="stat-label">Gereguleerde stablecoins (EURC, EURR)</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">✗</div>
    <div class="stat-label">Niet-MiCA aanbieders</div>
  </div>
  <div class="stat-box stat-down">
    <div class="stat-value">✗</div>
    <div class="stat-label">USDT boven €200M dagvolume</div>
  </div>
</div>

<p>Grote internationale exchanges als Binance en Coinbase hebben hun EU-entiteiten aangepast en beschikken over een MiCA-licentie. Kleinere platforms die de compliance-kosten niet konden dragen, hebben de Europese markt verlaten. Hierdoor is de markt geconsolideerd bij grotere, gereguleerde spelers.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Moet ik als particulier iets doen vanwege MiCA?</div>
    <div class="faq-a">Niet direct. Als je al handelt op een gereguleerde, bij DNB geregistreerde exchange, ben je al in lijn met MiCA. Controleer wel of je exchange een MiCA-licentie heeft — zo niet, overweeg over te stappen.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Worden DeFi-protocollen ook gereguleerd door MiCA?</div>
    <div class="faq-a">Volledig gedecentraliseerde protocollen zonder beheerder vallen buiten de reikwijdte van MiCA. Echter, als een protocol een identificeerbare beheerder of centraal bestuur heeft, kan het als CASP worden aangemerkt.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Is USDT nog beschikbaar in Nederland?</div>
    <div class="faq-a">USDT is beschikbaar, maar exchanges mogen de dagelijkse transactievolumes van niet-EU stablecoins beperken vanwege MiCA. Voor grotere bedragen adviseren exchanges over te stappen naar een euro-stablecoin zoals EURC.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 4 — Solana record ────────── */
const art4Content = `
${quickTake([
  'Solana verwerkte maandag 142 miljoen transacties op één dag — een nieuw record.',
  'De Solana Mobile Chapter 2 telefoon heeft meer dan 800.000 pre-orders: mainstream crypto-adoptie wordt tastbaar.',
  'SOL-koers bereikte €195 na het nieuws, de hoogste stand in 2026.',
  'Firedancer-validator-client van Jump Crypto draait nu op 18% van alle validators.',
])}

${toc([
  ['transactie-record', 'Transactierecord: 142 miljoen in één dag'],
  ['mobile', 'Solana Mobile Chapter 2: smartphone als crypto-hub'],
  ['firedancer', 'Firedancer: snelheidssprong voor het netwerk'],
  ['concurrentie', 'Positie ten opzichte van Ethereum L2\'s'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="transactie-record">Transactierecord: 142 miljoen transacties in één dag</h2>

<p>Op maandag 9 juni 2026 verwerkte het Solana-netwerk een recordaantal van <strong>142 miljoen transacties</strong> in 24 uur. Ter vergelijking: Ethereum mainnet verwerkt circa 1,2 miljoen transacties per dag, en zelfs de grootste Ethereum L2's halen gezamenlijk niet het Solana-volume op piekdagen.</p>

<p>Het volume werd aangedreven door een combinatie van meme coin-handel op de Pump.fun-launchpad, activiteit op Solana's NFT-marktplaats en robottrading (MEV). Critici wijzen op het hoge aandeel "spam"-transacties in het totaal, maar Solana-supporters benadrukken dat het netwerk überhaupt in staat is dit volume te verwerken.</p>

<div class="stat-grid">
  <div class="stat-box stat-up">
    <div class="stat-value">142M</div>
    <div class="stat-label">Dagelijkse transacties (record)</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">€195</div>
    <div class="stat-label">SOL-koers piek</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">800K+</div>
    <div class="stat-label">Chapter 2 pre-orders</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">18%</div>
    <div class="stat-label">Validators met Firedancer</div>
  </div>
</div>

<h2 id="mobile">Solana Mobile Chapter 2: smartphone als crypto-hub</h2>

<p>De <strong>Solana Mobile Chapter 2</strong> is de opvolger van de originele Saga-telefoon uit 2023. Waar de eerste generatie met moeite 30.000 pre-orders haalde, werden er bij de aankondiging van Chapter 2 in mei 2025 binnen 48 uur al meer dan 800.000 pre-orders geplaatst — grotendeels aangedreven door speculatie op de bijgeleverde crypto-airdrops.</p>

<p>De telefoon wordt geleverd met een ingebouwde Solana-hardware-wallet, de Seed Vault, en een App Store die exclusief MiCA-compliant en gecertificeerde crypto-apps toelaat. Gebruikers ontvangen bij activering een zogenaamde "dapp bundle" — een pakket airdrops van Solana-ecosysteem projecten.</p>

<h2 id="firedancer">Firedancer: snelheidssprong voor het netwerk</h2>

<p>Jump Crypto's Firedancer is een volledig herontwikkelde validator-client voor Solana, geschreven in C/C++ in plaats van Rust. Na maanden van testnet-validering draait Firedancer nu op <strong>18% van alle Solana-validators</strong>. De client toonde in lab-omgevingen verwerkingscapaciteiten van meer dan <strong>1 miljoen transacties per seconde</strong> — al zijn realistische netwerkcijfers lager door consensus-overhead.</p>

<div class="highlight-box">
  <strong>Wat betekent Firedancer voor gebruikers?</strong> Primair meer netwerkresilience: als de standaard Agave-client problemen heeft, kunnen Firedancer-validators het netwerk draaiende houden. Op termijn draagt het bij aan hogere verwerkingscapaciteit en lagere transactiekosten.
</div>

<h2 id="concurrentie">Positie ten opzichte van Ethereum L2's</h2>

<table class="comparison-table">
  <thead><tr><th>Netwerk</th><th>TPS (gemiddeld)</th><th>Gem. transactiekosten</th><th>Decentralisatie</th></tr></thead>
  <tbody>
    <tr><td>Solana</td><td class="td-up">~3.000</td><td>~€0,0005</td><td>Matig (1.500 validators)</td></tr>
    <tr><td>Arbitrum One</td><td>~600</td><td>~€0,02</td><td>Matig (sequencer centraal)</td></tr>
    <tr><td>Base</td><td>~400</td><td>~€0,01</td><td>Laag (Coinbase-beheer)</td></tr>
    <tr><td>Ethereum mainnet</td><td>~15</td><td>~€2–8</td><td class="td-up">Hoog (~800K validators)</td></tr>
  </tbody>
</table>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Is Solana betrouwbaar na de eerdere netwerkstoringen?</div>
    <div class="faq-a">Solana had tussen 2021 en 2023 meerdere netwerkstoringen. Sindsdien zijn er significante verbeteringen doorgevoerd en is het netwerk aanzienlijk stabieler geworden. De komst van Firedancer als alternatieve client vermindert het risico op network-brede uitval verder. Maar volledig risicovrij is geen enkel blockchain-netwerk.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wat is het verschil tussen SOL en meme coins op Solana?</div>
    <div class="faq-a">SOL is de native token van het Solana-netwerk, gebruikt voor transactiekosten en staking. Meme coins op Solana (zoals BONK, WIF, POPCAT) zijn aparte tokens die zijn aangemaakt op het Solana-netwerk. Ze zijn veel speculatiever dan SOL zelf en kunnen in waarde naar nul zakken.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 5 — Crypto belasting NL 2026 ────────── */
const art5Content = `
${quickTake([
  'De Belastingdienst hanteert in 2026 nog steeds box 3 voor crypto — met de peildatum van 1 januari.',
  'De vermogensrendementsheffing is in 2026 gebaseerd op fictief rendement: 6,04% over de waarde op 1 jan.',
  'Je moet al je crypto — inclusief DeFi-posities en staking-rewards — opgeven.',
  'Nieuw in 2026: automatische gegevensuitwisseling via DAC8 tussen EU-lidstaten.',
])}

${toc([
  ['box3', 'Crypto in box 3: de basisregel'],
  ['peildatum', 'Peildatum 1 januari 2026: welke waarde gebruik je?'],
  ['defi', 'DeFi, staking en lending: hoe geef je dit op?'],
  ['dac8', 'DAC8: de Belastingdienst weet (bijna) alles'],
  ['tips', 'Praktische tips voor je aangifte'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="box3">Crypto in box 3: de basisregel</h2>

<p>In Nederland wordt cryptocurrency behandeld als een <strong>bezitting in box 3</strong> (sparen en beleggen) van de inkomstenbelasting. Dit geldt ongeacht het type crypto: Bitcoin, altcoins, stablecoins, governance tokens, NFTs met vermogenswaarde — ze vallen allemaal in box 3.</p>

<p>In box 3 betaal je belasting over een <strong>fictief rendement</strong>, niet over de werkelijk gerealiseerde winst of het verlies. De Belastingdienst bepaalt elk jaar het fictieve rendement op basis van beleggingscategorie. Voor 2025 (aangifte in 2026) geldt een fictief rendement van <strong>6,04%</strong> voor beleggingen — inclusief crypto.</p>

<div class="highlight-box">
  <strong>Rekenvoorbeeld:</strong> Je had op 1 januari 2026 voor €50.000 aan crypto in bezit. Het fictieve rendement is 6,04%, wat neerkomt op €3.020. Over dat fictieve rendement betaal je 36% belasting (het box 3-tarief van 2026) = <strong>€1.087 belasting</strong>.
</div>

<h2 id="peildatum">Peildatum 1 januari 2026</h2>

<p>De waarde van je crypto op <strong>1 januari 2026 om 00:00 uur</strong> is bepalend voor je aangifte 2026. Dit is cruciaal: als je op 2 januari verkoopt of koopt, telt dat niet mee voor de aangifte over 2025 (peildatum 1 jan 2025) maar wel voor 2026 (peildatum 1 jan 2026).</p>

<p>Hoe bepaal je de waarde op 1 januari?</p>
<ul>
  <li>Gebruik de slotkoers op 31 december 2025 of de openingskoers op 1 januari 2026 op een gerenommeerde bron (CoinGecko, CoinMarketCap, Bitvavo).</li>
  <li>Converteer altijd naar <strong>euro</strong>, niet dollar.</li>
  <li>Bewaar een screenshot of export als onderbouwing — de Belastingdienst kan hierom vragen.</li>
</ul>

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

<h2 id="defi">DeFi, staking en lending: hoe geef je dit op?</h2>

<p>Met de groei van DeFi is de aangifte complexer geworden. De Belastingdienst heeft in 2025 een guidance-document gepubliceerd, maar veel gevallen blijven grijs:</p>

<ul>
  <li><strong>Staking-rewards:</strong> Zolang je de tokens niet verkoopt, tellen ze mee als vermogen in box 3 (waarde op peildatum). Er is discussie of de rewards ook als inkomen in box 1 kunnen vallen — wacht op verdere jurisprudentie.</li>
  <li><strong>Liquidity pool-posities:</strong> Je LP-tokens vertegenwoordigen een vermogenswaarde. Gebruik de waarde van de onderliggende activa op de peildatum.</li>
  <li><strong>Lending (bijv. via Aave):</strong> Je uitgeleende crypto telt mee in box 3. Je schuld aan het protocol mag je aftrekken als box 3-schuld.</li>
  <li><strong>NFTs:</strong> NFTs met substantiële handelswaarde vallen in box 3. Voor decoratieve of "personal use" NFTs is de Belastingdienst minder duidelijk.</li>
</ul>

<div class="warning-box">
  <div class="warning-title">⚠️ Opgeven is verplicht</div>
  Crypto op buitenlandse exchanges moet worden opgegeven, ook als je er geen bankrekening bij hebt. Verzwijgen is fiscale fraude en kan leiden tot boetes en naheffingen over de afgelopen vijf jaar.
</div>

<h2 id="dac8">DAC8: de Belastingdienst weet (bijna) alles</h2>

<p>Per 1 januari 2026 is de <strong>DAC8-richtlijn</strong> van kracht in de EU. Dit verplicht crypto-aanbieders in de EU (en platforms die EU-burgers bedienen) om transactiegegevens van klanten te delen met de belastingautoriteiten. Dit werkt vergelijkbaar met hoe banken al jaren bankgegevens delen.</p>

<p>In de praktijk: Bitvavo, Kraken, Coinbase en andere MiCA-compliant exchanges rapporteren je transacties automatisch aan de Nederlandse Belastingdienst. De aangifte wordt daarmee steeds meer een "controlemoment" in plaats van een zelfstandige opgave.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Betaal ik ook belasting als ik verlies heb gemaakt?</div>
    <div class="faq-a">In box 3 is de werkelijk gerealiseerde winst of het verlies niet relevant. Je betaalt belasting over het fictieve rendement op de waarde per peildatum. Zelfs als je verlies hebt gemaakt, kan je dus belasting verschuldigd zijn als je op 1 januari veel vermogen had.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Hoe geef ik crypto op een hardware wallet op?</div>
    <div class="faq-a">Op dezelfde manier als crypto op een exchange: de totale waarde op 1 januari in euro. Het feit dat je de sleutels zelf beheert maakt voor de belastingplicht geen verschil.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Kan ik een belastingadviseur inschakelen voor crypto?</div>
    <div class="faq-a">Ja. Er zijn steeds meer belastingadviseurs gespecialiseerd in crypto (zoals Koinly, CryptoTax.nl). Ze kunnen je helpen met complexe DeFi-posities, staking en de juiste waardering. De kosten zijn fiscaal aftrekbaar als kosten van vermogensbeheer.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 6 — DeFi TVL $200 miljard ────────── */
const art6Content = `
${quickTake([
  'DeFi-sector overschrijdt voor het eerst $200 miljard aan Total Value Locked (TVL).',
  'Groei wordt gedreven door Ethereum L2\'s en real-world asset (RWA) tokenisatie.',
  'Aave V4 en Uniswap V5 leiden het herstel — beide lanceerden nieuwe versies in mei 2026.',
  'Institutionele deelname via gereguleerde DeFi-poorten groeit met 340% jaar-op-jaar.',
])}

${toc([
  ['mijlpaal', 'De $200 miljard-mijlpaal: hoe we hier kwamen'],
  ['rwa', 'Real-World Assets: de nieuwe groeikatalysator'],
  ['aave-uni', 'Aave V4 en Uniswap V5: protocol-upgrades'],
  ['institutioneel', 'Institutionele DeFi: gereguleerd de markt in'],
  ['risicos', 'Risico\'s in DeFi: wat je moet weten'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="mijlpaal">De $200 miljard-mijlpaal</h2>

<p>DeFiLlama, het platform dat DeFi-statistieken bijhoudt, registreerde woensdag 10 juni 2026 om 08:14 UTC voor het eerst een <strong>Total Value Locked (TVL) boven de $200 miljard</strong> over alle DeFi-protocollen heen. Het vorige record van $180 miljard dateerde uit november 2021, kort voor de bear market van 2022.</p>

<p>Het herstel was lang en moeizaam — de FTX-crisis van november 2022 zorgde voor een halvering van de TVL in twee weken. Sindsdien hebben betere beveiligingsstandaarden, formele code-audits en de opkomst van verzekerd DeFi (DeFi insurance) het vertrouwen hersteld.</p>

<div class="stat-grid">
  <div class="stat-box stat-up">
    <div class="stat-value">$200B</div>
    <div class="stat-label">DeFi TVL (nieuw record)</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">+340%</div>
    <div class="stat-label">Institutionele groei YoY</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">$45B</div>
    <div class="stat-label">RWA getokeniseerde activa</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">#1</div>
    <div class="stat-label">Aave: grootste DeFi-protocol</div>
  </div>
</div>

<h2 id="rwa">Real-World Assets: de nieuwe groeikatalysator</h2>

<p>Een van de meest opvallende trends achter de TVL-groei is de tokenisatie van <strong>real-world assets (RWA)</strong>. Hierbij worden traditionele financiële activa — zoals staatsobligaties, vastgoed en bedrijfsleningen — omgezet in blockchain-tokens die verhandelbaar zijn op DeFi-protocollen.</p>

<p>BlackRock's BUIDL-fonds (getokeniseerde US Treasury Bills) is met $8 miljard de grootste RWA op de blockchain. Franklin Templeton, Ondo Finance en Maple Finance bieden vergelijkbare producten aan. Voor DeFi-gebruikers zijn deze RWAs aantrekkelijk omdat ze een stabiel, risicoarm rendement bieden van 4–5% per jaar in dollar, volledig on-chain.</p>

<h2 id="aave-uni">Aave V4 en Uniswap V5</h2>

<p><strong>Aave V4</strong>, gelanceerd in mei 2026, introduceert een "unified liquidity layer" — een architectuur waarbij liquiditeit efficiënter tussen markten kan stromen. De nieuwe versie ondersteunt ook native cross-chain lending: je kunt ETH depositen op Ethereum mainnet en USDC lenen op Arbitrum, zonder manuele bridge-stappen.</p>

<p><strong>Uniswap V5</strong>, eveneens in mei gelanceerd, focust op gasefficiëntie en introduceert "hook composability" — een systeem waarbij ontwikkelaars aangepaste logica kunnen toevoegen aan liquidity pools. Dit opent de deur voor geavanceerde marktmakers en op maat gemaakte liquiditeitsstrategieën.</p>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Wat is DeFi precies en hoe verschilt het van crypto kopen?</div>
    <div class="faq-a">DeFi (gedecentraliseerde financiën) zijn financiële diensten — lenen, uitlenen, ruilen — die volledig via smart contracts op een blockchain draaien, zonder bank of tussenpersoon. Crypto kopen doe je op een exchange; DeFi gebruiken doe je direct via je wallet op een protocol als Aave of Uniswap.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Is DeFi veilig?</div>
    <div class="faq-a">DeFi brengt unieke risico's met zich mee: smart contract-bugs, oracle-manipulatie, en liquidatierisico bij lenen. Veel grote protocollen zijn meerdere keren geauditeerd en hebben bug bounty-programma's. Begin altijd met kleine bedragen, gebruik alleen geauditeerde en bewezen protocollen.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Hoe kan ik beginnen met DeFi?</div>
    <div class="faq-a">Je hebt een Web3-wallet nodig (bijv. MetaMask of Rabby) en crypto op een L2-netwerk zoals Arbitrum of Base voor lagere kosten. Surf naar app.aave.com of app.uniswap.org en verbind je wallet. Begin met kleine bedragen en lees altijd de documentatie van het protocol.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 7 — BlackRock Bitcoin ETF ────────── */
const art7Content = `
${quickTake([
  'BlackRock\'s IBIT-ETF beheert nu $52 miljard — groter dan het goud-ETF GLD.',
  'Institutioneel bezit van Bitcoin via ETFs is in 18 maanden gestegen van 0% naar 8,4% van de totale supply.',
  'De SEC heeft goedkeuring gegeven voor in-kind creaties bij spot-Bitcoin ETFs — goedkoper voor grote beleggers.',
  'Morgan Stanley, Wells Fargo en UBS laten adviseurs nu actief Bitcoin-ETF-aanbevelingen doen.',
])}

${toc([
  ['record', 'Van nul naar $52 miljard in 18 maanden'],
  ['inkind', 'In-kind creaties: de next step in ETF-volwassenheid'],
  ['adviseurs', 'Wealth managers omarmen Bitcoin'],
  ['impact', 'Wat betekent dit voor de Bitcoin-koers?'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="record">Van nul naar $52 miljard in 18 maanden</h2>

<p>Op 11 januari 2024 lanceerden de eerste Amerikaanse spot-Bitcoin ETFs. Destijds voorspelden sceptici een bescheiden instroom van een paar honderd miljoen dollar. Wat volgde, overtrof alle verwachtingen: in de eerste week stroomde al $10 miljard in — meer dan welk ETF ooit in een week had aangetrokken.</p>

<p>Achttien maanden later beheert BlackRock's <strong>iShares Bitcoin Trust (IBIT)</strong> ruim $52 miljard aan activa. Dit maakt het groter dan SPDR Gold Shares (GLD), het meest succesvolle goud-ETF, dat dertig jaar nodig had om $58 miljard te bereiken. IBIT deed dit in anderhalf jaar.</p>

<div class="stat-grid">
  <div class="stat-box stat-up">
    <div class="stat-value">$52B</div>
    <div class="stat-label">IBIT beheerd vermogen</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">8,4%</div>
    <div class="stat-label">% BTC supply in ETFs</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">11</div>
    <div class="stat-label">Goedgekeurde spot-BTC ETFs</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">0,25%</div>
    <div class="stat-label">IBIT beheerkosten</div>
  </div>
</div>

<h2 id="inkind">In-kind creaties: de next step in ETF-volwassenheid</h2>

<p>In april 2026 gaf de SEC toestemming voor <strong>in-kind creaties</strong> bij spot-Bitcoin ETFs. Dit is een technische maar significante verbetering: grote beleggers (Authorized Participants) kunnen nu nieuwe ETF-aandelen creëren door direct Bitcoin te leveren in plaats van cash. Dit verlaagt de transactiekosten en maakt het ETF efficiënter voor institutionele beleggers die al Bitcoin bezitten.</p>

<p>In de traditionele ETF-markt zijn in-kind creaties de standaard voor commodity-ETFs als goud. Dat Bitcoin-ETFs dit recht nu ook hebben, is een markering van de volwassenheid van de asset class in de ogen van de SEC.</p>

<h2 id="adviseurs">Wealth managers omarmen Bitcoin</h2>

<p>Eén van de meest impactvolle ontwikkelingen van 2026: grote Amerikaanse vermogensbeheerders geven hun adviseurs nu expliciet toestemming om Bitcoin-ETFs aan te bevelen aan klanten. Morgan Stanley stelde 15.000 adviseurs in staat om IBIT aan te bevelen. Wells Fargo en UBS volgden. Dit opent de poort naar <strong>tientallen biljoenen dollars</strong> aan beheerd vermogen bij family offices en pensioenfondsen.</p>

<div class="highlight-box">
  <strong>Perspectief:</strong> Het totale vermogen beheerd door wealth managers wereldwijd bedraagt circa $100 biljoen. Als slechts 1% wordt gealloceerd naar Bitcoin, is dat $1 biljoen — meer dan de huidige totale marktkapitalisatie van Bitcoin.
</div>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Wat is het verschil tussen een Bitcoin ETF kopen en Bitcoin zelf kopen?</div>
    <div class="faq-a">Met een Bitcoin ETF koop je een aandeel van een fonds dat Bitcoin aanhoudt. Je bezit de Bitcoin zelf niet en hebt geen private keys. Voordelen: toegankelijk via reguliere broker, geen zorgen over opslag. Nadelen: je kunt niet zelf transacties doen en betaalt een jaarlijkse beheerfee.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Zijn er ook Bitcoin ETFs in Europa beschikbaar?</div>
    <div class="faq-a">Ja, in Europa zijn er Bitcoin ETPs (Exchange Traded Products) beschikbaar via Xetra en Euronext, zoals die van ETC Group en 21Shares. In tegenstelling tot de VS zijn dit ETPs en geen ETFs, maar het principe is vergelijkbaar. Controleer of je broker Nederlandse/Europese crypto-ETPs aanbiedt.</div>
  </div>
</div>
`

/* ────────── ARTIKEL 8 — Marktanalyse juni 2026 ────────── */
const art8Content = `
${quickTake([
  'Bitcoin en Ethereum bereikten nieuwe jaarhoogten in de week van 9–11 juni 2026.',
  'De totale crypto-marktkapitalisatie staat op $3,4 biljoen — dichtbij het record van $3,7 biljoen uit nov 2021.',
  'Fear & Greed Index: 86 (Extreme Greed) — historisch gezien een voorzichtigheid-signaal.',
  'Altcoins presteren breed beter dan Bitcoin: Bitcoin Dominance daalt van 54% naar 49%.',
])}

${toc([
  ['overzicht', 'Weekoverzicht: Bitcoin breekt ATH, markt volgt'],
  ['dominance', 'Bitcoin Dominance daalt — altcoin season in zicht?'],
  ['fear-greed', 'Fear & Greed: wanneer is "te greedy" een probleem?'],
  ['watchlist', 'Coins om in de gaten te houden'],
  ['outlook', 'Vooruitblik: wat verwachten analisten?'],
  ['faq', 'Veelgestelde vragen'],
])}

<h2 id="overzicht">Weekoverzicht: Bitcoin breekt ATH, markt volgt</h2>

<p>De week van 9–11 juni 2026 wordt de boeken ingegaan als een historische week voor de cryptomarkt. <strong>Bitcoin bereikte een nieuw all-time high van €95.847</strong> op woensdag, Ethereum volgde met een piek van €3.890 (nieuw jaarhoog), en de totale marktkapitalisatie van alle cryptocurrencies samen bereikte $3,4 biljoen.</p>

<table class="comparison-table">
  <thead><tr><th>Coin</th><th>Koers (12 jun)</th><th>7d verandering</th><th>YTD verandering</th></tr></thead>
  <tbody>
    <tr><td>Bitcoin (BTC)</td><td>€93.200</td><td class="td-up">+14,2%</td><td class="td-up">+68%</td></tr>
    <tr><td>Ethereum (ETH)</td><td>€3.740</td><td class="td-up">+18,6%</td><td class="td-up">+82%</td></tr>
    <tr><td>Solana (SOL)</td><td>€185</td><td class="td-up">+22,1%</td><td class="td-up">+145%</td></tr>
    <tr><td>BNB</td><td>€520</td><td class="td-up">+11,4%</td><td class="td-up">+55%</td></tr>
    <tr><td>XRP</td><td>€2,85</td><td class="td-up">+8,9%</td><td class="td-up">+41%</td></tr>
    <tr><td>Avalanche (AVAX)</td><td>€38</td><td class="td-up">+29,3%</td><td class="td-up">+187%</td></tr>
  </tbody>
</table>

<h2 id="dominance">Bitcoin Dominance daalt — altcoin season in zicht?</h2>

<p>Een klassiek signaal voor een opkomend "altcoin season" is een dalende Bitcoin Dominance — het percentage van de totale marktkapitalisatie dat Bitcoin vertegenwoordigt. Die dominance is de afgelopen twee weken gedaald van <strong>54% naar 49%</strong>, wat historisch gezien samengaat met outperformance van altcoins.</p>

<p>Wanneer Bitcoin een ATH bereikt en de markt het nieuws heeft "ingeprijsd", zoeken beleggers doorgaans naar grotere rendementen in kleinere coins. Altcoins reageren typisch later en heviger op bull-markt sentiment. Dit patroon is terug te zien in de 2017- en 2021-cycli en lijkt zich opnieuw te herhalen.</p>

<div class="highlight-box">
  <strong>Let op:</strong> Altcoin seasons gaan gepaard met extreme volatiliteit. Coins kunnen in korte tijd zowel 200% stijgen als 80% dalen. Risicobeheersing (stop-losses, positiegroottes) is essentieel.
</div>

<h2 id="fear-greed">Fear &amp; Greed: wanneer is "te greedy" een probleem?</h2>

<p>De <strong>Crypto Fear &amp; Greed Index</strong> meet het sentiment in de markt op een schaal van 0 (Extreme Fear) tot 100 (Extreme Greed). De index staat momenteel op <strong>86</strong> — Extreme Greed-territorium.</p>

<p>Historisch gezien zijn er twee interpretaties:</p>
<ul>
  <li><strong>Bull market view:</strong> In sterke bull markets kan de index wekenlang in Extreme Greed blijven zonder significante correctie. Het signaal is geen timing-tool.</li>
  <li><strong>Bear market view:</strong> In de 2021-cyclus markeerde een vergelijkbaar niveau van 88–92 de korte termijn top voorafgaand aan een correctie van 15–25%. Voorzichtigheid is geboden.</li>
</ul>

<div class="stat-grid">
  <div class="stat-box">
    <div class="stat-value">86</div>
    <div class="stat-label">Fear &amp; Greed Index</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">49%</div>
    <div class="stat-label">Bitcoin Dominance</div>
  </div>
  <div class="stat-box stat-up">
    <div class="stat-value">$3,4T</div>
    <div class="stat-label">Totale marktcap</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">$92B</div>
    <div class="stat-label">24u handelsvolume</div>
  </div>
</div>

<h2 id="watchlist">Coins om in de gaten te houden</h2>

<p>Buiten de grote namen zijn er enkele projecten die technisch en fundamenteel interessant zijn voor de komende weken:</p>
<ul>
  <li><strong>Chainlink (LINK):</strong> De aankondiging van CCIP v2 (cross-chain interoperability) en groei in RWA-integraties positioneert LINK als infrastructuurproject.</li>
  <li><strong>Avalanche (AVAX):</strong> Na de lancering van Avalanche9000 (goedkopere subnets) stijgt AVAX sterk. Partnership met Visa voor settlement-tests.</li>
  <li><strong>Sui (SUI):</strong> Groeiend ecosysteem voor gaming en DeFi op de Sui-blockchain; technisch op een kritiek weerstandsniveau.</li>
</ul>

<div class="warning-box">
  <div class="warning-title">⚠️ Marktanalyse is geen beleggingsadvies</div>
  Deze analyse is gebaseerd op publiek beschikbare data en is uitsluitend informatief. Handel in cryptocurrency is speculatief en brengt hoge risico's met zich mee, inclusief het risico het volledige belegde bedrag te verliezen.
</div>

<div class="faq-section">
  <div class="faq-title">Veelgestelde vragen</div>
  <div class="faq-item">
    <div class="faq-q">Wat is een "altcoin season"?</div>
    <div class="faq-a">Een altcoin season (of altseason) is een periode waarin altcoins (alle cryptocurrencies behalve Bitcoin) het collectief beter doen dan Bitcoin. Dit gaat typisch gepaard met een dalende Bitcoin Dominance. Altseasons zijn volatiel: er zijn grote winnaars maar ook veel projecten die in waarde crashen.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Hoe betrouwbaar is de Fear &amp; Greed Index?</div>
    <div class="faq-a">De index is een hulpmiddel, geen orakel. Het geeft een momentopname van marktsentiment gebaseerd op volatiliteit, volume, sociale media en surveys. Gebruik het als één van meerdere indicatoren in je analyse, niet als enige beslissingsgrond.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Wanneer is een goede tijd om winst te nemen?</div>
    <div class="faq-a">Er is geen universeel antwoord. Populaire strategieën zijn: een vast percentage verkooporder instellen bij targets (bijv. 20% verkopen bij +50%), of DCA-exits (periodiek kleine hoeveelheden verkopen bij sterke stijging). Stem je strategie altijd af op je eigen financiële situatie en belastingpositie.</div>
  </div>
</div>
`

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'mock-1',
    title: 'Bitcoin doorbreekt €95.000: nieuw all-time high te midden van recordinstroom via spot-ETFs',
    slug: 'bitcoin-doorbreekt-95000-all-time-high-spot-etf-instroom',
    excerpt: 'Bitcoin bereikte woensdag een historisch nieuw all-time high van €95.847. Recordinstroom via spot-ETFs, institutionele adoptie en dalende rente stuwen de marktleider naar nieuwe hoogtepunten.',
    content: art1Content,
    image_url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80',
    image_alt: 'Bitcoin gouden munt close-up',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'bitcoin', tags: ['bitcoin', 'all-time-high', 'etf', 'koers', 'institutioneel'],
    status: 'published', featured: true, view_count: 4821,
    published_at: ago(40), created_at: ago(40), updated_at: ago(40),
  },
  {
    id: 'mock-2',
    title: 'Ethereum Pectra-upgrade live: account abstraction en 60% goedkopere L2-transacties',
    slug: 'ethereum-pectra-upgrade-live-account-abstraction-goedkopere-l2',
    excerpt: 'De Pectra-hardfork is met succes geactiveerd op het Ethereum-mainnet. De grootste update sinds The Merge introduceert programmeerbare wallets en verhoogt de blobcapaciteit voor Layer 2-netwerken.',
    content: art2Content,
    image_url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80',
    image_alt: 'Ethereum logo op achtergrond van netwerk',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'ethereum', tags: ['ethereum', 'pectra', 'upgrade', 'account-abstraction', 'l2'],
    status: 'published', featured: false, view_count: 2103,
    published_at: ago(480), created_at: ago(480), updated_at: ago(480),
  },
  {
    id: 'mock-3',
    title: 'MiCA volledig in werking: wat betekent de EU-cryptowet voor Nederlandse beleggers?',
    slug: 'mica-volledig-van-kracht-eu-cryptowet-gevolgen-nederland',
    excerpt: 'Per 1 juni 2026 is de Europese MiCA-verordening volledig van kracht. Crypto-aanbieders zonder licentie mogen niet meer actief zijn. Wat verandert er concreet voor jou als belegger?',
    content: art3Content,
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    image_alt: 'EU vlag met digitale grafieken',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'regulering', tags: ['mica', 'eu', 'regulering', 'dnb', 'afm', 'stablecoins'],
    status: 'published', featured: false, view_count: 3456,
    published_at: ago(900), created_at: ago(900), updated_at: ago(900),
  },
  {
    id: 'mock-4',
    title: 'Solana verwerkt 142 miljoen transacties op één dag — Firedancer en Chapter 2 stuwen groei',
    slug: 'solana-142-miljoen-transacties-dag-record-firedancer-chapter-2',
    excerpt: 'Solana verbreekt opnieuw zijn eigen record met 142 miljoen on-chain transacties in 24 uur. Firedancer draait nu op 18% van de validators en de Chapter 2-telefoon heeft 800.000 pre-orders.',
    content: art4Content,
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
    image_alt: 'Crypto blockchain netwerk visualisatie',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'altcoins', tags: ['solana', 'sol', 'firedancer', 'record', 'transacties'],
    status: 'published', featured: false, view_count: 1876,
    published_at: ago(1260), created_at: ago(1260), updated_at: ago(1260),
  },
  {
    id: 'mock-5',
    title: 'Crypto belasting 2026: zo geef je Bitcoin, DeFi en staking-rewards correct op bij de Belastingdienst',
    slug: 'crypto-belasting-2026-bitcoin-defi-staking-belastingdienst-aangifte',
    excerpt: 'Aangifte 2026 staat voor de deur. De Belastingdienst verwacht volledige opgave van alle crypto in box 3. Met DAC8 deelt je exchange nu automatisch gegevens. Alles wat je moet weten.',
    content: art5Content,
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    image_alt: 'Laptop met belastingformulier en rekenmachine',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'regulering', tags: ['belasting', 'box3', 'dac8', 'defi', 'staking', 'belastingdienst'],
    status: 'published', featured: false, view_count: 5210,
    published_at: ago(1620), created_at: ago(1620), updated_at: ago(1620),
  },
  {
    id: 'mock-6',
    title: 'DeFi overschrijdt $200 miljard TVL: real-world assets en Aave V4 drijven nieuwe bull run',
    slug: 'defi-200-miljard-tvl-record-real-world-assets-aave-v4',
    excerpt: 'Het totaal vergrendelde vermogen in DeFi heeft voor het eerst de grens van $200 miljard gepasseerd. Real-world asset tokenisatie en upgrades van Aave V4 en Uniswap V5 zijn de drijvende krachten.',
    content: art6Content,
    image_url: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80',
    image_alt: 'DeFi liquidity protocol visualisatie',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'defi', tags: ['defi', 'tvl', 'aave', 'uniswap', 'rwa', 'record'],
    status: 'published', featured: false, view_count: 1432,
    published_at: ago(2040), created_at: ago(2040), updated_at: ago(2040),
  },
  {
    id: 'mock-7',
    title: 'BlackRock IBIT overtreft goud-ETF: $52 miljard beheerd vermogen in 18 maanden',
    slug: 'blackrock-ibit-bitcoin-etf-52-miljard-overtreft-goud-etf',
    excerpt: 'BlackRock\'s Bitcoin ETF is groter dan het meest succesvolle goud-ETF ter wereld. De SEC keurde in-kind creaties goed en wealth managers bij Morgan Stanley en UBS mogen nu actief Bitcoin aanbevelen.',
    content: art7Content,
    image_url: 'https://images.unsplash.com/photo-1611079829529-fc15b25f72f4?w=1200&q=80',
    image_alt: 'Beleggingen grafieken op monitor',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'bitcoin', tags: ['blackrock', 'ibit', 'etf', 'institutioneel', 'goud'],
    status: 'published', featured: false, view_count: 2987,
    published_at: ago(2520), created_at: ago(2520), updated_at: ago(2520),
  },
  {
    id: 'mock-8',
    title: 'Marktanalyse week 24: Bitcoin ATH, altcoin season begint en Fear & Greed op 86',
    slug: 'marktanalyse-week-24-bitcoin-ath-altcoin-season-fear-greed',
    excerpt: 'De cryptomarkt staat op $3,4 biljoen marktcap. Bitcoin dominance daalt naar 49% terwijl altcoins breed outperformen. De Fear & Greed Index staat op 86 — waar gaat de markt naartoe?',
    content: art8Content,
    image_url: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=1200&q=80',
    image_alt: 'Crypto koersgrafiek analyse dashboard',
    source_url: null, source_name: null,
    author_name: 'Acrypto Redactie',
    category: 'marktanalyse', tags: ['marktanalyse', 'bitcoin', 'altcoins', 'fear-greed', 'dominance'],
    status: 'published', featured: false, view_count: 3104,
    published_at: ago(2880), created_at: ago(2880), updated_at: ago(2880),
  },
]
