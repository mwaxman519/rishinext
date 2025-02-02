import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { z } from 'zod';

// Input validation schema
const commitRequestSchema = z.object({
  message: z.string().optional(),
  timestamp: z.string().datetime().optional(),
});

type CommitRequest = z.infer<typeof commitRequestSchema>;

// Enhanced error handling for command execution
async function execCommand(command: string, token?: string): Promise<string> {
  console.log(`Executing command: ${command}`);

  return new Promise((resolve, reject) => {
    exec(command, { 
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: '0', // Disable git interactive prompts
        ...(token && { GIT_TOKEN: token }), // Pass token if provided
      },
      cwd: process.cwd(), // Ensure we're in the correct directory
    }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command error: ${error.message}`);
        console.error(`stderr: ${stderr}`);
        reject(new Error(`Command failed: ${error.message}\nStderr: ${stderr}`));
        return;
      }
      if (stderr) {
        console.warn(`Command warning: ${stderr}`);
      }
      console.log(`Command output: ${stdout}`);
      resolve(stdout.trim());
    });
  });
}

// Health check endpoint
export async function GET(request: NextRequest) {
  console.log('GET /api/git - Health check started');

  try {
    const version = await execCommand('git --version');
    console.log('Git version check successful:', version);

    return NextResponse.json({ 
      status: 'healthy',
      message: 'Git API endpoint is running',
      version
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Git is not available',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Commit changes endpoint
export async function POST(request: NextRequest) {
  console.log('POST /api/git - Commit request started');

  try {
    // Get authorization token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'No authorization token provided'
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body: CommitRequest = await request.json();
    const result = commitRequestSchema.safeParse(body);

    if (!result.success) {
      console.error('Invalid request body:', result.error.errors);
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Invalid request body',
          errors: result.error.errors 
        },
        { status: 400 }
      );
    }

    const { message = 'Auto-commit changes', timestamp = new Date().toISOString() } = result.data;
    const commitMessage = `${message} at ${timestamp}`;

    console.log('Setting up git configuration...');

    // Initialize git if needed
    try {
      await execCommand('git init', token);
      console.log('Git repository initialized');
    } catch (error) {
      console.log('Git repository already initialized');
    }

    // Configure git with token
    try {
      await execCommand('git config --local init.defaultBranch main', token);
      await execCommand('git config --local user.name "Replit User"', token);
      await execCommand('git config --local user.email "user@repl.it"', token);

      // Set up the token for authentication
      await execCommand(`git config --local http.https://github.com/.extraheader "AUTHORIZATION: basic ${Buffer.from(`x-access-token:${token}`).toString('base64')}"`, token);

      console.log('Git configuration completed');
    } catch (error) {
      console.error('Git configuration failed:', error);
      return NextResponse.json(
        {
          status: 'error',
          message: 'Failed to configure git',
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Check for changes
    const status = await execCommand('git status --porcelain', token);
    console.log('Git status:', status || 'No changes');

    if (!status) {
      return NextResponse.json({
        status: 'success',
        message: 'No changes to commit',
        timestamp
      });
    }

    // Add and commit changes
    try {
      await execCommand('git add .', token);
      await execCommand(`git commit -m "${commitMessage}"`, token);
      console.log('Changes committed');

      // Try to push to staging branch
      try {
        await execCommand('git push origin staging', token);
        console.log('Pushed to existing staging branch');
      } catch (pushError) {
        console.log('Creating staging branch...');
        await execCommand('git checkout -b staging', token);
        await execCommand('git push -u origin staging', token);
        console.log('Created and pushed new staging branch');
      }
    } catch (error) {
      console.error('Git operation failed:', error);
      return NextResponse.json(
        {
          status: 'error',
          message: 'Failed to commit or push changes',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Changes committed and pushed successfully',
      timestamp,
      changes: status.split('\n').filter(Boolean)
    });
  } catch (error) {
    console.error('Git operation failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Git operation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}