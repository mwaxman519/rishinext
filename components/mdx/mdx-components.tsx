"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';
import React, { forwardRef } from 'react';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import type { ImageProps } from 'next/image';

type MdxImageProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, keyof ImageProps | 'ref'> & {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const MdxImage = forwardRef<HTMLImageElement, MdxImageProps>(({
  src,
  alt = "",
  className,
  width = 800,
  height = 400,
  ...props
}, ref) => {
  if (!src || typeof src !== 'string') return null;

  // Handle relative paths
  const imageSrc = src.startsWith('http') || src.startsWith('/') ? src : `/${src}`;

  return (
    <div className="my-8">
      <Image
        ref={ref}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn("rounded-lg border border-border", className)}
        unoptimized
        priority
        {...props}
      />
      {alt && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {alt}
        </p>
      )}
    </div>
  );
});

MdxImage.displayName = 'MdxImage';

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("text-4xl font-bold mb-6 scroll-m-20", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("text-3xl font-bold mb-4 scroll-m-20", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("text-2xl font-bold mb-3 scroll-m-20", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mb-4 text-muted-foreground leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("list-disc list-inside mb-4 space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("list-decimal list-inside mb-4 space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("text-muted-foreground", className)} {...props} />
  ),
  img: MdxImage as unknown as MDXComponents['img'],
  pre: ({ className, ...props }) => (
    <pre className={cn("mb-4 mt-2 overflow-x-auto rounded-lg bg-black py-4 px-4", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)} {...props} />
  ),
  wrapper: ({ children }) => (
    <article className="mdx-wrapper prose dark:prose-invert max-w-none">
      {children}
    </article>
  ),
};

export { components, MdxImage };