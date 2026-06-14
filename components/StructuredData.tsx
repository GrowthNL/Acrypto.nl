import { Article, KnowledgeArticle } from '@/lib/types'
import { getCategoryImage } from '@/lib/utils'

const SITE_NAME = 'Acrypto.nl'

export function ArticleStructuredData({ article, siteUrl }: { article: Article; siteUrl: string }) {
  const image = article.image_url || getCategoryImage(article.category)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [{ '@type': 'ImageObject', url: image, width: 1200, height: 630 }],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    inLanguage: 'nl-NL',
    author: {
      '@type': 'Organization',
      name: article.author_name || 'Acrypto Redactie',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/nieuws/${article.slug}` },
    keywords: article.tags?.join(', '),
    articleSection: article.category,
    about: [
      { '@type': 'Thing', name: 'Cryptocurrency' },
      { '@type': 'Thing', name: article.category },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.quick-take', 'h1', '.article-content > p:first-of-type'],
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function KnowledgeArticleStructuredData({ article, siteUrl }: { article: KnowledgeArticle; siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image_url ? [article.image_url] : [`${siteUrl}/images/crypto-default.jpg`],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    inLanguage: 'nl-NL',
    author: {
      '@type': 'Organization',
      name: 'Acrypto Redactie',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/kennisbank/${article.slug}` },
    keywords: article.tags?.join(', '),
    articleSection: 'Crypto Kennisbank',
    about: [
      { '@type': 'Thing', name: 'Cryptocurrency' },
      { '@type': 'Thing', name: article.category },
    ],
    educationalLevel: article.difficulty,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.quick-take', 'h1', '.article-content > p:first-of-type'],
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbStructuredData({ items, siteUrl }: { items: { name: string; path: string }[]; siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQStructuredData({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs?.length) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function WebsiteStructuredData({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: SITE_NAME,
    url: siteUrl,
    description: 'Nederlands platform voor crypto nieuws, koersen en educatie. Geen financieel advies.',
    inLanguage: 'nl-NL',
    publisher: { '@id': `${siteUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/nieuws?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function OrganizationStructuredData({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg`, width: 512, height: 512 },
    description: 'Nederlands platform voor crypto nieuws, live koersen en een begrijpelijke kennisbank.',
    foundingDate: '2026',
    knowsLanguage: 'nl-NL',
    publishingPrinciples: `${siteUrl}/redactioneel-beleid`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'redactie',
      url: `${siteUrl}/contact`,
      availableLanguage: ['Dutch'],
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQStructuredDataFromList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQStructuredData faqs={faqs} />
}
