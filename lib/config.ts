export const siteConfig = {
  name: "Modern Web Application",
  description: "A beautiful and modern web application built with Next.js",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/your-repo",
    docs: "/docs"
  }
};

export type SiteConfig = typeof siteConfig;
