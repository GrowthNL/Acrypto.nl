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
        bg: '#080810',
        surface: '#12121e',
        surface2: '#1c1c2e',
        border: '#2a2a40',
        accent: {
          DEFAULT: '#f7931a',
          hover: '#e8820d',
          light: '#fbbf24',
        },
        up: '#22c55e',
        down: '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#cbd5e1',
            '--tw-prose-headings': '#f1f5f9',
            '--tw-prose-links': '#f7931a',
            '--tw-prose-bold': '#f1f5f9',
            '--tw-prose-code': '#f7931a',
            '--tw-prose-quotes': '#94a3b8',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
