import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '960px',
      lg: '1024px',
      mlg: '1350px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-100': 'var(--color-primary-100)',
        'primary-200': 'var(--color-primary-200)',
        'primary-300': 'var(--color-primary-300)',
        'primary-400': 'var(--color-primary-400)',
        'primary-500': 'var(--color-primary-500)',
        'primary-600': 'var(--color-primary-600)',
        'primary-700': 'var(--color-primary-700)',
        'primary-800': 'var(--color-primary-800)',
        'primary-900': 'var(--color-primary-900)',
        'primary-A100': 'var(--color-primary-A100)',
        'primary-A200': 'var(--color-primary-A200)',
        'primary-A400': 'var(--color-primary-A400)',
        'primary-A700': 'var(--color-primary-A700)',
      },
      backgroundImage: {
        gradient: 'var(--color-gradient)',
      },

      keyframes: {
        scrolling: {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        scrolling: 'scrolling 8s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
