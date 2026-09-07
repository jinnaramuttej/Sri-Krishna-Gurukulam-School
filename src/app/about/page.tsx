import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarCheck2, GraduationCap, HandHeart, HeartHandshake, Landmark, Lightbulb, MapPin, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Placeholder, PlaceholderTag } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — an ${site.board} school for classes ${site.classes}, established ${site.established}, blending gurukulam values with modern academic standards.`,
};

const glance = [
  { icon: Landmark, label: "School Name", value: site.name },
  { icon: GraduationCap, label: "Board", value: site.board },
  { icon: BookOpen, label: "Classes", value: site.classes },
  { icon: CalendarCheck2, label: "Established", value: site.established },
  { icon: MapPin, label: "Location", value: null }, // placeholder
  { icon: Lightbulb, label: "Learning Atmosphere", value: "Complete English Atmosphere" },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Respect",
    text: "Reverence for gurus, parents, peers and self — the first lesson of the gurukulam.",
  },
  {
    icon: ShieldCheck,
    title: "Discipline",
    text: "A calm, orderly daily rhythm that lets every child focus, flourish and feel safe.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    text: "Questions are honoured here — understanding always comes before memorising.",
  },
  {
    icon: HandHeart,
    title: "Service",
    text: "Children learn that knowledge finds its purpose in serving family and society.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Our School"
        title={
          <>
            A <span className="italic text-gold-pale">Gurukulam</span> for the Modern Generation
          </>
        }
        lead={`${site.name} brings together the discipline and values of a traditional gurukulam with the academic rigour of a modern ${site.board} school.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* School at a glance */}
      <section className="py-16 sm:py-20" aria-labelledby="glance-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="School at a Glance"
            title="The Essentials, at One Glance"
            lead="Key facts about the school as shared by the management."
          />
          <dl className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {glance.map(({ icon: Icon, label, value }, i) => (
              <Reveal key={label} delay={(i % 2) * 80}>
                <div className="card flex h-full items-start gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-navy/[0.05]">
                    <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">{label}</dt>
                    <dd className="mt-1 font-heading text-lg font-semibold leading-snug text-navy">
                      {value ?? <PlaceholderTag>Placeholder — awaiting location</PlaceholderTag>}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-cream-deep/40 py-16 sm:py-20" aria-labelledby="vision-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Vision & Mission"
            title="Where We Are Headed"
            lead="The driving philosophy behind our educational approach."
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <Reveal>
              <article className="card h-full p-6 sm:p-8">
                <h3 id="vision-heading" className="font-heading text-2xl font-bold text-navy">
                  Our Vision
                </h3>
                <div className="gold-rule mt-4 justify-start" aria-hidden="true">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                </div>
                <p className="mt-5 text-ink-soft leading-relaxed">
                  We believe every child deserves quality English-medium education combined with strong discipline and values, without needing large fees or big infrastructure — just a genuine commitment to each student&apos;s growth.
                </p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="card h-full p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold text-navy">Our Mission</h3>
                <div className="gold-rule mt-4 justify-start" aria-hidden="true">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                </div>
                <p className="mt-5 text-ink-soft leading-relaxed">
                  To build well-rounded students through structured academics, individual attention in small batches, and a foundation strong enough for competitive exams (IIT/NEET) — while never losing sight of discipline and traditional values.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 sm:py-20" aria-labelledby="leadership-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Our Leadership"
            title="Guiding the Gurukulam"
            lead="Meet the experienced educators leading our institution."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal>
              <article className="card flex h-full flex-col p-6 sm:p-8">
                <div className="mb-6 aspect-square w-full max-w-[240px] mx-auto overflow-hidden rounded-2xl bg-navy/[0.03]">
                  <Placeholder
                    kind="photo"
                    label="PHOTO NEEDED — Director Portrait"
                    note="Portrait of Krishna Bhumarapu cropped from academy banner"
                    className="h-full w-full border-none"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl font-bold text-navy">Krishna Bhumarapu</h3>
                  <p className="mt-1 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-gold">Director</p>
                  <div className="gold-rule mx-auto mt-4 mb-4" aria-hidden="true">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    13 years of experience in English-medium education, running Krishna&apos;s Skill Training Academy since 2020, specializing in IIT/NEET foundation coaching.
                  </p>
                </div>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="card flex h-full flex-col p-6 sm:p-8">
                <div className="mb-6 aspect-square w-full max-w-[240px] mx-auto overflow-hidden rounded-2xl bg-navy/[0.03]">
                  <Placeholder
                    kind="photo"
                    label="PHOTO NEEDED — Principal Portrait"
                    note="Portrait of Swetha Bhumarapu cropped from academy banner"
                    className="h-full w-full border-none"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl font-bold text-navy">Swetha Bhumarapu</h3>
                  <p className="mt-1 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-gold">Head Counselor/Principal</p>
                  <div className="gold-rule mx-auto mt-4 mb-4" aria-hidden="true">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    13 years of experience in English-medium education, running Krishna&apos;s Skill Training Academy since 2020, specializing in IIT/NEET foundation coaching.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Guiding values */}
      <section className="py-16 sm:py-20" aria-labelledby="values-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Our Guiding Values"
            title="Old Values, Taught With Care"
            lead="The timeless values every Gurukulam child carries into the modern world."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <article className="card card-hover h-full p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-br from-navy to-navy-soft">
                    <Icon className="h-5 w-5 text-gold-pale" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150} className="mt-12 text-center">
            <Link href="/admissions" className="btn-gold">
              Begin Admission Enquiry
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
