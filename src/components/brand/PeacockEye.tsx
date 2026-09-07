interface PeacockEyeProps {
  className?: string;
}

/**
 * Stylised peacock-feather "eye" — concentric ovals in peacock hues with a
 * fan of fine barbs. Used at very low opacity as an ambient motif, never as
 * literal clipart.
 */
export function PeacockEye({ className = "" }: PeacockEyeProps) {
  const cx = 100;
  const cy = 100;
  // Barb fan: thin strokes radiating upward
  const barbs = Array.from({ length: 25 }, (_, i) => {
    const deg = -84 + i * 7; // -84° … +84°
    const rad = (deg * Math.PI) / 180;
    const len = 118;
    return {
      x2: cx + len * Math.sin(rad),
      y2: cy - len * Math.cos(rad),
      faint: i % 2 === 1,
    };
  });

  return (
    <svg viewBox="0 0 200 280" fill="none" aria-hidden="true" className={className}>
      {/* barb fan */}
      <g stroke="#d9c9a3" strokeWidth="0.9">
        {barbs.map((b, i) => (
          <line key={i} x1={cx} y1={cy} x2={b.x2} y2={b.y2} opacity={b.faint ? 0.35 : 0.6} />
        ))}
      </g>

      {/* feather eye — layered ovals */}
      <ellipse cx={cx} cy={cy} rx="56" ry="74" stroke="#b28f52" strokeWidth="1.6" opacity="0.9" />
      <ellipse cx={cx} cy={cy} rx="44" ry="59" fill="#1a2a4a" stroke="#d9c9a3" strokeWidth="1" />
      <ellipse cx={cx} cy={cy + 4} rx="31" ry="43" fill="#2e8b74" />
      <ellipse cx={cx} cy={cy + 8} rx="20" ry="28" fill="#2b7fd4" />
      <ellipse cx={cx} cy={cy + 10} rx="10" ry="15" fill="#b28f52" />
      <ellipse cx={cx - 5} cy={cy} rx="4" ry="6" fill="#f5efe0" opacity="0.55" />

      {/* stem */}
      <path d={`M${cx} ${cy + 60} C 96 160 104 220 100 276`} stroke="#b28f52" strokeWidth="1.6" />
      <g stroke="#d9c9a3" strokeWidth="0.8" opacity="0.55">
        <path d="M99 190 L84 204" />
        <path d="M100 200 L86 216" />
        <path d="M100 210 L88 227" />
        <path d="M99 190 L114 204" />
        <path d="M100 200 L114 216" />
        <path d="M100 210 L112 227" />
      </g>
    </svg>
  );
}
