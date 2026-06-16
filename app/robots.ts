import { MetadataRoute } from 'next'
import { SITE_URL, IS_PRODUCTION } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  // Preview- en development-omgevingen volledig blokkeren voor crawlers.
  if (!IS_PRODUCTION) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  // Productie: alles toestaan behalve interne/API-routes.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/news-sitemap.xml`],
    host: SITE_URL,
  }
}
