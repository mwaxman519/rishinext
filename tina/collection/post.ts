export default {
  label: "Posts",
  name: "post",
  // Use the new folder for posts
  path: "content/posts",
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
