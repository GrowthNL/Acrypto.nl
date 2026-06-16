import { NextRequest } from 'next/server'
import { getDb, DB_READY } from '@/lib/db'

export const runtime = 'nodejs'

// Uitschrijven uit de nieuwsbrief via de link onderaan elke digest.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()

  if (email && DB_READY && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    try {
      const db = getDb()
      await db`UPDATE newsletter_subscribers SET active = false WHERE email = ${email}`
    } catch {}
  }

  const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Uitgeschreven</title>
<style>body{font-family:system-ui,sans-serif;background:#f8fafc;color:#0f172a;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;max-width:420px;text-align:center}
a{color:#4f46e5}</style></head><body><div class="card">
<h1 style="font-size:20px">Je bent uitgeschreven</h1>
<p style="color:#475569">Je ontvangt geen nieuwsbrief meer van Acrypto.nl. Van gedachten veranderd? Je kunt je altijd opnieuw aanmelden op de website.</p>
<p><a href="https://acrypto.nl">Terug naar Acrypto.nl</a></p></div></body></html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
