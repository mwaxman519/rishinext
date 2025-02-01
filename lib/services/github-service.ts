import { Octokit } from "@octokit/rest";
import { execSync } from "child_process";

/**
 * Interface for structured GitHub operation errors
 * Provides standardized error reporting across GitHub operations
 */
interface GitHubError extends Error {
  code: string;
  details?: Record<string, any>;
}

/**
 * Custom error class for GitHub operations
 * Enables detailed error tracking with operation context
 */
class GitHubOperationError extends Error implements GitHubError {
  code: string;
  details?: Record<string, any>;

  constructor(message: string, code: string, details?: Record<string, any>) {
    super(message);
    this.name = 'GitHubOperationError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Interface for push operation results
 * Standardizes the response format for GitHub push operations
 */
interface PushResult {
  success: boolean;
  message: string;
  commitSha?: string;
  details?: Record<string, any>;
}

/**
 * GitHubService manages all GitHub repository operations
 * Features:
 * - Automated static build deployment
 * - Branch validation and management
 * - Retry logic for network issues
 * - Comprehensive error handling
 */
export class GitHubService {
  private static readonly VALID_BRANCHES = ['cms', 'staging', 'static', 'main'];
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000; // 1 second

  /**
   * Pushes static build to GitHub with retry logic
   * Includes automatic retry for network-related failures
   * 
   * @param branch - Target branch for the push
   * @param retryCount - Current retry attempt number
   * @returns PushResult containing operation outcome
   */
  static async pushStaticBuild(branch: string, retryCount = 0): Promise<PushResult> {
    try {
      // Validate branch name
      if (!this.VALID_BRANCHES.includes(branch)) {
        throw new GitHubOperationError(
          `Invalid branch: ${branch}`,
          'INVALID_BRANCH'
        );
      }

      // Verify GitHub credentials
      const token = process.env.GITHUB_TOKEN;
      const repo = process.env.GITHUB_REPOSITORY;

      if (!token || !repo) {
        throw new GitHubOperationError(
          'GitHub credentials not found',
          'MISSING_CREDENTIALS'
        );
      }

      const [owner, repository] = repo.split('/');
      if (!owner || !repository) {
        throw new GitHubOperationError(
          'Invalid repository format',
          'INVALID_REPOSITORY'
        );
      }

      // Initialize Octokit with retry logic
      const octokit = new Octokit({ 
        auth: token,
        retry: {
          enabled: true,
          retries: 3
        }
      });

      // Get current commit SHA for the base
      const { data: refData } = await octokit.git.getRef({
        owner,
        repo: repository,
        ref: `heads/${branch}`
      });

      const currentCommit = refData.object.sha;

      // Create tree with build files
      const { data: treeData } = await octokit.git.createTree({
        owner,
        repo: repository,
        base_tree: currentCommit,
        tree: [{
          path: 'out',
          mode: '040000',
          type: 'tree',
          content: 'Static build output'
        }]
      });

      // Create commit with detailed message
      const { data: newCommit } = await octokit.git.createCommit({
        owner,
        repo: repository,
        message: `Update static build
Timestamp: ${new Date().toISOString()}
Branch: ${branch}
Base: ${currentCommit.substring(0, 7)}`,
        tree: treeData.sha,
        parents: [currentCommit]
      });

      // Update branch reference
      await octokit.git.updateRef({
        owner,
        repo: repository,
        ref: `heads/${branch}`,
        sha: newCommit.sha
      });

      return {
        success: true,
        message: `Successfully pushed to ${branch}`,
        commitSha: newCommit.sha,
        details: {
          branch,
          baseCommit: currentCommit.substring(0, 7),
          newCommit: newCommit.sha.substring(0, 7)
        }
      };
    } catch (error) {
      console.error('GitHub push error:', error);

      // Implement retry logic for network-related errors
      if (retryCount < this.MAX_RETRIES && 
          error instanceof Error && 
          (error.message.includes('Network') || error.message.includes('timeout'))) {
        console.log(`Retrying push operation (${retryCount + 1}/${this.MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
        return this.pushStaticBuild(branch, retryCount + 1);
      }

      throw new GitHubOperationError(
        error instanceof Error ? error.message : 'Unknown GitHub error',
        'PUSH_FAILED',
        { branch, retryCount }
      );
    }
  }

  /**
   * Validates GitHub configuration and permissions
   * Ensures all required branches and access rights are present
   * @returns boolean indicating if the setup is valid
   */
  static async validateGitHubSetup(): Promise<boolean> {
    try {
      // Check for required environment variables
      const token = process.env.GITHUB_TOKEN;
      const repo = process.env.GITHUB_REPOSITORY;

      if (!token || !repo) {
        throw new GitHubOperationError(
          'Missing GitHub configuration',
          'MISSING_CONFIG'
        );
      }

      const octokit = new Octokit({ auth: token });
      const [owner, repository] = repo.split('/');

      // Verify repository access and permissions
      const { data: repoData } = await octokit.repos.get({
        owner,
        repo: repository
      });

      if (!repoData.permissions?.push) {
        throw new GitHubOperationError(
          'Insufficient repository permissions',
          'INSUFFICIENT_PERMISSIONS',
          { required: ['push'], available: repoData.permissions }
        );
      }

      // Verify all required branches exist
      const branchStatus = await Promise.all(
        this.VALID_BRANCHES.map(async (branch) => {
          try {
            await octokit.git.getRef({
              owner,
              repo: repository,
              ref: `heads/${branch}`
            });
            return { branch, exists: true };
          } catch {
            return { branch, exists: false };
          }
        })
      );

      const missingBranches = branchStatus
        .filter(status => !status.exists)
        .map(status => status.branch);

      if (missingBranches.length > 0) {
        throw new GitHubOperationError(
          'Missing required branches',
          'MISSING_BRANCHES',
          { missingBranches }
        );
      }

      return true;
    } catch (error) {
      console.error('GitHub validation error:', error);
      return false;
    }
  }

  /**
   * Updates content from cms branch
   * Pulls latest content changes and merges them
   * @returns boolean indicating success of the operation
   */
  static async pullLatestContent(): Promise<boolean> {
    try {
      execSync('git fetch origin cms:cms', { stdio: 'inherit' });
      execSync('git merge --no-ff cms -m "Merge content updates from cms branch"', { stdio: 'inherit' });
      return true;
    } catch (error) {
      console.error('Error pulling content:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new GitHubOperationError(
        `Failed to pull content: ${errorMessage}`,
        'CONTENT_PULL_FAILED',
        { branch: 'cms' }
      );
    }
  }
}