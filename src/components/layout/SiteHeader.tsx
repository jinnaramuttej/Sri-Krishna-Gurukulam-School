"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { Crest } from "@/components/brand/Crest";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { navLinks, site, getWhatsAppHref, type SchoolSettings } from "@/lib/site";

export function SiteHeader({ settings }: { settings: SchoolSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-navy-deep text-cream/85">
        <div className="wrap flex h-9 items-center justify-between gap-4 text-[0.72rem] font-medium tracking-wide">
          <Link
            href="/admissions"
            className="group inline-flex min-w-0 items-center gap-2 hover:text-cream"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold-pale" aria-hidden="true" />
            <span className="truncate">
              <span className="font-bold text-gold-pale">Admissions Open {site.academicYear}</span>
              <span className="hidden sm:inline text-cream/70"> — {site.board}, {site.classes}</span>
            </span>
            <ArrowRight
              className="hidden h-3.5 w-3.5 shrink-0 text-brand transition-transform group-hover:translate-x-0.5 sm:inline"
              aria-hidden="true"
            />
          </Link>
          <a
            href={getWhatsAppHref(settings.phone, "Namaste! I would like to know more about admissions.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-cream/85 hover:text-white"
            aria-label={`Chat on WhatsApp at ${settings.phone || site.whatsapp.display}`}
          >
            <WhatsAppIcon className="h-3.5 w-3.5 text-[#4fce5d]" />
            <span className="hidden sm:inline">{settings.phone || site.whatsapp.display}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-gold/30 bg-cream-soft/95 shadow-[0_10px_30px_-15px_rgb(26_42_74/0.35)] backdrop-blur-md"
            : "border-gold/20 bg-cream-soft"
        }`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={`${site.name} — home`}>
            <Crest
              size={46}
              className="shrink-0 drop-shadow-[0_3px_8px_rgb(26_42_74/0.3)] transition-transform duration-500 group-hover:rotate-[8deg]"
            />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-heading text-[0.95rem] font-bold text-navy sm:text-lg">
                {settings.short_name || site.shortName} <span className="text-gold">School</span>
              </span>
              <span className="hidden text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ink-soft sm:block">
                Estd {settings.established_year || site.established} · {settings.board || site.board}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`group relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  isActive(link.href) ? "text-navy" : "text-ink-soft hover:text-navy"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-gradient-to-r from-gold to-gold-light transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/admissions" className="btn-primary hidden px-5 py-2.5 md:inline-flex">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Admissions Open
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition hover:border-gold hover:bg-navy/5 lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy-deep/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-3 top-3 bottom-3 overflow-hidden rounded-3xl border border-gold/25 bg-navy shadow-lift transition-all duration-400 ease-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="peacock-glow absolute inset-0" aria-hidden="true" />
          <div className="relative flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crest size={40} />
                <span className="font-heading text-sm font-bold text-cream">
                  Sri Krishna Gurukulam <span className="text-gold-pale">School</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-gold-pale"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  className={`group flex items-center justify-between border-b border-cream/10 py-4 font-heading text-2xl font-semibold transition-all duration-500 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  } ${isActive(link.href) ? "text-gold-pale" : "text-cream hover:text-gold-pale"}`}
                  style={{ transitionDelay: open ? `${90 + i * 55}ms` : "0ms" }}
                >
                  {link.label}
                  <ArrowRight
                    className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                      isActive(link.href) ? "text-gold-pale" : "text-cream/30"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>

            <div
              className={`space-y-3 transition-all delay-300 duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <Link
                href="/admissions"
                tabIndex={open ? 0 : -1}
                className="btn-primary w-full shadow-[0_8px_16px_-6px_rgb(232_132_44/0.4)]"
                onClick={() => setOpen(false)}
              >
                Admissions Open {settings.academic_year || site.academicYear}
              </Link>
              <a
                href={getWhatsAppHref(settings.phone, "Namaste! I would like to know more about admissions.")}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="btn-outline-light w-full"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#4fce5d]" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
