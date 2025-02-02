import { join } from 'path';
import { readFileSync } from 'fs';

async function syncTinaSchema() {
  try {
    console.log('Attempting to sync Tina schema changes...');

    // Get required environment variables
    const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
    const token = process.env.TINA_TOKEN;
    const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

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

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Raw response:', responseText);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (!response.ok) {
      throw new Error(`Failed to update schema: ${result.message || response.statusText}`);
    }

    console.log('Schema sync result:', result);
    console.log('Schema sync complete');
    console.log('You can now run `npx tinacms build`');

  } catch (error) {
    console.error('Failed to sync schema:', error);
    process.exit(1);
  }
}

syncTinaSchema();