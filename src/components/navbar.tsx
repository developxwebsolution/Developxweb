"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/data/site";
import type { Service } from "@/data/services";
import type { City } from "@/data/cities";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

const FALLBACK_PRIMARY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function Navbar({
  services,
  cities,
  primaryLinks,
}: {
  services: Service[];
  cities: City[];
  primaryLinks?: { href: string; label: string }[];
}) {
  const navLinks = primaryLinks && primaryLinks.length > 0 ? primaryLinks : FALLBACK_PRIMARY_LINKS;
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"services" | "cities" | null>(null);
  const [mobileSection, setMobileSection] = useState<"services" | "cities" | null>(null);

  // Lock body scroll while the mobile menu is open, and close on Escape —
  // same pattern used by the lead popup, for consistent behavior site-wide.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    lockBodyScroll();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockBodyScroll();
    };
  }, [open]);

  // Reset the accordion state whenever the menu is closed, so it doesn't
  // reopen mid-scroll to a stale section next time.
  function toggleMobileMenu() {
    setOpen((v) => {
      if (v) setMobileSection(null);
      return !v;
    });
  }

  function closeMobileMenu() {
    setOpen(false);
    setMobileSection(null);
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-line bg-paper/80">
      <Container className="flex h-16 items-center justify-between">
        {/* <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink">
          <span className="flex size-7 items-center justify-center rounded-md bg-indigo text-sm text-white">D</span>
          {site.shortName}
        </Link> */}
            {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
        >
          <img
            src="/logo-icon.webp"
            alt="Laser Web Maker"
            className="h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMenu(null)}>
          <div className="relative" onMouseEnter={() => setMenu("services")}>
            <button className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:text-ink cursor-pointer">
              Services <ChevronDown className="size-3.5" />
            </button>
            {menu === "services" && (
              <div className="fixed left-0 right-0  w-full pt-3">
                 <div className="border-y border-line bg-paper shadow-2xl shadow-black/10">
                 <Container>
                <div className="grid grid-cols-4 gap-1 py-5">
                  {services.slice(0, 16).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="rounded-lg px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-indigo-soft hover:text-indigo"
                    >
                      {s.shortName}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="col-span-4 mt-2 flex items-center justify-between border-t border-line px-4 pt-4 text-sm font-medium text-indigo"
                  >
                    View all services <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
                </Container>
              </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setMenu("cities")}>
            <button className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:text-ink cursor-pointer">
              Locations <ChevronDown className="size-3.5" />
            </button>
            {menu === "cities" && (
              <div className="fixed left-0 right-0  w-full pt-3">
                <div className="border-y border-line bg-paper shadow-2xl shadow-black/10">
                 <Container>
                    <div className="grid grid-cols-4 gap-1 py-5">
                      {cities.slice(0, 16).map((c) => (
                
                    <Link
                      key={c.slug}
                      href={`/web-development-company-${c.slug}`}
                      className="rounded-lg px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-indigo-soft hover:text-indigo"
                    >
                      {c.name}
                    </Link>
                  ))}
                  <Link
                    href="/locations"
                    className="col-span-4 mt-2 flex items-center justify-between border-t border-line px-4 pt-4 text-sm font-medium text-indigo"
                  >
                    View all cities <ArrowUpRight className="size-3.5" />
                  </Link>
                    </div>
                  </Container>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-indigo px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Get a quote
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full border border-line text-ink cursor-pointer"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {open && (
        <div data-testid="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {/* Services — expandable, shows every service, not just a link to the index */}
            <div className="rounded-lg">
              <button
                onClick={() => setMobileSection(mobileSection === "services" ? null : "services")}
                aria-expanded={mobileSection === "services"}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink cursor-pointer"
              >
                Services
                <ChevronDown className={`size-4 text-ink-soft transition-transform ${mobileSection === "services" ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === "services" && (
                <div className="ml-3 flex max-h-64 flex-col gap-0.5 overflow-y-auto border-l border-line pb-1 pl-3">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeMobileMenu}
                      className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-raised hover:text-ink"
                    >
                      {s.shortName}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-indigo"
                  >
                    View all services <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Locations — expandable, shows every city, not just a link to the index */}
            <div className="rounded-lg">
              <button
                onClick={() => setMobileSection(mobileSection === "cities" ? null : "cities")}
                aria-expanded={mobileSection === "cities"}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink cursor-pointer"
              >
                Locations
                <ChevronDown className={`size-4 text-ink-soft transition-transform ${mobileSection === "cities" ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === "cities" && (
                <div className="ml-3 flex max-h-64 flex-col gap-0.5 overflow-y-auto border-l border-line pb-1 pl-3">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/web-development-company-${c.slug}`}
                      onClick={closeMobileMenu}
                      className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-raised hover:text-ink"
                    >
                      {c.name}
                    </Link>
                  ))}
                  <Link
                    href="/locations"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-indigo"
                  >
                    View all cities <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={closeMobileMenu} className="rounded-lg px-3 py-2.5 text-sm text-ink">
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-2 rounded-full bg-indigo px-5 py-3 text-center text-sm font-medium text-white"
            >
              Get a quote
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
