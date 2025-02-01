/**
 * Service to handle automatic GitHub commits and pushes
 */
export class GitHubAutoCommitService {
  private static initialized = false;
  private static intervalId: NodeJS.Timer | null = null;
  private static lastCommitTime: number = 0;
  private static readonly COMMIT_DEBOUNCE = 10000; // 10 seconds

  /**
   * Initialize the GitHub service
   */
  static initialize() {
    if (typeof window === 'undefined') return; // Only run on client-side
    if (this.initialized) return;

    if (!process.env.GITHUB_TOKEN) {
      console.error('GITHUB_TOKEN not found');
      return;
    }

    this.initialized = true;
    this.lastCommitTime = Date.now();
    console.log('GitHub auto-commit service initialized');
  }

  /**
   * Commit and push changes to the staging branch
   */
  static async commitAndPush(message: string = 'Auto-commit changes') {
    if (typeof window === 'undefined') return; // Only run on client-side
    if (!this.initialized) {
      console.error('GitHub service not initialized');
      return;
    }

    // Debounce commits to prevent too frequent updates
    const now = Date.now();
    if (now - this.lastCommitTime < this.COMMIT_DEBOUNCE) {
      console.log('Skipping commit - too soon since last commit');
      return;
    }

    try {
      const response = await fetch('/api/git', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to commit changes: ${response.statusText}`);
      }

      this.lastCommitTime = now;
      console.log('Successfully committed and pushed changes to staging');
    } catch (error) {
      console.error('Failed to commit and push changes:', error);
      throw error; // Propagate error to hook for proper error handling
    }
  }

  /**
   * Stop auto-commit functionality
   */
  static stopAutoCommit() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Auto-commit stopped');
    }
  }
}