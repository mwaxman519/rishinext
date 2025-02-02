'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';
import React, { forwardRef } from 'react';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type MdxImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const MdxImage = forwardRef<HTMLImageElement, MdxImageProps>((props, ref) => {
  const { src, alt = "", className, width: rawWidth = 800, height: rawHeight = 400, ...rest } = props;

  if (!src) return null;

  // Ensure width and height are numbers
  const width = typeof rawWidth === 'string' ? parseInt(rawWidth, 10) : rawWidth;
  const height = typeof rawHeight === 'string' ? parseInt(rawHeight, 10) : rawHeight;

  // Handle relative paths
  const imageSrc = src.startsWith('http') || src.startsWith('/') ? src : `/${src}`;

  return (
    <div className="my-8">
      <Image
        {...rest}
        ref={ref}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn("rounded-lg border border-border", className)}
        unoptimized
        priority
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

type MDXHeadingProps = {
  className?: string;
  children?: React.ReactNode;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

type MDXTextProps = {
  className?: string;
  children?: React.ReactNode;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export const components = {
  h1: ({ className, ...props }: MDXHeadingProps) => (
    <h1 className={cn("text-4xl font-bold mb-6 scroll-m-20", className)} {...props} />
  ),
  h2: ({ className, ...props }: MDXHeadingProps) => (
    <h2 className={cn("text-3xl font-bold mb-4 scroll-m-20", className)} {...props} />
  ),
  h3: ({ className, ...props }: MDXHeadingProps) => (
    <h3 className={cn("text-2xl font-bold mb-3 scroll-m-20", className)} {...props} />
  ),
  p: ({ className, ...props }: MDXTextProps) => (
    <p className={cn("mb-4 text-muted-foreground leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }: MDXTextProps) => (
    <ul className={cn("list-disc list-inside mb-4 space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: MDXTextProps) => (
    <ol className={cn("list-decimal list-inside mb-4 space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }: MDXTextProps) => (
    <li className={cn("text-muted-foreground", className)} {...props} />
  ),
  img: ((props: MdxImageProps) => <MdxImage {...props} />) as MDXComponents['img'],
  pre: ({ className, ...props }: { className?: string }) => (
    <pre className={cn("mb-4 mt-2 overflow-x-auto rounded-lg bg-black py-4 px-4", className)} {...props} />
  ),
  code: ({ className, ...props }: { className?: string }) => (
    <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)} {...props} />
  ),
  wrapper: ({ children }) => (
    <article className="mdx-wrapper prose dark:prose-invert max-w-none">
      {children}
    </article>
  ),
} satisfies MDXComponents;

export { MdxImage };