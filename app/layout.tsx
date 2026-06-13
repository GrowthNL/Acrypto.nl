import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PriceTicker from '@/components/PriceTicker'
import { WebsiteStructuredData, OrganizationStructuredData } from '@/components/StructuredData'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, IS_PRODUCTION } from '@/lib/config'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Acrypto.nl | Nederlands crypto nieuws en live koersen',
    template: '%s | Acrypto.nl',
  },
  description: SITE_DESCRIPTION,
  keywords: ['crypto nieuws', 'bitcoin koers', 'ethereum koers', 'cryptocurrency Nederland', 'crypto kennisbank'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Acrypto.nl | Nederlands crypto nieuws en live koersen',
    description: SITE_DESCRIPTION,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Acrypto.nl' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acrypto.nl | Nederlands crypto nieuws en live koersen',
    description: SITE_DESCRIPTION,
    images: ['/og-default.jpg'],
  },
  // Alleen indexeren op de echte productie-deploy. Preview/development = noindex.
  robots: IS_PRODUCTION
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
      }
    : { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <WebsiteStructuredData siteUrl={SITE_URL} />
        <OrganizationStructuredData siteUrl={SITE_URL} />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className={`${inter.variable} font-sans bg-white text-slate-900 min-h-screen`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Naar hoofdinhoud
        </a>
        <PriceTicker />
        <Header />
        <main id="main-content" className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
