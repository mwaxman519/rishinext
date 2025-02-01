import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, {
        theme: 'github-dark',
        onVisitLine(node) {
          // Prevent lines from collapsing in `display: grid` mode
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
          }
        },
        onVisitHighlightedLine(node) {
          node.properties.className.push('line--highlighted');
        },
      }],
    ],
    providerImportSource: "@mdx-js/react",
  },
});

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
    ppr: false,
    mdxRs: true, // Enable the new Rust-based MDX compiler
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);