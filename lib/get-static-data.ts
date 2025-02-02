import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type StaticData = {
  slug: string;
  title: string;
  description: string;
  content: string;
  date?: string;
};

const POSTS_DIRECTORY = path.join(process.cwd(), 'static', 'content', 'posts');
const PAGES_DIRECTORY = path.join(process.cwd(), 'static', 'content', 'pages');

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
    const items = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(directory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Extract slug from filename (remove .mdx extension)
        const slug = filename.replace(/\.mdx$/, '');

        return {
          slug,
          title: data.title || 'Untitled',
          description: data.description || '',
          content,
          date: data.date || null,
        };
      })
      .sort((a, b) => {
        // Sort by date if available, newest first
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });

    return items;
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
 * Get a single item by slug from either posts or pages
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