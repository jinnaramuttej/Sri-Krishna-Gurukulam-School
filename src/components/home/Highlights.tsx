import { Atom, Briefcase, Landmark, Languages, ShieldCheck, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Disciplinary Education",
    text: "A structured daily rhythm that builds self-control, respect and responsibility in every child.",
  },
  {
    icon: Languages,
    title: "Complete English Atmosphere",
    text: "An English-first campus environment where children learn to think, speak and write in English.",
  },
  {
    icon: Target,
    title: "Competitive Exam Preparation",
    text: "Steady, age-wise readiness for scholarship and competitive examinations from the early years.",
  },
  {
    icon: Landmark,
    title: "Teaching With Old Values",
    text: "Gurukulam values — humility, gratitude and reverence for the guru — woven into every lesson.",
  },
  {
    icon: Atom,
    title: "IIT & NEET Standard Education",
    text: "Concept-driven mathematics and science aligned to IIT and NEET level expectations.",
  },
  {
    icon: Briefcase,
    title: "Corporate Level of Education",
    text: "Professional systems, transparency and accountability in academics and administration.",
  },
];

export function Highlights() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="highlights-heading">
      <div className="wrap">
        <SectionHeading
          eyebrow="Why Our Gurukulam"
          title={
            <>
              Rooted in Values, <span className="italic text-gold">Rising</span> with Standards
            </>
          }
          lead="Six pillars from our school's founding promise — traditional gurukulam discipline delivered with modern, corporate-level academic standards."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 90}>
              <article className="card card-hover group relative h-full overflow-hidden p-6 sm:p-7">
                <span
                  className="pointer-events-none absolute -right-2 -top-5 font-heading text-[4.5rem] font-bold leading-none text-gold/10 transition-colors duration-300 group-hover:text-gold/20"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-navy to-navy-soft shadow-[0_8px_18px_-8px_rgb(26_42_74/0.6)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="h-6 w-6 text-gold-pale" aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 font-heading text-xl font-bold leading-snug text-navy">{title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-ink-soft">{text}</p>
                <span
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-light to-gold transition-transform duration-400 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
