// @ts-check
import { execSync } from 'child_process';
import fetch from 'node-fetch';

// Utility to wait for server health
async function waitForServer(retries = 30, interval = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch('http://localhost:3000/api/health');
      if (res.ok) return true;
    } catch (e) {
      // Ignore errors and continue waiting
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error('Server failed to start');
}

// Handle cleanup
function cleanup() {
  try {
    execSync('kill -9 $(lsof -t -i:3000)');
  } catch (e) {
    console.error("Error during cleanup:", e);
  }
  process.exit(0);
}

async function main() {
  try {
    // Clean up any existing processes on port 3000
    try {
      execSync('kill -9 $(lsof -t -i:3000)');
    } catch (e) {
      // Ignore if no process found
    }

    // Start Next.js
    execSync('next dev --hostname 0.0.0.0 --port 3000', {
      stdio: 'inherit',
      env: {
        ...process.env,
        FORCE_COLOR: '1'
      }
    });

    try {
      await waitForServer();
      console.log('Server started successfully!');
    } catch (e) {
      console.error('Server failed health check:', e);
      process.exit(1);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Run the main function
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});