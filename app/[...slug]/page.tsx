import { getMDXContent } from '../mdx';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';

export default async function Page({ params }: { params: { slug: string[] } }) {
  try {
    const contentPath = params.slug.join('/');
    const { metadata, content } = await getMDXContent(contentPath);

    return (
      <div className="container py-8">
        <article>
          <div className="mb-8">
            <h1 className="text-4xl font-bold">{metadata.title}</h1>
            {metadata.description && (
              <p className="mt-2 text-xl text-muted-foreground">
                {metadata.description}
              </p>
            )}
          </div>
          <MDXContent content={content} />
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    notFound();
  }
}