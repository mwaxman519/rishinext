// Script to synchronize Tina schema changes
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function syncTinaSchema() {
  try {
    console.log('Attempting to sync Tina schema changes...');

    // Get required environment variables
    const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
    const token = process.env.TINA_TOKEN;

    if (!clientId || !token) {
      throw new Error('Missing required Tina environment variables');
    }

    // Tina Cloud API endpoint
    const tinaApiEndpoint = 'https://content.tinajs.io/content/v1';

    // Make request to sync schema
    const response = await fetch(`${tinaApiEndpoint}/${clientId}/schema/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        schema: {
          path: join(__dirname, '../tina/config.ts'),
          format: 'ts',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || response.statusText;
      } catch {
        errorMessage = errorText || response.statusText;
      }
      throw new Error(`Failed to sync schema: ${errorMessage}`);
    }

    const result = await response.json();
    console.log('Schema sync complete:', result);
    console.log('You can now run `npx tinacms build`');

  } catch (error) {
    console.error('Failed to sync schema:', error);
    process.exit(1);
  }
}

syncTinaSchema();