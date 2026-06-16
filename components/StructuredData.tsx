import { Article, KnowledgeArticle } from '@/lib/types'
import { getCategoryImage } from '@/lib/utils'
import { getAuthor } from '@/lib/authors'

const SITE_NAME = 'Acrypto.nl'

// Google Discover/News houdt van grote afbeeldingen (>=1200px) in meerdere
// verhoudingen (16:9, 4:3, 1:1). We genereren die uit de bron-URL (Unsplash
// ondersteunt w/h/fit/crop). Niet-parseerbare URL's vallen terug op een enkel beeld.
function imageVariants(url: string) {
  try {
    const make = (w: number, h: number) => {
      const u = new URL(url)
      u.searchParams.set('w', String(w))
      u.searchParams.set('h', String(h))
      u.searchParams.set('fit', 'crop')
      u.searchParams.set('q', '80')
      return { '@type': 'ImageObject' as const, url: u.toString(), width: w, height: h }
    }
    return [make(1200, 675), make(1200, 900), make(1200, 1200)]
  } catch {
    return [{ '@type': 'ImageObject' as const, url, width: 1200, height: 630 }]
  }
}

// Echte auteur als Person (sterker voor E-E-A-T); de redactie-byline blijft Organization.
function authorNode(name: string | undefined | null, siteUrl: string) {
  const a = getAuthor(name)
  if (a.id === 'redactie') {
    return { '@type': 'Organization', name: a.name, url: `${siteUrl}/redactioneel-beleid` }
  }
  return {
    '@type': 'Person',
    name: a.name,
    jobTitle: a.role,
    description: a.bio,
    url: `${siteUrl}/auteur/${a.id}`,
    ...(a.avatar ? { image: `${siteUrl}${a.avatar}` } : {}),
    ...(a.knowsAbout?.length ? { knowsAbout: a.knowsAbout } : {}),
    ...(a.sameAs?.length ? { sameAs: a.sameAs } : {}),
  }
}

const publisherLogo = (siteUrl: string) => ({
  '@type': 'ImageObject',
  url: `${siteUrl}/logo.png`,
  width: 512,
  height: 512,
})

export function ArticleStructuredData({ article, siteUrl }: { article: Article; siteUrl: string }) {
  const image = article.image_url || getCategoryImage(article.category)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: imageVariants(image),
    datePublished: article.published_at,
    dateModified: article.updated_at,
    inLanguage: 'nl-NL',
    author: authorNode(article.author_name, siteUrl),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      logo: publisherLogo(siteUrl),
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
      logo: publisherLogo(siteUrl),
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
    logo: publisherLogo(siteUrl),
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

export function PersonStructuredData({
  author,
  siteUrl,
}: {
  author: { id: string; name: string; role: string; bio: string; avatar?: string; knowsAbout?: string[]; sameAs?: string[] }
  siteUrl: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/auteur/${author.id}#person`,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${siteUrl}/auteur/${author.id}`,
    ...(author.avatar ? { image: `${siteUrl}${author.avatar}` } : {}),
    ...(author.knowsAbout?.length ? { knowsAbout: author.knowsAbout } : {}),
    ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
    worksFor: { '@type': 'Organization', name: SITE_NAME, url: siteUrl },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
