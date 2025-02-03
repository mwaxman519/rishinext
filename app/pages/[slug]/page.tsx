import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXServer } from '@/components/mdx/mdx-server';
import { MDXWrapper } from '@/components/mdx/mdx-wrapper';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  try {
    const contentPaths = [
      path.join(process.cwd(), 'content', 'pages', `${slug}.mdx`),
      path.join(process.cwd(), 'static', 'content', 'pages', `${slug}.mdx`)
    ];

    let source: string | null = null;

    for (const contentPath of contentPaths) {
      try {
        source = await fs.readFile(contentPath, 'utf-8');
        break;
      } catch (error) {
        continue;
      }
    }

    if (!source) {
      notFound();
      return null;
    }

    const { data } = matter(source);

    return (
      <MDXWrapper>
        <div className="container mx-auto py-10">
          <div className="prose dark:prose-invert max-w-none">
            <h1>{data.title}</h1>
            {data.description && (
              <p className="text-xl text-muted-foreground">{data.description}</p>
            )}
            <MDXServer source={source} />
          </div>
        </div>
      </MDXWrapper>
    );
  } catch (error) {
    console.error(`Failed to render content for slug: ${slug}`, error);
    notFound();
    return null;
  }
}

export async function generateStaticParams() {
  const contentPaths = [
    path.join(process.cwd(), 'content', 'pages'),
    path.join(process.cwd(), 'static', 'content', 'pages')
  ];

  const allFiles = new Set<string>();

  for (const contentPath of contentPaths) {
    try {
      const files = await fs.readdir(contentPath);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      mdxFiles.forEach(file => allFiles.add(file));
    } catch (error) {
      continue;
    }
  }

  return Array.from(allFiles).map(file => ({
    slug: file.replace(/\.mdx$/, '')
  }));
}