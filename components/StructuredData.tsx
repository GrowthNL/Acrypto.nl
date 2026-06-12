import { Article, KnowledgeArticle } from '@/lib/types'

const SITE_NAME = 'Acrypto.nl'

export function ArticleStructuredData({ article, siteUrl }: { article: Article; siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image_url ? [article.image_url] : [`${siteUrl}/images/crypto-default.jpg`],
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
    name: SITE_NAME,
    url: siteUrl,
    description: 'Het meest betrouwbare Nederlandse platform voor crypto nieuws, koersen en educatie.',
    inLanguage: 'nl-NL',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/nieuws?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
