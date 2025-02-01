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
    }
  }

  /**
   * Setup auto-commit interval
   * @param seconds How often to check and commit changes (default: 10 seconds)
   */
  static setupAutoCommit(seconds: number = 10) {
    if (typeof window === 'undefined') return; // Only run on client-side

    if (!this.initialized) {
      this.initialize();
    }

    // Clear any existing interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Set up new interval
    this.intervalId = setInterval(() => {
      this.commitAndPush(`Auto-commit: Periodic save at ${new Date().toISOString()}`);
    }, seconds * 1000);

    console.log(`Auto-commit configured for every ${seconds} seconds`);
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