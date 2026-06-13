import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Search, Scale, RefreshCw, ShieldCheck, Megaphone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Redactioneel beleid',
  description: 'Hoe Acrypto.nl nieuws selecteert, bronnen controleert, fouten corrigeert en commerciele samenwerkingen markeert. Transparant en onafhankelijk.',
  alternates: { canonical: '/redactioneel-beleid' },
}

function Principle({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">{title}</h2>
        <div className="text-slate-600 leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  )
}

export default function RedactioneelBeleidPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2">Transparantie</p>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">Redactioneel beleid</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Acrypto.nl wil betrouwbaar, nuchter crypto nieuws bieden in helder Nederlands. Op deze pagina leggen we uit
          hoe wij werken: hoe we nieuws selecteren, bronnen controleren, fouten corrigeren en omgaan met commerciele
          samenwerkingen.
        </p>
      </div>

      <Principle icon={Search} title="Hoe wij nieuws selecteren">
        <p>
          Onze redactie volgt een breed scala aan gerenommeerde nationale en internationale bronnen over crypto,
          blockchain en de financiele markten. We kiezen onderwerpen op basis van relevantie voor Nederlandse lezers,
          feitelijke onderbouwing en nieuwswaarde, niet op basis van hype of sensatie.
        </p>
      </Principle>

      <Principle icon={ShieldCheck} title="Hoe wij bronnen controleren">
        <p>
          We baseren onze artikelen op verifieerbare bronnen en streven ernaar belangrijke claims bij meerdere
          onafhankelijke bronnen te toetsen. Geruchten en onbevestigde berichten markeren we als zodanig of nemen we
          niet over. We schrijven content in onze eigen woorden en kopieren geen bronteksten letterlijk.
        </p>
      </Principle>

      <Principle icon={RefreshCw} title="Hoe wij koersinformatie gebruiken">
        <p>
          Koersdata op Acrypto.nl is afkomstig van externe databronnen, waaronder CoinGecko, en is uitsluitend
          indicatief. Er kan vertraging in de data zitten. We gebruiken koersen ter informatie en presenteren ze
          nooit als basis voor beleggingsbeslissingen. Zie ook onze{' '}
          <Link href="/disclaimer" className="text-primary-600 hover:underline">disclaimer</Link>.
        </p>
      </Principle>

      <Principle icon={Scale} title="Informatief, geen financieel advies">
        <p>
          Alle content op Acrypto.nl is bedoeld voor informatieve en educatieve doeleinden. Niets op deze website
          vormt financieel, fiscaal of beleggingsadvies. We vermijden bewust stellige beleggingsclaims en koers-
          voorspellingen. We benadrukken consequent de risico&apos;s van crypto en moedigen lezers aan om eigen
          onderzoek te doen.
        </p>
      </Principle>

      <Principle icon={CheckCircle} title="Hoe wij fouten corrigeren">
        <p>
          Fouten maken kan. Zie je een onjuistheid in een artikel? Laat het ons weten via het{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">contactformulier</Link>. We beoordelen
          elk correctieverzoek serieus en passen content aan wanneer dat nodig is. Bij inhoudelijke wijzigingen
          werken we de datum van laatste aanpassing bij.
        </p>
      </Principle>

      <Principle icon={Megaphone} title="Commerciele samenwerkingen en AI">
        <p>
          Wanneer een artikel gesponsord is of affiliate-links bevat, markeren wij dat duidelijk. Commerciele
          samenwerkingen hebben geen invloed op onze redactionele keuzes. Een deel van onze content komt tot stand
          met behulp van AI-tools onder redactionele verantwoordelijkheid; we streven er altijd naar dat de
          gepubliceerde informatie correct, nuchter en begrijpelijk is.
        </p>
      </Principle>

      <div className="mt-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
        <h2 className="font-bold text-slate-900 mb-2">Verantwoordelijkheid voor publicatie</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          De eindverantwoordelijkheid voor alle publicaties ligt bij de redactie van Acrypto.nl. Voor vragen over een
          artikel of ons beleid kun je terecht via onze{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">contactpagina</Link>.
        </p>
        <p className="text-xs text-slate-400 mt-2">
          [Placeholder: naam en gegevens van de eindverantwoordelijke / uitgever nog in te vullen door de eigenaar.]
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
        <Link href="/" className="text-sm text-primary-600 hover:underline">Terug naar home</Link>
        <Link href="/over-ons" className="text-sm text-primary-600 hover:underline">Over ons</Link>
        <Link href="/disclaimer" className="text-sm text-primary-600 hover:underline">Disclaimer</Link>
      </div>
    </div>
  )
}
