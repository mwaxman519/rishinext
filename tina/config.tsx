import { defineConfig } from "tinacms";
import type { TinaConfiguration } from "tinacms";

// Get environment variables
const branch = "static"; // Point to static branch for live editing
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;

if (!clientId || !token) {
  throw new Error("Missing required environment variables for Tina CMS");
}

const config: TinaConfiguration = {
  branch,
  clientId,
  token,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
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
        name: "global",
        label: "Global Settings",
        path: "content/global",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "siteTitle",
            label: "Site Title",
            required: true,
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
          },
        ],
      },
    ],
  },
};

export default defineConfig(config);