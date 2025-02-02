"use client";

import { TinaCMS } from "tinacms";
import { TinaManager } from "tinacms";

export default function AdminPage() {
  return (
    <TinaCMS>
      <TinaManager />
    </TinaCMS>
  );
}
