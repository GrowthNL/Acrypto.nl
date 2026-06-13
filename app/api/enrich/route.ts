import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'
import { stripHtml } from '@/lib/utils'

export const maxDuration = 300

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const BATCH_SIZE = 5

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  const isVercelCron = req.headers.get('x-vercel-cron') === '1'
  const isAuthorized = isVercelCron || (cronSecret && authHeader === `Bearer ${cronSecret}`)
  if (!isAuthorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  const results = { processed: 0, updated: 0, errors: 0, remaining: 0 }

  try {
    const articles = await db`
      SELECT id, title, content, category FROM articles
      WHERE tldr IS NULL AND status = 'published'
      ORDER BY published_at DESC
      LIMIT ${BATCH_SIZE}
    ` as { id: string; title: string; content: string; category: string }[]

    const countRows = await db`SELECT COUNT(*) as n FROM articles WHERE tldr IS NULL AND status = 'published'`
    results.remaining = parseInt(String((countRows[0] as { n: string }).n)) - articles.length

    for (const article of articles) {
      results.processed++
      try {
        const plainText = stripHtml(article.content).substring(0, 2000)

        const message = await client.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 512,
          messages: [{
            role: 'user',
            content: `Je bent een Nederlandse crypto journalist. Genereer een TLDR en 3 FAQ's op basis van dit artikel.

Gebruik NOOIT een liggend streepje (em-dash). Gebruik gewone leestekens.

Retourneer UITSLUITEND geldige JSON:
{
  "tldr": "2-3 zinnen die de absolute kern samenvatten",
  "faqs": [
    {"q": "Vraag die lezers stellen?", "a": "Helder antwoord in 1-2 zinnen."},
    {"q": "Tweede vraag?", "a": "Antwoord."},
    {"q": "Derde vraag?", "a": "Antwoord."}
  ]
}

Artikel: ${article.title}

${plainText}`,
          }],
        })

        const text = message.content[0].type === 'text' ? message.content[0].text : ''
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) { results.errors++; continue }

        const { tldr, faqs } = JSON.parse(jsonMatch[0]) as {
          tldr: string
          faqs: { q: string; a: string }[]
        }

        const cleanContent = article.content.replace(/—/g, ' -')

        await db`
          UPDATE articles
          SET tldr = ${tldr}, faqs = ${JSON.stringify(faqs)}, content = ${cleanContent}
          WHERE id = ${article.id}
        `
        results.updated++
      } catch {
        results.errors++
      }
    }

    return NextResponse.json({ success: true, ...results })
  } catch (err) {
    console.error('Enrich error:', err)
    return NextResponse.json({ error: 'Enrich failed', ...results }, { status: 500 })
  }
}
