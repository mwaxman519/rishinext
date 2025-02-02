'use client';

import { cn } from "@/lib/utils";

interface MDXContentProps {
  compiledContent: React.ReactNode;
}

export function MDXContent({ compiledContent }: MDXContentProps) {
  return (
    <article className={cn(
      "prose dark:prose-invert max-w-none",
      // Typography
      "prose-headings:font-bold prose-headings:tracking-tight",
      "prose-h1:text-4xl prose-h1:mb-4",
      "prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4",
      "prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4",
      "prose-p:leading-7",
      // Elements
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-6 prose-blockquote:italic",
      "prose-ul:my-6 prose-ul:ml-6 prose-ul:list-disc",
      "prose-ol:my-6 prose-ol:ml-6 prose-ol:list-decimal",
      // Code blocks
      "prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border",
      "prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none",
      // Tables
      "prose-table:my-8",
      "prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-muted/50",
      "prose-td:border prose-td:border-border prose-td:p-2",
      // Images
      "prose-img:rounded-lg prose-img:border prose-img:border-border"
    )}>
      {compiledContent}
    </article>
  );
}