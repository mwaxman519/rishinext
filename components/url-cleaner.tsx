'use client';

import { PropsWithChildren, useEffect } from "react";

/**
 * URLCleaner component handles cleanup of URL parameters that are not needed
 * after page loads, improving URL cleanliness for static exports.
 * 
 * Features:
 * - Removes unwanted URL parameters while preserving specified ones
 * - Client-side only execution to maintain static export compatibility
 * - Maintains clean URLs for better SEO and sharing
 * - Preserves specific parameters through allowedParams configuration
 * 
 * @param children - React children components to be rendered
 * @returns JSX element containing children
 */
export function URLCleaner({ children }: PropsWithChildren) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    let hasUnwantedParams = false;

    // Get all parameters
    const params = Array.from(url.searchParams.keys());

    // Parameters that should be preserved
    const allowedParams: string[] = [];

    params.forEach(param => {
      if (!allowedParams.includes(param)) {
        url.searchParams.delete(param);
        hasUnwantedParams = true;
      }
    });

    // Only update history if we removed parameters
    if (hasUnwantedParams) {
      const cleanPath = url.pathname + (url.search !== '?' ? url.search : '');
      window.history.replaceState({}, '', cleanPath);
    }
  }, []);

  // Return children wrapped in a fragment to ensure valid JSX element
  return <>{children}</>;
}