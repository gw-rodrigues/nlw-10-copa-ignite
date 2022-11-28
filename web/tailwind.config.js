/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      backgroundImage: {
        app: 'url(/app-bg.svg)',
      },

      colors: {
        ignite: {
          500: '#129e57',
        },
        gray: { 900: '#121214' },
      },
    },
  },
  plugins: [],
}
