"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home", active: (pathname: string) => pathname === "/" },
  { href: "/introduction", label: "Introduction", active: (pathname: string) => pathname === "/introduction" },
  { href: "/revelation/1", label: "Commentary", active: (pathname: string) => pathname.startsWith("/revelation") },
  { href: "/articles", label: "Articles", active: (pathname: string) => pathname.startsWith("/articles") },
  { href: "/timeline", label: "Visual Prophecy", active: (pathname: string) => pathname.startsWith("/timeline") }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="reader-header no-print">
      <Link href="/" className="reader-brand" aria-label="Revelation Study Home">
        <span className="reader-logo" aria-hidden="true">R</span>
        <span className="reader-brand-text">
          <span className="reader-brand-strong">Revelation</span>
          <span className="reader-brand-muted"> Study</span>
        </span>
      </Link>

      <nav className="reader-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={link.active(pathname) ? "reader-nav-link reader-nav-link-active" : "reader-nav-link"}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="reader-header-actions">
        <ThemeToggle />
        <Button
          className="reader-menu-button"
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {open ? (
        <nav className="reader-menu">
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={link.active(pathname) ? "reader-menu-link reader-menu-link-active" : "reader-menu-link"}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
