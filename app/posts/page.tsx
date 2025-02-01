import { Container } from '@/components/layout/container';
import { getStaticData } from '@/lib/get-static-data';
import { Suspense } from 'react';

export const dynamic = 'force-static';

async function getData() {
  const posts = await getStaticData();
  return { posts };
}

function PostsLoading() {
  return (
    <div className="grid gap-8">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="p-6 bg-card rounded-lg border border-border animate-pulse"
        >
          <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default async function Posts() {
  const { posts } = await getData();

  return (
    <Container size="lg" className="py-12">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <Suspense fallback={<PostsLoading />}>
          {posts.length > 0 ? (
            <div className="grid gap-8">
              {posts.map((post) => (
                <article 
                  key={post.slug}
                  className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {post.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No posts available.</p>
          )}
        </Suspense>
      </div>
    </Container>
  );
}