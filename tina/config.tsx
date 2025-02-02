import { defineConfig } from "tinacms";
import type { Template } from "tinacms";

// Define the Callout template type
interface CalloutTemplate extends Template {
  name: "callout";
  label: "Callout";
  fields: {
    name: "type" | "text";
    type: "string";
    label: string;
    options?: string[];
  }[];
}

export default defineConfig({
  branch: "static",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
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
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "success", "error"],
                  },
                  {
                    name: "text",
                    label: "Text",
                    type: "string",
                  },
                ],
              } as CalloutTemplate,
            ],
          }
        ],
      }
    ],
  }
});
