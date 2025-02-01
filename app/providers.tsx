'use client';

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { URLCleaner } from "@/components/url-cleaner";
import { LayoutProvider } from "@/components/layout/layout-context";
import { GitHubAutoCommitService } from "@/lib/services/github-auto-commit";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Initialize GitHub auto-commit service
    GitHubAutoCommitService.initialize();
    GitHubAutoCommitService.setupAutoCommit(10); // Auto-commit every 10 seconds for testing
  }, []);

  return (
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
            <URLCleaner>
              {children}
            </URLCleaner>
          </m.div>
        </LazyMotion>
      </LayoutProvider>
    </ThemeProvider>
  );
}