"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoggerService } from "@/lib/services/logger-service";

export default function FeaturesPage() {
  const { toast } = useToast();

  const testError = async () => {
    try {
      const res = await fetch('/api/test-error');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'An error occurred while testing error handling');
      }
    } catch (error) {
      LoggerService.log('error', 'Test error triggered:', {
        message: error.message,
        type: 'test_error'
      });

      toast({
        title: "Error Test Successful",
        description: "The error was caught and handled properly",
        variant: "destructive",
      });

      throw error; // Re-throw to trigger error boundary
    }
  };

  return (
    <Container>
      <div className="py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Features</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>Application Features</h2>
            <p>
              Our application comes with a variety of features designed to enhance your experience.
            </p>

            <h3>Core Features</h3>
            <ul>
              <li>Next.js App Router for optimal routing</li>
              <li>Type-safe development with TypeScript</li>
              <li>Modern UI with Tailwind CSS</li>
              <li>Responsive design</li>
              <li>Comprehensive error handling and reporting</li>
            </ul>

            <div className="mt-8">
              <Button 
                variant="destructive" 
                onClick={testError}
              >
                Test Error Handling
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}