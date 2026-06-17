import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Huisstijl: lime-deep ramp voor accent-tekst/links/knoppen (leesbaar op licht).
        primary: {
          50:  '#f3f9e3',
          100: '#e7f3c6',
          200: '#d3e996',
          500: '#6f9e16',
          600: '#52790f',
          700: '#3f5d0b',
          900: '#283c07',
        },
        brand:       '#C5FA4A',  // Signal Lime - signatuuraccent / CTA
        'brand-dim': '#A9D63B',
        ink:      '#0C100E',     // tekst / donkere basis
        paper:    '#F3F4EF',     // lichte achtergrond
        surface:  '#FFFFFF',
        surface2: '#EEF0E8',
        border:   '#E2E5DB',
        muted:    '#69726C',
        up:   '#10B981',
        down: '#EF4444',
      },
      fontFamily: {
        sans:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        ticker:   'ticker 60s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.04)',
        'card-hover': '0 8px 24px -4px rgba(12,16,14,.12), 0 2px 6px -2px rgba(0,0,0,.06)',
        'ticker': 'inset -24px 0 16px -8px #fff, inset 24px 0 16px -8px #fff',
      },
    },
  },
  plugins: [],
}
export default config
