import { MDXRemote as NextMDXRemote } from 'next-mdx-remote/rsc';
import { components } from './mdx-components';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXRemoteProps {
  source: string;
}

export async function MDXRemote({ source }: MDXRemoteProps) {
  if (!source) {
    console.error('MDXRemote received empty source');
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
    return (
      <div className="mdx-content prose dark:prose-invert max-w-none">
        <NextMDXRemote
          source={source}
          components={components}
          options={{
            mdxOptions: {
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
            }
          }}
        />
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