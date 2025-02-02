"use client";

import { TinaManager } from "tinacms";
import { TinaManagementProvider } from "tinacms/dist/admin";

export default function AdminPage() {
  return (
    <TinaManagementProvider>
      <TinaManager />
    </TinaManagementProvider>
  );
}
