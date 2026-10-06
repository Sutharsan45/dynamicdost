import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

const PRODUCT_LINKS = [
  { href: "/products?type=spiral", label: "Spiral zippers" },
  { href: "/products?type=metal", label: "Metal zippers" },
  { href: "/products?type=invisible", label: "Invisible zippers" },
  { href: "/products?type=water-resistant", label: "Water-resistant" },
  { href: "/products?type=recyclable", label: "Recyclable" },
  { href: "/products?type=fire-retardant", label: "Fire-retardant" },
];

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
  { href: "/applications", label: "Applications" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50">
      <div className="container-tight py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link
              href="/"
              className="inline-block relative h-16 sm:h-20 w-52 sm:w-64 mb-5"
              aria-label={`${SITE.name} — Home`}
            >
              <Image
                src="/logo.webp"
                alt={`${SITE.name} logo`}
                fill
                sizes="(max-width: 640px) 208px, 256px"
                className="object-contain object-left"
              />
            </Link>

            <p className="text-sm text-ink-600 leading-relaxed max-w-md">
              ISO 9001 certified zipper manufacturer serving global brands in
              apparel, outdoor, automotive, and medical industries since{" "}
              {SITE.founded}.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["ISO 9001", "OEKO-TEX 100", "IATF 16949", "GRS 4.0"].map(
                (cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[11px] font-medium text-ink-700"
                  >
                    {cert}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm text-ink-900 mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-600 hover:text-ink-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm text-ink-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-600 hover:text-ink-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-sm text-ink-900 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-ink-600">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-ink-900 break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-600">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="hover:text-ink-900"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-600">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {SITE.headOffice.line1}
                  <br />
                  {SITE.headOffice.line2}
                  <br />
                  {SITE.headOffice.line3}
                  <br />
                  {SITE.headOffice.city} — {SITE.headOffice.postal}
                  <br />
                  {SITE.headOffice.state}, {SITE.headOffice.country}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-200">
        <div className="container-tight py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ink-500">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink-900">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink-900">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-ink-900">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}