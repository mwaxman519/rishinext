import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXContent } from './mdx-content';
import { components } from './mdx-components';

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
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          development: process.env.NODE_ENV === 'development',
        },
      },
    });

    return <MDXContent compiledContent={content} />;
  } catch (error) {
    console.error('MDX compilation error:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to compile MDX: ${error.message}`
        : 'An unknown error occurred while compiling MDX'
    );
  }
}