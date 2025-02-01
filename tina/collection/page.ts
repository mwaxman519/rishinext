export default {
  label: "Pages",
  name: "page",
  // Use the new folder for pages
  path: "content/pages",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};
