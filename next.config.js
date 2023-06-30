/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    loader: 'custom',
    loaderFile: './imageLoader.ts',
  },
}

module.exports = nextConfig
