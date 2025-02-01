import { Container } from '@/components/layout/container';

export default function PostsLoading() {
  return (
    <Container size="lg" className="py-12">
      <div className="space-y-8">
        <div className="h-10 bg-muted rounded w-1/3 animate-pulse"></div>
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
      </div>
    </Container>
  );
}
