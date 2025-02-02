import { cn } from "@/lib/utils";

interface MDXContentProps {
  content: React.ReactNode;
  className?: string;
}

export function MDXContent({ content, className }: MDXContentProps) {
  return (
    <div className={cn(
      "prose dark:prose-invert max-w-none",
      "prose-headings:scroll-mt-8",
      "prose-a:underline prose-a:decoration-primary/50 hover:prose-a:decoration-primary",
      className
    )}>
      {content}
    </div>
  );
}
