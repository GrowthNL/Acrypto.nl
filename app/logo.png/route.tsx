import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Rastervariant van het logo (PNG) in de huisstijl - publisher-logo voor
// NewsArticle/Organization structured data (Discover/News). 512x512.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F3F4EF',
          gap: 24,
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 52,
            background: '#C5FA4A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="150" height="150" viewBox="0 0 120 120" fill="none">
            <path d="M36 92 L60 38 L84 92" stroke="#0C100E" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M47 70 L73 70" stroke="#0C100E" strokeWidth="12" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', fontSize: 56, fontWeight: 800, color: '#0C100E', letterSpacing: '-0.03em' }}>
          acrypto<span style={{ color: '#52790F' }}>.nl</span>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  )
}
