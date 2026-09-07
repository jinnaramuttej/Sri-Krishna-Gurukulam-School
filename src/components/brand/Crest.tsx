interface CrestProps {
  size?: number;
  className?: string;
}

/**
 * Circular school crest — navy ring carrying the school name,
 * sunrise over an open book with a gold pen nib, "ESTD - 2026" base.
 * Pure inline SVG so it stays razor sharp at any size.
 */
export function Crest({ size = 48, className = "" }: CrestProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Sri Krishna Gurukulam School crest — sunrise over open book with pen nib, established 2026"
      className={className}
    >
      <title>Sri Krishna Gurukulam School — Estd 2026</title>
      <defs>
        <radialGradient id="crestSun" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#f6b74e" />
          <stop offset="55%" stopColor="#ee9a33" />
          <stop offset="100%" stopColor="#e8842c" />
        </radialGradient>
        {/* Top arc for school name */}
        <path id="crestNameArc" d="M 100 100 m -86.5 0 a 86.5 86.5 0 1 1 173 0 a 86.5 86.5 0 1 1 -173 0" />
        {/* Bottom arc (reversed) for ESTD line */}
        <path id="crestEstdArc" d="M 100 100 m -86.5 0 a 86.5 86.5 0 1 0 173 0 a 86.5 86.5 0 1 0 -173 0" />
      </defs>

      {/* Outer navy ring */}
      <circle cx="100" cy="100" r="97" fill="#1a2a4a" stroke="#d9c9a3" strokeWidth="2" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#d9c9a3" strokeWidth="0.6" opacity="0.45" />
      <circle cx="100" cy="100" r="79" fill="#fdfaf1" stroke="#b28f52" strokeWidth="1.4" />

      {/* Ring text — school name on top arc */}
      <text
        fill="#f5efe0"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="1.8"
        style={{ fontFamily: "var(--font-zilla), Georgia, serif" }}
      >
        <textPath href="#crestNameArc" startOffset="25%" textAnchor="middle">
          SRI KRISHNA GURUKULAM SCHOOL
        </textPath>
      </text>
      {/* Ring text — ESTD at bottom */}
      <text
        fill="#d9c9a3"
        fontSize="9"
        fontWeight="600"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-zilla), Georgia, serif" }}
      >
        <textPath href="#crestEstdArc" startOffset="25%" textAnchor="middle">
          ESTD - 2026
        </textPath>
      </text>

      {/* Side diamonds on ring */}
      <rect x="9.5" y="97.5" width="5" height="5" transform="rotate(45 12 100)" fill="#b28f52" />
      <rect x="185.5" y="97.5" width="5" height="5" transform="rotate(45 188 100)" fill="#b28f52" />

      {/* Sunrise rays */}
      <g stroke="#e8842c" strokeWidth="3" strokeLinecap="round">
        <line x1="74" y1="103" x2="63.6" y2="97" />
        <line x1="85" y1="92" x2="79" y2="81.6" />
        <line x1="115" y1="92" x2="121" y2="81.6" />
        <line x1="126" y1="103" x2="136.4" y2="97" />
      </g>

      {/* Rising sun */}
      <circle cx="100" cy="118" r="24" fill="url(#crestSun)" />

      {/* Gold pen nib rising from the book's spine */}
      <path
        d="M100 62 C 105.5 72 110 79 110 88 C 110 95 105.5 98.5 100 102 C 94.5 98.5 90 95 90 88 C 90 79 94.5 72 100 62 Z"
        fill="#b28f52"
        stroke="#8b6f3f"
        strokeWidth="1.4"
      />
      <line x1="100" y1="70" x2="100" y2="94" stroke="#fdfaf1" strokeWidth="1.6" />
      <circle cx="100" cy="89" r="2.6" fill="#fdfaf1" />

      {/* Open book */}
      <path
        d="M56 118 C 72 110 88 110 100 117 C 112 110 128 110 144 118 L144 141 C 128 133 112 133 100 140 C 88 133 72 133 56 141 Z"
        fill="#1a2a4a"
        stroke="#101c33"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <g stroke="#f5efe0" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M64 123 C 76 118 88 118 95 121.5" />
        <path d="M64 129 C 76 124 88 124 95 127.5" />
        <path d="M136 123 C 124 118 112 118 105 121.5" />
        <path d="M136 129 C 124 124 112 124 105 127.5" />
      </g>
      <line x1="100" y1="117" x2="100" y2="140" stroke="#f5efe0" strokeWidth="1.4" opacity="0.85" />
    </svg>
  );
}
