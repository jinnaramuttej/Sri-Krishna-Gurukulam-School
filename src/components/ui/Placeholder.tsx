import { FileText, ImagePlus } from "lucide-react";

interface PlaceholderProps {
  /** What kind of content is missing */
  kind: "photo" | "copy";
  /** Short visible label, e.g. "PHOTO NEEDED — school transport" */
  label: string;
  /** Optional guidance note about what should go here */
  note?: string;
  className?: string;
}

/**
 * Visibly marked placeholder block. Used anywhere real client content
 * (photos, approved copy, names) is still awaiting delivery — content is
 * never faked to look real.
 */
export function Placeholder({ kind, label, note, className = "" }: PlaceholderProps) {
  const Icon = kind === "photo" ? ImagePlus : FileText;
  return (
    <div
      role="note"
      aria-label={`Placeholder: ${label}`}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-gold/50 bg-gold/[0.06] p-6 text-center ${className}`}
    >
      {/* corner ribbon */}
      <span className="placeholder-tag">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label.split("—")[0].trim()}
      </span>
      <Icon className="h-8 w-8 text-gold/45" aria-hidden="true" />
      <p className="font-heading text-sm font-semibold text-navy/80">[{label}]</p>
      {note ? <p className="max-w-sm text-xs leading-relaxed text-ink-soft">{note}</p> : null}
    </div>
  );
}

/** Inline marker for missing copy inside running text blocks. */
export function PlaceholderTag({ children = "PLACEHOLDER — awaiting client copy" }: { children?: string }) {
  return <span className="placeholder-tag align-middle">[{children}]</span>;
}
