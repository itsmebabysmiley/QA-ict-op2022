const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter', 'IBM Plex Sans Thai', ...fontFamily.sans],
        sans: ['Sarabun', ...fontFamily.sans],
      },
      colors: {
        'op-oxford-blue': '#00063E',
        'ict-terquoise': '#56d7b8',
        'ict-magenta-process': '#f2048a',
        'dst-prussian-blue': '#003366',
        'dst-sunglow': '#ffc914',
      },
      backgroundImage: {
        'base-overlay': "url('/static/images/bg/bg-base-overlay.png')",
        'planet-moon': "url('/static/images/bg/planet-moon.png')",
      },
    },
  },
  plugins: [],
}

module.exports = config
