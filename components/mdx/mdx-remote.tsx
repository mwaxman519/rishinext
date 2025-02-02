'use client';

import { MDXRemote } from 'next-mdx-remote';
import { components } from './mdx-components';
import { MDXContent } from './mdx-content';
import { ErrorBoundary } from 'react';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXRemoteProps {
  source: MDXRemoteSerializeResult;
}

function MDXErrorFallback({ error }: { error: Error }) {
  return (
    <div className="rounded-lg border border-destructive/50 p-4 bg-destructive/10">
      <h3 className="text-lg font-semibold mb-2">Error Rendering Content</h3>
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  );
}

export function MDXClientRenderer({ source }: MDXRemoteProps) {
  return (
    <ErrorBoundary FallbackComponent={MDXErrorFallback}>
      <MDXContent>
        <MDXRemote {...source} components={components} />
      </MDXContent>
    </ErrorBoundary>
  );
}