import { Container } from '@/components/layout/container';

export default function Loading() {
  return (
    <Container className="py-12">
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-muted animate-pulse rounded" />
        <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
        <div className="space-y-2 mt-8">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </Container>
  );
}
