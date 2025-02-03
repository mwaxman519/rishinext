import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDX } from '@next/mdx';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  console.log(`[MDX Debug] Attempting to render page for slug: ${slug}`);

  try {
    const contentPaths = [
      path.join(process.cwd(), 'content', 'pages', `${slug}.mdx`),
      path.join(process.cwd(), 'static', 'content', 'pages', `${slug}.mdx`)
    ];

    let source: string | null = null;

    for (const contentPath of contentPaths) {
      try {
        source = await fs.readFile(contentPath, 'utf-8');
        console.log(`[MDX Debug] Successfully loaded content from: ${contentPath}`);
        break;
      } catch (error) {
        console.log(`[MDX Debug] Could not load content from: ${contentPath}`);
        continue;
      }
    }

    if (!source) {
      console.error(`[MDX Debug] No MDX file found for slug: ${slug}`);
      notFound();
      return null;
    }

    const { content, data } = matter(source);

    return (
      <div className="container mx-auto py-10">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{data.title}</h1>
          {data.description && (
            <p className="text-xl text-muted-foreground">{data.description}</p>
          )}
          <MDX>{content}</MDX>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`[MDX Debug] Failed to render content for slug: ${slug}`, error);
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
      console.log(`[MDX Debug] Found MDX files in ${contentPath}:`, mdxFiles);
    } catch (error) {
      console.warn(`[MDX Debug] Could not read directory ${contentPath}`, error);
      continue;
    }
  }

  return Array.from(allFiles).map(file => ({
    slug: file.replace(/\.mdx$/, '')
  }));
}