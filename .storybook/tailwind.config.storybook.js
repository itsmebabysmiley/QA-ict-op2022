const ogConfig = require('../tailwind.config')

/** @type {import('tailwindcss').Config} */
const config = {
  ...ogConfig,
  safelist: [
    {
      pattern: /^(.*?)/,
    },
  ],
}

module.exports = config
