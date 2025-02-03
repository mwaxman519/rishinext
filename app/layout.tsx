import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/nav/header";
import Footer from "@/components/nav/footer";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Documentation Platform',
  description: 'A modern documentation platform built with Next.js and TinaCMS',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}