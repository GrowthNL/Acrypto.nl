import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
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

    const { data, error } = await resend.emails.send({
      from: 'Acrypto.nl <noreply@acrypto.nl>',
      to: 'info@growthmedia.nl',
      replyTo: email,
      subject: `[Acrypto.nl${type === 'adverteren' ? ' - Adverteren' : ''}] ${subject}`,
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

    // De Resend-SDK gooit geen exception bij een geweigerde verzending,
    // maar geeft een error-object terug. Dat moeten we expliciet afvangen,
    // anders meldt het formulier "verzonden" terwijl er niets verstuurd is.
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Verzenden mislukt. Probeer het later opnieuw of mail ons direct.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ error: 'Verzenden mislukt. Probeer het later opnieuw.' }, { status: 500 })
  }
}
