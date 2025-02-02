import { defineConfig } from 'tinacms';
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';

// Load the base config
import baseConfig from '../tina/config.js';

// Ensure we're using the static branch
const config = {
  ...baseConfig,
  branch: 'static',
  build: {
    ...baseConfig.build,
    outputFolder: join('public', 'admin'),
    publicFolder: 'public',
    generateSchema: true,
  },
};

// Generate schema
const schemaPath = join(process.cwd(), 'tina', '__generated__', 'schema.gql');
mkdirSync(join(process.cwd(), 'tina', '__generated__'), { recursive: true });
writeFileSync(schemaPath, JSON.stringify(config.schema, null, 2));

console.log('Schema generated successfully!');
