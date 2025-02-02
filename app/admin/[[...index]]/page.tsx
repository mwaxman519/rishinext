"use client";

import { TinaCMS } from "tinacms";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Check if we're on the static branch
    setIsProduction(window.location.hostname !== 'localhost' && 
                   window.location.hostname !== '0.0.0.0');
  }, []);

  if (!isProduction) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Interface Disabled</h1>
        <p>The admin interface is only available in production mode on the static branch.</p>
        <p className="mt-2">Please deploy to the static branch to access the admin interface.</p>
      </div>
    );
  }

  return (
    <TinaCMS>
      <div className="p-4">
        <h1>Content Management</h1>
        <p>Use this interface to manage your content.</p>
      </div>
    </TinaCMS>
  );
}