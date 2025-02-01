import { defineConfig } from "tinacms";
import nextConfig from '../next.config'

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    tina: {
      publicFolder: "out", // ✅ Change from "public" to "out" for static files
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "out", // ✅ Ensures TinaCMS serves static pages from `/out`
    outputFolder: "admin",
    basePath: nextConfig.basePath?.replace(/^\//, '') || '', // The base path of the app (could be /blog)
  },
  schema: {
    collections: [Page, Post, Author, Global],
  },
});

export default config;
