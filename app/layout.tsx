import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | Industrial Zipper Manufacturer`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "ISO 9001 certified zipper manufacturer. Spiral, metal, injected, invisible, and recyclable zippers for apparel, outdoor, automotive, and medical applications.",
  keywords: [
    "zipper manufacturer",
    "spiral zipper",
    "metal zipper",
    "water resistant zipper",
    "OEKO-TEX zipper",
    "industrial zipper supplier",
    "IATF 16949 zipper",
    "Dynamic Dost",
    "Tiruppur zipper",
  ],
  authors: [{ name: SITE.fullName }],
  creator: SITE.fullName,
  publisher: SITE.fullName,

  /* ============ ICONS ============ */
  icons: {
    icon: [{ url: "/logo.webp", type: "image/webp" }],
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },

  /* ============ OPEN GRAPH ============ */
  openGraph: {
    type: "website",
    siteName: SITE.fullName,
    title: `${SITE.fullName} | Industrial Zipper Manufacturer`,
    description:
      "ISO 9001 certified zipper manufacturer serving apparel, outdoor, automotive, and medical brands worldwide.",
    url: SITE.url,
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: SITE.fullName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} | Industrial Zipper Manufacturer`,
    description:
      "ISO 9001 certified zipper manufacturer serving global brands.",
    images: ["/logo.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-white">
        <OrganizationSchema />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}