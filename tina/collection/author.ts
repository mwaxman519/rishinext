export default {
  label: "Authors",
  name: "author",
  // Create a folder for authors (you may need to create /content/authors)
  path: "content/authors",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name",
    },
    {
      type: "string",
      name: "bio",
      label: "Bio",
    },
    {
      type: "image",
      name: "avatar",
      label: "Avatar",
    },
  ],
};
