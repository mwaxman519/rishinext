import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { LoggerService } from './logger-service';

/**
 * Interface for cleanup operation results
 * Provides structured feedback about cleanup operations
 */
interface CleanupResult {
  success: boolean;
  message: string;
  details?: string[];
}

/**
 * Interface for defining cleanup tasks
 * Allows for flexible task definition with priority levels
 */
interface CleanupTask {
  name: string;
  action: () => void;
  required: boolean;
}

/**
 * CleanupService manages post-build cleanup operations
 * Handles removal of temporary files and build artifacts
 * Provides detailed logging and error handling for cleanup operations
 */
export class CleanupService {
  /** Defined cleanup tasks with their requirements and actions */
  private static readonly CLEANUP_TASKS: CleanupTask[] = [
    {
      name: 'Build output directory',
      action: () => {
        if (existsSync('out')) {
          execSync('rm -rf out/', { stdio: 'inherit' });
        }
      },
      required: true
    },
    {
      name: 'Next.js cache',
      action: () => {
        if (existsSync('.next')) {
          execSync('rm -rf .next/', { stdio: 'inherit' });
        }
      },
      required: true
    },
    {
      name: 'Temporary files',
      action: () => {
        const tempFiles = ['.temp-build', '.export-temp'];
        tempFiles.forEach(file => {
          if (existsSync(file)) {
            execSync(`rm -rf ${file}`, { stdio: 'inherit' });
          }
        });
      },
      required: false
    }
  ];

  /**
   * Handles post-build cleanup operations with enhanced error handling
   * Executes cleanup tasks based on their priority and requirements
   * 
   * @param branch - Branch name for context in logs
   * @returns CleanupResult with operation status and details
   */
  static async cleanupBuild(branch: string): Promise<CleanupResult> {
    LoggerService.log('info', `Starting cleanup for ${branch} branch build...`);
    const failures: string[] = [];

    try {
      // Execute cleanup tasks
      for (const task of this.CLEANUP_TASKS) {
        try {
          LoggerService.log('info', `Executing cleanup task: ${task.name}`);
          task.action();
        } catch (error) {
          const errorMessage = `Failed to cleanup ${task.name}: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`;
          LoggerService.log('error', errorMessage);

          if (task.required) {
            failures.push(errorMessage);
          } else {
            LoggerService.log('warn', `Non-critical cleanup task failed: ${task.name}`);
          }
        }
      }

      // Handle critical failures
      if (failures.length > 0) {
        const message = 'Critical cleanup tasks failed';
        LoggerService.log('error', message, { failures });
        return {
          success: false,
          message,
          details: failures
        };
      }

      LoggerService.log('info', 'Cleanup completed successfully');
      return {
        success: true,
        message: 'Cleanup completed successfully'
      };
    } catch (error) {
      const errorMessage = `Cleanup error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`;
      LoggerService.log('error', errorMessage);
      return {
        success: false,
        message: errorMessage,
        details: [...failures, errorMessage]
      };
    }
  }

  /**
   * Retrieves cleanup operation logs
   * @returns Array of formatted log entries
   */
  static getCleanupLogs(): string[] {
    return LoggerService.getLogsByLevel('info')
      .concat(LoggerService.getLogsByLevel('error'))
      .map(entry => `[${entry.timestamp}] ${entry.message}`);
  }
}