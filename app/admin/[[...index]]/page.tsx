"use client";

import { TinaManager } from "tinacms";
import { TinaCMS } from "tinacms";

export default function AdminPage() {
  return (
    <TinaCMS>
      <TinaManager />
    </TinaCMS>
  );
}