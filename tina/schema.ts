import { defineSchema } from "tinacms";

export default defineSchema({
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
            },
          ],
        },
      ],
    },
    {
      name: "post",
      label: "Blog Posts",
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
          ui: {
            component: "textarea",
          },
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
});
