import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from './mdx-components';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXServerProps {
  source: string;
}

export async function MDXServer({ source }: MDXServerProps) {
  if (!source) {
    return null;
  }

  try {
    const { content } = await compileMDX({
      source,
      components,
      options: {
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
        },
        parseFrontmatter: true,
      }
    });

    return (
      <div className="mdx-content">
        {content}
      </div>
    );
  } catch (error) {
    console.error('MDX compilation error:', error);
    return (
      <div className="p-4 rounded-lg border border-destructive bg-destructive/10">
        <h3 className="text-lg font-semibold mb-2">Error Rendering Content</h3>
        <p className="text-sm text-muted-foreground">
          {error instanceof Error ? error.message : 'An unknown error occurred while rendering content'}
        </p>
      </div>
    );
  }
}