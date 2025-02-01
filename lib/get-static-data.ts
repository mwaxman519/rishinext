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

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

/**
 * Utility function to fetch static data during build time
 */
export async function getStaticData(): Promise<StaticData[]> {
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
    return [];
  }

  try {
    const filenames = fs.readdirSync(POSTS_DIRECTORY);
    const posts = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(POSTS_DIRECTORY, filename);
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

    return posts;
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get a single item by slug
 */
export async function getStaticDataBySlug(slug: string): Promise<StaticData | null> {
  try {
    const allData = await getStaticData();
    return allData.find(item => item.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all available slugs for static path generation
 */
export async function getAllSlugs(): Promise<string[]> {
  try {
    const allData = await getStaticData();
    return allData.map(item => item.slug);
  } catch (error) {
    console.error('Error getting all slugs:', error);
    return [];
  }
}