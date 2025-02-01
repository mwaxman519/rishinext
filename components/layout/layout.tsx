import React, { PropsWithChildren } from "react";
import Header from "../nav/header";
import Footer from "../nav/footer";
import { cn } from "@/lib/utils";

type LayoutProps = PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main 
        className={cn(
          "flex-1",
          "relative flex flex-col",
          "bg-background",
          "min-h-[calc(100vh-4rem)]",
          "transition-colors duration-300 ease-in-out"
        )}
      >
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}