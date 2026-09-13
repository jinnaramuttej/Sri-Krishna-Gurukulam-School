/**
 * Central site configuration for Sri Balaji's Sri Krishna Gurukulam School.
 * Single source of truth — the client can update contact details here once confirmed.
 *
 * NOTE: Items marked PLACEHOLDER are intentionally not real data and are
 * rendered with visible placeholder tags across the site.
 */

export const site = {
  name: "Sri Krishna Gurukulam School",
  shortName: "Sri Krishna Gurukulam",
  tagline: "A Right Choice for Your Children's Bright Future",
  board: "SSC Board",
  classes: "Nursery to X Class",
  established: "2026",
  academicYear: "2026–27",

  whatsapp: {
    display: "+91 91213 17327",
    number: "919121317327",
  },

  address: {
    lines: ["M.L.A. Street, Mydukur Road", "Khajipet, Kadapa"],
  },

  leadership: {
    principal: "Swetha Bhumarapu",
    correspondent: "Krishna Bhumarapu",
  },

  /**
   * Google Maps embed — currently a generic search for the school name.
   * PLACEHOLDER — replace with the exact share-link embed once the
   * school's Google Maps pin is provided by the client.
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Sri+Krishna+Gurukulam+School+Khajipet+Kadapa&output=embed",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
] as const;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type SchoolSettings = {
  phone: string | null;
  email: string | null;
  address: string | null;
  map_url: string | null;
};

export function getWhatsAppHref(phone: string | null, message?: string) {
  const defaultNumber = site.whatsapp.number;
  const cleanNumber = phone ? phone.replace(/\D/g, "") : defaultNumber;
  const base = `https://wa.me/${cleanNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
