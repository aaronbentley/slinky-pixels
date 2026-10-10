import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    trailingSlash: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io'
            }
        ]
    },
    logging: {
        fetches: {
            // fullUrl: process.env.NODE_ENV === 'development'
            fullUrl: false
        }
    },
    experimental: {
        globalNotFound: true,
        esmExternals: true
    }
}

export default nextConfig
