'use client';

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface MDXContentProps {
  children: React.ReactNode;
}

export function MDXContent({ children }: MDXContentProps) {
  // Log when content is rendered
  useEffect(() => {
    console.log('MDX Content mounted with children:', !!children);
  }, [children]);

  if (!children) {
    return (
      <div className="p-4 rounded-lg border border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10">
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Warning: No content provided to MDXContent component
        </p>
      </div>
    );
  }

  return (
    <article className={cn(
      "prose dark:prose-invert max-w-none",
      "prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight",
      "prose-p:leading-7",
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5",
      "prose-pre:bg-black prose-pre:rounded-lg prose-pre:p-4",
      "prose-img:rounded-lg prose-img:border prose-img:border-border"
    )}>
      {children}
    </article>
  );
}