/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fbf7f3',
          100: '#f5ebe1',
          200: '#ead3bb',
          300: '#deb489',
          400: '#cf8c50',
          500: '#b96c2f',
          600: '#9a5224',
          700: '#7a401f',
          800: '#65361d',
          900: '#3b1f12',
        },
        saffron: { DEFAULT: '#FF9933', 500: '#FF9933' },
        rosevale: { DEFAULT: '#AB4E52' },
        cream: { DEFAULT: '#FFF4E1' },
        cornsilk: { DEFAULT: '#FFF8DC' },
        maroon: { DEFAULT: '#8B0000' },
        mango: { DEFAULT: '#FFC324' },
        peacock: { DEFAULT: '#1A5276' },
        turmeric: { DEFAULT: '#FFD700' },
        charcoal: { DEFAULT: '#333333' },
        warmbrown: { DEFAULT: '#5C4033' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


