import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from './mdx-components';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXServerProps {
  source: string;
}

export async function MDXServer({ source }: MDXServerProps) {
  if (!source) {
    console.error('MDXServer received empty source');
    return (
      <div className="p-4 rounded-lg border border-destructive bg-destructive/10">
        <h3 className="text-lg font-semibold mb-2">Error: Empty Content</h3>
        <p className="text-sm text-muted-foreground">
          No content was provided to render.
        </p>
      </div>
    );
  }

  try {
    console.log('Attempting to compile MDX content...');
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
          format: 'mdx'
        },
        parseFrontmatter: true,
      }
    });

    console.log('MDX compilation successful');
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
        <pre className="mt-2 p-2 bg-muted rounded text-xs">
          {error instanceof Error ? error.stack : 'No stack trace available'}
        </pre>
      </div>
    );
  }
}