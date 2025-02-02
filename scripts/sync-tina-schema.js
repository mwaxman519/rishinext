import { join } from 'path';
import { readFileSync } from 'fs';

async function syncTinaSchema() {
  try {
    console.log('Attempting to sync Tina schema changes...');

    // Get required environment variables
    const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
    const token = process.env.TINA_TOKEN;
    const branch = "static";  // Always sync to static branch

    if (!clientId || !token) {
      throw new Error('Missing required Tina environment variables');
    }

    console.log(`Using branch: ${branch}`);
    console.log(`Using client ID: ${clientId.substring(0, 8)}...`);

    // Load schema file
    const schemaPath = join(process.cwd(), 'tina/config.tsx');
    console.log('Loading schema from:', schemaPath);

    // Read schema file content
    const schemaContent = readFileSync(schemaPath, 'utf8');

    // Send schema update request to Tina Cloud
    const response = await fetch(`https://api.tina.io/v1/organizations/self/projects/${clientId}/schema`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        schema: schemaContent,
        branch,
        extensions: ['.tsx', '.ts', '.mdx', '.md']
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to update schema: ${text}`);
    }

    console.log('Schema sync complete');
    console.log('You can now run `npx tinacms build`');

  } catch (error) {
    console.error('Failed to sync schema:', error);
    process.exit(1);
  }
}

syncTinaSchema();