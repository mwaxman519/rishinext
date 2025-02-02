'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { components } from './mdx-components';
import { MDXContent } from './mdx-content';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXRemoteProps {
  source: MDXRemoteSerializeResult;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; FallbackComponent: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; FallbackComponent: React.ComponentType<{ error: Error }> }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <this.props.FallbackComponent error={this.state.error} />;
    }
    return this.props.children;
  }
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