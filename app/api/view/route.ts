import { NextRequest, NextResponse } from 'next/server'
import { getDb, DB_READY } from '@/lib/db'

// Telt een artikelweergave (view_count). Client roept dit eenmalig per sessie aan.
export async function POST(req: NextRequest) {
  if (!DB_READY) return NextResponse.json({ ok: true })
  try {
    const { slug } = (await req.json()) as { slug?: string }
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug ontbreekt' }, { status: 400 })
    }
    const db = getDb()
    await db`UPDATE articles SET view_count = COALESCE(view_count, 0) + 1 WHERE slug = ${slug} AND status = 'published'`
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
