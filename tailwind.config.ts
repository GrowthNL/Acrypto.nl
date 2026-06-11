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
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
        surface:  '#F8FAFC',
        surface2: '#F1F5F9',
        border:   '#E2E8F0',
        muted:    '#64748B',
        up:   '#059669',
        down: '#DC2626',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
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
        'card-hover': '0 8px 24px -4px rgba(79,70,229,.12), 0 2px 6px -2px rgba(0,0,0,.06)',
        'ticker': 'inset -24px 0 16px -8px #fff, inset 24px 0 16px -8px #fff',
      },
    },
  },
  plugins: [],
}
export default config
