import { exec } from 'child_process';
import { NextResponse } from 'next/server';

// Mark the config as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Command error:', error);
        console.error('stderr:', stderr);
        reject(new Error(`${error.message}\n${stderr}`));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// Handle GET requests
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Git API endpoint is running'
  });
}

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { message = 'Auto-commit changes', timestamp } = body;
    const commitMessage = timestamp ? `${message} at ${timestamp}` : message;

    console.log('Setting up git configuration...');

    // Configure git with error handling
    try {
      await execCommand(`git config user.name "${process.env.REPL_OWNER || 'Replit User'}"`);
      await execCommand(`git config user.email "${process.env.REPL_OWNER || 'user'}@repl.it"`);
    } catch (configError) {
      console.error('Git configuration failed:', configError);
      return NextResponse.json(
        { error: 'Failed to configure git' },
        { status: 500 }
      );
    }

    // Check for changes
    console.log('Checking git status...');
    const status = await execCommand('git status --porcelain');
    if (!status) {
      return NextResponse.json({
        success: true,
        message: 'No changes to commit',
        timestamp
      });
    }

    console.log('Changes detected, proceeding with commit...');

    // Add and commit changes
    await execCommand('git add .');
    await execCommand(`git commit -m "${commitMessage}"`);

    // Push to staging branch
    console.log('Pushing to staging branch...');
    try {
      await execCommand('git push origin staging');
    } catch (pushError) {
      // Try creating the branch if it doesn't exist
      await execCommand('git push -u origin HEAD:staging');
    }

    return NextResponse.json({ 
      success: true,
      message: 'Changes committed and pushed successfully',
      timestamp,
      changes: status.split('\n')
    });
  } catch (error) {
    console.error('Git operation failed:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}