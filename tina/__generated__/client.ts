import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/runner/workspace/tina/__generated__/.cache/1738534133176', url: 'http://localhost:4001/graphql', token: 'ebc879ff972c75d9741b692af992b2c77613ac63', queries,  });
export default client;
  