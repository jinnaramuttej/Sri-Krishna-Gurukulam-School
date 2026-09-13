import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { Crest } from "@/components/brand/Crest";
import { PeacockEye } from "@/components/brand/PeacockEye";
import { Reveal } from "@/components/ui/Reveal";
import { site, type SchoolSettings } from "@/lib/site";
import { getSchoolSettings } from "@/utils/settings";

export async function Hero() {
  const settings = await getSchoolSettings();

  const chips = [
    { icon: GraduationCap, label: settings.board || site.board },
    { icon: BookOpen, label: `Classes ${settings.classes || site.classes}` },
    { icon: Sparkles, label: `Estd ${settings.established_year || site.established}` },
  ];
  return (
    <section className="relative overflow-hidden bg-navy text-cream" aria-labelledby="hero-heading">
      {/* Ambient layers */}
      <div className="peacock-glow absolute inset-0" aria-hidden="true" />
      <PeacockEye className="absolute -left-14 top-16 h-[26rem] w-72 -rotate-[16deg] opacity-[0.13]" />
      <PeacockEye className="absolute -right-16 bottom-24 h-[24rem] w-64 rotate-[20deg] opacity-[0.1]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-pale/50 to-transparent" aria-hidden="true" />

      <div className="wrap relative flex flex-col items-center pb-20 pt-14 text-center sm:pt-16">
        {/* Crest with slowly rotating dashed orbit */}
        <Reveal>
          <div className="relative inline-flex animate-float">
            <svg
              viewBox="0 0 200 200"
              className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] animate-spin-slower"
              aria-hidden="true"
            >
              <circle cx="100" cy="100" r="96" fill="none" stroke="#d9c9a3" strokeWidth="1" strokeDasharray="2 8" opacity="0.8" />
              <circle cx="100" cy="4" r="2.5" fill="#e8842c" />
            </svg>
            <div className="rounded-full shadow-glow">
              <Crest size={148} className="sm:hidden" />
              <Crest size={172} className="hidden sm:block" />
            </div>
          </div>
        </Reveal>

        {/* Name */}
        <Reveal>
          <h1 id="hero-heading" className="mx-auto mt-4 font-heading text-4xl font-bold leading-[1.08] text-cream sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            {settings.short_name || site.shortName}
            <span className="mt-2 block text-2xl tracking-[0.24em] text-gold-pale sm:mt-4 sm:text-3xl md:text-4xl">
              SCHOOL
            </span>
          </h1>
          <div className="gold-rule mt-8 text-gold-pale" aria-hidden="true">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-pale" />
          </div>
          <p className="mx-auto mt-7 max-w-xl font-heading text-lg italic text-cream/75 sm:text-xl md:text-2xl">
            “{settings.tagline || site.tagline}”
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={220} className="mt-9 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row">
          <Link href="/admissions" className="btn-primary w-full sm:w-auto">
            Admissions Open — Apply Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link href="/about" className="btn-outline-light w-full sm:w-auto">
            Explore the Gurukulam
          </Link>
        </Reveal>

        {/* Quick fact chips */}
        <Reveal delay={320}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5" aria-label="Quick facts">
            {chips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.06] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream/80 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-gold-pale" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Wave into cream */}
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" className="relative block h-[52px] w-full sm:h-[72px]">
        <path d="M0 58 C 320 118 480 8 760 34 C 1040 60 1180 96 1440 40 L1440 90 L0 90 Z" fill="#f5efe0" />
        <path d="M0 58 C 320 118 480 8 760 34 C 1040 60 1180 96 1440 40" fill="none" stroke="#b28f52" strokeWidth="1.6" opacity="0.55" />
      </svg>
    </section>
  );
}
