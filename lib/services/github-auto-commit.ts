/**
 * Service to handle automatic GitHub commits and pushes
 */
export class GitHubAutoCommitService {
  private static initialized = false;
  private static intervalId: NodeJS.Timer | null = null;
  private static lastCommitTime: number = 0;
  private static readonly COMMIT_DEBOUNCE = 10000; // 10 seconds
  private static token: string | null = null;

  /**
   * Initialize the GitHub service
   */
  static initialize(providedToken?: string) {
    if (this.initialized) {
      console.log('[GitHubAutoCommit] Service already initialized');
      return;
    }

    // Check for token in different environments
    const token = providedToken || 
                 (typeof window !== 'undefined' 
                   ? process.env.NEXT_PUBLIC_GITHUB_TOKEN 
                   : process.env.GITHUB_TOKEN);

    if (!token) {
      console.error('[GitHubAutoCommit] GitHub token not found in environment variables');
      return;
    }

    this.token = token;
    this.initialized = true;
    this.lastCommitTime = Date.now();
    console.log('[GitHubAutoCommit] Service initialized with token');
  }

  /**
   * Force a commit and push immediately, bypassing debounce
   */
  static async forceCommitAndPush(message: string) {
    if (!this.validateState()) {
      throw new Error('GitHub auto-commit service not properly initialized');
    }

    try {
      console.log('[GitHubAutoCommit] Force committing changes...');
      const response = await fetch('/api/git', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString(),
          force: true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to commit changes: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('[GitHubAutoCommit] Force commit result:', result);
      return result;
    } catch (error) {
      console.error('[GitHubAutoCommit] Failed to force commit changes:', error);
      throw error;
    }
  }

  /**
   * Regular commit and push to the staging branch
   */
  static async commitAndPush(message: string = 'Auto-commit changes') {
    if (typeof window === 'undefined') {
      console.log('[GitHubAutoCommit] Skipping commit - server-side context');
      return;
    }

    if (!this.validateState()) {
      throw new Error('GitHub auto-commit service not properly initialized');
    }

    // Debounce commits to prevent too frequent updates
    const now = Date.now();
    if (now - this.lastCommitTime < this.COMMIT_DEBOUNCE) {
      console.log('[GitHubAutoCommit] Skipping commit - too soon since last commit');
      return;
    }

    try {
      console.log('[GitHubAutoCommit] Initiating commit process');
      const response = await fetch('/api/git', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to commit changes: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('[GitHubAutoCommit] Commit result:', result);

      this.lastCommitTime = now;
      console.log('[GitHubAutoCommit] Successfully committed and pushed changes to staging');
    } catch (error) {
      console.error('[GitHubAutoCommit] Failed to commit and push changes:', error);
      throw error;
    }
  }

  /**
   * Validate initialization and token
   */
  private static validateState(): boolean {
    if (!this.initialized) {
      console.error('[GitHubAutoCommit] Service not initialized');
      return false;
    }

    if (!this.token) {
      console.error('[GitHubAutoCommit] No valid GitHub token available');
      return false;
    }

    return true;
  }

  /**
   * Stop auto-commit functionality
   */
  static stopAutoCommit() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('[GitHubAutoCommit] Auto-commit stopped');
    }
  }
}

export default GitHubAutoCommitService;