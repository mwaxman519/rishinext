'use client';

import { Button } from "@/components/ui/button";

interface ErrorComponentProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">
            {error.message || 'An error occurred'}
          </h2>
          {error.digest && (
            <p className="text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
          {reset && (
            <Button
              onClick={reset}
              variant="default"
            >
              Try again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}