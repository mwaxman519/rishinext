import React from "react";
import { Container } from "../layout/container";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { SocialIcon } from "../icons/social-icon";
import { ExportButton } from "../ui/export-button";

const socialLinks = [
  { href: "https://github.com" as const, icon: FaGithub, label: "GitHub" },
  { href: "https://twitter.com" as const, icon: FaTwitter, label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container size="full" className="py-6 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-lg font-bold tracking-tight transition duration-150 ease-out hover:opacity-80"
            >
              <span className="text-foreground">Modern App</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              Built with Next.js and Tailwind CSS.
            </p>
            <ExportButton />
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <SocialIcon icon={icon} className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}