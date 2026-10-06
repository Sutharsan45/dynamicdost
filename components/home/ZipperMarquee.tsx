const CERTS = [
  "ISO 9001",
  "IATF 16949",
  "OEKO-TEX 100",
  "REACH",
  "RoHS",
  "GRS 4.0",
  "Bluesign",
  "NFPA 1971",
  "EN 469",
];

export function ZipperMarquee() {
  return (
    <div className="relative overflow-hidden py-6 border-y border-ink-100 bg-ink-50">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...CERTS, ...CERTS].map((cert, i) => (
          <div
            key={`${cert}-${i}`}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="h-8 w-8 rounded-md bg-white border border-ink-200 grid place-items-center">
              <span className="text-[10px] font-bold text-brand-600">
                ✓
              </span>
            </div>
            <span className="text-sm font-semibold text-ink-700 tracking-tight">
              {cert}
            </span>
          </div>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-50 to-transparent" />
    </div>
  );
}