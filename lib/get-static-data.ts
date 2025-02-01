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
  // Ensure the posts directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

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
        date: data.date,
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
}

/**
 * Get a single item by slug
 */
export async function getStaticDataBySlug(slug: string): Promise<StaticData | null> {
  const allData = await getStaticData();
  return allData.find(item => item.slug === slug) || null;
}

/**
 * Get all available slugs for static path generation
 */
export async function getAllSlugs(): Promise<string[]> {
  const allData = await getStaticData();
  return allData.map(item => item.slug);
}