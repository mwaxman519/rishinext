import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

async function validateMDXFile(filePath: string) {
  console.log(`\nValidating MDX file: ${filePath}`);

  try {
    // Read the file
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return false;
    }

    const source = fs.readFileSync(filePath, 'utf-8');
    console.log('✓ File read successfully');

    // Parse frontmatter
    const { data, content } = matter(source);
    console.log('✓ Frontmatter parsed:', data);

    // Validate required frontmatter fields
    const requiredFields = ['title', 'description'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      console.error(`❌ Missing required frontmatter fields: ${missingFields.join(', ')}`);
      return false;
    }
    console.log('✓ All required frontmatter fields present');

    // Test MDX compilation
    try {
      const { content: compiledContent } = await compileMDX({
        source,
        options: {
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, {
                behavior: 'wrap',
                properties: {
                  className: ['anchor']
                }
              }]
            ],
            format: 'mdx'
          },
          parseFrontmatter: true,
        }
      });

      console.log('✓ MDX compilation successful');
      return true;
    } catch (compileError) {
      console.error('❌ MDX compilation failed:', compileError);
      return false;
    }
  } catch (error) {
    console.error('❌ File validation failed:', error);
    return false;
  }
}

async function main() {
  console.log('Starting MDX validation tests...');

  const contentDirs = [
    path.join(process.cwd(), 'content', 'pages'),
    path.join(process.cwd(), 'static', 'content', 'pages')
  ];

  let hasValidFiles = false;
  let totalFiles = 0;
  let validFiles = 0;

  for (const contentDir of contentDirs) {
    if (!fs.existsSync(contentDir)) {
      console.log(`Directory not found: ${contentDir}, skipping...`);
      continue;
    }

    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.mdx'));

    for (const file of files) {
      totalFiles++;
      const filePath = path.join(contentDir, file);
      const isValid = await validateMDXFile(filePath);
      if (isValid) {
        validFiles++;
        hasValidFiles = true;
      }
    }
  }

  console.log(`\nValidation Summary:`);
  console.log(`Total files tested: ${totalFiles}`);
  console.log(`Valid files: ${validFiles}`);
  console.log(`Invalid files: ${totalFiles - validFiles}`);

  if (hasValidFiles) {
    console.log('\n✅ MDX validation completed with some valid files');
    process.exit(0);
  } else {
    console.error('\n❌ No valid MDX files found');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});