/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.cointelegraph.com' },
      { protocol: 'https', hostname: 'www.coindesk.com' },
      { protocol: 'https', hostname: 'decrypt.co' },
      { protocol: 'https', hostname: 'bitcoinmagazine.com' },
      { protocol: 'https', hostname: 'cryptoslate.com' },
      { protocol: 'https', hostname: 'www.newsbtc.com' },
      { protocol: 'https', hostname: 'crypto-insiders.nl' },
      { protocol: 'https', hostname: 'bitcoinmagazine.nl' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
