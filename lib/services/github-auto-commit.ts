/**
 * Service to handle automatic GitHub commits and pushes
 */
export class GitHubAutoCommitService {
  private static initialized = false;

  /**
   * Initialize the GitHub service
   */
  static initialize() {
    if (typeof window === 'undefined') return; // Only run on client-side
    this.initialized = true;
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

    try {
      const response = await fetch('/api/git', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Failed to commit changes: ${response.statusText}`);
      }

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

    setInterval(() => {
      this.commitAndPush('Auto-commit: Periodic save of changes');
    }, seconds * 1000); // Convert seconds to milliseconds

    console.log(`Auto-commit configured for every ${seconds} seconds`);
  }
}