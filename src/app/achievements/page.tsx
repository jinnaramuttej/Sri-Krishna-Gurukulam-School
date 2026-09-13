import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Award, Target, Trophy, GraduationCap, Building } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { site } from "@/lib/site";
import { getSchoolSettings } from "@/utils/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSchoolSettings();
  const name = settings.school_name || site.name;
  return {
    title: "Achievements",
    description: `Track record and legacy of the founding team behind ${name}.`,
  };
}

const legacyStats = [
  { icon: Building, label: "Established", value: "2020 in Khajipet" },
  { icon: Award, label: "NMMS", value: "Consistent Selections" },
  { icon: Target, label: "Navodaya & Sainik", value: "Top Ranks" },
  { icon: Trophy, label: "IIT Foundation", value: "Strong Baseline" },
  { icon: CheckCircle, label: "Polytechnic & APRJC", value: "Proven Results" },
  { icon: GraduationCap, label: "10th Board", value: "Excellent Pass Rate" },
];

export default async function AchievementsPage() {
  const settings = await getSchoolSettings();

  return (
    <>
      <PageHero
        eyebrow="Our Track Record"
        title={
          <>
            A Legacy of <span className="italic text-gold-pale">Excellence</span>
          </>
        }
        lead="Discover the proven track record of our founding team, built over years of dedication to student success."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Achievements" }]}
      />

      {/* Our Legacy Section */}
      <section className="py-16 sm:py-20 bg-cream-deep/40" aria-labelledby="legacy-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Our Legacy — Krishna's Skill Training Academy (2020–Present)"
            title="A Proven Foundation"
            lead="Before establishing Sri Krishna Gurukulam School, our core team ran a highly successful coaching institute in Khajipet, Kadapa District, delivering exceptional results across competitive exams."
          />
          
          <div className="mx-auto mt-12 grid gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px]">
            <div>
              <Reveal>
                <div className="prose prose-navy max-w-none text-ink-soft">
                  <p className="text-lg leading-relaxed">
                    While <strong>{settings.school_name || site.name}</strong> is a new chapter beginning in {settings.established_year || site.established}, the team behind it brings years of proven expertise. Since 2020, <em>Krishna&apos;s Skill Training Academy</em> has been a cornerstone of quality education in Khajipet.
                  </p>
                  <p className="mt-4 leading-relaxed">
                    Our rigorous methodology and dedicated focus on foundational concepts have led to consistent student selections across a wide range of prestigious and highly competitive examinations, including:
                  </p>
                </div>
              </Reveal>

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {legacyStats.map(({ icon: Icon, label, value }, i) => (
                  <Reveal key={label} delay={i * 50}>
                    <div className="card bg-white flex h-full flex-col items-center justify-center p-5 text-center">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-navy/[0.05]">
                        <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                      </span>
                      <dt className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-gold">{label}</dt>
                      <dd className="mt-1 text-sm font-semibold text-navy">{value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            <Reveal delay={150}>
              <div className="h-full w-full max-w-xl mx-auto lg:max-w-none flex flex-col">
                <div className="text-center mb-4">
                  <h3 className="font-heading text-lg font-bold text-navy">Academy Results Gallery</h3>
                  <div className="gold-rule mx-auto mt-2" aria-hidden="true">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                  </div>
                </div>
                <div className="flex-1 w-full relative">
                  <ImageLightbox triggerLabel="View Full Results Graphic">
                    <Image
                      src="/images/academy-results.jpg"
                      alt="WhatsApp-exported dense results graphic for Krishna's Skill Training Academy"
                      width={1000}
                      height={1000}
                      className="aspect-[3/4] w-full min-h-[400px] object-cover rounded-xl"
                    />
                  </ImageLightbox>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
