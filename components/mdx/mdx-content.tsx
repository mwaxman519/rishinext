'use client';

import { cn } from "@/lib/utils";

interface MDXContentProps {
  compiledContent: React.ReactNode;
}

export function MDXContent({ compiledContent }: MDXContentProps) {
  return (
    <article className={cn(
      "prose dark:prose-invert max-w-none",
      "prose-headings:scroll-mt-20",
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-img:rounded-lg prose-img:border prose-img:border-border",
      "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
      "prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md",
      "prose-blockquote:border-l-4 prose-blockquote:border-primary",
      "prose-table:border prose-table:border-border",
      "prose-th:border prose-th:border-border prose-th:p-2",
      "prose-td:border prose-td:border-border prose-td:p-2"
    )}>
      {compiledContent}
    </article>
  );
}