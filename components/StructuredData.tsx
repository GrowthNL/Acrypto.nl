import { Article } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'

interface ArticleSchemaProps {
  article: Article
  siteUrl: string
}

export function ArticleStructuredData({ article, siteUrl }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image_url ? [article.image_url] : [`${siteUrl}/images/crypto-default.jpg`],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: article.author_name || 'Acrypto Redactie',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Acrypto.nl',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/nieuws/${article.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteStructuredData({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Acrypto.nl',
    url: siteUrl,
    description: 'Het meest betrouwbare Nederlandse platform voor crypto nieuws, koersen en educatie.',
    inLanguage: 'nl-NL',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/nieuws?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
