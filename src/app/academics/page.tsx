import type { Metadata } from "next";
import { BookOpen, Calculator, Computer, GraduationCap, Languages, Brain, Pencil, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Academics & Curriculum",
  description: `Explore the academic and skill-building programs at ${site.name}.`,
};

const earlyYearsItems = [
  { icon: Languages, title: "Telugu Alphabet" },
  { icon: Languages, title: "Hindi Alphabet" },
  { icon: Sparkles, title: "English Rhymes" },
  { icon: Sparkles, title: "Telugu Rhymes" },
  { icon: BookOpen, title: "General Knowledge" },
  { icon: Calculator, title: "Number Games" },
  { icon: Brain, title: "Puzzles" },
];

const skillPrograms = [
  { 
    icon: Calculator, 
    title: "Abacus", 
    desc: "Fast mental maths" 
  },
  { 
    icon: Brain, 
    title: "Vedic Maths", 
    desc: "Quick calculation techniques" 
  },
  { 
    icon: Computer, 
    title: "Computer Education", 
    desc: "Digital literacy and basics" 
  },
  { 
    icon: Pencil, 
    title: "Handwriting Improvement", 
    desc: "Structured training" 
  },
  { 
    icon: GraduationCap, 
    title: "Navodaya & Sainik Entrance", 
    desc: "Long-term coaching (from Class 4) & short-term (from Class 5)" 
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Curriculum & Programs"
        title={
          <>
            Academic <span className="italic text-gold-pale">Excellence</span>
          </>
        }
        lead={`A structured approach blending traditional subjects with specialized skill programs to ensure well-rounded development.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Academics" }]}
      />

      {/* Early Years Program */}
      <section className="py-16 sm:py-20" aria-labelledby="early-years-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Early Years Foundation"
            title="Nursery, LKG & UKG"
            lead="A structured 45-day foundation program designed to spark curiosity and build essential early skills."
          />
          
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mx-auto max-w-5xl">
            {earlyYearsItems.map(({ icon: Icon, title }, i) => (
              <Reveal key={title} delay={i * 50}>
                <div className="card flex items-center gap-4 p-5 sm:p-6 transition-all hover:border-gold/50 hover:shadow-md h-full">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-navy/[0.05]">
                    <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy leading-tight">{title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Programs */}
      <section className="bg-cream-deep/40 py-16 sm:py-20" aria-labelledby="skill-programs-heading">
        <div className="wrap">
          <SectionHeading
            eyebrow="Advanced Skill Building"
            title="Classes 1 to 10"
            lead="Dedicated skill enhancement programs and specialized entrance coaching to prepare students for competitive success."
          />
          
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
            {skillPrograms.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 50}>
                <article className="card card-hover flex h-full flex-col p-6 sm:p-8 bg-white text-center items-center">
                  <span className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-br from-navy to-navy-soft">
                    <Icon className="h-6 w-6 text-gold-pale" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
                  <div className="gold-rule mx-auto mt-3 mb-3" aria-hidden="true">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">{desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
