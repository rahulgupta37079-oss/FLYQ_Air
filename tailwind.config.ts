import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        slatedeep: '#111827',
        cyber: '#00E5FF',
        signal: '#39FF14',
        premium: '#F5F5F7',
        danger: '#FF3B30',
        border: 'rgba(255,255,255,0.08)',
        panel: 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        cyber: '0 0 40px -8px rgba(0,229,255,0.45)',
        signal: '0 0 30px -8px rgba(57,255,20,0.45)',
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(rgba(0,229,255,0.10) 1px, transparent 1px)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        ping2: { '75%,100%': { transform: 'scale(2)', opacity: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        ping2: 'ping2 2.5s cubic-bezier(0,0,0.2,1) infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
