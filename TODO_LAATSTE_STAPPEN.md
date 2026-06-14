# Laatste stappen voor de eigenaar

Dit bestand bevat alles wat **niet in de code op te lossen is** en waarvoor je zelf
gegevens moet aanleveren, externe accounts moet koppelen of juridische keuzes moet maken.
Alles wat technisch kon, is al doorgevoerd (zie `SEO_AANPASSINGEN.md`).

---

## 1. Domein en SITE_URL (BELANGRIJK, doe dit eerst)

- [ ] Bepaal het definitieve productiedomein (vermoedelijk `https://acrypto.nl`).
- [ ] Zet in Vercel de environment variable **`NEXT_PUBLIC_SITE_URL`** op het echte domein
      (bijv. `https://acrypto.nl`), voor de **Production** omgeving.
- [ ] Controleer dat `VERCEL_ENV` op de productie-deploy `production` is. De site zet zichzelf
      automatisch op **noindex** op preview/development en op **index** op production.
      Dit is geregeld in `lib/config.ts`, `app/robots.ts` en `app/layout.tsx`.

> Zolang `NEXT_PUBLIC_SITE_URL` niet is gezet, gebruikt de site de fallback `https://acrypto.nl`
> voor canonicals, sitemap, structured data en llms.txt.

## 2. Contact e-mail / Resend

- [ ] Het contactformulier (`/contact`) stuurt e-mails via **Resend** naar `info@growthmedia.nl`.
- [ ] Zet in Vercel de variable **`RESEND_API_KEY`** (Production + Preview).
- [ ] Verifieer het afzenderdomein in Resend. De code verstuurt vanaf
      `noreply@acrypto.nl` (zie `app/api/contact/route.ts`). Pas dit aan naar een
      geverifieerd domein als `acrypto.nl` (nog) niet in Resend staat.
- [ ] Let op de Resend gratis limiet: 1 geverifieerd domein, 3.000 mails/maand.

## 3. Bedrijfs- en juridische gegevens

- [ ] Vul de echte bedrijfsnaam, KvK-nummer en vestigingsgegevens in (footer en/of
      een colofon/impressum-pagina).
- [ ] Laat het **privacybeleid** (`/privacy`) juridisch controleren. Pas de genoemde
      externe diensten aan op de werkelijk gebruikte (nu: CoinGecko, Vercel, Neon, Resend).
- [ ] Laat de **disclaimer** (`/disclaimer`) juridisch controleren.
- [ ] Maak het **affiliate- en advertentiebeleid** definitief. Er staan nu placeholders
      in `/disclaimer` en `/redactioneel-beleid`.
- [ ] Vul in `/redactioneel-beleid` de naam/gegevens van de eindverantwoordelijke/uitgever in
      (nu een placeholder).

## 4. Auteurs en redactie

- [ ] Alle artikelen tonen nu "Acrypto Redactie". Voeg eventueel echte auteursnamen,
      rollen en bios toe als je met persoonlijke auteurs wilt werken. (Het datamodel
      gebruikt `author_name` op artikelniveau.)
- [ ] Bepaal de echte redactionele bronnenlijst die je publiekelijk wilt vermelden.

## 5. Search Console, analytics en indexering

- [ ] Koppel **Google Search Console** en verifieer het domein.
- [ ] Koppel **Bing Webmaster Tools**.
- [ ] Dien de sitemap in: `https://<domein>/sitemap.xml`.
- [ ] Koppel **privacyvriendelijke analytics** (bijv. Plausible, Vercel Analytics of
      Google Analytics 4). Er is nu nog geen analytics-script actief.
- [ ] Overweeg **Google News Publisher Center** als je in Google News/Discover wilt verschijnen.

## 6. Verplichte tests op de PRODUCTIE-URL (na livegang)

- [ ] **PageSpeed Insights** draaien op de productie-URL en eventuele aandachtspunten oppakken.
- [ ] **Google Rich Results Test** draaien op een nieuwsartikel, een kennisbankartikel,
      een categoriepagina en een coinpagina (controleer NewsArticle, Article, FAQPage,
      BreadcrumbList, Organization).
- [ ] Controleer in Search Console of preview-deploys NIET geindexeerd zijn.

## 7. Nieuwsbrief

- [ ] Koppel een echte nieuwsbrief-provider aan `/api/newsletter` (nu een basis-endpoint).
      Denk aan Mailchimp, MailerLite, Brevo of Resend Audiences.

## 8. Cookies / consent

- [ ] Als je tracking/analytics met cookies toevoegt: implementeer een **cookiebanner /
      consent**-oplossing. Zonder tracking is dit niet verplicht; het privacybeleid gaat nu
      uit van cookieloze analytics.

## 9. Open content-/datapunten (optioneel)

- [ ] De koers-getallen in de kennisbank (`lib/mock-kennisbank.ts`) bevatten voorbeeldbedragen
      (bijv. Bitcoin-koers). Werk deze periodiek bij of maak ze dynamisch.
- [ ] OG-afbeelding `/og-default.jpg` wordt gerefereerd in metadata maar bestaat mogelijk
      nog niet als bestand. Voeg een echte 1200x630 OG-afbeelding toe in `/public`,
      of laat metadata terugvallen op de dynamische `/api/og` generator.

---

## Verdere SEO-optimalisatie (later, optioneel)

- [ ] Sitemap splitsen zodra er veel content is, in:
      `sitemap.xml`, `sitemaps/news.xml`, `sitemaps/kennisbank.xml`,
      `sitemaps/categories.xml`, `sitemaps/coins.xml`. De huidige sitemap is schaalbaar
      opgezet maar nog niet gesplitst.
- [ ] Meer coin-detailpagina's toevoegen in `lib/coins.ts` (nu: BTC, ETH, XRP, SOL, ADA).
- [ ] Meer kennisbankartikelen koppelen aan categorie- en coinpagina's voor diepere
      interne linking.
