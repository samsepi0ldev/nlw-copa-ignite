/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        app: 'url(/bg.png)'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      colors: {
        yellow: {
          500: '#F7DD43'
        },
        green: {
          500: '#129E57'
        },
        gray: {
          950: '#09090A',
          900: '#121214',
          800: '#202024',
          600: '#323238',
          300: '#8D8D99',
          200: '#C4C4CC',
          100: '#E1E1E6'
        }
      }
    },
  },
  plugins: [],
}
