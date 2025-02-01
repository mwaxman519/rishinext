"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface NavItem {
  href: keyof typeof routes;
  label: string;
}

interface NavItemsProps {
  navs: NavItem[];
}

const defaultItemClasses = "text-foreground/70 hover:text-foreground transition-colors";

export default function NavItems({ navs }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navs.map((item) => {
        const routePath = routes[item.href];
        const isActive = pathname === routePath;
        return (
          <Link
            key={item.href}
            href={routePath}
            className={`nav-link px-2 py-6 ${isActive ? 'text-primary border-b-2 border-primary font-semibold' : defaultItemClasses}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}