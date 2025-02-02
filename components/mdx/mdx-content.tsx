'use client';

import { cn } from "@/lib/utils";

interface MDXContentProps {
  children: React.ReactNode;
}

export function MDXContent({ children }: MDXContentProps) {
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