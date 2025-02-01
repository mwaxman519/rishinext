import { defineConfig } from "tinacms";
import nextConfig from "../next.config";

const collections = [
  {
    // PAGES
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
    // POSTS
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
        type: "datetime",
        name: "date",
        label: "Date",
        ui: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
        },
      },
      {
        type: "string",
        name: "excerpt",
        label: "Excerpt",
      },
      {
        type: "reference",
        name: "author",
        label: "Author",
        // Points to the 'author' collection below
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
    // AUTHORS
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
  {
    // GLOBAL COLLECTION
    // If you added a file like content/global/main.mdx, you can store site-wide data here
    label: "Global Settings",
    name: "global",
    path: "content/global",
    format: "mdx",
    // Tells Tina to treat this as a single global doc
    ui: {
      global: true,
    },
    fields: [
      {
        type: "string",
        name: "siteTitle",
        label: "Site Title",
      },
      {
        type: "string",
        name: "tagline",
        label: "Tagline",
      },
      {
        type: "string",
        name: "footerText",
        label: "Footer Text",
      },
      // You can add any other fields you want site-wide
    ],
  },
];

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD!,
  token: process.env.TINA_TOKEN!,
  media: {
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
    collections,
  },
});
