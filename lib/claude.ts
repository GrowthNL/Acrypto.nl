import Anthropic from '@anthropic-ai/sdk'
import { GeneratedArticle } from './types'
import { slugify } from './utils'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateDutchArticle(
  sourceTitle: string,
  sourceContent: string,
  sourceName: string
): Promise<GeneratedArticle | null> {
  const prompt = `Je bent een professionele Nederlandse crypto journalist voor acrypto.nl — een betrouwbare, moderne crypto nieuwssite.

Schrijf een VOLLEDIG ORIGINEEL Nederlands artikel gebaseerd op het onderstaande bronbericht.
Kopieer NOOIT letterlijk. Schrijf vanuit een eigen invalshoek, voeg context en analyse toe.

Eisen:
- Pakkende Nederlandse titel (max 65 tekens, SEO-geoptimaliseerd)
- Duidelijke intro die de lezer direct aanspreekt
- Minimaal 650 woorden, gestructureerd in alinea's met <h2> subkopjes
- Objectief, informatief en toegankelijk voor Nederlandse cryptolezers
- Geoptimaliseerd voor Google Discover: actueel, relevant, meeslepend
- Sluit af met een korte conclusie of vooruitblik
- Gebruik geen bronvermelding in de tekst

Retourneer UITSLUITEND geldige JSON (geen markdown, geen uitleg eromheen):
{
  "title": "Nederlandse pakkende titel",
  "slug": "url-vriendelijke-slug",
  "excerpt": "Meta beschrijving van 130-155 tekens voor SEO",
  "content": "<p>HTML artikel content met <h2> subkopjes...</p>",
  "tags": ["bitcoin", "ethereum", "tag3"],
  "category": "nieuws"
}

Categorieën (kies de meest passende): nieuws, bitcoin, ethereum, altcoins, defi, nft, regulering, marktanalyse

Bronbericht van ${sourceName}:
Titel: ${sourceTitle}

Inhoud:
${sourceContent.substring(0, 3000)}`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

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
