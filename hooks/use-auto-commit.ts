import { useCallback, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { GitHubAutoCommitService } from '@/lib/services/github-auto-commit';

interface AutoSaveOptions {
  key?: string;
  interval?: number;
  enabled?: boolean;
  data: any;
  onError?: (error: Error) => void;
  maxRetries?: number;
}

const DEFAULT_KEY = 'auto_save_content';
const DEFAULT_INTERVAL = 10000; // 10 seconds
const DEFAULT_MAX_RETRIES = 3;

export function useAutoSave({
  key = DEFAULT_KEY,
  interval = DEFAULT_INTERVAL,
  enabled = true,
  data,
  onError,
  maxRetries = DEFAULT_MAX_RETRIES,
}: AutoSaveOptions) {
  const timerRef = useRef<NodeJS.Timer>();
  const lastSaveRef = useRef<string>();
  const lastSyncRef = useRef<string>();
  const retryCountRef = useRef<number>(0);

  // Initialize GitHub service
  useEffect(() => {
    console.log('[AutoSave] Initializing GitHubAutoCommitService...');
    GitHubAutoCommitService.initialize();

    // Notify user about GitHub sync status
    if (!GitHubAutoCommitService.isEnabled()) {
      toast({
        title: "GitHub Sync Disabled",
        description: "Changes will be saved locally only. Add a GitHub token to enable sync.",
      });
    }

    return () => {
      console.log('[AutoSave] Cleaning up GitHubAutoCommitService...');
      GitHubAutoCommitService.stopAutoCommit();
    };
  }, []);

  // Save to localStorage and sync to GitHub if enabled
  const saveAndSync = useCallback(async () => {
    try {
      console.log('[AutoSave] Attempting to save and sync...');
      const serializedData = JSON.stringify(data);

      // Only save if data has changed
      if (serializedData !== lastSaveRef.current) {
        console.log('[AutoSave] Changes detected, saving to localStorage...');
        localStorage.setItem(key, serializedData);
        lastSaveRef.current = serializedData;

        console.log('[AutoSave] Changes saved to localStorage');
        toast({
          title: "Changes saved",
          description: "Your changes have been saved locally",
        });

        // Only attempt GitHub sync if the service is enabled
        if (GitHubAutoCommitService.isEnabled()) {
          const now = Date.now();
          if (!lastSyncRef.current || now - parseInt(lastSyncRef.current) >= interval) {
            console.log('[AutoSave] Starting GitHub sync attempt...');
            try {
              const result = await GitHubAutoCommitService.commitAndPush('Auto-save: Update content');
              if (result) {
                lastSyncRef.current = now.toString();
                retryCountRef.current = 0; // Reset retry count on success

                console.log('[AutoSave] GitHub sync successful');
                toast({
                  title: "Changes synced",
                  description: "Your changes have been synced to GitHub",
                });
              }
            } catch (error) {
              console.error('[AutoSave] GitHub sync failed:', error);

              // Implement retry logic
              if (retryCountRef.current < maxRetries) {
                retryCountRef.current++;
                console.log(`[AutoSave] Retry attempt ${retryCountRef.current}/${maxRetries}`);

                // Exponential backoff for retries
                const retryDelay = Math.min(1000 * Math.pow(2, retryCountRef.current), 30000);
                setTimeout(() => saveAndSync(), retryDelay);

                toast({
                  title: "Sync retry",
                  description: `Retrying to sync changes (Attempt ${retryCountRef.current}/${maxRetries})`,
                });
              } else {
                toast({
                  title: "Sync failed",
                  description: "Failed to sync changes after multiple attempts. Your changes are saved locally.",
                  variant: "destructive",
                });
              }
            }
          } else {
            console.log('[AutoSave] Skipping GitHub sync - too soon since last sync');
          }
        }
      } else {
        console.log('[AutoSave] No changes detected, skipping save and sync');
      }
    } catch (error) {
      console.error('[AutoSave] Error in save and sync:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to save or sync'));

      toast({
        title: "Save failed",
        description: "Failed to save your changes",
        variant: "destructive",
      });
    }
  }, [data, key, interval, onError, maxRetries]);

  // Start auto-save timer
  const startAutoSave = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (enabled) {
      console.log('[AutoSave] Starting auto-save with interval:', interval);
      // Initial save
      saveAndSync();

      // Set up interval
      timerRef.current = setInterval(() => {
        saveAndSync();
      }, interval);
    }
  }, [enabled, interval, saveAndSync]);

  // Setup auto-save on mount
  useEffect(() => {
    console.log('[AutoSave] Setting up auto-save...');
    startAutoSave();
    return () => {
      if (timerRef.current) {
        console.log('[AutoSave] Cleaning up auto-save timer...');
        clearInterval(timerRef.current);
      }
    };
  }, [startAutoSave]);

  return {
    save: saveAndSync,
    load: useCallback(() => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (error) {
        console.error('[AutoSave] Failed to load from localStorage:', error);
        onError?.(error instanceof Error ? error : new Error('Failed to load'));
      }
      return null;
    }, [key, onError]),
    startAutoSave,
    stopAutoSave: useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    }, []),
  };
}