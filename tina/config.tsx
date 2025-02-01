import { defineConfig } from "tinacms";
import nextConfig from "../next.config";

//
// 1) Collections Definitions
//    We define "page", "post", and "author" collections to match any fields 
//    that your GraphQL queries expect (like date, excerpt, author).
//
const collections = [
  {
    // For your site pages (e.g., about.mdx, home.mdx)
    label: "Pages",
    name: "page",
    path: "content/pages",
    format: "mdx",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Title",
      },
      {
        type: "string",
        name: "description",
        label: "Description",
      },
      {
        type: "rich-text",
        name: "body",
        label: "Body",
        isBody: true,
      },
    ],
  },
  {
    // For your blog posts (testpost.mdx, etc.)
    // Includes fields like date, excerpt, and author 
    // that your build logs say are being queried.
    label: "Posts",
    name: "post",
    path: "content/posts",
    format: "mdx",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Title",
      },
      {
        type: "string",
        name: "description",
        label: "Description",
      },
      {
        // If your code references a "date" field, define it here
        type: "datetime",
        name: "date",
        label: "Date",
        ui: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
        },
      },
      {
        // If your code references an "excerpt" field, define it here
        type: "string",
        name: "excerpt",
        label: "Excerpt",
      },
      {
        // If your code references an "author" field, define it as a reference 
        // to the "author" collection. 
        // (Requires an "author" collection defined below.)
        type: "reference",
        name: "author",
        label: "Author",
        // The name of the collection you want to reference
        collections: ["author"],
      },
      {
        type: "rich-text",
        name: "body",
        label: "Body",
        isBody: true,
      },
    ],
  },
  {
    // If your code/queries reference "author" fields in posts
    // (like post.author), define the author collection here.
    label: "Authors",
    name: "author",
    path: "content/authors",
    format: "mdx",
    fields: [
      {
        type: "string",
        name: "name",
        label: "Name",
      },
      {
        type: "image",
        name: "avatar",
        label: "Avatar",
      },
      {
        type: "string",
        name: "bio",
        label: "Bio",
      },
    ],
  },
];

//
// 2) Final Tina Configuration
//
export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  // Ensure Vercel is set to pull from "main" so that Tina commits land on main
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD!,
  token: process.env.TINA_TOKEN!,
  media: {
    // This default uses your "public/uploads" folder for images
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "admin",
    outputFolder: "admin",
    basePath: nextConfig.basePath?.replace(/^\//, "") || "",
  },
  schema: {
    // 3) Reference the collections array above
    collections,
  },
});
