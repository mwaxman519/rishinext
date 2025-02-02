import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main", // Ensure this matches your GitHub branch
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "", // Matches the variable from your screenshot
  token: process.env.TINA_TOKEN || "", // Matches the variable from your screenshot
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
