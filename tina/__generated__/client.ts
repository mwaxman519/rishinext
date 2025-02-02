import { createClient } from "tinacms/dist/client";
import { queries } from "./queries";

export const client = createClient({
  url: process.env.NEXT_PUBLIC_TINA_CLIENT_ID 
    ? `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${process.env.TINA_BRANCH}`
    : "http://localhost:4001/graphql",
  token: process.env.TINA_TOKEN,
  queries,
  branch: process.env.TINA_BRANCH || "static",
});

export default client;
