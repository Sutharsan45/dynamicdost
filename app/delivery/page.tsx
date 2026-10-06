"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Plane,
  Ship,
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  Globe2,
  Home,
} from "lucide-react";
import {
  DOMESTIC_ZONES,
  INTERNATIONAL_ZONES,
  DISPATCH_ORIGIN,
  type DeliveryZone,
} from "@/lib/constants";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Tab = "domestic" | "international";

export default function DeliveryPage() {
  const [tab, setTab] = useState<Tab>("domestic");
  const zones = tab === "domestic" ? DOMESTIC_ZONES : INTERNATIONAL_ZONES;

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
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              40+ countries served · On-time rate 98.6%
            </div>

            <h1 className="h1 mt-5 text-balance">
              Delivered on time,{" "}
              <span className="text-brand-600">every time</span>
            </h1>

            <p className="lead mt-5 text-pretty max-w-2xl">
              {BRAND.name} ships to every corner of India and 40+ countries
              worldwide. From FTL road freight to consolidated sea containers —
              we handle logistics, customs documentation, and last-mile
              delivery so you can focus on production.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-lg">
                Talk to logistics
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                { k: "98.6%", v: "On-time delivery" },
                { k: "40+", v: "Countries served" },
                { k: "48h", v: "Domestic dispatch" },
                { k: "0.2%", v: "Damage rate" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900">
                    {s.k}
                  </dt>
                  <dd className="text-xs sm:text-sm text-ink-500 mt-1">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* =========================================
          TABS + ZONES
      ========================================= */}
      <section className="section-sm">
        <div className="container-tight">
          {/* Tabs */}
          <div className="flex justify-center mb-10 sm:mb-14">
            <div className="inline-flex rounded-xl border border-ink-200 bg-white p-1 shadow-sm">
              <TabButton
                active={tab === "domestic"}
                onClick={() => setTab("domestic")}
                icon={Home}
                label="Domestic"
                sublabel="India"
              />
              <TabButton
                active={tab === "international"}
                onClick={() => setTab("international")}
                icon={Globe2}
                label="International"
                sublabel="40+ countries"
              />
            </div>
          </div>

          {/* Tab content */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: zones list */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <p className="eyebrow">
                  {tab === "domestic" ? "Regional coverage" : "Global zones"}
                </p>
                <h2 className="h3 mt-2 text-balance">
                  {tab === "domestic"
                    ? "Every state, every pincode"
                    : "Shipping to your continent"}
                </h2>
                <p className="text-ink-600 mt-3 text-pretty">
                  {tab === "domestic"
                    ? "We dispatch from our Gujarat warehouse to every serviceable pincode across India. FTL, LTL, rail, and last-mile partners pre-qualified."
                    : "Consolidated sea freight to major ports worldwide, with air freight for time-critical samples and urgent restocks."}
                </p>
              </div>

              <div className="space-y-3">
                {zones.map((zone) => (
                  <ZoneCard key={zone.region} zone={zone} tab={tab} />
                ))}
              </div>
            </div>

            {/* Right: sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Methods */}
                <div className="rounded-xl border border-ink-200 bg-white p-6">
                  <h3 className="font-semibold text-ink-900 mb-4">
                    Shipping methods
                  </h3>
                  <div className="space-y-4">
                    <MethodRow
                      icon={Truck}
                      label="Road freight"
                      desc="FTL & LTL, pan-India"
                    />
                    <MethodRow
                      icon={Ship}
                      label="Sea freight"
                      desc="FCL & LCL, worldwide"
                    />
                    <MethodRow
                      icon={Plane}
                      label="Air freight"
                      desc="Samples & urgent restocks"
                    />
                  </div>
                </div>

                {/* Docs */}
                <div className="rounded-xl border border-ink-200 bg-white p-6">
                  <h3 className="font-semibold text-ink-900 mb-4">
                    Documentation handled
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {[
                      "Commercial invoice & packing list",
                      "Bill of lading / Airway bill",
                      "Certificate of origin",
                      "Insurance coverage",
                      "Customs clearance support",
                    ].map((doc) => (
                      <li key={doc} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-ink-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Incoterms */}
                <div className="rounded-xl border border-ink-200 bg-ink-900 text-white p-6">
                  <h3 className="font-semibold mb-3">Incoterms supported</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["FOB", "CIF", "CFR", "DDP", "DAP", "EXW"].map((term) => (
                      <span
                        key={term}
                        className="inline-flex items-center rounded-md bg-white/10 px-2.5 py-1 text-xs font-mono font-medium"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-ink-300 mt-4 leading-relaxed">
                    We quote against your preferred Incoterm. Insurance and
                    clearance handled by our in-house team.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================
          PROCESS
      ========================================= */}
      <section className="section-sm bg-ink-50 border-y border-ink-100">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow">How it works</p>
            <h2 className="h2 mt-2 text-balance">
              From our warehouse to your line
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "Order confirmed",
                desc: "Sales issues PO confirmation with dispatch ETA and quantity.",
                icon: FileText,
              },
              {
                step: "02",
                title: "Packed & labeled",
                desc: "Batch traceability labels, cartonization, and QC sign-off.",
                icon: Package,
              },
              {
                step: "03",
                title: "Dispatched",
                desc: "Tracking number issued within 24h of pickup.",
                icon: Truck,
              },
              {
                step: "04",
                title: "Delivered & confirmed",
                desc: "POD auto-emailed. Damage claims handled within 48h.",
                icon: CheckCircle2,
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-xl border border-ink-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold tracking-tighter text-ink-200">
                    {item.step}
                  </span>
                  <div className="h-10 w-10 rounded-lg bg-ink-50 grid place-items-center">
                    <item.icon className="h-5 w-5 text-brand-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-ink-900">{item.title}</h3>
                <p className="text-sm text-ink-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}
      <section className="section">
        <div className="container-tight">
          <div className="relative rounded-2xl bg-ink-900 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
            <div className="relative px-6 sm:px-10 lg:px-16 py-12 sm:py-16 text-center max-w-3xl mx-auto">
              <h2 className="h2 text-white text-balance">
                Need delivery to a remote location?
              </h2>
              <p className="mt-4 text-ink-300 text-pretty">
                Send us the destination and we&apos;ll quote freight, transit
                time, and documentation requirements within 24 business hours.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="btn btn-lg bg-white text-ink-900 hover:bg-ink-100"
                >
                  Contact logistics <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-lg border border-ink-700 text-white hover:bg-ink-800"
                >
                  Contact logistics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================
   Tab Button
   ========================================= */
function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  sublabel,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 sm:px-6 py-3 text-left transition-all",
        active
          ? "bg-ink-900 text-white shadow-sm"
          : "text-ink-700 hover:bg-ink-50"
      )}
      aria-pressed={active}
    >
      <Icon
        className={cn(
          "h-5 w-5 shrink-0",
          active ? "text-white" : "text-ink-400"
        )}
      />
      <div>
        <div className="text-sm font-semibold leading-tight">{label}</div>
        <div
          className={cn(
            "text-[11px] leading-tight mt-0.5",
            active ? "text-ink-300" : "text-ink-500"
          )}
        >
          {sublabel}
        </div>
      </div>
    </button>
  );
}

/* =========================================
   Zone Card
   ========================================= */
function ZoneCard({ zone, tab }: { zone: DeliveryZone; tab: Tab }) {
  const isDomestic = tab === "domestic";

  return (
    <article className="rounded-xl border border-ink-200 bg-white p-5 sm:p-6 hover:border-ink-300 hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="h-11 w-11 rounded-lg bg-brand-50 grid place-items-center shrink-0">
          {isDomestic ? (
            <MapPin className="h-5 w-5 text-brand-600" />
          ) : (
            <Globe2 className="h-5 w-5 text-brand-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="font-semibold text-ink-900">{zone.region}</h3>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
              <Clock className="h-3 w-3" />
              {zone.transitDays}
            </span>
          </div>

          <p className="text-xs text-ink-500 mt-1">
            {zone.countries.length} {isDomestic ? "regions" : "countries"} ·{" "}
            {zone.method}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {zone.countries.slice(0, 8).map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-md bg-ink-50 border border-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-700"
              >
                {c}
              </span>
            ))}
            {zone.countries.length > 8 && (
              <span className="inline-flex items-center rounded-md bg-ink-50 border border-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-500">
                +{zone.countries.length - 8} more
              </span>
            )}
          </div>

          <p className="text-xs text-ink-500 mt-4 italic">{zone.notes}</p>
        </div>
      </div>
    </article>
  );
}

/* =========================================
   Method Row
   ========================================= */
function MethodRow({
  icon: Icon,
  label,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-md bg-ink-50 grid place-items-center shrink-0">
        <Icon className="h-4 w-4 text-ink-600" />
      </div>
      <div>
        <div className="text-sm font-medium text-ink-900">{label}</div>
        <div className="text-xs text-ink-500 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}