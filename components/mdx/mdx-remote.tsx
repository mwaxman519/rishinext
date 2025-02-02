'use client';

import React from 'react';
import { MDXContent } from './mdx-content';

interface MDXRemoteProps {
  children: React.ReactNode;
}

export function MDXClientRenderer({ children }: MDXRemoteProps) {
  if (!children) {
    return null;
  }

  return (
    <MDXContent>
      {children}
    </MDXContent>
  );
}