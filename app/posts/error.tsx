'use client';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function PostsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Posts Error:', error);
  }, [error]);

  return (
    <Container size="lg" className="py-12">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">
          Failed to load blog posts. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </Container>
  );
}
