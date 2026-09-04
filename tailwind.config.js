/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#07080F',
          50: '#F0EFF4',
          100: '#D7D8E2',
          200: '#A9ABBF',
          300: '#7B7E9C',
          400: '#4D5179',
          500: '#2A2D4A',
          600: '#1B1E34',
          700: '#141727',
          800: '#0F111E',
          900: '#0A0A14',
          950: '#07080F',
        },
        plasma: {
          DEFAULT: '#7B61FF',
          400: '#9E86FF',
          500: '#7B61FF',
          600: '#5E42F5',
        },
        ember: {
          DEFAULT: '#FF5722',
          400: '#FF7A50',
          500: '#FF5722',
          600: '#E64A19',
        },
        cyanGlow: {
          DEFAULT: '#00F0FF',
          400: '#33F3FF',
          500: '#00F0FF',
        }
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        drama: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
