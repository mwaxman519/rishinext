"use client";

import { MDXProvider } from '@mdx-js/react';
import { components } from '../mdx-components';

interface MDXWrapperProps {
  children: React.ReactNode;
}

export function MDXWrapper({ children }: MDXWrapperProps) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
}
