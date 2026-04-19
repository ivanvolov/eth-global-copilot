/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#07070a',
          900: '#0b0b10',
          800: '#12121a',
          700: '#1a1a24',
          600: '#242433',
        },
        eth: {
          purple: '#8a63ff',
          blue: '#4c6bff',
          violet: '#b388ff',
          pink: '#ff6ec7',
          cyan: '#6cf0ff',
        },
      },
      animation: {
        'float-slow': 'float 14s ease-in-out infinite',
        'grid-pan': 'gridPan 40s linear infinite',
        'fade-up': 'fadeUp .8s ease forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(20px,-24px)' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
