import { defineConfig } from "tinacms";
import schema from "./schema";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "static",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema,
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
});