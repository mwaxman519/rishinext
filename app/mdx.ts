import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { components } from '@/components/mdx-components';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMDXContent(contentPath: string) {
  try {
    const fullPath = path.join(contentDirectory, `${contentPath}.mdx`);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Content not found: ${contentPath}`);
    }

    const source = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(source);

    const { content: compiledContent } = await compileMDX({
      source: content,
      options: {
        mdxOptions: {
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
        }
      },
      components
    });

    return {
      metadata: data,
      content: compiledContent
    };
  } catch (error) {
    console.error('Error processing MDX content:', error);
    throw error;
  }
}

export async function getAllContentPaths() {
  try {
    const pagesDirectory = path.join(contentDirectory, 'pages');
    const postsDirectory = path.join(contentDirectory, 'posts');

    const getContentPaths = (dir: string) => {
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => file.replace(/\.mdx$/, ''));
    };

    return {
      pages: getContentPaths(pagesDirectory),
      posts: getContentPaths(postsDirectory)
    };
  } catch (error) {
    console.error('Error getting content paths:', error);
    return { pages: [], posts: [] };
  }
}