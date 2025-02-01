"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  const testError = async () => {
    const res = await fetch('/api/test-error');
    if (!res.ok) {
      throw new Error('Failed to fetch');
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