import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PeacockEye } from "@/components/brand/PeacockEye";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { getSchoolSettings, getWhatsAppHref } from "@/utils/settings";

/** Closing contact / admissions call-to-action for the homepage. */
export async function HomeCta() {
  const settings = await getSchoolSettings();
  
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-cream sm:py-24" aria-labelledby="cta-heading">
      <div className="peacock-glow absolute inset-0" aria-hidden="true" />
      <PeacockEye className="absolute -left-20 -bottom-10 h-96 w-64 -rotate-[14deg] opacity-[0.1]" />
      <PeacockEye className="absolute -right-20 -top-16 h-96 w-64 rotate-[22deg] opacity-[0.12]" />

      <div className="wrap relative text-center">
        <Reveal>
          <p className="eyebrow justify-center !tracking-[0.34em] text-gold-pale">
            Admissions Open · {site.academicYear}
          </p>
          <h2 id="cta-heading" className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold leading-[1.12] text-cream sm:text-5xl">
            Give Your Child the <span className="italic text-gold-pale">Gurukulam</span> Beginning
          </h2>
          <div className="gold-rule mt-6 text-gold-pale" aria-hidden="true">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-pale" />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/70">
            Seats are limited for the {site.academicYear} academic year, from Nursery to Class X. Speak with our
            admissions team on WhatsApp or send an enquiry in a minute.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href={getWhatsAppHref(settings.phone, "Namaste! I would like to enquire about admissions for " + site.academicYear + ".")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full border border-[#4fce5d]/50 bg-[#1fae53] text-white shadow-[0_12px_28px_-10px_rgb(31_174_83/0.6)] hover:-translate-y-0.5 hover:bg-[#23c05c] sm:w-auto"
            aria-label={`Chat on WhatsApp at ${settings.phone || site.whatsapp.display}`}
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp {settings.phone || site.whatsapp.display}
          </a>
          <Link href="/admissions#enquiry-form" className="btn-outline-light w-full sm:w-auto">
            Fill the Enquiry Form
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={240}>
          {!settings.phone && (
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-cream/40">
              [Placeholder WhatsApp number — awaiting confirmation from school]
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
