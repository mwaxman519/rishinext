import { exec } from 'child_process';
import { NextResponse } from 'next/server';

// Mark the config as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

export async function POST(request: Request) {
  try {
    const { message = 'Auto-commit changes' } = await request.json();

    // Configure git
    await execCommand(`git config user.name "${process.env.REPL_OWNER || 'Replit User'}"`);
    await execCommand(`git config user.email "${process.env.REPL_OWNER || 'user'}@repl.it"`);

    // Add and commit changes
    await execCommand('git add .');
    await execCommand(`git commit -m "${message}"`);

    // Push to staging
    await execCommand('git push origin staging || git push origin HEAD:staging');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Git operation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}