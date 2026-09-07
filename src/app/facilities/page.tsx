import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BedDouble, Bus } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Placeholder, PlaceholderTag } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Facilities",
  description: `Facilities at ${site.name} — school vehicle facility and hostel facility, in a disciplined gurukulam atmosphere.`,
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus Facilities"
        title={
          <>
            Comfort That Serves <span className="italic text-gold-pale">Learning</span>
          </>
        }
        lead="Every facility at the gurukulam exists for one purpose — a safe, settled and focused day for your child."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
      />

      {/* Transport */}
      <section id="transport" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="transport-heading">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
              Facility 01
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-navy to-navy-soft shadow-card">
                <Bus className="h-6 w-6 text-gold-pale" aria-hidden="true" />
              </span>
              <h2 id="transport-heading" className="font-heading text-3xl font-bold text-navy sm:text-4xl">
                Vehicle Facility
              </h2>
            </div>
            <div className="gold-rule mt-5 justify-start" aria-hidden="true">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
            </div>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
              The school provides a vehicle facility so that children travel to and from the gurukulam safely and
              on time, giving parents complete peace of mind through the school day.
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              Detailed route coverage, pick-up points, timings and the transport fee structure are being finalised
              and will be published here shortly.
            </p>
            <div className="mt-5">
              <PlaceholderTag>Placeholder — routes & timings awaited</PlaceholderTag>
            </div>
            <div className="mt-7">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-brand transition hover:text-brand-deep"
              >
                Ask About Transport
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Placeholder
              kind="photo"
              label="PHOTO NEEDED — school vehicles / transport"
              note="A real photograph of the school vehicles will be placed here once provided by the school."
              className="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>

      {/* Hostel */}
      <section id="hostel" className="scroll-mt-28 bg-cream-deep/40 py-16 sm:py-20" aria-labelledby="hostel-heading">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="lg:order-2">
            <p className="eyebrow">
              <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
              Facility 02
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-navy to-navy-soft shadow-card">
                <BedDouble className="h-6 w-6 text-gold-pale" aria-hidden="true" />
              </span>
              <h2 id="hostel-heading" className="font-heading text-3xl font-bold text-navy sm:text-4xl">
                Hostel Facility
              </h2>
            </div>
            <div className="gold-rule mt-5 justify-start" aria-hidden="true">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
            </div>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
              For families from farther towns and villages, the gurukulam offers a hostel facility — a residential
              stay shaped by the same discipline, routine and care that define our school day.
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              Details of accommodation, meals, daily routine, supervision and the hostel fee structure are being
              finalised with the school and will be updated here.
            </p>
            <div className="mt-5">
              <PlaceholderTag>Placeholder — hostel details awaited</PlaceholderTag>
            </div>
            <div className="mt-7">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-brand transition hover:text-brand-deep"
              >
                Ask About Hostel
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:order-1">
            <Placeholder
              kind="photo"
              label="PHOTO NEEDED — hostel rooms / dormitory"
              note="A real photograph of the hostel accommodation will be placed here once provided by the school."
              className="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>

      {/* More facilities — placeholder for future */}
      <section className="py-16 sm:py-20" aria-labelledby="more-facilities-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Growing With Every Year"
            title="More Facilities on the Way"
            lead="As a newly established gurukulam, our campus keeps growing — each addition will be announced here with photographs and details."
          />
          <Reveal delay={120} className="mx-auto mt-12 max-w-4xl">
            <Placeholder
              kind="photo"
              label="PHOTO NEEDED — campus & classrooms"
              note="A photo gallery of the campus, classrooms and activities will be added here once real photographs are provided by the school."
              className="aspect-video"
            />
          </Reveal>
          <Reveal delay={180} className="mt-10 text-center">
            <Link href="/admissions" className="btn-gold">
              Admissions Open {site.academicYear} — Enquire Now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
