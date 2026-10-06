import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { applicationsData } from "@/lib/applications-data";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import Image from "next/image";


export const metadata = {
  title: "Applications — Zippers by industry",
  description: `Explore how ${BRAND.name} engineers zippers for apparel, outdoor, automotive, medical, luggage, footwear, and marine applications. Certified for global supply chains.`,
};

/* Accent color map — keeps Tailwind classes literal for JIT */
const ACCENT = {
  brand: {
    number: "text-brand-500",
    dot: "bg-brand-500",
    chip: "bg-brand-50 text-brand-700 border-brand-100",
    link: "text-brand-700 hover:text-brand-800",
    imageBg: "from-brand-100 via-brand-50 to-white",
    glow: "shadow-brand-500/20",
  },
  emerald: {
    number: "text-emerald-500",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-100",
    link: "text-emerald-700 hover:text-emerald-800",
    imageBg: "from-emerald-100 via-emerald-50 to-white",
    glow: "shadow-emerald-500/20",
  },
  violet: {
    number: "text-violet-500",
    dot: "bg-violet-500",
    chip: "bg-violet-50 text-violet-700 border-violet-100",
    link: "text-violet-700 hover:text-violet-800",
    imageBg: "from-violet-100 via-violet-50 to-white",
    glow: "shadow-violet-500/20",
  },
  rose: {
    number: "text-rose-500",
    dot: "bg-rose-500",
    chip: "bg-rose-50 text-rose-700 border-rose-100",
    link: "text-rose-700 hover:text-rose-800",
    imageBg: "from-rose-100 via-rose-50 to-white",
    glow: "shadow-rose-500/20",
  },
  amber: {
    number: "text-amber-500",
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 border-amber-100",
    link: "text-amber-700 hover:text-amber-800",
    imageBg: "from-amber-100 via-amber-50 to-white",
    glow: "shadow-amber-500/20",
  },
  cyan: {
    number: "text-cyan-500",
    dot: "bg-cyan-500",
    chip: "bg-cyan-50 text-cyan-700 border-cyan-100",
    link: "text-cyan-700 hover:text-cyan-800",
    imageBg: "from-cyan-100 via-cyan-50 to-white",
    glow: "shadow-cyan-500/20",
  },
  lime: {
    number: "text-lime-600",
    dot: "bg-lime-500",
    chip: "bg-lime-50 text-lime-700 border-lime-100",
    link: "text-lime-700 hover:text-lime-800",
    imageBg: "from-lime-100 via-lime-50 to-white",
    glow: "shadow-lime-500/20",
  },
} as const;

export default function ApplicationsPage() {
  return (
    <>
      {/* =========================================
          HERO
      ========================================= */}
      <section className="relative border-b border-ink-100 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink-50/40 via-ink-50/80 to-ink-50"
          aria-hidden
        />

        <div className="container-tight relative py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Applications</p>
            <h1 className="h1 mt-3 text-balance">
              Zippers for every industry{" "}
              <span className="text-brand-600">we serve</span>
            </h1>
            <p className="lead mt-5 text-pretty max-w-2xl">
              Every industry demands a different balance of tensile strength,
              temperature resistance, water protection, and compliance.{" "}
              <strong className="text-ink-900 font-medium">{BRAND.name}</strong>{" "}
              engineers to that balance — down to the millimeter.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/products" className="btn btn-secondary btn-lg">
                Browse products
              </Link>
            </div>

            {/* Quick index */}
            <div className="mt-10 flex flex-wrap gap-2">
              {applicationsData.map((app) => (
                <a
                  key={app.slug}
                  href={`#${app.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-ink-400 hover:bg-ink-50 transition-colors"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      ACCENT[app.accentColor].dot
                    )}
                  />
                  {app.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          APPLICATION ROWS — alternating layout
      ========================================= */}
      <div className="divide-y divide-ink-100">
        {applicationsData.map((app, index) => {
          const accent = ACCENT[app.accentColor];
          const isReversed = index % 2 === 1;

          return (
            <section
              key={app.slug}
              id={app.slug}
              className="scroll-mt-20 section-sm"
            >
              <div className="container-tight">
                <div
                  className={cn(
                    "grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
                  )}
                >
                  {/* ============ TEXT COLUMN ============ */}
                  <div
                    className={cn(
                      "order-2 lg:order-1",
                      isReversed && "lg:order-2"
                    )}
                  >
                    {/* Number + name */}
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-4xl sm:text-5xl font-bold tracking-tighter",
                          accent.number
                        )}
                      >
                        {app.number}
                      </span>
                      <span className="h-px flex-1 max-w-[60px] bg-ink-200" />
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                          accent.chip
                        )}
                      >
                        {app.name}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="h2 mt-5 text-balance">{app.tagline}</h2>

                    {/* Description */}
                    <p className="lead mt-4 text-pretty">
                      {app.description}
                    </p>

                    {/* Specs strip */}
                    <dl className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {app.requirements.slice(0, 6).map((req) => (
                        <div
                          key={req.label}
                          className="rounded-lg border border-ink-200 bg-white p-3"
                        >
                          <dt className="text-[11px] uppercase tracking-wider text-ink-500 font-medium">
                            {req.label}
                          </dt>
                          <dd className="mt-1 text-sm font-semibold text-ink-900">
                            {req.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Certifications */}
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {app.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-7 flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/applications/${app.slug}`}
                        className={cn(
                          "inline-flex items-center gap-2 text-sm font-semibold",
                          accent.link
                        )}
                      >
                        Explore {app.name.toLowerCase()} zippers
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/products?application=${app.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors"
                      >
                        View recommended products
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* ============ IMAGE COLUMN ============ */}
                  <div
                    className={cn(
                      "order-1 lg:order-2",
                      isReversed && "lg:order-1"
                    )}
                  >
                    <div
                      className={cn(
                        "group relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-ink-200 bg-gradient-to-br shadow-xl shadow-ink-900/5 transition-transform duration-500 hover:-translate-y-1",
                        accent.imageBg,
                        accent.glow
                      )}
                    >
                      {/* Decorative grid */}
                      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />

                      {/* Placeholder illustration — swap with <Image /> when you have assets */}
                      {/* <div className="relative h-full w-full grid place-items-center p-10">
                        <div className="text-center">
                          <div className="text-7xl sm:text-8xl lg:text-9xl mb-6 select-none">
                            {app.icon}
                          </div>
                          <div className="text-sm uppercase tracking-[0.2em] text-ink-500 font-semibold">
                            {app.name}
                          </div>
                        </div>
                      </div> */}

                      <div className="relative h-full w-full">
                        <Image
                          src={app.image}
                          alt={`${app.name} zipper application`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>

                      {/* Corner badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-ink-200 px-3 py-1.5 text-[11px] font-semibold text-ink-700 shadow-sm">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              accent.dot
                            )}
                          />
                          {app.number} / {String(applicationsData.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* =========================================
          FINAL CTA
      ========================================= */}
      <section className="section border-t border-ink-100 bg-ink-50">
        <div className="container-tight">
          <div className="relative rounded-2xl bg-ink-900 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
            <div className="relative px-6 sm:px-10 lg:px-16 py-12 sm:py-16 text-center max-w-3xl mx-auto">
              <h2 className="h2 text-white text-balance">
                Don't see your industry?
              </h2>
              <p className="mt-4 text-ink-300 text-pretty">
                We engineer custom zipper assemblies for specialized
                applications. Send us your technical requirements and our team
                responds within 24 business hours.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="btn btn-lg bg-white text-ink-900 hover:bg-ink-100"
                >
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-lg border border-ink-700 text-white hover:bg-ink-800"
                >
                  Contact {BRAND.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}