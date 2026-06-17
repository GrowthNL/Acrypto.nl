import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title    = searchParams.get('title') || 'Acrypto.nl'
  const category = searchParams.get('category') || ''
  const type     = searchParams.get('type') || 'nieuws'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0C100E 0%, #161E1B 60%, #1C2622 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Category badge */}
        {category && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(197,250,74,0.14)',
            color: '#C5FA4A',
            padding: '6px 18px',
            borderRadius: '100px',
            fontSize: '17px',
            fontWeight: 600,
            marginBottom: '28px',
            width: 'fit-content',
            border: '1px solid rgba(197,250,74,0.35)',
          }}>
            {category.toUpperCase()}
          </div>
        )}

        {/* Title */}
        <div style={{
          fontSize: title.length > 70 ? '40px' : title.length > 50 ? '48px' : '56px',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.25,
          flex: 1,
          display: 'flex',
          alignItems: category ? 'flex-start' : 'center',
          maxWidth: '950px',
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
              background: '#C5FA4A',
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
              acrypto<span style={{ color: '#C5FA4A' }}>.nl</span>
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
