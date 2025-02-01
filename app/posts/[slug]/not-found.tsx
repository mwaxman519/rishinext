import { Container } from '@/components/layout/container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PostNotFound() {
  return (
    <Container className="py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The post you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/posts">
            Back to Posts
          </Link>
        </Button>
      </div>
    </Container>
  );
}
