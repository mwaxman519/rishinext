// @ts-nocheck
import { defineStaticConfig } from "tinacms";

export default defineStaticConfig({
  branch: "static",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [
      {
        label: "Pages",
        name: "page",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => `/pages/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            label: "Body",
            name: "body",
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
              },
            ],
          },
        ],
      },
      {
        label: "Blog Posts",
        name: "post",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            label: "Date",
            name: "date",
          },
          {
            type: "rich-text",
            label: "Body",
            name: "body",
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
              },
            ],
          },
        ],
      },
    ],
  },
});
