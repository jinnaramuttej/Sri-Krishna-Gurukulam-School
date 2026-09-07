import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { PeacockEye } from "@/components/brand/PeacockEye";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumb: { label: string; href?: string }[];
}

/** Shared navy hero band for inner pages. */
export function PageHero({ eyebrow, title, lead, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      <div className="peacock-glow absolute inset-0" aria-hidden="true" />
      <PeacockEye className="absolute -top-16 right-[6%] h-72 w-52 rotate-[24deg] opacity-[0.12]" />
      <PeacockEye className="absolute -bottom-24 left-[2%] h-72 w-52 -rotate-[18deg] opacity-[0.08]" />

      <div className="wrap relative pb-16 pt-14 sm:pb-20 sm:pt-16">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
              {breadcrumb.map((item, i) => (
                <li key={item.label} className="inline-flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight className="h-3 w-3 text-gold-pale/70" aria-hidden="true" /> : null}
                  {item.href ? (
                    <Link href={item.href} className="transition-colors hover:text-cream">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gold-pale" aria-current="page">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className="eyebrow text-gold-pale">
            <span className="h-px w-6 bg-gold-pale/70" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.08] text-cream sm:text-5xl">
            {title}
          </h1>
          <div className="gold-rule mt-6 justify-start text-gold-pale" aria-hidden="true">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-pale" />
          </div>
          {lead ? <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-cream/70">{lead}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
