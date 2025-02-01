import { Container } from '@/components/layout/container';
import { getStaticDataBySlug, getAllSlugs } from '@/lib/get-static-data';
import { MDXContent } from '@/components/mdx/mdx-components';
import { notFound } from 'next/navigation';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

// Generate all possible paths at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Get data for a specific post
async function getData(slug: string) {
  try {
    const post = await getStaticDataBySlug(slug);
    if (!post) {
      return null;
    }
    return { post };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  if (!data) {
    notFound();
  }

  const { post } = data;

  return (
    <Container className="py-12">
      <article className="prose dark:prose-invert mx-auto">
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