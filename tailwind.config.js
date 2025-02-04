/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
      colors: {
        dark: {
          bg: '#0A0A0A',
          card: '#111111',
          border: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
};