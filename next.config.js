/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  output: 'standalone'
}

module.exports = nextConfig
