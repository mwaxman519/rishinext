import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  console.log(`[Debug] Rendering static page for slug: ${slug}`);

  // Return a simple static page for testing
  return (
    <div className="container mx-auto py-10">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Test Page: {slug}</h1>
        <p className="text-xl text-muted-foreground">
          This is a static test page to verify routing and rendering.
        </p>
        <div className="mt-4">
          <h2>Debug Information</h2>
          <pre className="bg-muted p-4 rounded-lg">
            {JSON.stringify({ slug, timestamp: new Date().toISOString() }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Keep static params generation but simplify it
export async function generateStaticParams() {
  // Return some test slugs
  return [
    { slug: 'test' },
    { slug: 'about' },
    { slug: 'welcome' }
  ];
}