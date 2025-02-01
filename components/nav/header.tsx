"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/container";
import NavItems from "./nav-items";
import { BiHomeAlt2 } from "react-icons/bi";
import { routes } from "@/lib/routes";

export default function Header() {
  const nav = [
    { href: "home", label: 'Home' },
    { href: "features", label: 'Features' },
    { href: "about", label: 'About' }
  ] satisfies { href: keyof typeof routes; label: string }[];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href={routes.home}
            className="flex items-center space-x-2 text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <BiHomeAlt2 className="h-6 w-6 text-primary" />
            <span>Modern App</span>
          </Link>
          <NavItems navs={nav} />
        </div>
      </Container>
    </header>
  );
}