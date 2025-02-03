import { Template } from "tinacms";

export const contentBlockSchema: Template = {
  name: "ContentBlock",
  label: "Content Block",
  ui: {
    defaultItem: {
      content: "Your content here",
      variant: "default"
    },
  },
  fields: [
    {
      type: "rich-text",
      name: "content",
      label: "Content",
      required: true,
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
