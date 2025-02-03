import { notFound } from 'next/navigation';
import { getMDXContent } from '@/app/mdx';

export default async function MDXTestPage() {
  try {
    console.log('Attempting to render MDX test page...');
    const { content, metadata } = await getMDXContent('pages/mdx-test');

    return (
      <div className="container mx-auto py-10">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{metadata.title}</h1>
          {metadata.description && (
            <p className="text-xl text-muted-foreground">{metadata.description}</p>
          )}
          {content}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering MDX test page:', error);
    notFound();
  }
}