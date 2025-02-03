'use client';

import { cn } from '@/lib/utils';
import type { MDXComponents } from 'mdx/types';
import React from 'react';
import { MDXImage } from './mdx-image';
import { Alert, AlertDescription } from "@/components/ui/alert";

// Callout component for MDX content
const Callout = ({ type, text }: { type: 'info' | 'warning' | 'success' | 'error', text: string }) => {
  return (
    <Alert variant={type}>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

export const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 
      className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)} 
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2 
      className={cn("mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3 
      className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-6 ml-6 list-disc", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-6 ml-6 list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn("mt-2", className)}
      {...props}
    />
  ),
  img: MDXImage,
  pre: ({ className, ...props }) => (
    <pre
      className={cn("mb-4 mt-6 overflow-x-auto rounded-lg bg-black py-4", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)}
      {...props}
    />
  ),
  Callout,
};