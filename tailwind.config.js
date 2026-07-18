/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Architectural neutrals — warm-cool ink & stone
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae1',
          300: '#b0bac7',
          400: '#8593a6',
          500: '#65748b',
          600: '#505d72',
          700: '#424c5d',
          800: '#39414f',
          900: '#1f242e',
          950: '#12151b',
        },
        // Blueprint — signature primary
        blueprint: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598dff',
          500: '#3563f6',
          600: '#1f45eb',
          700: '#1934d8',
          800: '#1b2eaf',
          900: '#1c2d8a',
          950: '#161d54',
        },
        // Clay — warm accent
        clay: {
          50: '#fdf5f1',
          100: '#fbe8df',
          200: '#f6cdba',
          300: '#efab8c',
          400: '#e57e57',
          500: '#dc5d33',
          600: '#cb4626',
          700: '#a93520',
          800: '#882d20',
          900: '#6f291f',
          950: '#3c120c',
        },
        // Semantic
        moss: '#3f9d6b',
        amber2: '#e0a411',
        rose2: '#e0446b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Clash Display"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(18,21,27,0.04), 0 4px 16px rgba(18,21,27,0.06)',
        lift: '0 2px 4px rgba(18,21,27,0.05), 0 12px 32px rgba(18,21,27,0.10)',
        glow: '0 0 0 1px rgba(53,99,246,0.12), 0 8px 32px rgba(53,99,246,0.18)',
      },
      backgroundImage: {
        'grid-blueprint':
          'linear-gradient(rgba(53,99,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(53,99,246,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
}
