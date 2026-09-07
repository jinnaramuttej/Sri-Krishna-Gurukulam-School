import Link from "next/link";
import { BedDouble, Bus, GraduationCap, MapPin } from "lucide-react";
import { Crest } from "@/components/brand/Crest";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { navLinks, site, whatsappHref } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-cream/75">
      <div className="ring-pattern absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <div className="wrap grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1.05fr] lg:py-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <Crest size={64} className="drop-shadow-[0_4px_14px_rgb(0_0_0/0.45)]" />
              <div>
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.34em] text-gold-pale">
                  {site.parentBrand}
                </p>
                <p className="font-heading text-lg font-bold leading-tight text-cream">
                  Sri Krishna Gurukulam School
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs font-heading text-sm italic leading-relaxed text-cream/60">
              “{site.tagline}”
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-pale">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              Estd {site.established} · {site.board}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-bold uppercase tracking-[0.26em] text-gold-pale">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-cream"
                  >
                    <span className="h-px w-4 bg-gold/50 transition-all group-hover:w-6 group-hover:bg-gold-pale" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Facilities */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.26em] text-gold-pale">Facilities</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/facilities#transport" className="group inline-flex items-center gap-2.5 transition-colors hover:text-cream">
                  <Bus className="h-4 w-4 text-brand" aria-hidden="true" />
                  Vehicle Facility
                </Link>
              </li>
              <li>
                <Link href="/facilities#hostel" className="group inline-flex items-center gap-2.5 transition-colors hover:text-cream">
                  <BedDouble className="h-4 w-4 text-brand" aria-hidden="true" />
                  Hostel Facility
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="group inline-flex items-center gap-2.5 transition-colors hover:text-cream">
                  <GraduationCap className="h-4 w-4 text-brand" aria-hidden="true" />
                  Classes {site.classes}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.26em] text-gold-pale">Reach Us</h2>
            <address className="mt-5 not-italic">
              <div className="flex items-start gap-2.5 text-sm leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="placeholder-tag mt-2">[Placeholder — awaiting address]</span>
                </div>
              </div>
              <a
                href={whatsappHref("Namaste! I would like to know more about the school.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#4fce5d]/40 bg-[#1fae53]/15 px-5 py-2.5 text-sm font-semibold text-cream transition hover:border-[#4fce5d]/70 hover:bg-[#1fae53]/25"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#4fce5d]" />
                {site.whatsapp.display}
              </a>
              <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.16em] text-cream/40">
                [Placeholder number — awaiting confirmation]
              </span>
            </address>
          </div>
        </div>

        {/* Ornament */}
        <div className="gold-rule text-gold-pale wrap pb-2" aria-hidden="true">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-pale" />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10">
          <div className="wrap flex flex-col items-center justify-between gap-3 py-5 text-[0.7rem] tracking-wide text-cream/45 sm:flex-row">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70" aria-hidden="true" />
              {site.board} · {site.classes} · Estd {site.established}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
