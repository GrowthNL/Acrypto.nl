import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Deterministische hash uit een string, zodat dezelfde titel altijd hetzelfde
// (maar per artikel verschillende) ontwerp krijgt.
function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

// On-brand accentschema's; elk artikel krijgt er deterministisch een.
const SCHEMES = [
  { accent: '#C5FA4A', tint: '#1c2a12' }, // signal lime
  { accent: '#4ADE9E', tint: '#0e2a22' }, // teal
  { accent: '#4AB8FA', tint: '#0e2333' }, // sky
  { accent: '#A78BFA', tint: '#1e1a33' }, // violet
  { accent: '#FBBF24', tint: '#2c2410' }, // amber
  { accent: '#FB7185', tint: '#301620' }, // rose
  { accent: '#38E1C6', tint: '#0e2a2a' }, // aqua
  { accent: '#F59E7A', tint: '#2e1c14' }, // coral
]

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Acrypto.nl'
  const category = searchParams.get('category') || ''

  const h = hashString(title || category || 'acrypto')
  const scheme = SCHEMES[h % SCHEMES.length]
  const angle = 115 + (h % 7) * 20
  // Positie van de decoratieve cirkel varieert per artikel.
  const blobX = 60 + (h % 5) * 8
  const blobY = 8 + ((h >> 3) % 5) * 12

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(${angle}deg, #0C100E 0%, ${scheme.tint} 68%, #0C100E 100%)`,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decoratieve accent-cirkel (varieert per artikel) */}
        <div style={{
          position: 'absolute',
          top: `${blobY}%`,
          left: `${blobX}%`,
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: scheme.accent,
          opacity: 0.16,
          filter: 'blur(8px)',
        }} />
        {/* Subtiel rasterpatroon */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Category badge */}
        {category && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: `${scheme.accent}26`,
            color: scheme.accent,
            padding: '6px 18px',
            borderRadius: '100px',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '28px',
            width: 'fit-content',
            border: `1px solid ${scheme.accent}59`,
          }}>
            {category.toUpperCase()}
          </div>
        )}

        {/* Title */}
        <div style={{
          fontSize: title.length > 70 ? '44px' : title.length > 48 ? '52px' : '60px',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.22,
          flex: 1,
          display: 'flex',
          alignItems: category ? 'flex-start' : 'center',
          maxWidth: '960px',
          letterSpacing: '-0.02em',
        }}>
          {title}
        </div>

        {/* Footer bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: '24px',
          marginTop: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '11px',
              background: scheme.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 800,
              color: '#0C100E',
            }}>
              A
            </div>
            <span style={{ fontSize: '24px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
              acrypto<span style={{ color: scheme.accent }}>.nl</span>
            </span>
          </div>
          <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)' }}>
            Dagelijks crypto nieuws in het Nederlands
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
