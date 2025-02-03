/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
    domains: [
      'res.cloudinary.com'
    ],
  },
  reactStrictMode: true,
  experimental: {
    mdxRs: false,
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  // Add specific host and port configuration for development
  webpack: (config) => {
    return config;
  },
  // Ensure proper development server configuration
  devIndicators: {
    buildActivity: true,
  },
};

export default nextConfig;