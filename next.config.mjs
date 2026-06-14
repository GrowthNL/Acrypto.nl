/** @type {import('next').NextConfig} */

// Categorieslugs met een eigen hubpagina onder /categorie/[slug].
const CATEGORY_SLUGS = [
  'bitcoin', 'ethereum', 'altcoins', 'defi', 'nft', 'regulering', 'marktanalyse', 'nieuws',
]

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  async redirects() {
    // Oude query-categorie-URL's (/nieuws?cat=bitcoin) doorsturen naar de
    // schone hubpagina's (/categorie/bitcoin) voor betere SEO en geen duplicate content.
    return CATEGORY_SLUGS.map(slug => ({
      source: '/nieuws',
      has: [{ type: 'query', key: 'cat', value: slug }],
      destination: `/categorie/${slug}`,
      permanent: true,
    }))
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Robots-Tag', value: 'max-image-preview:large' },
        ],
      },
    ]
  },
}

export default nextConfig
