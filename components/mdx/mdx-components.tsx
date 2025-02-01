import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from '@mdx-js/react';
import { cn } from '@/lib/utils';

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="text-muted-foreground">{children}</li>
  ),
  pre: ({ children, className, ...props }) => (
    <pre className={cn(
      "mb-4 mt-2 overflow-x-auto rounded-lg bg-black py-4",
      className
    )} {...props}>
      {children}
    </pre>
  ),
  code: ({ children, className }) => (
    <code className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
      className
    )}>
      {children}
    </code>
  ),
  Callout: ({ children, type = 'info' }) => (
    <div className={cn(
      "my-6 flex items-start rounded-lg border border-l-4 p-4",
      {
        'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20': type === 'info',
        'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20': type === 'warning',
        'border-l-red-500 bg-red-50 dark:bg-red-950/20': type === 'error',
      }
    )}>
      {children}
    </div>
  ),
};

export function useMDXComponents() {
  return components;
}

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}