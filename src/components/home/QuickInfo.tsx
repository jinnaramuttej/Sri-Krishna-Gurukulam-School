import { BookOpen, CalendarCheck2, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

import { getSchoolSettings } from "@/utils/settings";

/** Quick info bar — key facts in cards overlapping the hero wave. */
export async function QuickInfo() {
  const settings = await getSchoolSettings();

  const facts = [
    {
      icon: BookOpen,
      value: settings.classes || site.classes,
      label: "Classes Offered",
      note: "Foundational to secondary schooling",
    },
    {
      icon: GraduationCap,
      value: settings.board || site.board,
      label: "Board of Education",
      note: "State SSC curriculum",
    },
    {
      icon: CalendarCheck2,
      value: settings.established_year || site.established,
      label: "Established",
      note: "A new gurukulam for a new generation",
    },
  ];

  return (
    <section aria-label="School at a glance" className="wrap relative z-10 -mt-4 sm:-mt-8">
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {facts.map(({ icon: Icon, value, label, note }, i) => (
          <Reveal key={label} delay={i * 90}>
            <div className="card card-hover flex h-full items-center gap-4 p-5 sm:p-6">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-navy/[0.05] sm:h-14 sm:w-14">
                <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-2xl font-bold leading-none text-navy">{value}</p>
                <p className="mt-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold">{label}</p>
                <p className="mt-1 text-xs leading-snug text-ink-soft">{note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
