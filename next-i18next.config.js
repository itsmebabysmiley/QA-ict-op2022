const path = require('path')

module.exports = {
  i18n: {
    // debug: process.env.NODE_ENV === 'development',
    defaultLocale: 'th',
    locales: ['th', 'en'],
    localePath: path.resolve('./public/static/locales'),
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
}
