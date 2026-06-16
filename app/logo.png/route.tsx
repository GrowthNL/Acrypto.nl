import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Rastervariant van het logo (PNG) - door Google geprefereerd als publisher-logo
// in NewsArticle/Organization structured data (Discover/News). 512x512.
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
          background: '#ffffff',
          gap: 28,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 48,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="120" height="120" viewBox="0 0 36 36" fill="none">
            <path d="M9.5 26L18 10L26.5 26" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 21.5H23" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', fontSize: 56, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          acrypto<span style={{ color: '#94a3b8' }}>.nl</span>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  )
}
