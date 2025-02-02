// tina/config.ts
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main", // Must match your GitHub branch
  clientId: process.env.TINA_CLIENT_ID || "", // Set this in Vercel
  token: process.env.TINA_TOKEN || "", // Set this in Vercel
  build: {
    outputFolder: "admin",
    publicFolder: "public", // 👈 Add this to fix the build error
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
          },
        ],
      },
    ],
  },
});
