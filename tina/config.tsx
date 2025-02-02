// tina/config.ts
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main", // Must match your GitHub branch
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "", // Ensure this matches your Vercel environment variable
  token: process.env.TINA_TOKEN || "", // Ensure this matches your Vercel environment variable
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        fields: [
          { name: "title", label: "Title", type: "string" },
        ],
      },
    ],
  },
});
