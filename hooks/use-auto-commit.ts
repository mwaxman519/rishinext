import { useCallback, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface AutoSaveOptions {
  key?: string; // localStorage key
  interval?: number; // in milliseconds
  enabled?: boolean;
  data: any; // data to save
  onError?: (error: Error) => void;
}

const DEFAULT_KEY = 'auto_save_content';
const DEFAULT_INTERVAL = 10000; // 10 seconds

export function useAutoSave({
  key = DEFAULT_KEY,
  interval = DEFAULT_INTERVAL,
  enabled = true,
  data,
  onError,
}: AutoSaveOptions) {
  const timerRef = useRef<NodeJS.Timer>();
  const lastSaveRef = useRef<string>('');

  // Save to localStorage
  const saveToStorage = useCallback(() => {
    try {
      const serializedData = JSON.stringify(data);

      // Only save if data has changed
      if (serializedData !== lastSaveRef.current) {
        localStorage.setItem(key, serializedData);
        lastSaveRef.current = serializedData;

        // Show success toast
        toast({
          title: "Changes saved",
          description: "Your changes have been saved locally",
        });
      }
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to save'));

      toast({
        title: "Save failed",
        description: "Failed to save your changes",
        variant: "destructive",
      });
    }
  }, [data, key, onError]);

  // Start auto-save timer
  const startAutoSave = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (enabled) {
      // Initial save
      saveToStorage();

      // Set up interval
      timerRef.current = setInterval(() => {
        saveToStorage();
      }, interval);
    }
  }, [enabled, interval, saveToStorage]);

  // Manual save function
  const save = useCallback(() => {
    saveToStorage();
  }, [saveToStorage]);

  // Load data from localStorage
  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to load'));
    }
    return null;
  }, [key, onError]);

  // Setup auto-save on mount
  useEffect(() => {
    startAutoSave();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startAutoSave]);

  return {
    save, // Manual save function
    load: loadFromStorage, // Manual load function
    startAutoSave,
    stopAutoSave: useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    }, []),
  };
}