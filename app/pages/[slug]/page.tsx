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
  console.log(`Attempting to render page for slug: ${slug}`);

  try {
    // Try both content paths
    const contentPaths = [
      path.join(process.cwd(), 'content', 'pages', `${slug}.mdx`),
      path.join(process.cwd(), 'static', 'content', 'pages', `${slug}.mdx`)
    ];

    let source: string | null = null;
    let usedPath: string | null = null;

    for (const contentPath of contentPaths) {
      try {
        source = await fs.readFile(contentPath, 'utf-8');
        usedPath = contentPath;
        console.log(`Successfully loaded content from: ${contentPath}`);
        break;
      } catch (error) {
        console.log(`Could not load content from: ${contentPath}`, error);
        continue;
      }
    }

    if (!source) {
      console.error(`No MDX file found for slug: ${slug}`);
      return notFound();
    }

    const { content, data } = matter(source);
    console.log(`Parsed frontmatter data:`, data);

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
    console.error(`Failed to load MDX content for slug: ${slug}`, error);
    return notFound();
  }
}

export async function generateStaticParams() {
  const contentPaths = [
    path.join(process.cwd(), 'content', 'pages'),
    path.join(process.cwd(), 'static', 'content', 'pages')
  ];

  try {
    const allFiles = new Set<string>();

    for (const contentPath of contentPaths) {
      try {
        const files = await fs.readdir(contentPath);
        files
          .filter(file => file.endsWith('.mdx'))
          .forEach(file => allFiles.add(file));
        console.log(`Found MDX files in ${contentPath}:`, files);
      } catch (error) {
        console.warn(`Warning: Could not read directory ${contentPath}`, error);
        continue;
      }
    }

    const params = Array.from(allFiles).map(file => ({
      slug: file.replace(/\.mdx$/, '')
    }));

    console.log('Generated static params:', params);
    return params;
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}