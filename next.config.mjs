/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif']
  },
  
  // Enable compression
  compress: true,
  
  // Optimize for production
  poweredByHeader: false,
  
  // Environment variables that should be available on the client
  env: {
    NEXTAUTH_URL: "https://budget-pi-ten.vercel.app"
  },
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
};

export default nextConfig;
