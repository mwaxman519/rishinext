"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes, DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import type { MDXComponents } from 'mdx/types';

type ImagePropsType = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const components: MDXComponents = {
  h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-4xl font-bold mb-6 scroll-m-20", className)} {...props} />
  ),
  h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-3xl font-bold mb-4 scroll-m-20", className)} {...props} />
  ),
  h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-2xl font-bold mb-3 scroll-m-20", className)} {...props} />
  ),
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("mb-4 text-muted-foreground leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("list-disc list-inside mb-4 space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("list-decimal list-inside mb-4 space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("text-muted-foreground", className)} {...props} />
  ),
  img: (props: ImagePropsType) => {
    const { src, alt, className, width: _width, height: _height, ...rest } = props;

    if (!src) return null;

    // Convert relative paths to absolute paths if needed
    const imageSrc = typeof src === 'string' && src.startsWith('http') ? src : src;

    return (
      <div className="my-8">
        <Image
          src={imageSrc}
          alt={alt || ""}
          width={800}
          height={400}
          className={cn("rounded-lg border border-border", className)}
          unoptimized
          {...rest}
        />
        {alt && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </p>
        )}
      </div>
    );
  },
  pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre className={cn("mb-4 mt-2 overflow-x-auto rounded-lg bg-black py-4 px-4", className)} {...props} />
  ),
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)} {...props} />
  ),
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <div className="mdx-wrapper">{children}</div>
  )
};