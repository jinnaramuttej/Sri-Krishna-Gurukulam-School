import Link from "next/link";
import { ArrowRight, BedDouble, Bus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** Gold banner strip echoing the poster's brown facilities banner. */
export function FacilitiesBand() {
  return (
    <section
      className="relative overflow-hidden bg-gold py-14 text-cream-soft sm:py-16"
      aria-labelledby="facilities-band-heading"
    >
      <div className="ring-pattern absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/50 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-navy-deep/40 to-transparent" aria-hidden="true" />

      <div className="wrap relative">
        <Reveal className="text-center">
          <p className="eyebrow justify-center tracking-[0.34em] text-cream/90">Campus Facilities</p>
          <h2 id="facilities-band-heading" className="sr-only">
            Vehicle and hostel facilities
          </h2>
        </Reveal>

        <div className="mt-9 flex flex-col items-stretch gap-8 md:flex-row md:items-center md:justify-center md:gap-12">
          <Reveal className="md:flex-1 md:max-w-md">
            <div className="flex items-center gap-5 md:justify-end">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-cream/40 bg-navy shadow-[0_10px_26px_-10px_rgb(16_28_51/0.8)]">
                <Bus className="h-7 w-7 text-gold-pale" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-2xl font-bold">Vehicle Facility</h3>
                <p className="mt-1 max-w-[26ch] text-sm leading-snug text-cream/85">
                  Safe, supervised school transport for the daily commute.
                </p>
              </div>
            </div>
          </Reveal>

          <span
            className="hidden h-20 w-px shrink-0 bg-gradient-to-b from-transparent via-cream/45 to-transparent md:block"
            aria-hidden="true"
          />

          <Reveal delay={120} className="md:flex-1 md:max-w-md">
            <div className="flex items-center gap-5 md:justify-start">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-cream/40 bg-navy shadow-[0_10px_26px_-10px_rgb(16_28_51/0.8)]">
                <BedDouble className="h-7 w-7 text-gold-pale" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-2xl font-bold">Hostel Facility</h3>
                <p className="mt-1 max-w-[26ch] text-sm leading-snug text-cream/85">
                  A caring, disciplined residential stay in the gurukulam spirit.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <Link
            href="/facilities"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-cream underline-offset-8 transition hover:text-navy-deep hover:underline"
          >
            Explore All Facilities
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
