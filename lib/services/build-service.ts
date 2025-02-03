import { execSync } from 'child_process';
import { GitHubService } from './github-service';
import { existsSync, readdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import { CleanupService } from './cleanup-service';
import { NotificationService } from './notification-service';

/**
 * Interface defining the structure of build operation results
 */
interface BuildResult {
  success: boolean;
  message: string;
  timestamp?: string;
  details?: string;
  branch?: string;
}

/**
 * Configuration type for different build processes
 */
type BuildConfig = {
  command: string;
  outputDir: string;
  requiredFiles: string[];
  preserveFiles?: string[];
};

type BranchType = 'main' | 'staging' | 'static';

/**
 * BuildService handles all build-related operations
 * for different deployment branches
 */
export class BuildService {
  private static lastBuildTimestamp: string | null = null;

  private static readonly BRANCHES = {
    MAIN: 'main' as const,         // Production branch
    STATIC: 'static' as const,     // Static content branch
    STAGING: 'staging' as const    // Development branch
  };

  private static readonly BUILD_CONFIGS: Record<BranchType, BuildConfig> = {
    [BuildService.BRANCHES.MAIN]: {
      command: 'next build',
      outputDir: '.next',
      requiredFiles: ['server/pages', 'static/'],
    },
    [BuildService.BRANCHES.STATIC]: {
      command: 'next build && next export',
      outputDir: 'out',
      requiredFiles: ['index.html', '_next/static'],
      preserveFiles: ['content/']
    },
    [BuildService.BRANCHES.STAGING]: {
      command: 'next build',
      outputDir: '.next',
      requiredFiles: ['server/pages', 'static/']
    }
  };

  /**
   * Validates build output against configuration
   */
  private static validateBuildOutput(config: BuildConfig): boolean {
    if (!existsSync(config.outputDir)) {
      console.error(`Build output directory ${config.outputDir} not found`);
      return false;
    }

    const files = readdirSync(config.outputDir);
    if (files.length === 0) {
      console.error('Build output directory is empty');
      return false;
    }

    const missingFiles = config.requiredFiles.filter(
      file => !existsSync(join(config.outputDir, file))
    );

    if (missingFiles.length > 0) {
      console.error(`Missing required files: ${missingFiles.join(', ')}`);
      return false;
    }

    return true;
  }

  /**
   * Preserves specified files during build process
   */
  private static preserveFiles(config: BuildConfig): void {
    if (!config.preserveFiles) return;

    try {
      config.preserveFiles.forEach(file => {
        const sourcePath = join(process.cwd(), file);
        const tempPath = join(process.cwd(), '.temp', file);
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, tempPath);
        }
      });
    } catch (error) {
      console.error(`Error preserving files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Restores preserved files after build
   */
  private static restoreFiles(config: BuildConfig): void {
    if (!config.preserveFiles) return;

    try {
      config.preserveFiles.forEach(file => {
        const tempPath = join(process.cwd(), '.temp', file);
        const targetPath = join(process.cwd(), file);
        if (existsSync(tempPath)) {
          copyFileSync(tempPath, targetPath);
        }
      });
    } catch (error) {
      console.error(`Error restoring files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Handles build process for different branches
   */
  static async handleBuild(branch: BranchType): Promise<BuildResult> {
    const timestamp = new Date().toISOString();

    try {
      const config = BuildService.BUILD_CONFIGS[branch];
      if (!config) {
        throw new Error(`No build configuration found for branch: ${branch}`);
      }

      this.preserveFiles(config);

      execSync(config.command, { stdio: 'inherit' });

      this.restoreFiles(config);

      if (!this.validateBuildOutput(config)) {
        const failureResult = {
          success: false,
          message: 'Build validation failed',
          timestamp,
          details: `Failed to validate build output in ${config.outputDir}`,
          branch
        };

        await NotificationService.sendBuildNotification({
          status: 'failure',
          title: 'Build Validation Failed',
          message: `Branch: ${branch}\nBuild output validation failed`,
          branch,
          timestamp
        });

        return failureResult;
      }

      // If we're on the static branch, push the static build to GitHub
      if (branch === BuildService.BRANCHES.STATIC) {
        const pushResult = await GitHubService.pushStaticBuild(branch);
        if (!pushResult.success) {
          throw new Error(`Failed to push static build: ${pushResult.message}`);
        }
      }

      this.lastBuildTimestamp = timestamp;

      const successResult = {
        success: true,
        message: `Build completed successfully for ${branch} branch`,
        timestamp,
        branch
      };

      await NotificationService.sendBuildNotification({
        status: 'success',
        title: 'Build Completed Successfully',
        message: `Branch: ${branch}\nBuild and validation completed successfully`,
        branch,
        timestamp
      });

      return successResult;
    } catch (error) {
      const errorMessage = `Build error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMessage);

      await NotificationService.sendBuildNotification({
        status: 'failure',
        title: 'Build Process Failed',
        message: `Branch: ${branch}\nError during build process`,
        branch,
        timestamp,
        details: [errorMessage]
      });

      return {
        success: false,
        message: 'Build process failed',
        timestamp,
        details: errorMessage,
        branch
      };
    }
  }

  static getLastBuildTimestamp(): string | null {
    return this.lastBuildTimestamp;
  }
}