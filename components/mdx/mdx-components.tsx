"use client";

import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 scroll-m-20">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold mb-4 scroll-m-20">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold mb-3 scroll-m-20">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-muted-foreground leading-7">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-muted-foreground">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  pre: ({ children, className }) => (
    <pre className={cn(
      "mb-4 mt-2 overflow-x-auto rounded-lg bg-black py-4 px-4",
      className
    )}>
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
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  img: (props: ImageProps) => {
    if (!props.src) {
      return null;
    }

    const imgProps: NextImageProps = {
      src: props.src,
      alt: props.alt || 'Article image',
      width: 800,
      height: 400,
      className: cn("w-full h-auto", props.className)
    };

    return (
      <figure className="my-8">
        <div className="overflow-hidden rounded-lg border border-border">
          <Image {...imgProps} alt={props.alt || 'Article image'} />
        </div>
        {props.alt && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {props.alt}
          </figcaption>
        )}
      </figure>
    );
  },
  table: ({ children }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-2">
      {children}
    </td>
  ),
};