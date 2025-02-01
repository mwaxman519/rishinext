export default {
  label: "Global Settings",
  name: "global",
  // Store global settings in a dedicated folder (create /content/global)
  path: "content/global",
  format: "mdx",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      name: "siteTitle",
      label: "Site Title",
    },
    {
      type: "string",
      name: "siteDescription",
      label: "Site Description",
    },
  ],
};
