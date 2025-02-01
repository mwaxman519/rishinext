"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { routes } from "@/lib/routes";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleTestClick = async () => {
    setIsLoading(true);
    // Simple client-side interaction without API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="hero-section bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
          <div className="marketing-container">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Modern Web Application
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                A cutting-edge Next.js application with static export capabilities.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button
                  size="lg"
                  disabled={isLoading}
                  onClick={handleTestClick}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  {isLoading ? "Testing..." : "Test Micro-interactions"}
                </Button>
                <Link
                  href={routes.docs}
                  className="transform hover:-translate-y-1 transition-all duration-200 inline-flex items-center px-6 py-3 text-base font-semibold rounded-full text-gray-200 bg-gray-800/60 hover:bg-gray-800/80 backdrop-blur-sm border border-gray-700 shadow-lg"
                >
                  Documentation
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="marketing-container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="feature-grid">
              {/* Static Export Feature */}
              <div className="card-hover p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-3">Static Export</h3>
                <p className="text-muted-foreground">
                  Optimized static site generation for maximum performance and reliability.
                </p>
              </div>

              {/* Modern Stack */}
              <div className="card-hover p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-3">Modern Stack</h3>
                <p className="text-muted-foreground">
                  Built with Next.js 15.1.6, React 19, and TypeScript for optimal performance.
                </p>
              </div>

              {/* Client-side Features */}
              <div className="card-hover p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-3">Client Features</h3>
                <p className="text-muted-foreground">
                  Rich client-side interactions and animations without server dependencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="marketing-container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our documentation to learn more about the features and capabilities.
            </p>
            <Link
              href={routes.docs}
              className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View Documentation
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}