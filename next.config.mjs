/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'cdn.builder.io'],
  },
  // Allow Builder preview origins in dev (fixes Failed to fetch from cross-origin iframe)
  allowedDevOrigins: ['*.fly.dev', '*.builder.io'],
  async redirects() {
    return [
      { source: '/entertainment/gaming', destination: '/entertainment', permanent: true },
      { source: '/entertainment/local-content', destination: '/entertainment', permanent: true },
      { source: '/entertainment/media-services', destination: '/entertainment', permanent: true },
      { source: '/entertainment/streaming', destination: '/entertainment', permanent: true },
      { source: '/entertainment/talent-booking', destination: '/entertainment', permanent: true },
      { source: '/industries/entertainment', destination: '/entertainment', permanent: true },
      { source: '/services/entertainment-events', destination: '/entertainment', permanent: true },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

export default nextConfig
