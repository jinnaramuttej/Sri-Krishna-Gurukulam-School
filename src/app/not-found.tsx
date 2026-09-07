import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Crest } from "@/components/brand/Crest";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-20">
      <div className="wrap relative text-center">
        <Crest size={84} className="mx-auto opacity-90" />
        <p className="mt-8 font-heading text-7xl font-bold text-navy sm:text-8xl">404</p>
        <div className="gold-rule mt-5" aria-hidden="true">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
        </div>
        <h1 className="mt-5 font-heading text-2xl font-bold text-navy">This page has wandered off the path</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          The page you are looking for doesn’t exist or may have been moved. Let us guide you back.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
