import Anthropic from '@anthropic-ai/sdk'
import { GeneratedArticle } from './types'
import { slugify } from './utils'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateDutchArticle(
  sourceTitle: string,
  sourceContent: string,
  sourceName: string,
  recentTitles: string[] = []
): Promise<GeneratedArticle | null> {
  // Recent gebruikte titels meegeven zodat het model bewust een andere
  // structuur/formulering kiest en er geen repeterend patroon ontstaat.
  const avoidBlock = recentTitles.length
    ? `\n\nRecent gebruikte titels op de site (kies BEWUST een andere structuur en andere openingswoorden; kopieer dit patroon NIET):\n${recentTitles.slice(0, 20).map(t => `- ${t}`).join('\n')}`
    : ''

  const prompt = `Je bent een professionele Nederlandse crypto journalist voor acrypto.nl, een betrouwbare, moderne crypto nieuwssite.

Schrijf een VOLLEDIG ORIGINEEL Nederlands artikel gebaseerd op het onderstaande bronbericht.
Kopieer NOOIT letterlijk. Schrijf vanuit een eigen invalshoek, voeg context en analyse toe.

Eisen:
- Pakkende Nederlandse titel (max 65 tekens, SEO-geoptimaliseerd).
  VARIEER de titelstructuur sterk. Vermijd terugkerende sjablonen zoals
  "X: wat betekent dit voor crypto?", "X zakt onder cruciale grens...",
  "Wat nu voor de koers?" of "X stijgt Y%: dit zijn de drijvende krachten".
  Wissel af tussen nieuwszinnen, vraagvormen, cijfer-openers en directe
  statements. Begin niet elke titel met dezelfde muntnaam of hetzelfde woord.
- Duidelijke intro die de lezer direct aanspreekt
- Minimaal 650 woorden, gestructureerd in alinea's met <h2> subkopjes
- Objectief, informatief en toegankelijk voor Nederlandse cryptolezers
- Geoptimaliseerd voor Google Discover: actueel, relevant, meeslepend
- VOEG ECHTE TOEGEVOEGDE WAARDE TOE (belangrijk): herhaal niet alleen het bronbericht,
  maar plaats het in context. Voeg achtergrond toe (eerdere ontwikkelingen, hoe dit past
  in een grotere trend) en leg uit wat het concreet betekent voor Nederlandse lezers/beleggers.
- Voeg een aparte duidingsalinea toe onder een <h2>-kop zoals "Wat betekent dit?" met een
  nuchtere, eigen analyse (geen koersvoorspelling, geen advies).
- Sluit af met een korte conclusie of vooruitblik
- Gebruik geen bronvermelding in de tekst
- Gebruik NOOIT een liggend streepje (em-dash). Gebruik gewone leestekens.
- Geef GEEN beleggingsadvies en GEEN koersvoorspellingen.
- Vermijd stellige claims als "gegarandeerd", "zeker rendement", "beste investering", "moet je kopen" of "nu instappen".
- Gebruik neutrale, nuchtere taal: "kan interessant zijn", "de risico's blijven groot", "historische koersen bieden geen garantie", "doe eigen onderzoek".
- Schrijf voor zowel beginners als geinteresseerde beleggers: helder, betrouwbaar, zonder hype of casino-achtige taal.

Retourneer UITSLUITEND geldige JSON (geen markdown, geen uitleg eromheen):
{
  "title": "Nederlandse pakkende titel",
  "slug": "url-vriendelijke-slug",
  "excerpt": "Meta beschrijving van 130-155 tekens voor SEO",
  "tldr": "2-3 zinnen: de absolute kern van dit artikel voor lezers die snel willen weten wat er speelt",
  "content": "<p>HTML artikel content met <h2> subkopjes...</p>",
  "faqs": [
    {"q": "Vraag die lezers over dit onderwerp hebben?", "a": "Duidelijk en volledig antwoord in 2-3 zinnen."},
    {"q": "Tweede relevante vraag?", "a": "Antwoord."},
    {"q": "Derde vraag?", "a": "Antwoord."}
  ],
  "tags": ["bitcoin", "ethereum", "tag3"],
  "category": "nieuws"
}

Categorieën (kies de meest passende): nieuws, bitcoin, ethereum, altcoins, defi, nft, regulering, marktanalyse${avoidBlock}

Bronbericht van ${sourceName}:
Titel: ${sourceTitle}

Inhoud:
${sourceContent.substring(0, 3000)}`

  try {
    const message = await client.messages.create(
      {
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      },
      { timeout: 180_000 },
    )

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const parsed = JSON.parse(jsonMatch[0]) as GeneratedArticle
    if (!parsed.slug) {
      parsed.slug = slugify(parsed.title)
    }
    return parsed
  } catch (err) {
    console.error('Claude API error:', err)
    return null
  }
}
