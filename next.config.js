/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    localeDetection: false,
  },
}

module.exports = nextConfig
