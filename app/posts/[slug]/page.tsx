import { Container } from '@/components/layout/container';
import { getStaticDataBySlug, getAllSlugs } from '@/lib/get-static-data';
import { MDXServer } from '@/components/mdx/mdx-server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-static';
export const revalidate = false;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Post({ params }: PageProps) {
  const post = await getStaticDataBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.description && (
            <p className="text-xl text-muted-foreground mb-4">
              {post.description}
            </p>
          )}
          {post.date && (
            <time dateTime={post.date} className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </header>
        <Suspense fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        }>
          {/* @ts-expect-error - Async Server Component */}
          <MDXServer source={post.content} />
        </Suspense>
      </article>
    </Container>
  );
}