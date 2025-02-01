'use client';

import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component that provides:
 * - Loading states with spinner
 * - Error handling with fallback UI
 * - Blur-up loading effect
 * - Static export compatibility
 * - Proper image optimization
 * 
 * @param src - Image source URL
 * @param alt - Alt text for accessibility
 * @param width - Image width
 * @param height - Image height
 * @param className - Additional CSS classes
 * @param priority - Whether to prioritize loading
 * @param props - Additional Image props
 */
interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Show error state if image fails to load
  if (error) {
    return (
      <div 
        className={cn('relative flex items-center justify-center bg-muted', className)} 
        style={{ width, height }}
      >
        <p className="text-sm text-muted-foreground">Failed to load image</p>
      </div>
    );
  }

  return (
    <div 
      className={cn('relative overflow-hidden bg-muted', className)} 
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
        )}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        style={{ objectFit: 'cover' }}
        {...props}
      />
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}