import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getDb, DB_READY } from '@/lib/db'
import { SITE_URL } from '@/lib/config'
import type { Article } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 300

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT || 465)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_FROM = process.env.SMTP_FROM || (SMTP_USER ? `Acrypto.nl <${SMTP_USER}>` : '')

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Dagelijkse nieuwsbrief-digest. Beveiligd met CRON_SECRET of Vercel-cron-header.
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const isVercelCron = req.headers.get('x-vercel-cron') === '1'
  const authorized = isVercelCron || (cronSecret && req.headers.get('authorization') === `Bearer ${cronSecret}`)
  if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!DB_READY) return NextResponse.json({ error: 'DB niet beschikbaar' }, { status: 503 })
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: 'SMTP niet geconfigureerd' }, { status: 503 })
  }

  const db = getDb()

  // Top-artikelen van de afgelopen 24 uur (val terug op meest recente).
  let articles = (await db`
    SELECT title, slug, excerpt, category FROM articles
    WHERE status = 'published' AND published_at > NOW() - INTERVAL '24 hours'
    ORDER BY view_count DESC NULLS LAST, published_at DESC
    LIMIT 5
  `) as unknown as Article[]
  if (!articles.length) {
    articles = (await db`
      SELECT title, slug, excerpt, category FROM articles
      WHERE status = 'published'
      ORDER BY published_at DESC
      LIMIT 5
    `) as unknown as Article[]
  }
  if (!articles.length) return NextResponse.json({ sent: 0, reason: 'geen artikelen' })

  const subs = (await db`SELECT email FROM newsletter_subscribers WHERE active = true LIMIT 2000`) as { email: string }[]
  if (!subs.length) return NextResponse.json({ sent: 0, reason: 'geen abonnees' })

  const items = articles
    .map(
      a => `<tr><td style="padding:12px 0;border-bottom:1px solid #eef2f7">
        <a href="${SITE_URL}/nieuws/${a.slug}" style="font-size:16px;font-weight:700;color:#0f172a;text-decoration:none">${esc(a.title)}</a>
        <p style="margin:6px 0 0;color:#475569;font-size:14px;line-height:1.5">${esc(a.excerpt || '')}</p>
      </td></tr>`,
    )
    .join('')

  const textItems = articles.map(a => `- ${a.title}\n  ${SITE_URL}/nieuws/${a.slug}`).join('\n\n')

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  let sent = 0
  let failed = 0
  for (const { email } of subs) {
    const unsub = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`
    const html = `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <h1 style="font-size:20px;color:#4f46e5">Acrypto.nl — dagelijks crypto nieuws</h1>
      <p style="color:#475569;font-size:14px">Het belangrijkste cryptonieuws van vandaag, in het kort:</p>
      <table style="width:100%;border-collapse:collapse">${items}</table>
      <p style="margin-top:20px"><a href="${SITE_URL}/nieuws" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:600;font-size:14px">Lees meer op Acrypto.nl</a></p>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px;border-top:1px solid #eef2f7;padding-top:12px">
        Je ontvangt deze mail omdat je je hebt aangemeld op acrypto.nl. Informatief, geen financieel advies.<br>
        <a href="${unsub}" style="color:#94a3b8">Uitschrijven</a>
      </p></div>`
    const text = `Acrypto.nl - dagelijks crypto nieuws\n\n${textItems}\n\nLees meer: ${SITE_URL}/nieuws\n\nUitschrijven: ${unsub}`
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: email,
        subject: `Acrypto.nl — ${articles[0].title}`,
        text,
        html,
        headers: { 'List-Unsubscribe': `<${unsub}>` },
      })
      sent++
    } catch {
      failed++
    }
  }

  return NextResponse.json({ sent, failed, subscribers: subs.length, articles: articles.length })
}
