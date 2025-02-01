import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Page Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/">
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}