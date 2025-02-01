'use client';

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { LoggerService } from "@/lib/services/logger-service";

/**
 * Global Error Component
 * Used as a root error boundary for the entire application
 * Must be a Client Component
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our logging service
    LoggerService.log('error', 'Global application error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      type: 'global_error'
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-4">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Something went wrong!
            </h1>
            <p className="text-sm text-muted-foreground">
              {error.message || "A critical error occurred"}
              {error.digest && (
                <span className="block mt-1 text-xs">Error ID: {error.digest}</span>
              )}
            </p>
            <div className="pt-4">
              <Button
                onClick={reset}
                variant="outline"
                className="min-w-[120px]"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}