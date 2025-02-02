import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { components } from '@/components/mdx-components';

export type StaticData = {
  slug: string;
  title: string;
  description: string;
  content: string;
  date?: string;
};

// Update paths to read from static/content directory
const CONTENT_DIRECTORY = path.join(process.cwd(), 'static', 'content');
const POSTS_DIRECTORY = path.join(CONTENT_DIRECTORY, 'posts');
const PAGES_DIRECTORY = path.join(CONTENT_DIRECTORY, 'pages');

/**
 * Process MDX content with frontmatter
 */
async function processMDXContent(source: string) {
  const { data, content } = matter(source);

  const { content: compiledContent } = await compileMDX({
    source: content,
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
      }
    },
    components
  });

  return {
    frontmatter: data,
    content: compiledContent
  };
}

/**
 * Get data from MDX files in a specific directory
 */
async function getMDXData(directory: string): Promise<StaticData[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    return [];
  }

  try {
    const filenames = fs.readdirSync(directory);
    const items = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(async filename => {
          const filePath = path.join(directory, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { frontmatter, content } = await processMDXContent(fileContents);

          return {
            slug: filename.replace(/\.mdx$/, ''),
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description || '',
            content,
            date: frontmatter.date || null,
          };
        })
    );

    return items.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

/**
 * Get all posts
 */
export async function getStaticData(): Promise<StaticData[]> {
  return getMDXData(POSTS_DIRECTORY);
}

/**
 * Get all pages
 */
export async function getAllPages(): Promise<StaticData[]> {
  return getMDXData(PAGES_DIRECTORY);
}

/**
 * Get a single item by slug
 */
export async function getStaticDataBySlug(slug: string, type: 'post' | 'page' = 'post'): Promise<StaticData | null> {
  try {
    const directory = type === 'post' ? POSTS_DIRECTORY : PAGES_DIRECTORY;
    const items = await getMDXData(directory);
    return items.find(item => item.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching ${type} with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all available slugs for static path generation
 */
export async function getAllSlugs(type: 'post' | 'page' = 'post'): Promise<string[]> {
  try {
    const items = type === 'post' ? await getStaticData() : await getAllPages();
    return items.map(item => item.slug);
  } catch (error) {
    console.error(`Error getting all ${type} slugs:`, error);
    return [];
  }
}