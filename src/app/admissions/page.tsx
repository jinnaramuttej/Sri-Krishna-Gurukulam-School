import type { Metadata } from "next";
import { BadgeCheck, ClipboardList, MessagesSquare, School, Sparkles, TentTree } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { PageHero } from "@/components/layout/PageHero";
import { AdmissionForm } from "@/components/admissions/AdmissionForm";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { getSchoolSettings } from "@/utils/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSchoolSettings();
  const name = settings.school_name || site.name;
  return {
    title: "Admissions",
    description: `Admissions open for ${settings.academic_year || site.academicYear} at ${name} — classes ${settings.classes || site.classes}, ${settings.board || site.board}. Send an enquiry today.`,
  };
}

const classGroups = [
  { stage: "Pre-Primary", classes: ["Nursery", "LKG", "UKG"] },
  { stage: "Primary", classes: ["Class I", "Class II", "Class III", "Class IV", "Class V"] },
  { stage: "Upper Primary", classes: ["Class VI", "Class VII"] },
  { stage: "Secondary", classes: ["Class VIII", "Class IX", "Class X"] },
];

const steps = [
  {
    icon: MessagesSquare,
    title: "Enquire on WhatsApp",
    text: "Message us with your child's name and the class you are seeking. We answer promptly.",
  },
  {
    icon: TentTree,
    title: "Visit the Campus",
    text: "Walk through the gurukulam, meet our teachers and experience the atmosphere first-hand.",
  },
  {
    icon: ClipboardList,
    title: "Submit the Enquiry",
    text: "Share your details through the form below or at the school office to register interest.",
  },
  {
    icon: BadgeCheck,
    title: "Confirm the Seat",
    text: "The school office will guide you through documents, fees and the final confirmation.",
  },
];

export default async function AdmissionsPage() {
  const supabase = await createClient();
  const { data: fees } = await supabase.from("fees").select("*").order("class_name", { ascending: true });
  const settings = await getSchoolSettings();

  return (
    <>
      <PageHero
        eyebrow={`Admissions Open · ${settings.academic_year || site.academicYear}`}
        title={
          <>
            Begin Your Child's <span className="italic text-gold-pale">Gurukulam Journey</span>
          </>
        }
        lead={`Admissions are now open for ${settings.academic_year || site.academicYear}, from ${settings.classes || site.classes} under the ${settings.board || site.board}. Seats are limited in every class.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />

      {/* Status banner */}
      <section className="wrap relative z-10 -mt-8 sm:-mt-10" aria-label="Admission status">
        <Reveal>
          <div className="card flex flex-col items-center gap-4 border-brand/30 bg-gradient-to-br from-brand/[0.07] to-cream-soft p-6 text-center sm:flex-row sm:justify-between sm:p-7 sm:text-left">
            <div className="flex items-center gap-4">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_24px_-8px_rgb(43_127_212/0.7)]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-xl font-bold text-navy sm:text-2xl">
                  Admissions Open <span className="text-brand">{settings.academic_year || site.academicYear}</span>
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {settings.classes || site.classes} · {settings.board || site.board} · Limited Seats
                </p>
              </div>
            </div>
            <a href="#enquiry-form" className="btn-primary px-6 py-2.5">
              Enquire Now
            </a>
          </div>
        </Reveal>
      </section>

      {/* Classes offered */}
      <section className="py-16 sm:py-20" aria-labelledby="classes-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Classes Offered"
            title="From First Steps to Class X"
            lead={`${settings.short_name || site.shortName} School offers continuous schooling across four stages under the ${settings.board || site.board}.`}
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {classGroups.map(({ stage, classes }, i) => (
              <Reveal key={stage} delay={(i % 2) * 90}>
                <article className="card card-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-navy/[0.05]">
                      <School className="h-5 w-5 text-gold" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-navy">{stage}</h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${stage} classes`}>
                    {classes.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-navy/15 bg-cream px-3.5 py-1.5 text-xs font-semibold text-navy"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Admission steps */}
      <section className="bg-cream-deep/40 py-16 sm:py-20" aria-labelledby="steps-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="How to Apply"
            title="Four Simple Steps"
            lead="The detailed admission process and important dates will be confirmed by the school office."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
                <li className="card card-hover relative h-full p-6 pt-8">
                  <span
                    className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gold font-heading text-sm font-bold text-cream-soft shadow-[0_6px_14px_-4px_rgb(139_111_63/0.7)]"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <h3 className="mt-3.5 font-heading text-lg font-bold leading-snug text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="mx-auto mt-12 max-w-4xl">
            {fees && fees.length > 0 ? (
              <div className="card overflow-hidden border-brand/20">
                <div className="bg-cream-deep p-6 border-b border-brand/10">
                  <h3 className="font-heading text-xl font-bold text-navy">Fee Structure {settings.academic_year || site.academicYear}</h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    The tuition fee structure as applicable for the current academic session. For any queries regarding sibling discounts or transport fees, please contact the office.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-brand/5 text-navy font-bold">
                      <tr>
                        <th className="p-4 sm:px-6 border-b border-brand/10 w-1/3">Class</th>
                        <th className="p-4 sm:px-6 border-b border-brand/10 w-1/3">Tuition Fee</th>
                        <th className="p-4 sm:px-6 border-b border-brand/10 w-1/3">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand/10 bg-white">
                      {fees.map((fee) => (
                        <tr key={fee.id} className="hover:bg-cream-soft/50 transition">
                          <td className="p-4 sm:px-6 font-semibold text-navy">{fee.class_name}</td>
                          <td className="p-4 sm:px-6 text-brand font-medium">{fee.amount}</td>
                          <td className="p-4 sm:px-6 text-ink-soft truncate max-w-[200px]" title={fee.notes || ""}>{fee.notes || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <Placeholder
                kind="copy"
                label="FEE STRUCTURE — awaiting updates"
                note="The detailed fee structure will be published here shortly."
                className="min-h-28"
              />
            )}
          </Reveal>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry-form" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="form-heading">
        <div className="wrap max-w-3xl">
          <SectionHeading
            eyebrow="Admission Enquiry Form"
            title="Tell Us About Your Child"
            lead="Fill this short form and we will guide you personally. Fields marked * are required."
          />
          <Reveal delay={120} className="mt-10">
            <AdmissionForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
