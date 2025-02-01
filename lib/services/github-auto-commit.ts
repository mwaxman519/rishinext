import { Octokit } from '@octokit/rest';
import { LoggerService } from './logger-service';

/**
 * Service to handle automatic GitHub commits and pushes
 */
export class GitHubAutoCommitService {
  private static octokit: Octokit;
  private static initialized = false;

  /**
   * Initialize the GitHub service with the provided token
   */
  static initialize() {
    if (!process.env.GITHUB_TOKEN) {
      LoggerService.log('error', 'GitHub token not found in environment');
      return;
    }

    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    this.initialized = true;
    LoggerService.log('info', 'GitHub auto-commit service initialized');
  }

  /**
   * Commit and push changes to the staging branch
   */
  static async commitAndPush(message: string = 'Auto-commit changes') {
    if (!this.initialized) {
      LoggerService.log('error', 'GitHub service not initialized');
      return;
    }

    try {
      // Configure git user
      const gitConfig = `
        git config user.name "${process.env.REPL_OWNER || 'Replit User'}"
        git config user.email "${process.env.REPL_OWNER || 'user'}@repl.it"
      `;
      await this.execCommand(gitConfig);

      // Add all changes
      await this.execCommand('git add .');

      // Create commit
      await this.execCommand(`git commit -m "${message}"`);

      // Push to staging branch
      await this.execCommand('git push origin staging || git push origin HEAD:staging');

      LoggerService.log('info', 'Successfully committed and pushed changes to staging');
    } catch (error) {
      LoggerService.log('error', `Failed to commit and push changes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Execute a shell command and handle errors
   */
  private static async execCommand(command: string): Promise<void> {
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec(command, (error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  /**
   * Setup auto-commit interval
   * @param intervalMinutes How often to check and commit changes (default: 5 minutes)
   */
  static setupAutoCommit(intervalMinutes: number = 5) {
    if (!this.initialized) {
      this.initialize();
    }

    setInterval(() => {
      this.commitAndPush('Auto-commit: Periodic save of changes');
    }, intervalMinutes * 60 * 1000);

    LoggerService.log('info', `Auto-commit configured for every ${intervalMinutes} minutes`);
  }
}
