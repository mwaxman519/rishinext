'use client';

import { useEffect } from 'react';
import { Container } from '@/components/layout/container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('MDX error:', error);
  }, [error]);

  return (
    <Container className="py-12">
      <div className="rounded-lg border border-destructive/50 p-6 bg-destructive/10">
        <h2 className="text-2xl font-bold mb-4">Error Loading Content</h2>
        <p className="text-muted-foreground mb-4">
          There was a problem loading this content. This could be due to a temporary issue or a problem with the content itself.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          Try Again
        </button>
      </div>
    </Container>
  );
}
