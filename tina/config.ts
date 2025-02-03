import { defineConfig } from "tinacms";
import { contentBlockSchema } from "../lib/schemas/blocks";

// Configuration for TinaCMS
export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "static", // Content lives in the static branch
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Get this from Tina Cloud
  token: process.env.TINA_TOKEN, // Get this from Tina Cloud

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Configure media storage to use Cloudinary
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },

  // Schema configuration
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
            },
          },
        },
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
            templates: [
              contentBlockSchema
            ],
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
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
            type: "image",
            name: "coverImage",
            label: "Cover Image",
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              contentBlockSchema
            ],
          },
        ],
      },
    ],
  },
});