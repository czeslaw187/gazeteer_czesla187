/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  images: {
    domains: ['flagcdn.com', 'openweathermap.org']
  }
}

module.exports = nextConfig
