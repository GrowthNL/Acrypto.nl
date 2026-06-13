import { NextRequest, NextResponse } from 'next/server'
import { getDb, DB_READY } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }

    if (!DB_READY) {
      return NextResponse.json({ success: true })
    }

    const db = getDb()
    await db`
      INSERT INTO newsletter_subscribers (email, active)
      VALUES (${email}, true)
      ON CONFLICT (email) DO UPDATE SET active = true
    `

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Aanmelding mislukt' }, { status: 500 })
  }
}
