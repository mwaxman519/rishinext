'use client';

import { MDXRemote } from 'next-mdx-remote';
import { components } from './mdx-components';
import { MDXContent } from './mdx-content';

interface MDXRemoteProps {
  source: any;
}

export function MDXClientRenderer({ source }: MDXRemoteProps) {
  return (
    <MDXContent>
      <MDXRemote {...source} components={components} />
    </MDXContent>
  );
}
