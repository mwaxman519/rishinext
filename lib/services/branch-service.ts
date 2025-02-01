import { execSync } from 'child_process';

/**
 * Interface defining the structure of branch validation results
 * Provides detailed information about validation outcomes
 */
interface BranchValidationResult {
  isValid: boolean;
  message: string;
  branch?: string;
  details?: string[];
}

/**
 * BranchService manages branch validation and verification
 * Ensures proper structure and content for different branch types:
 * - Main: Primary development branch
 * - CMS: Static site output branch
 * - Staging: Development branch
 */
export class BranchService {
  /** Valid branch identifiers */
  private static readonly VALID_BRANCHES = {
    MAIN: 'main',    // Primary branch
    CMS: 'cms',      // Static site output
    STAGING: 'staging' // Development
  };

  /**
   * Validates branch existence and structure
   * Performs branch-specific validation based on type
   * 
   * @param branch - Branch name to validate
   * @returns Validation result with detailed information
   */
  static async validateBranch(branch: string): Promise<BranchValidationResult> {
    try {
      // Basic branch name validation
      if (!Object.values(this.VALID_BRANCHES).includes(branch)) {
        return {
          isValid: false,
          message: `Invalid branch: ${branch}. Must be one of: ${Object.values(this.VALID_BRANCHES).join(', ')}`,
          branch,
          details: [`Branch ${branch} is not in the list of valid branches`]
        };
      }

      // Verify branch exists
      try {
        execSync(`git rev-parse --verify ${branch}`, { stdio: 'pipe' });
      } catch {
        return {
          isValid: false,
          message: `Branch ${branch} does not exist`,
          branch,
          details: ['Branch not found in repository']
        };
      }

      // Branch-specific validation
      switch (branch) {
        case this.VALID_BRANCHES.MAIN:
          // Check for essential files
          const essentialFiles = [
            'package.json',
            'next.config.js',
            'tsconfig.json'
          ];

          const missingFiles = essentialFiles.filter(file => {
            try {
              execSync(`git ls-tree -r main --name-only ${file}`, { stdio: 'pipe' });
              return false;
            } catch {
              return true;
            }
          });

          if (missingFiles.length > 0) {
            return {
              isValid: false,
              message: 'Main branch is missing essential files',
              branch,
              details: missingFiles
            };
          }
          break;

        case this.VALID_BRANCHES.CMS:
          // Validate static build output
          try {
            const hasStaticFiles = execSync('git ls-tree -r cms --name-only', { stdio: 'pipe' })
              .toString()
              .split('\n')
              .some(file => 
                file.endsWith('.html') || 
                file.includes('static/') || 
                file.includes('_next/')
              );

            if (!hasStaticFiles) {
              return {
                isValid: false,
                message: 'CMS branch is missing required files',
                branch,
                details: ['Missing static build output files']
              };
            }
          } catch {
            // New CMS branch is acceptable
            return {
              isValid: true,
              message: 'New CMS branch created',
              branch,
              details: ['Branch will be populated with static build output']
            };
          }
          break;

        case this.VALID_BRANCHES.STAGING:
          // Validate development code structure
          try {
            const requiredFiles = [
              'package.json',
              'tsconfig.json',
              'next.config.js',
              'app/layout.tsx',
              'app/page.tsx'
            ];

            const missingFiles = requiredFiles.filter(file => {
              try {
                execSync(`git ls-tree -r staging --name-only ${file}`, { stdio: 'pipe' });
                return false;
              } catch {
                return true;
              }
            });

            if (missingFiles.length > 0) {
              return {
                isValid: false,
                message: 'Staging branch is missing essential development files',
                branch,
                details: missingFiles
              };
            }
          } catch {
            return {
              isValid: false,
              message: 'Staging branch is missing required files',
              branch,
              details: [
                'Development configuration not found',
                'Required source files are missing'
              ]
            };
          }
          break;
      }

      return {
        isValid: true,
        message: `Branch ${branch} is valid`,
        branch,
        details: ['All validation checks passed']
      };
    } catch (error) {
      return {
        isValid: false,
        message: `Error validating branch ${branch}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        branch,
        details: ['Unexpected error during validation']
      };
    }
  }

  /**
   * Validates all required branches
   * Ensures complete branch structure is valid
   * @returns Array of validation results for all branches
   */
  static async validateBranchSetup(): Promise<BranchValidationResult[]> {
    const results: BranchValidationResult[] = [];

    for (const branch of Object.values(this.VALID_BRANCHES)) {
      results.push(await this.validateBranch(branch));
    }

    return results;
  }

  /**
   * Checks if a branch supports webhook triggers
   * Currently only main branch supports webhooks
   * 
   * @param branch - Branch name to check
   * @returns boolean indicating webhook support
   */
  static isWebhookEnabled(branch: string): boolean {
    return branch === this.VALID_BRANCHES.MAIN;
  }
}