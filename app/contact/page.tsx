import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  Package,
  FileText,
  Truck,
  ShieldCheck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Warehouse,
  Plane,
  Ship,
  Train,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Contact Us — Dynamic Dost",
  description:
    "Get in touch with Dynamic Dost. Head office and dispatch warehouse in Tiruppur, Tamil Nadu. Response within 4 business hours. Custom quotes, order tracking, and issue resolution.",
};

/* ============================
   PROCESS STEPS
   ============================ */
const ORDER_FLOW = [
  {
    step: "01",
    icon: MessageSquare,
    title: "You send an inquiry",
    desc: "Fill the RFQ form or email us your requirement. Include product type, quantity, and target delivery date.",
    responseTime: "Response within 4 business hours",
  },
  {
    step: "02",
    icon: FileText,
    title: "We prepare a quote",
    desc: "Our sales engineer sends a detailed quotation with pricing, MOQ, lead time, shipping terms, and payment options.",
    responseTime: "Within 24 business hours",
  },
  {
    step: "03",
    icon: Package,
    title: "Samples dispatched",
    desc: "Approved quotes move to sample stage. We ship up to 5 free samples for qualification testing.",
    responseTime: "5–7 days for sample delivery",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Order confirmed (PO)",
    desc: "You issue a purchase order. We confirm production slot and estimated dispatch date in writing.",
    responseTime: "Same-day PO confirmation",
  },
  {
    step: "05",
    icon: Truck,
    title: "Production & dispatch",
    desc: "Batch production with QC checkpoints. Shipment scheduled with your chosen carrier.",
    responseTime: "14–28 days depending on product",
  },
  {
    step: "06",
    icon: Ship,
    title: "Delivery & after-sales",
    desc: "Tracking shared. POD auto-emailed. Any damage or shortfall resolved within 48 hours.",
    responseTime: "48-hour claim window",
  },
];

const ISSUE_RESOLUTION = [
  {
    icon: AlertTriangle,
    title: "Quality defect",
    desc: "Report within 7 days of delivery with photos. We arrange replacement or credit note within 48 hours of verification.",
    sla: "48-hour resolution",
  },
  {
    icon: Package,
    title: "Short shipment",
    desc: "Reconcile against packing list. Missing pieces shipped same week with no freight charge.",
    sla: "Same-week fix",
  },
  {
    icon: Truck,
    title: "Transit damage",
    desc: "Document with POD photos at delivery. We file the insurance claim and re-ship replacement stock immediately.",
    sla: "Immediate re-ship",
  },
  {
    icon: FileText,
    title: "Documentation error",
    desc: "Wrong HS code, missing certificate, or invoice mismatch — corrected and re-issued within 24 hours.",
    sla: "24-hour correction",
  },
];

const CONTACT_REASONS = [
  { icon: FileText, label: "Get a quote", href: "/rfq" },
  { icon: Package, label: "Order tracking", href: "/rfq" },
  { icon: Users, label: "Become a distributor", href: "/rfq" },
  { icon: ShieldCheck, label: "Compliance & docs", href: "/rfq" },
];

export default function ContactPage() {
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
              Avg. response: 4 business hours
            </div>

            <h1 className="h1 mt-5 text-balance">
              Talk to <span className="text-brand-600">{BRAND.name}</span>
            </h1>

            <p className="lead mt-5 text-pretty max-w-2xl">
              Whether you need a quote, are tracking an order, or need help
              with a shipment — our team is one message away. Head office and
              dispatch warehouse in Tiruppur, Tamil Nadu.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${BRAND.email}`}
                className="btn btn-secondary btn-lg"
              >
                <Mail className="h-4 w-4" />
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PRIMARY CONTACT INFO
      ========================================= */}
      <section className="section-sm">
        <div className="container-tight">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Call */}
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
              className="group rounded-2xl border border-ink-200 bg-white p-6 sm:p-7 hover:border-ink-300 hover:shadow-lg hover:shadow-ink-900/5 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-50 grid place-items-center mb-5">
                <Phone className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="font-semibold text-ink-900">Call us</h3>
              <p className="text-sm text-ink-600 mt-1.5">
                Direct line during business hours.
              </p>
              <p className="mt-4 font-mono text-base font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">
                {BRAND.phone}
              </p>
              <div className="mt-3 text-xs text-ink-500">
                {BRAND.hours.weekdays}
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${BRAND.email}`}
              className="group rounded-2xl border border-ink-200 bg-white p-6 sm:p-7 hover:border-ink-300 hover:shadow-lg hover:shadow-ink-900/5 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-50 grid place-items-center mb-5">
                <Mail className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-ink-900">Email us</h3>
              <p className="text-sm text-ink-600 mt-1.5">
                Best for quotes, specs, and technical questions.
              </p>
              <p className="mt-4 text-sm font-medium text-ink-900 group-hover:text-emerald-700 transition-colors break-all">
                {BRAND.email}
              </p>
              <div className="mt-3 text-xs text-ink-500">
                Response within 4 business hours
              </div>
            </a>

            {/* Warehouse */}
            <div className="rounded-2xl border border-ink-200 bg-white p-6 sm:p-7">
              <div className="h-12 w-12 rounded-xl bg-amber-50 grid place-items-center mb-5">
                <MapPin className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-ink-900">Visit us</h3>
              <p className="text-sm text-ink-600 mt-1.5">
                Head office & dispatch warehouse.
              </p>
              <address className="mt-4 text-sm text-ink-800 not-italic leading-relaxed">
                <strong className="font-semibold">
                  {BRAND.headOffice.line1}
                </strong>
                <br />
                {BRAND.headOffice.line2}
                <br />
                {BRAND.headOffice.line3}
                <br />
                {BRAND.headOffice.city} — {BRAND.headOffice.postal}
                <br />
                {BRAND.headOffice.state}, {BRAND.headOffice.country}
              </address>
            </div>
          </div>

          {/* Quick reasons */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CONTACT_REASONS.map((reason) => (
              <Link
                key={reason.label}
                href={reason.href}
                className="group flex flex-col items-start rounded-xl border border-ink-200 bg-white p-4 hover:border-ink-300 hover:bg-ink-50 transition-all"
              >
                <reason.icon className="h-4 w-4 text-ink-500 mb-2.5" />
                <span className="text-sm font-medium text-ink-900 group-hover:text-brand-700">
                  {reason.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          TWO LOCATIONS
      ========================================= */}
      <section className="section-sm bg-ink-50 border-y border-ink-100">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow">Our locations</p>
            <h2 className="h2 mt-2 text-balance">
              Two facilities in Tiruppur
            </h2>
            <p className="lead mt-3 text-pretty">
              Head office handles sales, engineering, and administration.
              Dispatch warehouse manages inventory, packing, and outbound
              logistics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {/* Head Office */}
            <LocationCard
              icon={Building2}
              accent="brand"
              label={BRAND.headOffice.label}
              lines={[
                BRAND.headOffice.line1,
                BRAND.headOffice.line2,
                BRAND.headOffice.line3,
                `${BRAND.headOffice.city} — ${BRAND.headOffice.postal}`,
                `${BRAND.headOffice.state}, ${BRAND.headOffice.country}`,
              ]}
              badge="Sales · Engineering"
            />

            {/* Warehouse */}
            <LocationCard
              icon={Warehouse}
              accent="amber"
              label={BRAND.warehouse.label}
              lines={[
                BRAND.warehouse.line1,
                BRAND.warehouse.line2,
                BRAND.warehouse.line3,
                `${BRAND.warehouse.city} — ${BRAND.warehouse.postal}`,
                `${BRAND.warehouse.state}, ${BRAND.warehouse.country}`,
              ]}
              badge="Inventory · Dispatch"
            />
          </div>

          {/* Logistics hubs */}
          <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6 sm:p-7">
            <h3 className="font-semibold text-ink-900 mb-5">
              Nearest logistics hubs
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <LogisticsItem
                icon={Ship}
                label="Seaports"
                items={BRAND.logistics.seaports}
              />
              <LogisticsItem
                icon={Plane}
                label="Airport"
                items={[BRAND.logistics.airport]}
              />
              <LogisticsItem
                icon={Train}
                label="Rail head"
                items={[BRAND.logistics.railhead]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ORDER FLOW
      ========================================= */}
      <section className="section-sm">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow">How orders work</p>
            <h2 className="h2 mt-2 text-balance">
              From inquiry to delivery
            </h2>
            <p className="lead mt-3 text-pretty">
              Six clear steps. Every step has a defined response time so you
              know exactly what to expect.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ORDER_FLOW.map((step) => (
              <li
                key={step.step}
                className="relative rounded-2xl border border-ink-200 bg-white p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl bg-brand-50 grid place-items-center">
                    <step.icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <span className="text-2xl font-bold tracking-tighter text-ink-200">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-ink-900">{step.title}</h3>
                <p className="text-sm text-ink-600 mt-2 leading-relaxed">
                  {step.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-ink-100 flex items-center gap-2 text-xs">
                  <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="font-medium text-emerald-700">
                    {step.responseTime}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================================
          ISSUE RESOLUTION
      ========================================= */}
      <section className="section-sm bg-ink-50 border-y border-ink-100">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow">Issue resolution</p>
            <h2 className="h2 mt-2 text-balance">
              When things go wrong, we fix it fast
            </h2>
            <p className="lead mt-3 text-pretty">
              Every issue has a defined SLA. No escalation chains, no waiting
              weeks for a reply. Contact your account manager or email{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-brand-700 underline-offset-2 hover:underline"
              >
                {BRAND.email}
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ISSUE_RESOLUTION.map((issue) => (
              <div
                key={issue.title}
                className="rounded-2xl border border-ink-200 bg-white p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-rose-50 grid place-items-center mb-4">
                  <issue.icon className="h-5 w-5 text-rose-600" />
                </div>
                <h3 className="font-semibold text-ink-900">{issue.title}</h3>
                <p className="text-sm text-ink-600 mt-2 leading-relaxed">
                  {issue.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-ink-100">
                  <span className="inline-flex items-center rounded-full bg-rose-50 border border-rose-100 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
                    {issue.sla}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Escalation path */}
          <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6 sm:p-7">
            <h3 className="font-semibold text-ink-900 mb-5">
              Escalation path
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              <EscalationStep
                level="Level 1"
                role="Account Manager"
                desc="Handles day-to-day queries, tracking, and minor issues."
                sla="Response: 4 hours"
              />
              <EscalationStep
                level="Level 2"
                role="Operations Lead"
                desc="Quality claims, replacements, and shipping disputes."
                sla="Response: 12 hours"
              />
              <EscalationStep
                level="Level 3"
                role="Director"
                desc="Commercial disputes and long-term contract matters."
                sla="Response: 24 hours"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BUSINESS HOURS
      ========================================= */}
      <section className="section-sm">
        <div className="container-tight">
          <div className="rounded-2xl border border-ink-200 bg-white overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Hours */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="h-5 w-5 text-ink-400" />
                  <h3 className="font-semibold text-ink-900">
                    Business hours (IST)
                  </h3>
                </div>
                <dl className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-4 border-b border-ink-100">
                    <dt className="text-sm text-ink-600">Monday – Friday</dt>
                    <dd className="text-sm font-medium text-ink-900">
                      9:30 AM – 7:00 PM
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-4 border-b border-ink-100">
                    <dt className="text-sm text-ink-600">Saturday</dt>
                    <dd className="text-sm font-medium text-ink-900">
                      9:30 AM – 5:00 PM
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <dt className="text-sm text-ink-600">Sunday</dt>
                    <dd className="text-sm font-medium text-ink-500">
                      Closed
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs text-ink-500 leading-relaxed">
                  Emails received outside business hours are acknowledged
                  within 12 hours and actioned on the next working day.
                </p>
              </div>

              {/* Map */}
              <div className="bg-ink-50 p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-2 mb-5">
                  <MapPin className="h-5 w-5 text-ink-400" />
                  <h3 className="font-semibold text-ink-900">
                    Find us in Tiruppur
                  </h3>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    BRAND.mapsQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block aspect-video rounded-xl border border-ink-200 bg-white overflow-hidden hover:border-ink-300 transition-colors"
                >
                  <iframe
                    title="Dynamic Dost location map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      BRAND.mapsQuery
                    )}&output=embed`}
                    className="w-full h-full pointer-events-none"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </a>
                <p className="mt-4 text-xs text-ink-500">
                  Click to open in Google Maps for directions.
                </p>
              </div>
            </div>
          </div>
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
                Ready to place your first order?
              </h2>
              <p className="mt-4 text-ink-300 text-pretty">
                Fill our RFQ form with your specs and quantities. Our sales
                engineer responds within 4 business hours with pricing and
                lead times.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="btn btn-lg bg-white text-ink-900 hover:bg-ink-100"
                >
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="btn btn-lg border border-ink-700 text-white hover:bg-ink-800"
                >
                  <Phone className="h-4 w-4" />
                  Call {BRAND.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================
   Location Card
   ========================================= */
function LocationCard({
  icon: Icon,
  accent,
  label,
  lines,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent: "brand" | "amber";
  label: string;
  lines: string[];
  badge: string;
}) {
  const accentMap = {
    brand: {
      bg: "bg-brand-50",
      icon: "text-brand-600",
      badge: "bg-brand-50 text-brand-700 border-brand-100",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      badge: "bg-amber-50 text-amber-700 border-amber-100",
    },
  }[accent];

  return (
    <article className="rounded-2xl border border-ink-200 bg-white p-6 sm:p-7">
      <div className="flex items-start justify-between mb-5">
        <div
          className={cn(
            "h-12 w-12 rounded-xl grid place-items-center",
            accentMap.bg
          )}
        >
          <Icon className={cn("h-5 w-5", accentMap.icon)} />
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
            accentMap.badge
          )}
        >
          {badge}
        </span>
      </div>

      <h3 className="font-semibold text-ink-900 text-lg">{label}</h3>

      <address className="mt-4 text-sm text-ink-700 not-italic leading-relaxed">
        {lines.map((line, i) => (
          <span key={i}>
            {i === 0 ? (
              <strong className="font-medium text-ink-900">{line}</strong>
            ) : (
              line
            )}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </address>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          lines.join(", ")
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        Open in Maps <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

/* =========================================
   Logistics Item
   ========================================= */
function LogisticsItem({
  icon: Icon,
  label,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-ink-400" />
        <span className="text-xs uppercase tracking-wider font-medium text-ink-500">
          {label}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-ink-800">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================
   Escalation Step
   ========================================= */
function EscalationStep({
  level,
  role,
  desc,
  sla,
}: {
  level: string;
  role: string;
  desc: string;
  sla: string;
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-ink-50 p-5">
      <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-500">
        {level}
      </div>
      <div className="mt-1.5 font-semibold text-ink-900">{role}</div>
      <p className="text-xs text-ink-600 mt-2 leading-relaxed">{desc}</p>
      <div className="mt-3 pt-3 border-t border-ink-200 text-xs font-medium text-emerald-700">
        {sla}
      </div>
    </div>
  );
}