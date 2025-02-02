'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ImageProps } from 'next/image';

type MDXImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  alt: string;
};

export function MDXImage({ src, alt, className, ...props }: MDXImageProps) {
  // Handle relative paths
  const imageSrc = src.startsWith('http') || src.startsWith('/') ? src : `/${src}`;

  return (
    <div className="my-8">
      <Image
        src={imageSrc}
        alt={alt}
        width={800}
        height={400}
        className={cn("rounded-lg border border-border", className)}
        {...props}
      />
      {alt && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {alt}
        </p>
      )}
    </div>
  );
}
