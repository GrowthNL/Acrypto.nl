import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PriceTicker from '@/components/PriceTicker'
import { WebsiteStructuredData } from '@/components/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrypto.nl'

export const metadata: Metadata = {
  title: {
    default: 'Acrypto.nl | Crypto Nieuws & Koersen',
    template: '%s | Acrypto.nl',
  },
  description:
    'Het meest betrouwbare Nederlandse platform voor crypto nieuws, live koersen en een uitgebreide kennisbank. Dagelijks bijgewerkt.',
  keywords: ['crypto nieuws', 'bitcoin koers', 'ethereum koers', 'cryptocurrency Nederland'],
  authors: [{ name: 'Acrypto.nl', url: SITE_URL }],
  creator: 'Acrypto.nl',
  publisher: 'Acrypto.nl',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: SITE_URL,
    siteName: 'Acrypto.nl',
    title: 'Acrypto.nl | Crypto Nieuws & Koersen',
    description: 'Het meest betrouwbare Nederlandse platform voor crypto nieuws, live koersen en kennisbank.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Acrypto.nl' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acrypto.nl | Crypto Nieuws & Koersen',
    description: 'Het meest betrouwbare Nederlandse platform voor crypto nieuws en koersen.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <WebsiteStructuredData siteUrl={SITE_URL} />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className={`${inter.variable} font-sans bg-white text-slate-900 min-h-screen`}>
        <PriceTicker />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
