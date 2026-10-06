"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-200",
          scrolled
            ? "border-ink-100 bg-white/85 backdrop-blur-md shadow-sm"
            : "border-transparent bg-white"
        )}
      >
        <div className="container-tight flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label={`${SITE.name} — Home`}
          >
            <div className="relative h-12 sm:h-14 w-32 sm:w-40">
              <Image
                src="/logo.webp"
                alt={`${SITE.name} logo`}
                fill
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 text-sm rounded-lg transition-colors",
                    active
                      ? "text-ink-900 font-medium bg-ink-50"
                      : "text-ink-700 hover:text-ink-900 hover:bg-ink-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex btn btn-primary btn-md"
            >
              Contact us
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-ink-100 transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-5 h-16">
            <div className="relative h-10 w-28">
              <Image
                src="/logo.webp"
                alt={`${SITE.name} logo`}
                fill
                sizes="112px"
                className="object-contain object-left"
              />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-ink-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-5 py-3.5 text-[15px] text-ink-800 hover:bg-ink-50"
              >
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 text-ink-400" />
              </Link>
            ))}
          </nav>

          <div className="border-t border-ink-100 p-5 space-y-3 pb-safe">
            <Link
              href="/contact"
              className="btn btn-primary btn-lg w-full"
              onClick={() => setOpen(false)}
            >
              Contact us
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="btn btn-secondary btn-lg w-full"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}