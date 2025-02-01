import { defineConfig } from "tinacms";
import nextConfig from "../next.config";

// Collections array with pages, posts, authors only
const collections = [
  {
    label: "Pages",
    name: "page",
    path: "content/pages",
    format: "mdx",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Description" },
      {
        type: "rich-text",
        name: "body",
        label: "Body",
        isBody: true,
      },
    ],
  },
  {
    label: "Posts",
    name: "post",
    path: "content/posts",
    format: "mdx",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Description" },
      {
        type: "datetime",
        name: "date",
        label: "Date",
        ui: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
        },
      },
      { type: "string", name: "excerpt", label: "Excerpt" },
      {
        type: "reference",
        name: "author",
        label: "Author",
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
    label: "Authors",
    name: "author",
    path: "content/authors",
    format: "mdx",
    fields: [
      { type: "string", name: "name", label: "Name" },
      { type: "image", name: "avatar", label: "Avatar" },
      { type: "string", name: "bio", label: "Bio" },
    ],
  },
];

export default defineConfig({
  // Force branch to "main" to avoid env confusion
  branch: "main",

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
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
