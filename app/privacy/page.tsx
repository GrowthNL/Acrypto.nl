import type { Metadata } from 'next'
import Link from 'next/link'
import CookieSettingsButton from '@/components/CookieSettingsButton'

export const metadata: Metadata = {
  title: 'Privacybeleid | Acrypto.nl',
  description: 'Het privacybeleid van Acrypto.nl. Lees hoe wij omgaan met persoonsgegevens en cookies.',
  alternates: { canonical: '/privacy' },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2">Juridisch</p>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Privacybeleid</h1>
        <p className="text-slate-500 text-sm">Laatst bijgewerkt: juni 2026</p>
      </div>

      <Section title="1. Verwerkingsverantwoordelijke">
        <p>
          Acrypto.nl is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit
          privacybeleid. Voor vragen kunt u contact met ons opnemen via ons{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">contactformulier</Link>.
        </p>
      </Section>

      <Section title="2. Welke gegevens verzamelen wij?">
        <p>Wij verzamelen de volgende gegevens:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Nieuwsbrief:</strong> e-mailadres (alleen als u zich aanmeldt)</li>
          <li><strong>Contactformulier:</strong> naam en e-mailadres</li>
          <li><strong>Analytische gegevens:</strong> gebruiksstatistieken via Microsoft Clarity, uitsluitend als u hiervoor toestemming geeft</li>
          <li><strong>Technische gegevens:</strong> IP-adres (geanonimiseerd), browsertype, apparaattype</li>
        </ul>
      </Section>

      <Section title="3. Waarvoor gebruiken wij uw gegevens?">
        <p>Wij gebruiken uw gegevens uitsluitend voor:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Het verzenden van de nieuwsbrief (op basis van uw toestemming)</li>
          <li>Het beantwoorden van uw berichten via het contactformulier</li>
          <li>Het verbeteren van de website via geanonimiseerde statistieken</li>
          <li>Het naleven van wettelijke verplichtingen</li>
        </ul>
        <p>Wij verkopen uw gegevens nooit aan derden.</p>
      </Section>

      <Section title="4. Bewaartermijnen">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Nieuwsbrief:</strong> tot u zich uitschrijft</li>
          <li><strong>Contactberichten:</strong> maximaal 1 jaar na afhandeling</li>
          <li><strong>Serverlogbestanden:</strong> maximaal 30 dagen</li>
        </ul>
      </Section>

      <Section title="5. Uw rechten">
        <p>Op grond van de AVG (GDPR) heeft u de volgende rechten:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Inzage:</strong> u kunt opvragen welke gegevens wij van u hebben</li>
          <li><strong>Rectificatie:</strong> u kunt onjuiste gegevens laten corrigeren</li>
          <li><strong>Verwijdering:</strong> u kunt vragen uw gegevens te verwijderen</li>
          <li><strong>Bezwaar:</strong> u kunt bezwaar maken tegen verwerking</li>
          <li><strong>Dataportabiliteit:</strong> u kunt uw gegevens opvragen in een overdraagbaar formaat</li>
        </ul>
        <p>
          Voor het uitoefenen van uw rechten kunt u contact met ons opnemen via ons{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">contactformulier</Link>.
          U heeft ook het recht een klacht in te dienen bij de{' '}
          <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
            Autoriteit Persoonsgegevens
          </a>.
        </p>
      </Section>

      <Section title="6. Cookies">
        <p>
          Acrypto.nl maakt gebruik van functionele cookies die noodzakelijk zijn voor het correct
          functioneren van de website. Deze plaatsen wij zonder toestemming, omdat ze strikt
          noodzakelijk zijn.
        </p>
        <p>
          Daarnaast gebruiken wij analytische cookies van <strong>Microsoft Clarity</strong> om te
          begrijpen hoe bezoekers onze website gebruiken (zoals klikgedrag en sessieopnames met
          gemaskeerde inhoud). Deze cookies plaatsen wij <strong>uitsluitend nadat u hiervoor
          toestemming heeft gegeven</strong> via onze cookiebanner. Geeft u geen toestemming, dan
          wordt Microsoft Clarity niet geladen.
        </p>
        <p>
          U kunt uw keuze op elk moment wijzigen of intrekken: <CookieSettingsButton />.
        </p>
      </Section>

      <Section title="7. Beveiliging">
        <p>
          Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te
          beveiligen tegen ongeoorloofde toegang, verlies of vernietiging. De website maakt gebruik
          van HTTPS-versleuteling voor alle communicatie.
        </p>
      </Section>

      <Section title="8. Externe diensten">
        <p>Acrypto.nl maakt gebruik van de volgende externe diensten:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>CoinGecko API:</strong> voor live koersdata (geen persoonsgegevens gedeeld)</li>
          <li><strong>Vercel:</strong> voor hosting (zie Vercel&apos;s privacybeleid)</li>
          <li><strong>Microsoft Clarity:</strong> voor geanonimiseerde gebruiksstatistieken en sessieopnames (alleen met uw toestemming; zie Microsoft&apos;s privacybeleid)</li>
          <li><strong>Neon:</strong> voor databaseopslag (zie Neon&apos;s privacybeleid)</li>
          <li><strong>Resend:</strong> voor het afhandelen van berichten via het contactformulier</li>
        </ul>
      </Section>

      <Section title="9. Wijzigingen">
        <p>
          Wij behouden ons het recht voor dit privacybeleid te wijzigen. Wijzigingen worden gepubliceerd
          op deze pagina met vermelding van de datum van de laatste update.
        </p>
      </Section>

      <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
        <Link href="/" className="text-sm text-primary-600 hover:underline">Terug naar home</Link>
        <Link href="/over-ons" className="text-sm text-primary-600 hover:underline">Over ons</Link>
      </div>
    </div>
  )
}
