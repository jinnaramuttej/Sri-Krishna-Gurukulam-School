/**
 * Central site configuration for Sri Balaji's Sri Krishna Gurukulam School.
 * Single source of truth — the client can update contact details here once confirmed.
 *
 * NOTE: Items marked PLACEHOLDER are intentionally not real data and are
 * rendered with visible placeholder tags across the site.
 */

export const site = {
  name: "Sri Balaji's Sri Krishna Gurukulam School",
  shortName: "Sri Krishna Gurukulam",
  parentBrand: "Sri Balaji's",
  tagline: "A Right Choice for Your Children's Bright Future",
  board: "SSC Board",
  classes: "Nursery – Class X",
  established: "2026",
  academicYear: "2026–27",

  /** PLACEHOLDER — awaiting confirmed WhatsApp number from client */
  whatsapp: {
    display: "+91 XXXXX XXXXX",
    number: "91XXXXXXXXXX",
    isPlaceholder: true,
  },

  /** PLACEHOLDER — awaiting confirmed address from client */
  address: {
    lines: ["School Campus Address", "Village / Town, District", "State – PIN Code"],
    isPlaceholder: true,
  },

  /** PLACEHOLDER — awaiting names from client */
  leadership: {
    principal: "Name to be announced",
    correspondent: "Name to be announced",
    isPlaceholder: true,
  },

  /**
   * Google Maps embed — currently a generic search for the school name.
   * PLACEHOLDER — replace with the exact share-link embed once the
   * school's Google Maps pin is provided by the client.
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Sri+Balaji%27s+Sri+Krishna+Gurukulam+School&output=embed",
  mapIsPlaceholder: true,

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/facilities", label: "Facilities" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
] as const;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
