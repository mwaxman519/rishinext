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

  try {
    const contentPath = path.join(process.cwd(), 'static', 'content', 'pages', `${slug}.mdx`);
    const source = await fs.readFile(contentPath, 'utf-8');
    const { content, data } = matter(source);

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
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(path.join(process.cwd(), 'static', 'content', 'pages'));
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace(/\.mdx$/, '')
      }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}