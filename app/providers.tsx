'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { URLCleaner } from "@/components/url-cleaner";
import { LayoutProvider } from "@/components/layout/layout-context";
import { useAutoCommit } from "@/hooks/use-auto-commit";
import { useToast } from "@/hooks/use-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

export function Providers({ children }: ProvidersProps) {
  const { toast } = useToast();

  // Initialize auto-commit with error handling
  useAutoCommit({
    interval: 10000, // 10 seconds
    enabled: true,
    onError: (error) => {
      toast({
        title: "Auto-commit failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <LayoutProvider>
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <URLCleaner>{children}</URLCleaner>
            </m.div>
          </LazyMotion>
        </LayoutProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}