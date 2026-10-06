import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Factory,
  Calendar,
  Target,
  TrendingUp,
  Quote,
  Mail,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { team } from "@/lib/team-data";
import { cn } from "@/lib/utils";

/* =========================================
   SEO METADATA
   ========================================= */
export const metadata = {
  title: "About — Four decades of zipper mastery",
  description:
    "Since 1985, Dynamic Dost has engineered zippers for apparel, automotive, and medical brands worldwide. Learn our story, mission, and the people behind it.",
};

/* =========================================
   MILESTONES
   ========================================= */
const MILESTONES = [
  {
    year: "1985",
    title: "The workshop begins",
    desc: "Mahesh Bharadwaj R founds Dynamic Dost in Tiruppur with two machines and a small team.",
  },
  {
    year: "1992",
    title: "First export order",
    desc: "Ship to Sri Lanka opens the door to international business. First container leaves Tuticorin.",
  },
  {
    year: "1998",
    title: "Automotive entry",
    desc: "Begin supplying metal zippers to Indian automotive tier-1 suppliers.",
  },
  {
    year: "2010",
    title: "ISO 9001 certification",
    desc: "Quality management system certified, unlocking European and US retail clients.",
  },
  {
    year: "2015",
    title: "Y.C. Purohit joins as GM",
    desc: "Purohit takes over operations, formalizing production planning and quality systems.",
  },
  {
    year: "2018",
    title: "IATF 16949 achieved",
    desc: "Automotive-grade certification opens OEM and tier-1 supply chain doors.",
  },
  {
    year: "2020",
    title: "Sustainability pivot",
    desc: "Launch recyclable rPET and Bluesign-approved product lines for circular supply chains.",
  },
  {
    year: "2025",
    title: "40 years strong",
    desc: "Serving 200+ brands across 40+ countries with 40+ production lines.",
  },
];

/* =========================================
   VALUES
   ========================================= */
const VALUES = [
  {
    icon: Target,
    title: "Engineered to spec",
    desc: "Every zipper we ship is tested against a written specification. No exceptions.",
  },
  {
    icon: TrendingUp,
    title: "Lean and relentless",
    desc: "We iterate fast, ship on time, and improve every batch. Waste is the enemy.",
  },
  {
    icon: ShieldCheck,
    title: "Certified trust",
    desc: "ISO 9001, IATF 16949, OEKO-TEX 100, and Bluesign certified manufacturing.",
  },
  {
    icon: Globe2,
    title: "Global reach, local roots",
    desc: "Built in Tiruppur. Serving 40+ countries. Never forgetting where we came from.",
  },
];

/* =========================================
   STATS
   ========================================= */
const STATS = [
  { value: "40+", label: "Years in business" },
  { value: "200+", label: "Global brands" },
  { value: "40+", label: "Countries served" },
  { value: "40+", label: "Production lines" },
  { value: "300+", label: "Team members" },
  { value: "1M+", label: "Cycles tested" },
];

/* =========================================
   PAGE
   ========================================= */
export default function AboutPage() {
  return (
    <>
      {/* =========================================
          HERO — Responsive, fits every screen
      ========================================= */}
      <section className="relative w-full bg-white">
        <div className="container-tight pt-4 sm:pt-6 lg:pt-8">
          <div className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-ink-100 shadow-lg shadow-ink-900/5 bg-ink-50">
            <Image
              src="/about-hero.webp"
              alt="Mahesh Bharadwaj R — Founder & Director of Dynamic Dost — 40 Years of Industrial Journey. Experience, Insight, Impact."
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          STATS STRIP
      ========================================= */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container-tight py-10 sm:py-14">
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900">
                  {stat.value}
                </dt>
                <dd className="text-xs sm:text-sm text-ink-500 mt-1">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* =========================================
          STORY + TIMELINE
      ========================================= */}
      <section className="section">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: narrative (sticky on desktop) */}
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow">Our story</p>
              <h2 className="h2 mt-3 text-balance">
                Built one zipper at a time
              </h2>
              <p className="lead mt-5 text-pretty">
                In 1985, Mahesh Bharadwaj R rented a small workshop in
                Tiruppur with two machines and a promise: match the best
                zippers in the world, and beat them on service.
              </p>
              <p className="text-ink-600 mt-4 leading-relaxed text-pretty">
                Four decades later, that promise still drives everything we do.
                We&apos;ve grown from supplying local garment units to shipping
                millions of zippers a year to brands across six continents.
                Through every stage, one thing hasn&apos;t changed — the
                founder still walks the floor every morning.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-ink-200 bg-white p-4">
                  <Calendar className="h-5 w-5 text-brand-600 mb-2" />
                  <div className="text-xs text-ink-500">Founded</div>
                  <div className="text-lg font-semibold text-ink-900">
                    1985
                  </div>
                </div>
                <div className="rounded-xl border border-ink-200 bg-white p-4">
                  <Factory className="h-5 w-5 text-brand-600 mb-2" />
                  <div className="text-xs text-ink-500">Production lines</div>
                  <div className="text-lg font-semibold text-ink-900">40+</div>
                </div>
              </div>
            </div>

            {/* Right: timeline */}
            <ol className="relative border-l-2 border-ink-100 pl-6 sm:pl-8 space-y-8">
              {MILESTONES.map((m, i) => (
                <li key={m.year} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-[34px] sm:-left-[42px] top-1 h-4 w-4 rounded-full bg-white border-2 border-brand-500 grid place-items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-mono font-semibold text-brand-600">
                      {m.year}
                    </span>
                    {i === MILESTONES.length - 1 && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-ink-900 mt-1.5">
                    {m.title}
                  </h3>
                  <p className="text-sm text-ink-600 mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* =========================================
          VALUES
      ========================================= */}
      <section className="section-sm bg-ink-50 border-y border-ink-100">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow">What we stand for</p>
            <h2 className="h2 mt-2 text-balance">
              Four principles. Zero compromises.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-ink-200 bg-white p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-50 grid place-items-center mb-4">
                  <v.icon className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-ink-900">{v.title}</h3>
                <p className="text-sm text-ink-600 mt-2 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          LEADERSHIP
      ========================================= */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Leadership</p>
            <h2 className="h2 mt-2 text-balance">
              The people behind the zippers
            </h2>
            <p className="lead mt-4 text-pretty">
              Two leaders. One mission. Four decades of showing up for the work
              every single day.
            </p>
          </div>

          <div className="space-y-10 lg:space-y-14">
            {team.map((person, index) => (
              <LeaderProfile
                key={person.slug}
                person={person}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}
      <section className="section bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
        <div className="container-tight relative text-center max-w-3xl">
          <h2 className="h2 text-white text-balance">
            Want to work with a team that&apos;s been doing this for 40 years?
          </h2>
          <p className="mt-4 text-ink-300 text-pretty">
            Send us your specs and quantities. Our team responds within 4
            business hours with pricing, samples, and lead times.
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
      </section>
    </>
  );
}

/* =========================================
   Leader Profile — alternating layout
   ========================================= */
function LeaderProfile({
  person,
  reversed,
}: {
  person: (typeof team)[number];
  reversed: boolean;
}) {
  const accentMap = {
    brand: {
      badge: "bg-brand-50 text-brand-700 border-brand-100",
      icon: "text-brand-600",
      bg: "bg-brand-50",
      dot: "bg-brand-500",
    },
    emerald: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: "text-emerald-600",
      bg: "bg-emerald-50",
      dot: "bg-emerald-500",
    },
  }[person.accent];

  return (
    <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Photo column */}
      <div
        className={cn(
          "lg:col-span-5",
          reversed ? "lg:order-2" : "lg:order-1"
        )}
      >
        <div className="relative max-w-md mx-auto lg:mx-0">
          {/* Accent glow */}
          <div
            className={cn(
              "absolute -inset-4 rounded-3xl blur-3xl opacity-20",
              accentMap.bg
            )}
            aria-hidden
          />

          {/* Photo frame — 4:5 portrait ratio */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-ink-200 bg-gradient-to-br from-ink-50 to-white shadow-xl shadow-ink-900/5">
            <Image
              src={person.photo}
              alt={`${person.name}, ${person.role} at ${BRAND.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />

            {/* Bottom gradient for chip readability */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/60 to-transparent pointer-events-none"
              aria-hidden
            />

            {/* Role chip — bottom-left */}
            <div className="absolute bottom-4 left-4 right-4">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold",
                  accentMap.badge
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", accentMap.dot)}
                />
                {person.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content column */}
      <div
        className={cn(
          "lg:col-span-7 min-w-0",
          reversed ? "lg:order-1" : "lg:order-2"
        )}
      >
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-ink-900">
          {person.name}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm font-semibold uppercase tracking-wider",
            accentMap.icon
          )}
        >
          {person.role}
        </p>

        <p className="mt-5 text-ink-600 leading-relaxed text-pretty">
          {person.bio}
        </p>

        <blockquote className="mt-6 rounded-2xl border border-ink-200 bg-ink-50 p-5 sm:p-6">
          <Quote className="h-5 w-5 text-ink-300 mb-2" />
          <p className="text-ink-800 italic leading-relaxed text-pretty">
            &ldquo;{person.philosophy}&rdquo;
          </p>
          <footer className="mt-3 text-xs text-ink-500 not-italic">
            — {person.name.split(" ")[0]}
          </footer>
        </blockquote>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-3">
            Highlights
          </p>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {person.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-sm text-ink-700"
              >
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                    accentMap.dot
                  )}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {person.email && (
          <div className="mt-6 pt-6 border-t border-ink-100">
            <a
              href={`mailto:${person.email}`}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                accentMap.icon,
                "hover:opacity-80"
              )}
            >
              <Mail className="h-4 w-4" />
              {person.email}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}