import createMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { 
        behavior: 'wrap',
        properties: {
          className: ['anchor']
        }
      }]
    ],
  },
});

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
};

export default withMDX(nextConfig);
