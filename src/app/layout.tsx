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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSchoolSettings();
  const name = settings.school_name || site.name;
  const shortName = settings.short_name || site.shortName;
  const board = settings.board || site.board;
  const classes = settings.classes || site.classes;
  const academicYear = settings.academic_year || site.academicYear;
  const tagline = settings.tagline || site.tagline;
  
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${name} — ${board} | ${classes}`,
      template: `%s | ${shortName} School`,
    },
    description: `${name} — a gurukulam-inspired ${board} school offering classes ${classes} with disciplined, value-based, English-medium education. Admissions open for ${academicYear}.`,
    keywords: [
      name,
      shortName,
      "SSC school",
      "gurukulam school",
      "admissions open",
      "IIT NEET foundation school",
      "hostel school",
    ],
    openGraph: {
      type: "website",
      title: name,
      description: tagline,
      siteName: name,
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSchoolSettings();

  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: settings.school_name || site.name,
    alternateName: settings.short_name || site.shortName,
    slogan: settings.tagline || site.tagline,
    foundingDate: settings.established_year || site.established,
    description: `${settings.board || site.board} school with classes ${settings.classes || site.classes}, gurukulam values and modern academic standards.`,
  };

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
