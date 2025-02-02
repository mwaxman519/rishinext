import { Container } from '@/components/layout/container';
import { getStaticDataBySlug, getAllSlugs } from '@/lib/get-static-data';
import { MDXContent } from '@/components/mdx/mdx-content';
import { notFound } from 'next/navigation';

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
      <article className="mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.date && (
          <p className="text-sm text-muted-foreground mb-8">
            {new Date(post.date).toLocaleDateString()}
          </p>
        )}
        {post.description && (
          <p className="text-xl text-muted-foreground mb-8">
            {post.description}
          </p>
        )}
        <MDXContent content={post.content} />
      </article>
    </Container>
  );
}