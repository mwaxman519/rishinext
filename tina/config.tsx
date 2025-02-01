import { defineConfig } from "tinacms";
import nextConfig from "../next.config";

const collections = [
  {
    // PAGES
    label: "Pages",
    name: "page",
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
  },
  {
    // POSTS
    label: "Posts",
    name: "post",
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
        type: "datetime",
        name: "date",
        label: "Date",
        ui: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
        },
      },
      {
        type: "string",
        name: "excerpt",
        label: "Excerpt",
      },
      {
        type: "reference",
        name: "author",
        label: "Author",
        collections: ["author"],
      },
      {
        type: "rich-text",
        name: "body",
        label: "Body",
        isBody: true,
      },
    ],
  },
  {
    // AUTHORS
    label: "Authors",
    name: "author",
    path: "content/authors",
    format: "mdx",
    fields: [
      {
        type: "string",
        name: "name",
        label: "Name",
      },
      {
        type: "image",
        name: "avatar",
        label: "Avatar",
      },
      {
        type: "string",
        name: "bio",
        label
