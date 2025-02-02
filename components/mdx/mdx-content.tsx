import { useMDXComponents } from './mdx-components';
import { compileMDX } from 'next-mdx-remote/rsc';

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  const components = useMDXComponents();

  const { content: compiledContent } = await compileMDX({
    source: content,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
  });

  return (
    <article className="prose dark:prose-invert max-w-none">
      {compiledContent}
    </article>
  );
}