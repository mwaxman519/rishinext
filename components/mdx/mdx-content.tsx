'use client';

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface MDXContentProps {
  children: React.ReactNode;
}

export function MDXContent({ children }: MDXContentProps) {
  // Add debug logging for component lifecycle
  useEffect(() => {
    console.log('[MDX Content Debug] Component mounted:', {
      hasChildren: !!children,
      type: typeof children,
      childrenKeys: children ? Object.keys(children as object) : []
    });
  }, [children]);

  if (!children) {
    console.warn('[MDX Content Debug] No content provided to MDXContent');
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
      "prose-img:rounded-lg prose-img:border prose-img:border-border",
      // Add support for GitHub-flavored markdown tables
      "prose-table:border prose-table:border-border",
      "prose-th:border prose-th:border-border prose-th:p-2",
      "prose-td:border prose-td:border-border prose-td:p-2",
      // Add debug outline in development
      process.env.NODE_ENV === 'development' ? 'debug-screens' : ''
    )}>
      {children}
    </article>
  );
}