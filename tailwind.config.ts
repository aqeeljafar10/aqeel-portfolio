import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'Menlo', 'monospace'],
      },
      colors: {
        bg: '#000000',
        fg: '#FFFFFF',
        muted: '#6B6B6B',
        subtle: '#1A1A1A',
        accent: '#E5E5E5',
        border: '#2A2A2A',
      },
      fontSize: {
        display: ['clamp(2.4rem, 10vw, 8rem)', { lineHeight: '0.95', letterSpacing: '0.12em' }],
        h1: ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.05' }],
        h2: ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        section: 'clamp(5rem, 12vw, 10rem)',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1.2s step-end infinite',
      },
    },
  },
  plugins: [],
}

export default config
