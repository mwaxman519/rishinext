import { defineConfig } from "tinacms";
import type { TinaConfiguration } from "tinacms";

// Get environment variables
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
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
        name: "post",
        label: "Posts",
        path: "content/posts",
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
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
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
            type: "object",
            name: "blocks",
            label: "Content Blocks",
            list: true,
            templates: [
              {
                name: "hero",
                label: "Hero",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "string",
                    name: "subheading",
                    label: "Subheading",
                  },
                  {
                    type: "object",
                    name: "actions",
                    label: "Actions",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "label",
                        label: "Label",
                      },
                      {
                        type: "string",
                        name: "url",
                        label: "URL",
                      },
                    ],
                  },
                ],
              },
            ],
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
          {
            type: "rich-text",
            name: "footerContent",
            label: "Footer Content",
          },
        ],
      },
    ],
  },
};

export default defineConfig(config);
