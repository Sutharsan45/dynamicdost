import { BRAND } from "@/lib/brand";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.fullName,
    alternateName: BRAND.name,
    url: BRAND.url,
    logo: `${BRAND.url}/logo.webp`,
    email: BRAND.email,
    telephone: BRAND.phone,
    foundingDate: String(BRAND.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BRAND.headOffice.line1}, ${BRAND.headOffice.line2}, ${BRAND.headOffice.line3}`,
      addressLocality: BRAND.headOffice.city,
      addressRegion: BRAND.headOffice.state,
      postalCode: BRAND.headOffice.postal,
      addressCountry: "IN",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}