import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Node-runtime nodig voor SMTP (nodemailer werkt niet op de edge runtime).
export const runtime = 'nodejs'

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT || 465)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
// Afzender: standaard de mailbox zelf (zo blijven SPF/DKIM kloppend).
const SMTP_FROM = process.env.SMTP_FROM || (SMTP_USER ? `Acrypto.nl <${SMTP_USER}>` : '')
// Ontvanger: waar de contactberichten heen moeten.
const CONTACT_TO = process.env.CONTACT_TO || 'info@growthmedia.nl'

export async function POST(req: NextRequest) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('Contact: SMTP-config ontbreekt (SMTP_HOST/SMTP_USER/SMTP_PASS).')
    return NextResponse.json(
      { error: 'E-mail is nog niet geconfigureerd. Probeer het later opnieuw.' },
      { status: 503 },
    )
  }

  try {
    const { name, email, subject, message, type } = await req.json() as {
      name: string
      email: string
      subject: string
      message: string
      type: string
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Vul alle velden in.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // 465 = impliciet SSL, 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[Acrypto.nl${type === 'adverteren' ? ' - Adverteren' : ''}] ${subject}`,
      text: `Nieuw bericht via acrypto.nl\n\nType: ${type === 'adverteren' ? 'Advertentie-aanvraag' : 'Algemeen contact'}\nNaam: ${name}\nE-mail: ${email}\nOnderwerp: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #4f46e5;">Nieuw bericht via acrypto.nl</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#64748b; width:100px;">Type</td><td><strong>${type === 'adverteren' ? 'Advertentie-aanvraag' : 'Algemeen contact'}</strong></td></tr>
            <tr><td style="padding:6px 0; color:#64748b;">Naam</td><td>${name}</td></tr>
            <tr><td style="padding:6px 0; color:#64748b;">E-mail</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0; color:#64748b;">Onderwerp</td><td>${subject}</td></tr>
          </table>
          <hr style="margin:16px 0; border:none; border-top:1px solid #e2e8f0;" />
          <p style="white-space:pre-wrap; color:#1e293b;">${message.replace(/</g, '&lt;')}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ error: 'Verzenden mislukt. Probeer het later opnieuw.' }, { status: 502 })
  }
}
