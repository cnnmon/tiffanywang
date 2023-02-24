/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cosmic': '#5F68BB',
        'peach': '#FFBBB1',
        'dusk': '#CEA8C5',
      },
    },
  },
  plugins: [],
}
