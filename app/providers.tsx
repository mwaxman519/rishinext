'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { URLCleaner } from "@/components/url-cleaner";
import { LayoutProvider } from "@/components/layout/layout-context";
import { useAutoSave } from "@/hooks/use-auto-commit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TinaCMS, TinaProvider } from "tinacms";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Configure TinaCMS instance
const cms = new TinaCMS({
  enabled: true,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "static", // Align with config.ts
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN,
  mediaStore: async () => {
    const pack = await import("next-tinacms-cloudinary");
    return pack.CloudinaryMediaStore;
  },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
});

export function Providers({ children }: ProvidersProps) {
  useAutoSave({
    key: 'app_state',
    interval: 10000,
    enabled: true,
    data: {
      lastModified: new Date().toISOString(),
    },
  });

  return (
    <TinaProvider cms={cms}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>
            <LazyMotion features={domAnimation}>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <URLCleaner>{children}</URLCleaner>
              </m.div>
            </LazyMotion>
          </LayoutProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </TinaProvider>
  );
}