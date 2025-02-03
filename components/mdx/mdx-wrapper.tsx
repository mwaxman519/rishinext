"use client";

import { MDXProvider } from '@mdx-js/react';
import { components } from './mdx-components';
import { type ReactNode } from 'react';

interface MDXWrapperProps {
  children: ReactNode;
}

export function MDXWrapper({ children }: MDXWrapperProps) {
  if (!children) return null;

  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
}