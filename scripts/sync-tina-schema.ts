import { createClient } from "tinacms/dist/client";
import { queries } from "../tina/__generated__/types";
import { join } from 'path';

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

    // Create Tina client with proper configuration
    const client = createClient({ 
      cacheDir: join(process.cwd(), 'tina/__generated__/.cache'),
      url: `https://content.tinajs.io/1.5/content/${clientId}/github/${branch}`,
      token,
      queries,
    });

    // Load and validate schema
    const schemaPath = join(process.cwd(), 'tina/config.tsx');
    console.log('Loading schema from:', schemaPath);

    // Initialize client and sync schema
    await client.request({
      query: `
        mutation PushSchema($schema: JSON!) {
          pushSchema(schema: $schema)
        }
      `,
      variables: {
        schema: {
          path: 'tina/config.tsx',
          format: 'tsx',
        }
      }
    });

    console.log('Schema sync complete');
    console.log('You can now run \`npx tinacms build\`');

  } catch (error) {
    console.error('Failed to sync schema:', error);
    process.exit(1);
  }
}

syncTinaSchema();
