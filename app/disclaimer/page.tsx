import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'De disclaimer van Acrypto.nl. Lees over geen financieel advies, crypto risico\'s, indicatieve koersdata en onze redactionele onafhankelijkheid.',
  alternates: { canonical: '/disclaimer' },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2">Juridisch</p>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Disclaimer</h1>
        <p className="text-slate-500 text-sm">Laatst bijgewerkt: juni 2026</p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800 leading-relaxed mb-10">
        <strong>Belangrijk:</strong> alle content op Acrypto.nl is uitsluitend bedoeld voor informatieve en educatieve doeleinden. Niets op deze website vormt financieel, fiscaal of beleggingsadvies.
      </div>

      <Section title="1. Geen financieel advies">
        <p>
          De artikelen, analyses, koersen en overige informatie op Acrypto.nl zijn algemeen van aard en houden
          geen rekening met jouw persoonlijke situatie. Ze vormen geen financieel, fiscaal of beleggingsadvies
          en mogen ook niet als zodanig worden opgevat. Raadpleeg bij twijfel altijd een onafhankelijk financieel
          adviseur.
        </p>
      </Section>

      <Section title="2. Risico's van cryptocurrency">
        <p>
          Handel in en het bezit van cryptocurrencies brengt aanzienlijke risico&apos;s met zich mee. Koersen
          kunnen sterk en snel schommelen, waardoor je een deel of zelfs je volledige inleg kunt verliezen.
          Historische koersen of rendementen bieden geen enkele garantie voor de toekomst. Investeer nooit meer
          dan je je kunt veroorloven te verliezen.
        </p>
      </Section>

      <Section title="3. Koersdata is indicatief">
        <p>
          De koersinformatie op Acrypto.nl wordt opgehaald via externe databronnen, waaronder CoinGecko, en is
          uitsluitend indicatief. Er kan vertraging in de data zitten en wij kunnen de juistheid, volledigheid of
          actualiteit van koersen niet garanderen. Gebruik de getoonde koersen niet als enige basis voor
          beslissingen.
        </p>
      </Section>

      <Section title="4. Geen garantie op juistheid of volledigheid">
        <p>
          Wij stellen onze content met zorg samen, maar kunnen niet garanderen dat alle informatie te allen tijde
          juist, volledig of actueel is. De cryptomarkt verandert snel en informatie kan verouderen. Aan de inhoud
          van deze website kunnen geen rechten worden ontleend.
        </p>
      </Section>

      <Section title="5. Geen aansprakelijkheid">
        <p>
          Acrypto.nl aanvaardt geen enkele aansprakelijkheid voor schade, verlies of gevolgen die voortvloeien uit
          het gebruik van de informatie op deze website of uit beslissingen die daarop worden gebaseerd. Het gebruik
          van de website en de daarop aangeboden informatie is volledig voor eigen risico.
        </p>
      </Section>

      <Section title="6. Redactionele onafhankelijkheid">
        <p>
          Onze redactie bepaalt zelfstandig welk nieuws wordt geselecteerd en hoe het wordt gebracht. Lees meer over
          onze werkwijze in ons{' '}
          <Link href="/redactioneel-beleid" className="text-primary-600 hover:underline">redactioneel beleid</Link>.
        </p>
      </Section>

      <Section title="7. Advertenties, affiliate en advertorials">
        <p>
          Acrypto.nl kan in de toekomst advertenties, gesponsorde content of affiliate-links bevatten. Wanneer dat
          het geval is, markeren wij dit duidelijk als zodanig. Commerciele samenwerkingen hebben geen invloed op
          onze redactionele onafhankelijkheid.
        </p>
        <p className="text-sm text-slate-400">
          [Placeholder: definitief affiliate- en advertentiebeleid nog in te vullen door de eigenaar.]
        </p>
      </Section>

      <Section title="8. Correcties">
        <p>
          Zie je een fout of onjuistheid? Laat het ons weten via het{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">contactformulier</Link>. Wij nemen
          correctieverzoeken serieus en passen content aan waar nodig.
        </p>
      </Section>

      <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
        <Link href="/" className="text-sm text-primary-600 hover:underline">Terug naar home</Link>
        <Link href="/redactioneel-beleid" className="text-sm text-primary-600 hover:underline">Redactioneel beleid</Link>
        <Link href="/contact" className="text-sm text-primary-600 hover:underline">Contact</Link>
      </div>
    </div>
  )
}
