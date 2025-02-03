import { Template } from "tinacms";

export const contentBlockSchema: Template = {
  name: "ContentBlock",
  label: "Content Block",
  ui: {
    defaultItem: {
      content: "Your content here",
      variant: "default"
    },
    itemProps: (item) => ({
      label: item?.content?.substring(0, 20) + "..."
    }),
  },
  fields: [
    {
      type: "rich-text",
      name: "content",
      label: "Content",
      required: true,
      templates: [
        {
          name: "CalloutBlock",
          label: "Callout",
          fields: [
            {
              name: "type",
              label: "Type",
              type: "string",
              options: ["info", "warning", "error"],
            },
            {
              name: "content",
              label: "Content",
              type: "rich-text",
            },
          ],
        },
        {
          name: "CodeBlock",
          label: "Code Block",
          fields: [
            {
              name: "language",
              label: "Language",
              type: "string",
            },
            {
              name: "code",
              label: "Code",
              type: "string",
              ui: {
                component: "textarea",
              },
            },
          ],
        }
      ]
    },
    {
      type: "string",
      name: "variant",
      label: "Variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Featured", value: "featured" },
        { label: "Highlight", value: "highlight" }
      ]
    }
  ],
};