/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out', // Using standard Next.js output directory
  trailingSlash: true, // This helps with static hosting
  images: {
    unoptimized: true, // Required for static export
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  reactStrictMode: true,
  experimental: {
    ppr: false
  }
};

export default nextConfig;