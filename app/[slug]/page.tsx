import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { MDXRemote } from '@/components/mdx/mdx-remote';
import { MDXContent } from '@/components/mdx/mdx-content';
import matter from 'gray-matter';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  console.log(`[MDX Page] Attempting to render page for slug: ${slug}`);

  try {
    // Try both content paths
    const contentPaths = [
      path.join(process.cwd(), 'static', 'content', 'pages', `${slug}.mdx`),
      path.join(process.cwd(), 'content', 'pages', `${slug}.mdx`)
    ];

    let source: string | null = null;
    let usedPath: string | null = null;

    for (const contentPath of contentPaths) {
      try {
        source = await fs.readFile(contentPath, 'utf-8');
        usedPath = contentPath;
        console.log(`[MDX Page] Successfully loaded content from: ${contentPath}`);
        break;
      } catch (error) {
        console.log(`[MDX Page] Could not load content from: ${contentPath}`, error);
        continue;
      }
    }

    if (!source) {
      console.error(`[MDX Page] No MDX file found for slug: ${slug}`);
      return notFound();
    }

    const { content, data } = matter(source);
    console.log(`[MDX Page] Parsed frontmatter data for ${slug}:`, data);

    if (!content.trim()) {
      console.error(`[MDX Page] Empty content for slug: ${slug}`);
      return (
        <div className="container mx-auto py-10">
          <div className="prose dark:prose-invert max-w-none">
            <h1>Error: Empty Content</h1>
            <p>The requested page has no content.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto py-10">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{data.title}</h1>
          {data.description && (
            <p className="text-xl text-muted-foreground">{data.description}</p>
          )}
          <MDXContent>
            <MDXRemote source={content} />
          </MDXContent>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`[MDX Page] Failed to load MDX content for slug: ${slug}`, error);
    throw error; // Let Next.js error boundary handle it
  }
}

export async function generateStaticParams() {
  const contentPaths = [
    path.join(process.cwd(), 'static', 'content', 'pages'),
    path.join(process.cwd(), 'content', 'pages')
  ];

  try {
    const allFiles = new Set<string>();

    for (const contentPath of contentPaths) {
      try {
        const files = await fs.readdir(contentPath);
        files
          .filter(file => file.endsWith('.mdx'))
          .forEach(file => allFiles.add(file));
        console.log(`[MDX Page] Found MDX files in ${contentPath}:`, files);
      } catch (error) {
        console.warn(`[MDX Page] Warning: Could not read directory ${contentPath}`, error);
        continue;
      }
    }

    const params = Array.from(allFiles).map(file => ({
      slug: file.replace(/\.mdx$/, '')
    }));

    console.log('[MDX Page] Generated static params:', params);
    return params;
  } catch (error) {
    console.error('[MDX Page] Failed to generate static params:', error);
    return [];
  }
}