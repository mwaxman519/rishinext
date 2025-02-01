import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

interface AutoCommitOptions {
  interval?: number;
  enabled?: boolean;
  onError?: (error: Error) => void;
}

interface CommitResponse {
  status: 'success' | 'error';
  message: string;
  timestamp?: string;
  changes?: string[];
  error?: string;
}

async function commitChanges(message?: string): Promise<CommitResponse> {
  const response = await fetch('/api/git', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to commit changes');
  }

  return response.json();
}

export function useAutoCommit({
  interval = 10000, // 10 seconds default
  enabled = true,
  onError,
}: AutoCommitOptions = {}) {
  const timerRef = useRef<NodeJS.Timer>();
  
  // Use React Query for managing commit state and caching
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: commitChanges,
    onError: (error: Error) => {
      console.error('Auto-commit failed:', error);
      onError?.(error);
    },
  });

  const startAutoCommit = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (enabled) {
      timerRef.current = setInterval(() => {
        mutate('Auto-commit: Periodic save');
      }, interval);
    }
  }, [enabled, interval, mutate]);

  // Manual commit function
  const commit = useCallback((message?: string) => {
    mutate(message);
  }, [mutate]);

  useEffect(() => {
    startAutoCommit();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startAutoCommit]);

  return {
    commit,
    isLoading,
    isError,
    error,
    lastCommit: data,
    startAutoCommit,
    stopAutoCommit: useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    }, []),
  };
}
