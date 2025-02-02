import { spawn } from 'child_process';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = join(__dirname, '..', 'logs');
if (!existsSync(logsDir)) {
  mkdirSync(logsDir);
}

// Create write stream for logs
const logStream = createWriteStream(join(logsDir, 'tina-server.log'), { flags: 'a' });

// Start TinaCMS with logging
const tinacms = spawn('npx', ['tinacms', 'dev', '--port', '4001'], {
  env: {
    ...process.env,
    TINA_PUBLIC_IS_LOCAL: 'true',
    PORT: '4001',
    DEBUG: 'tinacms:*'
  }
});

// Log stdout
tinacms.stdout.on('data', (data) => {
  const output = data.toString();
  logStream.write(`[${new Date().toISOString()}] ${output}`);
  console.log(output);
});

// Log stderr
tinacms.stderr.on('data', (data) => {
  const error = data.toString();
  logStream.write(`[${new Date().toISOString()}] ERROR: ${error}`);
  console.error(error);
});

// Handle process exit
tinacms.on('exit', (code) => {
  const message = `[${new Date().toISOString()}] TinaCMS process exited with code ${code}\n`;
  logStream.write(message);
  console.log(message);
});

process.on('SIGINT', () => {
  tinacms.kill();
  logStream.end();
  process.exit();
});