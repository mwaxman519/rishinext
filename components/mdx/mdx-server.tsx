import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXClientRenderer } from './mdx-remote';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXServerProps {
  source: string;
}

export async function MDXServer({ source }: MDXServerProps) {
  if (!source) {
    throw new Error('No content provided to MDX renderer');
  }

  try {
    const { content } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { 
              behavior: 'wrap',
              properties: {
                className: ['anchor']
              }
            }]
          ],
          development: process.env.NODE_ENV === 'development',
        },
      },
    });

    return <MDXClientRenderer source={content} />;
  } catch (error) {
    console.error('MDX compilation error:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to compile MDX: ${error.message}`
        : 'An unknown error occurred while compiling MDX'
    );
  }
}