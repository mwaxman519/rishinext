"use client";

import { TinaCMS } from "tinacms";

export default function AdminPage() {
  return (
    <TinaCMS>
      {/* Admin interface will be enabled only in production */}
      <div className="p-4">
        <h1>Admin Interface</h1>
        <p>The admin interface is only available in production mode.</p>
      </div>
    </TinaCMS>
  );
}