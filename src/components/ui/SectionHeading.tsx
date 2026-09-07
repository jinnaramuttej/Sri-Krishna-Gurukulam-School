import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  /** light = on cream backgrounds, dark = on navy backgrounds */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : "text-left"} max-w-2xl ${className}`}>
      <p className={`eyebrow ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
        {eyebrow}
        {centered ? <span className="h-px w-6 bg-gold/70" aria-hidden="true" /> : null}
      </p>
      <h2
        className={`mt-4 font-heading text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.75rem] ${
          tone === "dark" ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {centered ? (
        <div className="gold-rule mt-5" aria-hidden="true">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
        </div>
      ) : null}
      {lead ? (
        <p className={`mt-4 text-[0.95rem] leading-relaxed ${tone === "dark" ? "text-cream/75" : "text-ink-soft"}`}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
