import type { Metadata } from "next";
import { Clock, MapPin, UserRound } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Placeholder, PlaceholderTag } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { getSchoolSettings, getWhatsAppHref } from "@/utils/settings";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — reach the admissions office on WhatsApp, find the campus on the map, and meet the Principal and Correspondent.`,
};

const leaders = [
  { role: "Principal", name: site.leadership.principal },
  { role: "Correspondent", name: site.leadership.correspondent },
];

export default async function ContactPage() {
  const settings = await getSchoolSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            We Would Love to <span className="italic text-gold-pale">Hear From You</span>
          </>
        }
        lead="Questions about admissions, transport or hostel? Message us on WhatsApp — we respond warmly and quickly."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-16 sm:py-20" aria-label="Contact details and map">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Contact cards */}
          <div className="space-y-5">
            <Reveal>
              <article className="card card-hover p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1fae53]/15 text-[#1fae53]">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-heading text-xl font-bold text-navy">WhatsApp</h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      Fastest way to reach the admissions office.
                    </p>
                    <p className="mt-3 font-heading text-2xl font-bold tracking-wide text-navy">
                      {settings.phone || site.whatsapp.display}
                    </p>
                    {!settings.phone && <PlaceholderTag>Placeholder number — awaiting confirmation</PlaceholderTag>}
                    <div className="mt-4">
                      <a
                        href={getWhatsAppHref(settings.phone, "Namaste! I have a question about the school.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn border border-[#4fce5d]/50 bg-[#1fae53] text-white hover:-translate-y-0.5 hover:bg-[#23c05c]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={90}>
              <article className="card card-hover p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-navy/[0.05]">
                    <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-navy">Visit the Campus</h2>
                    <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
                      {settings.address ? (
                        settings.address.split('\n').map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))
                      ) : (
                        site.address.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))
                      )}
                    </address>
                    {!settings.address && (
                      <div className="mt-3">
                        <PlaceholderTag>Placeholder — awaiting full address</PlaceholderTag>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="card card-hover p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-navy/[0.05]">
                    <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-navy">School & Office Hours</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      Detailed school timings and office hours will be published shortly.
                    </p>
                    <div className="mt-3">
                      <PlaceholderTag>Placeholder — awaiting timings</PlaceholderTag>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={120} className="lg:sticky lg:top-32 lg:self-start">
            <div className="card overflow-hidden p-2.5">
              <iframe
                title={`Map showing location of ${site.name}`}
                src={settings.map_url || site.mapEmbedUrl}
                className="h-80 w-full rounded-xl border-0 sm:h-[26rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {!settings.map_url && (
                <p className="flex flex-wrap items-center justify-center gap-2 px-4 py-3 text-center text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft">
                  <span className="placeholder-tag">[Placeholder map pin]</span>
                  Exact Google Maps location will replace this once shared by the school.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-cream-deep/40 py-16 sm:py-20" aria-labelledby="leadership-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="School Leadership"
            title="Guided by Experienced Hands"
            lead="Meet the people who lead the gurukulam's academic and administrative vision."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {leaders.map(({ role, name }, i) => (
              <Reveal key={role} delay={i * 100}>
                <article className="card card-hover h-full p-7 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/30 bg-gradient-to-br from-navy to-navy-soft shadow-card">
                    <UserRound className="h-7 w-7 text-gold-pale" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-gold">{role}</h3>
                  <p className="mt-2 font-heading text-xl font-bold text-navy">{name}</p>
                  <div className="mt-3">
                    <PlaceholderTag>{`Placeholder — ${role}'s name awaited`}</PlaceholderTag>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    A short message from the {role.toLowerCase()} will appear here once approved by the school.
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
