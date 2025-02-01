'use client';

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { LoggerService } from "@/lib/services/logger-service";

/**
 * Error Component
 * Used as the default error boundary for route segments
 * Must be a Client Component
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our logging service
    LoggerService.log('error', 'Route segment error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack
    });
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          {error.message || 'An unexpected error occurred'}
          {error.digest && (
            <span className="block mt-1 text-xs">Error ID: {error.digest}</span>
          )}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="default">
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}