import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Zilla_Slab } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/lib/site";
import { getSchoolSettings } from "@/utils/settings";
import "./globals.css";

const heading = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-zilla",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.board} | ${site.classes}`,
    template: `%s | ${site.shortName} School`,
  },
  description: `${site.name} — a gurukulam-inspired ${site.board} school offering classes ${site.classes} with disciplined, value-based, English-medium education. Admissions open for ${site.academicYear}.`,
  keywords: [
    "Sri Krishna Gurukulam School",
    "Sri Balaji's school",
    "SSC school",
    "gurukulam school",
    "admissions open",
    "IIT NEET foundation school",
    "hostel school",
  ],
  openGraph: {
    type: "website",
    title: site.name,
    description: site.tagline,
    siteName: site.name,
  },
};

const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  foundingDate: site.established,
  description: `${site.board} school with classes ${site.classes}, gurukulam values and modern academic standards.`,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSchoolSettings();

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to main content
        </a>
        <SiteHeader settings={settings} />
        <main id="main-content">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
