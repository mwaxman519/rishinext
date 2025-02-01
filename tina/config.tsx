import { defineConfig } from "tinacms";
import nextConfig from '../next.config'

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  // Force Tina Cloud to use the main branch.
  branch: "main",
  token: process.env.TINA_TOKEN!,
  media: {
    tina: {
      // Keep these as-is if your media assets remain in public/uploads.
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    // Change this from "public" to "out" so Tina Cloud
    // knows where your static site is generated.
    publicFolder: "out",
    // This will output the Tina admin UI to out/admin.
    outputFolder: "admin",
    basePath: nextConfig.basePath?.replace(/^\//, '') || '',
  },
  schema: {
    collections: [Page, Post, Author, Global],
  },
});

export default config;
