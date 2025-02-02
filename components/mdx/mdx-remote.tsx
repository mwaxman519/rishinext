import { MDXRemote as NextMDXRemote } from 'next-mdx-remote/rsc';
import { components } from './mdx-components';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXRemoteProps {
  source: string;
}

export async function MDXRemote({ source }: MDXRemoteProps) {
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
          }
        }}
      />
    </div>
  );
}