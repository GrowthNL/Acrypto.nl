import { formatEur } from '@/lib/utils'

/** Eenvoudige SVG-koersgrafiek (area) - geen externe libs, server-gerenderd. */
export default function PriceChart({
  points,
  up,
  days = 30,
}: {
  points: { t: number; p: number }[]
  up: boolean
  days?: number
}) {
  if (!points || points.length < 2) return null

  const w = 800
  const h = 240
  const pad = 6
  const ys = points.map(p => p.p)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const minX = points[0].t
  const maxX = points[points.length - 1].t
  const spanX = maxX - minX || 1
  const spanY = maxY - minY || 1

  const sx = (t: number) => pad + ((t - minX) / spanX) * (w - 2 * pad)
  const sy = (p: number) => pad + (1 - (p - minY) / spanY) * (h - 2 * pad)

  const line = points.map((pt, i) => `${i === 0 ? 'M' : 'L'}${sx(pt.t).toFixed(1)},${sy(pt.p).toFixed(1)}`).join(' ')
  const area = `${line} L${sx(maxX).toFixed(1)},${(h - pad).toFixed(1)} L${sx(minX).toFixed(1)},${(h - pad).toFixed(1)} Z`
  const color = up ? '#10b981' : '#ef4444'
  const gid = `grad-${up ? 'up' : 'down'}`

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-slate-700">Koersverloop ({days} dagen)</h2>
        <span className="text-xs text-slate-400">in euro (€)</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="none" role="img" aria-label={`Koersverloop ${days} dagen`}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
        <span>Laag: <span className="font-semibold text-slate-600">{formatEur(minY)}</span></span>
        <span>Hoog: <span className="font-semibold text-slate-600">{formatEur(maxY)}</span></span>
      </div>
    </div>
  )
}
