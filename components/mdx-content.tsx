import { MDX } from '@next/mdx';
import { components } from './mdx-components';
import { cn } from "@/lib/utils";

interface MDXContentProps {
  source: string;
  className?: string;
}

export async function MDXContent({ source, className }: MDXContentProps) {
  return (
    <div className={cn(
      "prose dark:prose-invert max-w-none",
      "prose-headings:scroll-mt-8",
      "prose-a:underline prose-a:decoration-primary/50 hover:prose-a:decoration-primary",
      className
    )}>
      <MDX components={components}>{source}</MDX>
    </div>
  );
}