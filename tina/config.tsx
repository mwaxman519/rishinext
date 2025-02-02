export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        fields: [
          { name: "title", label: "Title", type: "string" },
        ],
      },
      {
        name: "posts",
        label: "Posts",
        path: "content/posts",
        fields: [
          { name: "title", label: "Title", type: "string" },
          { name: "author", label: "Author", type: "string" },
        ],
      },
      {
        name: "authors",
        label: "Authors",
        path: "content/authors",
        fields: [
          { name: "name", label: "Name", type: "string" },
        ],
      },
    ],
  },
});
