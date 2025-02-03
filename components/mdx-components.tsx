"use client";

import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code } from "@/components/ui/code";
import { cn } from "@/lib/utils";
import { MDXProvider } from '@mdx-js/react';

interface CalloutProps {
  type: 'default' | 'destructive' | 'info' | 'warning' | 'success';
  text: string;
}

const Callout = ({ type = 'default', text }: CalloutProps) => {
  return (
    <Alert variant={type}>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

const Pre = ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <pre className={cn(
      "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
      className
    )} {...props} />
  );
};

const CodeBlock = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  );
};

export const components = {
  Callout,
  pre: Pre,
  code: CodeBlock,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => 
    <h1 {...props} className={cn("scroll-m-20 text-4xl font-bold tracking-tight", props.className)} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => 
    <h2 {...props} className={cn("scroll-m-20 text-3xl font-semibold tracking-tight", props.className)} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => 
    <h3 {...props} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", props.className)} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => 
    <p {...props} className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => 
    <ul {...props} className={cn("my-6 ml-6 list-disc", props.className)} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => 
    <ol {...props} className={cn("my-6 ml-6 list-decimal", props.className)} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => 
    <li {...props} className={cn("mt-2", props.className)} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => 
    <blockquote {...props} className={cn("mt-6 border-l-2 pl-6 italic", props.className)} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => 
    <img {...props} className={cn("rounded-md border", props.className)} />,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => 
    <hr {...props} className={cn("my-4 md:my-8", props.className)} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => 
    <table {...props} className={cn("my-6 w-full overflow-y-auto", props.className)} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => 
    <tr {...props} className={cn("m-0 border-t p-0 even:bg-muted", props.className)} />,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => 
    <th {...props} className={cn("border px-4 py-2 text-left font-bold", props.className)} />,
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => 
    <td {...props} className={cn("border px-4 py-2 text-left", props.className)} />,
};

export function MDXComponentsProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default components;