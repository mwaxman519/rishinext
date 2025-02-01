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
      [rehypeAutolinkHeadings, { 
        behavior: 'wrap',
        properties: {
          className: ['anchor']
        }
      }],
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
        onVisitHighlightedWord(node) {
          node.properties.className = ['word--highlighted'];
        }
      }],
    ],
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  reactStrictMode: true,
  experimental: {
    ppr: false,
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);