import { Octokit } from "@octokit/rest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

/**
 * Pushes built files to GitHub repository
 * Requires GITHUB_TOKEN and GITHUB_REPOSITORY environment variables
 */
export async function pushToGithub(branch = 'main') {
  try {
    // Configure GitHub client
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPOSITORY;

    if (!token || !repo) {
      throw new Error('GitHub credentials not found. Please set GITHUB_TOKEN and GITHUB_REPOSITORY environment variables.');
    }

    const [owner, repository] = repo.split('/');
    if (!owner || !repository) {
      throw new Error('Invalid GITHUB_REPOSITORY format. Expected format: owner/repository');
    }

    console.log(`Initializing GitHub push to ${owner}/${repository} (${branch})...`);

    const octokit = new Octokit({
      auth: token
    });

    // Get the current commit SHA
    console.log('Fetching current commit...');
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo: repository,
      ref: `heads/${branch}`
    });

    const currentCommit = refData.object.sha;
    console.log(`Current commit SHA: ${currentCommit}`);

    // Create a new tree with the build files
    console.log('Creating new tree with build files...');
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo: repository,
      base_tree: currentCommit,
      tree: [{
        path: branch === 'production' ? 'out' : 'dist',
        mode: '040000',
        type: 'tree',
        content: branch === 'production' ? 'Static files' : 'Built files'
      }]
    });

    // Create a new commit
    console.log('Creating new commit...');
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo: repository,
      message: branch === 'production' 
        ? 'Auto-generated static build'
        : 'Auto-generated build commit',
      tree: treeData.sha,
      parents: [currentCommit]
    });

    // Update the reference
    console.log('Updating repository reference...');
    await octokit.git.updateRef({
      owner,
      repo: repository,
      ref: `heads/${branch}`,
      sha: newCommit.sha
    });

    console.log(`Successfully pushed build to GitHub (${branch})`);
    return {
      success: true,
      commitSha: newCommit.sha,
      message: `Successfully pushed build to GitHub (${branch})`
    };
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
    throw error;
  }
}