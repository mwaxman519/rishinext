type StaticData = {
  slug: string;
  title: string;
  description: string;
};

/**
 * Utility function to fetch static data during build time
 */
export async function getStaticData(): Promise<StaticData[]> {
  // In a real application, this would fetch from a data source
  const data: StaticData[] = [
    {
      slug: 'hello-world',
      title: 'Hello World',
      description: 'Welcome to our modern web application',
    },
    {
      slug: 'getting-started',
      title: 'Getting Started',
      description: 'Learn how to get started with our application',
    },
    {
      slug: 'features',
      title: 'Features',
      description: 'Explore the features of our application',
    },
  ];

  return data;
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