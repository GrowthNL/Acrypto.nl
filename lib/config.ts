/**
 * Centrale site-configuratie.
 *
 * SITE_URL: het canonieke productie-domein. Wordt gebruikt voor metadata,
 * canonicals, sitemap, structured data en llms.txt.
 *
 * IS_PRODUCTION: alleen true op de echte productie-deploy (VERCEL_ENV).
 * Preview- en development-omgevingen worden hiermee op noindex gezet,
 * zodat ze niet in Google verschijnen.
 */

// Volgorde: expliciete override > Vercel production URL > fallback domein.
// NEXT_PUBLIC_SITE_URL kan in Vercel worden gezet zodra het echte domein bekend is.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://acrypto.nl'
).replace(/\/$/, '')

export const SITE_NAME = 'Acrypto.nl'

export const SITE_DESCRIPTION =
  'Nederlands platform voor crypto nieuws, live koersen en een begrijpelijke kennisbank. Nuchter, betrouwbaar en zonder hype. Geen financieel advies.'

// VERCEL_ENV is 'production' | 'preview' | 'development'.
// Buiten Vercel (lokaal) is hij leeg: dan behandelen we het als niet-productie.
export const VERCEL_ENV = process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || ''

export const IS_PRODUCTION = VERCEL_ENV === 'production'

// Centrale e-mail/contactroute. Er is bewust geen publiek e-mailadres voor
// acrypto.nl; alle contact loopt via het formulier op /contact.
export const CONTACT_PATH = '/contact'
